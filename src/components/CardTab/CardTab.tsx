import "bootstrap/dist/css/bootstrap.css";
import "./CardTab.css";
import Buttons from "../ButtonGroup/Buttons";
import Card from "react-bootstrap/Card";

function Tab({ img1, img2, img3, hdr1, hdr2, hdr3, txt1, txt2, txt3 }: any) {
  return (
    <div className="mainCardTab">
      <div className="row row-cols-auto justify-content-center w-100 ">
        <div className="cardCol col justify-content-center d-flex p-4">
          <Card>
            <Card.Img variant="top" src={img1} />
            <Card.Body>
              <Card.Title>{hdr1}</Card.Title>
              <Card.Text>{txt1}</Card.Text>
              <Buttons color="black">Order</Buttons>
            </Card.Body>
          </Card>
        </div>
        <div className="cardCol col justify-content-center d-flex p-4">
          <Card>
            <Card.Img variant="top" src={img2} />

            <Card.Body>
              <Card.Title>{hdr2}</Card.Title>
              <Card.Text>{txt2}</Card.Text>
              <Buttons color="black">Order</Buttons>
            </Card.Body>
          </Card>
        </div>
        <div className="cardCol col justify-content-center d-flex p-4">
          <Card>
            <Card.Img variant="top" src={img3} />
            <Card.Body>
              <Card.Title>{hdr3}</Card.Title>
              <Card.Text>{txt3}</Card.Text>
              <Buttons color="black">Order</Buttons>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Tab;
