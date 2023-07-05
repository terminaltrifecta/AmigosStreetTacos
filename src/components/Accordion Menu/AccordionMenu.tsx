import Accordion from "react-bootstrap/Accordion";
import "bootstrap/dist/css/bootstrap.css";
import "./AccordionMenu.css";
import ListGroup from "react-bootstrap/ListGroup";

interface Props {
  acchdr1: String;
  acchdr2: String;
  acchdr3: String;
  acchdr4: String;
  acchdr5: String;
  acchdr6: String;
  acchdr7: String;
  acctxt1: String;
  acctxt2: String;
  acctxt3: String;
  acctxt4: String;
  acctxt5: String;
  acctxt6: String;
  acctxt7: String;
}

function AccordionMenu({
  acchdr1,
  acchdr2,
  acchdr3,
  acchdr4,
  acchdr5,
  acchdr6,
  acchdr7,
  acctxt1,
  acctxt2,
  acctxt3,
  acctxt4,
  acctxt5,
  acctxt6,
  acctxt7,
}: any) {
  return (
    <Accordion>
      <Accordion.Item eventKey="1">
        <Accordion.Header>
          <h4>{acchdr1}</h4>
        </Accordion.Header>
        <Accordion.Body>
          <ListGroup variant="flush">
            <ListGroup.Item>
              Chorizo, Egg, Cheese, and Veggie Burrito (Contains Pork)
            </ListGroup.Item>
            <ListGroup.Item>Bacon, Egg, Cheddar, and Hash Brown Burrito</ListGroup.Item>
            <ListGroup.Item>3 Eggs, Carne Asada, Pico, and Cheese Burrito</ListGroup.Item>
            <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
            <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
          </ListGroup>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header className="Header">
          <h4>{acchdr2}</h4>
        </Accordion.Header>
        <Accordion.Body>{acctxt2}</Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="3">
        <Accordion.Header className="Header">
          <h4>{acchdr3}</h4>
        </Accordion.Header>
        <Accordion.Body>{acctxt3}</Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="4">
        <Accordion.Header className="Header">
          <h4>{acchdr4}</h4>
        </Accordion.Header>
        <Accordion.Body>{acctxt4}</Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="5">
        <Accordion.Header className="Header">
          <h4>{acchdr5}</h4>
        </Accordion.Header>
        <Accordion.Body>{acctxt5}</Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="6">
        <Accordion.Header className="Header">
          <h4>{acchdr6}</h4>
        </Accordion.Header>
        <Accordion.Body>{acctxt6}</Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="7">
        <Accordion.Header className="Header">
          <h4>{acchdr7}</h4>
        </Accordion.Header>
        <Accordion.Body>{acctxt7}</Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default AccordionMenu;
