import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Playfair_Display, Space_Grotesk } from "next/font/google";
import "@/styles/globals.css";

// Primary UI font — clean, modern, high readability
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Display font — bold, geometric, premium feel for headings
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

// Terminal / system font — monospace for commands and system labels
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

// Accent / signature font — limited use for signature and highlights
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-accent",
  display: "swap",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Sai Vidith — Backend & AI Engineer",
  description:
    "Portfolio of Gouribhatla Sai Vidith — Backend Engineer and AI systems builder. Explore projects, system design, and engineering philosophy.",
  keywords: [
    "Sai Vidith",
    "Backend Engineer",
    "AI Engineer",
    "Portfolio",
    "System Design",
    "Interactive Portfolio",
  ],
  authors: [{ name: "Gouribhatla Sai Vidith" }],
  creator: "Sai Vidith",
  metadataBase: new URL("https://saividith.tech"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://saividith.tech",
    siteName: "Sai Vidith — Backend & AI Engineer",
    title: "Sai Vidith — Backend & AI Engineer",
    description:
      "Explore projects, system design, and engineering philosophy.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sai Vidith — Backend & AI Engineer",
    description: "Backend & AI Engineer — projects, system design, and engineering philosophy.",
    creator: "@saividith",
  },
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`
          ${inter.variable}
          ${spaceGrotesk.variable}
          ${jetbrainsMono.variable}
          ${playfair.variable}
          font-sans bg-[#02040A] text-text-primary antialiased
        `}
      >
        {children}
      </body>
    </html>
  );
}
