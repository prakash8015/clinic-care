"use server";

import {
  mockBranches,
  mockPatients,
  mockStaff,
  mockAppointments,
  mockInventory,
} from "./mock-data";

import type {
  Branch,
  Patient,
  Staff,
  Appointment,
  Inventory,
} from "../lib/type";

// --------------------------------------------
// IN-MEMORY DATABASE (from mock-data)
// --------------------------------------------
let branches: Branch[] = [...mockBranches];
let patients: Patient[] = [...mockPatients];
let staff: Staff[] = [...mockStaff];
let appointments: Appointment[] = [...mockAppointments];
let inventory: Inventory[] = [...mockInventory];

// --------------------------------------------
// GETTERS
// --------------------------------------------
export async function getBranches() {
  return branches;
}

export async function getPatients() {
  return patients;
}

export async function getStaff() {
  return staff;
}

export async function getAppointments() {
  return appointments;
}

export async function getInventory(branchId?: number) {
  if (branchId) return inventory.filter((i) => i.branchId === branchId);
  return inventory;
}

// --------------------------------------------
// CREATE PATIENT
// --------------------------------------------
export async function createPatient(data: Omit<Patient, "id" | "createdAt" | "updatedAt">) {
  const newPatient: Patient = {
    id: patients.length + 1,
    ...data,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  patients.push(newPatient);
  return newPatient;
}

// --------------------------------------------
// CREATE STAFF
// --------------------------------------------
export async function createStaff(data: Omit<Staff, "id" | "createdAt" | "updatedAt">) {
  const newStaff: Staff = {
    id: staff.length + 1,
    ...data,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  staff.push(newStaff);
  return newStaff;
}

// --------------------------------------------
// CREATE APPOINTMENT
// --------------------------------------------
export async function createAppointment(
  data: Omit<Appointment, "id" | "status" | "createdAt" | "updatedAt">
) {
  const newAppt: Appointment = {
    id: appointments.length + 1,
    status: "scheduled",
    ...data,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  appointments.push(newAppt);
  return newAppt;
}

// --------------------------------------------
// CREATE INVENTORY ITEM
// --------------------------------------------
export async function createInventoryItem(
  data: Omit<Inventory, "id" | "createdAt" | "updatedAt">
) {
  const newItem: Inventory = {
    id: inventory.length + 1,
    ...data,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  inventory.push(newItem);
  return newItem;
}



// "use server";

// import { Appointment, Patient, Staff, Branch, Inventory } from "./type";

// // ---------------------------------------------------------
// // IN-MEMORY DATABASE
// // ---------------------------------------------------------

// // Branch list
// let branches: Branch[] = [
//   { id: 1, name: "Boston Medical Center" },
//   { id: 2, name: "Cambridge Health Clinic" },
//   { id: 3, name: "Somerville Community Hospital" },
// ];

// // Staff list
// let staff: Staff[] = [
//   {
//     id: 1,
//     firstName: "Dr.",
//     lastName: "Adams",
//     role: "Doctor",
//     specialization: "General Medicine",
//     email: "dr.adams@example.com",
//     phone: "123-456-7890",
//     branchId: 1,
//   },
//   {
//     id: 2,
//     firstName: "Nurse",
//     lastName: "Kelly",
//     role: "Nurse",
//     specialization: "Pediatrics",
//     email: "kelly@example.com",
//     phone: "555-123-7890",
//     branchId: 2,
//   },
// ];

// // Patient list
// let patients: Patient[] = [
//   {
//     id: 1,
//     firstName: "John",
//     lastName: "Doe",
//     age: 30,
//     gender: "Male",
//     phone: "999-888-7777",
//   },
//   {
//     id: 2,
//     firstName: "Sarah",
//     lastName: "Smith",
//     age: 26,
//     gender: "Female",
//     phone: "777-666-5555",
//   },
// ];

// // Appointment list
// let appointments: Appointment[] = [
//   {
//     id: 1,
//     patientId: 1,
//     staffId: 1,
//     reason: "Consultation",
//     appointmentDate: new Date().toISOString(),
//     status: "scheduled",
//   },
// ];

// // ---------------------------------------------------------
// // INVENTORY DATABASE
// // ---------------------------------------------------------
// let inventory: Inventory[] = [];

// // ---------------------------------------------------------
// // INVENTORY FUNCTIONS
// // ---------------------------------------------------------

// export async function getInventory(branchId?: number) {
//   if (branchId) {
//     return inventory.filter((i) => i.branchId === branchId);
//   }
//   return inventory;
// }

// export async function createInventoryItem(data: {
//   name: string;
//   category: string;
//   quantity: number;
//   unit?: string;
//   reorderLevel?: number;
//   branchId?: number;
//   expiryDate?: string;
//   supplier?: string;
// }) {
//   try {
//     const newItem: Inventory = {
//       id: inventory.length + 1,
//       ...data,
//     };

//     inventory.push(newItem);

//     console.log("Inventory Item Added:", newItem);

//     return newItem;
//   } catch (error) {
//     console.error("Error creating inventory item:", error);
//     throw error;
//   }
// }

// // ---------------------------------------------------------
// // GETTERS
// // ---------------------------------------------------------
// export async function getBranches() {
//   return branches;
// }

// export async function getStaff() {
//   return staff;
// }

// export async function getPatients() {
//   return patients;
// }

// export async function getAppointments() {
//   return appointments;
// }

// // ---------------------------------------------------------
// // CREATE STAFF
// // ---------------------------------------------------------
// export async function createStaff(data: Omit<Staff, "id">) {
//   const newStaff: Staff = {
//     id: staff.length + 1,
//     ...data,
//   };

//   staff.push(newStaff);

//   console.log("Staff Added:", newStaff);

//   return newStaff;
// }

// // ---------------------------------------------------------
// // CREATE PATIENT
// // ---------------------------------------------------------
// export async function createPatient(data: Omit<Patient, "id">) {
//   const newPatient: Patient = {
//     id: patients.length + 1,
//     ...data,
//   };

//   patients.push(newPatient);

//   console.log("Patient Added:", newPatient);

//   return newPatient;
// }

// // ---------------------------------------------------------
// // CREATE APPOINTMENT
// // ---------------------------------------------------------
// export async function createAppointment(
//   data: Omit<Appointment, "id" | "status">
// ) {
//   const newAppt: Appointment = {
//     id: appointments.length + 1,
//     status: "scheduled",
//     ...data,
//   };

//   appointments.push(newAppt);

//   console.log("Appointment Added:", newAppt);

//   return newAppt;
// }



// // "use server";

// // import { Appointment, Patient, Staff, Branch,Inventory } from "./type";

// // // --------------------------------------------
// // // IN-MEMORY DATABASE
// // // --------------------------------------------

// // // Branch list
// // let branches: Branch[] = [
// //   { id: 1, name: "Boston Medical Center" },
// //   { id: 2, name: "Cambridge Health Clinic" },
// //   { id: 3, name: "Somerville Community Hospital" },
// // ];

// // // Staff list
// // let staff: Staff[] = [
// //   {
// //     id: 1,
// //     firstName: "Dr.",
// //     lastName: "Adams",
// //     role: "Doctor",
// //     specialization: "General Medicine",
// //     email: "dr.adams@example.com",
// //     phone: "123-456-7890",
// //     branchId: 1,
// //   },
// //   {
// //     id: 2,
// //     firstName: "Nurse",
// //     lastName: "Kelly",
// //     role: "Nurse",
// //     specialization: "Pediatrics",
// //     email: "kelly@example.com",
// //     phone: "555-123-7890",
// //     branchId: 2,
// //   },
// // ];

// // // Patient list
// // let patients: Patient[] = [
// //   {
// //     id: 1,
// //     firstName: "John",
// //     lastName: "Doe",
// //     age: 30,
// //     gender: "Male",
// //     phone: "999-888-7777",
// //   },
// //   {
// //     id: 2,
// //     firstName: "Sarah",
// //     lastName: "Smith",
// //     age: 26,
// //     gender: "Female",
// //     phone: "777-666-5555",
// //   },
// // ];

// // // Appointment list
// // let appointments: Appointment[] = [
// //   {
// //     id: 1,
// //     patientId: 1,
// //     staffId: 1,
// //     reason: "Consultation",
// //     appointmentDate: new Date().toISOString(),
// //     status: "scheduled",
// //   },
// // ];

// // // Inventory list
// // let inventory: Inventory[] = [];


// // export async function createInventoryItem(data: {
// //   name: string;
// //   category: string;
// //   quantity: number;
// //   unit?: string;
// //   reorderLevel?: number;
// //   branchId?: number;
// //   expiryDate?: string;
// //   supplier?: string;
// // }) {
// //   try {
// //     const newItem: Inventory = {
// //       id: inventory.length + 1,
// //       ...data,
// //     };

// //     inventory.push(newItem);

// //     return newItem;
// //   } catch (error) {
// //     console.error("Error creating inventory item:", error);
// //     throw error;
// //   }
// // }


// // // --------------------------------------------
// // // GETTERS
// // // --------------------------------------------
// // export async function getBranches() {
// //   return branches;
// // }

// // export async function getStaff() {
// //   return staff;
// // }

// // export async function getPatients() {
// //   return patients;
// // }

// // export async function getAppointments() {
// //   return appointments;
// // }

// // // --------------------------------------------
// // // CREATE STAFF
// // // --------------------------------------------
// // export async function createStaff(data: Omit<Staff, "id">) {
// //   const newStaff: Staff = {
// //     id: staff.length + 1,
// //     ...data,
// //   };

// //   staff.push(newStaff);

// //   console.log("Staff Added:", newStaff);

// //   return newStaff;
// // }

// // // --------------------------------------------
// // // CREATE PATIENT
// // // --------------------------------------------
// // export async function createPatient(data: Omit<Patient, "id">) {
// //   const newPatient: Patient = {
// //     id: patients.length + 1,
// //     ...data,
// //   };

// //   patients.push(newPatient);

// //   console.log("Patient Added:", newPatient);

// //   return newPatient;
// // }

// // // --------------------------------------------
// // // CREATE APPOINTMENT
// // // --------------------------------------------
// // export async function createAppointment(
// //   data: Omit<Appointment, "id" | "status">
// // ) {
// //   const newAppt: Appointment = {
// //     id: appointments.length + 1,
// //     status: "scheduled",
// //     ...data,
// //   };

// //   appointments.push(newAppt);

// //   console.log("Appointment Added:", newAppt);

// //   return newAppt;
// // }



// // // "use server";

// // // import { Appointment, Patient, Staff } from "./type";

// // // // --------------------------------------------
// // // // IN-MEMORY DATABASE
// // // // --------------------------------------------
// // // let appointments: Appointment[] = [
// // //   {
// // //     id: 1,
// // //     patientId: 1,
// // //     staffId: 1,
// // //     reason: "Consultation",
// // //     appointmentDate: new Date().toISOString(),
// // //     status: "scheduled",
// // //   },
// // // ];

// // // let patients: Patient[] = [
// // //   { id: 1, firstName: "John", lastName: "Doe" },
// // //   { id: 2, firstName: "Sarah", lastName: "Smith" },
// // // ];

// // // let staff: Staff[] = [
// // //   { id: 1, firstName: "Dr.", lastName: "Adams" },
// // //   { id: 2, firstName: "Nurse", lastName: "Kelly" },
// // // ];

// // // // --------------------------------------------
// // // // GETTERS
// // // // --------------------------------------------
// // // export async function getAppointments() {
// // //   return appointments;
// // // }

// // // export async function getPatients() {
// // //   console.log("DB Patients:", patients);
// // //   return patients;
// // // }

// // // export async function getStaff() {
// // //   return staff;
// // // }

// // // // --------------------------------------------
// // // // CREATE PATIENT  ✅ FIXED
// // // // --------------------------------------------
// // // export async function createPatient(data: Omit<Patient, "id">) {
// // //   const newPatient: Patient = {
// // //     id: patients.length + 1,
// // //     ...data,
// // //   };

// // //   patients.push(newPatient);

// // //   console.log("Patient Added:", newPatient);
// // //   console.log("All Patients After Add:", patients);

// // //   return newPatient;
// // // }

// // // // --------------------------------------------
// // // // CREATE APPOINTMENT
// // // // --------------------------------------------
// // // export async function createAppointment(
// // //   data: Omit<Appointment, "id" | "status">
// // // ) {
// // //   const newAppt: Appointment = {
// // //     id: appointments.length + 1,
// // //     status: "scheduled",
// // //     ...data,
// // //   };

// // //   appointments.push(newAppt);
// // //   return newAppt;
// // // }
