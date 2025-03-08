import React from "react";
import Button from "./Button";

export default function PromoCode({onApply}: {onApply: () => void}) {
  return (
    <div className="max-w-md">
      <div className="text-sm text-slate-500 mb-1">Have a promo code?</div>
      <div className="flex gap-2 h-14">
        <input
          placeholder="ENTER CODE HERE"
          className="uppercase flex-grow p-1 px-3 bg-white rounded-xl border border-slate-300 outline-none text-sm"
        />
        <Button
          variant="black"
          uppercase
          className="h-14 px-4 py-0"
          onClick={onApply}
        >
          Apply
        </Button>
      </div>
    </div>
  );
}
