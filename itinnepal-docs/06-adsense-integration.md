# 06 – Google AdSense Integration

> **VERIFY:** Google AdSense policies, eligibility (including country and payment support for Nepal), consent requirements and ad-unit options change. Confirm everything in the AdSense Help Center and Program Policies before launch. This document describes the _design_; it is not legal advice.

## 1. Goals

1. Earn revenue without harming student experience or trust.
2. Keep Core Web Vitals healthy (especially **CLS** and **LCP**).
3. Stay fully policy compliant.
4. Keep ads **visibly separate** from rankings, fees and help content.

## 2. Prerequisites Before Applying

| Item                                                                          | Status check |
| ----------------------------------------------------------------------------- | ------------ |
| Own domain (e.g. itinnepal.com), HTTPS                                        | ☐            |
| 30–50+ original, useful pages (guides, program explainers, verified profiles) | ☐            |
| Privacy Policy, Terms, Cookie Policy, About, Contact, Disclaimer              | ☐            |
| Clear navigation, no "under construction" pages                               | ☐            |
| Original text and licensed images only                                        | ☐            |
| Site indexed in Google (Search Console verified)                              | ☐            |
| Consent management for regions that require it **VERIFY**                     | ☐            |
| Applicant is an adult with a valid payment/tax setup **VERIFY**               | ☐            |

## 3. Where Ads Are Allowed and Not Allowed

| Page type                                                                                    | Ads?                              | Notes                                                                           |
| -------------------------------------------------------------------------------------------- | --------------------------------- | ------------------------------------------------------------------------------- |
| Home                                                                                         | Limited (1)                       | Below main search and popular sections                                          |
| Program pages / guides / blog                                                                | Yes (2–3)                         | In-content and sidebar                                                          |
| College profile                                                                              | Yes (2)                           | Never inside the fee table, between data rows, or next to Apply/Contact buttons |
| Search results                                                                               | Limited (1 between result groups) | Only when results exist; never mimic result cards                               |
| District / university hubs                                                                   | Yes (1–2)                         | Must have original intro text                                                   |
| Compare page                                                                                 | Limited (1)                       | Not inside the comparison table                                                 |
| **Help request form, wizard, login, account, admin, consent, error pages, empty/thin pages** | **No**                            | UX and policy safety                                                            |

## 4. Ad Slot Inventory

| Slot ID          | Location                      | Device            | Format                | Reserved size                             |
| ---------------- | ----------------------------- | ----------------- | --------------------- | ----------------------------------------- |
| `top_banner`     | Below header on content pages | All               | Responsive display    | min-height 100 px mobile / 120 px desktop |
| `in_content_1`   | After 2nd content section     | All               | In-article/responsive | min-height 280 px                         |
| `in_content_2`   | Before FAQ/related section    | All               | Responsive            | min-height 280 px                         |
| `sidebar_sticky` | Right column                  | Desktop ≥ 1024 px | 300×250 / 300×600     | fixed 300×250                             |
| `results_inline` | After result #6 on search     | All               | Responsive            | min-height 250 px                         |
| `footer_banner`  | Above footer                  | All               | Responsive            | min-height 100 px                         |

Rules: no more than **3 ad units visible per viewport on mobile**; content must dominate the first screen; sticky ads should not cover content or controls.

## 5. Implementation Design

### 5.1 `<AdSlot>` Component

```tsx
// components/AdSlot.tsx  (conceptual)
type Props = { slotId: string; minHeight: number; format?: "auto" | "rectangle" };

export function AdSlot({ slotId, minHeight, format = "auto" }: Props) {
  const consent = useConsent(); // from consent manager
  const visible = useInViewport(ref); // lazy: load when near viewport
  if (!ADS_ENABLED || !consent.ads) return <div style={{ minHeight }} aria-hidden />;

  return (
    <aside aria-label="Advertisement" style={{ minHeight }} className="ad-wrapper">
      <small className="ad-label">Advertisement</small>
      {visible && (
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
          data-ad-slot={SLOT_MAP[slotId]}
          data-ad-format={format}
          data-full-width-responsive="true"
        />
      )}
    </aside>
  );
}
```

### 5.2 Script Loading

- Load the AdSense script **asynchronously, after consent and after the main content is interactive** (e.g. `requestIdleCallback` or on first scroll).
- Use one global script load; push ad units individually.
- Wrap in an error boundary so ad failures never break pages.
- Respect a global `ADS_ENABLED` flag and per-slot toggles in the admin console.

### 5.3 `ads.txt`

Serve `/ads.txt` at the domain root:

```
google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0
```

Replace with your real publisher ID from AdSense.

### 5.4 Content Security Policy

Allow only the required Google ad domains in `script-src`, `frame-src`, `img-src`, `connect-src`. Keep a separate CSP profile for pages where ads are disabled (admin, help form). **VERIFY** current domain list in Google documentation.

### 5.5 Consent

- Show a clear consent banner (accept / reject / manage).
- Do not request personalised ads until consent where required **VERIFY** (EEA/UK/other regions).
- Store consent state; allow users to change it from the footer ("Cookie settings").
- Use Google-certified CMP if serving in regions that require it.

## 6. Layout Patterns

```
┌──────────────────────────────┐
│ Header + Search              │
├──────────────────────────────┤
│ [Ad: top_banner (reserved)]  │  ← optional on content pages
├────────────────────┬─────────┤
│ Main content       │ Sidebar │
│ Section 1          │ Filters │
│ Section 2          │ [Ad]    │  ← desktop only
│ [Ad: in_content_1] │ Help CTA│
│ Section 3          │         │
│ FAQ                │         │
│ [Ad: in_content_2] │         │
├────────────────────┴─────────┤
│ Related colleges / guides    │
│ Footer                       │
└──────────────────────────────┘
```

Design rules:

- Keep **at least 16 px spacing** between ads and links/buttons.
- Label ads "Advertisement"; never style ads like content cards.
- The **"Need help?"** button stays ad-free and visually distinct.
- Don't place ads between a fee label and its value, or between compare columns.

## 7. Performance Safeguards

| Risk                    | Safeguard                                                                                     |
| ----------------------- | --------------------------------------------------------------------------------------------- |
| CLS from late ads       | Fixed `min-height` containers; no collapsing without animation                                |
| LCP delay               | Never put an ad above the LCP element; load ads after LCP                                     |
| INP/jank                | Defer ad scripts; limit refresh; avoid heavy sticky behaviour                                 |
| Slow pages on 3G        | Disable below-the-fold ads on very slow connections (Network Information API where available) |
| Layout break on adblock | Collapse placeholders gracefully after timeout; keep content usable                           |
| Third-party failures    | Timeouts and error boundaries                                                                 |

Targets with ads enabled: **LCP ≤ 2.5 s, CLS ≤ 0.1, INP ≤ 200 ms** (mobile p75).

## 8. Policy Compliance Checklist

- ☐ No clicks on own ads; no incentives for clicks.
- ☐ No ads on pages without substantial original content.
- ☐ Ads clearly distinguishable from content.
- ☐ No deceptive placement (near download/submit buttons, in navigation).
- ☐ No prohibited content next to ads (follow AdSense content policies) **VERIFY**.
- ☐ User-generated content (reviews, uploads) moderated before ads display on those pages.
- ☐ Sponsored college listings labelled "Sponsored" and **not** confused with AdSense ads.
- ☐ Privacy policy discloses Google ad cookies and how to opt out.
- ☐ Review the AdSense Policy Center weekly and fix flagged pages quickly.

## 9. Monetisation Beyond AdSense

| Option                              | Notes                               |
| ----------------------------------- | ----------------------------------- |
| Sponsored/featured college profiles | Clear label, not in organic ranking |
| Premium profile packages            | More media, analytics, lead inbox   |
| Lead-generation (with consent)      | Only with explicit student consent  |
| Entrance-prep partnerships          | Disclose affiliations               |
| Newsletter sponsorship              | Labelled and relevant               |

## 10. Measurement and Optimisation

| Metric                                                    | Review cadence |
| --------------------------------------------------------- | -------------- |
| Page RPM, CTR, viewability, active-view                   | Weekly         |
| Revenue by page type                                      | Weekly         |
| CWV before/after ad changes                               | Each change    |
| User metrics (bounce, time, help-requests) vs. ad density | Monthly        |
| Policy centre alerts                                      | Weekly         |

Run controlled experiments (A/B) on one change at a time: slot position, count, format. Roll back if help-requests, engagement or CWV decline.

## 11. Launch Plan for Ads

1. Build and test `AdSlot` with **placeholder boxes** (no real ads).
2. Complete legal pages and consent.
3. Apply to AdSense; wait for approval.
4. Enable on a few templates (guides, program pages).
5. Review CWV and policy dashboard for one week.
6. Expand to other eligible templates.
7. Keep a kill switch for all ads.
