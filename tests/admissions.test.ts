import { describe, it, expect } from "vitest";
import { formatEntranceRuleDisplay } from "@/modules/admissions/admissions.service";

describe("Entrance Rule & Admission Display Logic", () => {
  it("formats display logic when entrance examination is required (FR-030)", () => {
    const display = formatEntranceRuleDisplay(
      {
        entranceSlug: "tu-iost-csit-entrance",
        minGpa: 2.0,
        eligibilityText: "+2 Science with minimum C in Physics and Mathematics",
        selectionMethod: "ENTRANCE",
        cutoffMarks: 62.0,
      },
      "https://example.sample.edu.np"
    );

    expect(display.entranceRequired).toBe(true);
    expect(display.statusBadge).toBe("ENTRANCE_REQUIRED");
    expect(display.headline).toContain("Entrance exam required – conducted by");
    expect(display.exam).toBeDefined();
    expect(display.exam?.name).toBe("TU IOST BSc CSIT Entrance Exam");
    expect(display.cutoffLastYear).toBe(62.0);
    expect(display.documentsChecklist.length).toBeGreaterThanOrEqual(4);
    expect(display.admissionSteps.length).toBeGreaterThanOrEqual(5);
  });

  it("formats display logic when no entrance is required (Direct Merit/Interview)", () => {
    const display = formatEntranceRuleDisplay(
      {
        entranceSlug: undefined, // NO entrance exam
        minGpa: 2.0,
        eligibilityText: "+2 in any discipline with minimum D+ in all subjects",
        selectionMethod: "MERIT",
      },
      "https://example.sample.edu.np"
    );

    expect(display.entranceRequired).toBe(false);
    expect(display.statusBadge).toBe("DIRECT_ADMISSION");
    expect(display.headline).toBe(
      "No entrance exam – admission by SEE/+2 merit and college interview"
    );
    expect(display.exam).toBeNull();
    expect(display.minGpa).toBe(2.0);
    expect(display.documentsChecklist).toContain("SEE Marksheet & Character Certificate");
    expect(display.admissionSteps.some((s) => s.includes("counselling interview"))).toBe(true);
  });
});
