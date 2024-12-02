import "bootstrap/dist/css/bootstrap.css";
import Tab from "../components/Tab/Tab.tsx";
import ImageOverlay from "../components/ImageOverlay/ImageOverlay.tsx";
import { Analytics } from "@vercel/analytics/react";

export default function About() {
  return (
    <div className="d-grid gap-3">
      <Analytics />
      <ImageOverlay
        text="About"
        img="/static/assets/about/AboutBackground.png"
      />
      <Tab
        text="We treat each and every guest here like family. You don't get that kind of experience at no fast food joint. Pick any item from our large menu and expect the best of the best. We only use halal food products, except those that are pork."
        textRight="true"
        img="\static\assets\about\amigosgrub01.jpg"
      />
      <Tab
        text="We have three bona fide Mexican locations. We take pride in our authenticity. We establish and maintain a clean and welcoming environment. Our objective is to deliver memorable, enjoyable experiences and memories!"
        textRight="false"
        img="\static\assets\about\amigos.jpeg"
      />
      <Tab
        text="You won't believe the food you eat here. When we say authentic, we're not playing around. This is Mexican like you've never had before. But don't take our word for it; come by and taste the flavors for yourself!"
        textRight="true"
        img="\static\assets\about\amigosgrub.jpg"
      />
    </div>
  );
}
