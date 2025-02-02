"use client";

import React, { useEffect, useState } from "react";
import AccordionMenu from "../components/Accordion Menu/AccordionMenu";
import ImageOverlay from "../components/ImageOverlay/ImageOverlay";
import { useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import LocationPopup from "../components/LocationPopup/LocationPopup";

export default function Menu() {  

  const location = useAppSelector((state: RootState) => state.location);
  const [showLocationPopup, setShowLocationPopup] = useState(false);

  useEffect(() => {
    // Show the location popup on page load

    if (location < 0) {
      console.log(location);
      setShowLocationPopup(true);
    }
  }, []);


  return (
    <div className="d-grid">
      <ImageOverlay text="Our Menu" img="\static\assets/about/amigosgrub.jpg" />
      <div className="p-4">
        <LocationPopup show={showLocationPopup} onClose={() => {setShowLocationPopup(false)}} />
        <AccordionMenu/>
      </div>
    </div>
  );
}
