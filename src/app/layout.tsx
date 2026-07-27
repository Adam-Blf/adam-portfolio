import type { Metadata } from "next";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";

export const metadata: Metadata = {
  title: "Adam Beloucif — Data Engineer & Développeur Fullstack IA | PIXZEN",
  description:
    "Portfolio officiel d'Adam Beloucif — Data Engineer au GHT Sud Paris (Fondation Vallée), étudiant en Mastère Data Engineering & IA à l'EFREI Paris x Université Panthéon-Assas.",
  keywords: [
    "Adam Beloucif",
    "PIXZEN",
    "Data Engineer",
    "Développeur Fullstack",
    "Agence IA",
    "PMSI ATIH",
    "Sovereign OS DIM",
    "Next.js 15",
    "EFREI",
    "Panthéon Assas",
    "Paris",
  ],
  authors: [{ name: "Adam Beloucif", url: "https://adam.beloucif.com" }],
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "Adam Beloucif — Data Engineer & Développeur Fullstack IA | PIXZEN",
    description: "Portfolio officiel d'Adam Beloucif · Data Engineering, IA Médicale & Fullstack TS.",
    url: "https://adam.beloucif.com",
    siteName: "Adam Beloucif Portfolio",
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
