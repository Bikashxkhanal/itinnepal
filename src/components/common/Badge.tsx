import React from "react";

interface BadgeProps {
  variant?:
    | "sample"
    | "verified"
    | "government"
    | "community"
    | "private"
    | "entrance"
    | "direct"
    | "neutral";
  children: React.ReactNode;
  className?: string;
}

export function Badge({ variant = "neutral", children, className = "" }: BadgeProps) {
  let colorStyles = "bg-slate-100 text-slate-700 border-slate-300";

  switch (variant) {
    case "sample":
      colorStyles = "bg-amber-50 text-amber-800 border-amber-300 font-medium";
      break;
    case "verified":
      colorStyles = "bg-emerald-50 text-emerald-800 border-emerald-300 font-medium";
      break;
    case "government":
      colorStyles = "bg-blue-50 text-blue-800 border-blue-200";
      break;
    case "community":
      colorStyles = "bg-purple-50 text-purple-800 border-purple-200";
      break;
    case "private":
      colorStyles = "bg-slate-100 text-slate-800 border-slate-300";
      break;
    case "entrance":
      colorStyles = "bg-rose-50 text-rose-800 border-rose-200";
      break;
    case "direct":
      colorStyles = "bg-teal-50 text-teal-800 border-teal-200";
      break;
  }

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold tracking-wide ${colorStyles} ${className}`}
    >
      {children}
    </span>
  );
}
