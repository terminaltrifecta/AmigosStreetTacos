"use client";

import React from "react";
import usePostMutation from "../hooks/usePosts";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import convertToSubcurrency from "@/lib/convertToSubcrrency";
import CheckoutPage from "../components/CheckoutPage";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function Payment() {
  const amount = 50.47;

  return (
    <div className="p-4 min-h-[100dvh] flex justify-center">
      <div className="p-8 min-w-[40dvw] flex justify-center align-center">
        <div className="text-3xl font-bold text-amigosblack">
          Complete purchase of ${amount}.
        </div>

        <Elements stripe={stripePromise}
        options={{
          mode: "payment",
          amount: convertToSubcurrency(amount),
          currency: "usd"
        }}>
          <CheckoutPage amount={amount}/>
        </Elements>
      </div> 
    </div>
  );
}
