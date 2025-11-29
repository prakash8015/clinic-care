"use client";

import { useState, useEffect } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
  DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Plus, Search } from "lucide-react";
import { toast } from "sonner";

import {
  getAppointments,
  getPatients,
  getStaff,
  createAppointment,
} from "../../../lib/action";

/* ----------------------------------------------------
   ✅ Type Definitions
---------------------------------------------------- */

export interface Patient {
  id: number;
  firstName: string;
  lastName: string;
}

export interface Staff {
  id: number;
  firstName: string;
  lastName: string;
}

export interface Appointment {
  id: number;
  patientId: number;
  staffId?: number;
  reason?: string;
  status: "scheduled" | "completed" | "cancelled";
  appointmentDate: string;
}



/* ----------------------------------------------------
   ✅ Page Component
---------------------------------------------------- */

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [staff, setStaff] = useState<Staff[]>([]);
  const [filtered, setFiltered] = useState<Appointment[]>([]);

  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);

  const [patientId, setPatientId] = useState<string>("");
  const [staffId, setStaffId] = useState<string>("none");
  const [reason, setReason] = useState<string>("");
  const [date, setDate] = useState<string>("");

  /* ----------------------------------------------------
     🔥 Load Data
  ---------------------------------------------------- */

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);

        const p = await getPatients();
        const s = await getStaff();
        const a = await getAppointments();

        setPatients(p);
        setStaff(s);
        setAppointments(a);
        setFiltered(a);
      } catch (error) {
        toast.error("Failed to load data");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  /* ----------------------------------------------------
     🔎 Search
  ---------------------------------------------------- */

  const handleSearch = (value: string) => {
    setSearch(value);
    const q = value.toLowerCase();

    const results = appointments.filter((appt) => {
      const p = patients.find((x) => x.id === appt.patientId);

      return (
        p?.firstName.toLowerCase().includes(q) ||
        p?.lastName.toLowerCase().includes(q) ||
        appt.reason?.toLowerCase().includes(q)
      );
    });

    setFiltered(results);
  };

  /* ----------------------------------------------------
     🔧 Helper Getters
  ---------------------------------------------------- */

  const getPatientName = (id: number): string => {
    const p = patients.find((x) => x.id === id);
    return p ? `${p.firstName} ${p.lastName}` : "Unknown";
  };

  const getStaffName = (id?: number): string => {
    if (!id) return "Unassigned";
    const s = staff.find((x) => x.id === id);
    return s ? `${s.firstName} ${s.lastName}` : "Unknown";
  };

  const statusColor = (s: string): string => {
    return {
      scheduled: "bg-blue-100 text-blue-800",
      completed: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
    }[s] || "bg-gray-100 text-gray-800";
  };

  /* ----------------------------------------------------
     ➕ Create Appointment
  ---------------------------------------------------- */

  const handleCreate = async () => {
    if (!patientId || !date) {
      toast.error("Patient & Date are required");
      return;
    }

    try {
      await createAppointment({
        patientId: Number(patientId),
        staffId: staffId === "none" ? undefined : Number(staffId),
        reason,
        appointmentDate: new Date(date).toISOString(),
      });

      toast.success("Appointment created!");
      setOpen(false);

      const a = await getAppointments();
      setAppointments(a);
      setFiltered(a);

      setPatientId("");
      setStaffId("none");
      setReason("");
      setDate("");
    } catch {
      toast.error("Failed to create appointment");
    }
  };

  /* ----------------------------------------------------
     ⏳ Loading Screen
  ---------------------------------------------------- */

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-center">
        <div>
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading appointments...</p>
        </div>
      </div>
    );
  }

  /* ----------------------------------------------------
     🎨 UI
  ---------------------------------------------------- */

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Appointments</h1>
          <p className="text-muted-foreground">Schedule and manage appointments</p>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" /> Add Appointment
            </Button>
          </DialogTrigger>

          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Schedule New Appointment</DialogTitle>
              <DialogDescription>
                Fill in the details to create a new appointment.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              {/* Patient */}
              <div className="space-y-2">
                <Label>Patient</Label>
                <Select onValueChange={setPatientId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select patient" />
                  </SelectTrigger>
                  <SelectContent>
                    {patients.map((p) => (
                      <SelectItem key={p.id} value={String(p.id)}>
                        {p.firstName} {p.lastName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Staff */}
              <div className="space-y-2">
                <Label>Staff</Label>
                <Select value={staffId} onValueChange={setStaffId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Optional" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Unassigned</SelectItem>
                    {staff.map((s) => (
                      <SelectItem key={s.id} value={String(s.id)}>
                        {s.firstName} {s.lastName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Date */}
              <div className="space-y-2">
                <Label>Date & Time</Label>
                <Input
                  type="datetime-local"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>

              {/* Reason */}
              <div className="space-y-2">
                <Label>Reason</Label>
                <Input
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Optional"
                />
              </div>

              <Button onClick={handleCreate} className="w-full">
                Create Appointment
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Table */}
      <Card>
        <div className="p-6 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search appointments..."
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Staff</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center py-8 text-muted-foreground"
                  >
                    No appointments found
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((appt) => (
                  <TableRow key={appt.id}>
                    <TableCell className="font-medium">
                      {getPatientName(appt.patientId)}
                    </TableCell>

                    <TableCell>
                      {new Date(appt.appointmentDate).toLocaleString()}
                    </TableCell>

                    <TableCell>{getStaffName(appt.staffId)}</TableCell>

                    <TableCell>{appt.reason || "-"}</TableCell>

                    <TableCell>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${statusColor(
                          appt.status
                        )}`}
                      >
                        {appt.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}



// // rewritten appointments page
// // Please paste your original logic imports later if needed

// "use client";

// import { useState, useEffect } from "react";
// import {
//   Select,
//   SelectTrigger,
//   SelectValue,
//   SelectContent,
//   SelectItem,
// } from "@/components/ui/select";
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
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
//   DialogDescription,
// } from "@/components/ui/dialog";
// import { Label } from "@/components/ui/label";
// import { Plus, Search } from "lucide-react";
// import { toast } from "sonner";

// import { getAppointments, getPatients, getStaff, createAppointment } from "../../lib/action";

// export default function AppointmentsPage() {
//   const [appointments, setAppointments] = useState([]);
//   const [patients, setPatients] = useState([]);
//   const [staff, setStaff] = useState([]);
//   const [filtered, setFiltered] = useState([]);
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [open, setOpen] = useState(false);

//   const [patientId, setPatientId] = useState("");
//   const [staffId, setStaffId] = useState("none");
//   const [reason, setReason] = useState("");
//   const [date, setDate] = useState("");

//   // 🔥 Load patients, staff, appointments on page entry
//   useEffect(() => {
//     async function load() {
//       try {
//         setLoading(true);

//         const p = await getPatients();
//         const s = await getStaff();
//         const a = await getAppointments();

//         setPatients(p);
//         setStaff(s);
//         setAppointments(a);
//         setFiltered(a);
//       } catch (error) {
//         toast.error("Failed to load data");
//       } finally {
//         setLoading(false);
//       }
//     }

//     load();
//   }, []);

//   const handleSearch = (value) => {
//     setSearch(value);
//     const q = value.toLowerCase();

//     const f = appointments.filter((appt) => {
//       const p = patients.find((x) => x.id === appt.patientId);
//       return (
//         p?.firstName.toLowerCase().includes(q) ||
//         p?.lastName.toLowerCase().includes(q) ||
//         appt.reason?.toLowerCase().includes(q)
//       );
//     });

//     setFiltered(f);
//   };

//   const getPatientName = (id) => {
//     const p = patients.find((x) => x.id === id);
//     return p ? `${p.firstName} ${p.lastName}` : "Unknown";
//   };

//   const getStaffName = (id) => {
//     if (!id) return "Unassigned";
//     const s = staff.find((x) => x.id === id);
//     return s ? `${s.firstName} ${s.lastName}` : "Unknown";
//   };

//   const statusColor = (s) => {
//     return {
//       scheduled: "bg-blue-100 text-blue-800",
//       completed: "bg-green-100 text-green-800",
//       cancelled: "bg-red-100 text-red-800",
//     }[s] || "bg-gray-100 text-gray-800";
//   };

//   const handleCreate = async () => {
//     if (!patientId || !date) {
//       toast.error("Patient & Date are required");
//       return;
//     }

//     try {
//       await createAppointment({
//         patientId: Number(patientId),
//         staffId: staffId === "none" ? undefined : Number(staffId),
//         reason,
//         appointmentDate: new Date(date).toISOString(),
//       });

//       toast.success("Appointment created!");
//       setOpen(false);

//       // reload
//       const a = await getAppointments();
//       setAppointments(a);
//       setFiltered(a);

//       setPatientId("");
//       setStaffId("none");
//       setReason("");
//       setDate("");
//     } catch {
//       toast.error("Failed to create appointment");
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-screen text-center">
//         <div>
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
//           <p className="text-muted-foreground">Loading appointments...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 space-y-6">
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold">Appointments</h1>
//           <p className="text-muted-foreground">Schedule and manage appointments</p>
//         </div>

//         <Dialog open={open} onOpenChange={setOpen}>
//           <DialogTrigger asChild>
//             <Button className="gap-2">
//               <Plus className="h-4 w-4" /> Add Appointment
//             </Button>
//           </DialogTrigger>

//           <DialogContent className="max-w-md">
//             <DialogHeader>
//               <DialogTitle>Schedule New Appointment</DialogTitle>
//               <DialogDescription>
//                 Fill in the details to create a new appointment.
//               </DialogDescription>
//             </DialogHeader>

//             <div className="space-y-4">
//               <div className="space-y-2">
//                 <Label>Patient</Label>
//                 <Select onValueChange={setPatientId}>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select patient" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {patients.map((p) => (
//                       <SelectItem key={p.id} value={String(p.id)}>
//                         {p.firstName} {p.lastName}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>

//               <div className="space-y-2">
//                 <Label>Staff</Label>
//                 <Select value={staffId} onValueChange={setStaffId}>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Optional" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="none">Unassigned</SelectItem>
//                     {staff.map((s) => (
//                       <SelectItem key={s.id} value={String(s.id)}>
//                         {s.firstName} {s.lastName}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>

//               <div className="space-y-2">
//                 <Label>Date & Time</Label>
//                 <Input type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)} />
//               </div>

//               <div className="space-y-2">
//                 <Label>Reason</Label>
//                 <Input value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Optional" />
//               </div>

//               <Button onClick={handleCreate} className="w-full">
//                 Create Appointment
//               </Button>
//             </div>
//           </DialogContent>
//         </Dialog>
//       </div>

//       <Card>
//         <div className="p-6 border-b">
//           <div className="relative">
//             <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//             <Input
//               placeholder="Search appointments..."
//               value={search}
//               onChange={(e) => handleSearch(e.target.value)}
//               className="pl-10"
//             />
//           </div>
//         </div>

//         <div className="overflow-x-auto">
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Patient</TableHead>
//                 <TableHead>Date & Time</TableHead>
//                 <TableHead>Staff</TableHead>
//                 <TableHead>Reason</TableHead>
//                 <TableHead>Status</TableHead>
//               </TableRow>
//             </TableHeader>

//             <TableBody>
//               {filtered.length === 0 ? (
//                 <TableRow>
//                   <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
//                     No appointments found
//                   </TableCell>
//                 </TableRow>
//               ) : (
//                 filtered.map((appt) => (
//                   <TableRow key={appt.id}>
//                     <TableCell className="font-medium">{getPatientName(appt.patientId)}</TableCell>
//                     <TableCell>{new Date(appt.appointmentDate).toLocaleString()}</TableCell>
//                     <TableCell>{getStaffName(appt.staffId)}</TableCell>
//                     <TableCell>{appt.reason || "-"}</TableCell>
//                     <TableCell>
//                       <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColor(appt.status)}`}>
//                         {appt.status}
//                       </span>
//                     </TableCell>
//                   </TableRow>
//                 ))
//               )}
//             </TableBody>
//           </Table>
//         </div>
//       </Card>
//     </div>
//   );
// }


// // // Fixed full page.tsx
// // "use client";

// // import { useState, useEffect } from "react";
// // import {
// //   Select,
// //   SelectTrigger,
// //   SelectValue,
// //   SelectContent,
// //   SelectItem,
// // } from "@/components/ui/select";

// // import {
// //   getAppointments,
// //   getPatients,
// //   getStaff,
// //   createAppointment,
// // } from "../lib/action";

// // import { Button } from "@/components/ui/button";
// // import { Card } from "@/components/ui/card";
// // import { Input } from "@/components/ui/input";
// // import {
// //   Table,
// //   TableBody,
// //   TableCell,
// //   TableHead,
// //   TableHeader,
// //   TableRow,
// // } from "@/components/ui/table";
// // import {
// //   Dialog,
// //   DialogContent,
// //   DialogHeader,
// //   DialogTitle,
// //   DialogTrigger,
// //   DialogDescription, 
// // } from "@/components/ui/dialog";
// // import { Label } from "@/components/ui/label";
// // import { Plus, Search } from "lucide-react";
// // import type { Appointment, Patient, Staff } from "../lib/type";
// // import { toast } from "sonner";

// // export default function AppointmentsPage() {
// //   const [appointments, setAppointments] = useState<Appointment[]>([]);
// //   const [patients, setPatients] = useState<Patient[]>([]);
// //   const [staff, setStaff] = useState<Staff[]>([]);
// //   const [filtered, setFiltered] = useState<Appointment[]>([]);
// //   const [search, setSearch] = useState("");
// //   const [loading, setLoading] = useState(true);
// //   const [open, setOpen] = useState(false);

// //   // Add Appointment Form
// //   const [patientId, setPatientId] = useState<string>("");
// //   const [staffId, setStaffId] = useState<string>("none"); // FIXED: use "none", not empty
// //   const [reason, setReason] = useState("");
// //   const [date, setDate] = useState("");

// //   useEffect(() => {
// //     loadData();
// //   }, []);

// //   const loadData = async () => {
// //     try {
// //       setLoading(true);
// //       const [a, p, s] = await Promise.all([
// //         getAppointments(),
// //         getPatients(),
// //         getStaff(),
// //       ]);
// //       console.log("Patients loaded:", p);


// //       setAppointments(a);
// //       setPatients(p);
// //       setStaff(s);
// //       setFiltered(a);
// //     } catch (error) {
// //       toast.error("Failed to load appointments");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleSearch = (value: string) => {
// //     setSearch(value);
// //     const q = value.toLowerCase();

// //     const f = appointments.filter((appt) => {
// //       const p = patients.find((x) => x.id === appt.patientId);
// //       return (
// //         p?.firstName.toLowerCase().includes(q) ||
// //         p?.lastName.toLowerCase().includes(q) ||
// //         appt.reason?.toLowerCase().includes(q)
// //       );
// //     });
// //     setFiltered(f);
// //   };

// //   const getPatientName = (id: number) => {
// //     const p = patients.find((x) => x.id === id);
// //     return p ? `${p.firstName} ${p.lastName}` : "Unknown";
// //   };

// //   const getStaffName = (id?: number) => {
// //     if (!id) return "Unassigned";
// //     const s = staff.find((x) => x.id === id);
// //     return s ? `${s.firstName} ${s.lastName}` : "Unknown";
// //   };

// //   const statusColor = (s: string) => {
// //     return {
// //       scheduled: "bg-blue-100 text-blue-800",
// //       completed: "bg-green-100 text-green-800",
// //       cancelled: "bg-red-100 text-red-800",
// //     }[s] || "bg-gray-100 text-gray-800";
// //   };

// //   const handleCreate = async () => {
// //     if (!patientId || !date) {
// //       toast.error("Patient & Date are required");
// //       return;
// //     }

// //     try {
// //       await createAppointment({
// //         patientId: Number(patientId),
// //         staffId: staffId === "none" ? undefined : Number(staffId),
// //         reason,
// //         appointmentDate: new Date(date).toISOString(),
// //       });

// //       toast.success("Appointment created!");
// //       setOpen(false);
// //       loadData();

// //       setPatientId("");
// //       setStaffId("none");
// //       setReason("");
// //       setDate("");
// //     } catch {
// //       toast.error("Failed to create appointment");
// //     }
// //   };

// //   if (loading) {
// //     return (
// //       <div className="flex items-center justify-center h-screen text-center">
// //         <div>
// //           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
// //           <p className="text-muted-foreground">Loading appointments...</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="p-6 space-y-6">
// //       {/* Header */}
// //       <div className="flex items-center justify-between">
// //         <div>
// //           <h1 className="text-3xl font-bold">Appointments</h1>
// //           <p className="text-muted-foreground">Schedule and manage appointments</p>
// //         </div>

// //         <Dialog open={open} onOpenChange={setOpen}>
// //           <DialogTrigger asChild>
// //             <Button className="gap-2">
// //               <Plus className="h-4 w-4" /> Add Appointment
// //             </Button>
// //           </DialogTrigger>

// //           <DialogContent className="max-w-md">
// //             <DialogHeader>
// //               <DialogTitle>Schedule New Appointment</DialogTitle>
// //               <DialogDescription>
// //     Fill in the details to create a new appointment.
// //   </DialogDescription>
// //             </DialogHeader>

// //             <div className="space-y-4">
// //               <div className="space-y-2">
// //                 <Label>Patient</Label>
// //                 <Select onValueChange={setPatientId}>
// //                   <SelectTrigger>
// //                     <SelectValue placeholder="Select patient" />
// //                   </SelectTrigger>
// //                   <SelectContent>
// //                     {patients.map((p) => (
// //                       <SelectItem key={p.id} value={String(p.id)}>
// //                         {p.firstName} {p.lastName}
// //                       </SelectItem>
// //                     ))}
// //                   </SelectContent>
// //                 </Select>
// //               </div>

// //               <div className="space-y-2">
// //                 <Label>Staff</Label>
// //                 <Select value={staffId} onValueChange={setStaffId}>
// //                   <SelectTrigger>
// //                     <SelectValue placeholder="Optional" />
// //                   </SelectTrigger>
// //                   <SelectContent>
// //                     <SelectItem value="none">Unassigned</SelectItem>
// //                     {staff.map((s) => (
// //                       <SelectItem key={s.id} value={String(s.id)}>
// //                         {s.firstName} {s.lastName}
// //                       </SelectItem>
// //                     ))}
// //                   </SelectContent>
// //                 </Select>
// //               </div>

// //               <div className="space-y-2">
// //                 <Label>Date & Time</Label>
// //                 <Input type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)} />
// //               </div>

// //               <div className="space-y-2">
// //                 <Label>Reason</Label>
// //                 <Input value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Optional" />
// //               </div>

// //               <Button onClick={handleCreate} className="w-full">
// //                 Create Appointment
// //               </Button>
// //             </div>
// //           </DialogContent>
// //         </Dialog>
// //       </div>

// //       {/* Search */}
// //       <Card>
// //         <div className="p-6 border-b">
// //           <div className="relative">
// //             <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
// //             <Input
// //               placeholder="Search appointments..."
// //               value={search}
// //               onChange={(e) => handleSearch(e.target.value)}
// //               className="pl-10"
// //             />
// //           </div>
// //         </div>

// //         <div className="overflow-x-auto">
// //           <Table>
// //             <TableHeader>
// //               <TableRow>
// //                 <TableHead>Patient</TableHead>
// //                 <TableHead>Date & Time</TableHead>
// //                 <TableHead>Staff</TableHead>
// //                 <TableHead>Reason</TableHead>
// //                 <TableHead>Status</TableHead>
// //               </TableRow>
// //             </TableHeader>

// //             <TableBody>
// //               {filtered.length === 0 ? (
// //                 <TableRow>
// //                   <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
// //                     No appointments found
// //                   </TableCell>
// //                 </TableRow>
// //               ) : (
// //                 filtered.map((appt) => (
// //                   <TableRow key={appt.id}>
// //                     <TableCell className="font-medium">{getPatientName(appt.patientId)}</TableCell>
// //                     <TableCell>{new Date(appt.appointmentDate).toLocaleString()}</TableCell>
// //                     <TableCell>{getStaffName(appt.staffId)}</TableCell>
// //                     <TableCell>{appt.reason || "-"}</TableCell>
// //                     <TableCell>
// //                       <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColor(appt.status)}`}>
// //                         {appt.status}
// //                       </span>
// //                     </TableCell>
// //                   </TableRow>
// //                 ))
// //               )}
// //             </TableBody>
// //           </Table>
// //         </div>
// //       </Card>
// //     </div>
// //   );
// // }



