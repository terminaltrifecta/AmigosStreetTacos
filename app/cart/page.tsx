"use client";

import "bootstrap/dist/css/bootstrap.css";
import React, { useEffect, useMemo, useState } from "react";
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
import Button from "../components/Button";

export default function Cart() {
  const dispatch = useAppDispatch();

  const [closed, setClosed] = useState(true);
  const [showAddOnsModal, setShowAddOnsModal] = useState(false);

  const cart = useAppSelector((state: RootState) => state.cart.value);
  const itemCount = cart.reduce((a, v) => a + v.quantity, 0);
  const hours = useAppSelector((state: RootState) => state.menu.hours);
  const locationState = useAppSelector((state: RootState) => state.location);
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
  }, [hours, locationState]);

  const subtotal = useMemo(() => {
    return cart.reduce((a, v) => a + v.quantity * v.price, 0);
  }, [cart]);

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
      dispatch(setSelectedPromotion(result));
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
      <div className="bg-amigoswhite whiteBorder p-4 space-y-4">
        <div className="">
          <div className="text-sm text-slate-500">
            Subtotal: ${subtotal.toFixed(2)}
          </div>
          {selectedPromotion && (
            <div className="text-sm text-red-500">
              Applied Savings: -${savings.toFixed(2)}
            </div>
          )}
          <div className="text-sm text-slate-500">Tax: ${tax.toFixed(2)}</div>
          <div className="text-lg">Total: ${total.toFixed(2)}</div>
        </div>

        <div className="buttonContainer flex flex-col space-y-4">
          <Dropdown />
          <PromoCode onApply={onApplyPromotion} />
          {closed ? (
            <Button
              disabled
              variant="bigRed"
              className="h-[4.5rem]"
            >
              Not accepting orders
            </Button>
          ) : (
            <Button
              variant="bigRed"
              className="h-[4.5rem]"
              onClick={() => setShowAddOnsModal(true)}
            >
              Checkout
            </Button>
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
