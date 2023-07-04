import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <div className="main-footer">
      <div className="columns">
        <div className="column-one column">
          <h4>Big Black</h4>
          <a href="">
            <p>balls?</p>
          </a>
          <a href="">
            <p>balls?</p>
          </a>
          <a href="">
            <p>balls?</p>
          </a>
        </div>

        <div className="column-two column">
          <h4>N</h4>
          <a href="">
            <p>balls?</p>
          </a>
          <a href="">
            <p>balls?</p>
          </a>
          <a href="">
            <p>balls?</p>
          </a>
        </div>

        <div className="column-three column">
          <h4>Balls!</h4>
          <a href="">
            <p>balls?</p>
          </a>
          <a href="">
            <p>balls?</p>
          </a>
          <a href="">
            <p>balls?</p>
          </a>
        </div>

        <div className="socials">
          <h4>Social Medias</h4>
          <div className="socials-row">
            <a href="https://facebook.com/">
              <p>
                <img className="fb" src=".\src\assets\fb.png" alt="" />
              </p>
            </a>
            <a href="https://instagram.com/">
              <p>
                <img className="ig" src=".\src\assets\ig.png" alt="" />
              </p>
            </a>
          </div>
        </div>
      </div>

      <hr />

      <div className="finePrint row">
        <p>
          @{new Date().getFullYear()} Amigos Street Tacos. All Rights Reserved.
        </p>
      </div>
    </div>
    // Footer ^
  );
}

export default Footer;
