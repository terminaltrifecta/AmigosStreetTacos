import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface Item {
  item_name: string;
  item_id: number;
  quantity: number;
  comments: string;
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
        (cartItem: any) => (cartItem.name == payload.name && cartItem.instructions == payload.instructions)
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
      return state.filter((cartItem: any) => !(cartItem.name == payload.name && cartItem.instructions == payload.instructions));
    },
    setQuantity: (state: any, { payload }) => {
      if (payload.quantity < 1) {
        payload.quantity = 1;
      } //dont let them change quantity below one

      return state.map((cartItem: any) =>
        cartItem.name == payload.name && cartItem.instructions == payload.instructions
          ? { ...cartItem, quantity: payload.quantity }
          : cartItem
      );
    },
    setInstructions: (state: any, { payload }) => {
      
      return state.map((cartItem: any) =>
        cartItem.name == payload.name && cartItem.instructions == payload.oldInstructions
          ? { ...cartItem, instructions: payload.instructions }
          : cartItem
      );
    }
  },
});

export const { addToCart, removeFromCart, setQuantity, setInstructions } = cartSlice.actions;

export default cartSlice.reducer;
