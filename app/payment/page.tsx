"use client";

import React from "react";
import usePostMutation from "../hooks/usePosts";
import { loadStripe } from "@stripe/stripe-js";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined")
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function Payment() {
  
  const amount = 50.0;

  return (
    <div className="gap-3 bg-white p-4 min-h-screen space-y-4">
        <button id="buttonParent" className="bigRed">
          <div className="d-flex align-items-center justify-content-center p-4">
            Supabase
          </div>
        </button>
    </div>
  );
}