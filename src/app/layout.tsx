import type { Metadata } from "next";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";

export const metadata: Metadata = {
  title: "PIXZEN — Futuristic AI Agency & Studio",
  description:
    "PIXZEN is an elite futuristic AI agency engineering next-generation autonomous systems, brand strategies, and digital experiences.",
  keywords: ["AI Agency", "Next.js 15", "Machine Learning", "Autonomous Agents", "Design System"],
  authors: [{ name: "Adam Beloucif", url: "https://github.com/Adam-Blf" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link
          rel="preconnect"
          href="https://api.fontshare.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@900,700,500,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="relative bg-[#F5F3EF] text-[#0A0A0A] selection:bg-[#0A0A0A] selection:text-[#F5F3EF]">
        {/* Global SVG Noise Overlay */}
        <div className="noise-overlay" aria-hidden="true" />
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
