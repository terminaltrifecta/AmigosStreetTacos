import React, { useState } from "react";
import { Container } from "react-bootstrap";
import CartItem from "./CartItem";

interface Item {
  name: string;
  price: number;
  quantity: number;
}

const CartViewer: React.FC = () => {
  const [cartItems, setCartItems] = useState<Item[]>([
    { name: "Birria Tacos", price: 13.99, quantity: 2 },
    { name: "Asada Fries", price: 13.5, quantity: 1 },
  ]);

  const handleRemoveItem = (name: string) => {
    setCartItems(cartItems.filter((item) => item.name !== name));
  };

  return (
    <Container>
      <h1>Shopping Cart</h1>
      {cartItems.map((item) => (
        <CartItem
          key={item.name}
          name={item.name}
          price={item.price}
          quantity={item.quantity}
          onRemove={handleRemoveItem}
        />
      ))}
    </Container>
  );
};

export default CartViewer;
