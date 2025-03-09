import {
  OrderedItemData,
  ModificationData,
  CartState,
  PromotionData,
} from "@/app/interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { set } from "date-fns";

interface PromotionState {
  promocode: string;
  selectedPromotion: PromotionData | null;
}

export const promotionSlice = createSlice({
  name: "promotion",
  initialState: {
    promocode: "",
    selectedPromotion: null,
  } as PromotionState,
  reducers: {
    setPromocode: (state: PromotionState, { payload }) => {
      state.promocode = payload;
    },
    setSelectedPromotion: (state: PromotionState, { payload }) => {
    state.selectedPromotion = payload
    },
}});


export const {
  setPromocode,
  setSelectedPromotion
} = promotionSlice.actions;

export default promotionSlice.reducer;
