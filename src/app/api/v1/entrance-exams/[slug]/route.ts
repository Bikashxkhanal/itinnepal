import { NextRequest } from "next/server";
import { getEntranceExamBySlug } from "@/modules/admissions/admissions.service";
import { apiSuccess, apiError } from "@/modules/shared/api/response";
import { NotFoundError } from "@/modules/shared/api/errors";

export async function GET(_request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const exam = await getEntranceExamBySlug(params.slug);
    return apiSuccess(exam);
  } catch (error) {
    if (error instanceof NotFoundError) {
      return apiError("ENTRANCE_EXAM_NOT_FOUND", error.message, undefined, 404);
    }
    return apiError("ENTRANCE_EXAM_ERROR", (error as Error).message, undefined, 500);
  }
}
