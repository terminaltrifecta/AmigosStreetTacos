import { useAppDispatch } from "@/lib/hooks";
import { removeFromCart } from "@/slices/cartSlice";
import React from "react";
import { Card, Button } from "react-bootstrap";

// Define the interface for the props that CartItem will receive
interface CartItemProps {
  name: string; // Name of the item
  price: number; // Price of the item
  quantity: number; // Quantity of the item in the cart
}

// The CartItem functional component takes CartItemProps as props
const CartItem: React.FC<CartItemProps> = ({ name, price, quantity }) => {
  const dispatch = useAppDispatch();

  return (
    <Card className="mb-3">
      {" "}
      {/* Card component to display item information */}
      <Card.Body>
        <Card.Title>{name}</Card.Title>{" "}
        {/* Display the name of the item as the card title */}
        <Card.Text>
          Quantity: {quantity} <br /> {/* Display the quantity of the item */}
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
};

export default CartItem;
