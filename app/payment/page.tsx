"use client";

import React, { useEffect, useState } from "react";
import usePostMutation from "../hooks/usePosts";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import convertToSubcurrency from "@/lib/convertToSubcrrency";
import CheckoutPage from "../components/CheckoutPage";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}

const promise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

export default function Page() {
  const [clientSecret, setClientSecret] = useState("");

  const amount = 50.47; //will change

  useEffect(() => {

    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: convertToSubcurrency(amount) }),
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
      });
  }, []);

  const options = { clientSecret };

  return (
    <div className="flex justify-center bg-white min-h-[70dvh] p-4">
      <div className="w-[50dvw] max-w-[48rem] space-y-4">
        <div className="text-3xl font-bold text-amigosblack">
          Complete purchase of ${amount}.
        </div>

        {clientSecret ? (
          <Elements stripe={promise} options={options}>
            <CheckoutPage amount={convertToSubcurrency(amount)} clientSecret={clientSecret} />
          </Elements>
        ) : (
          <div className="text-2xl text-amigostblack">Loading ... </div>
        )}
      </div>
    </div>
  );
}
