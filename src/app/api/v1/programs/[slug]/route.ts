import { NextRequest } from "next/server";
import { getProgramBySlug } from "@/modules/programs/programs.service";
import { apiSuccess, apiError } from "@/modules/shared/api/response";
import { NotFoundError } from "@/modules/shared/api/errors";

export async function GET(_request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const program = await getProgramBySlug(params.slug);
    return apiSuccess(program);
  } catch (error) {
    if (error instanceof NotFoundError) {
      return apiError("PROGRAM_NOT_FOUND", error.message, undefined, 404);
    }
    return apiError("PROGRAM_FETCH_ERROR", (error as Error).message, undefined, 500);
  }
}
