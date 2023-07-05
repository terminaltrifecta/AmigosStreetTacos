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
        </ul>
      </div>
      <div id="orderMobileContainer">
        <a
          className="orderParent"
          href="https://food.google.com/chooseprovider?restaurantId=/g/11jvr584cn&g2lbs=AP8S6EPTYWYNbtOxlU6AsRjrPflEnyTLXeR8tsC8APAz-kMFLPvFnq9qo3rUzaLyx8GDAt6b38KTcNYd6tnl6-ACMhnmU_qfPElei05irWlLCYrmtXiPzVLGy5pbahVdqbQeflp9P4Em&hl=en-US&gl=us&cs=1&ssta=1&fo_m=MfohQo559jFvMUOzJVpjPL1YMfZ3bInYwBDuMfaXTPp5KXh-&gei=z8-kZIbRHK-kptQPzJmiqAM&ei=z8-kZIbRHK-kptQPzJmiqAM&fo_s=OA&orderType=2&sei=CTRfhwuxP1WvEQGWhico-r_D&utm_campaign"
          target="_blank"
        >
          <div
            id="orderBody"
            className="d-flex align-items-center justify-content-center"
          >
            Order
          </div>
        </a>
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
