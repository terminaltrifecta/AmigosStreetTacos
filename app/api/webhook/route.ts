import Stripe from 'stripe';
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from "@supabase/supabase-js";
import { PostData, ItemData, CustomerData } from '@/app/interfaces';

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!);

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2024-11-20.acacia',
});

const endpointSecret = process.env.WEBHOOK_SECRET;

//create cartData variable to host json
let rawCartData; 

//function is called upon recieving webhook from stripe
export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const sig = req.headers.get("stripe-signature");
  let event: Stripe.Event;
  let result = "Webhook called.";
  let uuid: string | undefined;

  try {
    event = stripe.webhooks.constructEvent(rawBody, sig!, endpointSecret!);
    const paymentIntent = event.data.object as Stripe.PaymentIntent;
    uuid = paymentIntent.metadata?.id;
  } catch (err: unknown) {
    const errorMessage = (err instanceof Error) ? err.message : 'Error extrating data from Payment Intent object';
    console.error("Error extrating data from Payment Intent object:", errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }

  
  if (event.type === "charge.succeeded") {
    //gets the json from the uuid of the charge
    try {
      const cart = await fetchAndFormatCart(uuid);
      const customer = await getCustomer("gmandwee@bruh.outlook");

      const packageData: PostData = {
        customer_first_name: customer.first_name,
        customer_last_name: customer.last_name,
        email: customer.email,
        phone_number: customer.phone_number,
        location_id: 3,
        time_placed: new Date(),
        time_requested: null,
        location: null,
        is_pickup: true,
        status_id: 1,
        cart: cart,
        customer_id: customer.customer_id
      } 

      await sendCartData(packageData);

    } catch (err:any) {
      console.error('Unexpected error:', err);  // Log the entire error object
      return NextResponse.json({ error: 'An unexpected error occurred', details: err.message || 'No message' }, { status: 500 });
    }

    //200 OK
    return NextResponse.json({ received: true, status: result });

  } else if (event.type === "payment_intent.succeeded" || "payment_intent.created") {
    console.log(`Event type recieved: ${event.type}`);
    return NextResponse.json({ message: "Event type not handled" }, { status: 200 });
  } else {
    console.warn(`Unhandled event type ${event.type}`);
    return NextResponse.json({ message: "Event type not handled" }, { status: 200 });
  }
}

async function getCustomer(email: string): Promise<CustomerData> {
  // Initialize variable for customerData
  let customerData: CustomerData | null = null;
  
  try {
    // Step 1: Try to retrieve existing customer
    const { data, error } = await supabase
      .from('customers')
      .select("*")
      .eq('email', email)
      .single();  // Fetch a single customer based on email

    // If there's no error and data is returned, assign it to customerData
    if (!error && data) {
      customerData = data;
    }

  } catch (err) {
    // Log actual unexpected errors (such as connection issues or query errors)
    console.error('Error fetching customer data:', err);
    throw new Error('Failed to retrieve customer data');
  }

  // Step 2: If customerData is found, return it
  if (customerData) {
    return customerData;
  }

  // Step 3: If no customer is found or an error occurred during retrieval, create a new customer
  console.log('Customer not found or error occurred, creating new customer');
  
  try {
    const { data: newCustomerData, error: newCustomerError } = await supabase
      .from('customers')
      .insert([{
        first_name: "Eric",
        last_name: "Mize",
        email: email,  // Use the provided email
        phone_number: 5869025812,  // You can change this as needed
      }])
      .select('*')
      .single();

    if (newCustomerError || !newCustomerData) {
      console.error('Error creating new customer:', newCustomerError ? newCustomerError.message : 'Unknown error');
      throw new Error('Failed to insert customer');
    }

    return newCustomerData;

  } catch (err) {
    // Log unexpected errors during customer creation
    console.error('Error during customer creation:', err);
    throw new Error('Failed to retrieve or create customer data');
  }
}


async function fetchAndFormatCart(uuid: string): Promise<ItemData[]> {
  try {
    // Step 1: Fetch data from Supabase
    let { data, error } = await supabase
      .from('temporary_orders')
      .select('cart')
      .eq('id', uuid)
      .limit(1);

    if (error) {
      throw new Error(`Error fetching data: ${error.message}`);
    }

    if (!data || data.length === 0) {
      throw new Error('No data retrieved from Supabase');
    }

    const rawCart = data[0].cart;

    if (!Array.isArray(rawCart)) {
      throw new Error('Cart data is not an array');
    }

    // Step 2: Map data to the ItemData format
    const cart: ItemData[] = rawCart.map((item: ItemData) => ({
      item_id: item.item_id,
      comments: item.comments || '', // Ensure comments is an empty string if null
      quantity: item.quantity,
      item_name: item.item_name,
    }));

    return cart;
  } catch (err) {
    console.error(err);
    throw new Error('Failed to fetch and format cart data');
  }
}

async function sendCartData(postData: PostData) {
  try {
    // Step 1: Validate input
    if (!postData.cart || postData.cart.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
    }

    // Step 2: Create a new order
    const { data: orderData, error: orderError } = await supabase
      .from('orders')
      .insert([
        {
          location_id: postData.location_id,
          customer_id: postData.customer_id,
          time_placed: postData.time_placed,
          time_requested: postData.time_requested,
          location: postData.location,
          is_pickup: postData.is_pickup,
          status_id: postData.status_id,
        },
      ])
      .select('order_id')
      .single();

    if (orderError) {
      console.error('Error creating order:', orderError.message);
      return NextResponse.json({ error: 'Failed to create new order' }, { status: 500 });
    }

    // Step 3: Insert cart items into the ordered_items table
    const itemsToInsert = postData.cart.map((item) => ({
      order_id: orderData.order_id,
      item_id: item.item_id,
      quantity: item.quantity,
      comments: item.comments || '',
    }));

    const { error: itemsError } = await supabase.from('ordered_items').insert(itemsToInsert);

    if (itemsError) {
      console.error('Error inserting cart items:', itemsError.message);

      // Optional: Clean up the created order if item insertion fails
      const { error: cleanupError } = await supabase
        .from('orders')
        .delete()
        .eq('order_id', orderData.order_id);

      if (cleanupError) {
        console.error('Error cleaning up order:', cleanupError.message);
      }

      return NextResponse.json({ error: 'Failed to insert cart items' }, { status: 500 });
    }

    // Step 4: Return success response
    return NextResponse.json({ message: 'Order and cart items inserted successfully' }, { status: 200 });

  } catch (error) {
    console.error('Unexpected error:', error);

    // Handle unexpected errors
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}

export const config = { api: { bodyParser: false } };