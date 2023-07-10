import "bootstrap/dist/css/bootstrap.css";
import Carousel from "react-bootstrap/Carousel";
import "./Slideshow.css"

function Slideshow() {
  return (
    <Carousel controls={true} touch={true}>
      <Carousel.Item interval={3000}>
        <img
          className="d-block w-100 img-fluid"
          src="\static\assets\slideshow\tacoplatter.jpg"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>Delicious Tacos</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={3000}>
        <img
          className="d-block w-100 img-fluid"
          src="\static\assets\slideshow\ingredients.jpg"
          alt="Second slide"
        />
        <Carousel.Caption>
          <h3>Fresh Ingredients</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={3000}>
        <img
          className="d-block w-100 img-fluid"
          src="\static\assets\slideshow\interior.jpg"
          alt="Third slide"
        />
        <Carousel.Caption>
          <h3>Clean Locations</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={3000}>
        <img
          className="d-block w-100 img-fluid"
          src="\static\assets\slideshow\beanplatter.jpg"
          alt="Third slide"
        />
        <Carousel.Caption>
          <h3>Authentic Cuisine</h3>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Slideshow;
