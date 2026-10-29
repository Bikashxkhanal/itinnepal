# 02 – Things To Do (Mandatory Practices)

Use this as a checklist during design, development, content entry and launch.

## 1. Product and Data

- [ ] Show a **source** and **"Last verified on"** date next to every fee, seat count, cutoff and placement figure.
- [ ] Separate **verified** (confirmed by ITinNepal or the college) from **unverified** data with a visible badge.
- [ ] Store fees as structured line items (admission, per-semester, lab, exam, other) and compute the total instead of typing one lump number.
- [ ] Record the **academic year** for every statistic so old numbers never look current.
- [ ] Prefer official sources: TU IOST, Kathmandu University, Pokhara University, Purbanchal University, CTEVT, NEB, UGC Nepal, and the college's official site.
- [ ] Offer colleges a **claim-and-update** workflow, then re-verify yearly.
- [ ] Explain _how_ ranking works (published formula) and keep sponsored items separate.
- [ ] Capture **entrance exam** details for every program: required or not, exam body, syllabus, dates, cutoff history.
- [ ] Add a clear **"No entrance – direct merit/interview"** statement where applicable.
- [ ] Keep a changelog and audit trail of all edits.

## 2. Photos and Media

- [ ] Require at least 5 categorised photos for a "complete" profile (campus, lab, library, classroom, facility).
- [ ] Add alt text and captions.
- [ ] Use image optimisation (WebP/AVIF, responsive sizes, lazy-load, blur placeholders).
- [ ] Get written permission or licence for every college image; keep a record.
- [ ] Moderate student-uploaded photos (no faces of minors without consent, no offensive content).

## 3. User Experience

- [ ] Design mobile-first; test on low-end Android devices.
- [ ] Provide English and Nepali labels; keep language switch visible.
- [ ] Keep core flows short: search → profile → fees → compare → help.
- [ ] Provide the **"Need help?"** option on every page (see doc 09).
- [ ] Use plain language; explain terms like _affiliation_, _merit list_, _cutoff_.
- [ ] Show empty states with next steps instead of "No Data".
- [ ] Show loading skeletons and clear error messages.
- [ ] Follow accessibility: contrast ≥ 4.5:1, focus states, keyboard navigation, labelled forms.

## 4. SEO

- [ ] Use SSR/ISR for all public pages.
- [ ] One unique title, meta description and H1 per page.
- [ ] Add structured data (`CollegeOrUniversity`, `EducationalOccupationalProgram`, `FAQPage`, `BreadcrumbList`).
- [ ] Generate XML sitemaps and keep `robots.txt` accurate.
- [ ] Use clean, stable URLs (`/colleges/<slug>`, `/programs/bsc-csit`).
- [ ] Maintain internal links between college, program, district and guide pages.

## 5. Ads (AdSense)

- [ ] Reserve ad space with fixed dimensions to avoid layout shift.
- [ ] Label ad areas "Advertisement".
- [ ] Load ads after consent and after main content (lazy).
- [ ] Publish `ads.txt`.
- [ ] Keep original, useful content on every page that shows ads.
- [ ] Monitor policy centre and ad performance weekly.

## 6. Engineering

- [ ] Use TypeScript, linting, formatting and pre-commit hooks.
- [ ] Use environment-based configuration; secrets in a vault/secret manager.
- [ ] Add automated tests: unit, API integration, a few end-to-end journeys.
- [ ] Use CI/CD with preview deployments for each pull request.
- [ ] Use database migrations; never edit production schema by hand.
- [ ] Rate limit forms, search and login endpoints; add CAPTCHA to abuse-prone forms.
- [ ] Add monitoring: uptime, errors, performance (Core Web Vitals RUM).
- [ ] Back up data daily; test restores quarterly.
- [ ] Document APIs with OpenAPI and keep an architecture decision log.

## 7. Security and Privacy

- [ ] Hash passwords with Argon2/bcrypt; prefer passwordless OTP/OAuth.
- [ ] Enforce HTTPS, HSTS, CSP, secure cookies, SameSite.
- [ ] Validate and sanitise all inputs (server-side).
- [ ] Apply least-privilege roles; require 2FA for admins and college admins.
- [ ] Ask consent before sharing a student's contact details with a college.
- [ ] Provide a privacy policy, terms of use, cookie policy and data deletion route.
- [ ] Log admin actions and review them.

## 8. Student Help and Support

- [ ] Respond to help requests within the SLA (first reply ≤ 24 h).
- [ ] Give unbiased advice; disclose any sponsorship.
- [ ] Offer phone, WhatsApp/Viber and form channels.
- [ ] Track status and follow up; ask for feedback.

## 9. Launch Checklist

- [ ] Data for at least 100 verified IT colleges/programs (or target coverage by district).
- [ ] Lighthouse: Performance ≥ 85 mobile, Accessibility ≥ 95, SEO ≥ 95.
- [ ] Legal pages live (Privacy, Terms, Cookie, Disclaimer, About, Contact).
- [ ] Search Console and Analytics configured; sitemap submitted.
- [ ] AdSense site approved **before** serious ad rollout **VERIFY**.
- [ ] Backups, monitoring and on-call contacts ready.
- [ ] Rollback plan tested.
