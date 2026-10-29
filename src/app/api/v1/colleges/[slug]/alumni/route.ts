import { NextRequest } from "next/server";
import { getCollegeBySlug } from "@/modules/colleges/colleges.service";
import { apiSuccess, apiError } from "@/modules/shared/api/response";
import { NotFoundError } from "@/modules/shared/api/errors";

export async function GET(_request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const college = await getCollegeBySlug(params.slug);
    return apiSuccess(college.notableAlumni);
  } catch (error) {
    if (error instanceof NotFoundError) {
      return apiError("COLLEGE_NOT_FOUND", error.message, undefined, 404);
    }
    return apiError("ALUMNI_FETCH_ERROR", (error as Error).message, undefined, 500);
  }
}
