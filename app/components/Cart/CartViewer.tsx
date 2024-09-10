import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import CartItem from "./CartItem";
import { useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import Link from "next/link";

interface Item {
  name: string;
  price: number;
  quantity: number;
  instructions: string;
}

export default function CartViewer() {
  const cart = useAppSelector((state: RootState) => state.cart);

  const itemCount = cart.reduce((a: any, v: any) => (a = a + v.quantity), 0);
  const subtotal = cart.reduce(
    (a: any, v: any) => (a = a + v.quantity * v.price),
    0
  ); //adds the sum of price and quantity for each item
  const tax = subtotal * 0.06;
  const convience = itemCount > 0 ? 0.029 * subtotal + 0.3 : 0;

  return (
    <Container className="p-4">
      <div className="fs-1">Shopping Cart</div>
      <div className="fs-3 fw-light">Total Items: {itemCount}</div>
      {cart.length === 0 ? (
        <p>The cart is empty.</p>
      ) : (
        cart.map((item: any) => (
          <CartItem
            key={item.name}
            name={item.name}
            price={item.price}
            quantity={item.quantity}
            instructions={item.instructions}
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
        <Link id="aref" href="/order">
          <button id="buttonParent" className="bigRed">
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
