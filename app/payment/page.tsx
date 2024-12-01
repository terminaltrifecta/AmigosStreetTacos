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

export default function Payment() {
  var promise = null;

  const [clientSecret, setClientSecret] = useState("");

  async function getPromise() {
    promise = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!).then(
      (res) => {
        console.log(res);
        return res;
      }
    );
  }
  const amount = convertToSubcurrency(50.47);

  useEffect(() => {
    getPromise();

    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({amount: amount}),
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret)
        console.log("Client secret: " + data.clientSecret)
      });
  }, []);

  const options = { clientSecret };
  
  return (
    <div className="p-4 min-h-[100dvh] flex justify-center">
      <div className="p-8 min-w-[40dvw] justify-center align-center">
        <div className="text-3xl font-bold text-amigosblack">
          Complete purchase of ${amount}.
        </div>

        <Elements
          stripe={promise}
          options={options}
        >
          <CheckoutPage amount={amount} />
        </Elements>
      </div>
    </div>
  );
}
