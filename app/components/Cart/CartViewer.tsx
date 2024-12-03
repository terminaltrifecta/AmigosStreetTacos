import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import CartItem from "./CartItem";
import { useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import Link from "next/link";
import { supabase } from "@/app/supabase";

interface Item {
  item_name: string;
  item_id: number;
  quantity: number;
  comments: string;
}

async function cartSend() {

  const locationsData = [
    { location_name: "Location 1", address: "Address 1", franchise_id: 1, location: "POINT(10, 20)" },
    { location_name: "Location 2", address: "Address 2", franchise_id: 2, location: "POINT(30, 40)" },
    // ... more locations
  ];
}

export default function CartViewer() {
  const cart = useAppSelector((state: RootState) => state.cart);

  const itemCount = cart.reduce((a: any, v: any) => (a = a + v.quantity), 0);
  const subtotal = cart.reduce(
    (a: any, v: any) => (a = a + v.quantity * v.item_id),
    0
  ); //adds the sum of price and quantity for each item
  const tax = subtotal * 0.06;
  const convience = 0.02 * subtotal;

  return (
    <Container className="p-4">
      <div className="fs-1">Shopping Cart</div>
      <div className="fs-3 fw-light">Total Items: {itemCount}</div>
      {cart.length === 0 ? (
        <p>The cart is empty.</p>
      ) : (
        cart.map((item: Item) => (
          <CartItem
            key={item.item_name}
            item_name={item.item_name}
            item_id={item.item_id}
            quantity={item.quantity}
            comments={item.comments}
          />
        ))
      )}

      <br />
      <div className="whiteBorder p-4">
        <div className="">Subtotal: ${subtotal.toFixed(2)}</div>
        <div className="">Tax: ${tax.toFixed(2)}</div>
        <div className="">Convience Fee: ${convience.toFixed(2)}</div>
        <div className="fs-3">
          Total: ${(subtotal + tax + convience).toFixed(2)}
        </div>

        <br />
        <Link id="aref" href="/payment">
          <button id="buttonParent" className="bigRed" onClick={cartSend}>
            <div className="d-flex align-items-center justify-content-center p-4">
              Checkout
            </div>
          </button>
        </Link>
      </div>
      <br />
    </Container>
  );
}
