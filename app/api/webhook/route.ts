import Stripe from 'stripe';
import { NextRequest, NextResponse } from 'next/server';
import { Item } from '@/slices/cartSlice';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2024-11-20.acacia', // Ensure you're using the correct API version
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

const cart = [{
  "item_name": "Carne Asada Taco",
  "item_id": 1,
  "quantity": 3,
  "comments": "Garlic on da side!"
  },
  {
  "item_name": "Chicken Taco",
  "item_id": 2,
  "quantity": 2,
  "comments": "errrxtra garlic chile!"
}]


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
    cart: cart,
};

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const sig = req.headers.get("stripe-signature");

  let event;
  let metadata;
  let result = "Webhook called.";

  try {
    event = stripe.webhooks.constructEvent(rawBody, sig!, endpointSecret!);
    const paymentIntent = event.data.object; // This is the PaymentIntent object
    metadata = paymentIntent.
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 400 })
  }

  if (event.type == "charge.succeeded") {
    //this runs if payment goes through

    try {
      const response = await postCartData(postData);
      return NextResponse.json({ success: true, data: response });
    } catch (error:any) {
      console.error('Error handling POST request:', error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }


  } else {
    console.warn(`Unhandled event type ${event.type}`)
  }

  return NextResponse.json({ recieved: true, status: result })
}

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
      throw new Error(`Failed to post data. Status: ${response.status}, Body: ${await response.text()}`);
    }

    return await response.json(); // Return the JSON response from the API
  } catch (error) {
    console.error('Error posting cart data:', error);
    throw error; // Re-throw the error to handle it further up the chain
  }
};

export const config = { api: { bodyParser: false } };