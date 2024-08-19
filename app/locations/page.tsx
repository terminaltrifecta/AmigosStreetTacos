"use client";

import React from "react";
import IframeTab from "../components/IframeTab/IframeTab";
import ImageOverlay from "../components/ImageOverlay/ImageOverlay";

export default function Locations() {
  return (
    <div className="d-grid gap-3">
      <ImageOverlay
        text="locations"
        img="\static\assets/amigosstreettacos.jpg"
      />
      <IframeTab
        iframeLink="https://storage.googleapis.com/maps-solutions-5882juutz9/locator-plus/kt70/locator-plus.html"
        textRight="true"
        iframeWidth="1000"
        iframeHeight="1000"
        loading="lazy"
        text="Come and visit any of our three locations. We're waiting."
      />
    </div>
  );
}
