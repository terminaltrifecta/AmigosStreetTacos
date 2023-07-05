import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./ImageOverlay.css";

function ImageOverlay() {
  return (
    <div className="container-image">
      <img
        className="MenuImage"
        src="https://hips.hearstapps.com/hmg-prod/images/delish-202104-birriatacos-033-1619806490.jpg?crop=1xw:0.8435280189423836xh;center,top&resize=1200:*"
        alt="Birria Tacos"
      />
      <h1 className="bottom-centered-text">OUR MENU</h1>
    </div>
  );
}

export default ImageOverlay;
