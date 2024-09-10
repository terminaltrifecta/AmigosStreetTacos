import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface LocationState {
  value: string;
}

export const locationSlice = createSlice({
  name: "Location",
  initialState: -1,
  reducers: {
    setLocation: (state:any, {payload}) => {
      return payload;
    }
  },
});

export const { setLocation } = locationSlice.actions;

export default locationSlice.reducer;
