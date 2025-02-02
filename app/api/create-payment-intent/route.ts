import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";
import { OrderedItemData } from "@/app/interfaces";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-11-20.acacia",
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SECRET_KEY!
);

// Interface for the entire order data
export interface PostData {
  customer_first_name: string;
  customer_last_name: string;
  email: string;
  phone_number: string;
  location_id: number;
  time_placed: string;
  time_requested: string;
  location: string;
  is_pickup: boolean;
  status_id: number;
  cart: OrderedItemData[];
}

// Create cartData variable of type PostData
let cartData: PostData;
let uuid: string;
let amount: number;

export async function POST(req: NextRequest) {
  let body;
  console.log("POST");

  // Parse JSON from the request body
  try {
    body = await req.json();
  } catch (err: any) {
    return NextResponse.json(
      { error: `Failed to parse JSON: ${err.message}` },
      { status: 400 }
    );
  }

  const { cart, time, location } = body;

  // Store the temporary cart data
  try {
    const { data, error } = await supabase
      .from("temporary_orders")
      .insert([
        { cart, time_created: new Date(), time_requested: time, location_id: location},
      ])
      .select()
      .single();

    if (error) throw new Error(error.message);
    console.log("Temporary order created with UUID:", data.id);
    uuid = data.id;
  } catch (err: any) {
    console.error("Supabase insert error:", err.message);
    return NextResponse.json(
      { error: `Failed to store temporary order - ${err.message}` },
      { status: 500 }
    );
  }

  // Calculate the order amount from the cart
  try {
    amount = await calculateCartPrice(cart);
    console.log("Calculated cart total (in cents):", amount);
  } catch (err: any) {
    console.error("Error in calculateCartPrice:", err.message);
    return NextResponse.json(
      { error: `Failed to calculate cart price: ${err.message}` },
      { status: 500 }
    );
  }

  // Create a PaymentIntent with the order amount and currency
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      metadata: { id: uuid, name: "gyatlirizz" },
      automatic_payment_methods: { enabled: true },
    });
    console.log("PaymentIntent created successfully:", paymentIntent.id);
    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (err: any) {
    console.error("Stripe PaymentIntent error:", err.message);
    return NextResponse.json(
      { error: `Failed to create payment intent - ${err.message}` },
      { status: 500 }
    );
  }
}

export async function calculateCartPrice(cart: OrderedItemData[]) {
  let amount = 0; // Base amount

  try {
    // Fetch all item prices and modifications in a single query
    const itemIds = cart.map((item) => item.item_id);
    const { data: itemsData, error: itemsError } = await supabase
      .from("items")
      .select("item_id, price")
      .in("item_id", itemIds);

    if (itemsError) {
      throw new Error(
        `Supabase error fetching item prices: ${itemsError.message}`
      );
    }

    if (!itemsData || itemsData.length === 0) {
      throw new Error("No items found for the given item IDs");
    }

    // Create a map of item prices for quick lookup
    const itemPriceMap = new Map(
      itemsData.map((item) => [item.item_id, item.price])
    );
    let modificationPriceMap = new Map<number, number>();

    // Fetch all modification prices in a single query
    const modificationIds = cart
      .flatMap((item) => item.modifications || [])
      .map((mod) => mod.modification_id);

    if (modificationIds.length > 0) {
      const { data: modificationsData, error: modificationsError } =
        await supabase
          .from("modifications")
          .select("modification_id, price")
          .in("modification_id", modificationIds);

      if (modificationsError) {
        throw new Error(
          `Supabase error fetching modification prices: ${modificationsError.message}`
        );
      }

      if (!modificationsData || modificationsData.length === 0) {
        throw new Error(
          "No modifications found for the given modification IDs"
        );
      }

      // Create a map of modification prices for quick lookup
      modificationPriceMap = new Map(
        modificationsData.map((mod) => [mod.modification_id, mod.price])
      );
    }

    // Calculate the total amount
    for (const item of cart) {
      const price = itemPriceMap.get(item.item_id);
      if (price === undefined) {
        throw new Error(`Price not found for item ID: ${item.item_id}`);
      }
      amount += item.quantity * price * 100;

      for (const mod of item.modifications) {
        const modPrice = modificationPriceMap.get(mod.modification_id);
        if (modPrice === undefined) {
          throw new Error(
            `Price not found for modification ID: ${mod.modification_id}`
          );
        }
        amount += modPrice * item.quantity;
      }
    }

    return Math.ceil(amount * 1.06);
  } catch (err: any) {
    console.error("Error calculating cart price:", err.message);
    throw new Error(`Error in calculateCartPrice: ${err.message}`);
  }
}

export function OPTIONS() {
  // Enable CORS preflight requests
  return NextResponse.json(
    {},
    { status: 200, headers: { Allow: "POST, OPTIONS" } }
  );
}
