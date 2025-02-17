import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface timeState {
  time: number;
}

export const timeSlice = createSlice({
  name: "ETA",
  initialState: 20, // in minutes
  reducers: {
    setTime: (state:any, {payload}) => {
      return payload;
    }
  },
});

export const { setTime } = timeSlice.actions;

export default timeSlice.reducer;
