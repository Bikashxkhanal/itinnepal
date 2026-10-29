# Project Assumptions - ITinNepal

This document logs architectural and operational assumptions made during the implementation of ITinNepal, in accordance with `itinnepal-docs/01-requirements.md` and `itinnepal-docs/04-architecture.md`.

## 1. Environment & Infrastructure

- **Docker Compose**: `docker-compose.yml` provides PostgreSQL 16 (with `pg_trgm`) and Redis 7. For local CI/dev environments where Docker daemon may not be active, unit and integration tests are isolated or mocked, while Prisma client generation and schema validation remain fully compatible.
- **Port Allocations**: Default PostgreSQL port is `5432` and Redis is `6379`. Next.js web application runs on port `3000`.

## 2. Search & Typo-tolerance

- As specified in Doc 04 Section 8, the MVP uses PostgreSQL Full-Text Search (`tsvector`/`tsquery`) combined with `pg_trgm` trigram similarity for fuzzy college/program search before graduating to Meilisearch/Typesense in Phase 2.

## 3. Data Integrity & Verification

- All statistical records (fees, enrollment, cutoffs, admission rules) strictly maintain `academic_year`, `source_url`, and `verified_at` timestamps. Any CSV import without these fields is rejected.
- All sample data created for Phase 0/1 testing is explicitly tagged with `[Sample]` in names and notes to prevent misrepresentation as real facts (Doc 03).

## 4. Ads & Monetisation Policy

- `NEXT_PUBLIC_ADS_ENABLED` defaults to `false`.
- Ad slots render accessible reserved placeholder containers (`<AdSlot>`) with fixed `min-height` and "Advertisement" labels. Real AdSense publisher IDs are not bundled into client builds.
- Ads are strictly prohibited on wizard, help desk, login, error, and empty pages.

## 5. Help Desk Reference Numbers

- Reference codes follow the format `ITN-YYYY-NNNNN` (e.g. `ITN-2026-00001`) with sequential numeric padding.
