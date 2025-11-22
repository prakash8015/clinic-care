export type Patient = {
  id: number;
  firstName: string;
  lastName: string;
  age?: number;
  gender?: string;
};

export type Staff = {
  id: number;
  firstName: string;
  lastName: string;
  role?: string;
};

export type Appointment = {
  id: number;
  patientId: number;
  staffId?: number;
  appointmentDate: string;
  reason?: string;
  status: "scheduled" | "completed" | "cancelled";
};
