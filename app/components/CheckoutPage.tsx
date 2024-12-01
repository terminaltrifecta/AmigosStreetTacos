"use client";

import {
  useElements,
  useStripe,
  PaymentElement,
} from "@stripe/react-stripe-js";
import React, { useState } from "react";

export default function CheckoutPage({ amount, clientSecret }: any) {

  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState<string>();
  const [loading, setLoading] = useState(true);
  
  async function handleSubmit(event:React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)

    if(!stripe || !elements) {
      return;
    }

    const {error: submitError} = await elements.submit()

    if (submitError) {
      setErrorMessage(submitError.message);
      setLoading(false);
      return;
    }

  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      {clientSecret && <PaymentElement />}
      {errorMessage && <div>{errorMessage}</div>}
      <button id="buttonParent" className="bigRed">
        <div className="d-flex align-items-center justify-content-center p-4">
          Pay now
        </div>
      </button>
    </form>
  );
}
