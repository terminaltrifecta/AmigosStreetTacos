"use client";

import React from "react";
import AccordionMenu from "../components/Accordion Menu/AccordionMenu";
import ImageOverlay from "../components/ImageOverlay/ImageOverlay";

export default function Menu() {
  return (
    <div className="d-grid">
      <ImageOverlay text="Our Menu" img="\static\assets/about/amigosgrub.jpg" />
      <div className="p-4">
        <AccordionMenu/>
      </div>
    </div>
  );
}
