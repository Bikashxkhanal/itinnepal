import { NextRequest } from "next/server";
import { getSearchSuggestions } from "@/modules/search/search.service";
import { apiSuccess, apiError } from "@/modules/shared/api/response";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q") || "";

    const suggestions = await getSearchSuggestions(q);
    return apiSuccess(suggestions);
  } catch (error) {
    return apiError("SUGGEST_ERROR", (error as Error).message, undefined, 500);
  }
}
