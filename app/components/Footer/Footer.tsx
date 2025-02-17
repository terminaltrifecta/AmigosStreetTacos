import "bootstrap/dist/css/bootstrap.css";
import "./Footer.css";
import Link from "next/link";
import { Iconoir } from "iconoir-react";
import { Instagram, Facebook } from "iconoir-react/regular";


function Footer() {
  return (
    <div className="background">
      <div className="p-4 container text-center mainfooter">
        <div className="footerRow w-100">
          <div className="footercol">
            <h4>Locations</h4>
            <p>5823 17 Mile Rd, Sterling Heights, MI 48310</p>
            <p>13245 14 Mile Rd, Sterling Heights, MI 48312</p>
            <p>22428 Greater Mack Ave, St Clair Shores, MI 48080</p>
            <p>14156 Eureka Rd, Southgate, MI 48195</p>
          </div>

          <div className="footercol Hours">
            <h4>Hours</h4>
            <p>Monday - Saturday: 9AM - 10PM</p>
            <p>Sunday: 9AM - 8PM</p>
          </div>

          <div className="footercol">
            <h4>Contact Us</h4>
            <Link href="tel:3134299090">
              <p>(313) 429-9090 (17 Mile)</p>
            </Link>
            <Link href="tel:5868384311">
              <p>(586) 838-4311 (14 Mile)</p>
            </Link>
            <Link href="tel:5862187247">
              <p>(586) 218-7247 (St. Clair)</p>
            </Link>
            <Link href="tel:5862187247">
              <p>(734) 225-7222 (Southgate)</p>
            </Link>
          </div>

          <div className="footercol">
            <h4>Social Media</h4>
            <div className="socials-row">
              <a
                href="https://facebook.com/"
                style={{ color: "rgb(20, 10, 2)" }}
              >
                <Facebook height={32} width={32} strokeWidth={2}/>
              </a>
              <a
                href="https://instagram.com/"
                style={{ color: "rgb(20, 10, 2)" }}
              >
                <Instagram height={32} width={32} strokeWidth={2}/>
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

          <Link href="/terms" className="finePrintLink">
              <p>Terms of Use | Privacy Policy</p>
            </Link>
        </div>
      </div>
    </div>
    // Footer ^
  );
}

export default Footer;
