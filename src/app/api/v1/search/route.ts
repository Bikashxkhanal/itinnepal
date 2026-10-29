import { NextRequest } from "next/server";
import { z } from "zod";
import { searchColleges } from "@/modules/search/search.service";
import { apiSuccess, apiError } from "@/modules/shared/api/response";

const SearchParamsSchema = z.object({
  q: z.string().optional(),
  district: z.string().optional(),
  program: z.string().optional(),
  type: z.enum(["GOVERNMENT", "COMMUNITY", "PRIVATE"]).optional(),
  fee_min: z.coerce.number().optional(),
  fee_max: z.coerce.number().optional(),
  entrance: z
    .string()
    .optional()
    .transform((val) => {
      if (!val) return undefined;
      return val === "true" || val === "1" || val === "yes";
    }),
  sort: z.enum(["relevance", "fee_asc", "fee_desc", "seats", "verified"]).optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(10),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const parsed = SearchParamsSchema.safeParse(Object.fromEntries(searchParams));

    if (!parsed.success) {
      return apiError(
        "INVALID_QUERY_PARAMS",
        "Invalid search parameters",
        parsed.error.flatten(),
        422
      );
    }

    const { q, district, program, type, fee_min, fee_max, entrance, sort, page, limit } =
      parsed.data;

    const result = await searchColleges({
      q,
      district,
      program,
      type,
      feeMin: fee_min,
      feeMax: fee_max,
      entranceRequired: entrance,
      sortBy: sort,
      page,
      limit,
    });

    return apiSuccess(
      {
        items: result.items,
        facets: result.facets,
      },
      {
        page: result.page,
        limit: result.limit,
        total: result.total,
        totalPages: result.totalPages,
      }
    );
  } catch (error) {
    return apiError("SEARCH_ERROR", (error as Error).message, undefined, 500);
  }
}
