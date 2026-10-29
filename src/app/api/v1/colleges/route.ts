import { NextRequest } from "next/server";
import { getAllColleges } from "@/modules/colleges/colleges.service";
import { apiSuccess, apiError } from "@/modules/shared/api/response";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "20", 10);

    const result = await getAllColleges(page, limit);
    return apiSuccess(result.items, {
      page: result.page,
      limit: result.limit,
      total: result.total,
      totalPages: result.totalPages,
    });
  } catch (error) {
    return apiError("COLLEGES_FETCH_ERROR", (error as Error).message, undefined, 500);
  }
}
