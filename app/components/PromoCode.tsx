import React from "react";
import Button from "./Button";
import { useAppDispatch } from "@/lib/hooks";
import { setPromocode } from "@/slices/promotionSlice";

export default function PromoCode({onApply}: {onApply: () => void}) {
  const dispatch = useAppDispatch();
  return (
    <div className="max-w-md">
      <div className="text-sm text-slate-500 mb-1">Have a promo code?</div>
      <div className="flex gap-2 h-16">
        <input
          placeholder="ENTER CODE HERE"
          className="normal-case flex-grow p-1 px-3 bg-white rounded-xl border border-slate-300 outline-none text-sm"
          onChange={(e) => dispatch(setPromocode(e.target.value))}
        />
        <Button
          variant="black"
          uppercase
          className="h-16 px-4 py-0"
          onClick={onApply}
        >
          Apply
        </Button>
      </div>
    </div>
  );
}
