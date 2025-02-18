import { LocationData } from "@/app/interfaces";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface LocationState {
  selectedLocation: number | null;
  locations: LocationData[];
}

const initialState: LocationState = {
  selectedLocation: null,
  locations: [],
};

export const locationSlice = createSlice({
  name: "Location",
  initialState,
  reducers: {
    setLocation: (state: LocationState, action: PayloadAction<number>) => {
      state.selectedLocation = action.payload;
    },
    setLocations: (state: LocationState, action: PayloadAction<LocationData[]>) => {
      state.locations = action.payload;
    },
  },
});

export const { setLocation, setLocations } = locationSlice.actions;

export default locationSlice.reducer;
