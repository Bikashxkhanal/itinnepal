# 08 – UX and User-Friendliness Guidelines

## 1. Design Principles

1. **Clarity:** a student should answer "Which college, what will it cost, how do I get in?" within seconds.
2. **Honesty:** show dates, sources and limits of data; label ads and sponsored items.
3. **Low friction:** no sign-up to browse, compare or ask for help.
4. **Mobile first:** thumb-friendly, light, resilient on weak networks.
5. **Inclusive:** English and Nepali, accessible to all abilities.
6. **Guidance, not just data:** explain terms and recommend next steps.

## 2. Primary User Journeys

| Journey                | Steps                                       | Success signal             |
| ---------------------- | ------------------------------------------- | -------------------------- |
| Find a college         | Home search → results → profile → fees      | Fees viewed                |
| Compare                | Add 2–4 colleges → compare table → share    | Compare completed          |
| Understand admission   | Program page → Entrance section → checklist | Checklist viewed           |
| Get help               | "Need help?" → form/chat → reference number | Request submitted          |
| Not sure what to study | Wizard → recommendations → saved            | Wizard completed           |
| College admin          | Claim → verify → update profile             | Profile completeness ≥ 80% |

## 3. Information Hierarchy of a College Page

1. **Header block:** name, logo, location, affiliation, type, verified badge, rating, primary buttons (**Compare**, **Save**, **Need help?**).
2. **Sticky tab bar:** Overview · Programs · Fees · Admission · Students and Alumni · Gallery · Reviews · Contact.
3. **Quick facts card:** established year, programs, seats, fee range, entrance required (Yes/No), scholarships.
4. **Content sections** with clear H2s, data tables, source + verified date.
5. **Help banner:** "Not sure this is the right college? Talk to a counsellor."
6. **Similar colleges** and related guides.

## 4. Key Components

| Component      | Guidance                                                                               |
| -------------- | -------------------------------------------------------------------------------------- |
| Search bar     | Autosuggest, recent searches, program and district shortcuts                           |
| Filter panel   | Drawer on mobile, chips showing active filters, clear-all, result count                |
| College card   | Photo, name, location, programs chips, fee range, entrance badge, Compare/Save         |
| Fee table      | Line items, total, scholarship note, "Verified {date}", source link, tooltip for terms |
| Entrance panel | Required? exam, body, dates, syllabus, last cutoff, steps timeline                     |
| Stats widgets  | Seats vs enrolled, pass rate, student–teacher ratio with academic year                 |
| Alumni block   | Photos with consent, roles, employers, placement summary                               |
| Gallery        | Category tabs, lightbox, captions, keyboard navigable                                  |
| Compare table  | Sticky first column, horizontal scroll on mobile, highlight differences                |
| Help launcher  | Floating button bottom-right (mobile: bottom bar), never covered by ads                |
| Badges         | Verified · Unverified · Sponsored · Government · Community · Private                   |

## 5. Layout, Typography and Visual Style

- **Grid:** 4/8/12-column responsive grid; max content width ~1200 px.
- **Typography:** system-friendly sans-serif with Devanagari support (e.g. Noto Sans/Noto Sans Devanagari); base 16 px, line-height 1.5–1.7.
- **Colour:** calm primary (trust), one accent for CTAs, clear semantic colours (success, warning, error); contrast ≥ 4.5:1.
- **Spacing:** 4/8 px scale; generous white space around data tables.
- **Iconography:** consistent, labelled, not icon-only for critical actions.
- **Dark mode:** optional (P2).

## 6. Mobile and Low-Bandwidth Design

- Tap targets ≥ 44×44 px; bottom navigation for Search, Compare, Saved, Help.
- Lazy-load images; show skeletons; low-data mode toggle.
- Keep forms short; use proper input types (`tel`, `email`), numeric keyboards, autofill.
- PWA: installable, offline access to saved colleges and last viewed pages.
- Avoid heavy carousels and autoplay video.

## 7. Language and Content Style

- Short sentences, active voice, no unexplained abbreviations; add tooltips (e.g. _Affiliation: the university that awards the degree_).
- Provide Nepali translations for navigation, forms and key guides.
- Display money as **NPR 3,50,000** (Nepali digit grouping) with optional Nepali numerals.
- Show **AD and BS dates** where relevant (admission deadlines).
- Use neutral, factual tone; no exaggerated claims.

## 8. Accessibility (WCAG 2.1 AA)

- Semantic HTML, landmarks, skip links, logical heading order.
- All interactive elements keyboard reachable with visible focus.
- Form labels, error messages linked via `aria-describedby`.
- Alt text for informative images; captions for videos.
- Don't rely on colour alone; respect `prefers-reduced-motion`.
- Test with screen readers (NVDA, TalkBack, VoiceOver).

## 9. Forms and Validation

- Inline, plain-language errors ("Enter a 10-digit mobile number").
- Preserve entered data on error.
- Mark optional (not required) fields.
- Confirmation page with next steps and reference number.
- Spam protection that does not hinder users (invisible CAPTCHA, honeypot, rate limits).

## 10. Empty, Loading and Error States

| State        | Behaviour                                                                   |
| ------------ | --------------------------------------------------------------------------- |
| Loading      | Skeleton screens, no layout jump                                            |
| No results   | Suggest relaxing filters, popular colleges, help button                     |
| Missing data | "Not yet available – Ask the college / Ask ITinNepal" with a one-tap action |
| Error        | Friendly message, retry, support link                                       |
| Offline      | Show saved items and an offline banner                                      |

## 11. Trust and Transparency Elements

- "How we collect and verify data" page.
- Badge legend and last-verified dates.
- Disclaimer near fees ("Indicative; confirm with the college").
- Clear separation of ads and sponsored listings.
- Visible contact details, About page, team and editorial policy.
- Report-an-error link on every data block.

## 12. Ad-Aware UX

- Reserved space prevents layout shifts.
- Ads never interrupt tables, forms or the help launcher.
- Provide "Advertisement" labels and keep spacing around interactive elements.
- Avoid ads on first viewport of mobile for content pages that need immediate answers.

## 13. Microcopy Examples

| Context                | Copy                                                                     |
| ---------------------- | ------------------------------------------------------------------------ |
| Help button            | "Need help choosing? Talk to a counsellor"                               |
| Entrance: required     | "Entrance exam required – conducted by {Body}. Next exam: {Date}"        |
| Entrance: not required | "No entrance exam – admission by SEE/+2 merit and college interview"     |
| Fee note               | "Fees are indicative and may change. Verified on {Date}. Source: {Link}" |
| Missing data           | "We haven't verified this yet. Ask the college or request help."         |

## 14. Usability Testing Plan

| Stage       | Method                                                           | Participants          |
| ----------- | ---------------------------------------------------------------- | --------------------- |
| Wireframes  | Moderated think-aloud                                            | 5 students            |
| Prototype   | Task-based testing (find fee, check entrance, compare, ask help) | 8 users incl. parents |
| Beta        | Analytics + session replay (privacy-safe) + survey               | 50+ users             |
| Post-launch | Quarterly interviews, NPS, help-desk feedback                    | Ongoing               |

**Task success targets:** ≥ 90% find a program's fee in ≤ 3 clicks; ≥ 85% submit a help request without assistance.

## 15. UX Metrics

| Metric                       | Target          |
| ---------------------------- | --------------- |
| Task success rate            | ≥ 90%           |
| Time to find fee             | ≤ 30 s          |
| Help-request completion rate | ≥ 80% of starts |
| Bounce on college pages      | ≤ 50%           |
| Mobile CWV pass              | ≥ 75% of pages  |
| NPS                          | ≥ 40            |
