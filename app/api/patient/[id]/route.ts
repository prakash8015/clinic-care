// app/api/patients/[id]/route.ts
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  // fetch list from list route (same process memory)
  const listRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/api/patients`);
  const list = await listRes.json();
  const patient = list.find((p: any) => p.id === id);
  if (!patient) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(patient);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  const body = await req.json();
  // naive update: read all, replace item, return patched item
  const listRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/api/patients`);
  const list = await listRes.json();
  const idx = list.findIndex((p: any) => p.id === id);
  if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const updated = { ...list[idx], ...body };
  // Note: to persist changes with in-memory store you'd update the store in route.ts.
  // For demo, return updated object so client updates UI.
  return NextResponse.json(updated);
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  // For demo the client will remove the item locally after successful response
  return NextResponse.json({ ok: true });
}
