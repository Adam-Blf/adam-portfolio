import type { Metadata } from "next";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";

export const metadata: Metadata = {
  title: "PIXZEN — Adam Beloucif | Data Engineer & Fullstack AI Studio",
  description:
    "PIXZEN is an elite futuristic AI agency & portfolio by Adam Beloucif — Data Engineer at GHT Sud Paris (Fondation Vallée), EFREI Paris & Université Panthéon-Assas.",
  keywords: [
    "PIXZEN",
    "Adam Beloucif",
    "Data Engineer",
    "Fullstack Developer",
    "AI Agency",
    "PMSI ATIH",
    "Sovereign OS DIM",
    "Next.js 15",
    "EFREI",
    "Paris",
  ],
  authors: [{ name: "Adam Beloucif", url: "https://adam.beloucif.com" }],
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "PIXZEN — Adam Beloucif | Data Engineer & Fullstack AI Studio",
    description: "Elite futuristic AI agency & personal portfolio of Adam Beloucif.",
    url: "https://adam.beloucif.com",
    siteName: "PIXZEN Studio",
    locale: "fr_FR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
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
