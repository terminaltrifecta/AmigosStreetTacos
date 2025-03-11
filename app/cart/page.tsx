"use client";

import "bootstrap/dist/css/bootstrap.css";
import React, { useEffect, useState } from "react";
import { RootState } from "@/lib/store";
import { useAppSelector } from "@/lib/hooks";
import CartItem from "../components/Cart/CartItem";
import { OrderedItemData } from "../interfaces";
import Dropdown from "../components/Dropdown";
import Link from "next/link";
import { isClosed } from "../utils/menuUtils";
<<<<<<< Updated upstream
=======
import LastMinuteAddOnsModal from "../components/LastMinuteAddOnsModal";
import { ChevronsDown } from "lucide-react";
import PromoCode from "../components/PromoCode";
import { setSelectedPromotion } from "@/slices/promotionSlice";
import { validatePromoCode } from "../utils/databaseUtils";
>>>>>>> Stashed changes

export default function Cart() {
  const [closed, setClosed] = useState(true);

  const cart = useAppSelector((state: RootState) => state.cart);
  const hours = useAppSelector((state: RootState) => state.menu.hours);
  const locationState = useAppSelector((state: RootState) => state.location);

  useEffect(() => {
    const location = locationState.locations.find(
      (loc) => loc.location_id === locationState.selectedLocation
    );

    setClosed(
      isClosed(new Date(), hours) || (location ? location.force_close : true)
    );
    setClosed(false);
  }, [hours]);

<<<<<<< Updated upstream
  const itemCount = cart.reduce((a: any, v: any) => (a = a + v.quantity), 0);
  const subtotal = cart.reduce(
    (a: any, v: any) => (a = a + v.quantity * v.price),
    0
  ); //adds the sum of price and quantity for each item
  const tax = subtotal * 0.06;
=======
  const savings = useMemo(() => {
    if (!selectedPromotion) return 0;
    let discount = 0;
    if (selectedPromotion.discount_type === "percentage") {
      discount = subtotal * (selectedPromotion.discount_value / 100);
    } else if (selectedPromotion.discount_type === "fixed") {
      discount = selectedPromotion.discount_value;
    }

    return Math.min(discount, subtotal);
  }, [selectedPromotion, subtotal]);

  const tax = useMemo(() => {
    return (subtotal - savings) * 0.06;
  }, [subtotal, savings]);

  const total = useMemo(() => {
    return subtotal - savings + tax;
  }, [subtotal, savings, tax]);

  function onApplyPromotion() {
    if (selectedPromotion) {
      return;
    }
    const result = validatePromoCode(promocode, promotions);
    if (result.valid && result) {
      dispatch(setSelectedPromotion(result.promotion));
    }
  }
>>>>>>> Stashed changes

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
          <div className="text-sm text-slate-500">Tax: ${tax.toFixed(2)}</div>
          <div className="text-lg">Total: ${(subtotal + tax).toFixed(2)}</div>
        </div>

        <div className="buttonContainer flex flex-col space-y-4">
          <Dropdown />
          <Link id="aref" href="/payment">
            {closed ? (
              <button disabled id="buttonParent" className="bigRed uppercase">
                Restaurant closed
              </button>
            ) : (
              <button id="buttonParent" className="bigRed uppercase">
                Checkout
              </button>
            )}
          </Link>
        </div>
      </div>
      <br />
    </div>
  );
}