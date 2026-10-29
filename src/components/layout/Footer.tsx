import React from "react";
import Link from "next/link";
import { GraduationCap, ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-900 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Col 1: Brand & Mission */}
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-500 text-white">
                <GraduationCap className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                ITin<span className="text-indigo-400">Nepal</span>
              </span>
            </Link>
            <p className="text-xs leading-relaxed text-slate-400">
              Nepal&apos;s transparent discovery platform for IT colleges, degrees, fee line-items,
              and entrance processes.
            </p>
            <div className="inline-flex items-center gap-1.5 rounded-md bg-slate-800 px-2.5 py-1 text-xs text-amber-300">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Phase 0/1 Demo – Sample Data</span>
            </div>
          </div>

          {/* Col 2: Programs */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              IT Programs
            </h3>
            <ul className="mt-4 space-y-2 text-xs">
              <li>
                <Link href="/programs/bsc-csit" className="transition-colors hover:text-white">
                  BSc CSIT Colleges
                </Link>
              </li>
              <li>
                <Link href="/programs/bit" className="transition-colors hover:text-white">
                  BIT (Bachelor of IT)
                </Link>
              </li>
              <li>
                <Link href="/programs/bca" className="transition-colors hover:text-white">
                  BCA Colleges
                </Link>
              </li>
              <li>
                <Link href="/programs/be-computer" className="transition-colors hover:text-white">
                  BE Computer Engineering
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Popular Hubs */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Locations</h3>
            <ul className="mt-4 space-y-2 text-xs">
              <li>
                <Link
                  href="/colleges?district=kathmandu"
                  className="transition-colors hover:text-white"
                >
                  IT Colleges in Kathmandu
                </Link>
              </li>
              <li>
                <Link
                  href="/colleges?district=lalitpur"
                  className="transition-colors hover:text-white"
                >
                  IT Colleges in Lalitpur
                </Link>
              </li>
              <li>
                <Link
                  href="/colleges?district=bhaktapur"
                  className="transition-colors hover:text-white"
                >
                  IT Colleges in Bhaktapur
                </Link>
              </li>
              <li>
                <Link
                  href="/colleges?district=kaski"
                  className="transition-colors hover:text-white"
                >
                  IT Colleges in Pokhara
                </Link>
              </li>
              <li>
                <Link
                  href="/colleges?district=chitwan"
                  className="transition-colors hover:text-white"
                >
                  IT Colleges in Chitwan
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Guidance & Student Help */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Student Help
            </h3>
            <ul className="mt-4 space-y-2 text-xs">
              <li>
                <Link
                  href="/help"
                  className="font-medium text-indigo-400 transition-colors hover:text-white"
                >
                  Talk to a Free Counsellor
                </Link>
              </li>
              <li>
                <Link
                  href="/entrance/tu-iost-csit-entrance"
                  className="transition-colors hover:text-white"
                >
                  Entrance Exam Guides
                </Link>
              </li>
              <li>
                <Link href="/compare" className="transition-colors hover:text-white">
                  Compare Colleges Side-by-Side
                </Link>
              </li>
              <li>
                <a href="#cookie-settings" className="transition-colors hover:text-white">
                  Cookie Settings
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Mandatory Policy Disclaimer */}
        <div className="mt-10 border-t border-slate-800 pt-6">
          <p className="text-center text-xs leading-relaxed text-slate-400 sm:text-left">
            <strong className="text-slate-300">Disclaimer:</strong> Fee structures, seat numbers,
            cutoffs, and entrance examination schedules presented on ITinNepal are indicative
            estimates compiled from university circulars and official college publications. Every
            fee item and statistic shows a verified timestamp. Always verify exact terms with the
            college administration or university dean office before taking admission.
          </p>
          <div className="mt-4 flex flex-col items-center justify-between text-xs text-slate-500 sm:flex-row">
            <p>
              © {new Date().getFullYear()} ITinNepal Platform. All sample data explicitly labelled.
            </p>
            <p className="mt-2 sm:mt-0">Built for Nepali students and parents.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
