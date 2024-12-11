import Stripe from 'stripe';
import { NextRequest, NextResponse } from 'next/server';
import { Item } from '@/slices/cartSlice';
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

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


  //this runs if payment goes through ==================================
  if (event.type == "charge.succeeded") {
    //gets entire charge object into the scope of this code
    const charge = event.data.object;
    //get UUID from said charge object
    const cartUUID = charge.metadata.uuid;

    //log the UUID for troubleshooting purposes
    console.log("Charge metadata:", cartUUID)

    //try getting cart json given a UUID ================================
    try{
      const { data, error } = await supabase
      .from("temporary_orders")
      .select("cart")
      .eq("id", cartUUID) //find a matching row with the same id as the metadata
      .single(); //fetch data

      //error handling
      if (error) {
        console.error("error fetching data from supabase:", error.message);
      } else {
        console.log("Cart Data:", data.cart);
      }
    } 
    //catch errors
    catch (err: any) {
      console.error("Unexpected error when getting intial data from Supabase:", err.message);
      return { success: false, error: err.message}
    }
    
    //once cart data is here, TRY to wipe that line in the temp table =========================
    try {
      const {error} = await supabase
      .from("temporary_orders")
      .delete()
      .eq("id", cartUUID)

      //more error handling
      if (error) {
        console.error("Error when trying to delete row from temporary orders table:", error.message);
        return { success: false, error: error.message }
      }
    }
    //catch error so code doesnt shit itself
    catch(err: any) {
      console.error("unexpected error when trying to delete row from supabase:", err.message);
      return { success: false, error: err.message }
    }
   

    //populate proper rows ========================================

    const data.cart = JSON.parse(rawBody); //find a way to properly parse data.cart

    //check if customer exists
    const { data: customerData, error: customerError } = await supabase
      .from('customers')
      .select('customer_id')
      .eq('email', data.email)
      .single(); //get first match based on email
  
    let customer_id: string;
  
    if (customerError || !customerData) {
      //insert a new customer if they dont already exist
      const { data: insertCustomerData, error: insertCustomerError } = await supabase
        .from('customers')
        .insert([
          {
            first_name: data.customer_first_name,
            last_name: data.customer_last_name,
            email: data.email,
            phone_number: data.phone_number,
          },
        ]);
  
      if (insertCustomerError) {
        console.error('Error inserting new customer:', insertCustomerError.message);
        return NextResponse.json({ error: 'Failed to insert customer' }, { status: 500 });
      }
  
      customer_id = insertCustomerData[0].customer_id;
    } else {
      // Customer exists
      customer_id = customerData.customer_id;
    }
  
    // Step 2: Insert order data
    const { location_id, time_placed, time_requested, location, is_pickup, status_id, cart } = data;
  
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
      .select('order_id') // Ensure we get the order_id back
      .single();
  
    if (orderError) {
      console.error('Error inserting order:', orderError.message);
      return NextResponse.json({ error: 'Failed to insert order' }, { status: 500 });
    }
  
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
  


    //this try block will error if the cart is by chance null, bc we're using the ! operator
    //find a way to access the json cart data shit in the scope of this try block (i dont know shitscript)
    //calling the postCartData to send all the relevant info to the tablets. i will need to update my api so theres no redundant code
    try {
      const response = await postCartData(data!.cart);
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


//THIS FUNCTION IS TO BE CHANGED SO ITS STRICTLY SENDING TO THE TABLETS
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