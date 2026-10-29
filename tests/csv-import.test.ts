import { describe, it, expect } from "vitest";
import { validateCollegeCsvRows } from "@/modules/colleges/services/csv-validator";

describe("College CSV Import Validation", () => {
  it("accepts valid college rows with source_url, verified_at, and academic_year", () => {
    const validRows = [
      {
        name: "[Sample] Sagarmatha College of Science and Technology",
        type: "PRIVATE",
        address: "Sanepa, Lalitpur",
        district_id: "lalitpur",
        academic_year: "2025/2026",
        source_url: "https://scst.edu.np/admission",
        verified_at: "2026-01-10",
      },
    ];

    const result = validateCollegeCsvRows(validRows);
    expect(result.validRows.length).toBe(1);
    expect(result.rejectedRows.length).toBe(0);
    expect(result.validRows[0]?.name).toBe("[Sample] Sagarmatha College of Science and Technology");
  });

  it("strictly rejects rows missing source_url", () => {
    const invalidRows = [
      {
        name: "[Sample] Test College Missing Source",
        type: "PRIVATE",
        address: "Kathmandu",
        district_id: "kathmandu",
        academic_year: "2025/2026",
        source_url: "", // MISSING
        verified_at: "2026-01-10",
      },
    ];

    const result = validateCollegeCsvRows(invalidRows);
    expect(result.validRows.length).toBe(0);
    expect(result.rejectedRows.length).toBe(1);
    expect(result.rejectedRows[0]?.errors.some((e) => e.includes("source_url"))).toBe(true);
  });

  it("strictly rejects rows missing verified_at date or with invalid date format", () => {
    const invalidRows = [
      {
        name: "[Sample] Test College Missing Date",
        type: "COMMUNITY",
        address: "Bhaktapur",
        district_id: "bhaktapur",
        academic_year: "2025/2026",
        source_url: "https://example.edu.np",
        verified_at: "", // MISSING
      },
      {
        name: "[Sample] Test College Bad Date",
        type: "COMMUNITY",
        address: "Bhaktapur",
        district_id: "bhaktapur",
        academic_year: "2025/2026",
        source_url: "https://example.edu.np",
        verified_at: "not-a-valid-date", // INVALID
      },
    ];

    const result = validateCollegeCsvRows(invalidRows);
    expect(result.validRows.length).toBe(0);
    expect(result.rejectedRows.length).toBe(2);
    expect(result.rejectedRows[0]?.errors.some((e) => e.includes("verified_at"))).toBe(true);
    expect(result.rejectedRows[1]?.errors.some((e) => e.includes("verified_at"))).toBe(true);
  });

  it("strictly rejects rows missing academic_year", () => {
    const invalidRows = [
      {
        name: "[Sample] Test College Missing Academic Year",
        type: "GOVERNMENT",
        address: "Kaski",
        district_id: "kaski",
        academic_year: "", // MISSING
        source_url: "https://example.edu.np",
        verified_at: "2026-01-10",
      },
    ];

    const result = validateCollegeCsvRows(invalidRows);
    expect(result.validRows.length).toBe(0);
    expect(result.rejectedRows.length).toBe(1);
    expect(result.rejectedRows[0]?.errors.some((e) => e.includes("academic_year"))).toBe(true);
  });
});
