import { createContext, useState } from "react";

interface Item {
  name: string;
  price: number;
  quantity: number;
}

const [cart, setCart] = useState<Item[]>([]);

export const CartContext = createContext([]);
