import { NextRequest } from "next/server";
import { getAdmissionDetails } from "@/modules/admissions/admissions.service";
import { apiSuccess, apiError } from "@/modules/shared/api/response";
import { NotFoundError } from "@/modules/shared/api/errors";

export async function GET(
  _request: NextRequest,
  { params }: { params: { slug: string; program: string } }
) {
  try {
    const admission = await getAdmissionDetails(params.slug, params.program);
    return apiSuccess(admission);
  } catch (error) {
    if (error instanceof NotFoundError) {
      return apiError("ADMISSION_DETAILS_NOT_FOUND", error.message, undefined, 404);
    }
    return apiError("ADMISSION_FETCH_ERROR", (error as Error).message, undefined, 500);
  }
}
