# 05 – Step-by-Step Development Roadmap

Indicative timeline for a small team (2–3 developers, 1 designer, 1 data/content lead, 1 part-time counsellor). Adjust to your capacity.

| Phase | Name       | Duration   | Outcome                                                                        |
| ----- | ---------- | ---------- | ------------------------------------------------------------------------------ |
| P0    | Foundation | 2–3 weeks  | Plan, design, data model, repo, CI                                             |
| P1    | MVP        | 8–10 weeks | Public portal with search, profiles, fees, entrance guide, help desk, ads, SEO |
| P2    | Growth     | 6–8 weeks  | Accounts, reviews, alumni, college portal, wizard, notifications               |
| P3    | Scale      | Ongoing    | Maps, chatbot, analytics, premium profiles, mobile app                         |

---

## Phase 0 – Foundation (Weeks 1–3)

### Step 1: Discovery and Planning

- Interview 15–20 students/parents and 5–10 colleges; list their top questions.
- Finalise scope using the **Must** items in [01-requirements.md](01-requirements.md).
- Define success metrics: monthly visitors, profiles verified, help requests resolved, ad RPM, Core Web Vitals.

### Step 2: Data Strategy

- List IT programs and affiliations to cover first (BSc CSIT, BIT, BCA, BE Computer/Software, MSc/MIT, foreign-affiliated IT).
- Build the **data collection template** (spreadsheet) matching the schema in doc 04.
- Collect from official sources first; record `source_url`, `verified_at`.
- Target: 50 colleges verified for beta, 100+ for launch.

### Step 3: Design

- Create information architecture and URL map (see doc 07).
- Wireframes for: Home, Search, College profile, Program page, Compare, Entrance guide, Help flow.
- Design system: colours, typography (supports Devanagari), components, ad-slot placeholders.
- Usability test wireframes with 5 students.

### Step 4: Tech Setup

- Monorepo with Next.js app, API module, shared types.
- Docker Compose (Postgres, Redis, search), `.env.example`.
- ESLint, Prettier, Husky, commit conventions.
- GitHub Actions: lint → test → build → preview deploy.
- Staging environment and Sentry.

**Exit criteria:** approved wireframes, schema v1 migrated, CI green, 20 sample colleges loaded.

---

## Phase 1 – MVP (Weeks 4–13)

### Step 5: Database and Seed Data (Weeks 4–5)

- Implement schema with migrations.
- Import scripts (CSV → DB) with validation: required source, date and academic year.
- Admin-only CRUD (basic internal tool) to enter and review data.

### Step 6: Core Public Pages (Weeks 5–8)

1. Layout, header, footer, language switch, "Need help?" button.
2. Home page with search, popular programs, districts, latest notices.
3. Search results with filters, sort and pagination.
4. **College profile** tabs: Overview · Programs · Fees · Admission · Students and Alumni · Gallery · Contact.
5. **Program pages** (e.g. BSc CSIT) with colleges list, syllabus overview, career paths.
6. **Entrance/Selection guide** pages per exam and program.
7. District and university hub pages.

### Step 7: Compare and Save (Week 8–9)

- Compare 2–4 colleges (no login).
- Local save list stored in browser, migrate to account later.
- Share links.

### Step 8: Student Help Desk v1 (Week 9–10)

- "Need help?" modal/page, form with validation, consent checkbox, reference number.
- WhatsApp/Viber click-to-chat and click-to-call buttons.
- Email notification to counsellors; simple counsellor dashboard (status, notes).
- Rate limiting + CAPTCHA.

### Step 9: SEO Implementation (Weeks 9–11)

- Metadata templates, canonical tags, Open Graph.
- JSON-LD structured data, XML sitemaps, `robots.txt`.
- Breadcrumbs, internal linking modules.
- Core Web Vitals optimisation pass.

### Step 10: AdSense Integration (Weeks 11–12)

- Legal pages (Privacy, Terms, Cookie, About, Contact, Disclaimer).
- Consent banner and `<AdSlot>` component with reserved space.
- Apply for AdSense once the site has meaningful content and traffic **VERIFY** requirements.
- Add `ads.txt`; enable ads on approved templates only.

### Step 11: QA and Launch Prep (Weeks 12–13)

- Test matrix: browsers, low-end Android, slow 3G throttling.
- Accessibility audit (WCAG 2.1 AA).
- Security review (OWASP checks), load test search and profile pages.
- Content QA: fees, dates, spellings, Nepali labels.
- Soft launch to a small audience; collect feedback.

**Exit criteria:** all **M** requirements pass acceptance tests; Lighthouse targets met; 100 verified profiles; help requests flowing.

---

## Phase 2 – Growth (Weeks 14–21)

| Step | Work item                                                             |
| ---- | --------------------------------------------------------------------- |
| 12   | User accounts (OTP/Google), saved items, reminders                    |
| 13   | Reviews and ratings with moderation                                   |
| 14   | College admin portal: claim, edit, photos, notices, lead inbox        |
| 15   | Alumni and placement module, verified testimonials                    |
| 16   | Selection wizard (quiz) with explainable recommendations              |
| 17   | Notifications: email/SMS for deadlines and help updates               |
| 18   | Content programme: guides, comparisons, FAQs, result-season campaigns |
| 19   | Meilisearch/Typesense migration if search metrics demand it           |
| 20   | Analytics dashboards (search terms, drop-off, SLA)                    |

**Exit criteria:** 30% of colleges claimed, reviews moderated within 48 h, wizard completion rate tracked.

---

## Phase 3 – Scale (Ongoing)

- Map view with clustering and "near me".
- Chatbot assistant with human handover.
- PWA install prompts, offline saved list.
- Premium college profiles and clearly labelled sponsored placements.
- Native/hybrid mobile app if usage justifies.
- Data partnerships with universities and associations.
- Master's/abroad pathway guidance.

---

## Testing Strategy

| Level         | Scope                                                         | Tools                   |
| ------------- | ------------------------------------------------------------- | ----------------------- |
| Unit          | Fee total, eligibility logic, wizard scoring, slug generation | Jest/Vitest             |
| Integration   | API + DB, search filters, auth, help-request flow             | Supertest + test DB     |
| End-to-end    | Search → profile → compare → help; admin edit → public update | Playwright              |
| Performance   | Lighthouse CI, k6 load tests                                  | LHCI, k6                |
| Accessibility | Automated + manual screen reader checks                       | axe, NVDA/VoiceOver     |
| Security      | Dependency scan, SAST, OWASP ZAP                              | Dependabot, CodeQL, ZAP |

## Definition of Done

- Code reviewed and merged with passing CI.
- Tests written and passing.
- Accessibility and responsive checks done.
- Analytics events and error tracking added.
- Docs updated; feature flagged if risky.

## Release Process

1. Merge to `main` → deploy to staging automatically.
2. Run smoke and e2e tests.
3. Manual approval → production deploy (rolling).
4. Monitor errors and Web Vitals for 24 hours.
5. Roll back via previous build if error budget exceeded.

## Team Roles

| Role               | Responsibility                           |
| ------------------ | ---------------------------------------- |
| Product owner      | Priorities, acceptance, partnerships     |
| Frontend dev       | Pages, components, performance, SEO      |
| Backend dev        | API, data, search, security              |
| Designer           | UX, design system, accessibility         |
| Data/content lead  | Data collection, verification, editorial |
| Counsellor(s)      | Help desk, guidance quality              |
| DevOps (part-time) | CI/CD, infra, monitoring                 |

## Risks and Mitigation

| Risk                               | Impact            | Mitigation                                                         |
| ---------------------------------- | ----------------- | ------------------------------------------------------------------ |
| Inaccurate or outdated data        | Loss of trust     | Verification dates, college claim portal, yearly re-verification   |
| Low initial traffic/ad revenue     | Weak monetisation | SEO content, partnerships, diversify revenue                       |
| AdSense rejection                  | No ad income      | Original content, complete legal pages, fix policy issues, reapply |
| Legal issues from copied content   | Takedown          | Original content and licences                                      |
| Colleges not cooperating           | Sparse data       | Public-source baseline, outreach, value proposition for colleges   |
| Slow performance on low-end phones | Poor UX           | Performance budgets, lightweight pages                             |
| Help-desk overload                 | Slow responses    | SLAs, FAQ, wizard, automation, triage                              |

## Milestone Summary

| Milestone                          | Target        |
| ---------------------------------- | ------------- |
| M1 Design + data template approved | End of Week 3 |
| M2 Core pages working on staging   | Week 8        |
| M3 Help desk + compare complete    | Week 10       |
| M4 SEO + ads ready                 | Week 12       |
| M5 Public launch                   | Week 13       |
| M6 Accounts + college portal       | Week 21       |
