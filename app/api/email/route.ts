import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { createClient } from "@supabase/supabase-js";
import { OrderedItemData } from '@/app/interfaces';

const resend = new Resend(process.env.RESEND_API_KEY);
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SECRET_KEY!);

export async function POST(req: Request) {
  try {
    const { to, customerName, locationID, orderItems, readyTime, paymentStatus } = await req.json();

    if (!to || !customerName || !locationID || !orderItems || !readyTime || !paymentStatus) {
      return NextResponse.json({ status: 'Missing parameters' }, { status: 400 });
    }

    const orderDetails = orderItems.map((item: OrderedItemData) => `
      Item: ${item.item_name}
      Quantity: ${item.quantity}
      Modifications: ${item.modifications.map((mod: any) => mod.modification_name).join(', ') || 'None'}
      Comments: ${item.comments || 'None'}
    `).join('\n\n');

    const franchiseId = process.env.NEXT_PUBLIC_FRANCHISE_ID;

    const { data: franchiseData, error: franchiseError } = await supabase
      .from('franchise')
      .select('name')
      .eq('franchise_id', franchiseId)
      .single();

    if (franchiseError) {
      console.error('Error fetching franchise name:', franchiseError);
      return NextResponse.json({ status: 'Error fetching franchise name' }, { status: 500 });
    }

    const restaurantName = franchiseData?.name || 'Franchise Name Not Found';

    const { data: locationData, error: locationError } = await supabase
      .from('locations')
      .select('location_name')
      .eq('location_id', locationID)
      .single();

    if (locationError) {
      console.error('Error fetching location name:', locationError);
      return NextResponse.json({ status: 'Error fetching location name' }, { status: 500 });
    }

    const locationName = locationData?.location_name || 'Location Name Not Found';


    const data = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: to,
      subject: 'Order Confirmation',
      html: ` 
        <p>Dear ${customerName},</p>
        <p>Thank you for your order from ${restaurantName} - ${locationName}.</p>
        <p><b>Payment Status:</b> ${paymentStatus}</p>
        <p><b>Order Details:</b></p>
        <pre>${orderDetails}</pre>
        <p><b>Ready Time:</b> ${readyTime}</p>
        <p>We will notify you when your order is ready for pickup/delivery.</p>
        <p>Thank you for choosing us!</p>
      `,
    });

    return NextResponse.json({ status: 'Email sent successfully', data });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ error });
  }
}
