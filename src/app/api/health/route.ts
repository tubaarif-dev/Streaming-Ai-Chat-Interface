import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET() {
  return NextResponse.json(
    {
      status: "ok",
      timestamp: new Date().toISOString(),
      developer: "Tuba Arif",
      track: "Frontend AI Engineering",
      assignment: "FE-04 Capstone Skeleton",
      environment: process.env.NODE_ENV || "development",
    },
    { status: 200 }
  );
}