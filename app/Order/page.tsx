"use client";

import "bootstrap/dist/css/bootstrap.css";
import React, { useState } from "react";
import CartViewer from "../components/Cart/CartViewer";
import AccordionMenuOrder from "../components/AccordionOrderMenu/page";
import { RootState } from "@/lib/store";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setLocation } from "@/slices/locationSlice";

export default function Order() {
  const dispatch = useAppDispatch();
  const location = useAppSelector((state: RootState) => state.location);


  return (
    <div className="d-grid p-4">
      <div className="d-flex">
        <div className="fs-2 p-2 fw-bold">Location: {location}</div>
        <Button
          variant="primary"
          onClick={() => {
            dispatch(setLocation("seventeen"));
          }}
        >
          seventeen
        </Button>
        <Button
          variant="primary"
          className="mx-2"
          onClick={() => {
            dispatch(setLocation("fourteen"));
          }}
        >
          fourteen
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            dispatch(setLocation("clair"));
          }}
        >
          clair
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
