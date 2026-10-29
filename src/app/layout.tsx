import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "ITinNepal – Discover & Compare IT Colleges in Nepal",
  description:
    "Find and compare IT colleges, programs, fee structures, entrance exams, and verified statistics in Nepal.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
