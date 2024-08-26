import React from 'react';
import { Card, Button } from 'react-bootstrap';

interface CartItemProps {
  name: string;
  price: number;
  quantity: number;
  onRemove: (name: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({ name, price, quantity, onRemove }) => {
  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>
          Quantity: {quantity} <br />
          Price: ${price.toFixed(2)}
        </Card.Text>
        <Button variant="danger" onClick={() => onRemove(name)}>
          Remove
        </Button>
      </Card.Body>
    </Card>
  );
};

export default CartItem;