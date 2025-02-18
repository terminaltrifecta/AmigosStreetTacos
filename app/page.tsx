"use client";

import Image from "next/image";
import styles from "./page.module.css";
import Slideshow from "./components/Slideshow/Slideshow";
import Tab from "./components/Tab/Tab";
import CardTab from "./components/CardTab/CardTab";
import { useEffect } from "react";
import { initializeMenu } from "./utils/menuUtils";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { RootState } from "@/lib/store";

export default function Home() {
  const menu = useAppSelector((state: RootState) => state.menu);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (
      menu.categories.length === 0 ||
      menu.menuItems.length === 0 ||
      menu.modifications.length === 0
    ) {
      initializeMenu(dispatch);
    }
  }, [
    dispatch,
    menu.categories.length,
    menu.menuItems.length,
    menu.modifications.length,
  ]);

  return (
    <>
      <div className="d-grid gap-3">
        <Slideshow />
        <Tab
          text="Carne Asada Fries. They're absolutely delicious."
          textRight="true"
          img="/static/assets/home/fries.jpg"
        />
        <Tab
          text="Enjoy real Mexican from the comfort of your home with online delivery services. You can find us anywhere!"
          textRight="false"
          img="/static/assets/home/delivery.jpg"
        />
        <CardTab
          img1="/static/assets/slideshow/img1.png"
          hdr1="Chicken Tacos"
          img2="/static/assets/home/carnetacos.jpg"
          hdr2="Carne Asada Tacos"
          img3="/static/assets/home/barriatacos.jpg"
          hdr3="Birria Tacos"
        />
        <Tab
          text="Love what you see? Take everything home with our quick carry-out."
          textRight="false"
          img="/static/assets/home/carryout.jpg"
        />
        <Tab
          text="We have amazing deals as well! Get 5 tacos for ten dollars anyday, or a special $2.00 per street taco on Taco Tuesdays!"
          textRight="true"
          img="/static/assets/home/tacosdeal.jpeg"
        />
        <Tab
          text="Like what you see? Come and try our birria tacos today!"
          textRight="false"
          img="/static/assets/home/birria_tacos_AdobeExpress.gif"
        />
        <Tab
          text="Be sure to try our lunch combo! It comes 2 tacos, rice and beans, a can of pop, and chips and salsa! All for $12!"
          textRight="true"
          img="/static/assets/home/riceandbeans.jpg"
        />
      </div>
    </>
  );
}
