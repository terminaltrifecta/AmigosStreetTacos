"use client";

import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import { RootState } from "@/lib/store";
import { useAppSelector } from "@/lib/hooks";
import CartViewer from "../components/Cart/CartViewer";

export default function Cart() {

  return (
    <div className="d-grid gap-3">
      <CartViewer/>
    </div>
  );
}
