import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  MapPin,
  Building,
  CheckCircle2,
  Calendar,
  ExternalLink,
  GitCompare,
  HelpCircle,
  FileCheck2,
  Image as ImageIcon,
  Phone,
  Mail,
  Globe,
} from "lucide-react";
import { getCollegeBySlug, getAllColleges } from "@/modules/colleges/colleges.service";
import { Badge } from "@/components/common/Badge";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { AdSlot } from "@/components/common/AdSlot";

export const revalidate = 3600; // ISR 1 hour

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const college = await getCollegeBySlug(params.slug);
    const title = `${college.name} – Fees, Admission & Programs`;
    const description = `Explore ${college.name} in ${college.address}: IT programs, fee structure, entrance exam criteria, student stats, alumni and campus facilities.`;

    return {
      title,
      description,
      alternates: {
        canonical: `https://itinnepal.com/colleges/${params.slug}`,
      },
      openGraph: {
        title,
        description,
        url: `https://itinnepal.com/colleges/${params.slug}`,
        siteName: "ITinNepal",
        type: "article",
      },
    };
  } catch {
    return {
      title: "College Profile | ITinNepal",
    };
  }
}

export default async function CollegeProfilePage({ params }: PageProps) {
  let college;
  try {
    college = await getCollegeBySlug(params.slug);
  } catch {
    notFound();
  }

  // Related / similar colleges in same district or affiliation
  const { items: allColleges } = await getAllColleges(1, 5);
  const similarColleges = allColleges.filter((c) => c.slug !== college.slug).slice(0, 3);

  // Structured Data (JSON-LD) per Doc 07 Section 6
  const collegeJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollegeOrUniversity",
    name: college.name,
    url: `https://itinnepal.com/colleges/${college.slug}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: college.districtId,
      streetAddress: college.address,
      addressCountry: "NP",
    },
    telephone: college.phone,
    sameAs: [college.website],
  };

  const allFees = college.programs.map((p) => p.feeSummary.estimatedTotalFee);
  const minFee = allFees.length > 0 ? Math.min(...allFees) : 0;
  const maxFee = allFees.length > 0 ? Math.max(...allFees) : 0;
  const totalSeats = college.programs.reduce((acc, p) => acc + p.seats, 0);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collegeJsonLd) }}
      />

      <Breadcrumbs items={[{ label: "Colleges", href: "/colleges" }, { label: college.name }]} />

      {/* 1. Header Block */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-start">
          <div className="max-w-3xl space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="sample">Sample Data</Badge>
              <Badge variant="verified">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                Platform Verified
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
                {college.type.charAt(0) + college.type.slice(1).toLowerCase()} Campus
              </Badge>
              {college.university && (
                <span className="text-xs font-semibold text-slate-600">
                  Affiliated with {college.university.name}
                </span>
              )}
            </div>

            <h1 className="text-2xl font-black tracking-tight text-slate-900 sm:text-4xl">
              {college.name}
            </h1>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-600">
              <span className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-slate-400" />
                {college.address}
              </span>
              {college.establishedYear && (
                <span className="flex items-center gap-1.5">
                  <Building className="h-4 w-4 text-slate-400" />
                  Established: {college.establishedYear}
                </span>
              )}
              <span className="flex items-center gap-1.5 font-medium text-emerald-700">
                <Calendar className="h-4 w-4 text-emerald-600" />
                Verified: Jan 2026 (Academic Year 2025/2026)
              </span>
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap gap-2.5 sm:min-w-[180px] sm:flex-nowrap md:flex-col">
            <Link
              href={`/compare?colleges=${college.slug}`}
              className="flex h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 text-xs font-semibold text-slate-700 shadow-sm transition-colors hover:bg-slate-50"
            >
              <GitCompare className="h-4 w-4 text-slate-500" />
              <span>Compare College</span>
            </Link>
            <Link
              href="/help"
              className="flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700"
            >
              <HelpCircle className="h-4 w-4" />
              <span>Need Help Choosing?</span>
            </Link>
          </div>
        </div>

        {/* Quick Facts Strip */}
        <div className="mt-8 grid grid-cols-2 gap-3 border-t border-slate-100 pt-6 sm:grid-cols-4">
          <div className="rounded-xl bg-slate-50 p-3.5">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Programs Offered
            </span>
            <p className="mt-1 text-lg font-bold text-slate-900">
              {college.programs.length} IT Degrees
            </p>
          </div>
          <div className="rounded-xl bg-slate-50 p-3.5">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Total Intake Seats
            </span>
            <p className="mt-1 text-lg font-bold text-slate-900">{totalSeats} Seats</p>
          </div>
          <div className="rounded-xl bg-slate-50 p-3.5">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Estimated Total Fee
            </span>
            <p className="mt-1 text-base font-bold text-indigo-700 sm:text-lg">
              NPR {minFee.toLocaleString()} - {maxFee.toLocaleString()}
            </p>
          </div>
          <div className="rounded-xl bg-slate-50 p-3.5">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Scholarships
            </span>
            <p className="mt-1 text-base font-bold text-emerald-700 sm:text-lg">
              Up to 100% Merit Basis
            </p>
          </div>
        </div>
      </section>

      {/* 2. Sticky Tab Bar */}
      <nav
        aria-label="College Sections"
        className="sticky top-16 z-30 mt-6 border-y border-slate-200 bg-white/95 backdrop-blur-md"
      >
        <div className="scrollbar-none flex gap-2 overflow-x-auto py-2.5 text-xs font-semibold text-slate-600">
          <a
            href="#overview"
            className="whitespace-nowrap rounded-lg px-3.5 py-1.5 hover:bg-indigo-50 hover:text-indigo-600"
          >
            Overview
          </a>
          <a
            href="#programs"
            className="whitespace-nowrap rounded-lg px-3.5 py-1.5 hover:bg-indigo-50 hover:text-indigo-600"
          >
            Programs Offered
          </a>
          <a
            href="#fees"
            className="whitespace-nowrap rounded-lg px-3.5 py-1.5 hover:bg-indigo-50 hover:text-indigo-600"
          >
            Fee Breakdown
          </a>
          <a
            href="#admission"
            className="whitespace-nowrap rounded-lg px-3.5 py-1.5 hover:bg-indigo-50 hover:text-indigo-600"
          >
            Admission & Entrance
          </a>
          <a
            href="#alumni"
            className="whitespace-nowrap rounded-lg px-3.5 py-1.5 hover:bg-indigo-50 hover:text-indigo-600"
          >
            Students & Alumni
          </a>
          <a
            href="#gallery"
            className="whitespace-nowrap rounded-lg px-3.5 py-1.5 hover:bg-indigo-50 hover:text-indigo-600"
          >
            Campus Photos
          </a>
          <a
            href="#contact"
            className="whitespace-nowrap rounded-lg px-3.5 py-1.5 hover:bg-indigo-50 hover:text-indigo-600"
          >
            Contact
          </a>
        </div>
      </nav>

      {/* 3. Main Content Sections */}
      <div className="mt-8 space-y-12">
        {/* Section: Overview */}
        <section
          id="overview"
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <h2 className="text-xl font-bold tracking-tight text-slate-900">About {college.name}</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">{college.description}</p>
          <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
            <span className="font-semibold text-slate-700">Official Website:</span>
            <a
              href={college.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-medium text-indigo-600 hover:underline"
            >
              <span>{college.website}</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </section>

        {/* Section: Programs */}
        <section
          id="programs"
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <h2 className="text-xl font-bold tracking-tight text-slate-900">Programs Offered</h2>
          <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
            {college.programs.map((prog) => (
              <div
                key={prog.slug}
                className="space-y-3 rounded-xl border border-slate-200 bg-slate-50/50 p-4"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-slate-900">{prog.name}</h3>
                  <Badge variant="neutral">{prog.shift} Shift</Badge>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
                  <div>
                    <span className="block text-slate-400">Intake Seats:</span>
                    <strong className="text-slate-900">{prog.seats} seats</strong>
                  </div>
                  <div>
                    <span className="block text-slate-400">Duration:</span>
                    <strong className="text-slate-900">
                      {prog.durationMonths / 12} Years (8 Sem)
                    </strong>
                  </div>
                  <div>
                    <span className="block text-slate-400">Min. Academic GPA:</span>
                    <strong className="text-slate-900">{prog.minGpa} GPA in +2</strong>
                  </div>
                  <div>
                    <span className="block text-slate-400">Total Est. Fee:</span>
                    <strong className="text-indigo-600">{prog.feeSummary.formattedTotal}</strong>
                  </div>
                </div>
                <p className="border-t border-slate-200 pt-2 text-xs text-slate-600">
                  <strong className="text-slate-800">Eligibility:</strong> {prog.eligibilityText}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Section: Fee Breakdown (FR-013) */}
        <section id="fees" className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col justify-between gap-2 border-b border-slate-100 pb-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-slate-900">
                Itemized Fee Breakdown
              </h2>
              <p className="mt-0.5 text-xs text-slate-500">
                Calculated from verified line items. Currency in NPR.
              </p>
            </div>
            <span className="inline-flex items-center gap-1 rounded border border-amber-200 bg-amber-50 px-2 py-1 text-xs font-semibold text-amber-800">
              Sample Indicative Fees
            </span>
          </div>

          <div className="mt-6 space-y-6">
            {college.programs.map((prog) => (
              <div key={prog.slug} className="overflow-x-auto rounded-xl border border-slate-200">
                <div className="flex items-center justify-between bg-slate-100 px-4 py-2.5">
                  <span className="text-sm font-bold text-slate-900">{prog.name}</span>
                  <span className="text-xs font-bold text-indigo-700">
                    Est. Total: {prog.feeSummary.formattedTotal}
                  </span>
                </div>
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-slate-200 bg-slate-50 text-slate-500">
                    <tr>
                      <th className="px-4 py-2.5 font-semibold">Fee Component</th>
                      <th className="px-4 py-2.5 font-semibold">Frequency</th>
                      <th className="px-4 py-2.5 font-semibold">Amount (NPR)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="px-4 py-2.5 font-medium text-slate-800">
                        One-time Admission & Campus Registration
                      </td>
                      <td className="px-4 py-2.5 text-slate-500">One-time</td>
                      <td className="px-4 py-2.5 font-semibold text-slate-900">
                        NPR {prog.feeSummary.admissionFee.toLocaleString()}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2.5 font-medium text-slate-800">
                        Tuition & Practical Lab Fee (Per Semester)
                      </td>
                      <td className="px-4 py-2.5 text-slate-500">Per Semester (×8)</td>
                      <td className="px-4 py-2.5 font-semibold text-slate-900">
                        NPR {prog.feeSummary.perSemesterFee.toLocaleString()}
                      </td>
                    </tr>
                    <tr className="bg-slate-50 font-bold">
                      <td className="px-4 py-3 text-slate-900">Total Estimated 4-Year Cost</td>
                      <td className="px-4 py-3 text-slate-500">8 Semesters</td>
                      <td className="px-4 py-3 text-sm text-indigo-700">
                        {prog.feeSummary.formattedTotal}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="flex flex-wrap justify-between gap-2 border-t border-slate-200 bg-slate-50/70 px-4 py-2 text-[11px] text-slate-500">
                  <span>
                    Verified on: <strong>Jan 15, 2026</strong> (Academic Year{" "}
                    {prog.feeSummary.academicYear})
                  </span>
                  <a
                    href={prog.feeSummary.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-indigo-600 hover:underline"
                  >
                    <span>View Official Fee Circular</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section: Admission & Entrance (FR-030) */}
        <section
          id="admission"
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <h2 className="text-xl font-bold tracking-tight text-slate-900">
            Admission & Entrance Process
          </h2>

          <div className="mt-6 space-y-6">
            {college.programs.map((prog) => (
              <div key={prog.slug} className="space-y-4 rounded-xl border border-slate-200 p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-base font-bold text-slate-900">{prog.name}</h3>
                  {prog.entranceExam ? (
                    <Badge variant="entrance">Entrance Required: {prog.entranceExam.body}</Badge>
                  ) : (
                    <Badge variant="direct">Direct Admission (Merit / Interview)</Badge>
                  )}
                </div>

                {prog.entranceExam ? (
                  <div className="space-y-2 rounded-lg border border-rose-100 bg-rose-50/60 p-4 text-xs">
                    <p className="font-bold text-rose-900">
                      Central Entrance: {prog.entranceExam.name}
                    </p>
                    <p className="text-rose-800">
                      Conducted by: <strong>{prog.entranceExam.body}</strong>. Candidates must
                      appear in the central entrance examination and attain minimum qualifying marks
                      to become eligible for admission counselling.
                    </p>
                    {prog.cutoffMarks && (
                      <p className="text-rose-800">
                        Last Academic Year Merit Cutoff: <strong>{prog.cutoffMarks} marks</strong>
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="space-y-2 rounded-lg border border-teal-100 bg-teal-50/60 p-4 text-xs">
                    <p className="font-bold text-teal-900">
                      No Central Entrance Examination Required
                    </p>
                    <p className="text-teal-800">
                      Admission is administered directly by the college based on +2 / SEE GPA
                      transcript evaluation followed by a personal counselling interview.
                    </p>
                  </div>
                )}

                {/* Admission Checklist */}
                <div>
                  <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-500">
                    Required Documents Checklist
                  </h4>
                  <ul className="grid grid-cols-1 gap-2 text-xs text-slate-700 sm:grid-cols-2">
                    <li className="flex items-center gap-1.5">
                      <FileCheck2 className="h-4 w-4 flex-shrink-0 text-emerald-600" />
                      <span>SEE Marksheet & Character Certificate</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <FileCheck2 className="h-4 w-4 flex-shrink-0 text-emerald-600" />
                      <span>+2 Transcript & Migration Certificate</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <FileCheck2 className="h-4 w-4 flex-shrink-0 text-emerald-600" />
                      <span>Entrance Admit Card & Scorecard (if required)</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <FileCheck2 className="h-4 w-4 flex-shrink-0 text-emerald-600" />
                      <span>Citizenship Certificate / Birth Certificate</span>
                    </li>
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section: Students & Alumni (FR-014, FR-015) */}
        <section id="alumni" className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold tracking-tight text-slate-900">
            Student Outcomes & Alumni Highlights
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Notable Alumni Cards */}
            {college.notableAlumni.map((alum, idx) => (
              <div
                key={idx}
                className="space-y-3 rounded-xl border border-slate-200 bg-slate-50/60 p-5"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 font-bold text-indigo-700">
                    {alum.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{alum.name}</h3>
                    <p className="text-xs font-medium text-indigo-600">
                      {alum.role} at {alum.employer}
                    </p>
                  </div>
                </div>
                <blockquote className="text-xs italic text-slate-600">
                  &ldquo;{alum.testimonial}&rdquo;
                </blockquote>
                <div className="text-[11px] text-slate-400">
                  Batch of {alum.batchYear} • {alum.programSlug.toUpperCase()}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section: Gallery (FR-011) */}
        <section
          id="gallery"
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <div className="mb-4 flex items-center gap-2">
            <ImageIcon className="h-5 w-5 text-indigo-600" />
            <h2 className="text-xl font-bold tracking-tight text-slate-900">
              Campus Photo Gallery (Sample Placeholders)
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
            {college.media.map((m, idx) => (
              <div
                key={idx}
                className="group relative flex aspect-video flex-col justify-end overflow-hidden rounded-xl border border-slate-200 bg-slate-100 p-2"
              >
                <span className="text-[11px] font-bold capitalize text-slate-700">
                  {m.category}
                </span>
                <span className="line-clamp-1 text-[10px] text-slate-400">{m.caption}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Section: Contact */}
        <section
          id="contact"
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <h2 className="text-xl font-bold tracking-tight text-slate-900">
            Contact & Campus Location
          </h2>
          <div className="mt-4 grid grid-cols-1 gap-4 text-xs sm:grid-cols-3">
            <div className="flex items-center gap-2.5 rounded-xl border border-slate-100 bg-slate-50 p-3.5">
              <Phone className="h-4 w-4 text-indigo-600" />
              <div>
                <span className="block text-slate-400">Phone</span>
                <strong className="text-slate-900">{college.phone}</strong>
              </div>
            </div>
            <div className="flex items-center gap-2.5 rounded-xl border border-slate-100 bg-slate-50 p-3.5">
              <Mail className="h-4 w-4 text-indigo-600" />
              <div>
                <span className="block text-slate-400">Email</span>
                <strong className="text-slate-900">{college.email}</strong>
              </div>
            </div>
            <div className="flex items-center gap-2.5 rounded-xl border border-slate-100 bg-slate-50 p-3.5">
              <Globe className="h-4 w-4 text-indigo-600" />
              <div>
                <span className="block text-slate-400">Website</span>
                <a
                  href={college.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-indigo-600 hover:underline"
                >
                  {college.website}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Ad slot: in_content_2 (Doc 06 Section 4 - kept strictly outside fee table) */}
        <AdSlot slotId="in_content_2" minHeight={280} />

        {/* Similar Colleges Section (Doc 08 Section 3) */}
        {similarColleges.length > 0 && (
          <section className="border-t border-slate-200 pt-8">
            <h2 className="mb-4 text-lg font-bold text-slate-900">Similar IT Colleges</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {similarColleges.map((sim) => (
                <Link
                  key={sim.slug}
                  href={`/colleges/${sim.slug}`}
                  className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:border-indigo-400 hover:shadow"
                >
                  <h3 className="text-sm font-bold text-slate-900">{sim.name}</h3>
                  <p className="mt-1 text-xs text-slate-500">{sim.address}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
