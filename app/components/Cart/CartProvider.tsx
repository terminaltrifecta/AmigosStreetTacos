import React, { useState } from "react";
import CartViewer from "./CartViewer";
import AccordionMenuOrder from "../AccordionOrderMenu/page";

interface Item {
  name: string;
  price: number;
  quantity: number;
}

const [cart, setCart] = useState<Item[]>([]);

function addToCart(item: { name: string; price: number }) {
  const existingItem = cart.find((cartItem) => cartItem.name === item.name);
  if (existingItem) {
    setCart(
      cart.map((cartItem) =>
        cartItem.name === item.name
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      )
    );
  } else {
    setCart([...cart, { ...item, quantity: 1 }]);
  }
}

function handleRemoveItem(name: string) {
  setCart(cart.filter((item) => item.name !== name));
}

export function OrderHandler() {
  return (
    <div className="d-grid gap-3">
      <AccordionMenuOrder
        acchdr1="Breakfast - $5"
        acchdr2="Bowls - $10"
        acchdr3="Quesadillas - $10"
        acchdr4="Burritos - $10"
        acchdr5="Tacos - $2.85"
        acchdr6="Gourmet Items - $3.75"
        acchdr7="Amigos Specials"
        addToCart={addToCart}
      />
      <CartViewer cartItems={cart} onRemoveItem={handleRemoveItem} />
    </div>
  );
}

export function CartHandler() {
  return <CartViewer cartItems={cart} onRemoveItem={handleRemoveItem} />;
}
