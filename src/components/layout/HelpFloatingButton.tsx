"use client";

import React from "react";
import Link from "next/link";
import { MessageSquareHeart } from "lucide-react";

export function HelpFloatingButton() {
  return (
    <aside aria-label="Student Help Desk" className="fixed bottom-5 right-5 z-50">
      <Link
        href="/help"
        className="flex h-12 items-center gap-2.5 rounded-full bg-indigo-600 px-5 text-sm font-semibold text-white shadow-xl transition-all hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 active:scale-95"
      >
        <MessageSquareHeart className="h-5 w-5 animate-pulse text-amber-300" />
        <span className="font-medium tracking-tight">Need help choosing?</span>
      </Link>
    </aside>
  );
}
