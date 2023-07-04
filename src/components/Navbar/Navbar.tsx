import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

function Navbar() {
  const [clicked, setClicked] = useState(false);

  function switchClick() {
    setClicked(!clicked);
  }

  return (
    <nav id="nav" className={clicked ? "sticky-top active" : "sticky-top"}>
      <NavLink to="/">
        <img
          src=".\src\assets\amigoslogo.png"
          className="img-fluid p-2"
          alt=""
          width="150px"
        />
      </NavLink>
      <div>
        <ul id="navbar" className={clicked ? "#navbar active" : "#navbar"}>
          <li>
            <NavLink to="/menu">Menu</NavLink>
          </li>
          <li>
            <NavLink to="/locations">Locations</NavLink>
          </li>
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
          <li></li>
        </ul>
      </div>
      <div id="orderMobileContainer">
        <NavLink className="orderParent" to="/order">
          <div
            id="orderBody"
            className="d-flex align-items-center justify-content-center"
          >
            Order
          </div>
        </NavLink>
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
