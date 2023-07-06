import "bootstrap/dist/css/bootstrap.css";
import "./Footer.css";

function Footer() {
  return (
    <div className="background">
      <div className="p-4 container text-center mainfooter">
        <div className="row row-cols-auto w-100">
          <div className="col footercol">
            <h4>Locations</h4>
            <p>5823 17 Mile Rd, Sterling Heights, MI 48310</p>
            <p>13245 14 Mile Rd, Sterling Heights, MI 48312</p>
            <p>22428 Greater Mack AveSt Clair Shores, MI 48080</p>
          </div>

          <div className="col footercol Hours">
            <h4>Hours</h4>
            <p>Monday - Saturday: 8AM - 10PM</p>
            <p>Sunday: 8AM - 8PM</p>
          </div>

          <div className="col footercol">
            <h4>Contact Us</h4>
            <a href="tel:5862187247">
              <p>(586) 218-7247</p>
            </a>
            <a href="tel:5868384311">
              <p>(586) 838-4311</p>
            </a>
            <a href="tel:3134299090">
              <p>(313) 429-9090</p>
            </a>
          </div>

          <div className="col footercol">
            <h4>Social Media</h4>
            <div className="socials-row">
              <a
                href="https://facebook.com/"
                style={{ color: "rgb(20, 10, 2)" }}
              >
                <i className="fa-brands fa-facebook fa-2xl"></i>
              </a>
              <a
                href="https://instagram.com/"
                style={{ color: "rgb(20, 10, 2)" }}
              >
                <i className="fa-brands fa-instagram fa-2xl"></i>
              </a>
            </div>
          </div>
        </div>

        <hr />

        <div className="finePrint row">
          <p>
            ©️{new Date().getFullYear()} Amigos Street Tacos. All Rights
            Reserved.
          </p>
        </div>
      </div>
    </div>
    // Footer ^
  );
}

export default Footer;
