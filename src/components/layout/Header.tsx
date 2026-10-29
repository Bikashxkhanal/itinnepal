"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GraduationCap, Menu, X, HelpCircle, GitCompare, Globe } from "lucide-react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [locale, setLocale] = useState<"en" | "ne">("en");
  const pathname = usePathname();

  const toggleLanguage = () => {
    setLocale((prev) => (prev === "en" ? "ne" : "en"));
  };

  const navLinks = [
    { label: locale === "en" ? "Colleges" : "कलेजहरू", href: "/colleges" },
    { label: locale === "en" ? "Programs" : "कार्यक्रमहरू", href: "/programs" },
    { label: locale === "en" ? "Compare" : "तुलना", href: "/compare" },
    {
      label: locale === "en" ? "Entrance Guide" : "प्रवेश परीक्षा",
      href: "/entrance/tu-iost-csit-entrance",
    },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm">
            <GraduationCap className="h-6 w-6" />
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight text-slate-900">
              ITin<span className="text-indigo-600">Nepal</span>
            </span>
            <span className="ml-1.5 rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-bold text-amber-800">
              SAMPLE
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:items-center md:gap-7">
          {navLinks.map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  isActive ? "font-semibold text-indigo-600" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions: Lang Switch + Need Help CTA */}
        <div className="hidden md:flex md:items-center md:gap-3">
          <button
            type="button"
            onClick={toggleLanguage}
            className="flex h-10 items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50"
            title="Toggle English / Nepali"
          >
            <Globe className="h-4 w-4 text-slate-500" />
            <span>{locale === "en" ? "नेपाली" : "English"}</span>
          </button>

          <Link
            href="/help"
            className="flex h-10 items-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700"
          >
            <HelpCircle className="h-4 w-4" />
            <span>{locale === "en" ? "Need Help?" : "सहयोग चाहियो?"}</span>
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={toggleLanguage}
            className="p-2 text-xs font-semibold text-slate-700"
            aria-label="Change language"
          >
            {locale === "en" ? "नेपाली" : "EN"}
          </button>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-slate-700 hover:bg-slate-100"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle main menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="border-b border-slate-200 bg-white px-4 pb-6 pt-3 md:hidden">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex h-11 items-center rounded-lg px-3 text-base font-medium text-slate-700 hover:bg-slate-50"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/compare"
              onClick={() => setMobileMenuOpen(false)}
              className="flex h-11 items-center gap-2 rounded-lg px-3 text-base font-medium text-slate-700 hover:bg-slate-50"
            >
              <GitCompare className="h-4 w-4 text-indigo-600" />
              <span>{locale === "en" ? "Compare Colleges" : "कलेज तुलना"}</span>
            </Link>
            <Link
              href="/help"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 flex h-12 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 text-base font-semibold text-white shadow"
            >
              <HelpCircle className="h-5 w-5" />
              <span>{locale === "en" ? "Need Help Choosing?" : "कलेज रोज्न सहयोग चाहियो?"}</span>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
