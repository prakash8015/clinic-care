"use client";

import { useState } from "react";
import { createPatient } from "@/app/lib/action";
import { useRouter } from "next/navigation";

export default function AddPatientPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    await createPatient({
      firstName: form.firstName,
      lastName: form.lastName,
    });

    router.push("/patients"); // redirect after successful add
    router.refresh(); // reload updated database list
  }

  return (
    <div style={{ maxWidth: 500 }} className="mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Add New Patient</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* First Name */}
        <div>
          <label className="block font-medium mb-1">First Name</label>
          <input
            type="text"
            required
            value={form.firstName}
            onChange={(e) =>
              setForm({ ...form, firstName: e.target.value })
            }
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Last Name */}
        <div>
          <label className="block font-medium mb-1">Last Name</label>
          <input
            type="text"
            required
            value={form.lastName}
            onChange={(e) =>
              setForm({ ...form, lastName: e.target.value })
            }
            className="w-full p-2 border rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white rounded px-4 py-2"
        >
          Save Patient
        </button>
      </form>
    </div>
  );
}


// "use client";

// import { useState } from "react";
// import { createPatient } from "@/app/lib/action";

// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import { toast } from "sonner";

// export default function AddPatientPage() {
//   const [open, setOpen] = useState(false);
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");

//   async function handleSubmit() {
//     if (!firstName || !lastName) {
//       toast.error("Both first and last names are required");
//       return;
//     }

//     try {
//       await createPatient({
//         firstName,
//         lastName,
//       });

//       toast.success("Patient added!");

//       setFirstName("");
//       setLastName("");
//       setOpen(false);

//     } catch (err) {
//       toast.error("Failed to add patient");
//     }
//   }

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold mb-4">Patients</h1>

//       <Dialog open={open} onOpenChange={setOpen}>
//         <DialogTrigger asChild>
//           <Button>Add Patient</Button>
//         </DialogTrigger>

//         <DialogContent className="max-w-md">
//           <DialogHeader>
//             <DialogTitle>Add New Patient</DialogTitle>
//           </DialogHeader>

//           <div className="space-y-4">
//             <div className="space-y-2">
//               <Label>First Name</Label>
//               <Input
//                 value={firstName}
//                 onChange={(e) => setFirstName(e.target.value)}
//                 placeholder="Enter first name"
//               />
//             </div>

//             <div className="space-y-2">
//               <Label>Last Name</Label>
//               <Input
//                 value={lastName}
//                 onChange={(e) => setLastName(e.target.value)}
//                 placeholder="Enter last name"
//               />
//             </div>

//             <Button className="w-full" onClick={handleSubmit}>
//               Save Patient
//             </Button>
//           </div>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }
