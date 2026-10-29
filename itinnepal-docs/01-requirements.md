# 01 – Requirements Specification

## 1. Purpose and Scope

ITinNepal lets students discover IT colleges in Nepal and compare them on **programs, fees, student numbers, alumni outcomes, selection/entrance process and photos**, and get **human help** when choosing.

**In scope:** public portal, college admin portal, platform admin console, student help desk, ads, SEO.
**Out of scope (v1):** online admission payment, LMS, job board, non-IT disciplines.

## 2. User Roles

| Role           | Description                                    | Authentication                    |
| -------------- | ---------------------------------------------- | --------------------------------- |
| Visitor        | Browses without an account                     | None                              |
| Student        | Saved lists, reviews, help requests, reminders | Email/phone OTP/Google            |
| College Admin  | Manages one or more college profiles           | Email + 2FA, verified by platform |
| Counsellor     | Handles student help requests                  | Staff account                     |
| Content Editor | Edits master data, blogs, guides               | Staff account                     |
| Super Admin    | Full access, moderation, settings, ads         | Staff account + 2FA               |

## 3. Functional Requirements

### 3.1 Discovery and Search

| ID     | Requirement                                                                                                                                                                              | Priority |
| ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| FR-001 | Keyword search across college name, program, location with autosuggest                                                                                                                   | M        |
| FR-002 | Filters: province, district, city, university/affiliation, program, college type (government / community / private), shift, fee range, entrance required (yes/no), scholarship available | M        |
| FR-003 | Sort: relevance, fee (low–high), seats, recently verified, rating                                                                                                                        | M        |
| FR-004 | Map view of colleges with clustering                                                                                                                                                     | S        |
| FR-005 | "Near me" search using geolocation (opt-in)                                                                                                                                              | C        |
| FR-006 | Browse pages by program (e.g. BSc CSIT colleges), by district and by university                                                                                                          | M        |

### 3.2 College Profile

| ID     | Requirement                                                                                                                                                        | Priority |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------- |
| FR-010 | Overview: name, logo, established year, affiliation(s), type, address, contacts, website, social links                                                             | M        |
| FR-011 | Photo gallery (campus, labs, library, classrooms, hostel, events) with captions and lightbox                                                                       | M        |
| FR-012 | Programs offered with duration, intake/seats, shift, level and syllabus link                                                                                       | M        |
| FR-013 | **Fee breakdown** per program: admission fee, per-semester fee, total estimate, other charges, scholarship discount, currency NPR, "last verified" date and source | M        |
| FR-014 | **Student statistics:** seats, enrolled students, batch size, pass rate, student–teacher ratio, with academic year and source                                      | M        |
| FR-015 | **Alumni:** notable alumni, graduating batches, employers, placement or tracer-study summary, testimonials                                                         | M        |
| FR-016 | Facilities: lab, library, hostel, transport, Wi-Fi, cafeteria, sports                                                                                              | S        |
| FR-017 | Faculty highlights                                                                                                                                                 | C        |
| FR-018 | Notices: admission open, deadlines, scholarship announcements                                                                                                      | S        |
| FR-019 | Verified badge (platform confirmed data) vs. unverified                                                                                                            | M        |
| FR-020 | Reviews and ratings with category scores (teaching, labs, placement, value)                                                                                        | S        |

### 3.3 Selection and Admission Guide

| ID     | Requirement                                                                                                         | Priority |
| ------ | ------------------------------------------------------------------------------------------------------------------- | -------- |
| FR-030 | Per program: eligibility (GPA, +2 stream, subjects), entrance exam required (yes/no), exam name and conducting body | M        |
| FR-031 | Entrance details: syllabus, pattern, marks, pass marks, fee, dates, official link                                   | M        |
| FR-032 | Historic cutoff / merit-list marks by year (where publicly available)                                               | S        |
| FR-033 | Step-by-step admission process timeline (form fill → exam → merit list → admission)                                 | M        |
| FR-034 | Required documents checklist, downloadable                                                                          | S        |
| FR-035 | Scholarship info with criteria and deadlines                                                                        | S        |
| FR-036 | Program explainers and comparisons (CSIT vs BIT vs BCA, etc.)                                                       | M        |
| FR-037 | **Selection wizard** (quiz) that recommends programs and colleges                                                   | S        |

### 3.4 Comparison and Personalisation

| ID     | Requirement                                                                           | Priority |
| ------ | ------------------------------------------------------------------------------------- | -------- |
| FR-040 | Compare 2–4 colleges or programs side by side (fees, seats, entrance, alumni, rating) | M        |
| FR-041 | Save / bookmark colleges and programs                                                 | M        |
| FR-042 | Deadline reminders via email / SMS / push (opt-in)                                    | S        |
| FR-043 | Share college or comparison via link / WhatsApp / Viber                               | S        |
| FR-044 | Recently viewed                                                                       | C        |

### 3.5 Student Help Desk ("Need Help?")

| ID     | Requirement                                                                                                                                    | Priority |
| ------ | ---------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| FR-050 | Persistent "Need help choosing?" button on all public pages                                                                                    | M        |
| FR-051 | Help request form: name, phone, optional email, SEE/+2 result, interests, budget, preferred district, question, preferred contact time/channel | M        |
| FR-052 | Click-to-chat (WhatsApp/Viber) and click-to-call                                                                                               | M        |
| FR-053 | Request tracking: reference number, status (New → Assigned → Contacted → Resolved)                                                             | S        |
| FR-054 | FAQ assistant / chatbot with human handover                                                                                                    | C        |
| FR-055 | Counsellor dashboard with assignment, notes, follow-ups                                                                                        | S        |
| FR-056 | Consent capture before sharing student details with any college                                                                                | M        |
| FR-057 | Feedback after resolution (rating)                                                                                                             | C        |

### 3.5.1 Accounts and Reviews

| ID     | Requirement                                                       | Priority |
| ------ | ----------------------------------------------------------------- | -------- |
| FR-060 | Register / login via email, phone OTP, Google                     | M        |
| FR-061 | Profile, saved items, notification preferences, delete-my-account | M        |
| FR-062 | Review submission with moderation queue, report abuse             | S        |
| FR-063 | Student photo upload, tagged by category, moderated               | C        |

### 3.6 College Admin Portal

| ID     | Requirement                                                              | Priority |
| ------ | ------------------------------------------------------------------------ | -------- |
| FR-070 | Claim profile with verification (official email/domain, document upload) | M        |
| FR-071 | Edit profile, programs, fees, seats, entrance info, notices              | M        |
| FR-072 | Upload and organise photos                                               | M        |
| FR-073 | Alumni and placement data entry                                          | S        |
| FR-074 | Lead inbox (inquiries) with export                                       | S        |
| FR-075 | Analytics: views, saves, inquiries                                       | C        |
| FR-076 | Edit history and re-verification prompts every academic year             | S        |

### 3.7 Platform Admin Console

| ID     | Requirement                                                  | Priority |
| ------ | ------------------------------------------------------------ | -------- |
| FR-080 | Manage master data: universities, programs, locations, exams | M        |
| FR-081 | Approve claims, edits, reviews, photos                       | M        |
| FR-082 | Mark listings **Sponsored** (separate from ranking)          | M        |
| FR-083 | Ad management: toggle slots, ads.txt, consent settings       | M        |
| FR-084 | Content CMS for blogs and guides                             | M        |
| FR-085 | Audit log of every data change                               | M        |
| FR-086 | Reports: search trends, top colleges, help-desk SLA          | S        |

### 3.8 Content, Ads and Notices

| ID     | Requirement                                           | Priority |
| ------ | ----------------------------------------------------- | -------- |
| FR-090 | Reserved AdSense slots on eligible pages (see doc 06) | M        |
| FR-091 | Cookie/consent banner                                 | M        |
| FR-092 | Bilingual UI: English and Nepali                      | S        |
| FR-093 | Dated notices and news feed                           | S        |

## 4. Non-Functional Requirements

| ID      | Category           | Requirement / Target                                                                                |
| ------- | ------------------ | --------------------------------------------------------------------------------------------------- |
| NFR-001 | Performance        | LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1 on mobile (75th percentile)                                    |
| NFR-002 | Performance        | API p95 ≤ 300 ms for reads, search p95 ≤ 500 ms                                                     |
| NFR-003 | Network            | Usable on 3G; initial JS ≤ 170 KB gzipped per route; images WebP/AVIF, lazy-loaded                  |
| NFR-004 | Availability       | ≥ 99.5% monthly uptime; daily backups, 7-day PITR                                                   |
| NFR-005 | Scalability        | Handle 10× traffic during result/admission season through horizontal scale and CDN caching          |
| NFR-006 | Security           | HTTPS only, HSTS, OWASP Top 10 controls, RBAC, rate limiting, 2FA for admins                        |
| NFR-007 | Privacy            | Collect minimum data; explicit consent; right to delete; no sale of student data                    |
| NFR-008 | Accessibility      | WCAG 2.1 AA                                                                                         |
| NFR-009 | Usability          | Core task (find fees for a program) within 3 clicks; mobile-first                                   |
| NFR-010 | SEO                | SSR/ISR, structured data, sitemap, canonical URLs; Lighthouse SEO ≥ 95                              |
| NFR-011 | Data quality       | Every fee, seat and cutoff record has `source`, `verified_at`, `academic_year`                      |
| NFR-012 | Reliability        | Graceful degradation if search or ads fail; no blocking third-party scripts                         |
| NFR-013 | Maintainability    | Test coverage ≥ 70% on core logic, linting, typed code, API docs (OpenAPI)                          |
| NFR-014 | Observability      | Central logs, metrics, tracing, error alerts, uptime monitoring                                     |
| NFR-015 | Localisation       | Unicode (Devanagari), Nepali date (BS) display with AD conversion                                   |
| NFR-016 | Compatibility      | Last 2 versions of Chrome, Edge, Safari, Firefox; Android 8+, iOS 14+                               |
| NFR-017 | Compliance         | Follow Nepal's applicable data and electronic transaction laws; AdSense program policies **VERIFY** |
| NFR-018 | Content moderation | Reviews and uploads reviewed within 48 hours                                                        |
| NFR-019 | Help-desk SLA      | First response to help requests within 24 hours (target 4 working hours)                            |

## 5. Acceptance Criteria (Samples)

- **FR-013 Fees:** Given a program page, when I open "Fees", then I see admission fee, semester fee, total, scholarship note, source link and "Verified on <date>".
- **FR-030 Entrance:** Given a program that needs an entrance exam, then the page shows the exam name, body, syllabus link, key dates and last year's cutoff if known; otherwise it says "No entrance exam – admission by merit/interview".
- **FR-050 Help:** Given any public page, when I click "Need help?", then a form or chat opens in ≤ 1 click and submission returns a reference number.
- **FR-090 Ads:** Given an eligible page, ad containers have fixed height reservations and CLS stays ≤ 0.1.

## 6. Assumptions and Constraints

- Data is sourced from official university/regulator pages, direct college submissions and verified field research.
- Third-party scraping is limited to what site terms allow; prefer official sources.
- Fees are estimates; colleges can change them, so every fee shows a verification date.
- The team is small; the MVP prioritises **M** items.

## 7. Traceability

Each requirement maps to a roadmap phase in [05-development-roadmap.md](05-development-roadmap.md): P1 = all **M**, P2 = most **S**, P3 = **C**.
