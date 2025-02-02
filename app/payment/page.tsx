"use client";

import React, { useEffect, useState } from "react";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import {
  Elements
} from "@stripe/react-stripe-js";
import CheckoutPage from "../components/CheckoutPage";
import Image from "next/image";
import { useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}

const promise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

export default function Page() {
  const [clientSecret, setClientSecret] = useState("");

  const cart = useAppSelector((state: RootState) => state.cart);
  const time = useAppSelector((state: RootState) => state.time);
  const location = useAppSelector((state: RootState) => state.location);

  const itemCount = cart.reduce((a: any, v: any) => (a = a + v.quantity), 0);
  const subtotal = cart.reduce(
    (a: any, v: any) => (a = a + v.quantity * v.price),
    0
  ); //adds the sum of price and quantity for each item
  const tax = subtotal * 0.06;

  const amount = (subtotal + tax).toFixed(2);

  useEffect(() => {
    let isMounted = true;
    console.log("useffect");
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cart: cart, time: time, location: location }),
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
  }, []);

  const elementOptions:StripeElementsOptions = {
    clientSecret: clientSecret,
    appearance: {
      theme: "flat"
    }
  }

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
