import "bootstrap/dist/css/bootstrap.css";
import "./Footer.css";
import Link from "next/link";
import { Instagram, Facebook } from "iconoir-react/regular";

function Footer() {
  // Helper function to create maps links
  const mapsUrl = (address: string) => 
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

  return (
    <div className="background">
      <div className="container mainfooter">
        <div className="footer-grid">
          {/* Locations */}
          <div className="footer-section">
            <h5>Locations</h5>
            <div className="footer-content">
              <a href={mapsUrl("5823 17 Mile Rd, Sterling Heights, MI 48310")} className="address-link">
                5823 17 Mile Rd<br/>Sterling Heights, MI 48310
              </a>
              <a href={mapsUrl("13245 14 Mile Rd, Sterling Heights, MI 48312")} className="address-link">
                13245 14 Mile Rd<br/>Sterling Heights, MI 48312
              </a>
              <a href={mapsUrl("22428 Greater Mack Ave, St Clair Shores, MI 48080")} className="address-link">
                22428 Greater Mack Ave<br/>St Clair Shores, MI 48080
              </a>
              <a href={mapsUrl("14156 Eureka Rd, Southgate, MI 48195")} className="address-link">
                14156 Eureka Rd<br/>Southgate, MI 48195
              </a>
            </div>
          </div>

          {/* Hours */}
          <div className="footer-section">
            <h5>Hours</h5>
            <div className="footer-content">
              <p>Monday - Saturday<br/>9AM - 10PM</p>
              <p>Sunday<br/>9AM - 8PM</p>
            </div>
          </div>

          {/* Contact */}
          <div className="footer-section">
            <h5>Contact</h5>
            <div className="footer-content">
              <Link href="tel:3134299090" className="footer-link">
                313-429-9090 <span>(17 Mile)</span>
              </Link>
              <Link href="tel:5868384311" className="footer-link">
                586-838-4311 <span>(14 Mile)</span>
              </Link>
              <Link href="tel:5862187247" className="footer-link">
                586-218-7247 <span>(St. Clair)</span>
              </Link>
              <Link href="tel:5862187247" className="footer-link">
                734-225-7222 <span>(Southgate)</span>
              </Link>
            </div>
          </div>

          {/* Social */}
          <div className="footer-section">
            <h5>Follow Us</h5>
            <div className="social-container">
              <a href="https://facebook.com/" className="social-icon">
                <Facebook height={22} width={22} />
              </a>
              <a href="https://instagram.com/" className="social-icon">
                <Instagram height={22} width={22} />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-legal">
          <p className="copyright">
            ©{new Date().getFullYear()} Amigos Street Tacos
          </p>
          <div className="legal-links">
            <Link href="/terms">Terms</Link>
            <span className="divider">|</span>
            <Link href="/privacy">Privacy</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;