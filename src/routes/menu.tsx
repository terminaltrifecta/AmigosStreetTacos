import React from "react";
import AccordionMenu from "../components/Accordion Menu/AccordionMenu";
import ImageOverlay from "../components/ImageOverlay/ImageOverlay";

export default function Menu() {
  return (
    <React.StrictMode>
      <ImageOverlay />
      <AccordionMenu
        acchdr1="Breakfast - $5"
        acchdr2="Bowls - $10"
        acchdr3="Quesadillas - $9"
        acchdr4="Burritos - $10"
        acchdr5="Tacos - $2.85"
        acchdr6="Gourmet Tacos - $3.50"
        acchdr7="Amigos Specials"
        acctxt1="poop"
        acctxt2="poop"
        acctxt3="poop"
        acctxt4="poop"
        acctxt5="poop"
        acctxt6="poop"
        acctxt7="poop"
      />
    </React.StrictMode>
  );
}
