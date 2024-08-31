import { useAppDispatch } from "@/lib/hooks";
import { addToCart, removeFromCart, setQuantity } from "@/slices/cartSlice";
import React from "react";
import { Card, Button } from "react-bootstrap";
import NumberInput from "../numberInput/numberInput";

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
      <div className="cardTitle">{name}</div> {/* Display the name of the item as the card title */}
      <div className="d-flex">
        <div>
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
        </div>

        <div className="d-flex flex-column px-4">
          Price: ${(price * quantity).toFixed(2)}
          <Button
            variant="danger"
            onClick={() => dispatch(removeFromCart(name))}
          >
            {/* Button to remove the item */}
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
}
