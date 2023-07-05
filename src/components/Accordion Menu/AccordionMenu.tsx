import Accordion from 'react-bootstrap/Accordion';
import "bootstrap/dist/css/bootstrap.css";
import "./AccordionMenu.css";

function AccordionMenu() {
  return (
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header className='Header'>
            <h4>Breakfast</h4>
            <p>Grab some Grub in the Morning!</p>
        </Accordion.Header>
        <Accordion.Body>
          Lorem ipsum dolor sit amet
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Accordion Item #2</Accordion.Header>
        <Accordion.Body>
          Lorem ipsum dolor sit amet
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default AccordionMenu;