import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FileText, CheckCircle2, ExternalLink, FileCheck2, Clock, ArrowRight } from "lucide-react";
import { getEntranceExamBySlug } from "@/modules/admissions/admissions.service";
import { SAMPLE_ENTRANCE_EXAMS } from "@/modules/shared/db/sample-data";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { Badge } from "@/components/common/Badge";

export const revalidate = 3600;

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const exam = await getEntranceExamBySlug(params.slug);
    return {
      title: `${exam.name} Guide – Syllabus, Pattern, Dates & Prep`,
      description: `Complete guide to ${exam.name} conducted by ${exam.body}. Exam pattern, pass marks, full marks, admission timeline, and documents checklist.`,
      alternates: {
        canonical: `https://itinnepal.com/entrance/${params.slug}`,
      },
    };
  } catch {
    return { title: "Entrance Exam Guide | ITinNepal" };
  }
}

export default async function EntranceExamPage({ params }: PageProps) {
  let exam;
  try {
    exam = await getEntranceExamBySlug(params.slug);
  } catch {
    notFound();
  }

  const timelineSteps = [
    {
      num: 1,
      title: "Check GPA & Subject Eligibility",
      desc: "Verify minimum +2 grade C in Mathematics and Physics before applying for the central entrance form.",
    },
    {
      num: 2,
      title: "Submit Online Central Entrance Application",
      desc: `Fill the official form on the ${exam.body} portal, upload academic transcripts, and pay the examination fee.`,
    },
    {
      num: 3,
      title: "Download Admit Card & Inspect Venue",
      desc: "Obtain your computer-generated admit card showing your assigned test center and roll number.",
    },
    {
      num: 4,
      title: "Appear in Central Examination",
      desc: `Sit for the ${exam.fullMarks || 100}-mark objective MCQ examination with designated stationery and valid ID.`,
    },
    {
      num: 5,
      title: "Merit List Publication & Scorecard",
      desc: "Results and overall merit ranks are published online by the university dean office.",
    },
    {
      num: 6,
      title: "College Priority Selection & Admission",
      desc: "Apply to your shortlisted colleges based on your rank, complete document verification, and enroll.",
    },
  ];

  const checklistDocs = [
    "SEE / SLC Marksheet & Character Certificate",
    "+2 Transcript and Migration Certificate",
    "Central Entrance Examination Admit Card & Scorecard",
    "Nepali Citizenship Certificate or Official Birth Certificate",
    "Passport Size Photographs (4 copies with clear background)",
    "Fee payment voucher / online transaction reference",
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: "Entrance Guide", href: "/entrance/tu-iost-csit-entrance" },
          { label: exam.name },
        ]}
      />

      {/* Header */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
        <div className="max-w-4xl space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-md bg-rose-50 px-2.5 py-1 text-xs font-bold uppercase text-rose-700">
              Entrance Exam Guide
            </span>
            <Badge variant="verified">
              <CheckCircle2 className="h-3 w-3 text-emerald-600" />
              Official University Pattern
            </Badge>
            <Badge variant="sample">Sample Data</Badge>
          </div>

          <h1 className="text-2xl font-black tracking-tight text-slate-900 sm:text-4xl">
            {exam.name}
          </h1>

          <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
            Conducted by: <strong>{exam.body}</strong>. This central examination determines
            eligibility and merit rankings for IT and engineering admissions across affiliated
            colleges in Nepal.
          </p>

          <div className="grid grid-cols-2 gap-3 border-t border-slate-100 pt-4 sm:grid-cols-4">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Full Marks
              </span>
              <p className="mt-1 text-lg font-bold text-slate-900">{exam.fullMarks || 100} Marks</p>
            </div>
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Pass Marks
              </span>
              <p className="mt-1 text-lg font-bold text-emerald-600">
                {exam.passMarks || 35} Marks
              </p>
            </div>
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Application Fee
              </span>
              <p className="mt-1 text-base font-bold text-slate-900">
                NPR {(exam.feeNpr || 1850).toLocaleString()}
              </p>
            </div>
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Academic Year
              </span>
              <p className="mt-1 text-base font-bold text-indigo-600">2025/2026</p>
            </div>
          </div>
        </div>
      </section>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          {/* Pattern & Syllabus */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="flex items-center gap-2 text-xl font-bold tracking-tight text-slate-900">
              <FileText className="h-5 w-5 text-indigo-600" />
              Examination Pattern & Subject Weightage
            </h2>
            <div className="mt-4 space-y-2 rounded-xl border border-slate-100 bg-slate-50 p-4 text-xs leading-relaxed text-slate-700">
              <p className="font-medium text-slate-900">{exam.pattern}</p>
              <p className="text-slate-500">
                Questions follow the standard Higher Secondary (+2) science curriculum approved by
                the National Examination Board (NEB).
              </p>
            </div>
            {exam.website && (
              <div className="mt-4 text-xs">
                <a
                  href={exam.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-bold text-indigo-600 hover:underline"
                >
                  <span>Official Dean Office Notice & Model Questions</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            )}
          </section>

          {/* Timeline */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-6 flex items-center gap-2 text-xl font-bold tracking-tight text-slate-900">
              <Clock className="h-5 w-5 text-indigo-600" />
              Step-by-Step Admission Timeline
            </h2>
            <div className="space-y-4">
              {timelineSteps.map((step) => (
                <div key={step.num} className="flex gap-4">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white">
                    {step.num}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{step.title}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-slate-600">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Document Checklist */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 flex items-center gap-2 text-xl font-bold tracking-tight text-slate-900">
              <FileCheck2 className="h-5 w-5 text-emerald-600" />
              Required Documents Checklist
            </h2>
            <ul className="grid grid-cols-1 gap-3 text-xs sm:grid-cols-2">
              {checklistDocs.map((doc, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-2 rounded-lg border border-slate-100 bg-slate-50 p-2.5"
                >
                  <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-emerald-600" />
                  <span className="text-slate-800">{doc}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          <div className="rounded-2xl border border-indigo-200 bg-indigo-50/60 p-5 shadow-sm">
            <h3 className="text-base font-bold text-slate-900">Need preparation help?</h3>
            <p className="mt-1 text-xs leading-relaxed text-slate-600">
              Wondering about previous years&apos; cutoffs, question patterns, or how to register?
              Ask our education counsellors.
            </p>
            <Link
              href="/help"
              className="mt-4 flex h-10 w-full items-center justify-center rounded-xl bg-indigo-600 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700"
            >
              Ask Counsellor Free
            </Link>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-slate-500">
              All Entrance Exams
            </h3>
            <ul className="space-y-2 text-xs">
              {SAMPLE_ENTRANCE_EXAMS.map((e) => (
                <li key={e.slug}>
                  <Link
                    href={`/entrance/${e.slug}`}
                    className={`flex items-center justify-between rounded-lg p-2 transition-colors ${
                      e.slug === exam.slug
                        ? "bg-indigo-50 font-bold text-indigo-700"
                        : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <span>{e.name}</span>
                    <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
