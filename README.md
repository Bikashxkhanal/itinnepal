# ITinNepal

> **The most trusted, transparent and student-friendly platform to discover, compare and choose IT colleges and programs in Nepal.**

---

## 🛠 Tech Stack

- **Framework:** Next.js 14 (App Router) + TypeScript (strict mode) + Tailwind CSS
- **Database & ORM:** PostgreSQL 16 + Prisma ORM (`pg_trgm` & full-text search)
- **Cache & Rate Limiting:** Redis 7
- **Quality & Testing:** Vitest, ESLint, Prettier, Husky, lint-staged, Commitlint
- **CI/CD:** GitHub Actions (lint -> typecheck -> test -> build)

---

## 🚀 Quick Start (Local Development)

### 1. Prerequisites

- Node.js >= 20
- pnpm >= 9 (`npm install -g pnpm`)
- Docker & Docker Compose (optional for local PostgreSQL/Redis service)

### 2. Environment Setup

```bash
cp .env.example .env
```

### 3. Start Database & Redis (Docker)

```bash
docker compose up -d
```

This spins up PostgreSQL on port `5432` and Redis on port `6379`.

### 4. Install Dependencies

```bash
pnpm install
```

### 5. Database Migration & Seed

```bash
pnpm prisma:migrate
pnpm seed
```

### 6. Run the Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.
Health check endpoint: [http://localhost:3000/health](http://localhost:3000/health).

---

## 🧪 Available Scripts

| Script                 | Purpose                                                      |
| ---------------------- | ------------------------------------------------------------ |
| `pnpm dev`             | Starts Next.js development server                            |
| `pnpm build`           | Compiles application for production                          |
| `pnpm start`           | Starts production server                                     |
| `pnpm lint`            | Runs Next.js ESLint rules with strict type checks            |
| `pnpm typecheck`       | Validates TypeScript in strict mode (`tsc --noEmit`)         |
| `pnpm test`            | Runs unit & integration tests via Vitest                     |
| `pnpm format`          | Formats all code with Prettier and Tailwind plugin           |
| `pnpm prisma:migrate`  | Runs database migrations                                     |
| `pnpm seed`            | Seeds database with 20 realistic sample colleges             |
| `pnpm import:colleges` | Imports college data from CSV with strict verification rules |

---

## 📁 Modular Monolith Architecture

Following `itinnepal-docs/04-architecture.md`:

```
src/
 ├─ app/                 # Next.js App Router (pages & API routes)
 ├─ modules/
 │   ├─ colleges/        # Profiles, facilities, media, CSV import
 │   ├─ programs/        # Catalog, offerings, syllabus
 │   ├─ fees/            # Fee line items, total calculations, scholarships
 │   ├─ admissions/      # Rules, entrance exams, cutoffs, timelines
 │   ├─ stats/           # Enrollment, pass rates, ratios
 │   ├─ alumni/          # Outcomes, notable alumni, testimonials
 │   ├─ search/          # Postgres FTS + pg_trgm queries
 │   ├─ compare/         # College comparison engine
 │   ├─ users/           # Auth, profiles, saved items
 │   ├─ reviews/         # Reviews & moderation
 │   ├─ help/            # Help desk requests, counsellor workflow
 │   ├─ wizard/          # Selection quiz scoring
 │   ├─ cms/             # Notices & guides
 │   ├─ ads/             # <AdSlot> component & consent state
 │   ├─ admin/           # Admin logic & audit logs
 │   └─ shared/          # DB client, errors, rate limiter, formatting utils
```

---

## 📚 Project Documentation

All specifications are preserved in `./itinnepal-docs/`:

- [01 – Requirements Specification](./itinnepal-docs/01-requirements.md)
- [02 – Mandatory Practices](./itinnepal-docs/02-things-to-do.md)
- [03 – Anti-Patterns & Prohibitions](./itinnepal-docs/03-things-not-to-do.md)
- [04 – Architecture](./itinnepal-docs/04-architecture.md)
- [05 – Development Roadmap](./itinnepal-docs/05-development-roadmap.md)
- [06 – AdSense Integration](./itinnepal-docs/06-adsense-integration.md)
- [07 – SEO Guide](./itinnepal-docs/07-seo-guide.md)
- [08 – UX & Accessibility Guidelines](./itinnepal-docs/08-ux-guidelines.md)
- [09 – Student Help Desk & Selection Guide](./itinnepal-docs/09-student-help-and-selection-guide.md)
- [Assumptions Log](./docs/ASSUMPTIONS.md)
