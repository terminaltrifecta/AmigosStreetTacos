"use client";

import "bootstrap/dist/css/bootstrap.css";
import React, { useState } from "react";
import CartViewer from "../components/Cart/CartViewer";
import AccordionMenuOrder from "../components/AccordionOrderMenu/page";
import { RootState } from "@/lib/store";
import { useAppSelector } from "@/lib/hooks";

export default function Order() {
  const cart = useAppSelector((state: RootState) => state.cart);

  return (
    <div className="d-grid p-4">
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
