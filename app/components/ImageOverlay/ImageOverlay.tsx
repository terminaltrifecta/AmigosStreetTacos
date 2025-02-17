'use client'

import "bootstrap/dist/css/bootstrap.css";
import "./ImageOverlay.css";
import Image from "next/image";

function ImageOverlay({img, text}: any) {
  return (
    <div className="container-image">
      <Image
        className="MenuImage"
        width={1920}
        height={1080}
        src={img}
        alt={text}
      />
      <h1 className="bottom-centered-text">{text}</h1>
    </div>
  );
}

export default ImageOverlay;
