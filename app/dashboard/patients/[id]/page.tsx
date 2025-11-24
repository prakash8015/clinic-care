// //2
// "use client";

// import { useRouter } from "next/navigation";
// import { useState, useEffect } from "react";

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

// import { EditPatientForm } from "@/components/edit-patient-form";
// import { ArrowLeft, Edit, Trash2 } from "lucide-react";

// interface Patient {
//   id: number;
//   firstName: string;
//   lastName: string;
//   email?: string;
//   phone?: string;
//   dateOfBirth?: string;
//   gender?: string;
//   address?: string;
// }

// function calculateAge(dob?: string) {
//   if (!dob) return "-";
//   const birth = new Date(dob);
//   const today = new Date();
//   let age = today.getFullYear() - birth.getFullYear();
//   const m = today.getMonth() - birth.getMonth();
//   if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
//   return age;
// }

// export default function PatientDetailsPage({ params }: { params: { id: string } }) {
//   const router = useRouter();
//   const [patient, setPatient] = useState<Patient | null>(null);
//   const [editOpen, setEditOpen] = useState(false);

//   // Fetch patient from localStorage (demo setup)
//   useEffect(() => {
//     const saved = localStorage.getItem("patients");
//     if (!saved) return;

//     const all = JSON.parse(saved);
//     const found = all.find((p: Patient) => p.id === Number(params.id));
//     setPatient(found || null);
//   }, [params.id]);

//   const handleDelete = () => {
//     const saved = localStorage.getItem("patients");
//     if (!saved) return;

//     const all = JSON.parse(saved);
//     const filtered = all.filter((p: Patient) => p.id !== Number(params.id));

//     localStorage.setItem("patients", JSON.stringify(filtered));

//     router.push("/patients");
//   };

//   const handleEdit = (updated: Patient) => {
//     const saved = localStorage.getItem("patients");
//     if (!saved) return;

//     const all = JSON.parse(saved);
//     const newList = all.map((p: Patient) =>
//       p.id === updated.id ? updated : p
//     );

//     localStorage.setItem("patients", JSON.stringify(newList));
//     setPatient(updated);
//     setEditOpen(false);
//   };

//   if (!patient) {
//     return (
//       <div className="p-6">
//         <Button variant="outline" onClick={() => router.push("/patients")}>
//           <ArrowLeft className="w-4 h-4 mr-2" />
//           Back
//         </Button>
//         <p className="mt-6 text-gray-500 text-lg">Patient not found.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 max-w-3xl mx-auto space-y-6">
//       {/* Back Button */}
//       <Button variant="outline" onClick={() => router.push("/patients")}>
//         <ArrowLeft className="w-4 h-4 mr-2" /> Back to Patients
//       </Button>

//       {/* Patient Card */}
//       <Card className="shadow-sm">
//         <CardHeader>
//           <CardTitle className="text-2xl font-bold">
//             {patient.firstName} {patient.lastName}
//           </CardTitle>
//         </CardHeader>

//         <CardContent className="space-y-4 text-gray-700">

//           <div>
//             <p className="font-semibold">Email:</p>
//             <p>{patient.email || "-"}</p>
//           </div>

//           <div>
//             <p className="font-semibold">Phone:</p>
//             <p>{patient.phone || "-"}</p>
//           </div>

//           <div>
//             <p className="font-semibold">Age:</p>
//             <p>{calculateAge(patient.dateOfBirth)}</p>
//           </div>

//           <div>
//             <p className="font-semibold">Gender:</p>
//             <p className="capitalize">{patient.gender || "-"}</p>
//           </div>

//           <div>
//             <p className="font-semibold">Address:</p>
//             <p>{patient.address || "-"}</p>
//           </div>

//           <div className="flex gap-3 pt-4">
//             <Button onClick={() => setEditOpen(true)}>
//               <Edit className="w-4 h-4 mr-2" /> Edit
//             </Button>

//             <Button variant="destructive" onClick={handleDelete}>
//               <Trash2 className="w-4 h-4 mr-2" /> Delete
//             </Button>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Edit Modal */}
//       <Dialog open={editOpen} onOpenChange={setEditOpen}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Edit Patient</DialogTitle>
//           </DialogHeader>

//           <EditPatientForm patient={patient} onSuccess={handleEdit} />


// // // app/patients/[id]/page.tsx
// // import { Card, CardContent } from "@/components/ui/card";

// // export default async function PatientDetails({ params }: { params: { id: string } }) {
// //   const id = params.id;
// //   // fetch single patient from API
// //   const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/api/patients/${id}`);
// //   const patient = await res.json();

// //   if (!patient || patient.error) {
// //     return (
// //       <div className="p-6 max-w-3xl mx-auto">
// //         <p className="text-destructive">Patient not found.</p>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="p-6 max-w-3xl mx-auto">
// //       <Card>
// //         <CardContent className="p-6">
// //           <h1 className="text-2xl font-semibold">{patient.firstName} {patient.lastName}</h1>
// //           <p className="text-sm text-muted mt-2">Email: {patient.email || "-"}</p>
// //           <p className="text-sm text-muted mt-1">Phone: {patient.phone || "-"}</p>
// //           <p className="text-sm text-muted mt-1">Gender: {patient.gender || "-"}</p>
// //           <p className="text-sm text-muted mt-1">DOB: {patient.dateOfBirth || "-"}</p>
// //           <p className="text-sm text-muted mt-1">Address: {patient.address || "-"}</p>
// //         </CardContent>
// //       </Card>
// //     </div>
// //   );
// // }
