import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface Item {
  name: string;
  price: number;
  quantity: number;
}

export interface CartState {
  value: Item[];
}

export const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addToCart: (state: Item[], { payload }) => {
      const existingItem = state.find(
        (cartItem) => cartItem.name == payload.name
      );
      if (existingItem) {
        state.map((cartItem) =>
          cartItem.name == payload.name
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        state.push(payload);
      }
    },
    removeFromCart: (state:any, { payload }) => {
      return state.filter((item:Item) => item.name != payload);
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
