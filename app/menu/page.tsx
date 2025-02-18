"use client";

import React, { useEffect, useState } from "react";
import AccordionMenu from "../components/Accordion Menu/AccordionMenu";
import ImageOverlay from "../components/ImageOverlay/ImageOverlay";
import { useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import LocationPopup from "../components/LocationPopup/LocationPopup";
import { useAppDispatch } from "@/lib/hooks";
import { initializeMenu } from "../utils/menuUtils";

export default function MenuPage() {
  const location = useAppSelector((state: RootState) => state.location.selectedLocation);
  const [showLocationPopup, setShowLocationPopup] = useState(false);
  const dispatch = useAppDispatch();
  const menu = useAppSelector((state: RootState) => state.menu);

  useEffect(() => {
    // Show the location popup on page load
    if (location === null) {
      setShowLocationPopup(true);
    }
  }, [location]);

  useEffect(() => {
    if (
      menu.menuItems.length === 0 &&
      menu.categories.length === 0 &&
      menu.modifications.length === 0
    ) {
      initializeMenu(dispatch);
    }
  }, [
    dispatch,
    menu
  ]);

  return (
    <div className="d-grid">
      <ImageOverlay text="Our Menu" img="/static/assets/about/amigosgrub.jpg" />
      <div className="p-4">
        <LocationPopup
          show={showLocationPopup}
          onClose={() => setShowLocationPopup(false)}
        />
        <AccordionMenu />
      </div>
    </div>
  );
}
