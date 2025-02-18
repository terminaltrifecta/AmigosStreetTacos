import { MapPin } from "iconoir-react";
import Link from "next/link";
import React, { useState } from "react";
import "./locationSelector.css";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setLocation } from "@/slices/locationSlice";
import { RootState } from "@/lib/store";
import { LocationData } from "@/app/interfaces";
import { initializeHours } from "@/app/utils/menuUtils";

export default function LocationSelector() {
  const [open, setOpen] = useState(false);

  const dispatch = useAppDispatch();
  const locationState = useAppSelector(
    (state: RootState) => state.location
  );

  return (
    <div>
      <div className={open ? "backdrop" : ""} onClick={() => setOpen(false)} />

      <div className={"locationButton"} onClick={() => setOpen(!open)}>
        <MapPin className="cart" width={32} height={32} strokeWidth={2} />
      </div>

      <div className={open ? "menuOptions open" : "menuOptions"}>
        {locationState.locations.map((location: LocationData, index: number) => {
          return (
            <div
              key={index}
              className={locationState.selectedLocation == location.location_id ? "selectedLocation" : "option"}
              onClick={() => {
                dispatch(setLocation(location.location_id));
                initializeHours(dispatch, locationState.locations, location.location_id);
              }}
            >
              {location.location_name}
            </div>
          );
        })}
      </div>
    </div>
  );
}
