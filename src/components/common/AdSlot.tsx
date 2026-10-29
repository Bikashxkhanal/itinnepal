"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { ADS_ENABLED, AD_SLOT_PRESETS, isAdAllowedOnPath } from "@/modules/ads/ads.config";

export interface AdSlotProps {
  slotId:
    | "top_banner"
    | "in_content_1"
    | "in_content_2"
    | "sidebar_sticky"
    | "results_inline"
    | "footer_banner"
    | string;
  minHeight?: number;
  className?: string;
  path?: string;
  isEmptyContent?: boolean;
  showPlaceholder?: boolean;
}

/**
 * Consent-aware, CLS-safe AdSlot component (Doc 06 & Doc 03)
 *
 * Rules:
 * - Always reserves min-height container to protect Core Web Vitals (CLS <= 0.1).
 * - Labelled visibly with "Advertisement" and accessible aria-label="Advertisement".
 * - Respects ADS_ENABLED flag (defaults to false).
 * - Never renders on help, wizard, login, admin, staff, error, or empty pages.
 * - Renders neutral grey placeholder boxes only; NO real publisher IDs or ad scripts.
 * - Enforces minimum 16px spacing from adjacent interactive elements.
 */
export function AdSlot({
  slotId,
  minHeight,
  className = "",
  path,
  isEmptyContent = false,
  showPlaceholder = true,
}: AdSlotProps) {
  const currentPathname = usePathname();
  const effectivePath = path !== undefined ? path : currentPathname;

  // 1. Prohibited page safety check
  if (!isAdAllowedOnPath(effectivePath) || isEmptyContent) {
    return null;
  }

  const preset = AD_SLOT_PRESETS[slotId as keyof typeof AD_SLOT_PRESETS];
  const reservedHeight = minHeight ?? preset?.minHeight ?? 100;

  // 2. When ads are globally disabled and preview placeholder is not requested
  if (!ADS_ENABLED && !showPlaceholder) {
    return (
      <div
        aria-hidden="true"
        style={{ minHeight: `${reservedHeight}px` }}
        className="pointer-events-none opacity-0"
      />
    );
  }

  // 3. Render policy-compliant grey placeholder box
  return (
    <aside
      aria-label="Advertisement"
      className={`my-6 w-full text-center ${className}`}
      style={{ minHeight: `${reservedHeight}px` }}
    >
      <div className="mb-1.5 flex select-none items-center justify-center gap-1.5">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
          Advertisement
        </span>
      </div>

      <div
        style={{ minHeight: `${reservedHeight - 24}px` }}
        className="flex w-full flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50/90 p-4 text-slate-400 transition-colors"
      >
        <span className="font-mono text-xs font-semibold text-slate-500">
          [ Ad Slot: {slotId} ]
        </span>
        <span className="mt-1 text-[11px] text-slate-400">
          Reserved min-height {reservedHeight}px · Grey placeholder box only
        </span>
        <span className="mt-0.5 text-[10px] text-slate-400/80">
          ADS_ENABLED={String(ADS_ENABLED)} · Zero tracker scripts
        </span>
      </div>
    </aside>
  );
}
