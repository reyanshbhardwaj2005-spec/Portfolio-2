import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Figtree } from "next/font/google";
import "./globals.css";

const ui = Figtree({
  subsets: ["latin"],
  variable: "--font-ui",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Reyansh Bhardwaj | Samsung Galaxy S26 Ultra 3D Portfolio",
  description: "Interactive 3D portfolio of Reyansh Bhardwaj, engineered as a photorealistic Samsung Galaxy S26 Ultra with floating camera system, titanium chassis, S-Pen, and full One UI experience.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#07090e",
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={ui.variable}>
      <body>{children}</body>
    </html>
  );
}
