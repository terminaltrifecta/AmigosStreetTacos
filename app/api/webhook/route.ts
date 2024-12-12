import Stripe from 'stripe';
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
export const supabase = createClient(SUPABASE_URL!, SUPABASE_ANON_KEY!);

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2024-11-20.acacia',
});

const endpointSecret = process.env.WEBHOOK_SECRET;

export interface ItemData {
  item_name: string;
  item_id: number;
  quantity: number;
  comments: string;
}

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
  cart: ItemData[];
}

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const sig = req.headers.get("stripe-signature");
  let event: Stripe.Event;
  let uuid: string | undefined;
  let result = "Webhook called.";

  try {
    event = stripe.webhooks.constructEvent(rawBody, sig!, endpointSecret!);
    const paymentIntent = event.data.object as Stripe.PaymentIntent;
    uuid = paymentIntent.metadata?.uuid;
  } catch (err: unknown) {
    const errorMessage = (err instanceof Error) ? err.message : 'Unknown error';
    console.error("Error processing webhook:", errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }

  if (event.type === "charge.succeeded") {
    console.log("Charge metadata:", uuid);

    let cartData: PostData | null = null;

    try {
      const { data, error } = await supabase
        .from("temporary_orders")
        .select("cart")
        .eq("id", uuid)
        .single();
      
      if (error) throw new Error(error.message);

      cartData = JSON.parse(data.cart);
      console.log("Cart Data:", cartData);
    } catch (error: unknown) {
      const errorMessage = (error instanceof Error) ? error.message : 'Unknown error fetching or parsing cart data';
      console.error("Error fetching or parsing cart data:", errorMessage);
      return NextResponse.json({ error: errorMessage }, { status: 500 });
    }

    try {
      // Delete the row in the temporary_orders table
      const { error } = await supabase
        .from("temporary_orders")
        .delete()
        .eq("id", uuid);

      if (error) throw new Error(error.message);
    } catch (error: unknown) {
      const errorMessage = (error instanceof Error) ? error.message : 'Unknown error deleting temporary order';
      console.error("Error deleting temporary order:", errorMessage);
      return NextResponse.json({ error: errorMessage }, { status: 500 });
    }

    if (cartData) {
      let customer_id: string;

      try {
        // Check if customer exists
        const { data: customerData, error: customerError } = await supabase
          .from('customers')
          .select('customer_id')
          .eq('email', cartData.email)
          .single();

        if (customerError || !customerData) {
          const { data: insertCustomerData, error: insertCustomerError } = await supabase
            .from('customers')
            .insert([
              {
                first_name: cartData.customer_first_name,
                last_name: cartData.customer_last_name,
                email: cartData.email,
                phone_number: cartData.phone_number,
              },
            ])
            .select('customer_id')
            .single();

          if (insertCustomerError || !insertCustomerData) {
            throw new Error('Failed to insert customer');
          }

          customer_id = insertCustomerData.customer_id;
        } else {
          customer_id = customerData.customer_id;
        }

        // Step 2: Insert order data
        const { location_id, time_placed, time_requested, location, is_pickup, status_id, cart } = cartData;

        const { data: orderResponse, error: orderError } = await supabase
          .from('orders')
          .insert([
            {
              location_id,
              customer_id,
              time_placed,
              time_requested,
              location,
              is_pickup,
              status_id,
            },
          ])
          .select('order_id')
          .single();

        if (orderError) throw new Error('Failed to insert order');

        const order_id = orderResponse.order_id;

        // Step 3: Insert cart items
        for (const item of cart) {
          const { item_id, quantity, comments } = item;

          const { error: itemError } = await supabase
            .from('ordered_items')
            .insert([
              {
                order_id,
                item_id,
                quantity,
                comments,
              },
            ]);

          if (itemError) {
            console.error('Error inserting item:', itemError.message);
            return NextResponse.json({ error: 'Failed to insert cart item' }, { status: 500 });
          }
        }

        // Now post the data to the tablets
        try {
          const response = await postCartData(cartData);
          return NextResponse.json({ success: true, data: response });
        } catch (error: unknown) {
          const errorMessage = (error instanceof Error) ? error.message : 'Unknown error posting cart data';
          console.error('Error handling POST request:', errorMessage);
          return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
        }
      } catch (error: unknown) {
        const errorMessage = (error instanceof Error) ? error.message : 'Unknown error in customer order process';
        console.error("Error in customer order process:", errorMessage);
        return NextResponse.json({ error: errorMessage }, { status: 500 });
      }
    }
  } else {
    console.warn(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ received: true, status: result });
}

// Function to post cart data to tablets
async function postCartData(data: PostData): Promise<any> {
  try {
    const response = await fetch('https://claws-api.onrender.com/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Failed to post data. Status: ${response.status}`);
    }

    return await response.json(); // Return the JSON response from the API
  } catch (error: unknown) {
    const errorMessage = (error instanceof Error) ? error.message : 'Unknown error posting cart data';
    console.error('Error posting cart data:', errorMessage);
    throw error; // Re-throw the error to handle it further up the chain
  }
}

export const config = { api: { bodyParser: false } };
