"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const amount = searchParams.get("amount");
  const redirect_status = searchParams.get("redirect_status");

  if (!redirect_status) {
    return (
      <div className="max-w-6xl mx-auto p-10 text-center border m-10 rounded-md flex flex-col items-center space-y-4">
        Uh-oh something went wrong. Please try again.
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-10 text-center border m-10 rounded-md flex flex-col items-center space-y-4">
      {redirect_status === "succeeded" ? (
        <>
          <div className="text-4xl font-extrabold">Thank you!</div>
          <div className="text-2xl">We have received your payment of</div>
          <div className="bg-amigosblack text-amigoswhite w-fit py-4 px-24 rounded-xl text-4xl font-bold">
            ${parseFloat(amount!).toFixed(2)}
          </div>
        </>
      ) : (
        <>
          <div className="text-4xl font-extrabold">Payment Failed</div>
          <div className="text-2xl">
            Unfortunately, your payment was not successful.
          </div>
          <div className="bg-amigosred text-amigoswhite w-fit py-4 px-24 rounded-xl text-4xl font-bold">
            Please try again.
          </div>
        </>
      )}
    </div>
  );
}

export default function PaymentSuccess() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentSuccessContent />
    </Suspense>
  );
}