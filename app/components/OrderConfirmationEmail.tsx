import React from "react";
import { OrderedItemData } from "@/app/interfaces";
import Image from 'next/image'; // Import Image component

interface OrderConfirmationEmailProps {
  customerName: string;
  restaurantName: string;
  locationName: string;
  paymentStatus: string;
  orderItems: OrderedItemData[];
  readyTime: string;
}

function OrderConfirmationEmail({
  customerName,
  restaurantName,
  locationName,
  paymentStatus,
  orderItems,
  readyTime,
}: OrderConfirmationEmailProps) {
  const colors = {
    amigosred: '#dc3c2e',
    amigosyellow: '#e3cc4d',
    amigoswhite: '#fff6eb',
    amigosblack: '#140a02',
  };

  const containerStyle = {
    maxWidth: '680px',
    margin: '20px auto',
    padding: '25px',
    borderRadius: '8px',
    fontFamily: 'Arial, sans-serif',
    color: colors.amigosblack,
    backgroundColor: colors.amigoswhite,
    border: '1px solid #e0e0e0'
  };
  const headerStyle = {
    fontSize: '28px',
    fontWeight: 'bold',
    marginBottom: '20px',
    textAlign: 'left' as 'left',
    color: colors.amigosblack,
    paddingBottom: '8px',
    borderBottom: '2px solid ' + colors.amigosyellow,
    letterSpacing: '0.2px',
  };
  const greetingStyle = {
    fontSize: '15px',
    marginBottom: '15px',
    color: colors.amigosblack,
    fontWeight: 'normal',
    lineHeight: '1.4'
  };
  const sectionStyle = {
    marginBottom: '20px',
    paddingBottom: '15px',
    borderBottom: '1px solid #f2f2f2',
  };
  const sectionTitleStyle = {
    fontWeight: 'bold',
    fontSize: '14px',
    marginBottom: '8px',
    color: colors.amigosred,
    textTransform: 'uppercase' as 'uppercase',
    letterSpacing: '0.6px',
  };
  const orderDetailListStyle = {
    listStyleType: 'none',
    padding: 0,
  };
  const orderDetailItemStyle = {
    marginBottom: '12px',
    paddingLeft: '0',
    borderRadius: '4px',
    padding: '10px',
    backgroundColor: '#fff', // pure white for item background
    border: '1px solid #eee',
  };
  const readyTimeStyle = {
    fontSize: '15px',
    color: colors.amigosred,
    marginTop: '8px',
    fontWeight: 'bold',
    textAlign: 'left' as 'left',
  };
  const footerStyle = {
    marginTop: '25px',
    textAlign: 'left' as 'left',
    color: '#777',
    fontSize: '12px',
    fontStyle: 'italic' as 'italic',
  };
    const brandStyle = {
        fontWeight: 'bold',
        color: colors.amigosred,
    };
    const itemDetailStyle = {
        marginBottom: '6px',
        fontSize: '13px',
        lineHeight: '1.3',
    };
    const paymentStatusStyle = {
        color: paymentStatus === 'Successful' ? 'green' : 'red',
        fontWeight: 'bold',
        fontSize: '14px',
        textAlign: 'left' as 'left',
        marginTop: '6px',
    };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>Order Confirmation</div>

      <div style={sectionStyle}>
        <p style={greetingStyle}>
          Dear <span style={brandStyle}>{customerName}</span>,
        </p>
        <p style={greetingStyle}>
          Thank you for your order from <span style={brandStyle}>{restaurantName}</span> - {locationName}.
        </p>
      </div>

      <div style={sectionStyle}>
        <p style={sectionTitleStyle}>Payment Status</p>
        <p style={paymentStatusStyle}>{paymentStatus}</p>
      </div>

      <div style={sectionStyle}>
        <p style={sectionTitleStyle}>Order Details</p>
        <ul style={orderDetailListStyle}>
          {orderItems.map((item, index) => (
            <li key={index} style={orderDetailItemStyle}>
              <p style={itemDetailStyle}><strong style={brandStyle}>Item:</strong> {item.item_name}</p>
              <p style={itemDetailStyle}><strong style={brandStyle}>Quantity:</strong> {item.quantity}</p>
              <p style={itemDetailStyle}>
                <strong style={brandStyle}>Modifications:</strong> {item.modifications.map((mod: any) => mod.modification_name).join(", ") || "None"}
              </p>
              <p style={itemDetailStyle}><strong style={brandStyle}>Comments:</strong> {item.comments || "None"}</p>
            </li>
          ))}
        </ul>
      </div>

      <div style={sectionStyle}>
        <p style={sectionTitleStyle}>Ready Time</p>
        <div style={readyTimeStyle}>{readyTime ? readyTime : "Sorry, we couldn't load when your order will be ready."}</div>
      </div>

      <p style={footerStyle}>Thank you for choosing us!</p>
    </div>
  );
}

export default OrderConfirmationEmail;
