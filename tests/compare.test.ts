import { describe, it, expect } from "vitest";
import { compareColleges } from "@/modules/compare/compare.service";

describe("College Comparison Engine", () => {
  it("compares 2 colleges and builds side-by-side metric comparison", async () => {
    const res = await compareColleges(["sample-sagarmatha-college", "sample-ascol-kathmandu"]);

    expect(res.colleges.length).toBe(2);
    expect(res.metrics.length).toBeGreaterThanOrEqual(8);

    // Difference check: Government vs Private
    const typeMetric = res.metrics.find((m) => m.key === "type");
    expect(typeMetric).toBeDefined();
    expect(typeMetric?.isDifferent).toBe(true);
    expect(typeMetric?.values["sample-sagarmatha-college"]).toBe("PRIVATE");
    expect(typeMetric?.values["sample-ascol-kathmandu"]).toBe("GOVERNMENT");
  });

  it("throws BadRequestError if fewer than 2 colleges are provided", async () => {
    await expect(compareColleges(["sample-sagarmatha-college"])).rejects.toThrow(
      "Please select at least 2 colleges to compare."
    );
  });

  it("throws BadRequestError if more than 4 colleges are provided", async () => {
    await expect(
      compareColleges([
        "sample-sagarmatha-college",
        "sample-ascol-kathmandu",
        "sample-patan-multiple-campus",
        "sample-deerwalk-institute",
        "sample-prime-college",
      ])
    ).rejects.toThrow("You can compare a maximum of 4 colleges at a time.");
  });
});
