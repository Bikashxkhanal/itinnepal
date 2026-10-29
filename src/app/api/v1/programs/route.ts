import { getAllPrograms } from "@/modules/programs/programs.service";
import { apiSuccess, apiError } from "@/modules/shared/api/response";

export async function GET() {
  try {
    const programs = await getAllPrograms();
    return apiSuccess(programs);
  } catch (error) {
    return apiError("PROGRAMS_FETCH_ERROR", (error as Error).message, undefined, 500);
  }
}
