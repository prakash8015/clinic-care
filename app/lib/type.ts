export interface Branch {
  id: number;
  name: string;
  address: string;
  phone: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Patient {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: "male" | "female" | "other";
  address: string;
  branchId: number;
  lastVisit: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Staff {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  specialization: string;
  branchId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Appointment {
  id: number;
  patientId: number;
  staffId: number;
  appointmentDate: Date;
  reason: string;
  status: "scheduled" | "completed" | "cancelled";
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Inventory {
  id: number;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  reorderLevel: number;
  branchId: number;
  expiryDate: string;
  supplier: string;
  createdAt: Date;
  updatedAt: Date;
}
