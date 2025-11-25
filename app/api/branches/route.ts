import { NextResponse } from "next/server";

export async function GET() {
  const branches = [
    { id: 1, name: "Boston Medical Center" },
    { id: 2, name: "Cambridge Health Clinic" },
    { id: 3, name: "Somerville Care Center" },
  ];

  return NextResponse.json(branches);
}