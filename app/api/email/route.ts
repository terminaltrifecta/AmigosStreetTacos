import { Resend } from "resend";
import { NextResponse } from "next/server";
import OrderConfirmationEmail from "@/app/components/OrderConfirmationEmail";
import { createClient } from "@supabase/supabase-js";
import { ModificationData, OrderedItemData } from "@/app/interfaces";
import { calculateCartPrice } from "@/app/utils/menuUtils";
import { format } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";

const resend = new Resend(process.env.RESEND_API_KEY);
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SECRET_KEY!
);

export async function POST(req: Request) {
  try {
    console.log("Starting email route");
    const {
      to,
      customerName,
      locationID,
      orderItems,
      readyTime,
      paymentStatus,
    } = await req.json();

    console.log("Request body parameters:", {
      to,
      customerName,
      locationID,
      readyTime,
      paymentStatus,
    });

    if (!to || !customerName || !locationID || !orderItems || !paymentStatus) {
      return NextResponse.json(
        { status: "Missing parameters" },
        { status: 400 }
      );
    }

    const franchiseId = process.env.NEXT_PUBLIC_FRANCHISE_ID;

    const { data: franchiseData, error: franchiseError } = await supabase
      .from("franchise")
      .select("name")
      .eq("franchise_id", franchiseId)
      .single();

    if (franchiseError) {
      console.error("Error fetching franchise name:", franchiseError);
      return NextResponse.json(
        { status: "Error fetching franchise name" },
        { status: 500 }
      );
    }

    const restaurantName = franchiseData?.name || "Franchise Name Not Found";

    const { data: locationData, error: locationError } = await supabase
      .from("locations")
      .select("location_name")
      .eq("location_id", locationID)
      .single();

    if (locationError) {
      console.error("Error fetching location name:", locationError);
      return NextResponse.json(
        { status: "Error fetching location name" },
        { status: 500 }
      );
    }

    const locationName =
      locationData?.location_name || "Location Name Not Found";
    console.log("Location name fetched:", locationName);

    const total = await calculateCartPrice(orderItems);

    const formattedTime = formatInTimeZone(readyTime, 'America/New_York', "hh:mm a MM/dd/yyyy");
    console.log("formattedTime", formattedTime);

    console.log("Sending email using Resend");
    const data = await resend.emails.send({
      from: "Amigos Street Tacos <confirmation@zorgotech.com>",
      to: to,
      subject: "Order Confirmation",
      react: OrderConfirmationEmail({
        customerName: customerName,
        restaurantName: restaurantName,
        locationName: locationName,
        paymentStatus: paymentStatus,
        orderItems: orderItems,
        readyTime: formattedTime,
        total: total
      }),
    });

    console.log("Email sent successfully:", data);
    return NextResponse.json({ status: "Email sent successfully", data });
  } catch (resendError: any) {
    // Capture the error from resend.emails.send
    console.error("Resend API Error - Full Object:", resendError);
    return NextResponse.json({ error: resendError }, { status: 400 }); // Return 400 with Resend error
  }
}