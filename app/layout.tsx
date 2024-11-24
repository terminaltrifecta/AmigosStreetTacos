import type { Metadata } from "next";
import { Oswald } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import StoreProvider from "./storeProvider";

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
          <StoreProvider>
            <Navbar />
            <div className="spacer"/>
            {children}
            <Footer />
          </StoreProvider>
      </body>
    </html>
  );
}
