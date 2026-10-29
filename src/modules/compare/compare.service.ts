import { SAMPLE_COLLEGES_DATA } from "../shared/db/sample-data";
import { buildCollegeDetail, CollegeDetailResponse } from "../colleges/colleges.service";
import { BadRequestError } from "../shared/api/errors";

export interface CompareRequest {
  collegeSlugs: string[];
}

export interface CompareMetricRow {
  key: string;
  label: string;
  values: Record<string, string | number | boolean | null>;
  isDifferent: boolean;
}

export interface CompareResultResponse {
  colleges: CollegeDetailResponse[];
  metrics: CompareMetricRow[];
}

export async function compareColleges(slugs: string[]): Promise<CompareResultResponse> {
  const uniqueSlugs = Array.from(new Set(slugs.filter(Boolean)));

  if (uniqueSlugs.length < 2) {
    throw new BadRequestError("Please select at least 2 colleges to compare.");
  }
  if (uniqueSlugs.length > 4) {
    throw new BadRequestError("You can compare a maximum of 4 colleges at a time.");
  }

  const colleges: CollegeDetailResponse[] = [];
  for (const s of uniqueSlugs) {
    const spec = SAMPLE_COLLEGES_DATA.find((c) => c.slug === s);
    if (spec) {
      colleges.push(buildCollegeDetail(spec));
    }
  }

  if (colleges.length < 2) {
    throw new BadRequestError("At least 2 valid colleges are required for comparison.");
  }

  // Build side-by-side metric rows
  const metrics: CompareMetricRow[] = [
    {
      key: "type",
      label: "College Type",
      values: {},
      isDifferent: false,
    },
    {
      key: "affiliation",
      label: "University Affiliation",
      values: {},
      isDifferent: false,
    },
    {
      key: "location",
      label: "District / Location",
      values: {},
      isDifferent: false,
    },
    {
      key: "programs",
      label: "IT Programs Offered",
      values: {},
      isDifferent: false,
    },
    {
      key: "fee_range",
      label: "Estimated Fee Range",
      values: {},
      isDifferent: false,
    },
    {
      key: "entrance_req",
      label: "Entrance Exam Required",
      values: {},
      isDifferent: false,
    },
    {
      key: "seats",
      label: "Total Intake Seats",
      values: {},
      isDifferent: false,
    },
    {
      key: "pass_rate",
      label: "Average Pass Rate",
      values: {},
      isDifferent: false,
    },
    {
      key: "alumni_placement",
      label: "Graduate Placement Rate",
      values: {},
      isDifferent: false,
    },
  ];

  for (const col of colleges) {
    const cid = col.slug;
    const allFees = col.programs.map((p) => p.feeSummary.estimatedTotalFee);
    const minFee = allFees.length > 0 ? Math.min(...allFees) : 0;
    const maxFee = allFees.length > 0 ? Math.max(...allFees) : 0;
    const feeStr = `NPR ${minFee.toLocaleString()} - ${maxFee.toLocaleString()}`;

    const totalSeats = col.programs.reduce((acc, p) => acc + p.seats, 0);
    const anyEntrance = col.programs.some((p) => Boolean(p.entranceExam));
    const passRates = col.programs.map((p) => p.enrollment.passRate);
    const avgPass =
      passRates.length > 0
        ? `${Math.round(passRates.reduce((a, b) => a + b, 0) / passRates.length)}%`
        : "N/A";

    const placements = col.programs
      .map((p) => p.alumniOutcome?.placedPct)
      .filter((p): p is number => typeof p === "number");
    const avgPlacement =
      placements.length > 0
        ? `${Math.round(placements.reduce((a, b) => a + b, 0) / placements.length)}%`
        : "85% (Sample)";

    metrics[0]!.values[cid] = col.type;
    metrics[1]!.values[cid] = col.university?.name || "Independent";
    metrics[2]!.values[cid] = `${col.address} (${col.districtId})`;
    metrics[3]!.values[cid] = col.programs.map((p) => p.name.split(" ")[0]).join(", ");
    metrics[4]!.values[cid] = feeStr;
    metrics[5]!.values[cid] = anyEntrance ? "Yes (Mandatory)" : "Direct / Merit";
    metrics[6]!.values[cid] = `${totalSeats} seats`;
    metrics[7]!.values[cid] = avgPass;
    metrics[8]!.values[cid] = avgPlacement;
  }

  // Calculate isDifferent
  for (const row of metrics) {
    const vals = Object.values(row.values);
    const first = vals[0];
    row.isDifferent = vals.some((v) => v !== first);
  }

  return {
    colleges,
    metrics,
  };
}
