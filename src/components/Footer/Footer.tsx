import "bootstrap/dist/css/bootstrap.css";
import "./Footer.css";

function Footer() {
  return (
    <div className="p-4 container text-center">
      <div className="row">
        <div className="col">
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

        <div className="col">
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

        <div className="col">
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

        <div className="col">
          <h4>Social Medias</h4>
          <div className="socials-row">
            <a href="https://facebook.com/">
              <i className="fa-brands fa-facebook fa-2xl"></i>
            </a>
            <a href="https://instagram.com/">
              <i className="fa-brands fa-instagram fa-2xl"></i>
            </a>
            <a href="https://instagram.com/">
              <i className="fa-brands fa-snapchat fa-2xl"></i>
            </a>
            <a href="https://instagram.com/">
              <i className="fa-brands fa-tiktok fa-2xl"></i>
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
