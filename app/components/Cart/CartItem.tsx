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
    <Card className="mb-3">
      {" "}
      {/* Card component to display item information */}
      <Card.Body>
        <Card.Title>{name}</Card.Title>{" "}
        {/* Display the name of the item as the card title */}
        <Card.Text>
          <NumberInput
            value={quantity}
            increase={() => {
              dispatch(setQuantity({ quantity: quantity + 1, name: name }));
            }}
            decrease={() => {
              dispatch(setQuantity({ quantity: quantity - 1, name: name }));
            }}
          />{" "}
          <br /> {/* Display the quantity of the item */}
          Price: ${price.toFixed(2)}{" "}
          {/* Display the price, formatted to two decimal places */}
        </Card.Text>
        <Button variant="danger" onClick={() => dispatch(removeFromCart(name))}>
          {" "}
          {/* Button to remove the item */}
          Remove
        </Button>
      </Card.Body>
    </Card>
  );
}
