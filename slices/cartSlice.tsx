import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Item {
  item_name: string;
  item_id: number;
  quantity: number;
  comments: string;
  price: number;
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
        (cartItem: Item) =>
          cartItem.item_name == payload.item_name &&
          cartItem.comments == payload.comments
      );
      if (existingItem) {
        return state.map((cartItem: Item) =>
          cartItem.item_name == payload.item_name
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        state.push(payload);
      }
    },
    removeFromCart: (state: any, { payload }) => {
      return state.filter(
        (cartItem: Item) =>
          !(
            cartItem.item_name == payload.item_name &&
            cartItem.comments == payload.comments
          )
      );
    },
    setQuantity: (state: any, { payload }) => {
      if (payload.quantity < 1) {
        payload.quantity = 1;
      } //dont let them change quantity below one

      return state.map((cartItem: Item) =>
        cartItem.item_name == payload.item_name &&
        cartItem.comments == payload.comments
          ? { ...cartItem, quantity: payload.quantity }
          : cartItem
      );
    },
    setInstructions: (state: any, { payload }) => {
      return state.map((cartItem: Item) =>
        cartItem.item_name == payload.item_name &&
        cartItem.comments == payload.oldComments
          ? { ...cartItem, comments: payload.comments }
          : cartItem
      );
    },
  },
});

export const { addToCart, removeFromCart, setQuantity, setInstructions } =
  cartSlice.actions;

export default cartSlice.reducer;
