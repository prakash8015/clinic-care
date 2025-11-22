


"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Plus, Edit, Trash2, Search, User } from "lucide-react";

type Patient = {
  id: number;
  name: string;
  age: number;
  gender: "male" | "female" | "other";
  contact: string;
};

const initialPatients: Patient[] = [
  { id: 1, name: "John Doe", age: 34, gender: "male", contact: "1234567890" },
  { id: 2, name: "Jane Smith", age: 28, gender: "female", contact: "9876543210" },
  { id: 3, name: "Alice Johnson", age: 42, gender: "female", contact: "5551234567" },
  { id: 4, name: "Bob Williams", age: 50, gender: "male", contact: "5559876543" },
];

function SmallHint({ children }: { children: React.ReactNode }) {
  return <p className="text-sm text-muted-foreground">{children}</p>;
}

function PatientForm({
  initial,
  onCancel,
  onSave,
  submitLabel = "Save",
}: {
  initial?: Partial<Patient>;
  onCancel: () => void;
  onSave: (data: Omit<Patient, "id">) => void;
  submitLabel?: string;
}) {
  const [name, setName] = useState(initial?.name ?? "");
  const [age, setAge] = useState<string>(initial?.age ? String(initial.age) : "");
  const [gender, setGender] = useState<Patient["gender"]>(initial?.gender ?? "male");
  const [contact, setContact] = useState(initial?.contact ?? "");

  const [errors, setErrors] = useState<{ [k: string]: string }>({});

  const validate = () => {
    const e: { [k: string]: string } = {};
    if (!name.trim()) e.name = "Name is required";
    const n = Number(age);
    if (!age || Number.isNaN(n) || n <= 0 || n > 120) e.age = "Enter a valid age (1–120)";
    if (!/^\d{7,15}$/.test(contact.replace(/\s+/g, ""))) e.contact = "Contact should be 7–15 digits";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev?: React.FormEvent) => {
    ev?.preventDefault();
    if (!validate()) return;
    onSave({ name: name.trim(), age: Number(age), gender, contact: contact.trim() });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label>Name</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" />
          {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
        </div>

        <div>
          <Label>Age</Label>
          <Input type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="e.g. 34" />
          {errors.age && <p className="text-xs text-red-500 mt-1">{errors.age}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label>Gender</Label>
          <Select value={gender} onValueChange={(v) => setGender(v as Patient["gender"])}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Contact</Label>
          <Input value={contact} onChange={(e) => setContact(e.target.value)} placeholder="Phone or contact" />
          {errors.contact && <p className="text-xs text-red-500 mt-1">{errors.contact}</p>}
        </div>
      </div>

      <div className="flex items-center justify-end gap-2">
        <Button variant="outline" type="button" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">{submitLabel}</Button>
      </div>
    </form>
  );
}

export default function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>(initialPatients);
  const [filter, setFilter] = useState("");
  const [genderFilter, setGenderFilter] = useState<"all" | Patient["gender"]>("all");

  // modals state
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editing, setEditing] = useState<Patient | null>(null);
  const [deleting, setDeleting] = useState<Patient | null>(null);

  const filtered = useMemo(() => {
    let list = patients;
    if (filter.trim()) {
      const t = filter.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(t) || p.contact.includes(t));
    }
    if (genderFilter !== "all") list = list.filter((p) => p.gender === genderFilter);
    return list;
  }, [patients, filter, genderFilter]);

  const addPatient = (data: Omit<Patient, "id">) => {
    const id = patients.length ? Math.max(...patients.map((p) => p.id)) + 1 : 1;
    const newPatient: Patient = { id, ...data };
    setPatients((s) => [newPatient, ...s]);
    setAddOpen(false);
  };

  const saveEdit = (data: Omit<Patient, "id">) => {
    if (!editing) return;
    setPatients((s) => s.map((p) => (p.id === editing.id ? { ...p, ...data } : p)));
    setEditing(null);
    setEditOpen(false);
  };

  const confirmDelete = () => {
    if (!deleting) return;
    setPatients((s) => s.filter((p) => p.id !== deleting.id));
    setDeleting(null);
    setDeleteOpen(false);
  };

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-6">
      {/* Header + controls */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
            <User className="w-6 h-6 text-blue-600" /> Patients
          </h1>
          <SmallHint>Manage patient records — add, edit or delete entries.</SmallHint>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              className="pl-10"
              placeholder="Search by name or contact"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>

          <Select value={genderFilter} onValueChange={(v) => setGenderFilter(v as any)} >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All genders</SelectItem>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>

          <Dialog open={addOpen} onOpenChange={setAddOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setAddOpen(true)} className="flex items-center gap-2">
                <Plus className="w-4 h-4" /> Add Patient
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-xl">
              <DialogHeader>
                <DialogTitle>Add Patient</DialogTitle>
              </DialogHeader>
              <PatientForm
                onCancel={() => setAddOpen(false)}
                onSave={(d) => addPatient(d)}
                submitLabel="Add"
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Responsive table */}
      <Card className="p-0 overflow-hidden">
        <div className="overflow-x-auto w-full">
          <Table className="min-w-[720px]">
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="hidden sm:table-cell">Age</TableHead>
                <TableHead className="hidden sm:table-cell">Gender</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No patients found
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((p) => (
                  <TableRow key={p.id} className="hover:bg-accent">
                    <TableCell className="font-medium">{p.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                          {p.name.split(" ").map((s) => s[0]).slice(0,2).join("")}
                        </div>
                        <div>
                          <div className="font-medium">{p.name}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">{p.age}</TableCell>
                    <TableCell className="hidden sm:table-cell">{p.gender}</TableCell>
                    <TableCell>{p.contact}</TableCell>
                    <TableCell className="flex items-center justify-end gap-2">
                      <button
                        title="Edit"
                        onClick={() => {
                          setEditing(p);
                          setEditOpen(true);
                        }}
                        className="p-2 rounded hover:bg-accent"
                      >
                        <Edit className="w-4 h-4" />
                      </button>

                      <button
                        title="Delete"
                        onClick={() => {
                          setDeleting(p);
                          setDeleteOpen(true);
                        }}
                        className="p-2 rounded hover:bg-accent"
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Edit modal */}
      <Dialog open={editOpen} onOpenChange={(v) => { if (!v) setEditing(null); setEditOpen(v); }}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Edit Patient</DialogTitle>
          </DialogHeader>
          {editing ? (
            <PatientForm
              initial={editing}
              onCancel={() => { setEditOpen(false); setEditing(null); }}
              onSave={(d) => saveEdit(d)}
              submitLabel="Save"
            />
          ) : (
            <div className="p-4">No patient selected</div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete confirm modal */}
      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Patient</DialogTitle>
          </DialogHeader>

          <div className="p-4">
            <p>Are you sure you want to delete <strong>{deleting?.name}</strong>?</p>
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => { setDeleteOpen(false); setDeleting(null); }}>
                Cancel
              </Button>
              <Button
                className="bg-destructive text-white"
                onClick={() => {
                  confirmDelete();
                }}
              >
                Delete
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}


// // correct
// "use client";

// import React, { useState, useMemo } from "react";
// import Link from "next/link";
// import { Card } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Label } from "@/components/ui/label";
// import { Plus, Edit, Trash2, Search, User } from "lucide-react";

// type Patient = {
//   id: number;
//   name: string;
//   age: number;
//   gender: "male" | "female" | "other";
//   contact: string;
// };

// const initialPatients: Patient[] = [
//   { id: 1, name: "John Doe", age: 34, gender: "male", contact: "1234567890" },
//   { id: 2, name: "Jane Smith", age: 28, gender: "female", contact: "9876543210" },
//   { id: 3, name: "Alice Johnson", age: 42, gender: "female", contact: "5551234567" },
//   { id: 4, name: "Bob Williams", age: 50, gender: "male", contact: "5559876543" },
// ];

// function SmallHint({ children }: { children: React.ReactNode }) {
//   return <p className="text-sm text-muted-foreground">{children}</p>;
// }

// function PatientForm({
//   initial,
//   onCancel,
//   onSave,
//   submitLabel = "Save",
// }: {
//   initial?: Partial<Patient>;
//   onCancel: () => void;
//   onSave: (data: Omit<Patient, "id">) => void;
//   submitLabel?: string;
// }) {
//   const [name, setName] = useState(initial?.name ?? "");
//   const [age, setAge] = useState<string>(initial?.age ? String(initial.age) : "");
//   const [gender, setGender] = useState<Patient["gender"]>(initial?.gender ?? "male");
//   const [contact, setContact] = useState(initial?.contact ?? "");

//   const [errors, setErrors] = useState<{ [k: string]: string }>({});

//   const validate = () => {
//     const e: { [k: string]: string } = {};
//     if (!name.trim()) e.name = "Name is required";
//     const n = Number(age);
//     if (!age || Number.isNaN(n) || n <= 0 || n > 120) e.age = "Enter a valid age (1–120)";
//     if (!/^\d{7,15}$/.test(contact.replace(/\s+/g, ""))) e.contact = "Contact should be 7–15 digits";
//     setErrors(e);
//     return Object.keys(e).length === 0;
//   };

//   const handleSubmit = (ev?: React.FormEvent) => {
//     ev?.preventDefault();
//     if (!validate()) return;
//     onSave({ name: name.trim(), age: Number(age), gender, contact: contact.trim() });
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div>
//           <Label>Name</Label>
//           <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" />
//           {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
//         </div>

//         <div>
//           <Label>Age</Label>
//           <Input type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="e.g. 34" />
//           {errors.age && <p className="text-xs text-red-500 mt-1">{errors.age}</p>}
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div>
//           <Label>Gender</Label>
//           <Select value={gender} onValueChange={(v) => setGender(v as Patient["gender"])}>
//             <SelectTrigger>
//               <SelectValue />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="male">Male</SelectItem>
//               <SelectItem value="female">Female</SelectItem>
//               <SelectItem value="other">Other</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>

//         <div>
//           <Label>Contact</Label>
//           <Input value={contact} onChange={(e) => setContact(e.target.value)} placeholder="Phone or contact" />
//           {errors.contact && <p className="text-xs text-red-500 mt-1">{errors.contact}</p>}
//         </div>
//       </div>

//       <div className="flex items-center justify-end gap-2">
//         <Button variant="outline" type="button" onClick={onCancel}>
//           Cancel
//         </Button>
//         <Button type="submit">{submitLabel}</Button>
//       </div>
//     </form>
//   );
// }

// export default function PatientsPage() {
//   const [patients, setPatients] = useState<Patient[]>(initialPatients);
//   const [filter, setFilter] = useState("");
//   const [genderFilter, setGenderFilter] = useState<"all" | Patient["gender"]>("all");

//   // modals state
//   const [addOpen, setAddOpen] = useState(false);
//   const [editOpen, setEditOpen] = useState(false);
//   const [deleteOpen, setDeleteOpen] = useState(false);
//   const [editing, setEditing] = useState<Patient | null>(null);
//   const [deleting, setDeleting] = useState<Patient | null>(null);

//   const filtered = useMemo(() => {
//     let list = patients;
//     if (filter.trim()) {
//       const t = filter.toLowerCase();
//       list = list.filter((p) => p.name.toLowerCase().includes(t) || p.contact.includes(t));
//     }
//     if (genderFilter !== "all") list = list.filter((p) => p.gender === genderFilter);
//     return list;
//   }, [patients, filter, genderFilter]);

//   const addPatient = (data: Omit<Patient, "id">) => {
//     const id = patients.length ? Math.max(...patients.map((p) => p.id)) + 1 : 1;
//     const newPatient: Patient = { id, ...data };
//     setPatients((s) => [newPatient, ...s]);
//     setAddOpen(false);
//   };

//   const saveEdit = (data: Omit<Patient, "id">) => {
//     if (!editing) return;
//     setPatients((s) => s.map((p) => (p.id === editing.id ? { ...p, ...data } : p)));
//     setEditing(null);
//     setEditOpen(false);
//   };

//   const confirmDelete = () => {
//     if (!deleting) return;
//     setPatients((s) => s.filter((p) => p.id !== deleting.id));
//     setDeleting(null);
//     setDeleteOpen(false);
//   };

//   return (
//     <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-6">
//       {/* Header + controls */}
//       <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//         <div>
//           <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
//             <User className="w-6 h-6 text-blue-600" /> Patients
//           </h1>
//           <SmallHint>Manage patient records — add, edit or delete entries.</SmallHint>
//         </div>

//         <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
//           <div className="relative w-full sm:w-64">
//             <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//             <Input
//               className="pl-10"
//               placeholder="Search by name or contact"
//               value={filter}
//               onChange={(e) => setFilter(e.target.value)}
//             />
//           </div>

//           <Select value={genderFilter} onValueChange={(v) => setGenderFilter(v as any)} >
//             <SelectTrigger>
//               <SelectValue />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="all">All genders</SelectItem>
//               <SelectItem value="male">Male</SelectItem>
//               <SelectItem value="female">Female</SelectItem>
//               <SelectItem value="other">Other</SelectItem>
//             </SelectContent>
//           </Select>

//           <Dialog open={addOpen} onOpenChange={setAddOpen}>
//             <DialogTrigger asChild>
//               <Button onClick={() => setAddOpen(true)} className="flex items-center gap-2">
//                 <Plus className="w-4 h-4" /> Add Patient
//               </Button>
//             </DialogTrigger>
//             <DialogContent className="max-w-xl">
//               <DialogHeader>
//                 <DialogTitle>Add Patient</DialogTitle>
//               </DialogHeader>
//               <PatientForm
//                 onCancel={() => setAddOpen(false)}
//                 onSave={(d) => addPatient(d)}
//                 submitLabel="Add"
//               />
//             </DialogContent>
//           </Dialog>
//         </div>
//       </div>

//       {/* Responsive table */}
//       <Card className="p-0 overflow-hidden">
//         <div className="overflow-x-auto w-full">
//           <Table className="min-w-[720px]">
//             <TableHeader>
//               <TableRow>
//                 <TableHead>ID</TableHead>
//                 <TableHead>Name</TableHead>
//                 <TableHead className="hidden sm:table-cell">Age</TableHead>
//                 <TableHead className="hidden sm:table-cell">Gender</TableHead>
//                 <TableHead>Contact</TableHead>
//                 <TableHead></TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {filtered.length === 0 ? (
//                 <TableRow>
//                   <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
//                     No patients found
//                   </TableCell>
//                 </TableRow>
//               ) : (
//                 filtered.map((p) => (
//                   <TableRow key={p.id} className="hover:bg-accent">
//                     <TableCell className="font-medium">{p.id}</TableCell>
//                     <TableCell>
//                       <div className="flex items-center gap-3">
//                         <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
//                           {p.name.split(" ").map((s) => s[0]).slice(0,2).join("")}
//                         </div>
//                         <div>
//                           <div className="font-medium">{p.name}</div>
//                         </div>
//                       </div>
//                     </TableCell>
//                     <TableCell className="hidden sm:table-cell">{p.age}</TableCell>
//                     <TableCell className="hidden sm:table-cell">{p.gender}</TableCell>
//                     <TableCell>{p.contact}</TableCell>
//                     <TableCell className="flex items-center justify-end gap-2">
//                       <button
//                         title="Edit"
//                         onClick={() => {
//                           setEditing(p);
//                           setEditOpen(true);
//                         }}
//                         className="p-2 rounded hover:bg-accent"
//                       >
//                         <Edit className="w-4 h-4" />
//                       </button>

//                       <button
//                         title="Delete"
//                         onClick={() => {
//                           setDeleting(p);
//                           setDeleteOpen(true);
//                         }}
//                         className="p-2 rounded hover:bg-accent"
//                       >
//                         <Trash2 className="w-4 h-4 text-destructive" />
//                       </button>
//                     </TableCell>
//                   </TableRow>
//                 ))
//               )}
//             </TableBody>
//           </Table>
//         </div>
//       </Card>

//       {/* Edit modal */}
//       <Dialog open={editOpen} onOpenChange={(v) => { if (!v) setEditing(null); setEditOpen(v); }}>
//         <DialogContent className="max-w-xl">
//           <DialogHeader>
//             <DialogTitle>Edit Patient</DialogTitle>
//           </DialogHeader>
//           {editing ? (
//             <PatientForm
//               initial={editing}
//               onCancel={() => { setEditOpen(false); setEditing(null); }}
//               onSave={(d) => saveEdit(d)}
//               submitLabel="Save"
//             />
//           ) : (
//             <div className="p-4">No patient selected</div>
//           )}
//         </DialogContent>
//       </Dialog>

//       {/* Delete confirm modal */}
//       <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
//         <DialogContent className="max-w-md">
//           <DialogHeader>
//             <DialogTitle>Delete Patient</DialogTitle>
//           </DialogHeader>

//           <div className="p-4">
//             <p>Are you sure you want to delete <strong>{deleting?.name}</strong>?</p>
//             <div className="flex justify-end gap-2 mt-4">
//               <Button variant="outline" onClick={() => { setDeleteOpen(false); setDeleting(null); }}>
//                 Cancel
//               </Button>
//               <Button
//                 className="bg-destructive text-white"
//                 onClick={() => {
//                   confirmDelete();
//                 }}
//               >
//                 Delete
//               </Button>
//             </div>
//           </div>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }

