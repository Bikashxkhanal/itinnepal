import React from "react";
import Link from "next/link";
import { Search, CheckCircle2, HelpCircle, FileText, Calendar, ArrowRight } from "lucide-react";
import { getAllPrograms } from "@/modules/programs/programs.service";
import { Badge } from "@/components/common/Badge";

export const revalidate = 3600; // ISR 1 hour

export default async function HomePage() {
  const programs = await getAllPrograms();

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "ITinNepal",
    url: "https://itinnepal.com",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://itinnepal.com/colleges?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  const popularDistricts = [
    { id: "kathmandu", name: "Kathmandu", count: "8 Colleges" },
    { id: "lalitpur", name: "Lalitpur", count: "5 Colleges" },
    { id: "bhaktapur", name: "Bhaktapur", count: "2 Colleges" },
    { id: "kaski", name: "Pokhara (Kaski)", count: "3 Colleges" },
    { id: "chitwan", name: "Chitwan", count: "2 Colleges" },
  ];

  const sampleNotices = [
    {
      title: "TU IOST BSc CSIT Entrance Examination Form Fill-up Schedule Announced",
      date: "2026-01-20",
      source: "TU IOST Official Circular",
      badge: "Admission Open",
    },
    {
      title: "IOE Engineering Entrance Examination – Model Question Sets Published",
      date: "2026-01-18",
      source: "IOE Pulchowk Dean Office",
      badge: "Preparation",
    },
    {
      title: "Scholarship Scheme Updates for Female and Marginalised Students in IT",
      date: "2026-01-12",
      source: "Ministry of Education / UGC",
      badge: "Scholarships",
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />

      {/* Top Banner Notice */}
      <div className="border-b border-amber-200 bg-amber-500/10 px-4 py-2 text-center text-xs font-medium text-amber-900">
        📢 <strong>Sample Platform Notice:</strong> ITinNepal is currently loaded with 20 realistic
        sample college datasets for preview and student evaluation.
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-indigo-50/70 via-white to-slate-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <Badge variant="verified" className="mb-4">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
            100% Verified Statistics & Itemized Fees
          </Badge>

          <h1 className="mx-auto max-w-4xl text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Find the Right <span className="text-indigo-600">IT College</span> in Nepal with
            Confidence
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600 sm:text-lg">
            Discover verified tuition fee structures, entrance exam syllabi, seat allocations, and
            alumni outcomes for BSc CSIT, BIT, BCA, and Computer Engineering.
          </p>

          {/* Search Form */}
          <form
            action="/colleges"
            method="GET"
            className="mx-auto mt-8 flex max-w-2xl flex-col gap-2 rounded-2xl border border-slate-200 bg-white p-2.5 shadow-lg sm:flex-row"
          >
            <div className="relative flex flex-1 items-center">
              <Search className="absolute left-3.5 h-5 w-5 text-slate-400" />
              <input
                type="text"
                name="q"
                placeholder="Search college, program (e.g. BSc CSIT), or district..."
                className="w-full rounded-xl py-3 pl-11 pr-4 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <button
              type="submit"
              className="flex h-12 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700"
            >
              <span>Search</span>
            </button>
          </form>

          {/* Quick Filters */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-xs">
            <span className="text-slate-500">Popular:</span>
            <Link
              href="/colleges?program=bsc-csit"
              className="rounded-full border border-slate-200 bg-white px-3 py-1 font-medium text-slate-700 transition-colors hover:border-indigo-500 hover:text-indigo-600"
            >
              BSc CSIT Colleges
            </Link>
            <Link
              href="/colleges?program=be-computer"
              className="rounded-full border border-slate-200 bg-white px-3 py-1 font-medium text-slate-700 transition-colors hover:border-indigo-500 hover:text-indigo-600"
            >
              BE Computer Engineering
            </Link>
            <Link
              href="/colleges?program=bca"
              className="rounded-full border border-slate-200 bg-white px-3 py-1 font-medium text-slate-700 transition-colors hover:border-indigo-500 hover:text-indigo-600"
            >
              BCA Colleges
            </Link>
            <Link
              href="/colleges?program=bit"
              className="rounded-full border border-slate-200 bg-white px-3 py-1 font-medium text-slate-700 transition-colors hover:border-indigo-500 hover:text-indigo-600"
            >
              BIT Colleges
            </Link>
          </div>
        </div>
      </section>

      {/* Programs Overview Section */}
      <section className="border-t border-slate-200 bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                Undergraduate Programs
              </span>
              <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Explore IT Degrees in Nepal
              </h2>
            </div>
            <Link
              href="/programs"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 hover:text-indigo-700"
            >
              <span>View all programs</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {programs.map((prog) => (
              <div
                key={prog.slug}
                className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-indigo-300 hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-bold uppercase text-indigo-700">
                      {prog.slug.replace("-", " ")}
                    </span>
                    <span className="text-xs font-medium text-slate-500">
                      4 Years / 8 Semesters
                    </span>
                  </div>

                  <h3 className="mt-3 line-clamp-2 text-lg font-bold text-slate-900">
                    {prog.name}
                  </h3>

                  <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-slate-600">
                    {prog.summary}
                  </p>

                  <div className="mt-4 space-y-1.5 border-t border-slate-100 pt-3 text-xs">
                    <div className="flex justify-between text-slate-600">
                      <span>Available Colleges:</span>
                      <strong className="text-slate-900">{prog.totalCollegesCount} Colleges</strong>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Est. Course Fee:</span>
                      <strong className="text-slate-900">{prog.formattedAverageFee}</strong>
                    </div>
                  </div>
                </div>

                <div className="mt-5 border-t border-slate-100 pt-3">
                  <Link
                    href={`/programs/${prog.slug}`}
                    className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-slate-100 py-2.5 text-xs font-semibold text-slate-800 transition-colors hover:bg-indigo-50 hover:text-indigo-600"
                  >
                    <span>View Colleges & Syllabus</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Districts Hub Section */}
      <section className="border-t border-slate-200 bg-slate-50 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
              Browse by Location
            </span>
            <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
              Colleges in Key Districts
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {popularDistricts.map((d) => (
              <Link
                key={d.id}
                href={`/colleges?district=${d.id}`}
                className="flex flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:border-indigo-400 hover:shadow"
              >
                <span className="text-base font-bold text-slate-900">{d.name}</span>
                <span className="mt-1 text-xs text-slate-500">{d.count}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Transparency Pillars */}
      <section className="border-t border-slate-200 bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Why Students & Parents Trust ITinNepal
            </h2>
            <p className="mt-3 text-sm text-slate-600">
              College portals often display arbitrary fee figures and marketing slogans. ITinNepal
              upholds strict data verification standards.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-slate-900">Verified & Sourced Data</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                Every tuition fee line item, seat count, and admission deadline carries an official
                source URL and verification timestamp.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                <FileText className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-slate-900">Itemized Fee Transparency</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                We break fees down into admission charges, semester tuition, lab fees, and exam
                levies to prevent hidden fee shocks.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-100 text-purple-700">
                <HelpCircle className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-slate-900">Unbiased Human Guidance</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                Our counsellors answer student queries for free without commission bias or forceful
                marketing calls.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Notices & Admission Alerts */}
      <section className="border-t border-slate-200 bg-slate-50 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center gap-2">
            <Calendar className="h-5 w-5 text-indigo-600" />
            <h2 className="text-xl font-bold tracking-tight text-slate-900">
              Admission Notices & Exam Circulars
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {sampleNotices.map((n, idx) => (
              <div key={idx} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="mb-2 flex items-center justify-between text-xs">
                  <span className="font-semibold text-indigo-600">{n.badge}</span>
                  <span className="text-slate-400">{n.date}</span>
                </div>
                <h3 className="text-sm font-bold leading-snug text-slate-900">{n.title}</h3>
                <p className="mt-2 text-xs font-medium text-slate-500">Source: {n.source}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
