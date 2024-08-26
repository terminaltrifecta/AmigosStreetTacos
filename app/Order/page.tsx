"use client";

import "bootstrap/dist/css/bootstrap.css";
import React, { useState } from "react";
import CartViewer from "../components/Cart/CartViewer";
import AccordionMenuOrder from "../components/AccordionOrderMenu/page";
import { OrderHandler } from "../components/Cart/CartProvider";



export default function Order() {
  return (
    <OrderHandler/>
  );
}
