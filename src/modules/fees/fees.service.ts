export interface FeeLineItem {
  id?: string;
  label: string;
  type: "ADMISSION" | "SEMESTER" | "ANNUAL" | "LAB" | "EXAM" | "OTHER";
  amountNpr: number;
  frequency: "one_time" | "per_semester" | "annual";
  notes?: string | null;
  academicYear: string;
  sourceUrl: string;
  verifiedAt: Date | string;
}

export interface FeeCalculationSummary {
  admissionFee: number;
  perSemesterFee: number;
  estimatedTotalFee: number;
  annualRecurringFee: number;
  otherCharges: number;
  semestersCount: number;
  academicYear: string;
  sourceUrl: string;
  lastVerifiedAt: string;
}

/**
 * Calculates the total estimated program cost from itemized fee line items.
 * Normalizes one-time, per-semester, and annual fees across standard duration.
 */
export function calculateFeeSummary(
  items: FeeLineItem[],
  durationMonths: number = 48
): FeeCalculationSummary {
  const semestersCount = Math.max(1, Math.round(durationMonths / 6));
  const yearsCount = Math.max(1, Math.round(durationMonths / 12));

  let admissionFee = 0;
  let perSemesterFee = 0;
  let annualRecurringFee = 0;
  let otherCharges = 0;

  let latestVerifiedAt = "";
  let primaryAcademicYear = "2025/2026";
  let primarySourceUrl = "";

  for (const item of items) {
    if (item.verifiedAt) {
      const itemDateStr = new Date(item.verifiedAt).toISOString();
      if (!latestVerifiedAt || itemDateStr > latestVerifiedAt) {
        latestVerifiedAt = itemDateStr;
      }
    }
    if (item.academicYear) {
      primaryAcademicYear = item.academicYear;
    }
    if (item.sourceUrl) {
      primarySourceUrl = item.sourceUrl;
    }

    if (item.type === "ADMISSION") {
      admissionFee += item.amountNpr;
    } else if (item.frequency === "per_semester" || item.type === "SEMESTER") {
      perSemesterFee += item.amountNpr;
    } else if (item.frequency === "annual" || item.type === "ANNUAL") {
      annualRecurringFee += item.amountNpr;
    } else {
      otherCharges += item.amountNpr;
    }
  }

  const estimatedTotalFee =
    admissionFee + perSemesterFee * semestersCount + annualRecurringFee * yearsCount + otherCharges;

  return {
    admissionFee,
    perSemesterFee,
    estimatedTotalFee,
    annualRecurringFee,
    otherCharges,
    semestersCount,
    academicYear: primaryAcademicYear,
    sourceUrl: primarySourceUrl,
    lastVerifiedAt: latestVerifiedAt,
  };
}

/**
 * Formats a currency amount into Nepali format (e.g., NPR 3,50,000)
 */
export function formatNprCurrency(amount: number): string {
  if (isNaN(amount)) return "NPR 0";
  const numStr = Math.round(amount).toString();
  if (numStr.length <= 3) {
    return `NPR ${numStr}`;
  }

  const lastThree = numStr.substring(numStr.length - 3);
  const otherNumbers = numStr.substring(0, numStr.length - 3);
  const formattedOther = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",");

  return `NPR ${formattedOther},${lastThree}`;
}
