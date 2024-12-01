"use client";

import {
  useElements,
  useStripe,
  PaymentElement,
} from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import convertToSubcurrency from "@/lib/convertToSubcrrency";

export default function CheckoutPage({ amount }: any) {

  return (
    <form className="flex flex-col">
      <PaymentElement />
      <div className="">Testingg</div>
      <button id="buttonParent" className="bigRed">
        <div className="d-flex align-items-center justify-content-center p-4">
          Pay now
        </div>
      </button>
    </form>
  );
}
