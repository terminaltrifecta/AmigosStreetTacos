import { OrderedItemData, ModificationData, CartState } from "@/app/interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    value: [] as OrderedItemData[]
  } as CartState,
  reducers: {
    addToCart: (state: CartState, { payload }) => {
      const existingItemIndex = state.value.findIndex(
        (cartItem: OrderedItemData) => {
          return (
            cartItem.item_name === payload.item_name &&
            cartItem.comments === payload.comments &&
            areModificationsEqual(cartItem.modifications, payload.modifications)
          );
        }
      );
      
      if (existingItemIndex !== -1) {
        // Update quantity of existing item
        state.value[existingItemIndex] = {
          ...state.value[existingItemIndex],
          quantity: state.value[existingItemIndex].quantity + payload.quantity
        };
      } else {
        // Add new item
        state.value.push(payload);
      }
    },
    removeFromCart: (state: CartState, { payload }) => {
      state.value = state.value.filter(
        (cartItem: OrderedItemData) =>
          !(
            cartItem.item_name === payload.item_name &&
            cartItem.comments === payload.comments &&
            areModificationsEqual(cartItem.modifications, payload.modifications)
          )
      );
    },
    setQuantity: (state: CartState, { payload }) => {
      const updatedQuantity = payload.quantity < 1 ? 1 : payload.quantity;
      
      state.value = state.value.map((cartItem: OrderedItemData) =>
        cartItem.item_name === payload.item_name &&
        cartItem.comments === payload.comments &&
        areModificationsEqual(cartItem.modifications, payload.modifications)
          ? { ...cartItem, quantity: updatedQuantity }
          : cartItem
      );
    },
    setInstructions: (state: CartState, { payload }) => {
      state.value = state.value.map((cartItem: OrderedItemData) =>
        cartItem.item_name === payload.item_name &&
        cartItem.comments === payload.oldComments &&
        areModificationsEqual(cartItem.modifications, payload.modifications)
          ? { ...cartItem, comments: payload.comments }
          : cartItem
      );
    },
    removeModification: (
      state: CartState,
      {
        payload,
      }: PayloadAction<{ itemIndex: number; modificationIndex: number }>
    ) => {
      const { itemIndex, modificationIndex } = payload;
      if (
        state.value[itemIndex] && 
        state.value[itemIndex].modifications && 
        state.value[itemIndex].modifications.length > modificationIndex
      ) {
        const removedModification = state.value[itemIndex].modifications[modificationIndex];
        state.value[itemIndex] = {
          ...state.value[itemIndex],
          modifications: state.value[itemIndex].modifications.filter((_, index) => index !== modificationIndex),
          price: state.value[itemIndex].price - removedModification.price/100
        };
      }
    },
  },
});

// Helper function to properly compare modifications
const areModificationsEqual = (
  modsA: ModificationData[] | undefined,
  modsB: ModificationData[] | undefined
): boolean => {
  // If both are undefined or empty, they're equal
  if (!modsA?.length && !modsB?.length) return true;
  // If only one is undefined or empty, they're not equal
  if (!modsA?.length || !modsB?.length) return false;
  // If lengths differ, they're not equal
  if (modsA.length !== modsB.length) return false;
  
  // Sort both arrays to ensure consistent comparison
  const sortedA = [...modsA].sort((a, b) => a.modification_id - b.modification_id);
  const sortedB = [...modsB].sort((a, b) => a.modification_id - b.modification_id);
  
  // Compare each modification
  for (let i = 0; i < sortedA.length; i++) {
    const a = sortedA[i];
    const b = sortedB[i];
    
    // Compare all properties that define a modification's identity
    if (
      a.modification_id !== b.modification_id ||
      a.modification !== b.modification ||
      a.category_id !== b.category_id ||
      a.item_id !== b.item_id
    ) {
      return false;
    }
  }
  
  return true;
};

export const {
  addToCart,
  removeFromCart,
  setQuantity,
  setInstructions,
  removeModification,
} = cartSlice.actions;

export default cartSlice.reducer;