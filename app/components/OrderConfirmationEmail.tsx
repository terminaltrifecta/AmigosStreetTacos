import { ModificationData, OrderedItemData } from "@/app/interfaces";
import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import * as React from "react";

interface VercelInviteUserEmailProps {
  customerName: string;
  restaurantName: string;
  locationName: string;
  paymentStatus: string;
  orderItems: OrderedItemData[];
  readyTime: string;
  total: number;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "https://localhost:3000";

export const VercelInviteUserEmail = ({
  customerName,
  restaurantName,
  locationName,
  paymentStatus,
  orderItems,
  readyTime,
  total,
}: VercelInviteUserEmailProps) => {
  const previewText = `Order at ${restaurantName} was successful!`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans px-2 text-center">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
            <Section className="mt-[32px]">
              <Img
                src={`${baseUrl}/static/assets/amigoslogo.png`}
                width="100"
                height="80"
                alt="Amigos Street Tacos"
                className="my-0 mx-auto"
              />
            </Section>
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
              We have recieved your order for <strong>{restaurantName}</strong>{" "}
              at <strong>{locationName}</strong>
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">
              Hello {customerName}.
            </Text>
            <Section>
              {orderItems.map((item, index) => (
                <Section key={index} className="m-2 border-2 border-black">
                  <Text className="m-0">
                    {item.quantity} x <strong>{item.item_name}</strong> - $
                    {(item.price * item.quantity).toFixed(2)}{" "}
                  </Text>
                  {item.comments && (
                    <Text className="m-0">
                      <em>{item.comments}</em>
                    </Text>
                  )}
                  <Section>
                    {item.modifications.map((modification, index) => (
                      <Row key={index}>
                        <Text className="m-0">
                          {modification.modification}
                          {modification.price > 0 &&
                            " - $" + (modification.price / 100).toFixed(2)}
                        </Text>
                      </Row>
                    ))}
                  </Section>
                  <Hr className="border border-solid border-[#eaeaea]  mx-0 w-full" />
                </Section>
              ))}
            </Section>

            <Section className="">
              <Text className="text-lg m-0">
                Subtotal: ${(total / 100).toFixed(2)}
              </Text>
              <Text className="text-lg m-0">
                Tax: ${((total / 100) * 0.06).toFixed(2)}
              </Text>
              <Text className="text-lg m-0">
                <strong>Total:</strong> ${((total * 1.06) / 100).toFixed(2)}
              </Text>
            </Section>

            <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />

            <Section className="text-center">
              <table className="w-full">
                <tr className="w-full">
                  <td align="center">
                    <Img
                      alt="Amigos Street Tacos Logo"
                      height="42"
                      src={`${baseUrl}/static/amigos-logo.png`}
                    />
                  </td>
                </tr>
                <tr>
                  <td align="center">
                    <Text className="m-0 font-bold">
                      Online ordering system locally developed by Zorgo.
                    </Text>
                    <Text className="m-0 text-gray-500">
                      Continue ordering online to support local businesses!
                    </Text>
                    <Text className="m-0 font-bold">
                      Your order will be ready at {readyTime}!
                    </Text>
                  </td>
                </tr>
              </table>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default VercelInviteUserEmail;
