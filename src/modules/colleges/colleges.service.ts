import {
  SAMPLE_COLLEGES_DATA,
  SAMPLE_PROGRAMS,
  SAMPLE_UNIVERSITIES,
  SAMPLE_ENTRANCE_EXAMS,
  SampleCollegeSpec,
} from "../shared/db/sample-data";
import { calculateFeeSummary, formatNprCurrency } from "../fees/fees.service";
import { NotFoundError } from "../shared/api/errors";

export interface CollegeDetailResponse {
  id: string;
  name: string;
  slug: string;
  type: string;
  establishedYear: number | null;
  description: string;
  address: string;
  districtId: string;
  provinceId: string;
  phone: string;
  email: string;
  website: string;
  logoUrl: string | null;
  verifiedLevel: number;
  verifiedAt: string;
  isSample: boolean;
  university: {
    name: string;
    slug: string;
    type: string;
    website: string | null;
  } | null;
  programs: {
    slug: string;
    name: string;
    level: string;
    durationMonths: number;
    shift: string;
    seats: number;
    minGpa: number;
    eligibilityText: string;
    selectionMethod: string;
    entranceExam: {
      name: string;
      body: string;
      website: string | null;
    } | null;
    feeSummary: {
      admissionFee: number;
      perSemesterFee: number;
      estimatedTotalFee: number;
      formattedTotal: string;
      academicYear: string;
      sourceUrl: string;
      lastVerifiedAt: string;
    };
    enrollment: {
      seats: number;
      enrolled: number;
      passRate: number;
      studentTeacherRatio: string;
    };
    cutoffMarks?: number;
    alumniOutcome?: {
      placedPct: number;
      medianSalaryNpr: number;
      topEmployers: string[];
    };
  }[];
  media: {
    category: string;
    url: string;
    altText: string;
    caption: string;
  }[];
  notableAlumni: {
    name: string;
    role: string;
    employer: string;
    batchYear: number;
    programSlug: string;
    testimonial: string;
  }[];
}

export function buildCollegeDetail(spec: SampleCollegeSpec): CollegeDetailResponse {
  const universityMeta = SAMPLE_UNIVERSITIES.find((u) => u.slug === spec.universitySlug);

  const programs = spec.programs.map((p) => {
    const progMeta = SAMPLE_PROGRAMS.find((sp) => sp.slug === p.programSlug);
    const examMeta = p.entranceSlug
      ? SAMPLE_ENTRANCE_EXAMS.find((e) => e.slug === p.entranceSlug)
      : null;

    const feeItemsTyped = p.feeItems.map((f) => ({
      ...f,
      academicYear: "2025/2026",
      sourceUrl: `${spec.website}/admission/fees-2025`,
      verifiedAt: new Date("2026-01-15"),
    }));
    const feeSum = calculateFeeSummary(feeItemsTyped);

    return {
      slug: p.programSlug,
      name: progMeta?.name || p.programSlug.toUpperCase(),
      level: progMeta?.level || "BACHELOR",
      durationMonths: progMeta?.durationMonths || 48,
      shift: p.shift,
      seats: p.seats,
      minGpa: p.minGpa,
      eligibilityText: p.eligibilityText,
      selectionMethod: p.selectionMethod,
      entranceExam: examMeta
        ? {
            name: examMeta.name,
            body: examMeta.body,
            website: examMeta.website,
          }
        : null,
      feeSummary: {
        admissionFee: feeSum.admissionFee,
        perSemesterFee: feeSum.perSemesterFee,
        estimatedTotalFee: feeSum.estimatedTotalFee,
        formattedTotal: formatNprCurrency(feeSum.estimatedTotalFee),
        academicYear: feeSum.academicYear,
        sourceUrl: feeSum.sourceUrl,
        lastVerifiedAt: feeSum.lastVerifiedAt,
      },
      enrollment: p.enrollment,
      cutoffMarks: p.cutoffMarks,
      alumniOutcome: p.alumniOutcome,
    };
  });

  const categories = ["campus", "labs", "library", "classrooms", "hostel"];
  const media = categories.map((cat) => ({
    category: cat,
    url: `/placeholder/${cat}.webp`,
    altText: `${spec.name} - ${cat} view [Sample]`,
    caption: `${cat.charAt(0).toUpperCase() + cat.slice(1)} facility at ${spec.name} (Sample Image)`,
  }));

  return {
    id: spec.slug,
    name: spec.name,
    slug: spec.slug,
    type: spec.type,
    establishedYear: spec.establishedYear,
    description: spec.description,
    address: spec.address,
    districtId: spec.districtId,
    provinceId: spec.provinceId,
    phone: spec.phone,
    email: spec.email,
    website: spec.website,
    logoUrl: `/placeholder/logo.webp`,
    verifiedLevel: 2,
    verifiedAt: "2026-01-15T00:00:00.000Z",
    isSample: true,
    university: universityMeta
      ? {
          name: universityMeta.name,
          slug: universityMeta.slug,
          type: universityMeta.type,
          website: universityMeta.website,
        }
      : null,
    programs,
    media,
    notableAlumni: spec.notableAlumni,
  };
}

export async function getCollegeBySlug(slug: string): Promise<CollegeDetailResponse> {
  const spec = SAMPLE_COLLEGES_DATA.find(
    (c) => c.slug === slug || c.slug.replace("sample-", "") === slug.replace("sample-", "")
  );

  if (!spec) {
    throw new NotFoundError(`College with slug '${slug}' not found`);
  }

  return buildCollegeDetail(spec);
}

export async function getAllColleges(page = 1, limit = 20) {
  const all = SAMPLE_COLLEGES_DATA.map(buildCollegeDetail);
  const total = all.length;
  const totalPages = Math.ceil(total / limit) || 1;
  const offset = (page - 1) * limit;

  return {
    items: all.slice(offset, offset + limit),
    total,
    page,
    limit,
    totalPages,
  };
}
