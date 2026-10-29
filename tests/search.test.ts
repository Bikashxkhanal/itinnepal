import { describe, it, expect } from "vitest";
import { searchColleges, getSearchSuggestions } from "@/modules/search/search.service";

describe("Search Engine & Filter Logic", () => {
  it("searches colleges by keyword query", async () => {
    const res = await searchColleges({ q: "Sagarmatha" });
    expect(res.items.length).toBeGreaterThanOrEqual(1);
    expect(res.items[0]?.name).toContain("Sagarmatha");
  });

  it("filters colleges strictly by district", async () => {
    const res = await searchColleges({ district: "lalitpur" });
    expect(res.items.length).toBeGreaterThan(0);
    expect(res.items.every((c) => c.districtId === "lalitpur")).toBe(true);
  });

  it("filters colleges by program slug (e.g. bsc-csit)", async () => {
    const res = await searchColleges({ program: "bsc-csit" });
    expect(res.items.length).toBeGreaterThan(0);
    expect(res.items.every((c) => c.programs.some((p) => p.slug === "bsc-csit"))).toBe(true);
  });

  it("filters colleges by college type (GOVERNMENT)", async () => {
    const res = await searchColleges({ type: "GOVERNMENT" });
    expect(res.items.length).toBeGreaterThan(0);
    expect(res.items.every((c) => c.type === "GOVERNMENT")).toBe(true);
  });

  it("filters colleges by entrance requirement flag", async () => {
    const resEntrance = await searchColleges({ entranceRequired: true });
    expect(
      resEntrance.items.every((c) => c.programs.some((p) => p.entranceRequired === true))
    ).toBe(true);
  });

  it("filters colleges within fee budget range", async () => {
    const res = await searchColleges({ feeMax: 400000 });
    expect(res.items.length).toBeGreaterThan(0);
    expect(res.items.every((c) => c.minFeeNpr <= 400000)).toBe(true);
  });

  it("returns autosuggestions for partial queries", async () => {
    const suggestions = await getSearchSuggestions("Kath");
    expect(suggestions.colleges.length + suggestions.programs.length).toBeGreaterThan(0);
  });
});
