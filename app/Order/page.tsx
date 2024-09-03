"use client";

import "bootstrap/dist/css/bootstrap.css";
import React, { useState, useEffect } from "react";
import CartViewer from "../components/Cart/CartViewer";
import AccordionMenuOrder from "../components/AccordionOrderMenu/page";
import { RootState } from "@/lib/store";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Button } from "react-bootstrap";
import { setLocation } from "@/slices/locationSlice";
import LocationPopup from "../components/LocationPopup/LocationPopup"; // Import the LocationPopup component

export default function Order() {
  const dispatch = useAppDispatch();
  const location = useAppSelector((state: RootState) => state.location);
  const [showLocationPopup, setShowLocationPopup] = useState(true);

  useEffect(() => {
    // Show the location popup on page load
    setShowLocationPopup(true);
  }, []);

  const handleClosePopup = () => {
    setShowLocationPopup(false);
  };

  return (
    <div className="d-grid p-4">
      {/* Location Popup */}
      <LocationPopup show={showLocationPopup} onClose={handleClosePopup} />

      <div className="d-flex">
        <div className="fs-2 p-2 fw-bold">Location: {location}</div>
        <Button
          variant="primary"
          onClick={() => {
            dispatch(setLocation("seventeen"));
          }}
        >
          Seventeen
        </Button>
        <Button
          variant="primary"
          className="mx-2"
          onClick={() => {
            dispatch(setLocation("fourteen"));
          }}
        >
          Fourteen
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            dispatch(setLocation("clair"));
          }}
        >
          Clair
        </Button>
      </div>
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
