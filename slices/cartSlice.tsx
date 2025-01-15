import { OrderedItemData } from "@/app/interfaces";
import { createSlice } from "@reduxjs/toolkit";

export interface CartState {
  value: OrderedItemData[];
}

export const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addToCart: (state: any, { payload }) => {
      const existingItem = state.find(
        (cartItem: OrderedItemData) =>
          cartItem.item_name == payload.item_name &&
          cartItem.comments == payload.comments
      );
      if (existingItem) {
        return state.map((cartItem: OrderedItemData) =>
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
        (cartItem: OrderedItemData) =>
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

      return state.map((cartItem: OrderedItemData) =>
        cartItem.item_name == payload.item_name &&
        cartItem.comments == payload.comments
          ? { ...cartItem, quantity: payload.quantity }
          : cartItem
      );
    },
    setInstructions: (state: any, { payload }) => {
      return state.map((cartItem: OrderedItemData) =>
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
