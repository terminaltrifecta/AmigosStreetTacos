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
            <ListGroup.Item>
              Bacon, Egg, Cheddar, and Hash Brown Burrito
            </ListGroup.Item>
            <ListGroup.Item>
              3 Eggs, Carne Asada, Pico, and Cheese Burrito
            </ListGroup.Item>
            <ListGroup.Item>
              Two Tacos, Egg, Chorizo, Queso, Beans and Cilantro (Tacos, Pork)
            </ListGroup.Item>
            <ListGroup.Item>
              Huevos Rancheros, 3 Eggs, Veggies (Tacos)
            </ListGroup.Item>
          </ListGroup>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header className="Header">
          <h4>{acchdr2}</h4>
        </Accordion.Header>
        <Accordion.Body>
          <ListGroup variant="flush">
            <ListGroup.Item>Grilled Chicken</ListGroup.Item>
            <ListGroup.Item>Grilled Vegetables</ListGroup.Item>
            <ListGroup.Item>Chicken Mole</ListGroup.Item>
            <ListGroup.Item>Carne Asada</ListGroup.Item>
            <ListGroup.Item>Chicken Fajitas</ListGroup.Item>
          </ListGroup>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="3">
        <Accordion.Header className="Header">
          <h4>{acchdr3}</h4>
        </Accordion.Header>
        <Accordion.Body>
          <ListGroup variant="flush">
            <ListGroup.Item>Chicken Quesadilla</ListGroup.Item>
            <ListGroup.Item>California Quesadilla</ListGroup.Item>
            <ListGroup.Item>BBQ Chicken Quesadilla</ListGroup.Item>
          </ListGroup>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="4">
        <Accordion.Header className="Header">
          <h4>{acchdr4}</h4>
        </Accordion.Header>
        <Accordion.Body>
          <ListGroup variant="flush">
            <ListGroup.Item>California</ListGroup.Item>
            <ListGroup.Item>Chicken Fajitas</ListGroup.Item>
            <ListGroup.Item>Chicken Mole</ListGroup.Item>
            <ListGroup.Item>Grilled Vegetables</ListGroup.Item>
            <ListGroup.Item>Carne Asada</ListGroup.Item>
            <ListGroup.Item>Beef & Cheese</ListGroup.Item>
          </ListGroup>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="5">
        <Accordion.Header className="Header">
          <h4>{acchdr5}</h4>
        </Accordion.Header>
        <Accordion.Body>
          <ListGroup variant="flush">
            <ListGroup.Item>Chicken</ListGroup.Item>
            <ListGroup.Item>Carne Asada</ListGroup.Item>
            <ListGroup.Item>Ground Beef</ListGroup.Item>
            <ListGroup.Item>Carnitas (Pork)</ListGroup.Item>
            <ListGroup.Item>Suadero (Beef Steak)</ListGroup.Item>
            <ListGroup.Item>Chorizo (Pork)</ListGroup.Item>
          </ListGroup>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="6">
        <Accordion.Header className="Header">
          <h4>{acchdr6}</h4>
        </Accordion.Header>
        <Accordion.Body>
          <ListGroup variant="flush">
            <ListGroup.Item>Meatlovers Taco</ListGroup.Item>
            <ListGroup.Item>Taco Ranchero</ListGroup.Item>
            <ListGroup.Item>Taco Loco</ListGroup.Item>
            <ListGroup.Item>Veggie Taco</ListGroup.Item>
            <ListGroup.Item>Taco Campechano</ListGroup.Item>
            <ListGroup.Item>Quesadilla Rachera</ListGroup.Item>
          </ListGroup>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="7">
        <Accordion.Header className="Header">
          <h4>{acchdr7}</h4>
        </Accordion.Header>
        <Accordion.Body>
          <ListGroup variant="flush">
            <ListGroup.Item>Shrimp Tostada - $3.75</ListGroup.Item>
            <ListGroup.Item>Shrimp Tacos - $12.00</ListGroup.Item>
            <ListGroup.Item>Birria Tacos - $12.00</ListGroup.Item>
            <ListGroup.Item>Asada Fries - $13.00</ListGroup.Item>
            <ListGroup.Item>Taco Salad - $10.00</ListGroup.Item>
            <ListGroup.Item>Chicken Enchiladas - $11.00</ListGroup.Item>
            <ListGroup.Item>Combo Dinner - $11.00</ListGroup.Item>
            <ListGroup.Item>Tamales Dinner - $11.00</ListGroup.Item>
            <ListGroup.Item>Taco Dinner - $11.00</ListGroup.Item>
            <ListGroup.Item>Choriqueso - $10.00</ListGroup.Item>
            <ListGroup.Item>Crunch Wrap - $12.00</ListGroup.Item>
            <ListGroup.Item>Chicken Tostada - $3.50</ListGroup.Item>
            <ListGroup.Item>Tamales (Sold Individually, Pork or Chicken) - $2.25</ListGroup.Item>
            <ListGroup.Item>Nachos Supreme - $13.00</ListGroup.Item>
            <ListGroup.Item>Mangonada - $5.75</ListGroup.Item>
            <ListGroup.Item>
              Spicy Street Corn (With Hot Cheetos) - $5.50
            </ListGroup.Item>
            <ListGroup.Item>Street Corn - $3.50</ListGroup.Item>
            <ListGroup.Item>Torta With French Fries - $12.00</ListGroup.Item>
          </ListGroup>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default AccordionMenu;
