import { SAMPLE_COLLEGES_DATA, SAMPLE_ENTRANCE_EXAMS } from "../shared/db/sample-data";
import { NotFoundError } from "../shared/api/errors";

export interface EntranceRuleDisplay {
  entranceRequired: boolean;
  statusBadge: "ENTRANCE_REQUIRED" | "DIRECT_ADMISSION";
  headline: string;
  detail: string;
  exam: {
    name: string;
    body: string;
    website: string | null;
    pattern: string | null;
    passMarks: number | null;
    fullMarks: number | null;
    feeNpr: number | null;
  } | null;
  minGpa: number;
  eligibilityText: string;
  selectionMethod: "ENTRANCE" | "MERIT" | "INTERVIEW" | "MIXED";
  documentsChecklist: string[];
  admissionSteps: string[];
  cutoffLastYear?: number;
  academicYear: string;
  sourceUrl: string;
  verifiedAt: string;
}

/**
 * Evaluates and formats entrance rule display logic according to Doc 01 (FR-030) and Doc 09
 */
export function formatEntranceRuleDisplay(
  programSpec: {
    entranceSlug?: string;
    minGpa: number;
    eligibilityText: string;
    selectionMethod: "ENTRANCE" | "MERIT" | "INTERVIEW" | "MIXED";
    cutoffMarks?: number;
  },
  collegeWebsite: string
): EntranceRuleDisplay {
  const isEntranceRequired = Boolean(programSpec.entranceSlug);
  const exam = programSpec.entranceSlug
    ? SAMPLE_ENTRANCE_EXAMS.find((e) => e.slug === programSpec.entranceSlug)
    : null;

  const defaultDocuments = [
    "SEE Marksheet & Character Certificate",
    "+2 Transcript & Migration Certificate",
    "Entrance Exam Admit Card & Result Scorecard (if applicable)",
    "Nepali Citizenship or Official Birth Certificate",
    "Passport Size Photographs (3 copies)",
  ];

  const defaultSteps = isEntranceRequired
    ? [
        "Check GPA & subject eligibility criteria",
        `Submit central entrance examination application to ${exam?.body || "exam board"}`,
        "Download entrance exam admit card",
        "Appear in computer-based or written entrance examination",
        "Check merit list rankings published by university",
        "Visit college for priority selection and document verification",
        "Confirm admission and pay introductory semester tuition",
      ]
    : [
        "Check minimum GPA requirements (+2 marksheets)",
        "Submit direct college application online or at admissions office",
        "Attend college counselling interview",
        "Receive letter of merit admission",
        "Complete document verification and pay admission charges",
      ];

  if (isEntranceRequired && exam) {
    return {
      entranceRequired: true,
      statusBadge: "ENTRANCE_REQUIRED",
      headline: `Entrance exam required – conducted by ${exam.body}`,
      detail: `Candidates must pass the ${exam.name} (Full Marks: ${exam.fullMarks || 100}, Pass Marks: ${exam.passMarks || 40}) to qualify for admission.`,
      exam: {
        name: exam.name,
        body: exam.body,
        website: exam.website,
        pattern: exam.pattern,
        passMarks: exam.passMarks,
        fullMarks: exam.fullMarks,
        feeNpr: exam.feeNpr,
      },
      minGpa: programSpec.minGpa,
      eligibilityText: programSpec.eligibilityText,
      selectionMethod: programSpec.selectionMethod,
      documentsChecklist: defaultDocuments,
      admissionSteps: defaultSteps,
      cutoffLastYear: programSpec.cutoffMarks,
      academicYear: "2025/2026",
      sourceUrl: exam.website || `${collegeWebsite}/admission`,
      verifiedAt: "2026-01-15T00:00:00.000Z",
    };
  }

  // Direct admission / No entrance exam case (Doc 02, Doc 09)
  return {
    entranceRequired: false,
    statusBadge: "DIRECT_ADMISSION",
    headline: "No entrance exam – admission by SEE/+2 merit and college interview",
    detail:
      "Admission is granted based on academic results (+2 / SEE GPA) followed by personal faculty interview. No central entrance exam is required.",
    exam: null,
    minGpa: programSpec.minGpa,
    eligibilityText: programSpec.eligibilityText,
    selectionMethod: programSpec.selectionMethod,
    documentsChecklist: defaultDocuments,
    admissionSteps: defaultSteps,
    cutoffLastYear: programSpec.cutoffMarks,
    academicYear: "2025/2026",
    sourceUrl: `${collegeWebsite}/admission`,
    verifiedAt: "2026-01-15T00:00:00.000Z",
  };
}

export async function getAdmissionDetails(
  collegeSlug: string,
  programSlug: string
): Promise<EntranceRuleDisplay> {
  const college = SAMPLE_COLLEGES_DATA.find((c) => c.slug === collegeSlug);
  if (!college) {
    throw new NotFoundError(`College '${collegeSlug}' not found`);
  }

  const pSpec = college.programs.find((p) => p.programSlug === programSlug);
  if (!pSpec) {
    throw new NotFoundError(`Program '${programSlug}' not offered by college '${collegeSlug}'`);
  }

  return formatEntranceRuleDisplay(pSpec, college.website);
}

export async function getEntranceExamBySlug(examSlug: string) {
  const exam = SAMPLE_ENTRANCE_EXAMS.find((e) => e.slug === examSlug);
  if (!exam) {
    throw new NotFoundError(`Entrance exam '${examSlug}' not found`);
  }
  return exam;
}
