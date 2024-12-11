import Stripe from 'stripe';
import { NextRequest, NextResponse } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia', // Ensure you're using the correct API version
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json(); // Parse JSON from the request body
    const { amount, cart } = body;

    // load cart data into supabase
    // { error, id } = supabase.addRow(cart)

    // calculate cart cost from supabase
    // { cost } = supabase.getCost

    // 



    // Create a payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount || 1000, // Default to $10.00
      currency: 'usd',
      automatic_payment_methods: { enabled: true }
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
