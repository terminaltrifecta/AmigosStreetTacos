import Stripe from 'stripe';
import { NextRequest, NextResponse } from 'next/server';
import { useAppSelector } from '@/lib/hooks';
import { RootState } from '@/lib/store';
import usePostMutation, { PostData } from '@/app/hooks/usePosts';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2024-11-20.acacia', // Ensure you're using the correct API version
});

const endpointSecret = process.env.WEBHOOK_SECRET;

const { mutate, error } = usePostMutation();

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const sig = req.headers.get("stripe-singature")

  let event;
  let result = "Webhook called.";

  try {
    event = stripe.webhooks.constructEvent(rawBody, sig!, endpointSecret!);
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 400 })
  }

  if (event.type == "checkout.session.completed") {
    await functionAdd();
  } else {
    console.warn(`Unhandled event type ${event.type}`)
  }

  return NextResponse.json({ recieved: true, status: result })
}
async function handleCompletedCheckoutSession(event: Stripe.CheckoutSessionCompletedEvent) {
    try {
        return functionAdd();
    } catch (err:any) {
        console.error(err);
    }
}


async function functionAdd() {

    const cart = useAppSelector((state: RootState) => state.cart);

    const postData: PostData = {
        customer_first_name: "Aiden",
        customer_last_name: "Alazo",
        email: "luvnataliehanna798@gmail.com",
        phone_number: "5863501415",
        location_id: 2,
        time_placed: "2024-11-26T14:30:00Z",
        time_requested: "2024-11-26T14:30:00Z",
        location: "POINT (-73.935242 40.730610)",
        is_pickup: true,
        status_id: 6,
        cart: cart
    };

    mutate(postData);

    if (error) {
        console.error(error);
    } else {
        return postData;
    }

};


export function OPTIONS() {
  // Enable CORS preflight requests (optional but helpful)
  return NextResponse.json({}, { status: 200, headers: { Allow: 'POST, OPTIONS' } });
}
