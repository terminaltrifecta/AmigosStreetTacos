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
    addToCart: (state: any, { payload }) => {
      const existingItem = state.find(
        (cartItem: any) => cartItem.name == payload.name
      );
      if (existingItem) {
        return state.map((cartItem: any) =>
          cartItem.name == payload.name
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        state.push(payload);
      }
    },
    removeFromCart: (state: any, { payload }) => {
      return state.filter((item: Item) => item.name != payload);
    },
    setQuantity: (state: any, { payload }) => {
      if (payload.quantity <= 0) {
        payload.quantity = 1;
      }

      return state.map((cartItem: any) =>
        cartItem.name == payload.name
          ? { ...cartItem, quantity: payload.quantity }
          : cartItem
      );
    },
  },
});

export const { addToCart, removeFromCart, setQuantity } = cartSlice.actions;

export default cartSlice.reducer;
