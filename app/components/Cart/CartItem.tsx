import { useAppDispatch } from "@/lib/hooks";
import { addToCart, removeFromCart, setQuantity } from "@/slices/cartSlice";
import React from "react";
import { Card, Button } from "react-bootstrap";
import NumberInput from "../numberInput/numberInput";
import { Trash, Xmark } from "iconoir-react";
import "./cart.css";

// Define the interface for the props that CartItem will receive
interface CartItemProps {
  name: string; // Name of the item
  price: number; // Price of the item
  quantity: number; // Quantity of the item in the cart
}

// The CartItem functional component takes CartItemProps as props
export default function CartItem({ name, price, quantity }: CartItemProps) {
  const dispatch = useAppDispatch();

  return (
    <div className="whiteBackground whiteBorder px-4 py-2 my-4">
      <div className="cartItemContainer">
        <div className="cartTitleContainer">
          <div className="cardTitle">{name}</div>{" "}
          {/* Display the name of the item as the card title */}
          <div className="cardTitle fw-light">
            {" "}
            ${(price * quantity).toFixed(2)}
          </div>
        </div>
        <div className="d-flex">
          <NumberInput
            value={quantity}
            increase={() => {
              dispatch(setQuantity({ quantity: quantity + 1, name: name }));
            }}
            decrease={() => {
              dispatch(setQuantity({ quantity: quantity - 1, name: name }));
            }}
          />
          {/* Display the price, formatted to two decimal places */}
          <div
            className="clickable ps-2"
            onClick={() => {
              dispatch(removeFromCart(name));
            }}
          >
            <Xmark id="trashIcon" width={24} height={24} strokeWidth={2.2} />
          </div>
        </div>
      </div>
    </div>
  );
}
