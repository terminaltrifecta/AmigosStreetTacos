import React from "react";
import { Container } from "react-bootstrap";
import CartItem from "./CartItem";

interface Item {
  name: string;
  price: number;
  quantity: number;
}

interface CartViewerProps {
  cartItems: Item[];
  onRemoveItem: (name: string) => void;
}

export default function CartViewer({cartItems, onRemoveItem}: CartViewerProps) {
  return (
    <Container>
      <h1>Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p>The cart is empty.</p>
      ) : (
        cartItems.map((item) => (
          <CartItem
            key={item.name}
            name={item.name}
            price={item.price}
            quantity={item.quantity}
            onRemove={onRemoveItem}
          />
        ))
      )}
    </Container>
  );
};