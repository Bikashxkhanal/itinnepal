import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { compareColleges } from "@/modules/compare/compare.service";
import { getAllColleges } from "@/modules/colleges/colleges.service";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { Badge } from "@/components/common/Badge";

export const metadata: Metadata = {
  title: "Compare IT Colleges Side-by-Side | ITinNepal",
  description:
    "Compare tuition fees, intake seats, entrance exams, and alumni placement rates across IT colleges in Nepal.",
  robots: {
    index: false,
    follow: true,
  },
};

interface PageProps {
  searchParams: {
    colleges?: string;
  };
}

export default async function ComparePage({ searchParams }: PageProps) {
  const { items: allColleges } = await getAllColleges(1, 20);

  // Parse slugs from query params or default to first 2 sample colleges
  let requestedSlugs = (searchParams.colleges || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  if (requestedSlugs.length < 2) {
    requestedSlugs = [
      allColleges[0]?.slug || "sample-sagarmatha-college",
      allColleges[1]?.slug || "sample-ascol-kathmandu",
    ];
  }

  let compareData;
  try {
    compareData = await compareColleges(requestedSlugs.slice(0, 4));
  } catch {
    compareData = await compareColleges([
      allColleges[0]?.slug || "sample-sagarmatha-college",
      allColleges[1]?.slug || "sample-ascol-kathmandu",
    ]);
  }

  const { colleges, metrics } = compareData;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Compare Colleges" }]} />

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              Compare IT Colleges Side-by-Side
            </h1>
            <Badge variant="sample">Sample Data</Badge>
          </div>
          <p className="mt-1 text-xs text-slate-500">
            Compare 2 to 4 colleges. No sign up or account required. Differences highlighted.
          </p>
        </div>

        {/* Quick selector to swap or add colleges */}
        <form action="/compare" method="GET" className="flex items-center gap-2">
          <select
            name="colleges"
            defaultValue={requestedSlugs.join(",")}
            className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 focus:ring-2 focus:ring-indigo-500"
          >
            <option value="sample-sagarmatha-college,sample-ascol-kathmandu">
              Sagarmatha vs ASCOL (Private vs Govt)
            </option>
            <option value="sample-ascol-kathmandu,sample-patan-multiple-campus">
              ASCOL vs Patan Campus (TU Constituent)
            </option>
            <option value="sample-sagarmatha-college,sample-deerwalk-institute">
              Sagarmatha vs Deerwalk (CSIT Leaders)
            </option>
            <option value="sample-ncit-lalitpur,sample-nec-bhaktapur">
              NCIT vs nec (PU Engineering)
            </option>
          </select>
          <button
            type="submit"
            className="rounded-xl bg-indigo-600 px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:bg-indigo-700"
          >
            Compare
          </button>
        </form>
      </div>

      {/* Comparison Matrix Table */}
      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="sticky left-0 z-10 w-48 bg-slate-50 p-4 font-bold text-slate-900">
                Criteria
              </th>
              {colleges.map((col) => (
                <th key={col.slug} className="min-w-[220px] p-4 align-top">
                  <div className="space-y-1.5">
                    <Badge variant="sample">Sample</Badge>
                    <h2 className="line-clamp-2 text-sm font-bold text-slate-900">
                      <Link href={`/colleges/${col.slug}`} className="hover:text-indigo-600">
                        {col.name}
                      </Link>
                    </h2>
                    <span className="block text-[11px] text-slate-500">{col.address}</span>
                    <Link
                      href={`/colleges/${col.slug}`}
                      className="inline-flex items-center gap-1 pt-1 text-[11px] font-semibold text-indigo-600 hover:underline"
                    >
                      <span>Full Profile</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {metrics.map((row) => (
              <tr
                key={row.key}
                className={row.isDifferent ? "bg-amber-50/30" : "hover:bg-slate-50/50"}
              >
                <td className="sticky left-0 z-10 border-r border-slate-100 bg-inherit p-4 font-bold text-slate-800">
                  <div className="flex items-center justify-between">
                    <span>{row.label}</span>
                    {row.isDifferent && (
                      <span className="rounded bg-amber-100 px-1.5 py-0.5 text-[9px] font-bold uppercase text-amber-800">
                        Differs
                      </span>
                    )}
                  </div>
                </td>
                {colleges.map((col) => (
                  <td key={col.slug} className="p-4 font-medium text-slate-700">
                    {String(row.values[col.slug] || "—")}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Comparison Help Banner */}
      <section className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl border border-indigo-200 bg-indigo-50/60 p-6 sm:flex-row">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-base font-bold text-slate-900">
            Still undecided between these colleges?
          </h3>
          <p className="text-xs text-slate-600">
            Our student counselling team provides impartial reviews based on your entrance rank,
            commute, and financial budget.
          </p>
        </div>
        <Link
          href="/help"
          className="whitespace-nowrap rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700"
        >
          Talk to a Counsellor Free
        </Link>
      </section>
    </div>
  );
}
