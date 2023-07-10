import React from "react";
import AccordionMenu from "../components/Accordion Menu/AccordionMenu";
import ImageOverlay from "../components/ImageOverlay/ImageOverlay";

export default function Menu() {
  return (
    <React.StrictMode>
      <div className="d-grid">
        <ImageOverlay text="Our Menu" img="\static\assets/about/amigosgrub.jpg" />
        <div className="p-4">
          <AccordionMenu
            acchdr1="Breakfast - $5"
            acchdr2="Bowls - $10"
            acchdr3="Quesadillas - $10"
            acchdr4="Burritos - $10"
            acchdr5="Tacos - $2.85"
            acchdr6="Gourmet Items - $3.75"
            acchdr7="Amigos Specials"
          />
        </div>
      </div>
    </React.StrictMode>
  );
}
