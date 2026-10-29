# 03 – Things NOT To Do (Anti-Patterns and Red Lines)

## 1. Data and Content

| Don't                                                                                         | Why                                                        | Do instead                                                             |
| --------------------------------------------------------------------------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------------------- |
| Publish fees, cutoffs or placement stats without a source/date                                | Misleads students; destroys trust                          | Show source + verified date                                            |
| Copy text, images or data wholesale from Edusanjal, College Info Nepal, HamroCSIT or any site | Copyright, terms-of-service and SEO duplicate-content risk | Write original content; use official sources; get permission           |
| Scrape sites that forbid it or ignore `robots.txt`                                            | Legal and ethical risk; IP blocking                        | Check terms; prefer official/open data and college submissions         |
| Use college marketing claims ("100% placement") as fact                                       | Unverifiable                                               | Label as "claimed by college" or show tracer-study data                |
| Show a single fee number with no breakdown                                                    | Hidden costs surprise families                             | Show line items and total                                              |
| Leave pages with "No Data" or empty sections                                                  | Poor UX, thin content, SEO harm                            | Hide empty sections or show "Info not yet available – Ask the college" |
| Mix ads or sponsored listings into rankings                                                   | Deceptive                                                  | Keep ranking organic; label sponsored clearly                          |
| Fake reviews, fake ratings or paid reviews                                                    | Legal and trust damage                                     | Verified-user reviews, moderation                                      |
| Publish students' photos or personal data without consent                                     | Privacy violation                                          | Consent and moderation                                                 |

## 2. AdSense and Ads

| Don't                                                                                                                  | Why                              |
| ---------------------------------------------------------------------------------------------------------------------- | -------------------------------- |
| Click your own ads or ask others to                                                                                    | Leads to account ban             |
| Place ads on pages with little or no original content (empty listings, search-result shells, error pages, login pages) | Policy violation risk **VERIFY** |
| Encourage clicks ("Click here", arrows pointing to ads)                                                                | Prohibited                       |
| Place ads so close to buttons/links that they cause accidental clicks                                                  | Policy violation, poor UX        |
| Use pop-ups, interstitials that block content on arrival, or auto-playing sound                                        | UX and policy problems           |
| Modify AdSense code or hide ads' labels                                                                                | Policy violation                 |
| Show ads in the help form, admin pages or consent flow                                                                 | Distracting and risky            |
| Let ads shift layout (no reserved height)                                                                              | Fails Core Web Vitals (CLS)      |
| Run ads before cookie/consent requirements are met where legally required                                              | Compliance risk **VERIFY**       |
| Put more ads than content above the fold                                                                               | Poor experience                  |

## 3. SEO

- Don't generate thousands of thin, auto-created pages with identical text.
- Don't keyword-stuff titles, headings or footers.
- Don't hide text or links for search engines.
- Don't use duplicate titles/meta descriptions across pages.
- Don't block CSS/JS in `robots.txt`.
- Don't render critical content only client-side.
- Don't change URLs without 301 redirects.
- Don't buy links or run link schemes.
- Don't let filter/sort combinations create unlimited indexable URLs (use canonical + `noindex` for low-value combinations).

## 4. Engineering

- Don't ship without tests for core logic (fees, search, filters, auth).
- Don't hard-code secrets or API keys; don't commit `.env` files.
- Don't edit production data or schema manually; use migrations and audited admin tools.
- Don't trust client input; validate on the server.
- Don't build microservices on day one; start with a modular monolith.
- Don't block rendering with third-party scripts (analytics, ads, chat).
- Don't store raw OTPs/passwords or log personal data.
- Don't ignore dependency updates and security advisories.
- Don't deploy on Fridays without rollback readiness.
- Don't over-engineer the first release; skip features that are not in the Must list.

## 5. UX

- Don't force sign-up to view basic college information.
- Don't hide the help option or bury it in the footer only.
- Don't use jargon without explanation.
- Don't use tiny tap targets or low contrast text.
- Don't auto-play videos with sound or full-screen overlays.
- Don't use dark patterns (fake urgency such as "3 seats left!" without proof).
- Don't make the compare feature require login.
- Don't rely on colour alone to convey meaning.

## 6. Student Help and Ethics

- Don't push students toward paying colleges because they pay; disclose commercial relationships.
- Don't promise admission, scholarships or placement.
- Don't share a student's phone number with multiple colleges without explicit consent.
- Don't spam students with calls or messages after the request is resolved.
- Don't give medical, legal or immigration advice outside your expertise.
- Don't store sensitive documents (citizenship, mark sheets) unless truly needed, with encryption and retention limits.

## 7. Business and Legal

- Don't launch without Privacy Policy, Terms, Cookie Policy and a Disclaimer ("fees and dates are indicative; confirm with the college").
- Don't claim to be an official government or university portal.
- Don't use college logos in ways that imply endorsement without permission.
- Don't ignore takedown requests; respond within a defined time.
- Don't depend on a single revenue source (AdSense) long term; plan sponsored profiles and services.

## 8. Quick Red-Flag Review Before Merging or Publishing

1. Does this page have original, useful content?
2. Does every number show a source and date?
3. Could an ad or banner cause accidental clicks or layout shift?
4. Is any personal data exposed without consent?
5. Is any copied content or image used without permission?
6. Is a sponsored element clearly labelled?
