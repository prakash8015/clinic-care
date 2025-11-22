// app/api/patients/route.ts
import { NextResponse } from "next/server";

type Patient = {
  id: number;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  dateOfBirth?: string;
  gender?: string;
  address?: string;
  lastVisit?: string | null;
};

let STORE: Patient[] = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    phone: "1234567890",
    dateOfBirth: "1990-01-01",
    gender: "male",
    address: "123 Main St",
    lastVisit: "2024-07-01",
  },
  {
    id: 2,
    firstName: "Sarah",
    lastName: "Lee",
    email: "sarah@example.com",
    phone: "9876543210",
    dateOfBirth: "1996-05-10",
    gender: "female",
    address: "456 Oak Ave",
    lastVisit: "2024-06-01",
  },
];

export async function GET() {
  return NextResponse.json(STORE);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const id = STORE.length ? Math.max(...STORE.map((p) => p.id)) + 1 : 1;
    const newPatient: Patient = {
      id,
      ...body,
      lastVisit: body.lastVisit ?? null,
    };
    // put newest first
    STORE = [newPatient, ...STORE];
    return NextResponse.json(newPatient, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }
}
