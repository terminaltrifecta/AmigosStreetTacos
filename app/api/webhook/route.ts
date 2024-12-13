import Stripe from 'stripe';
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from "@supabase/supabase-js";
import { createServerClient } from '@supabase/ssr';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!);

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY as string, {
  apiVersion: '2024-11-20.acacia',
});

const endpointSecret = process.env.NEXT_PUBLIC_WEBHOOK_SECRET;

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

//function is called upon recieving webhook from stripe
export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const sig = req.headers.get("stripe-signature");
  let event: Stripe.Event;
 // let uuid: string | undefined;
  let result = "Webhook called.";

  //test uuid to see if supabase functionality works
  const uuid = "6f8c3d16-ea81-4b7e-a324-876e2e1f6e98";

  //get uuid FROM payment intent object metadata
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig!, endpointSecret!);
    const paymentIntent = event.data.object as Stripe.PaymentIntent;
    //uuid = paymentIntent.metadata?.uuid;
  } catch (err: unknown) {
    const errorMessage = (err instanceof Error) ? err.message : 'Error extrating data from Payment Intent object';
    console.error("Error extrating data from Payment Intent object:", errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }

  
  //if block only runs and handles charge succeeded event from stripe
  if (event.type === "charge.succeeded") {
    //check the value of the uuid variable (does it exist)
    console.log("Charge metadata:", uuid);
    console.log("okay really cool now");

    let { data: temporary_orders, error } = await supabase
      .from('temporary_orders')
      .select('*');

    console.log(temporary_orders);

  //see if there exists a row in the temporary orders table with a matchiing uuid value
    // try {
      
    // let { data: temporary_orders, error } = await supabase
    //   .from('temporary_orders')
    //   .select('*')
    //   .limit(1)
    //   .single();
        
    //   //error handling
    //   if (error) throw new Error(error.message);

    //   //set global cartData variable equals to cart value of data
    //   //exclamation mark ensures no null value will be passed
    //   cartData = JSON.parse(temporary_orders);

    //   //log what the cartData actually is
    //   console.log("Cart Data:", cartData);


    //   //error handling
    // } catch (error: unknown) {
    //   const errorMessage = (error instanceof Error) ? error.message : 'Unknown error fetching or parsing cart data';
    //   console.error("Error fetching or parsing cart data:", errorMessage);
    //   return NextResponse.json({ error: errorMessage }, { status: 500 });
    // }



    //delete that row in the temporary table with a matching uuid value

    /*
    try {
      // Delete the row in the temporary_orders table
      const { error } = await supabase
        .from("temporary_orders")
        .delete()
        .eq("id", uuid);

        //error handling
      if (error) throw new Error(error.message);
    } catch (error: unknown) {
      const errorMessage = (error instanceof Error) ? error.message : 'Unknown error deleting temporary order';
      console.error("Error deleting temporary order:", errorMessage);
      return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
      */

    //make sure that cartData isnt null before proceeding
    // if (cartData) {
    //   let customer_id: string;

    //   try {
    //     //check there exists a customer email which matches the customer email from the temporary orders table
    //     const { data: customerData, error: customerError } = await supabase
    //       .from('customers')
    //       .select('customer_id')
    //       .eq('email', cartData.email)
    //       .single();

    //       //if theres an error or the data doesnt exist from the customers table
    //     if (customerError || !customerData) {
    //       const { data: insertCustomerData, error: insertCustomerError } = await supabase
    //       //insert a row with the information from the temporary orders table
    //         .from('customers')
    //         .insert([
    //           {
    //             first_name: cartData.customer_first_name,
    //             last_name: cartData.customer_last_name,
    //             email: cartData.email,
    //             phone_number: cartData.phone_number,
    //           },
    //         ])
    //         .select('customer_id')
    //         .single();

    //         //if an error is thrown then handle the error
    //       if (insertCustomerError || !insertCustomerData) {
    //         throw new Error('Failed to insert customer');
    //       }


    //       //not sure what these lines are doing
    //       customer_id = insertCustomerData.customer_id;
    //     } else {
    //       customer_id = customerData.customer_id;
    //     }

    //     //these variables are from the cartData
    //     const { location_id, time_placed, time_requested, location, is_pickup, status_id, cart } = cartData;

    //     //insert them into the orders table
    //     const { data: orderResponse, error: orderError } = await supabase
    //       .from('orders')
    //       .insert([
    //         {
    //           location_id,
    //           customer_id,
    //           time_placed,
    //           time_requested,
    //           location,
    //           is_pickup,
    //           status_id,
    //         },
    //       ])

    //       //select order_id for some reason?
    //       .select('order_id')
    //       .single();


    //     //handle error so code doesnt shit itself
    //     if (orderError) throw new Error('Failed to insert order');

    //     //uhhhh take the order_id i guess
    //     const order_id = orderResponse.order_id;

    //     //insert cart items into ordered items table
    //     for (const item of cart) {
    //       const { item_id, quantity, comments } = item;

    //       const { error: itemError } = await supabase
    //         .from('ordered_items')
    //         .insert([
    //           {
    //             order_id,
    //             item_id,
    //             quantity,
    //             comments,
    //           },
    //         ]);

    //       //handle error yadda yadda
    //       if (itemError) {
    //         console.error('Error inserting item:', itemError.message);
    //         return NextResponse.json({ error: 'Failed to insert cart item' }, { status: 500 });
    //       }
    //     }

    //     // Now post the data to the tablets
    //     try {
    //       //wait for promise 200 OK from zorgapi and pass cartData
    //       const response = await postCartData(cartData);
    //       //return 200 OK
    //       return NextResponse.json({ success: true, data: response });
    //     } catch (error: unknown) {
    //       //return not OK and code shit itself
    //       const errorMessage = (error instanceof Error) ? error.message : 'Unknown error posting cart data';
    //       console.error('Error handling POST request:', errorMessage);
    //       return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
    //     }
    //     //catch more errors
    //   } catch (error: unknown) {
    //     const errorMessage = (error instanceof Error) ? error.message : 'Unknown error in customer order process';
    //     console.error("Error in customer order process:", errorMessage);
    //     return NextResponse.json({ error: errorMessage }, { status: 500 });
    //   }
    // }
    //this is down here in case this api recieves some other event type from stripe
  } else {
    console.warn(`Unhandled event type ${event.type}`);
  }

  //200 OK
  return NextResponse.json({ received: true, status: result });
}

//aysnchronous function to establish connection to POSTing to le api
async function postCartData(data: PostData): Promise<any> {
  try {
    const response = await fetch('https://claws-api.onrender.com/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    //error handling
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
