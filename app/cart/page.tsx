"use client";

import "bootstrap/dist/css/bootstrap.css";
import React, { useState } from "react";
import CartViewer from "../components/Cart/CartViewer";
import Order from "../order/page";
import { CartHandler } from "../components/Cart/CartProvider";


export default function Cart() {
  
  return (
    <div className="d-grid gap-3">
      <CartHandler/>
    </div>
  );
}
