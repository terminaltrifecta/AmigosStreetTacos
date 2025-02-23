import React from "react";
import { ModificationData, OrderedItemData } from "@/app/interfaces";
import Image from "next/image"; // Import Image component

interface OrderConfirmationEmailProps {
  customerName: string;
  restaurantName: string;
  locationName: string;
  paymentStatus: string;
  orderItems: OrderedItemData[];
  readyTime: string;
  total: number;
}

function OrderConfirmationEmail({
  customerName,
  restaurantName,
  locationName,
  paymentStatus,
  orderItems,
  readyTime,
  total
}: OrderConfirmationEmailProps) {
  const colors = {
    amigosred: "#dc3c2e",
    amigosyellow: "#e3cc4d",
    amigoswhite: "#fff6eb",
    amigosblack: "#140a02",
  };

  const containerStyle = {
    maxWidth: "680px",
    margin: "20px auto",
    padding: "25px",
    borderRadius: "8px",
    fontFamily: "Arial, sans-serif",
    color: colors.amigosblack,
    backgroundColor: "#ffffff",
    border: "2px solid " + colors.amigosblack,
  };
  const headerStyle = {
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "20px",
    textAlign: "left" as "left",
    color: colors.amigosblack,
    paddingBottom: "8px",
    borderBottom: "2px solid " + colors.amigosyellow,
    letterSpacing: "0.2px",
  };
  const greetingStyle = {
    fontSize: "15px",
    marginBottom: "15px",
    color: colors.amigosblack,
    fontWeight: "normal",
    lineHeight: "1.4",
  };
  const sectionStyle = {
    marginBottom: "20px",
  };
  const sectionTitleStyle = {
    fontWeight: "bold",
    fontSize: "14px",
    marginBottom: "8px",
    color: colors.amigosblack,
    textTransform: "uppercase" as "uppercase",
    letterSpacing: "0.6px",
  };
  const orderDetailListStyle = {
    listStyleType: "none",
    padding: 0,
  };
  const orderDetailItemStyle = {
    marginBottom: "12px",
    borderRadius: "4px",
    padding: "10px",
    backgroundColor: colors.amigoswhite,
    border: "2px solid " + colors.amigosyellow,
  };
  const footerStyle = {
    marginTop: "25px",
    textAlign: "left" as "left",
    color: "#777",
    fontSize: "12px",
    fontStyle: "italic" as "italic",
  };
  const brandStyle = {
    fontWeight: "bold",
    color: colors.amigosblack,
  };
  const itemDetailStyle = {
    marginBottom: "6px",
    fontSize: "13px",
    lineHeight: "1.3",
  };
  const paymentStatusStyle = {
    color: paymentStatus === "Successful" ? "green" : "red",
    fontWeight: "bold",
    fontSize: "14px",
    textAlign: "left" as "left",
    marginTop: "6px",
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        {paymentStatus == "Successful"
          ? "Order Confirmed"
          : "Error Confirming Order"}
      </div>

      <div style={sectionStyle}>
        <p style={greetingStyle}>
          Dear <span style={brandStyle}>{customerName}</span>,
        </p>
        <p style={greetingStyle}>
          We have recieved your order for{" "}
          <span style={brandStyle}>{restaurantName}</span> at {locationName}.
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
              <p style={itemDetailStyle}>
                <strong style={brandStyle}>Item:</strong> {item.item_name}
              </p>
              <p style={itemDetailStyle}>
                <strong style={brandStyle}>Quantity:</strong> {item.quantity}
              </p>
              <p style={itemDetailStyle}>
                <strong style={brandStyle}>Price:</strong> $
                {item.price * item.quantity}
              </p>

              {item.comments && (
                <p style={itemDetailStyle}>
                  <strong style={brandStyle}>Comments:</strong> {item.comments}
                </p>
              )}

              {item.modifications.length > 0 && (
                <p style={itemDetailStyle}>
                  <strong style={brandStyle}>Modifications:</strong>
                  <ul>
                    {item.modifications.map((mod: ModificationData) => {
                      return (
                        <li className="">
                          <p style={itemDetailStyle}>
                            <strong style={brandStyle}>Modification:</strong>{" "}
                            {mod.modification}
                          </p>
                          <p style={itemDetailStyle}>
                            <strong style={brandStyle}>Price:</strong> $
                            {mod.price / 100}
                          </p>
                        </li>
                      );
                    })}
                  </ul>
                </p>
              )}
            </li>
          ))}
        </ul>

        <p style={itemDetailStyle}>
          Subtotal: ${Math.ceil(total/100)}
        </p>
        <p style={itemDetailStyle}>
          <strong style={brandStyle}>Total:</strong> ${Math.ceil(total * 1.06 / 100)}
        </p>
      </div>

      <div style={sectionStyle}>
        <p style={sectionTitleStyle}>Ready Time</p>
        <div style={itemDetailStyle}>
          {readyTime
            ? readyTime
            : "Sorry, we couldn't load when your order will be ready."}
        </div>
      </div>

      <p style={footerStyle}>Thank you for choosing us!</p>
    </div>
  );
}

export default OrderConfirmationEmail;
