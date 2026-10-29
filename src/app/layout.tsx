import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HelpFloatingButton } from "@/components/layout/HelpFloatingButton";

export const metadata: Metadata = {
  metadataBase: new URL("https://itinnepal.com"),
  title: {
    default: "ITinNepal – Discover & Compare IT Colleges in Nepal",
    template: "%s | ITinNepal",
  },
  description:
    "Discover, compare, and choose IT colleges and degrees in Nepal (BSc CSIT, BIT, BCA, BE Computer). Transparent fees, entrance guides, and human counselling.",
  openGraph: {
    title: "ITinNepal – Discover & Compare IT Colleges in Nepal",
    description:
      "Verified fees, entrance exam syllabus, and college comparison for students in Nepal.",
    url: "https://itinnepal.com",
    siteName: "ITinNepal",
    locale: "en_NP",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-slate-50 text-slate-900 antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-indigo-600 focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        <HelpFloatingButton />
      </body>
    </html>
  );
}
