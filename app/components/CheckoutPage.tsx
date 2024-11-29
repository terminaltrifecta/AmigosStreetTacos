"use client";

import {
  useElements,
  useStripe,
  PaymentElement,
} from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import convertToSubcurrency from "@/lib/convertToSubcrrency";

export default function CheckoutPage(amount:any) {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState<string>();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/create-payment-intent", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({amount: convertToSubcurrency(amount)})
    })
    .then((res) => res.json())
    .then((data) => setClientSecret(data.clientSecret))
    console.log(clientSecret)
    
  }, [amount])

  return (
    <form>
        {clientSecret && <PaymentElement /> }
        <button id="buttonParent" className="bigRed">
          <div className="d-flex align-items-center justify-content-center p-4">
            Pay now
          </div>
        </button>
    </form>
  )
}
