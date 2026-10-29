import { SAMPLE_PROGRAMS, SAMPLE_COLLEGES_DATA, SampleProgramData } from "../shared/db/sample-data";
import { NotFoundError } from "../shared/api/errors";
import { calculateFeeSummary, formatNprCurrency } from "../fees/fees.service";

export interface ProgramDetailResponse extends SampleProgramData {
  totalCollegesCount: number;
  averageFeeNpr: number;
  formattedAverageFee: string;
  minFeeNpr: number;
  maxFeeNpr: number;
  eligibilitySummary: string;
}

export async function getAllPrograms(): Promise<ProgramDetailResponse[]> {
  return SAMPLE_PROGRAMS.map((prog) => {
    // Find all colleges offering this program
    const offeringColleges = SAMPLE_COLLEGES_DATA.filter((col) =>
      col.programs.some((p) => p.programSlug === prog.slug)
    );

    const feeTotals: number[] = [];
    for (const col of offeringColleges) {
      const pSpec = col.programs.find((p) => p.programSlug === prog.slug);
      if (pSpec) {
        const feeTyped = pSpec.feeItems.map((f) => ({
          ...f,
          academicYear: "2025/2026",
          sourceUrl: `${col.website}/admission/fees-2025`,
          verifiedAt: new Date("2026-01-15"),
        }));
        const summary = calculateFeeSummary(feeTyped, prog.durationMonths);
        feeTotals.push(summary.estimatedTotalFee);
      }
    }

    const minFee = feeTotals.length > 0 ? Math.min(...feeTotals) : 0;
    const maxFee = feeTotals.length > 0 ? Math.max(...feeTotals) : 0;
    const avgFee =
      feeTotals.length > 0
        ? Math.round(feeTotals.reduce((a, b) => a + b, 0) / feeTotals.length)
        : 0;

    let eligibilitySummary = "Minimum 2.0 GPA in +2 or equivalent";
    if (prog.slug === "bsc-csit") {
      eligibilitySummary = "+2 Science with Physics & Math (100 marks each) and TU IOST Entrance";
    } else if (prog.slug === "be-computer") {
      eligibilitySummary = "+2 Science with minimum 45% (or Grade C) in PCM and IOE Entrance";
    } else if (prog.slug === "bca") {
      eligibilitySummary =
        "+2 in Science, Management, or Humanities with minimum D+ / C in all subjects";
    }

    return {
      ...prog,
      totalCollegesCount: offeringColleges.length,
      averageFeeNpr: avgFee,
      formattedAverageFee: formatNprCurrency(avgFee),
      minFeeNpr: minFee,
      maxFeeNpr: maxFee,
      eligibilitySummary,
    };
  });
}

export async function getProgramBySlug(slug: string): Promise<ProgramDetailResponse> {
  const all = await getAllPrograms();
  const prog = all.find((p) => p.slug === slug);
  if (!prog) {
    throw new NotFoundError(`Program with slug '${slug}' not found`);
  }
  return prog;
}

export async function getCollegesOfferingProgram(slug: string) {
  const prog = await getProgramBySlug(slug);
  const colleges = SAMPLE_COLLEGES_DATA.filter((col) =>
    col.programs.some((p) => p.programSlug === prog.slug)
  ).map((col) => {
    const pSpec = col.programs.find((p) => p.programSlug === prog.slug);
    const feeItemsTyped = (pSpec?.feeItems || []).map((f) => ({
      ...f,
      academicYear: "2025/2026",
      sourceUrl: `${col.website}/admission/fees-2025`,
      verifiedAt: new Date("2026-01-15"),
    }));
    const feeSum = calculateFeeSummary(feeItemsTyped, prog.durationMonths);

    return {
      collegeName: col.name,
      collegeSlug: col.slug,
      collegeType: col.type,
      address: col.address,
      districtId: col.districtId,
      shift: pSpec?.shift || "Morning",
      seats: pSpec?.seats || 48,
      entranceRequired: Boolean(pSpec?.entranceSlug),
      estimatedTotalFee: feeSum.estimatedTotalFee,
      formattedTotal: formatNprCurrency(feeSum.estimatedTotalFee),
      minGpa: pSpec?.minGpa || 2.0,
      eligibilityText: pSpec?.eligibilityText || "",
      sourceUrl: feeSum.sourceUrl,
      verifiedAt: feeSum.lastVerifiedAt,
      isSample: true,
    };
  });

  return {
    program: prog,
    colleges,
  };
}
