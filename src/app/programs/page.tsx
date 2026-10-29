import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { getAllPrograms } from "@/modules/programs/programs.service";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { Badge } from "@/components/common/Badge";

export const metadata: Metadata = {
  title: "IT Degree Programs in Nepal – BSc CSIT, BIT, BCA, BE Computer",
  description:
    "Explore undergraduate IT programs in Nepal. Compare syllabus, average tuition fees, eligibility, and offering colleges.",
  alternates: {
    canonical: "https://itinnepal.com/programs",
  },
};

export default async function ProgramsDirectoryPage() {
  const programs = await getAllPrograms();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Programs" }]} />

      <div className="mb-8">
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
          IT Degree Programs in Nepal
        </h1>
        <p className="mt-2 max-w-3xl text-sm text-slate-600">
          Compare 4-year bachelor degrees across Computer Science, Information Technology, Computer
          Applications, and Computer Engineering.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {programs.map((prog) => (
          <div
            key={prog.slug}
            className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-indigo-300"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="rounded-md bg-indigo-50 px-2.5 py-1 text-xs font-bold uppercase text-indigo-700">
                  {prog.category}
                </span>
                <Badge variant="verified">
                  <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                  Verified Syllabus
                </Badge>
              </div>

              <h2 className="text-xl font-bold text-slate-900">
                <Link href={`/programs/${prog.slug}`}>{prog.name}</Link>
              </h2>

              <p className="text-xs leading-relaxed text-slate-600">{prog.summary}</p>

              <div className="grid grid-cols-2 gap-2 rounded-xl border border-slate-100 bg-slate-50 p-3.5 text-xs">
                <div>
                  <span className="block text-slate-400">Available Colleges:</span>
                  <strong className="text-slate-900">{prog.totalCollegesCount} Colleges</strong>
                </div>
                <div>
                  <span className="block text-slate-400">Est. Course Fee:</span>
                  <strong className="text-indigo-600">{prog.formattedAverageFee}</strong>
                </div>
                <div className="col-span-2 border-t border-slate-200 pt-1">
                  <span className="block text-slate-400">Eligibility:</span>
                  <span className="font-medium text-slate-700">{prog.eligibilitySummary}</span>
                </div>
              </div>
            </div>

            <div className="mt-5 flex gap-2 border-t border-slate-100 pt-3">
              <Link
                href={`/programs/${prog.slug}`}
                className="flex h-10 flex-1 items-center justify-center gap-1.5 rounded-xl bg-indigo-600 text-xs font-semibold text-white transition-colors hover:bg-indigo-700"
              >
                <span>View Program Guide</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href={`/colleges?program=${prog.slug}`}
                className="flex h-10 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50"
              >
                Colleges ({prog.totalCollegesCount})
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
