import React from "react";
import { Container } from "react-bootstrap";
import CartItem from "./CartItem";
import { useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";

interface Item {
  name: string;
  price: number;
  quantity: number;
}

export default function CartViewer() {
  
  const cart = useAppSelector((state: RootState) => state.cart);

  return (
    <Container>
      <h1>Shopping Cart</h1>
      <h1>{cart.length}</h1>
      {cart.length === 0 ? (
        <p>The cart is empty.</p>
      ) : (
        cart.map((item: any) => (
          <CartItem
            key={item.name}
            name={item.name}
            price={item.price}
            quantity={item.quantity}
          />
        ))
      )}
    </Container>
  );
}
