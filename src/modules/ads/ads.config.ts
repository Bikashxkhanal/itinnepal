/**
 * AdSense Integration Configuration (Doc 06)
 *
 * Hard Rules:
 * - ADS_ENABLED defaults to false.
 * - Never add a real publisher ID (ca-pub-XXXXXXXXXXXXXXXX).
 * - Ads strictly forbidden on help, wizard, login, admin/staff, error, and empty pages.
 */

export const ADS_ENABLED = process.env.NEXT_PUBLIC_ADS_ENABLED === "true";

export type AdSlotKey =
  | "top_banner"
  | "in_content_1"
  | "in_content_2"
  | "sidebar_sticky"
  | "results_inline"
  | "footer_banner";

export interface AdSlotConfig {
  id: string;
  minHeight: number;
  description: string;
}

export const AD_SLOT_PRESETS: Record<AdSlotKey, AdSlotConfig> = {
  top_banner: {
    id: "top_banner",
    minHeight: 100,
    description: "Header banner on content pages (100px mobile / 120px desktop)",
  },
  in_content_1: {
    id: "in_content_1",
    minHeight: 280,
    description: "Primary in-content slot after early sections (min-height 280px)",
  },
  in_content_2: {
    id: "in_content_2",
    minHeight: 280,
    description: "Secondary in-content slot before FAQs / related content (min-height 280px)",
  },
  sidebar_sticky: {
    id: "sidebar_sticky",
    minHeight: 250,
    description: "Desktop sidebar box (300x250 min-height 250px)",
  },
  results_inline: {
    id: "results_inline",
    minHeight: 250,
    description: "Search results in-feed slot after result #6 (min-height 250px)",
  },
  footer_banner: {
    id: "footer_banner",
    minHeight: 100,
    description: "Above footer responsive banner (min-height 100px)",
  },
};

/**
 * Prohibited route prefixes where ads MUST NEVER appear (Doc 06 Section 3 & Doc 03)
 */
export const PROHIBITED_AD_PATH_PREFIXES = [
  "/help",
  "/wizard",
  "/login",
  "/auth",
  "/admin",
  "/staff",
  "/error",
  "/_not-found",
];

/**
 * Checks whether an ad is permitted on the specified URL pathname.
 */
export function isAdAllowedOnPath(pathname?: string | null): boolean {
  if (!pathname) return true;
  const cleanPath = pathname.toLowerCase().trim();

  for (const prefix of PROHIBITED_AD_PATH_PREFIXES) {
    if (cleanPath === prefix || cleanPath.startsWith(`${prefix}/`)) {
      return false;
    }
  }

  return true;
}
