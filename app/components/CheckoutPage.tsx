"use client";

import {
  useElements,
  useStripe,
  PaymentElement,
  AddressElement,
} from "@stripe/react-stripe-js";
import React, { useState } from "react";
import { StripePaymentElementOptions } from "@stripe/stripe-js";
import { useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";

export default function CheckoutPage({ amount, clientSecret }: any) {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState<string>();
  const [loading, setLoading] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [selectedTime, setSelectedTime] = useState(20);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({
    firstName: false,
    lastName: false,
    email: false,
    phone: false,
  });

  //retrieves location info
  const locationState = useAppSelector((state: RootState) => state.location);
  const location = locationState.locations.find(
    (loc) => loc.location_id === locationState.selectedLocation
  );

  const paymentElementOptions: StripePaymentElementOptions = {
    layout: "accordion",
    fields: {
      billingDetails: {
        name: "auto",
        email: "auto",
      },
    },
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    // Validate form fields
    const newErrors = {
      firstName: firstName.trim() === "",
      lastName: lastName.trim() === "",
      email: email.trim() === "" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
      phone: phone.trim() === "" || !/^[0-9]*$/.test(phone), // Basic phone validation: not empty and digits only
    };

    setErrors(newErrors);

    // Check for errors using the current newErrors object
    if (newErrors.firstName || newErrors.lastName || newErrors.email || newErrors.phone) {
      const errorMessages = [];
      if (newErrors.firstName) errorMessages.push("First name is required");
      if (newErrors.lastName) errorMessages.push("Last name is required");
      if (newErrors.email) {
        errorMessages.push(
          email.trim() === "" ? "Email is required" : "Invalid email format"
        );
      }
      if (newErrors.phone) {
        errorMessages.push(
          phone.trim() === ""
            ? "Phone number is required"
            : "Invalid phone number format"
        );
      }

      setErrorMessage(errorMessages.join(" • "));
      setLoading(false);
      return;
    }

    if (!stripe || !elements) {
      setLoading(false);
      return;
    }

    const { error: submitError } = await elements.submit();

    if (submitError) {
      setErrorMessage(submitError.message);
      setLoading(false);
      return;
    }

    const baseUrl = process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}` : 'http://localhost:3000';
    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `${baseUrl}/payment-processed?amount=${amount}`,
        payment_method_data: {
          billing_details: {
            name: firstName + " " + lastName,
            email: email,
            phone: phone
          },
        },
      },
    });

    if (error) {
      setErrorMessage(error.message);
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
        <input
          onChange={(e) => {
            setFirstName(e.target.value);
            setErrors((prev) => ({ ...prev, firstName: false }));
          }}
          className={`w-1/2 p-3 rounded-xl border-1 ${
            errors.firstName ? "border-red-500 bg-red-100" : "border-slate-300"
          } normal-case`}
          placeholder="First Name"
        />
        <input
          onChange={(e) => {
            setLastName(e.target.value);
            setErrors((prev) => ({ ...prev, lastName: false }));
          }}
          className={`w-1/2 p-3 rounded-xl border-1 ${
            errors.lastName ? "border-red-500 bg-red-100" : "border-slate-300"
          } normal-case`}
          placeholder="Last Name"
        />
      </div>
      <input
        onChange={(e) => {
          setEmail(e.target.value);
          setErrors((prev) => ({ ...prev, email: false }));
        }}
        className={`p-3 rounded-xl border-1 ${
          errors.email ? " border-red-500 bg-red-100" : "border-slate-300"
        } normal-case`}
        placeholder="Email Address"
      />
      <input
        onChange={(e) => {
          setPhone(e.target.value);
          setErrors((prev) => ({ ...prev, phone: false }));
        }}
        className={`p-3 rounded-xl border-1 ${
          errors.phone ? " border-red-500 bg-red-100" : "border-slate-300"
        } normal-case`}
        placeholder="Phone Number"
      />
      {clientSecret && <PaymentElement options={paymentElementOptions} />}
      {errorMessage && (
        <div className="text-red-500 text-sm">
          {errorMessage.split(" • ").map((message, index) => (
            <div key={index}>• {message}</div>
          ))}
        </div>
      )}

      <div className="text-lg">
        This order will be placed at the {location?.location_name} location. If
        you would like to change this, go back to the menu and refresh the site.
      </div>

      <button
        disabled={!stripe || loading}
        className="text-amigoswhite text-[1.3rem] font-semibold text-center flex items-center justify-center rounded-2xl max-h-32 transition duration-200 bg-amigosblack hover:text-amigosblack hover:bg-amigoswhite hover:shadow-md"
      >
        <div className="flex items-center justify-center p-4">
          {loading ? "Processing ..." : `Pay $${amount.toFixed(2)}`}
        </div>
      </button>
    </form>
  );
}
