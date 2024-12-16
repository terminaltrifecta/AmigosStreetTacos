"use client";

import {
  useElements,
  useStripe,
  PaymentElement,
  AddressElement,
} from "@stripe/react-stripe-js";
import React, { useState } from "react";
import usePostMutation, { PostData } from "../hooks/usePosts";
import { useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import { StripeAddressElementOptions, StripePaymentElementOptions } from "@stripe/stripe-js";

export default function CheckoutPage({ amount, clientSecret }: any) {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState<string>();
  const [loading, setLoading] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const paymentElementOptions:StripePaymentElementOptions= {
    layout: "accordion",
    fields:{
      billingDetails:{
        name: "auto",
        email: "auto"
      }
    }
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      return;
    }

    const { error: submitError } = await elements.submit();

    if (submitError) {
      setErrorMessage(submitError.message);
      setLoading(false);
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `http://www.localhost:3000/payment-success?amount=${amount}`,
        payment_method_data: {
          billing_details: {
            name: firstName+" "+lastName,
            email: email
          }
        }
      },
    })

    if (error) {
      //only gets here when there's an error the customer needs to see
      setErrorMessage(error.message);
    } else {
      
    }

    setLoading(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid h-fit space-y-4 p-4 rounded-2xl bg-amigoswhite"
    >

      <div className="text-3xl text-center font-bold tracking-wide">
        One step from yumminess..
      </div>
      
      <div className="flex space-x-4 w-full">
        <input onChange={(e) => {setFirstName(e.target.value)}} className="w-1/2 p-3 rounded-xl border border-slate-300 normal-case" placeholder="First Name"/>
        <input onChange={(e) => {setLastName(e.target.value)}}className="w-1/2 p-3 rounded-xl border border-slate-300 normal-case" placeholder="Last Name"/>
      </div>
      <input onChange={(e) => {setEmail(e.target.value)}} className="p-3 rounded-xl border border-slate-300 normal-case" placeholder="Email Address"/>
      {clientSecret && <PaymentElement options={paymentElementOptions}/>}
      {errorMessage && <div>{errorMessage}</div>}

      <button disabled={!stripe || loading} className="text-amigoswhite text-[1.3rem] font-semibold text-center flex items-center justify-center rounded-2xl max-h-32 transition duration-200 bg-amigosblack hover:text-amigosblack hover:bg-amigoswhite hover:shadow-md ">
        <div className="flex items-center justify-center p-4">
        {loading ? "Processing ..." : `Pay $${amount}`}
        </div>
      </button>
    </form>
  );
}
