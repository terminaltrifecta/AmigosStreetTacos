import CardTab from "../components/CardTab/CardTab.tsx";
import Slideshow from "../components/Slideshow/Slideshow.tsx";
import Tab from "../components/Tab/Tab.tsx";

export default function Root() {
  return (
    <>
      <div className="d-grid gap-3">
        <Slideshow />
        <Tab
          text="Carne Asada Fries. They're f#!cking delicious."
          textRight="true"
          img=".\src\assets\home\fries.jpg"
        />
        <Tab
          text="Enjoy real Mexican from the comfort of your home with online delivery services. You can find us anywhere!"
          textRight="false"
          img=".\src\assets\home\delivery.jpg"
        />
        <CardTab
          img1=".\src\assets\slideshow\img1.png"
          hdr1="Chicken Tacos"
          img2=".\src\assets\home\carnetacos.jpg"
          hdr2="Carne Asada Tacos"
          img3=".\src\assets\home\barriatacos.jpg"
          hdr3="Birria Tacos"
        />
        <Tab
          text="Love what you see? Take everything home with our quick carry-out."
          textRight="false"
          img=".\src\assets\home\carryout.jpg"
        />
      </div>
    </>
  );
}
