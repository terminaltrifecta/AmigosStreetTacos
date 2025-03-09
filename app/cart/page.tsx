"use client";

import "bootstrap/dist/css/bootstrap.css";
import React, { useEffect, useState } from "react";
import { RootState } from "@/lib/store";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import CartItem from "../components/Cart/CartItem";
import { OrderedItemData } from "../interfaces";
import Dropdown from "../components/Dropdown";
import Link from "next/link";
import { isClosed } from "../utils/menuUtils";
import { validatePromoCode } from "../utils/databaseUtils";
import LastMinuteAddOnsModal from "../components/LastMinuteAddOnsModal";
import { ChevronsDown } from "lucide-react";
import PromoCode from "../components/PromoCode";
import { setSelectedPromotion } from "@/slices/promotionSlice";

export default function Cart() {
  const dispatch = useAppDispatch();

  const [closed, setClosed] = useState(true);
  const [savings, setSavings] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);

  const cart = useAppSelector((state: RootState) => state.cart.value);
  const itemCount = cart.reduce((a: any, v: any) => (a = a + v.quantity), 0);
  const hours = useAppSelector((state: RootState) => state.menu.hours);

  const locationState = useAppSelector((state: RootState) => state.location);
  const [showAddOnsModal, setShowAddOnsModal] = useState(false);

  //promotion stuff
  const promocode = useAppSelector(
    (state: RootState) => state.promotions.promocode
  );
  const selectedPromotion = useAppSelector(
    (state: RootState) => state.promotions.selectedPromotion
  );
  const promotions = useAppSelector(
    (state: RootState) => state.menu.promotions
  );

  useEffect(() => {
    const location = locationState.locations.find(
      (loc) => loc.location_id === locationState.selectedLocation
    );

    setClosed(isClosed(new Date(), hours, location?.force_close));
  }, [hours]);

  useEffect(() => {
    setSubtotal(
      cart.reduce((a: any, v: any) => (a = a + v.quantity * v.price), 0)
    ); //adds the sum of price and quantity for each item
  }, [cart]);

  useEffect(() => {
    setTax((subtotal - savings) * 0.06);
    setTotal(subtotal - savings + tax);
  }, [savings, subtotal])


  // Function to apply the promotion
  function onApplyPromotion() {
    // Prevent re-applying if a promotion is already selected
    if (selectedPromotion) {
      console.log("Promotion already applied.");
      return;
    }

    const result = validatePromoCode(promocode, promotions);
    console.log(result);

    if (result.valid) {
      dispatch(setSelectedPromotion(result));

      let newSavings = 0;
      if (result.discountType === "percentage") {
        newSavings = subtotal * (result.discountValue! / 100);
      } else if (result.discountType === "fixed") {
        newSavings = result.discountValue!;
      }

      // Ensure savings are never more than subtotal
      setSavings(newSavings > subtotal ? subtotal : newSavings);

      console.log("Applied savings:", newSavings);
    }
  }

  return (
    <div className="p-4">
      <div className="fs-1">Shopping Cart</div>
      <div className="fs-3 fw-light">Total Items: {itemCount}</div>
      {cart.length === 0 ? (
        <p>The cart is empty.</p>
      ) : (
        cart.map((item: OrderedItemData, i: number) => (
          <CartItem
            key={item.item_name}
            item_name={item.item_name}
            item_index={i}
            price={item.price}
            quantity={item.quantity}
            comments={item.comments}
            modifications={item.modifications}
          />
        ))
      )}

      <br />
      <div className="whiteBorder p-4 space-y-4">
        <div className="priceContainer">
          <div className="text-sm text-slate-500">
            Subtotal: ${subtotal.toFixed(2)}
          </div>
          {selectedPromotion && (
            <div className="text-sm text-red-500">
              Applied Savings: -${savings.toFixed(2)}
            </div>
          )}
          <div className="text-sm text-slate-500">Tax: ${tax.toFixed(2)}</div>

          <div className="text-lg">Total: ${(total).toFixed(2)}</div>
        </div>

        <div className="buttonContainer flex flex-col space-y-4">
          <Dropdown />
          <PromoCode onApply={onApplyPromotion} />

          {closed ? (
            <button
              disabled
              id="buttonParent"
              className="bigRed uppercase px-2"
            >
              Not accepting orders
            </button>
          ) : (
            <button
              id="buttonParent"
              className="bigRed uppercase"
              onClick={() => setShowAddOnsModal(true)}
            >
              Checkout
            </button>
          )}
        </div>
        <LastMinuteAddOnsModal
          open={showAddOnsModal}
          onClose={() => setShowAddOnsModal(false)}
        />
      </div>
      <br />
    </div>
  );
}
