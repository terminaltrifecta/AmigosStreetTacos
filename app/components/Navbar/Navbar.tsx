"use client";

import { useState } from "react";
import "./Navbar.css";
import "bootstrap/dist/css/bootstrap.css";
import Link from "next/link";

function Navbar() {
  const [clicked, setClicked] = useState(false);
  const [selected, setSelected] = useState("home");

  function switchClick() {
    setClicked(!clicked);
  }

  return (
    <nav id="nav" className={clicked ? "sticky-top active" : "sticky-top"}>
      <a
        href="/"
        className="logo"
        onClick={() => {
          setSelected("home");
        }}
      >
        <img src="\static\assets\amigoslogo.png" className="img-fluid" alt="" />
      </a>
      <div>
        <ul id="navbar" className={clicked ? "#navbar active" : "#navbar"}>
          <li>
            <Link
              href="/menu"
              className={selected == "menu" ? "active" : ""}
              onClick={() => {
                setSelected("menu");
              }}
            >
              Menu
            </Link>
          </li>
          <li>
            <Link
              href="/locations"
              className={selected == "locations" ? "active" : ""}
              onClick={() => {
                setSelected("locations");
              }}
            >
              Locations
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className={selected == "about" ? "active" : ""}
              onClick={() => {
                setSelected("about");
              }}
            >
              About
            </Link>
          </li>
        </ul>
      </div>
      <div id="orderMobileContainer">
        <Link
          className="orderParent"
          href="https://food.google.com/?sei=CSMFYu9J0EmqERGSCnevhSDv&utm_campaign&ved&q=amigos%20street%20tacos&loc_q&fo_m=EhESAggCqgEKCggIARIEEgIIAg&lat=42.074968894897076&lng=-82.871581339737"
          target="_blank"
        >
          <div
            id="orderBody"
            className="d-flex align-items-center justify-content-center"
          >
            Order
          </div>
        </Link>
        <div id="mobile">
          <i
            id="bar"
            className={clicked ? "fas fa-times" : "fas fa-bars"}
            onClick={switchClick}
          />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
