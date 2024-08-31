"use client";

import { useState } from "react";
import "./Navbar.css";
import "bootstrap/dist/css/bootstrap.css";
import Link from "next/link";
import { Menu, Xmark, CartAlt } from "iconoir-react";
import Buttons from "../ButtonGroup/Buttons";

function Navbar() {
  const [clicked, setClicked] = useState(false);
  const [selected, setSelected] = useState("home");

  function switchClick() {
    setClicked(!clicked);
  }

  return (
    <nav id="nav" className={clicked ? "sticky-top active" : "sticky-top"}>
      <Link
        href="/"
        className="logo"
        onClick={() => {
          setSelected("home");
        }}
      >
        <img src="\static\assets\amigoslogo.png" className="img-fluid" alt="" />
      </Link>
      <div>
        <ul id="navbar" className={clicked ? "active" : ""}>
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
        <a
          onClick={() => {
            setSelected("Order");
          }}
        >
          <Buttons color="red">Order</Buttons>
        </a>
        
        <Link href="/cart" className="cartParent">
          <CartAlt className="cart" width={32} height={32} strokeWidth={2} />
        </Link>

        <div
          id="mobile"
          onClick={() => {
            switchClick();
          }}
        >
          {clicked ? (
            <Xmark id="icon" width={32} height={32} strokeWidth={3} />
          ) : (
            <Menu id="icon" width={32} height={32} strokeWidth={3} />
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
