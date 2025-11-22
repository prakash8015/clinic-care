"use server";

import { Appointment, Patient, Staff } from "./type";

let appointments: Appointment[] = [
  {
    id: 1,
    patientId: 1,
    staffId: 1,
    reason: "Consultation",
    appointmentDate: new Date().toISOString(),
    status: "scheduled",
  },
];

let patients: Patient[] = [
  { id: 1, firstName: "John", lastName: "Doe" },
  { id: 2, firstName: "Sarah", lastName: "Smith" },
];

let staff: Staff[] = [
  { id: 1, firstName: "Dr.", lastName: "Adams" },
  { id: 2, firstName: "Nurse", lastName: "Kelly" },
];

export async function getAppointments() {
  return appointments;
}

export async function getPatients() {
    console.log("DB Patients:", patients);
  return patients;
}



export async function getStaff() {
  return staff;
}

export async function createAppointment(data: Omit<Appointment, "id" | "status">) {
  const newAppt: Appointment = {
    id: appointments.length + 1,
    status: "scheduled",
    ...data,
  };
  appointments.push(newAppt);
  return newAppt;
}
