# 07 – SEO Guide

## 1. SEO Objectives

- Rank for high-intent searches such as "BSc CSIT colleges in Kathmandu", "BCA fee in Nepal", "CSIT entrance exam syllabus", "BIT vs BCA".
- Win featured snippets and People-Also-Ask with clear Q&A content.
- Earn organic traffic that supports ad revenue and help-desk leads.

## 2. Keyword Strategy

| Cluster            | Examples                                                                | Page type                                  |
| ------------------ | ----------------------------------------------------------------------- | ------------------------------------------ |
| Program + location | BSc CSIT colleges in Pokhara, BCA colleges in Lalitpur                  | Hub pages                                  |
| Fees               | BSc CSIT fee in Nepal, BIT fee structure                                | Program + college Fee sections, fee guides |
| Entrance           | CSIT entrance syllabus, BCA entrance cutoff, is entrance needed for BIT | Entrance guide pages                       |
| Comparison         | CSIT vs BIT vs BCA, TU vs foreign-affiliated                            | Guides                                     |
| College brand      | "<College name> fee", "<College name> admission"                        | College pages                              |
| After SEE / +2     | Best IT courses after +2                                                | Guides                                     |
| Scholarships       | IT scholarship Nepal                                                    | Scholarship pages                          |

Process: build a keyword sheet (volume, intent, difficulty), map each keyword to exactly **one** URL, and avoid cannibalisation. Use Search Console queries to refine monthly.

## 3. Information Architecture and URLs

```
/                               Home
/colleges                       All IT colleges (filterable)
/colleges/{college-slug}        College profile
/colleges/{college-slug}/fees   (optional sub-pages if content is rich)
/programs                       All programs
/programs/{program-slug}        e.g. /programs/bsc-csit
/programs/{program-slug}/colleges-in-{district}   e.g. bsc-csit/colleges-in-kathmandu
/districts/{district}           IT colleges in district
/universities/{university}      Affiliated IT colleges
/entrance/{exam-slug}           Entrance exam guide
/guides/{article-slug}          Editorial guides and comparisons
/compare                        Compare tool (noindex dynamic combos)
/help                           Student help centre
```

Rules: lowercase, hyphenated, no IDs/parameters in indexable URLs, stable slugs, 301 on change, trailing-slash consistency.

## 4. Technical SEO

| Area               | Standard                                                                                  |
| ------------------ | ----------------------------------------------------------------------------------------- |
| Rendering          | SSR/ISR for all indexable pages; no content hidden behind JS-only interactions            |
| Performance        | Core Web Vitals pass; image optimisation; font subsetting (Latin + Devanagari)            |
| Mobile             | Responsive, tap-friendly, viewport meta                                                   |
| HTTPS              | Everywhere with HSTS                                                                      |
| Canonicals         | Self-referencing canonical on every page; filters canonicalise to base                    |
| Indexation control | `noindex` for search-result permutations, compare combos, account/admin, thin/empty pages |
| Pagination         | Crawlable `rel` links or "load more" with real URLs                                       |
| Sitemaps           | Split by type (colleges, programs, guides); `lastmod` accurate; submit to Search Console  |
| robots.txt         | Allow main content; disallow `/admin`, `/api`, internal search params                     |
| hreflang           | `en` and `ne` versions if both are indexable                                              |
| Redirects          | 301 only, no chains                                                                       |
| 404/410            | Helpful 404 with search and links; 410 for permanently removed colleges                   |
| Logs               | Monitor crawl errors in Search Console                                                    |

## 5. On-Page Templates

### College page

- **Title:** `{College} – Programs, Fees, Admission & Photos | ITinNepal` (≤ 60 chars where possible)
- **Meta description:** `Explore {College} in {City}: IT programs, fee structure, entrance/admission process, student numbers, alumni and photos. Updated {Month Year}.` (≤ 155 chars)
- **H1:** `{College}` · **H2s:** Overview, Programs, Fees, Admission and Entrance, Students and Alumni, Photos, FAQs, Similar colleges.
- Content: ≥ 400 words of original, useful text plus structured data tables.
- FAQs: 4–6 real questions ("Does {College} require an entrance exam for BCA?").

### Program page

- **Title:** `BSc CSIT in Nepal – Colleges, Fees, Entrance & Career Guide`
- Sections: What it is, who it is for, eligibility, entrance, fee range, top colleges list, syllabus overview, career options, FAQ.

### District/hub page

- Unique intro (150+ words), list with key facts, tips for choosing in that district, links to programs and guides.

### Guide/blog

- Search-intent focused, ≥ 800 words for pillar pages, author + reviewer name, updated date, internal links, sources cited.

## 6. Structured Data (JSON-LD)

```json
{
  "@context": "https://schema.org",
  "@type": "CollegeOrUniversity",
  "name": "Example College of IT",
  "url": "https://itinnepal.com/colleges/example-college-of-it",
  "logo": "https://itinnepal.com/media/logo.png",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Kathmandu",
    "addressCountry": "NP"
  },
  "telephone": "+977-1-0000000",
  "sameAs": ["https://example.edu.np"]
}
```

| Page    | Schema types                                                                                     |
| ------- | ------------------------------------------------------------------------------------------------ |
| College | `CollegeOrUniversity`, `BreadcrumbList`, `FAQPage` (only when FAQs visible), `ImageObject`       |
| Program | `EducationalOccupationalProgram`, `BreadcrumbList`, `FAQPage`                                    |
| Guide   | `Article`, `BreadcrumbList`, `FAQPage`                                                           |
| Home    | `WebSite` with `SearchAction`, `Organization`                                                    |
| Reviews | `AggregateRating` only if reviews are real and visible, following Google's guidelines **VERIFY** |

Validate with Rich Results Test; do not mark up content that is not visible.

## 7. Image SEO

- Descriptive file names (`example-college-computer-lab.webp`).
- Alt text describing the image (not stuffed with keywords).
- Responsive `srcset`, width/height attributes, lazy-load below the fold.
- Add images to the image sitemap where helpful.

## 8. Internal Linking

- College ↔ program ↔ district ↔ university cross links.
- "Similar colleges" and "Other colleges in {district}" modules.
- Guides link to relevant hubs; hubs link to guides.
- Breadcrumbs on every page.
- Keep important pages within 3 clicks of home.

## 9. Content Strategy

| Cadence        | Content                                                                                   |
| -------------- | ----------------------------------------------------------------------------------------- |
| Evergreen      | Program guides, entrance guides, comparisons, "how to choose"                             |
| Seasonal       | SEE result aftermath, +2 result, admission openings, entrance dates, cutoff announcements |
| Data-led       | "Average BSc CSIT fee in Nepal (updated {year})" with original analysis                   |
| Student voices | Alumni stories (with consent)                                                             |
| Local          | College lists per district                                                                |

Quality rules: original text, expert review, sources cited, last-updated date, no AI-bulk spam; follow Google's helpful-content and spam policies **VERIFY**.

## 10. Local and Bilingual SEO

- Provide Nepali pages for key guides (`/ne/...`) with proper `hreflang`.
- Include common transliterations and alternate spellings (e.g. Kathmandu/Katmandu, CSIT/B.Sc. CSIT).
- Claim and link Google Business Profiles for colleges where the college agrees.

## 11. Link Building (Ethical)

- Partner with colleges, student clubs and associations for legitimate links.
- Publish data studies and tools (fee calculator, cutoff trends) worth citing.
- Digital PR with education journalists.
- Never buy links or use link schemes.

## 12. Measurement

| Tool           | Use                                                 |
| -------------- | --------------------------------------------------- |
| Search Console | Queries, indexing, CWV, sitemap health              |
| Analytics      | Landing pages, engagement, help-request conversions |
| Lighthouse CI  | Regression checks per PR                            |
| Rank tracker   | Priority keyword positions                          |
| Log/crawl tool | Broken links, redirect chains, duplicate titles     |

KPIs: indexed pages, impressions, CTR, average position, organic sessions, help-requests per 1,000 sessions, ad RPM per organic session.

## 13. Pre-Launch SEO Checklist

- ☐ Unique title/meta/H1 on every template
- ☐ Canonicals, hreflang, sitemap and robots verified
- ☐ Structured data validated
- ☐ CWV passes on mobile
- ☐ No thin or empty indexable pages
- ☐ Redirect map from any old URLs
- ☐ Search Console and Analytics connected
- ☐ 404 and 410 behaviours tested

## 14. Ongoing SEO Routine

| Frequency | Tasks                                                          |
| --------- | -------------------------------------------------------------- |
| Weekly    | Check Search Console errors, publish content, fix broken links |
| Monthly   | Refresh top pages, update fee/date data, review keyword gaps   |
| Quarterly | Technical audit, internal linking review, content pruning      |
| Seasonal  | Pre-build content ahead of results and admission periods       |
