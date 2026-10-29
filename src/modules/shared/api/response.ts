import { NextResponse } from "next/server";

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ApiSuccessEnvelope<T> {
  success: true;
  data: T;
  pagination?: PaginationMeta;
}

export interface ApiErrorEnvelope {
  success: false;
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
}

export function apiSuccess<T>(
  data: T,
  pagination?: PaginationMeta,
  status = 200
): NextResponse<ApiSuccessEnvelope<T>> {
  const body: ApiSuccessEnvelope<T> = {
    success: true,
    data,
  };
  if (pagination) {
    body.pagination = pagination;
  }
  return NextResponse.json(body, { status });
}

export function apiError(
  code: string,
  message: string,
  details?: unknown,
  status = 400
): NextResponse<ApiErrorEnvelope> {
  return NextResponse.json(
    {
      success: false,
      error: {
        code,
        message,
        details,
      },
    },
    { status }
  );
}
