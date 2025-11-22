// app/patients/new/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { AddPatientForm } from "@/components/add-patient-form";
import { Card } from "@/components/ui/card";

export default function NewPatientPage() {
  const router = useRouter();

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Add Patient</h1>

      <Card className="p-4">
        <AddPatientForm onSuccess={async (data) => {
          // call API to create
          await fetch("/api/patients", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(data),
          });
          router.push("/patients");
        }} />
      </Card>
    </div>
  );
}
