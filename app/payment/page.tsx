"use client";

import React, { useEffect, useState } from "react";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutPage from "../components/CheckoutPage";
import Image from "next/image";
import { useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import { calculateCartPrice } from "../utils/menuUtils";

//ensures environmental variables are defined
if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}

const promise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!, {
  stripeAccount: process.env.NEXT_PUBLIC_STRIPE_ACCOUNT,
});

export default function PaymentPage() {
  //apply redux promotion code

  const [clientSecret, setClientSecret] = useState("");
  const [amount, setAmount] = useState(0);

  const cart = useAppSelector((state: RootState) => state.cart.value);
  const time = useAppSelector((state: RootState) => state.time);
  const hours = useAppSelector((state: RootState) => state.menu.hours);
  const promoCode = useAppSelector(
    (state: RootState) => state.promotions.selectedPromotion?.name
  );
  const location = useAppSelector(
    (state: RootState) => state.location.selectedLocation
  );

  useEffect(() => {
    calculateCartPrice(cart, promoCode).then((price) => {
      const adjustedPrice = parseFloat((price/100 * 1.06).toFixed(2));
      setAmount(adjustedPrice);
    });
  });

  useEffect(() => {
    let isMounted = true;
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cart: cart,
        time: time,
        location: location,
        hours: hours,
        promoCode: promoCode,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (isMounted) {
          setClientSecret(data.clientSecret);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [cart, hours, location, time]);

  const elementOptions: StripeElementsOptions = {
    clientSecret: clientSecret,
    appearance: {
      theme: "flat",
    },
  };

  return (
    <div className="flex justify-center bg-white min-h-[70dvh] p-4">
      <div className="lg:w-[80dvw] space-x-4 space-y-4 lg:space-y-0 lg:grid lg:grid-cols-2">
        {clientSecret ? (
          <Elements stripe={promise} options={elementOptions}>
            <CheckoutPage amount={amount} clientSecret={clientSecret} />
          </Elements>
        ) : (
          <div className="w-full min-h-24 h-[25dvh] text-2xl flex justify-center items-center">
            Loading...
          </div>
        )}

        <div className="">
          <Image
            src={"/static/assets/home/tacosdeal.jpeg"}
            alt=""
            className="img-fluid rounded-4 border border-5"
            width={1920}
            height={1080}
          />
        </div>
      </div>
    </div>
  );
}
