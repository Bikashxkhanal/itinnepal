import { describe, it, expect } from "vitest";
import { calculateFeeSummary, formatNprCurrency, FeeLineItem } from "@/modules/fees/fees.service";

describe("Fee Calculation Service", () => {
  it("calculates total estimated program fee from itemized breakdown", () => {
    const items: FeeLineItem[] = [
      {
        label: "Admission & Registration Fee",
        type: "ADMISSION",
        amountNpr: 35000,
        frequency: "one_time",
        academicYear: "2025/2026",
        sourceUrl: "https://example.edu.np/fees-2025",
        verifiedAt: new Date("2026-01-15"),
      },
      {
        label: "Tuition & Lab Fee",
        type: "SEMESTER",
        amountNpr: 60000,
        frequency: "per_semester",
        academicYear: "2025/2026",
        sourceUrl: "https://example.edu.np/fees-2025",
        verifiedAt: new Date("2026-01-15"),
      },
      {
        label: "Annual University Examination & Council Fee",
        type: "ANNUAL",
        amountNpr: 8000,
        frequency: "annual",
        academicYear: "2025/2026",
        sourceUrl: "https://example.edu.np/fees-2025",
        verifiedAt: new Date("2026-01-15"),
      },
      {
        label: "Refundable Security Deposit",
        type: "OTHER",
        amountNpr: 10000,
        frequency: "one_time",
        academicYear: "2025/2026",
        sourceUrl: "https://example.edu.np/fees-2025",
        verifiedAt: new Date("2026-01-15"),
      },
    ];

    // Duration 48 months = 8 semesters, 4 years
    const summary = calculateFeeSummary(items, 48);

    // Expected:
    // Admission: 35,000
    // Semester: 60,000 * 8 = 480,000
    // Annual: 8,000 * 4 = 32,000
    // Other: 10,000
    // Total = 35000 + 480000 + 32000 + 10000 = 557,000
    expect(summary.admissionFee).toBe(35000);
    expect(summary.perSemesterFee).toBe(60000);
    expect(summary.annualRecurringFee).toBe(8000);
    expect(summary.otherCharges).toBe(10000);
    expect(summary.estimatedTotalFee).toBe(557000);
    expect(summary.semestersCount).toBe(8);
    expect(summary.academicYear).toBe("2025/2026");
    expect(summary.sourceUrl).toBe("https://example.edu.np/fees-2025");
  });

  it("formats NPR currency in standard Nepali numbering system", () => {
    expect(formatNprCurrency(350000)).toBe("NPR 3,50,000");
    expect(formatNprCurrency(1250000)).toBe("NPR 12,50,000");
    expect(formatNprCurrency(75000)).toBe("NPR 75,000");
    expect(formatNprCurrency(500)).toBe("NPR 500");
  });
});
