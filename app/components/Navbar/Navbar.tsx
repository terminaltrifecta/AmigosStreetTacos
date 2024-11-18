"use client";

import { useEffect, useState } from "react";
import "./Navbar.css";
import "bootstrap/dist/css/bootstrap.css";
import Link from "next/link";
import { Menu, Xmark, CartAlt, MapPin } from "iconoir-react";
import Buttons from "../ButtonGroup/Buttons";
import { useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import LocationSelector from "./LocationSelector/LocationSelector";

export default function Navbar() {
  const [clicked, setClicked] = useState(false);
  const [selected, setSelected] = useState("home");
  const [justAdded, setJustAdded] = useState(false);

  function switchClick() {
    setClicked(!clicked);
  }

  const cart = useAppSelector((state: RootState) => state.cart);

  const itemCount = cart.reduce((a: any, v: any) => (a = a + v.quantity), 0);

  useEffect(() => {
    setJustAdded(true); // begin the animation
    setTimeout(() => setJustAdded(false), 500); // end after 0.5s
  }, [itemCount]);

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
          <li>
            <Link
              href="/test"
              className={selected == "test" ? "active" : ""}
              onClick={() => {
                setSelected("test");
              }}
            >
              Test
            </Link>
          </li>
        </ul>
      </div>
      <div id="orderMobileContainer">
        {/* order icon */}
        <div
          onClick={() => {
            setSelected("Order");
          }}
        >
          <Buttons color="red">Order</Buttons>
        </div>

        {/* location selecting */}
        <LocationSelector/>

        {/* cart icon */}
        <Link href="/cart" className="cartParent">
          <div className="orderMarker">
            <div
              className={
                justAdded ? "orderQuantity orderJustAdded" : "orderQuantity"
              }
            >
              {itemCount}
            </div>
          </div>
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
