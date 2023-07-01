import React from "react";
import ReactDOM from "react-dom/client";

import Header from "./components/Header1.tsx";
import Slideshow from "./components/Slideshow/Slideshow.tsx";
import Tab from "./components/Tab/Tab.tsx";

import "./App.css"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Header />
    <div className="d-grid gap-2">
      <Slideshow />
      <Tab
        text="Amazing, authentic Mexican cuisine!"
        textRight="true"
        img=".\src\assets\slideshow\img1.png"
      />
      <Tab
        text="Mudda trucka!"
        textRight="false"
        img=".\src\assets\slideshow\img1.png"
      />
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

