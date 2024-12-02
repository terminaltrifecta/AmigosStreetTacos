import CardTab from "../components/CardTab/CardTab.tsx";
import Slideshow from "../components/Slideshow/Slideshow.tsx";
import Tab from "../components/Tab/Tab.tsx";
import { Analytics } from "@vercel/analytics/react";

export default function Root() {
  return (
    <>
    <Analytics />
      <div className="d-grid gap-3">
        <Slideshow />
        <Tab
          text="Carne Asada Fries. They're f#cking delicious."
          textRight="true"
          img="\static\assets\home\fries.jpg"
        />
        <Tab
          text="Enjoy real Mexican from the comfort of your home with online delivery services. You can find us anywhere!"
          textRight="false"
          img="\static\assets\home\delivery.jpg"
        />
        <CardTab
          img1="\static\assets\slideshow\img1.png"
          hdr1="Chicken Tacos"
          img2="\static\assets\home\carnetacos.jpg"
          hdr2="Carne Asada Tacos"
          img3="\static\assets\home\barriatacos.jpg"
          hdr3="Birria Tacos"
        />
        <Tab
          text="Love what you see? Take everything home with our quick carry-out."
          textRight="false"
          img="\static\assets\home\carryout.jpg"
        />
        <Tab
          text="We have amazing deals as well! Get 5 tacos for ten dollars anyday, or a special $2.00 per street taco on Taco Tuesdays!"
          textRight="true"
          img="\static\assets\home\tacosdeal.jpeg"
        />
        <Tab
          text="Like what you see? Come and try our birria tacos today!"
          textRight="false"
          img="\static\assets\home\birria_tacos_AdobeExpress.gif"
        />
        <Tab
          text="Be sure to try our lunch combo! It comes 2 tacos, rice and beans, a can of pop, and chips and salsa! All for $12!"
          textRight="true"
          img="\static\assets\home\riceandbeans.jpg"
        />
      </div>
    </>
  );
}
