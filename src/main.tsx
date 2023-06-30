import React from "react";
import ReactDOM from "react-dom/client";

import Header from "./components/Header.tsx";
import Slideshow from "./components/Slideshow.tsx";
import Tab from "./components/Tab.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Header />
    <div className="d-grid gap-4">
      <Slideshow />
      <Tab
        text="Hello World!"
        textRight="true"
        img=".\src\assets\slideshow\img1.png"
      />
      <Tab
        text="Mudda trucka!"
        textRight="false"
        img=".\src\assets\slideshow\img1.png"
      />
    </div>
  </React.StrictMode>
);
