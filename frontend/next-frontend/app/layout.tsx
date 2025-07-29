import React, { ReactNode } from "react";
import { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "@/styles/globals.css";

const metadeta: Metadata = {
  title: "Next-FrontEnd",
  description: "My Tasks Project with Next.js Framework",
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <body className="font-sans flex flex-col text-base main-app-bg-grediant">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
