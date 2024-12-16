import Stripe from 'stripe';
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia', // Ensure you're using the correct API version
});

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!);

//interface for each item in the cart
export interface ItemData {
  item_name: string;
  item_id: number;
  quantity: number;
  comments: string;
}

//interface for the entire order data
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

//create cartData variable of type PostData
let cartData: PostData;
let uuid: string;

export async function POST(req: NextRequest) {

  const body = await req.json(); // Parse JSON from the request body
  const { amount, cart } = body;

  //store the temporary cart data
  try {
    const { data, error } = await supabase
      .from('temporary_orders')
      .insert([
        { cart: cart,
          time_created: new Date()
         },
      ])
      .select()
      .single()

    uuid = data.id;
  } catch (err:any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }

  //create the payment intent  
  try {

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount || 1000, // Default to $10.00
      currency: 'usd',
      metadata: {id: uuid, name: "gyatlirizz"},
      automatic_payment_methods: { enabled: true },
    });

    // Return the client secret
    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export function OPTIONS() {
  // Enable CORS preflight requests (optional but helpful)
  return NextResponse.json({}, { status: 200, headers: { Allow: 'POST, OPTIONS' } });
}
