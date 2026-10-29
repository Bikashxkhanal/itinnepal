# ITinNepal – Project Documentation

> **Vision:** The most trusted, transparent and student-friendly place to discover, compare and choose IT colleges and programs in Nepal.

| Item          | Detail                                                                                                             |
| ------------- | ------------------------------------------------------------------------------------------------------------------ |
| Product       | ITinNepal (web first, mobile-friendly PWA)                                                                         |
| Domain        | IT education in Nepal (BSc CSIT, BIT, BCA, BE Computer/Software, MSc/MIT, foreign-affiliated IT degrees, diplomas) |
| Primary users | SEE / +2 graduates, parents, bachelor graduates seeking Master's, college administrators                           |
| Revenue model | Google AdSense (display ads), clearly labelled sponsored listings, optional college premium profiles               |
| Doc version   | 1.0                                                                                                                |
| Status        | Planning                                                                                                           |

## Document Map

| #   | File                                                                          | Purpose                                                                                 |
| --- | ----------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| 01  | [requirements.md](01-requirements.md)                                         | Functional and non-functional requirements with IDs, priorities and acceptance criteria |
| 02  | [things-to-do.md](02-things-to-do.md)                                         | Best practices and mandatory practices                                                  |
| 03  | [things-not-to-do.md](03-things-not-to-do.md)                                 | Anti-patterns, policy and legal pitfalls                                                |
| 04  | [architecture.md](04-architecture.md)                                         | System design, stack, data model, APIs, deployment                                      |
| 05  | [development-roadmap.md](05-development-roadmap.md)                           | Step-by-step development plan by phase                                                  |
| 06  | [adsense-integration.md](06-adsense-integration.md)                           | Ad slots, placement rules, policy compliance, performance safeguards                    |
| 07  | [seo-guide.md](07-seo-guide.md)                                               | Technical, on-page and content SEO                                                      |
| 08  | [ux-guidelines.md](08-ux-guidelines.md)                                       | User-friendly design standards, accessibility, mobile and Nepali language               |
| 09  | [student-help-and-selection-guide.md](09-student-help-and-selection-guide.md) | "Need help?" feature, selection wizard and counselling workflow                         |

## Reading Order

1. Product team: 01 → 09 → 08 → 03
2. Developers: 04 → 05 → 01 → 07 → 06
3. Content / SEO team: 07 → 02 → 03
4. Business / Ads: 06 → 03 → 07

## Conventions

- **Requirement IDs:** `FR-xxx` functional, `NFR-xxx` non-functional.
- **Priority (MoSCoW):** **M**ust, **S**hould, **C**ould, **W**on't (this release).
- **Phases:** P0 Foundation, P1 MVP, P2 Growth, P3 Scale.
- Anything marked **VERIFY** depends on external policies (Google, universities, regulators) that change; confirm against the official source before launch.

## Guiding Principles

1. **Trust over traffic:** every data point has a source and a "last verified" date.
2. **Student first:** clarity, speed and honesty beat clever features.
3. **Mobile first:** most Nepali students browse on mid-range Android phones and variable networks.
4. **Ads never harm UX:** ads are reserved, labelled, limited and never mixed with rankings.
5. **Ship small, improve often:** MVP in phases, measured by real usage.
