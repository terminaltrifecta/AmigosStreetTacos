import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { PostData, OrderedItemData, CustomerData } from "@/app/interfaces";
import { addMinutes } from "date-fns";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SECRET_KEY!
);

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY! as string, {
  apiVersion: "2024-11-20.acacia",
});

const endpointSecret = process.env.WEBHOOK_SECRET!;

//function is called upon recieving webhook from stripe
export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const sig = req.headers.get("stripe-signature");
  let event: Stripe.Event;
  let result = "Webhook called.";
  let id: string | undefined;
  let firstName: string | undefined;
  let lastName: string | undefined;
  let email: string | undefined;
  let phone: string | undefined;

  try {
    event = stripe.webhooks.constructEvent(rawBody, sig!, endpointSecret!);
    const charge = event.data.object as Stripe.Charge;

    if (!charge.billing_details || !charge.billing_details.name) {
      throw new Error("Billing details or name is missing");
    }

    id = charge.metadata?.id;
    phone = charge.billing_details.phone!;
    ({ firstName, lastName } = formatName(charge.billing_details.name));
    email = charge.billing_details.email!;
  } catch (err: unknown) {
    const errorMessage =
      err instanceof Error
        ? err.message
        : "Error extracting data from Payment Intent object";
    console.error(
      "Error extracting data from Payment Intent object:",
      errorMessage
    );
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }

  if (event.type === "charge.succeeded") {
    //gets the json from the uuid of the charge
    try {
      const { cart, timeRequested, location, promotion_id } =
        await fetchAndFormatCart(id);

      const customer = await getCustomer(firstName, lastName, email, phone);

      const packageData: PostData = {
        customer_first_name: customer.first_name,
        customer_last_name: customer.last_name,
        email: customer.email,
        phone_number: customer.phone_number,
        location_id: location,
        time_requested: timeRequested,
        location: null,
        is_pickup: true,
        status_id: 1,
        cart: cart,
        customer_id: customer.customer_id,
        promotion_id: promotion_id || null,
      };

      const response = await sendCartData(packageData);

      const readyTime = addMinutes(new Date(), timeRequested);

      // Send email confirmation
      const emailResponse = await sendEmail(
        firstName,
        lastName,
        email,
        cart,
        readyTime,
        location,
        "Successful"
      );
    } catch (err: any) {
      console.error("Unexpected error:", err); // Log the entire error object
      return NextResponse.json(
        {
          error: "An unexpected error occurred",
          details: err.message || "No message",
        },
        { status: 500 }
      );
    }

    //200 OK
    return NextResponse.json({ received: true, status: result });
  } else if (
    event.type === "payment_intent.succeeded" ||
    "payment_intent.created"
  ) {
    console.log(`Event type received: ${event.type}`);
    return NextResponse.json(
      { message: "Event type not handled" },
      { status: 200 }
    );
  } else {
    console.warn(`Unhandled event type ${event.type}`);
    return NextResponse.json(
      { message: "Event type not handled" },
      { status: 200 }
    );
  }
}

async function getCustomer(
  firstName: string,
  lastName: string,
  email: string,
  phone: string
): Promise<CustomerData> {
  // Initialize variable for customerData
  let customerData: CustomerData | null = null;
  console.log("Get customer has been called", phone);

  try {
    // Step 1: Try to retrieve existing customer
    const { data, error } = await supabase
      .from("customers")
      .select("*")
      .eq("email", email)
      .single(); // Fetch a single customer based on email

    // If there's no error and data is returned, assign it to customerData
    if (!error && data) {
      customerData = data;
    }
  } catch (err) {
    // Log actual unexpected errors (such as connection issues or query errors)
    console.error("Error fetching customer data:", err);
    throw new Error("Failed to retrieve customer data");
  }

  // Step 2: If customerData is found, return it
  if (customerData) {
    return customerData;
  }

  // Step 3: If no customer is found or an error occurred during retrieval, create a new customer
  console.log("Customer not found or error occurred, creating new customer");

  try {
    const { data: newCustomerData, error: newCustomerError } = await supabase
      .from("customers")
      .insert([
        {
          first_name: firstName,
          last_name: lastName,
          email: email, // Use the provided email
          phone_number: phone, // You can change this as needed
        },
      ])
      .select("*")
      .single();

    if (newCustomerError || !newCustomerData) {
      console.error(
        "Error creating new customer:",
        newCustomerError ? newCustomerError.message : "Unknown error"
      );
      throw new Error("Failed to insert customer");
    }

    return newCustomerData;
  } catch (err) {
    // Log unexpected errors during customer creation
    console.error("Error during customer creation:", err);
    throw new Error("Failed to retrieve or create customer data");
  }
}

async function fetchAndFormatCart(id: string): Promise<{
  cart: OrderedItemData[];
  timeRequested: number;
  location: number;
  promotion_id?: number;
}> {
  try {
    console.log("id", id);

    // Step 1: Fetch data from Supabase
    let { data, error } = await supabase
      .from("temporary_orders")
      .select("*")
      .eq("temporary_order_id", id)
      .limit(1)
      .single();

    if (error) {
      throw new Error(`Error fetching data: ${error.message}`);
    }

    if (!data || data.length === 0) {
      throw new Error("No data retrieved from Supabase");
    }
    return {
      cart: data.cart,
      timeRequested: data.time_requested,
      location: data.location_id,
      promotion_id: data.promotion_id,
    };
  } catch (err) {
    console.error(err);
    throw new Error("Failed to fetch and format cart data");
  }
}

async function sendCartData(postData: PostData) {
  try {
    // Step 1: Validate input
    if (!postData.cart || postData.cart.length === 0) {
      console.error("Cart is empty");
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    // Step 2: Create a new order
    const { data: orderData, error: orderError } = await supabase
      .from("orders")
      .insert([
        {
          location_id: postData.location_id,
          customer_id: postData.customer_id,
          time_requested: postData.time_requested,
          location: postData.location,
          is_pickup: postData.is_pickup,
          status_id: postData.status_id,
          promotion_id: postData.promotion_id
        },
      ])
      .select("order_id, time_placed, time_requested")
      .single();

    if (orderError) {
      console.error("Error creating order:", orderError.message);
      return NextResponse.json(
        { error: "Failed to create new order" },
        { status: 500 }
      );
    }

    console.log("Order created successfully:", orderData);

    // Step 3: Insert cart items into the ordered_items table
    const itemsToInsert = postData.cart.map((item) => ({
      order_id: orderData.order_id,
      item_id: item.item_id,
      quantity: item.quantity,
      comments: item.comments || "",
    }));

    const { data: insertedItems, error: itemsError } = await supabase
      .from("ordered_items")
      .insert(itemsToInsert)
      .select("ordered_item_id");

    if (itemsError) {
      console.error("Error inserting cart items:", itemsError.message);

      // Optional: Clean up the created order if item insertion fails
      const { error: cleanupError } = await supabase
        .from("orders")
        .delete()
        .eq("order_id", orderData.order_id);

      if (cleanupError) {
        console.error("Error cleaning up order:", cleanupError.message);
      }

      return NextResponse.json(
        { error: "Failed to insert cart items" },
        { status: 500 }
      );
    }

    console.log("Cart items inserted successfully");

    // Step 4: Insert modifications into the modified_ordered_items table
    const modificationsToInsert = postData.cart.flatMap((item, i) =>
      item.modifications.map((mod) => ({
        ordered_item_id: insertedItems[i].ordered_item_id,
        modification_id: mod.modification_id,
      }))
    );

    const { error: modsError } = await supabase
      .from("modified_ordered_items")
      .insert(modificationsToInsert);

    if (modsError) {
      console.error("Error inserting modifications:", modsError.message);
      return NextResponse.json(
        { error: "Failed to insert modifications" },
        { status: 500 }
      );
    }

    // Step 5: Return success response
    const readyTime = addMinutes(
      orderData.time_placed,
      orderData.time_requested
    );
    return NextResponse.json(
      {
        message: "Order and cart items inserted successfully",
        readyTime: readyTime,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Unexpected error:", error);

    // Handle unexpected errors
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}

async function sendEmail(
  firstName: string,
  lastName: string,
  email: string,
  cart: OrderedItemData[],
  readyTime: Date,
  location: number,
  status: string
) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
      : "http://localhost:3000";
    await fetch(`${baseUrl}/api/email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        to: email,
        customerName: firstName + " " + lastName,
        locationID: location,
        orderItems: cart,
        readyTime: readyTime,
        paymentStatus: status,
      }),
    });
  } catch (emailError) {
    console.error("Error sending email:", emailError);
  }
}

function formatName(fullName: string) {
  if (!fullName) {
    throw new Error("Full name is missing");
  }

  // Trim and normalize whitespace
  const cleanedName = fullName.trim().replace(/\s+/g, " ");

  // Split into first and last name
  const [first, last] = cleanedName.split(" ");

  // Return the formatted names as an object
  return {
    firstName: first.toLowerCase(),
    lastName: last.toLowerCase(),
  };
}
