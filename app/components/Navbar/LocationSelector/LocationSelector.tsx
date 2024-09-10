import { MapPin } from "iconoir-react";
import Link from "next/link";
import React, { useState } from "react";
import "./locationSelector.css";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setLocation } from "@/slices/locationSlice";
import { RootState } from "@/lib/store";

export default function LocationSelector() {
  const [open, setOpen] = useState(false);

  const dispatch = useAppDispatch();
  const location = useAppSelector((state: RootState) => state.location);

  return (
    <div>
      <div className={open ? "backdrop" : ""} onClick={() => setOpen(false)} />

      <div className={"locationButton"} onClick={() => setOpen(!open)}>
        <MapPin className="cart" width={32} height={32} strokeWidth={2} />
      </div>

      <div className={open ? "menuOptions open" : "menuOptions"}>
        <div
          className={location == 0 ? "selectedLocation" : "option"}
          onClick={() => {
            dispatch(setLocation(0));
          }}
        >
          17 Mile Rd, Sterling Heights
        </div>
        <div
          className={location == 1 ? "selectedLocation" : "option"}
          onClick={() => {
            dispatch(setLocation(1));
          }}
        >
          14 Mile Rd, Sterling Heights
        </div>
        <div
          className={location == 2 ? "selectedLocation" : "option"}
          onClick={() => {
            dispatch(setLocation(2));
          }}
        >
          St Clair Shores
        </div>
      </div>
    </div>
  );
}
