import { CategoryData, MenuItemData, ModificationData } from "@/app/interfaces";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface MenuState {
    menuItems: MenuItemData[];
    categories: CategoryData[];
    modifications: ModificationData[];
}

export const menuSlice = createSlice({
  name: "Location",
  initialState: {
    menuItems: [],
    categories: [],
    modifications: []
  },
  reducers: {
    setMenuItems: (state: MenuState, { payload }: PayloadAction<MenuItemData[]>) => {
      state.menuItems = payload;
    },
    setCategories: (state: MenuState, { payload }: PayloadAction<CategoryData[]>) => {
      state.categories = payload;
    },
    setModifications: (state: MenuState, { payload }: PayloadAction<ModificationData[]>) => {
      state.modifications = payload;
    },
    
  },
});

export const { setMenuItems, setCategories, setModifications } = menuSlice.actions;

export default menuSlice.reducer;
