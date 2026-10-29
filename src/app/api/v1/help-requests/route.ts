import { NextRequest } from "next/server";
import { HelpRequestSubmissionSchema } from "@/modules/help/help.schema";
import { createHelpRequest, listHelpRequests } from "@/modules/help/help.service";
import { apiSuccess, apiError } from "@/modules/shared/api/response";
import { AppError } from "@/modules/shared/api/errors";

export async function POST(request: NextRequest) {
  try {
    const json = await request.json().catch(() => ({}));
    const parseResult = HelpRequestSubmissionSchema.safeParse(json);

    if (!parseResult.success) {
      return apiError(
        "VALIDATION_ERROR",
        "Please fill all required help desk fields accurately.",
        parseResult.error.flatten(),
        422
      );
    }

    const clientIp =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "127.0.0.1";

    const created = await createHelpRequest(parseResult.data, clientIp);

    return apiSuccess(
      {
        refCode: created.refCode,
        status: created.status,
        name: created.name,
        message:
          "Help request received successfully. A student counsellor will contact you within 24 hours.",
      },
      undefined,
      201
    );
  } catch (error) {
    if (error instanceof AppError) {
      return apiError(error.code, error.message, error.details, error.status);
    }
    return apiError("HELP_REQUEST_ERROR", (error as Error).message, undefined, 500);
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") || undefined;
    const requests = await listHelpRequests(status);
    return apiSuccess(requests);
  } catch (error) {
    return apiError("FETCH_ERROR", (error as Error).message, undefined, 500);
  }
}
