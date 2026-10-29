import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CheckCircle2,
  BookOpen,
  Briefcase,
  MapPin,
  ArrowRight,
  HelpCircle,
  HelpCircle as FaqIcon,
} from "lucide-react";
import {
  getProgramBySlug,
  getCollegesOfferingProgram,
  getAllPrograms,
} from "@/modules/programs/programs.service";
import { Badge } from "@/components/common/Badge";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";

export const revalidate = 3600;

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const prog = await getProgramBySlug(params.slug);
    const title = `${prog.name} in Nepal – Colleges, Fees & Entrance`;
    const description = `Complete guide to ${prog.name} in Nepal: college fee structures, entrance exam eligibility, syllabus breakdown, top colleges, and career prospects.`;

    return {
      title,
      description,
      alternates: {
        canonical: `https://itinnepal.com/programs/${params.slug}`,
      },
      openGraph: {
        title,
        description,
        url: `https://itinnepal.com/programs/${params.slug}`,
        siteName: "ITinNepal",
      },
    };
  } catch {
    return { title: "Program Guide | ITinNepal" };
  }
}

export default async function ProgramDetailPage({ params }: PageProps) {
  let programData;
  try {
    programData = await getCollegesOfferingProgram(params.slug);
  } catch {
    notFound();
  }

  const { program, colleges } = programData;
  const otherPrograms = (await getAllPrograms()).filter((p) => p.slug !== program.slug);

  // Schema.org Structured Data per Doc 07 Section 6
  const programJsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOccupationalProgram",
    name: program.name,
    description: program.summary,
    provider: {
      "@type": "Organization",
      name: "ITinNepal",
      url: "https://itinnepal.com",
    },
    educationalProgramMode: "Full-time",
    timeToComplete: "P4Y",
  };

  const sampleFaqs = [
    {
      q: `What is the minimum eligibility criteria for ${program.name}?`,
      a: program.eligibilitySummary,
    },
    {
      q: `What is the average 4-year tuition fee for ${program.name} in Nepal?`,
      a: `Fees range from NPR ${program.minFeeNpr.toLocaleString()} in constituent government colleges up to NPR ${program.maxFeeNpr.toLocaleString()} in private institutions. Average fee is ${program.formattedAverageFee}.`,
    },
    {
      q: `Is an entrance examination mandatory to get admission into ${program.name}?`,
      a: "For TU-affiliated BSc CSIT and BE Computer, central university entrance exams (IOST or IOE) are mandatory. For other programs like BIT and BCA, central or college-level merit evaluations apply.",
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(programJsonLd) }}
      />

      <Breadcrumbs items={[{ label: "Programs", href: "/programs" }, { label: program.name }]} />

      {/* Hero Header */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
        <div className="max-w-4xl space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-md bg-indigo-50 px-2.5 py-1 text-xs font-bold uppercase text-indigo-700">
              {program.category}
            </span>
            <Badge variant="verified">
              <CheckCircle2 className="h-3 w-3 text-emerald-600" />
              Verified Syllabus & Fees
            </Badge>
            <Badge variant="sample">Sample Data</Badge>
          </div>

          <h1 className="text-2xl font-black tracking-tight text-slate-900 sm:text-4xl">
            {program.name} in Nepal
          </h1>

          <p className="text-sm leading-relaxed text-slate-600 sm:text-base">{program.summary}</p>

          <div className="grid grid-cols-2 gap-3 border-t border-slate-100 pt-4 sm:grid-cols-4">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Course Duration
              </span>
              <p className="mt-1 text-base font-bold text-slate-900">4 Years (8 Sem)</p>
            </div>
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Average Est. Fee
              </span>
              <p className="mt-1 text-base font-bold text-indigo-600">
                {program.formattedAverageFee}
              </p>
            </div>
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Fee Range
              </span>
              <p className="mt-1 text-xs font-semibold text-slate-700">
                NPR {program.minFeeNpr.toLocaleString()} - {program.maxFeeNpr.toLocaleString()}
              </p>
            </div>
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Colleges Offering
              </span>
              <p className="mt-1 text-base font-bold text-slate-900">{colleges.length} Colleges</p>
            </div>
          </div>
        </div>
      </section>

      {/* Guide Content Grid */}
      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Main Column */}
        <div className="space-y-8 lg:col-span-2">
          {/* Eligibility & Admission Rules */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="flex items-center gap-2 text-xl font-bold tracking-tight text-slate-900">
              <BookOpen className="h-5 w-5 text-indigo-600" />
              Eligibility & Academic Criteria
            </h2>
            <div className="mt-4 space-y-2 rounded-xl border border-slate-100 bg-slate-50 p-4 text-xs">
              <p className="font-medium text-slate-800">
                <strong>Standard Requirement:</strong> {program.eligibilitySummary}
              </p>
              <p className="leading-relaxed text-slate-600">
                Applicants must have completed +2 Science / Management / Humanities or CTEVT diploma
                equivalent recognised by Tribhuvan University or respective governing bodies.
              </p>
            </div>
          </section>

          {/* Colleges Offering this Program */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold tracking-tight text-slate-900">
                Verified Colleges Offering {program.slug.toUpperCase()}
              </h2>
              <span className="text-xs font-medium text-slate-500">
                {colleges.length} Colleges Available
              </span>
            </div>

            <div className="space-y-4">
              {colleges.map((col) => (
                <div
                  key={col.collegeSlug}
                  className="flex flex-col justify-between gap-4 rounded-xl border border-slate-200 bg-slate-50/40 p-4 transition-colors hover:border-indigo-300 sm:flex-row"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <Badge variant="sample">Sample</Badge>
                      <Badge
                        variant={
                          col.collegeType === "GOVERNMENT"
                            ? "government"
                            : col.collegeType === "COMMUNITY"
                              ? "community"
                              : "private"
                        }
                      >
                        {col.collegeType}
                      </Badge>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 hover:text-indigo-600">
                      <Link href={`/colleges/${col.collegeSlug}`}>{col.collegeName}</Link>
                    </h3>
                    <div className="flex items-center gap-1 text-xs text-slate-500">
                      <MapPin className="h-3.5 w-3.5" />
                      {col.address}
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 pt-1 text-xs">
                      <span className="text-slate-600">
                        Intake Seats: <strong className="text-slate-900">{col.seats}</strong>
                      </span>
                      <span className="text-slate-600">
                        Shift: <strong className="text-slate-900">{col.shift}</strong>
                      </span>
                      <span className="text-slate-600">
                        Est. Total Fee:{" "}
                        <strong className="text-indigo-600">{col.formattedTotal}</strong>
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 sm:min-w-[120px] sm:flex-col sm:justify-center">
                    <Link
                      href={`/colleges/${col.collegeSlug}`}
                      className="flex h-9 items-center justify-center gap-1.5 rounded-lg bg-indigo-600 px-3 text-xs font-semibold text-white transition-colors hover:bg-indigo-700"
                    >
                      <span>Full Profile</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Career Pathways */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="flex items-center gap-2 text-xl font-bold tracking-tight text-slate-900">
              <Briefcase className="h-5 w-5 text-indigo-600" />
              Career Pathways & Job Roles in Nepal
            </h2>
            <div className="mt-4 grid grid-cols-1 gap-3 text-xs sm:grid-cols-2">
              <div className="rounded-lg border border-slate-100 bg-slate-50 p-3">
                <h4 className="font-bold text-slate-900">Software & Web Engineering</h4>
                <p className="mt-1 leading-relaxed text-slate-600">
                  Full-stack engineering, JavaScript/TypeScript ecosystem, Python, Go, building
                  scalable SaaS for domestic and offshore software firms.
                </p>
              </div>
              <div className="rounded-lg border border-slate-100 bg-slate-50 p-3">
                <h4 className="font-bold text-slate-900">Data Science & AI Systems</h4>
                <p className="mt-1 leading-relaxed text-slate-600">
                  Data analytics, machine learning pipelines, predictive modelling in fintech
                  companies and digital wallets.
                </p>
              </div>
              <div className="rounded-lg border border-slate-100 bg-slate-50 p-3">
                <h4 className="font-bold text-slate-900">Cloud Infrastructure & DevOps</h4>
                <p className="mt-1 leading-relaxed text-slate-600">
                  AWS, Docker, Kubernetes, CI/CD automation, ensuring 99.9% uptime for digital
                  enterprise products.
                </p>
              </div>
              <div className="rounded-lg border border-slate-100 bg-slate-50 p-3">
                <h4 className="font-bold text-slate-900">Cybersecurity & Networks</h4>
                <p className="mt-1 leading-relaxed text-slate-600">
                  Network administration, SOC analysis, penetration testing for banks, ISPs, and
                  government telecommunications.
                </p>
              </div>
            </div>
          </section>

          {/* Program FAQs */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="flex items-center gap-2 text-xl font-bold tracking-tight text-slate-900">
              <FaqIcon className="h-5 w-5 text-indigo-600" />
              Frequently Asked Questions
            </h2>
            <div className="mt-4 divide-y divide-slate-100 text-xs">
              {sampleFaqs.map((faq, idx) => (
                <div key={idx} className="space-y-1 py-3.5">
                  <h4 className="font-bold text-slate-900">{faq.q}</h4>
                  <p className="leading-relaxed text-slate-600">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          {/* Help Desk CTA Card */}
          <div className="rounded-2xl border border-indigo-200 bg-gradient-to-b from-indigo-50/80 to-white p-5 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white">
              <HelpCircle className="h-5 w-5" />
            </div>
            <h3 className="mt-3 text-base font-bold text-slate-900">
              Unsure if {program.slug.toUpperCase()} is right for you?
            </h3>
            <p className="mt-1 text-xs leading-relaxed text-slate-600">
              Talk with our unbiased student counsellor. We examine your +2 stream, math background,
              budget, and recommend the best fit.
            </p>
            <Link
              href="/help"
              className="mt-4 flex h-10 w-full items-center justify-center rounded-xl bg-indigo-600 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700"
            >
              Get Free Counselling
            </Link>
          </div>

          {/* Other Programs Navigation */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-slate-500">
              Explore Other Degrees
            </h3>
            <ul className="space-y-2 text-xs">
              {otherPrograms.map((op) => (
                <li key={op.slug}>
                  <Link
                    href={`/programs/${op.slug}`}
                    className="flex items-center justify-between rounded-lg p-2 text-slate-700 transition-colors hover:bg-slate-50 hover:text-indigo-600"
                  >
                    <span className="font-medium">{op.name.split(" (")[0]}</span>
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
