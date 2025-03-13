import type { Metadata } from "next";
import { Oswald } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import StoreProvider from "./storeProvider";
import React from "react";
import { Analytics } from "@vercel/analytics/next";

const oswald = Oswald({ 
  subsets: ["latin"], 
  variable: "--font-oswald" });

export const metadata: Metadata = {
  title: "Amigos Street Tacos",
  description:
    "The best, most authentic Mexican food in the metro Detroit area!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={`${oswald.variable}`} lang="en">
      <head></head>
      <body>
        <StoreProvider>
          <Navbar />
          <div className="spacer" />
          {children}
          <Analytics />
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
