// Fixed full page.tsx
"use client";

import { useState, useEffect } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import {
  getAppointments,
  getPatients,
  getStaff,
  createAppointment,
} from "../lib/action";

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
import type { Appointment, Patient, Staff } from "../lib/type";
import { toast } from "sonner";

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [staff, setStaff] = useState<Staff[]>([]);
  const [filtered, setFiltered] = useState<Appointment[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  // Add Appointment Form
  const [patientId, setPatientId] = useState<string>("");
  const [staffId, setStaffId] = useState<string>("none"); // FIXED: use "none", not empty
  const [reason, setReason] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [a, p, s] = await Promise.all([
        getAppointments(),
        getPatients(),
        getStaff(),
      ]);
      console.log("Patients loaded:", p);


      setAppointments(a);
      setPatients(p);
      setStaff(s);
      setFiltered(a);
    } catch (error) {
      toast.error("Failed to load appointments");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value: string) => {
    setSearch(value);
    const q = value.toLowerCase();

    const f = appointments.filter((appt) => {
      const p = patients.find((x) => x.id === appt.patientId);
      return (
        p?.firstName.toLowerCase().includes(q) ||
        p?.lastName.toLowerCase().includes(q) ||
        appt.reason?.toLowerCase().includes(q)
      );
    });
    setFiltered(f);
  };

  const getPatientName = (id: number) => {
    const p = patients.find((x) => x.id === id);
    return p ? `${p.firstName} ${p.lastName}` : "Unknown";
  };

  const getStaffName = (id?: number) => {
    if (!id) return "Unassigned";
    const s = staff.find((x) => x.id === id);
    return s ? `${s.firstName} ${s.lastName}` : "Unknown";
  };

  const statusColor = (s: string) => {
    return {
      scheduled: "bg-blue-100 text-blue-800",
      completed: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
    }[s] || "bg-gray-100 text-gray-800";
  };

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
      loadData();

      setPatientId("");
      setStaffId("none");
      setReason("");
      setDate("");
    } catch {
      toast.error("Failed to create appointment");
    }
  };

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

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
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

              <div className="space-y-2">
                <Label>Date & Time</Label>
                <Input type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)} />
              </div>

              <div className="space-y-2">
                <Label>Reason</Label>
                <Input value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Optional" />
              </div>

              <Button onClick={handleCreate} className="w-full">
                Create Appointment
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
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
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    No appointments found
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((appt) => (
                  <TableRow key={appt.id}>
                    <TableCell className="font-medium">{getPatientName(appt.patientId)}</TableCell>
                    <TableCell>{new Date(appt.appointmentDate).toLocaleString()}</TableCell>
                    <TableCell>{getStaffName(appt.staffId)}</TableCell>
                    <TableCell>{appt.reason || "-"}</TableCell>
                    <TableCell>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColor(appt.status)}`}>
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



// //2
// "use client";

// import { useState, useEffect } from "react";
// import { getAppointments, getPatients, getStaff, createAppointment } from "../lib/action";
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
// } from "@/components/ui/dialog";
// import { Label } from "@/components/ui/label";
// import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
// import { Plus, Search } from "lucide-react";
// import type { Appointment, Patient, Staff } from "../lib/type";
// import { toast } from "sonner";

// export default function AppointmentsPage() {
//   const [appointments, setAppointments] = useState<Appointment[]>([]);
//   const [patients, setPatients] = useState<Patient[]>([]);
//   const [staff, setStaff] = useState<Staff[]>([]);
//   const [filtered, setFiltered] = useState<Appointment[]>([]);
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [open, setOpen] = useState(false);

//   // Add Appointment Form state
//   const [patientId, setPatientId] = useState<string>("");
//   const [staffId, setStaffId] = useState<string>("");
//   const [reason, setReason] = useState("");
//   const [date, setDate] = useState("");

//   /** Load Data */
//   useEffect(() => {
//     loadData();
//   }, []);

//   const loadData = async () => {
//     try {
//       setLoading(true);
//       const [appt, pt, st] = await Promise.all([
//         getAppointments(),
//         getPatients(),
//         getStaff(),
//       ]);
//       setAppointments(appt);
//       setPatients(pt);
//       setStaff(st);
//       setFiltered(appt);
//     } catch (error) {
//       toast.error("Failed to load appointments");
//     } finally {
//       setLoading(false);
//     }
//   };

//   /** Search */
//   const handleSearch = (value: string) => {
//     setSearch(value);
//     const filtered = appointments.filter((a) => {
//       const p = patients.find((x) => x.id === a.patientId);
//       return (
//         p?.firstName.toLowerCase().includes(value) ||
//         p?.lastName.toLowerCase().includes(value) ||
//         a.reason?.toLowerCase().includes(value)
//       );
//     });
//     setFiltered(filtered);
//   };

//   /** Helpers */
//   const getPatientName = (id: number) => {
//     const p = patients.find((x) => x.id === id);
//     return p ? `${p.firstName} ${p.lastName}` : "Unknown";
//   };

//   const getStaffName = (id?: number) => {
//     if (!id) return "Unassigned";
//     const s = staff.find((x) => x.id === id);
//     return s ? `${s.firstName} ${s.lastName}` : "Unknown";
//   };

//   const statusColor = (s: string) => {
//     return {
//       scheduled: "bg-blue-100 text-blue-800",
//       completed: "bg-green-100 text-green-800",
//       cancelled: "bg-red-100 text-red-800",
//     }[s] || "bg-gray-100 text-gray-800";
//   };

//   /** Handle Add Appointment */
//   const handleCreate = async () => {
//     if (!patientId || !date) {
//       toast.error("Patient & Date are required");
//       return;
//     }

//     try {
//       await createAppointment({
//         patientId: Number(patientId),
//         staffId: staffId ? Number(staffId) : undefined,
//         reason,
        
//       });

//       toast.success("Appointment created!");
//       setOpen(false);
//       loadData();
//       setReason("");
//       setPatientId("");
//       setStaffId("");
//       setDate("");
//     } catch (e) {
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
//       {/* HEADER */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold">Appointments</h1>
//           <p className="text-muted-foreground">Schedule and manage patient appointments</p>
//         </div>

//         {/* Add Appointment Dialog */}
//         <Dialog open={open} onOpenChange={setOpen}>
//           <DialogTrigger asChild>
//             <Button className="gap-2">
//               <Plus className="h-4 w-4" />
//               Add Appointment
//             </Button>
//           </DialogTrigger>

//           <DialogContent className="max-w-md">
//             <DialogHeader>
//               <DialogTitle>Schedule New Appointment</DialogTitle>
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
//                 <Select onValueChange={setStaffId}>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Optional" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="">Unassigned</SelectItem>
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
//                 <Input
//                   type="datetime-local"
//                   value={date}
//                   onChange={(e) => setDate(e.target.value)}
//                 />
//               </div>

//               <div className="space-y-2">
//                 <Label>Reason</Label>
//                 <Input
//                   placeholder="Optional"
//                   value={reason}
//                   onChange={(e) => setReason(e.target.value)}
//                 />
//               </div>

//               <Button className="w-full" onClick={handleCreate}>
//                 Create Appointment
//               </Button>
//             </div>
//           </DialogContent>
//         </Dialog>
//       </div>

//       {/* SEARCH */}
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

//         {/* TABLE */}
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
//                     <TableCell className="font-medium">
//                       {getPatientName(appt.patientId)}
//                     </TableCell>
//                     <TableCell>{new Date(appt.appointmentDate).toLocaleString()}</TableCell>
//                     <TableCell>{getStaffName(appt.staffId)}</TableCell>
//                     <TableCell>{appt.reason || "-"}</TableCell>
//                     <TableCell>
//                       <span
//                         className={`px-3 py-1 rounded-full text-sm font-medium ${statusColor(
//                           appt.status
//                         )}`}
//                       >
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


// //1
// // "use client"
// // import React, { useState } from 'react';
// // import { Card, CardContent } from '@/components/ui/card';
// // import { Input } from '@/components/ui/input';
// // import { Button } from '@/components/ui/button';
// // import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// // import { Badge } from '@/components/ui/badge';
// // import { 
// //   LayoutDashboard,
// //   UserSquare2,
// //   CalendarDays,
// //   UsersRound,
// //   Box,
// //   Building2,
// //   Search,
// //   Plus,
// //   Pencil,
// //   Trash2,
// //   Eye
// // } from 'lucide-react';

// // export default function AppointmentsPage() {
// //   const [selectedBranch, setSelectedBranch] = useState('all');
// //   const [searchQuery, setSearchQuery] = useState('');

// //   const branches = [
// //     { id: 'all', name: 'All Branches' },
// //     { id: 'boston', name: 'Boston Medical Center' },
// //     { id: 'cambridge', name: 'Cambridge Health Clinic' },
// //     { id: 'somerville', name: 'Somerville Care Center' }
// //   ];

// //   const navItems = [
// //     { name: 'Dashboard', icon: LayoutDashboard, active: false },
// //     { name: 'Patients', icon: UserSquare2, active: false },
// //     { name: 'Appointments', icon: CalendarDays, active: true },
// //     { name: 'Staff', icon: UsersRound, active: false },
// //     { name: 'Inventory', icon: Box, active: false },
// //     { name: 'Branches', icon: Building2, active: false }
// //   ];

// //   const appointments = [
// //     {
// //       id: 1,
// //       patient: 'David Williams',
// //       dateTime: '11/28/2024, 1:30:00 PM',
// //       staff: 'Technician Davis',
// //       reason: 'Lab tests',
// //       status: 'scheduled',
// //       branch: 'Boston Medical Center'
// //     },
// //     {
// //       id: 2,
// //       patient: 'Emily Rodriguez',
// //       dateTime: '11/27/2024, 11:00:00 AM',
// //       staff: 'Dr. Anderson',
// //       reason: 'Dental cleaning',
// //       status: 'scheduled',
// //       branch: 'Cambridge Health Clinic'
// //     },
// //     {
// //       id: 3,
// //       patient: 'Michael Chen',
// //       dateTime: '11/26/2024, 2:00:00 PM',
// //       staff: 'Dr. Martinez',
// //       reason: 'Annual checkup',
// //       status: 'completed',
// //       branch: 'Boston Medical Center'
// //     },
// //     {
// //       id: 4,
// //       patient: 'Sarah Johnson',
// //       dateTime: '11/29/2024, 9:30:00 AM',
// //       staff: 'Nurse Wilson',
// //       reason: 'Vaccination',
// //       status: 'scheduled',
// //       branch: 'Somerville Care Center'
// //     },
// //     {
// //       id: 5,
// //       patient: 'Robert Taylor',
// //       dateTime: '11/25/2024, 3:45:00 PM',
// //       staff: 'Dr. Thompson',
// //       reason: 'Follow-up visit',
// //       status: 'cancelled',
// //       branch: 'Cambridge Health Clinic'
// //     }
// //   ];

// //   const getStatusColor = (status) => {
// //     switch(status) {
// //       case 'scheduled':
// //         return 'bg-blue-100 text-blue-700 hover:bg-blue-100';
// //       case 'completed':
// //         return 'bg-green-100 text-green-700 hover:bg-green-100';
// //       case 'cancelled':
// //         return 'bg-red-100 text-red-700 hover:bg-red-100';
// //       default:
// //         return 'bg-gray-100 text-gray-700 hover:bg-gray-100';
// //     }
// //   };

// //   const filteredAppointments = appointments.filter(appointment => {
// //     const matchesSearch = 
// //       appointment.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
// //       appointment.staff.toLowerCase().includes(searchQuery.toLowerCase()) ||
// //       appointment.reason.toLowerCase().includes(searchQuery.toLowerCase());
// //     const matchesBranch = selectedBranch === 'all' || 
// //       appointment.branch === branches.find(b => b.id === selectedBranch)?.name;
// //     return matchesSearch && matchesBranch;
// //   });

// //   return (
// //     <div className="min-h-screen bg-gray-50">
// //       {/* Header */}
// //       <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
// //         <div className="flex items-center justify-between px-6 py-4">
// //           <div className="flex items-center gap-3">
// //             <div className="w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
// //               CC
// //             </div>
// //             <div>
// //               <h1 className="text-xl font-bold text-gray-900">ClinicCare</h1>
// //               <p className="text-sm text-gray-500">Multi-Branch Management</p>
// //             </div>
// //           </div>
// //           <div className="flex items-center gap-4">
// //             <Select value={selectedBranch} onValueChange={setSelectedBranch}>
// //               <SelectTrigger className="w-64">
// //                 <SelectValue />
// //               </SelectTrigger>
// //               <SelectContent>
// //                 {branches.map(branch => (
// //                   <SelectItem key={branch.id} value={branch.id}>
// //                     {branch.name}
// //                   </SelectItem>
// //                 ))}
// //               </SelectContent>
// //             </Select>
// //           </div>
// //         </div>
// //       </header>

// //       {/* Navigation */}
// //       <nav className="bg-white border-b border-gray-200">
// //         <div className="px-6">
// //           <div className="flex gap-8">
// //             {navItems.map(item => (
// //               <button
// //                 key={item.name}
// //                 className={`flex items-center gap-2 px-4 py-4 border-b-2 transition-colors ${
// //                   item.active
// //                     ? 'border-teal-600 text-teal-600'
// //                     : 'border-transparent text-gray-600 hover:text-gray-900'
// //                 }`}
// //               >
// //                 <item.icon className="w-5 h-5" />
// //                 <span className="font-medium">{item.name}</span>
// //               </button>
// //             ))}
// //           </div>
// //         </div>
// //       </nav>

// //       {/* Main Content */}
// //       <main className="px-6 py-8">
// //         <div className="max-w-7xl mx-auto">
// //           {/* Page Header */}
// //           <div className="flex items-start justify-between mb-8">
// //             <div>
// //               <h2 className="text-3xl font-bold text-gray-900 mb-2">Appointments</h2>
// //               <p className="text-gray-600">Schedule and manage patient appointments</p>
// //             </div>
// //             <Button className="bg-teal-600 hover:bg-teal-700 text-white">
// //               <Plus className="w-4 h-4 mr-2" />
// //               Add Appointment
// //             </Button>
// //           </div>

// //           {/* Search Card */}
// //           <Card className="mb-6">
// //             <CardContent className="p-6">
// //               <div className="relative">
// //                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
// //                 <Input
// //                   type="text"
// //                   placeholder="Search appointments..."
// //                   value={searchQuery}
// //                   onChange={(e) => setSearchQuery(e.target.value)}
// //                   className="pl-10"
// //                 />
// //               </div>
// //             </CardContent>
// //           </Card>

// //           {/* Appointments Table */}
// //           <Card>
// //             <CardContent className="p-0">
// //               <div className="overflow-x-auto">
// //                 <table className="w-full">
// //                   <thead className="bg-gray-50 border-b border-gray-200">
// //                     <tr>
// //                       <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Patient</th>
// //                       <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Date & Time</th>
// //                       <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Staff</th>
// //                       <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Reason</th>
// //                       <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
// //                       <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
// //                     </tr>
// //                   </thead>
// //                   <tbody className="divide-y divide-gray-200">
// //                     {filteredAppointments.map((appointment) => (
// //                       <tr key={appointment.id} className="hover:bg-gray-50 transition-colors">
// //                         <td className="px-6 py-4 text-sm text-gray-900">{appointment.patient}</td>
// //                         <td className="px-6 py-4 text-sm text-gray-600">{appointment.dateTime}</td>
// //                         <td className="px-6 py-4 text-sm text-gray-600">{appointment.staff}</td>
// //                         <td className="px-6 py-4 text-sm text-gray-600">{appointment.reason}</td>
// //                         <td className="px-6 py-4">
// //                           <Badge className={getStatusColor(appointment.status)}>
// //                             {appointment.status}
// //                           </Badge>
// //                         </td>
// //                         <td className="px-6 py-4">
// //                           <div className="flex items-center gap-2">
// //                             <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors">
// //                               <Eye className="w-4 h-4" />
// //                             </button>
// //                             <button className="p-2 text-gray-600 hover:text-teal-600 hover:bg-teal-50 rounded transition-colors">
// //                               <Pencil className="w-4 h-4" />
// //                             </button>
// //                             <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors">
// //                               <Trash2 className="w-4 h-4" />
// //                             </button>
// //                           </div>
// //                         </td>
// //                       </tr>
// //                     ))}
// //                   </tbody>
// //                 </table>
// //               </div>

// //               {filteredAppointments.length === 0 && (
// //                 <div className="py-12 text-center">
// //                   <p className="text-gray-500">No appointments found matching your search.</p>
// //                 </div>
// //               )}
// //             </CardContent>
// //           </Card>

// //           {/* Results Summary */}
// //           <div className="mt-4 text-sm text-gray-600">
// //             Showing {filteredAppointments.length} of {appointments.length} appointments
// //           </div>
// //         </div>
// //       </main>
// //     </div>
// //   );
// // }