import "bootstrap/dist/css/bootstrap.css";
import {Container, Nav, Navbar} from "react-bootstrap";

function Header() {
  return (
    <Navbar
      sticky="top"
      expand="lg"
      className="bg-body-tertiary"
      style={{ opacity: "0.9" }}
    >
      <Container>
        <Navbar.Toggle/>
        <Navbar.Brand href="#home">
          <img
            src=".\src\assets\amigoslogo.png"
            className="img-fluid p-2"
            alt=""
            width="150px"
          />
        </Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#menu">Menu</Nav.Link>
            <Nav.Link href="#location">Locations</Nav.Link>
            <Nav.Link href="#about">About</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Nav className="ms-auto">
          <Nav.Link href="#order">
            <button type="button" className="btn btn-outline-dark">
              Order
            </button>
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
    // Navbar ^
  );
}

export default Header;
