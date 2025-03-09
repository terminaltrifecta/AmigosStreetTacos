import {
  CategoryData,
  LocationHoursData,
  MenuItemData,
  ModificationData,
  PromotionData,
} from "@/app/interfaces";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { set } from "date-fns";

export interface MenuState {
  menuItems: MenuItemData[];
  categories: CategoryData[];
  modifications: ModificationData[];
  promotions: PromotionData[];
  hours: LocationHoursData;
}

export const menuSlice = createSlice({
  name: "Menu",
  initialState: {
    menuItems: [],
    categories: [],
    modifications: [],
    promotions: [],
    hours: {
      monday_open: "",
      monday_close: "",
      tuesday_open: "",
      tuesday_close: "",
      wednesday_open: "",
      wednesday_close: "",
      thursday_open: "",
      thursday_close: "",
      friday_open: "",
      friday_close: "",
      saturday_open: "",
      saturday_close: "",
      sunday_open: "",
      sunday_close: "",
    },
  },
  reducers: {
    setPromotions: (
      state: MenuState,
      { payload }: PayloadAction<PromotionData[]>
    ) => {
      state.promotions = payload;
    },
    setMenuItems: (
      state: MenuState,
      { payload }: PayloadAction<MenuItemData[]>
    ) => {
      state.menuItems = payload;
    },
    setCategories: (
      state: MenuState,
      { payload }: PayloadAction<CategoryData[]>
    ) => {
      state.categories = payload;
    },
    setModifications: (
      state: MenuState,
      { payload }: PayloadAction<ModificationData[]>
    ) => {
      state.modifications = payload;
    },
    setHours: (
      state: MenuState,
      { payload }: PayloadAction<LocationHoursData>
    ) => {
      state.hours = payload;
    },
  },
});

export const { setPromotions, setMenuItems, setCategories, setModifications, setHours } =
  menuSlice.actions;

export default menuSlice.reducer;
