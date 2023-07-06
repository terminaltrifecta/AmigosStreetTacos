import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./ImageOverlay.css";


interface Props {
  img: String;
  text: String
}

function ImageOverlay({img, text}: any) {
  return (
    <div className="container-image">
      <img
        className="MenuImage"
        src={img}
        alt={text}
      />
      <h1 className="bottom-centered-text">{text}</h1>
    </div>
  );
}

export default ImageOverlay;
