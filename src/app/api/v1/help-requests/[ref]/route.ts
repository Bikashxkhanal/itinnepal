import { NextRequest } from "next/server";
import { z } from "zod";
import { getHelpRequestByRef, updateHelpRequestStatus } from "@/modules/help/help.service";
import { apiSuccess, apiError } from "@/modules/shared/api/response";
import { AppError, NotFoundError } from "@/modules/shared/api/errors";

export async function GET(_request: NextRequest, { params }: { params: { ref: string } }) {
  try {
    const item = await getHelpRequestByRef(params.ref);
    return apiSuccess({
      refCode: item.refCode,
      name: item.name,
      status: item.status,
      channelPref: item.channelPref,
      contactTime: item.contactTime,
      createdAt: item.createdAt,
      resolvedAt: item.resolvedAt,
      notes: item.notes,
    });
  } catch (error) {
    if (error instanceof NotFoundError) {
      return apiError("NOT_FOUND", error.message, undefined, 404);
    }
    return apiError("FETCH_ERROR", (error as Error).message, undefined, 500);
  }
}

const UpdateStatusSchema = z.object({
  status: z.enum(["NEW", "ASSIGNED", "CONTACTED", "FOLLOW_UP", "RESOLVED", "CLOSED"]),
  note: z.string().optional(),
  assignedTo: z.string().optional(),
});

export async function PATCH(request: NextRequest, { params }: { params: { ref: string } }) {
  try {
    const json = await request.json().catch(() => ({}));
    const parse = UpdateStatusSchema.safeParse(json);
    if (!parse.success) {
      return apiError(
        "INVALID_UPDATE",
        "Invalid status update request",
        parse.error.flatten(),
        422
      );
    }

    const updated = await updateHelpRequestStatus(
      params.ref,
      parse.data.status,
      parse.data.note,
      parse.data.assignedTo
    );

    return apiSuccess(updated);
  } catch (error) {
    if (error instanceof AppError) {
      return apiError(error.code, error.message, undefined, error.status);
    }
    return apiError("UPDATE_ERROR", (error as Error).message, undefined, 500);
  }
}
