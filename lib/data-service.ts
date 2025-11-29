import type { Patient, Branch, Staff, Appointment, Inventory } from "./type"
import { mockBranches, mockPatients, mockStaff, mockAppointments, mockInventory } from "./mock-data"

// Simulates API delays for realistic UX

const DELAY = 100 // Simulate network delay

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// Patients
export async function getPatients(branchId?: number, searchTerm?: string): Promise<Patient[]> {
  await delay(DELAY)

  let result = [...mockPatients]

  if (branchId) {
    result = result.filter((p) => p.branchId === branchId)
  }

  if (searchTerm) {
    const term = searchTerm.toLowerCase()
    result = result.filter(
      (p) =>
        `${p.firstName} ${p.lastName}`.toLowerCase().includes(term) ||
        p.email?.toLowerCase().includes(term) ||
        p.phone?.includes(term),
    )
  }

  return result
}

export async function getPatientById(id: number): Promise<Patient | null> {
  await delay(DELAY)
  return mockPatients.find((p) => p.id === id) || null
}

export async function createPatient(data: Omit<Patient, "id" | "createdAt" | "updatedAt">): Promise<Patient> {
  await delay(DELAY)

  const newPatient: Patient = {
    ...data,
    id: Math.max(...mockPatients.map((p) => p.id)) + 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  mockPatients.push(newPatient)
  return newPatient
}

export async function updatePatient(id: number, data: Partial<Patient>): Promise<Patient | null> {
  await delay(DELAY)

  const index = mockPatients.findIndex((p) => p.id === id)
  if (index === -1) return null

  mockPatients[index] = { ...mockPatients[index], ...data, updatedAt: new Date() }
  return mockPatients[index]
}

export async function deletePatient(id: number): Promise<boolean> {
  await delay(DELAY)

  const index = mockPatients.findIndex((p) => p.id === id)
  if (index === -1) return false

  mockPatients.splice(index, 1)
  return true
}

export async function getPatientStats(branchId?: number) {
  await delay(DELAY)

  const patients = branchId ? mockPatients.filter((p) => p.branchId === branchId) : mockPatients

  return {
    total: patients.length,
    maleCount: patients.filter((p) => p.gender === "male").length,
    femaleCount: patients.filter((p) => p.gender === "female").length,
  }
}

// Branches
export async function getBranches(): Promise<Branch[]> {
  await delay(DELAY)
  return [...mockBranches]
}

export async function createBranch(data: Omit<Branch, "id" | "createdAt" | "updatedAt">): Promise<Branch> {
  await delay(DELAY)

  const newBranch: Branch = {
    ...data,
    id: Math.max(...mockBranches.map((b) => b.id)) + 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  mockBranches.push(newBranch)
  return newBranch
}

// Appointments
export async function getAppointments(
  branchId?: number,
  status?: string,
  dateFrom?: Date,
  dateTo?: Date,
): Promise<Appointment[]> {
  await delay(DELAY)

  let result = [...mockAppointments]

  if (branchId) {
    result = result.filter((a) => {
      const patient = mockPatients.find((p) => p.id === a.patientId)
      return patient?.branchId === branchId
    })
  }

  if (status) {
    result = result.filter((a) => a.status === status)
  }

  if (dateFrom) {
    result = result.filter((a) => new Date(a.appointmentDate) >= dateFrom)
  }

  if (dateTo) {
    result = result.filter((a) => new Date(a.appointmentDate) <= dateTo)
  }

  return result.sort((a, b) => new Date(b.appointmentDate).getTime() - new Date(a.appointmentDate).getTime())
}

export async function createAppointment(
  data: Omit<Appointment, "id" | "createdAt" | "updatedAt">,
): Promise<Appointment> {
  await delay(DELAY)

  const newAppointment: Appointment = {
    ...data,
    id: Math.max(...mockAppointments.map((a) => a.id)) + 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  mockAppointments.push(newAppointment)
  return newAppointment
}

export async function updateAppointment(id: number, data: Partial<Appointment>): Promise<Appointment | null> {
  await delay(DELAY)

  const index = mockAppointments.findIndex((a) => a.id === id)
  if (index === -1) return null

  mockAppointments[index] = { ...mockAppointments[index], ...data, updatedAt: new Date() }
  return mockAppointments[index]
}

export async function getAppointmentStats(branchId?: number) {
  await delay(DELAY)

  const appointments = branchId
    ? mockAppointments.filter((a) => {
        const patient = mockPatients.find((p) => p.id === a.patientId)
        return patient?.branchId === branchId
      })
    : mockAppointments

  return {
    total: appointments.length,
    scheduled: appointments.filter((a) => a.status === "scheduled").length,
    completed: appointments.filter((a) => a.status === "completed").length,
    cancelled: appointments.filter((a) => a.status === "cancelled").length,
  }
}

// Staff
export async function getStaff(branchId?: number): Promise<Staff[]> {
  await delay(DELAY)

  let result = [...mockStaff]
  if (branchId) {
    result = result.filter((s) => s.branchId === branchId)
  }

  return result
}

export async function createStaff(data: Omit<Staff, "id" | "createdAt" | "updatedAt">): Promise<Staff> {
  await delay(DELAY)

  const newStaff: Staff = {
    ...data,
    id: Math.max(...mockStaff.map((s) => s.id)) + 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  mockStaff.push(newStaff)
  return newStaff
}

// Inventory
export async function getInventory(branchId?: number): Promise<Inventory[]> {
  await delay(DELAY)

  let result = [...mockInventory]
  if (branchId) {
    result = result.filter((i) => i.branchId === branchId)
  }

  return result
}

export async function getLowStockItems(branchId?: number): Promise<Inventory[]> {
  await delay(DELAY)

  let result = [...mockInventory]
  if (branchId) {
    result = result.filter((i) => i.branchId === branchId)
  }

  return result.filter((item) => item.quantity <= (item.reorderLevel || 10))
}

export async function createInventoryItem(data: Omit<Inventory, "id" | "createdAt" | "updatedAt">): Promise<Inventory> {
  await delay(DELAY)

  const newItem: Inventory = {
    ...data,
    id: Math.max(...mockInventory.map((i) => i.id)) + 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  mockInventory.push(newItem)
  return newItem
}
