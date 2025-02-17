import type { Metadata } from "next";
import { Oswald } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import StoreProvider from "./storeProvider";
import React from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import QueryProvider from "./providers";
import { Analytics } from '@vercel/analytics/next';

const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald" });

export const metadata: Metadata = {
  title: "Amigos Street Tacos",
  description: "The home of tacos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <head></head>
      <body className={oswald.className}>
        <QueryProvider>
          <StoreProvider>
            <Navbar />
            <div className="spacer" />
            {children}
            <Analytics />
            <Footer />
          </StoreProvider>
          <ReactQueryDevtools/>
        </QueryProvider>
      </body>
    </html>
  );
}
