"use client";

import "bootstrap/dist/css/bootstrap.css";
import React, { useState, useEffect } from "react";
import CartViewer from "../components/Cart/CartViewer";
import AccordionMenuOrder from "../components/AccordionOrderMenu/page";
import { RootState } from "@/lib/store";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import LocationPopup from "../components/LocationPopup/LocationPopup"; // Import the LocationPopup component
import DropdownButton from "../components/DropdownButton/dropdownButton";

export default function Order() {
  const location = useAppSelector((state: RootState) => state.location);
  const [showLocationPopup, setShowLocationPopup] = useState(false);

  useEffect(() => {
    // Show the location popup on page load

    if (location < 0) {
      console.log(location);
      setShowLocationPopup(true);
    }
  }, []);

  const handleClosePopup = () => {
    setShowLocationPopup(false);
  };

  return (
    <div className="d-grid p-4">
      {/* Location Popup */}
      <LocationPopup show={showLocationPopup} onClose={handleClosePopup} />

      <AccordionMenuOrder
        acchdr1="Breakfast - $5"
        acchdr2="Bowls - $10"
        acchdr3="Quesadillas - $10"
        acchdr4="Burritos - $10"
        acchdr5="Tacos - $2.85"
        acchdr6="Gourmet Items - $3.75"
        acchdr7="Amigos Specials"
      />
    </div>
  );
}
