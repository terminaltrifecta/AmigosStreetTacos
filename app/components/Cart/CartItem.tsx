import { useAppDispatch } from "@/lib/hooks";
import { removeFromCart, setInstructions, setQuantity } from "@/slices/cartSlice";
import React from "react";
import NumberInput from "../numberInput/numberInput";
import { Xmark } from "iconoir-react";
import "./cart.css";

// Define the interface for the props that CartItem will receive
interface CartItemProps {
  item_name: string; // Name of the item
  price: number; // Price of the item
  quantity: number; // Quantity of the item in the cart
  comments: string;
}

// The CartItem functional component takes CartItemProps as props
export default function CartItem({ item_name: item_name, price: price, quantity, comments: comments }: CartItemProps) {
  const dispatch = useAppDispatch();

  return (
    <div className="whiteBackground whiteBorder px-4 py-2 my-4">
      <div className="cartItemContainer">
        <div className="cartTitleContainer">
          <div className="cardTitle">{item_name}</div>{" "}
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
              dispatch(setQuantity({ quantity: quantity + 1, item_name: item_name, comments: comments }));
              console.log("increased!!");
            }}
            decrease={() => {
              dispatch(setQuantity({ quantity: quantity - 1, item_name: item_name, comments: comments }));
            }}
          />
          {/* Display the price, formatted to two decimal places */}
          <div
            className="clickable ps-2"
            onClick={() => {
              dispatch(removeFromCart({item_name: item_name, comments: comments}));
            }}
          >
            <Xmark className="icon" width={24} height={24} strokeWidth={2.2} />
          </div>
        </div>
      </div>
      <input
        placeholder={"Custom Instructions"}
        value={comments}
        className="itemInstructions"
        type="text"
        onChange={(event: any) => {
          dispatch(setInstructions({item_name: item_name, oldComments: comments, comments: event.target.value}))
        }}
      />
    </div>
  );
}
