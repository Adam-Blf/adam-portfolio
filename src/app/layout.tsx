import type { Metadata } from "next";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";

export const metadata: Metadata = {
  metadataBase: new URL("https://adam.beloucif.com"),
  title: "Adam Beloucif - Data Engineer & Développeur Fullstack",
  description:
    "Transformer la donnée en décision. Adam Beloucif, Data Engineer au DIM du GHT Psy Sud Paris, fondateur de 404 Monkey, étudiant en Mastère Data Engineering & IA à l'EFREI Paris x Université Panthéon-Assas.",
  keywords: [
    "Adam Beloucif",
    "Data Engineer",
    "Développeur Fullstack",
    "PMSI",
    "DIM",
    "Oracle PL/SQL",
    "Next.js",
    "404 Monkey",
    "EFREI",
    "Panthéon Assas",
    "alternance Data Engineer",
    "Île-de-France",
  ],
  authors: [{ name: "Adam Beloucif", url: "https://adam.beloucif.com" }],
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "Adam Beloucif - Data Engineer & Développeur Fullstack",
    description:
      "Transformer la donnée en décision. Data Engineering hospitalier, pipelines Oracle et PL/SQL, produits web Next.js.",
    url: "https://adam.beloucif.com",
    siteName: "Adam Beloucif",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Adam Beloucif - Data Engineer & Développeur Fullstack",
    description: "Transformer la donnée en décision.",
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
