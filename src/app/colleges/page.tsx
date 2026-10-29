import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Search,
  Filter,
  CheckCircle2,
  MapPin,
  Building,
  GraduationCap,
  GitCompare,
  ArrowRight,
  RotateCcw,
} from "lucide-react";
import { searchColleges } from "@/modules/search/search.service";
import { Badge } from "@/components/common/Badge";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";

export const metadata: Metadata = {
  title: "IT Colleges in Nepal – Search & Filter by Fees, Affiliation, Entrance",
  description:
    "Find and compare verified IT colleges in Kathmandu, Lalitpur, Pokhara, and across Nepal. Filter by BSc CSIT, BCA, BIT, BE Computer fees and entrance criteria.",
  alternates: {
    canonical: "https://itinnepal.com/colleges",
  },
};

interface PageProps {
  searchParams: {
    q?: string;
    district?: string;
    program?: string;
    type?: "GOVERNMENT" | "COMMUNITY" | "PRIVATE";
    fee_max?: string;
    entrance?: string;
    sort?: "relevance" | "fee_asc" | "fee_desc" | "seats" | "verified";
    page?: string;
  };
}

export default async function CollegesSearchPage({ searchParams }: PageProps) {
  const q = searchParams.q || "";
  const district = searchParams.district || "";
  const program = searchParams.program || "";
  const type = searchParams.type;
  const feeMax = searchParams.fee_max ? parseInt(searchParams.fee_max, 10) : undefined;
  const entrance =
    searchParams.entrance === "true" ? true : searchParams.entrance === "false" ? false : undefined;
  const sort = searchParams.sort || "relevance";
  const page = parseInt(searchParams.page || "1", 10);

  const searchResult = await searchColleges({
    q,
    district,
    program,
    type,
    feeMax,
    entranceRequired: entrance,
    sortBy: sort,
    page,
    limit: 10,
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Colleges" }]} />

      {/* Header bar */}
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
            Discover IT Colleges in Nepal
          </h1>
          <p className="mt-1 text-xs text-slate-500">
            Showing {searchResult.total} verified colleges (Sample Data)
          </p>
        </div>

        {/* Search form in page */}
        <form action="/colleges" method="GET" className="relative flex items-center">
          <Search className="absolute left-3.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            name="q"
            defaultValue={q}
            placeholder="Search by name, program..."
            className="w-full rounded-xl border border-slate-300 py-2 pl-10 pr-4 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:w-80"
          />
          {district && <input type="hidden" name="district" value={district} />}
          {program && <input type="hidden" name="program" value={program} />}
        </form>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        {/* Sidebar Filters */}
        <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-1">
          <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-3">
            <span className="flex items-center gap-1.5 text-sm font-bold text-slate-900">
              <Filter className="h-4 w-4 text-indigo-600" />
              <span>Filters</span>
            </span>
            <Link
              href="/colleges"
              className="flex items-center gap-1 text-xs text-slate-500 transition-colors hover:text-indigo-600"
            >
              <RotateCcw className="h-3 w-3" />
              <span>Clear All</span>
            </Link>
          </div>

          <form action="/colleges" method="GET" className="space-y-5 text-xs">
            {q && <input type="hidden" name="q" value={q} />}

            {/* Filter: Program */}
            <div>
              <label
                htmlFor="program-select"
                className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-slate-800"
              >
                IT Program
              </label>
              <select
                id="program-select"
                name="program"
                defaultValue={program}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-800 focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">All Programs</option>
                {searchResult.facets.programs.map((p) => (
                  <option key={p.slug} value={p.slug}>
                    {p.name} ({p.count})
                  </option>
                ))}
              </select>
            </div>

            {/* Filter: District */}
            <div>
              <label
                htmlFor="district-select"
                className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-slate-800"
              >
                District / City
              </label>
              <select
                id="district-select"
                name="district"
                defaultValue={district}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-800 focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">All Locations</option>
                {searchResult.facets.districts.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name} ({d.count})
                  </option>
                ))}
              </select>
            </div>

            {/* Filter: College Type */}
            <div>
              <label
                htmlFor="type-select"
                className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-slate-800"
              >
                College Type
              </label>
              <select
                id="type-select"
                name="type"
                defaultValue={type || ""}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-800 focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">All Types</option>
                <option value="GOVERNMENT">Government (Constituent)</option>
                <option value="COMMUNITY">Community Campus</option>
                <option value="PRIVATE">Private Affiliated</option>
              </select>
            </div>

            {/* Filter: Entrance Requirement */}
            <div>
              <label
                htmlFor="entrance-select"
                className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-slate-800"
              >
                Entrance Exam
              </label>
              <select
                id="entrance-select"
                name="entrance"
                defaultValue={entrance === true ? "true" : entrance === false ? "false" : ""}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-800 focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Any</option>
                <option value="true">Entrance Exam Required</option>
                <option value="false">Direct Admission / Merit</option>
              </select>
            </div>

            {/* Sort Order */}
            <div>
              <label
                htmlFor="sort-select"
                className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-slate-800"
              >
                Sort Results
              </label>
              <select
                id="sort-select"
                name="sort"
                defaultValue={sort}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-800 focus:ring-2 focus:ring-indigo-500"
              >
                <option value="relevance">Relevance</option>
                <option value="fee_asc">Fee: Low to High</option>
                <option value="fee_desc">Fee: High to Low</option>
                <option value="seats">Most Seats</option>
                <option value="verified">Recently Verified</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-indigo-600 py-2.5 font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700"
            >
              Apply Filters
            </button>
          </form>
        </aside>

        {/* Results List */}
        <section className="space-y-4 lg:col-span-3">
          {searchResult.items.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
              <GraduationCap className="mx-auto h-12 w-12 text-slate-300" />
              <h3 className="mt-3 text-lg font-bold text-slate-800">
                No colleges matched your filters
              </h3>
              <p className="mx-auto mt-1 max-w-md text-xs text-slate-500">
                Try clearing some filters or searching for broader terms like &quot;Kathmandu&quot;
                or &quot;BSc CSIT&quot;.
              </p>
              <div className="mt-6 flex justify-center gap-3">
                <Link
                  href="/colleges"
                  className="rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-indigo-700"
                >
                  Reset All Filters
                </Link>
                <Link
                  href="/help"
                  className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50"
                >
                  Ask a Counsellor
                </Link>
              </div>
            </div>
          ) : (
            searchResult.items.map((college) => (
              <article
                key={college.slug}
                className="flex flex-col justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-indigo-300 hover:shadow-md sm:flex-row"
              >
                <div className="flex-1 space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="sample">Sample</Badge>
                    <Badge variant="verified">
                      <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                      Verified
                    </Badge>
                    <Badge
                      variant={
                        college.type === "GOVERNMENT"
                          ? "government"
                          : college.type === "COMMUNITY"
                            ? "community"
                            : "private"
                      }
                    >
                      {college.type.charAt(0) + college.type.slice(1).toLowerCase()}
                    </Badge>
                  </div>

                  <h2 className="text-lg font-bold text-slate-900 transition-colors hover:text-indigo-600">
                    <Link href={`/colleges/${college.slug}`}>{college.name}</Link>
                  </h2>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5 text-slate-400" />
                      {college.address}
                    </span>
                    {college.establishedYear && (
                      <span className="flex items-center gap-1">
                        <Building className="h-3.5 w-3.5 text-slate-400" />
                        Est. {college.establishedYear}
                      </span>
                    )}
                  </div>

                  {/* Program chips */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                      Offered Programs & Fees:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {college.programs.map((p) => (
                        <div
                          key={p.slug}
                          className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50/70 px-2.5 py-1 text-xs"
                        >
                          <span className="font-bold text-slate-800">{p.slug.toUpperCase()}</span>
                          <span className="text-slate-400">•</span>
                          <span className="font-semibold text-indigo-600">
                            {p.formattedTotalFee}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Actions column */}
                <div className="flex justify-end gap-2 sm:min-w-[140px] sm:flex-col sm:justify-center sm:border-l sm:border-slate-100 sm:pl-5">
                  <Link
                    href={`/colleges/${college.slug}`}
                    className="flex h-10 flex-1 items-center justify-center gap-1.5 rounded-xl bg-indigo-600 px-4 text-xs font-semibold text-white transition-colors hover:bg-indigo-700 sm:flex-initial"
                  >
                    <span>View Profile</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                  <Link
                    href={`/compare?colleges=${college.slug}`}
                    className="flex h-10 flex-1 items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50 sm:flex-initial"
                  >
                    <GitCompare className="h-3.5 w-3.5 text-slate-500" />
                    <span>Compare</span>
                  </Link>
                </div>
              </article>
            ))
          )}

          {/* Pagination */}
          {searchResult.totalPages > 1 && (
            <div className="flex items-center justify-between border-t border-slate-200 pt-4 text-xs">
              <span className="text-slate-500">
                Page {searchResult.page} of {searchResult.totalPages}
              </span>
              <div className="flex gap-2">
                {searchResult.page > 1 && (
                  <Link
                    href={`/colleges?page=${searchResult.page - 1}&q=${q}&district=${district}&program=${program}`}
                    className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 font-medium text-slate-700 hover:bg-slate-50"
                  >
                    Previous
                  </Link>
                )}
                {searchResult.page < searchResult.totalPages && (
                  <Link
                    href={`/colleges?page=${searchResult.page + 1}&q=${q}&district=${district}&program=${program}`}
                    className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 font-medium text-slate-700 hover:bg-slate-50"
                  >
                    Next
                  </Link>
                )}
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
