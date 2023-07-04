import Footer from "../components/Footer/Footer.tsx";
import Header from "../components/Header/Header.tsx";
import Slideshow from "../components/Slideshow/Slideshow.tsx";
import Tab from "../components/Tab/Tab.tsx";

export default function Root() {
    return (
      <>
        <Header />
    <div className="d-grid gap-4">
      <Slideshow />
      <Tab
        text="Hello World!"
        textRight="true"
        img=".\src\assets\slideshow\img1.png"
      />
      <Tab
        text="Mudda trucka!"
        textRight="false"
        img=".\src\assets\slideshow\img1.png"
      />
      <Tab
        text="Hello World!"
        textRight="true"
        img=".\src\assets\slideshow\img1.png"
      />
      <Tab
        text="Mudda trucka!"
        textRight="false"
        img=".\src\assets\slideshow\img1.png"
      />
      <Tab
        text="Hello World!"
        textRight="true"
        img=".\src\assets\slideshow\img1.png"
      />
      <Tab
        text="Mudda trucka!"
        textRight="false"
        img=".\src\assets\slideshow\img1.png"
      />
      <Tab
        text="Hello World!"
        textRight="true"
        img=".\src\assets\slideshow\img1.png"
      />
      <Tab
        text="Mudda trucka!"
        textRight="false"
        img=".\src\assets\slideshow\img1.png"
      />
    </div>
    <Footer />
      </>
    );
  }