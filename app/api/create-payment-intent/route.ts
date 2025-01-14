import Stripe from 'stripe';
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia',
});

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

// Interface for each item in the cart
export interface ItemData {
  item_name: string;
  item_id: number;
  quantity: number;
  comments: string;
}

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
  cart: ItemData[];
}

// Create cartData variable of type PostData
let cartData: PostData;
let uuid: string;
let amount: number;

export async function POST(req: NextRequest) {
  let body;
  
  // Parse JSON from the request body
  try {
    body = await req.json();
  } catch (err: any) {
    return NextResponse.json({ error: `Failed to parse JSON: ${err.message}` }, { status: 400 });
  }

  const { cart } = body;

  // Store the temporary cart data
  try {
    const { data, error } = await supabase
      .from('temporary_orders')
      .insert([
        { cart, time_created: new Date() },
      ])
      .select()
      .single();
  
    if (error) throw new Error(error.message);
    console.log('Temporary order created with UUID:', data.id);
    uuid = data.id;
  } catch (err: any) {
    console.error('Supabase insert error:', err.message);
    return NextResponse.json({ error: `Failed to store temporary order - ${err.message}` }, { status: 500 });
  }
  

  // Calculate the order amount from the cart
  try {
    amount = await calculateCartPrice(cart);
    console.log('Calculated cart total (in cents):', amount);
  } catch (err: any) {
    console.error('Error in calculateCartPrice:', err.message);
    return NextResponse.json({ error: `Failed to calculate cart price: ${err.message}` }, { status: 500 });
  }

  // Create a PaymentIntent with the order amount and currency
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      metadata: { id: uuid, name: 'gyatlirizz' },
      automatic_payment_methods: { enabled: true },
    });
    console.log('PaymentIntent created successfully:', paymentIntent.id);
    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (err: any) {
    console.error('Stripe PaymentIntent error:', err.message);
    return NextResponse.json({ error: `Failed to create payment intent - ${err.message}` }, { status: 500 });
  }
}

export async function calculateCartPrice(cart: ItemData[]) {
  let amount = 5;

  
  try {
    for (const item of cart) {
      const price = await getPrice(item.item_id);
      console.log(`Item: ${item.item_name}, ID: ${item.item_id}, Quantity: ${item.quantity}, Price: ${price}`);
      amount += item.quantity * price;
    }

    console.log(`Total calculated amount (in cents): ${amount}`);

    if (amount <= 0) {
      throw new Error('Invalid cart total: Check item prices or quantities');
    }

    return amount;
  } catch (err: any) {
    console.error('Error calculating cart price:', err.message);
    throw new Error(`Error in calculateCartPrice: ${err.message}`);
  }
}

export async function getPrice(itemId: number) {
  // Fetch the price of an item from the database
  try {
    const { data, error } = await supabase
      .from('items')
      .select('price')
      .eq('item_id', itemId)
      .single();

    if (error) {
      throw new Error(`Supabase error fetching item price: ${error.message}`);
    }

    if (!data) {
      throw new Error(`Item not found: ${itemId}`);
    }

    console.log('Fetched price (in cents):', data.price * 100);
    return data.price * 100; // Convert to cents
  } catch (err: any) {
    console.error(`Error fetching price for item ${itemId}:`, err.message);
    throw new Error(`Error in getPrice for itemId ${itemId}: ${err.message}`);
  }
}

export function OPTIONS() {
  // Enable CORS preflight requests
  return NextResponse.json({}, { status: 200, headers: { Allow: 'POST, OPTIONS' } });
}
