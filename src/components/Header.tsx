import "bootstrap/dist/css/bootstrap.css";
import { Container, Nav, Navbar } from "react-bootstrap";

function Header() {
  return (
    <Navbar bg="white">
      <Navbar.Brand href="#home">
        <img src="../assets/amigoslogo.png" alt="" />
      </Navbar.Brand>
    </Navbar>
  );
}

export default Header;
