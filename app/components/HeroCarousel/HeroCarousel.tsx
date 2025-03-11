"use client";

import React, { useEffect, useRef, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import { gsap } from "gsap";
import styles from "./HeroCarousel.module.css";
import Image from "next/image";

/**
 * Hook to detect if we're on a mobile-sized screen.
 */
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    setIsMobile(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return isMobile;
}

interface CarouselImage {
  desktopSrc: string;
  mobileSrc: string;
  alt: string;
  caption: string;
}

const carouselImages: CarouselImage[] = [
  {
    desktopSrc: "/static/assets/slideshow/tacoplatter.jpg",
    mobileSrc: "/static/assets/slideshow/tacoplatter.jpg",
    alt: "Delicious Tacos",
    caption: "Delicious Tacos",
  },
  {
    desktopSrc: "/static/assets/slideshow/ingredients.jpg",
    mobileSrc: "/static/assets/slideshow/ingredients.jpg",
    alt: "Fresh Ingredients",
    caption: "Fresh Ingredients",
  },
  {
    desktopSrc: "/static/assets/slideshow/interior.jpg",
    mobileSrc: "/static/assets/slideshow/interior.jpg",
    alt: "Clean Locations",
    caption: "Clean Locations",
  },
  {
    desktopSrc: "/static/assets/slideshow/beanplatter.jpg",
    mobileSrc: "/static/assets/slideshow/beanplatter.jpg",
    alt: "Authentic Cuisine",
    caption: "Authentic Cuisine",
  },
  {
    desktopSrc: "/static/assets/home/amigosSaintClair.jpg",
    mobileSrc: "/static/assets/home/amigosSaintClair.jpg",
    alt: "Use code AMIGOS10 for 10% off!",
    caption: "Use code AMIGOS10 for 10% off!",
  },
];

function HeroCarousel() {
  const isMobile = useIsMobile();

  const heroRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const leftCurtainRef = useRef<HTMLDivElement>(null);
  const centerCurtainRef = useRef<HTMLDivElement>(null);
  const rightCurtainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeline = gsap.timeline();

    gsap.set(
      [leftCurtainRef.current, centerCurtainRef.current, rightCurtainRef.current],
      { x: 0, opacity: 1 }
    );

    timeline
      .to(leftCurtainRef.current, {
        x: "-100%",
        duration: 0.3,
        ease: "power2.out",
      }, 0)
      .to(centerCurtainRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.out",
      }, 0.2)
      .to(rightCurtainRef.current, {
        x: "100%",
        duration: 0.3,
        ease: "power2.out",
      }, 0.4)
      .fromTo(
        carouselRef.current,
        { opacity: 0, scale: 0.98 },
        { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" },
        0.5
      );

    return () => {
      timeline.kill();
    };
  }, []);

  return (
    <div ref={heroRef} className={styles.heroContainer}>
      <div ref={leftCurtainRef} className={styles.curtainLeft}></div>
      <div ref={centerCurtainRef} className={styles.curtainCenter}></div>
      <div ref={rightCurtainRef} className={styles.curtainRight}></div>

      <div ref={carouselRef} className={styles.carouselContainer}>
        <Carousel
          controls={true}
          indicators={true}
          touch={true}
          interval={3000}
          className={styles.carousel}
        >
          {carouselImages.map((image, index) => (
            <Carousel.Item key={index} className={styles.carouselItem}>
              <div className={styles.imageWrapper}>
                <Image
                  className={styles.carouselImage}
                  src={isMobile ? image.mobileSrc : image.desktopSrc}
                  alt={image.alt}
                  fill
                  priority
                />
              </div>
              <Carousel.Caption className={styles.carouselCaption}>
                <h3>{image.caption}</h3>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </div>
  );
}

export default HeroCarousel;
