import { NextRequest } from "next/server";
import { getCollegesOfferingProgram } from "@/modules/programs/programs.service";
import { apiSuccess, apiError } from "@/modules/shared/api/response";
import { NotFoundError } from "@/modules/shared/api/errors";

export async function GET(_request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const result = await getCollegesOfferingProgram(params.slug);
    return apiSuccess(result);
  } catch (error) {
    if (error instanceof NotFoundError) {
      return apiError("PROGRAM_NOT_FOUND", error.message, undefined, 404);
    }
    return apiError("PROGRAM_COLLEGES_ERROR", (error as Error).message, undefined, 500);
  }
}
