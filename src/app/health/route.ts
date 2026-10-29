import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    {
      status: "ok",
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      service: "itinnepal-web",
      environment: process.env.NODE_ENV || "development",
    },
    { status: 200 }
  );
}
