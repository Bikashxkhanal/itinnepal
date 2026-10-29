import { NextRequest } from "next/server";
import { z } from "zod";
import { compareColleges } from "@/modules/compare/compare.service";
import { apiSuccess, apiError } from "@/modules/shared/api/response";
import { BadRequestError } from "@/modules/shared/api/errors";

const CompareSchema = z.object({
  collegeSlugs: z
    .array(z.string().min(1))
    .min(2, "At least 2 colleges required for comparison")
    .max(4, "A maximum of 4 colleges can be compared simultaneously"),
});

export async function POST(request: NextRequest) {
  try {
    const json = await request.json().catch(() => ({}));
    const parsed = CompareSchema.safeParse(json);

    if (!parsed.success) {
      return apiError(
        "INVALID_COMPARE_REQUEST",
        "Comparison requires 2 to 4 college identifiers",
        parsed.error.flatten(),
        422
      );
    }

    const result = await compareColleges(parsed.data.collegeSlugs);
    return apiSuccess(result);
  } catch (error) {
    if (error instanceof BadRequestError) {
      return apiError("BAD_REQUEST", error.message, undefined, 400);
    }
    return apiError("COMPARE_ERROR", (error as Error).message, undefined, 500);
  }
}
