import CardTab from "../components/CardTab/CardTab.tsx";
import Slideshow from "../components/Slideshow/Slideshow.tsx";
import Tab from "../components/Tab/Tab.tsx";

export default function Root() {
  return (
    <>
      <div className="d-grid gap-3">
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
        <CardTab
          img1=".\src\assets\slideshow\img1.png"
          hdr1="Chicken Tacos"
          img2=".\src\assets\slideshow\img1.png"
          hdr2="Carne Asada Tacos"
          img3=".\src\assets\slideshow\img1.png"
          hdr3="Birria Tacos"
        />
        <Tab
          text="Hello World!"
          textRight="true"
          img=".\src\assets\slideshow\img1.png"
        />
      </div>
    </>
  );
}
