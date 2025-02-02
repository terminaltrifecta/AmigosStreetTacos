"use client";

import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import { RootState } from "@/lib/store";
import { useAppSelector } from "@/lib/hooks";
import CartItem from "../components/Cart/CartItem";
import { OrderedItemData } from "../interfaces";
import Dropdown from "../components/Dropdown";
import Link from "next/link";

export default function Cart() {
  const cart = useAppSelector((state: RootState) => state.cart);

  const itemCount = cart.reduce((a: any, v: any) => (a = a + v.quantity), 0);
  const subtotal = cart.reduce(
    (a: any, v: any) => (a = a + v.quantity * v.price),
    0
  ); //adds the sum of price and quantity for each item
  const tax = subtotal * 0.06;

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
          <div className="text-sm text-slate-500">Subtotal: ${subtotal.toFixed(2)}</div>
          <div className="text-sm text-slate-500">Tax: ${tax.toFixed(2)}</div>
          <div className="text-lg">Total: ${(subtotal + tax).toFixed(2)}</div>
        </div>

        <div className="buttonContainer flex flex-col space-y-4">
          <Dropdown />
          <Link id="aref" href="/payment">
            <button id="buttonParent" className="bigRed">
              <div className="d-flex align-items-center justify-content-center p-4">
                Checkout
              </div>
            </button>
          </Link>
        </div>
      </div>
      <br />
    </div>
  );
}