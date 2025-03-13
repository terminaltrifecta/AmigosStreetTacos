export const dynamic = "force-dynamic";
export const runtime = "nodejs"; // added runtime export

import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { OrderedItemData } from "@/app/interfaces";
import { calculateCartPrice, isClosed } from "@/app/utils/menuUtils";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-11-20.acacia",
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SECRET_KEY!
);

let order_id: number;
let amount: number;

export async function GET() {
  // Return 405 for GET requests
  return new NextResponse(null, {
    status: 405,
    statusText: "Method Not Allowed",
  });
}

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

  const { cart, time, location, hours, promoCode } = body;
  console.log(cart, time, location, hours, promoCode);

  // Step 2: Check if the restaurant is open
  // try {
  //   const requestedTime = new Date();
  //   if (isClosed(requestedTime, hours)) {
  //     return NextResponse.json(
  //       {
  //         error:
  //           "The restaurant is currently closed. Please try again during opening hours.",
  //       },
  //       { status: 400 }
  //     );
  //   }
  // } catch (err: any) {
  //   console.error("Error checking restaurant hours:", err.message);
  //   return NextResponse.json(
  //     { error: `Failed to check restaurant hours: ${err.message}` },
  //     { status: 500 }
  //   );
  // }

  // Check if the cart is empty
  if (cart.length == 0) {
    console.log("Cart is empty, payment intent was not created.");
    return NextResponse.json({}, { status: 200 });
  }

  // Store the temporary cart data
  try {
    const { data, error } = await supabase
      .from("temporary_orders")
      .insert([{ cart: cart, location_id: location, time_requested: time }])
      .select()
      .single();

    if (error) throw new Error(error.message);
    console.log("Temporary order created with ID:", data.temporary_order_id);
    order_id = data.temporary_order_id;
  } catch (err: any) {
    console.error("Supabase insert error:", err.message);
    return NextResponse.json(
      { error: `Failed to store temporary order - ${err.message}` },
      { status: 500 }
    );
  }

  // Calculate the order amount from the cart
  try {
    promoCode
      ? amount = Math.ceil((await calculateCartPrice(cart, promoCode)) * 1.06)
      : amount = Math.ceil((await calculateCartPrice(cart)) * 1.06);
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
    const paymentIntent = await stripe.paymentIntents.create(
      {
        amount: amount,
        currency: "usd",
        metadata: { id: order_id },
        automatic_payment_methods: { enabled: true },
        application_fee_amount: Math.floor(0.02 * amount),
      },
      {
        stripeAccount: process.env.NEXT_PUBLIC_STRIPE_ACCOUNT,
      }
    );
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

export function OPTIONS() {
  // Enable CORS preflight requests
  return NextResponse.json(
    {},
    { status: 200, headers: { Allow: "POST, OPTIONS" } }
  );
}
