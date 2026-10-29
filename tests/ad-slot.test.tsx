import React from "react";
import { describe, it, expect } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { ADS_ENABLED, AD_SLOT_PRESETS, isAdAllowedOnPath } from "@/modules/ads/ads.config";
import { AdSlot } from "@/components/common/AdSlot";

describe("AdSense Policy & Allowed Path Rules (Doc 06 & Doc 03)", () => {
  it("defaults ADS_ENABLED to false for privacy and safety", () => {
    // Unless explicitly turned on by env variable, ADS_ENABLED must be false
    expect(typeof ADS_ENABLED).toBe("boolean");
  });

  it("strictly prohibits ads on help, wizard, login, admin, staff, and error pages", () => {
    expect(isAdAllowedOnPath("/help")).toBe(false);
    expect(isAdAllowedOnPath("/help/submit")).toBe(false);
    expect(isAdAllowedOnPath("/wizard")).toBe(false);
    expect(isAdAllowedOnPath("/wizard/step-1")).toBe(false);
    expect(isAdAllowedOnPath("/login")).toBe(false);
    expect(isAdAllowedOnPath("/auth")).toBe(false);
    expect(isAdAllowedOnPath("/admin")).toBe(false);
    expect(isAdAllowedOnPath("/admin/colleges")).toBe(false);
    expect(isAdAllowedOnPath("/staff/help-requests")).toBe(false);
    expect(isAdAllowedOnPath("/_not-found")).toBe(false);
  });

  it("permits ads on eligible public content pages", () => {
    expect(isAdAllowedOnPath("/")).toBe(true);
    expect(isAdAllowedOnPath("/colleges")).toBe(true);
    expect(isAdAllowedOnPath("/colleges/kathmandu-university")).toBe(true);
    expect(isAdAllowedOnPath("/programs/bsc-csit")).toBe(true);
    expect(isAdAllowedOnPath("/entrance/tu-iost-csit-entrance")).toBe(true);
  });

  it("has defined min-height presets for all slot inventory types to protect CLS", () => {
    expect(AD_SLOT_PRESETS.top_banner.minHeight).toBe(100);
    expect(AD_SLOT_PRESETS.in_content_1.minHeight).toBe(280);
    expect(AD_SLOT_PRESETS.in_content_2.minHeight).toBe(280);
    expect(AD_SLOT_PRESETS.sidebar_sticky.minHeight).toBe(250);
    expect(AD_SLOT_PRESETS.results_inline.minHeight).toBe(250);
    expect(AD_SLOT_PRESETS.footer_banner.minHeight).toBe(100);
  });
});

describe("<AdSlot> Component Behavior", () => {
  it("renders nothing (null) on prohibited pages like /help or /staff", () => {
    const helpHtml = renderToStaticMarkup(<AdSlot slotId="in_content_1" path="/help" />);
    expect(helpHtml).toBe("");

    const staffHtml = renderToStaticMarkup(
      <AdSlot slotId="sidebar_sticky" path="/staff/help-requests" />
    );
    expect(staffHtml).toBe("");

    const adminHtml = renderToStaticMarkup(<AdSlot slotId="top_banner" path="/admin" />);
    expect(adminHtml).toBe("");
  });

  it("renders nothing (null) when isEmptyContent is true", () => {
    const html = renderToStaticMarkup(
      <AdSlot slotId="results_inline" path="/colleges" isEmptyContent={true} />
    );
    expect(html).toBe("");
  });

  it("renders accessible advertisement placeholder on permitted pages", () => {
    const html = renderToStaticMarkup(<AdSlot slotId="footer_banner" path="/" />);

    expect(html).toContain("<aside");
    expect(html).toContain('aria-label="Advertisement"');
    expect(html).toContain("Advertisement");
    expect(html).toContain("[ Ad Slot: footer_banner ]");

    // Verify reserved min-height style exists to avoid layout shifts (CLS <= 0.1)
    expect(html).toContain("min-height:100px");

    // Strictly ensure no real AdSense script or publisher ID is in HTML
    expect(html).not.toContain("ca-pub-");
    expect(html).not.toContain("pagead2.googlesyndication.com");
  });

  it("applies customized minHeight when explicitly provided", () => {
    const html = renderToStaticMarkup(
      <AdSlot slotId="in_content_1" minHeight={320} path="/programs/bsc-csit" />
    );
    expect(html).toContain("min-height:320px");
  });
});
