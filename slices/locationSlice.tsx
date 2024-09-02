import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface LocationState {
  value: string;
}

export const locationSlice = createSlice({
  name: "Location",
  initialState: "none",
  reducers: {
    setLocation: (state:string, {payload}) => {
      return payload;
    }
  },
});

export const { setLocation } = locationSlice.actions;

export default locationSlice.reducer;
