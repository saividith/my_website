import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sai Vidith — Backend & AI Engineer",
  description:
    "Portfolio of Gouribhatla Sai Vidith — Backend Engineer and AI systems builder. Specializing in distributed systems, LLM-powered applications, and computer vision.",
  keywords: [
    "Sai Vidith",
    "Backend Engineer",
    "AI Engineer",
    "LangChain",
    "FastAPI",
    "System Design",
    "Python",
    "Next.js",
    "Portfolio",
  ],
  authors: [{ name: "Gouribhatla Sai Vidith" }],
  creator: "Sai Vidith",
  metadataBase: new URL("https://saividith.tech"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://saividith.tech",
    siteName: "Sai Vidith — Portfolio",
    title: "Sai Vidith — Backend & AI Engineer",
    description:
      "Portfolio of Gouribhatla Sai Vidith — Backend Engineer and AI systems builder.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sai Vidith — Backend & AI Engineer",
    description:
      "Backend & AI Engineer portfolio — LangChain, FastAPI, distributed systems.",
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
      <body className={`${inter.variable} font-sans bg-bg-primary text-text-primary antialiased`}>
        <div className="grid-bg" />
        {children}
      </body>
    </html>
  );
}
