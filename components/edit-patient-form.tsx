'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

// ✅ Correct type import
import { Patient } from "@/lib/type"


interface EditPatientFormProps {
  patient: Patient
  onSuccess: (patient: Patient) => void
}

export function EditPatientForm({ patient, onSuccess }: EditPatientFormProps) {
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState<Patient>({
    ...patient,
    email: patient.email || '',
    phone: patient.phone || '',
    dateOfBirth: patient.dateOfBirth || '',
    gender: patient.gender || '',
    address: patient.address || '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    setTimeout(() => {
      onSuccess({ ...formData })
      setLoading(false)
    }, 500)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name *</Label>
          <Input
            id="firstName"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name *</Label>
          <Input
            id="lastName"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone</Label>
        <Input
          id="phone"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="dateOfBirth">Date of Birth</Label>
          <Input
            id="dateOfBirth"
            type="date"
            value={formData.dateOfBirth}
            onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="gender">Gender</Label>
          <Select
            value={formData.gender}
            onValueChange={(value) => setFormData({ ...formData, gender: value as Patient["gender"] })}
          >
            <SelectTrigger id="gender">
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">Address</Label>
        <Textarea
          id="address"
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          rows={3}
        />
      </div>

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? 'Updating...' : 'Update Patient'}
      </Button>
    </form>
  )
}



// // correct
// 'use client'

// import { useState } from 'react'
// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import { Label } from '@/components/ui/label'
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select'
// import { Textarea } from '@/components/ui/textarea'

// import { patient } from "../app/lib/type"





// interface EditPatientFormProps {
//   patient: Patient
//   onSuccess: (patient: Patient) => void
// }



// export function EditPatientForm({ patient, onSuccess }: EditPatientFormProps) {
//   const [loading, setLoading] = useState(false)
//   const [formData, setFormData] = useState<Patient>({
//     firstName: patient.firstName,
//     lastName: patient.lastName,
//     email: patient.email || '',
//     phone: patient.phone || '',
//     dateOfBirth: patient.dateOfBirth || '',
//     gender: patient.gender || '',
//     address: patient.address || '',
//   })

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     setLoading(true)

//     // Mock API delay
//     setTimeout(() => {
//       onSuccess({ ...formData, id: patient.id })
//       setLoading(false)
//     }, 500)
//   }

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <div className="grid grid-cols-2 gap-4">
//         <div className="space-y-2">
//           <Label htmlFor="firstName">First Name *</Label>
//           <Input
//             id="firstName"
//             value={formData.firstName}
//             onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
//             required
//           />
//         </div>
//         <div className="space-y-2">
//           <Label htmlFor="lastName">Last Name *</Label>
//           <Input
//             id="lastName"
//             value={formData.lastName}
//             onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
//             required
//           />
//         </div>
//       </div>

//       <div className="space-y-2">
//         <Label htmlFor="email">Email</Label>
//         <Input
//           id="email"
//           type="email"
//           value={formData.email}
//           onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//         />
//       </div>

//       <div className="space-y-2">
//         <Label htmlFor="phone">Phone</Label>
//         <Input
//           id="phone"
//           value={formData.phone}
//           onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
//         />
//       </div>

//       <div className="grid grid-cols-2 gap-4">
//         <div className="space-y-2">
//           <Label htmlFor="dateOfBirth">Date of Birth</Label>
//           <Input
//             id="dateOfBirth"
//             type="date"
//             value={formData.dateOfBirth}
//             onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
//           />
//         </div>
//         <div className="space-y-2">
//           <Label htmlFor="gender">Gender</Label>
//           <Select value={formData.gender} onValueChange={(value) => setFormData({ ...formData, gender: value })}>
//             <SelectTrigger id="gender">
//               <SelectValue placeholder="Select gender" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="male">Male</SelectItem>
//               <SelectItem value="female">Female</SelectItem>
//               <SelectItem value="other">Other</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>
//       </div>

//       <div className="space-y-2">
//         <Label htmlFor="address">Address</Label>
//         <Textarea
//           id="address"
//           value={formData.address}
//           onChange={(e) => setFormData({ ...formData, address: e.target.value })}
//           rows={3}
//         />
//       </div>

//       <Button type="submit" disabled={loading} className="w-full">
//         {loading ? 'Updating...' : 'Update Patient'}
//       </Button>
//     </form>
//   )
// }
