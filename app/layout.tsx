import type { Metadata } from "next";
import { Oswald } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import StoreProvider from "./storeProvider";
import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import React from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

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

  const [queryClient] = React.useState(() => new QueryClient())

  return (
    <html lang="en">
      <head></head>
      <body className={oswald.className}>
        <QueryClientProvider client={queryClient}>
          <StoreProvider>
            <Navbar />
            <div className="spacer" />
            {children}
            <Footer />
          </StoreProvider>
          <ReactQueryDevtools/>
        </QueryClientProvider>
      </body>
    </html>
  );
}
