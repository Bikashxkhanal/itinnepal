import { SAMPLE_COLLEGES_DATA, SAMPLE_PROGRAMS, SampleCollegeSpec } from "../shared/db/sample-data";
import { calculateFeeSummary, formatNprCurrency } from "../fees/fees.service";

export interface SearchQueryFilters {
  q?: string;
  district?: string;
  program?: string;
  type?: "GOVERNMENT" | "COMMUNITY" | "PRIVATE";
  feeMin?: number;
  feeMax?: number;
  entranceRequired?: boolean;
  sortBy?: "relevance" | "fee_asc" | "fee_desc" | "seats" | "verified";
  page?: number;
  limit?: number;
}

export interface SearchResultCollegeItem {
  id: string;
  name: string;
  slug: string;
  type: string;
  establishedYear: number | null;
  address: string;
  districtId: string;
  verifiedLevel: number;
  verifiedAt: string;
  isSample: boolean;
  programs: {
    slug: string;
    name: string;
    shift: string;
    seats: number;
    entranceRequired: boolean;
    estimatedTotalFee: number;
    formattedTotalFee: string;
    lastVerifiedAt: string;
    sourceUrl: string;
  }[];
  minFeeNpr: number;
  maxFeeNpr: number;
  totalSeats: number;
  matchScore?: number;
}

export interface SearchResultResponse {
  items: SearchResultCollegeItem[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  facets: {
    districts: { id: string; name: string; count: number }[];
    programs: { slug: string; name: string; count: number }[];
    types: { type: string; count: number }[];
  };
}

/**
 * Normalizes sample college specification into search result item
 */
function normalizeCollegeItem(spec: SampleCollegeSpec): SearchResultCollegeItem {
  const programs = spec.programs.map((p) => {
    const feeItemsTyped = p.feeItems.map((f) => ({
      ...f,
      academicYear: "2025/2026",
      sourceUrl: `${spec.website}/admission/fees-2025`,
      verifiedAt: new Date("2026-01-15"),
    }));
    const summary = calculateFeeSummary(feeItemsTyped);
    const progMeta = SAMPLE_PROGRAMS.find((sp) => sp.slug === p.programSlug);
    return {
      slug: p.programSlug,
      name: progMeta?.name || p.programSlug.toUpperCase(),
      shift: p.shift,
      seats: p.seats,
      entranceRequired: Boolean(p.entranceSlug),
      estimatedTotalFee: summary.estimatedTotalFee,
      formattedTotalFee: formatNprCurrency(summary.estimatedTotalFee),
      lastVerifiedAt: summary.lastVerifiedAt,
      sourceUrl: summary.sourceUrl,
    };
  });

  const allFees = programs.map((p) => p.estimatedTotalFee);
  const minFeeNpr = allFees.length > 0 ? Math.min(...allFees) : 0;
  const maxFeeNpr = allFees.length > 0 ? Math.max(...allFees) : 0;
  const totalSeats = programs.reduce((acc, p) => acc + p.seats, 0);

  return {
    id: spec.slug,
    name: spec.name,
    slug: spec.slug,
    type: spec.type,
    establishedYear: spec.establishedYear,
    address: spec.address,
    districtId: spec.districtId,
    verifiedLevel: 2,
    verifiedAt: "2026-01-15T00:00:00.000Z",
    isSample: true,
    programs,
    minFeeNpr,
    maxFeeNpr,
    totalSeats,
  };
}

/**
 * Searches colleges using full-text and faceted filters
 */
export async function searchColleges(filters: SearchQueryFilters): Promise<SearchResultResponse> {
  const page = Math.max(1, filters.page || 1);
  const limit = Math.min(50, Math.max(1, filters.limit || 10));

  const allItems: SearchResultCollegeItem[] = SAMPLE_COLLEGES_DATA.map(normalizeCollegeItem);

  // Apply filters
  const filtered = allItems.filter((item) => {
    // 1. Text Search across name, address, programs, description
    if (filters.q && filters.q.trim().length > 0) {
      const qLower = filters.q.toLowerCase().trim();
      const inName = item.name.toLowerCase().includes(qLower);
      const inAddress = item.address.toLowerCase().includes(qLower);
      const inDistrict = item.districtId.toLowerCase().includes(qLower);
      const inPrograms = item.programs.some(
        (p) => p.name.toLowerCase().includes(qLower) || p.slug.toLowerCase().includes(qLower)
      );

      if (!inName && !inAddress && !inDistrict && !inPrograms) {
        return false;
      }
    }

    // 2. District filter
    if (filters.district && filters.district.trim().length > 0) {
      if (item.districtId.toLowerCase() !== filters.district.toLowerCase().trim()) {
        return false;
      }
    }

    // 3. College Type filter
    if (filters.type) {
      if (item.type !== filters.type) {
        return false;
      }
    }

    // 4. Program filter
    if (filters.program && filters.program.trim().length > 0) {
      const hasProgram = item.programs.some(
        (p) => p.slug.toLowerCase() === filters.program?.toLowerCase().trim()
      );
      if (!hasProgram) {
        return false;
      }
    }

    // 5. Entrance filter
    if (typeof filters.entranceRequired === "boolean") {
      const matchesEntrance = item.programs.some(
        (p) => p.entranceRequired === filters.entranceRequired
      );
      if (!matchesEntrance) {
        return false;
      }
    }

    // 6. Fee Range filter
    if (typeof filters.feeMin === "number") {
      if (item.maxFeeNpr < filters.feeMin) {
        return false;
      }
    }
    if (typeof filters.feeMax === "number") {
      if (item.minFeeNpr > filters.feeMax) {
        return false;
      }
    }

    return true;
  });

  // Sort
  if (filters.sortBy === "fee_asc") {
    filtered.sort((a, b) => a.minFeeNpr - b.minFeeNpr);
  } else if (filters.sortBy === "fee_desc") {
    filtered.sort((a, b) => b.maxFeeNpr - a.maxFeeNpr);
  } else if (filters.sortBy === "seats") {
    filtered.sort((a, b) => b.totalSeats - a.totalSeats);
  } else if (filters.sortBy === "verified") {
    filtered.sort((a, b) => new Date(b.verifiedAt).getTime() - new Date(a.verifiedAt).getTime());
  } else {
    // Relevance: if query string exists, prioritize prefix/exact name matches
    if (filters.q) {
      const qLower = filters.q.toLowerCase().trim();
      filtered.sort((a, b) => {
        const aScore = a.name.toLowerCase().includes(qLower) ? 2 : 1;
        const bScore = b.name.toLowerCase().includes(qLower) ? 2 : 1;
        return bScore - aScore;
      });
    }
  }

  // Calculate Facets across all matching items
  const districtCounts = new Map<string, number>();
  const programCounts = new Map<string, number>();
  const typeCounts = new Map<string, number>();

  for (const item of allItems) {
    districtCounts.set(item.districtId, (districtCounts.get(item.districtId) || 0) + 1);
    typeCounts.set(item.type, (typeCounts.get(item.type) || 0) + 1);
    for (const prog of item.programs) {
      programCounts.set(prog.slug, (programCounts.get(prog.slug) || 0) + 1);
    }
  }

  const facets = {
    districts: Array.from(districtCounts.entries()).map(([id, count]) => ({
      id,
      name: id.charAt(0).toUpperCase() + id.slice(1),
      count,
    })),
    programs: Array.from(programCounts.entries()).map(([slug, count]) => {
      const pMeta = SAMPLE_PROGRAMS.find((p) => p.slug === slug);
      return {
        slug,
        name: pMeta?.name || slug.toUpperCase(),
        count,
      };
    }),
    types: Array.from(typeCounts.entries()).map(([type, count]) => ({
      type,
      count,
    })),
  };

  const total = filtered.length;
  const totalPages = Math.ceil(total / limit) || 1;
  const offset = (page - 1) * limit;
  const paginatedItems = filtered.slice(offset, offset + limit);

  return {
    items: paginatedItems,
    total,
    page,
    limit,
    totalPages,
    facets,
  };
}

/**
 * Search suggestion endpoint for instant search box dropdowns
 */
export async function getSearchSuggestions(query: string) {
  if (!query || query.trim().length === 0) {
    return { colleges: [], programs: [] };
  }
  const qLower = query.toLowerCase().trim();

  const matchingColleges = SAMPLE_COLLEGES_DATA.filter(
    (c) =>
      c.name.toLowerCase().includes(qLower) ||
      c.address.toLowerCase().includes(qLower) ||
      c.districtId.toLowerCase().includes(qLower)
  )
    .slice(0, 5)
    .map((c) => ({
      name: c.name,
      slug: c.slug,
      address: c.address,
      districtId: c.districtId,
    }));

  const matchingPrograms = SAMPLE_PROGRAMS.filter(
    (p) => p.name.toLowerCase().includes(qLower) || p.slug.toLowerCase().includes(qLower)
  )
    .slice(0, 4)
    .map((p) => ({
      name: p.name,
      slug: p.slug,
      category: p.category,
    }));

  return {
    colleges: matchingColleges,
    programs: matchingPrograms,
  };
}
