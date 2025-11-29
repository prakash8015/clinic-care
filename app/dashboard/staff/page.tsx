'use client';

import { useState, useEffect } from 'react';
import { getStaff, getBranches, createStaff } from '../../../lib/action';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Mail, Phone, Plus, Search } from 'lucide-react';
import { toast } from 'sonner';
import type { Staff, Branch } from '../../../lib/type';

export default function StaffPage() {
  const [staffList, setStaffList] = useState<Staff[]>([]);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [filteredStaff, setFilteredStaff] = useState<Staff[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // FIXED — branchId starts as empty string
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    role: '',
    specialization: '',
    email: '',
    phone: '',
    branchId: '', // store as string, convert later
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [staffData, branchesData] = await Promise.all([
        getStaff(),
        getBranches()
      ]);

      setStaffList(staffData);
      setBranches(branchesData);
      setFilteredStaff(staffData);
    } catch (error) {
      console.error(error);
      toast.error('Failed to load staff');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);

    const filtered = staffList.filter((staff) =>
      `${staff.firstName} ${staff.lastName}`
        .toLowerCase()
        .includes(value.toLowerCase()) ||
      staff.email?.toLowerCase().includes(value.toLowerCase()) ||
      staff.role.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredStaff(filtered);
  };

  const handleAddStaff = async () => {
    try {
      await createStaff({
        ...formData,
        branchId: Number(formData.branchId), // convert to number
      });

      toast.success('Staff added!');
      setIsAddDialogOpen(false);
      loadData();
    } catch (err) {
      console.error(err);
      toast.error('Failed to add staff');
    }
  };

  const getBranchName = (branchId?: number) => {
    if (!branchId) return 'All Branches';
    return branches.find((b) => b.id === branchId)?.name || 'Unknown';
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Staff Management</h1>
          <p className="text-muted-foreground">
            Manage clinic staff and personnel
          </p>
        </div>

        {/* Add Staff Dialog */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Staff
            </Button>
          </DialogTrigger>

          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Staff Member</DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              {['firstName', 'lastName', 'role', 'specialization', 'email', 'phone'].map(
                (field) => (
                  <div className="space-y-1" key={field}>
                    <Label className="capitalize">
                      {field.replace(/([A-Z])/g, ' $1')}
                    </Label>
                    <Input
                      value={formData[field as keyof typeof formData]}
                      onChange={(e) =>
                        setFormData({ ...formData, [field]: e.target.value })
                      }
                    />
                  </div>
                )
              )}

              {/* Branch Dropdown */}
              <div className="space-y-1">
                <Label>Branch</Label>
                <select
                  className="border rounded-md p-2 w-full"
                  value={formData.branchId}
                  onChange={(e) =>
                    setFormData({ ...formData, branchId: e.target.value })
                  }
                >
                  <option value="">Select Branch</option>
                  {branches.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name}
                    </option>
                  ))}
                </select>
              </div>

              <Button className="w-full" onClick={handleAddStaff}>
                Save Staff
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search Bar */}
      <Card>
        <div className="p-6 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search staff..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Staff Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
          {loading ? (
            [...Array(6)].map((_, i) => (
              <Card key={i} className="p-4 space-y-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-3 w-2/3" />
              </Card>
            ))
          ) : filteredStaff.length === 0 ? (
            <div className="col-span-full text-center py-8 text-muted-foreground">
              No staff found
            </div>
          ) : (
            filteredStaff.map((staff) => (
              <div
                key={staff.id}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                    {staff.firstName[0]}
                    {staff.lastName[0]}
                  </div>

                  <div className="flex-1">
                    <h3 className="font-semibold">
                      {staff.firstName} {staff.lastName}
                    </h3>
                    <p className="text-sm text-muted-foreground">{staff.role}</p>
                    {staff.specialization && (
                      <p className="text-xs text-muted-foreground">
                        {staff.specialization}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-4 space-y-2 text-sm">
                  {staff.email && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Mail className="h-3.5 w-3.5" />
                      <span>{staff.email}</span>
                    </div>
                  )}

                  {staff.phone && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Phone className="h-3.5 w-3.5" />
                      <span>{staff.phone}</span>
                    </div>
                  )}

                  <div className="text-muted-foreground">
                    <span className="text-xs bg-secondary px-2 py-1 rounded">
                      {getBranchName(staff.branchId)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
}


// 'use client';

// import { useState, useEffect } from 'react';
// import { getStaff, getBranches, createStaff } from '../../lib/action';
// import { Button } from '@/components/ui/button';
// import { Card } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { Skeleton } from '@/components/ui/skeleton';
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
// import { Label } from '@/components/ui/label';
// import { Mail, Phone, Plus, Search } from 'lucide-react';
// import { toast } from 'sonner';
// import type { Staff, Branch } from '../../lib/type';

// export default function StaffPage() {
//   const [staffList, setStaffList] = useState<Staff[]>([]);
//   const [branches, setBranches] = useState<Branch[]>([]);
//   const [filteredStaff, setFilteredStaff] = useState<Staff[]>([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [loading, setLoading] = useState(true);

//   const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     role: '',
//     specialization: '',
//     email: '',
//     phone: '',
//      branchId: Number(branchId),
//   });

//   useEffect(() => {
//     loadData();
//   }, []);

//   const loadData = async () => {
//     try {
//       setLoading(true);
//       const [staffData, branchesData] = await Promise.all([getStaff(), getBranches()]);
//       setStaffList(staffData);
//       setBranches(branchesData);
//       setFilteredStaff(staffData);
//     } catch (error) {
//       console.error(error);
//       toast.error('Failed to load staff');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSearch = (value: string) => {
//     setSearchTerm(value);
//     const filtered = staffList.filter((staff) =>
//       `${staff.firstName} ${staff.lastName}`.toLowerCase().includes(value.toLowerCase()) ||
//       staff.email?.toLowerCase().includes(value.toLowerCase()) ||
//       staff.role.toLowerCase().includes(value.toLowerCase())
//     );
//     setFilteredStaff(filtered);
//   };

//   const handleAddStaff = async () => {
//     try {
//       await createStaff(formData);
//       toast.success('Staff added!');
//       setIsAddDialogOpen(false);
//       loadData();
//     } catch (err) {
//       console.error(err);
//       toast.error('Failed to add staff');
//     }
//   };

//   const getBranchName = (branchId?: number) => {
//     if (!branchId) return 'All Branches';
//     return branches.find((b) => b.id === branchId)?.name || 'Unknown';
//   };

//   return (
//     <div className="p-6 space-y-6">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold">Staff Management</h1>
//           <p className="text-muted-foreground">Manage clinic staff and personnel</p>
//         </div>

//         {/* Add Staff Dialog */}
//         <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
//           <DialogTrigger asChild>
//             <Button className="gap-2">
//               <Plus className="h-4 w-4" />
//               Add Staff
//             </Button>
//           </DialogTrigger>

//           <DialogContent className="max-w-md">
//             <DialogHeader>
//               <DialogTitle>Add New Staff Member</DialogTitle>
//             </DialogHeader>

//             {/* Add Staff Form */}
//             <div className="space-y-4">
//               {['firstName', 'lastName', 'role', 'specialization', 'email', 'phone'].map((field) => (
//                 <div className="space-y-1" key={field}>
//                   <Label className="capitalize">{field.replace(/([A-Z])/g, ' $1')}</Label>
//                   <Input
//                     value={formData[field as keyof typeof formData]}
//                     onChange={(e) =>
//                       setFormData({ ...formData, [field]: e.target.value })
//                     }
//                   />
//                 </div>
//               ))}

//               {/* Branch Selection */}
//               <div className="space-y-1">
//                 <Label>Branch</Label>
//                 <select
//                   className="border rounded-md p-2 w-full"
//                   value={formData.branchId}
//                   onChange={(e) =>
//                     setFormData({ ...formData, branchId: e.target.value })
//                   }
//                 >
//                   <option value="">Select Branch</option>
//                   {branches.map((b) => (
//                     <option key={b.id} value={b.id}>
//                       {b.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <Button className="w-full" onClick={handleAddStaff}>
//                 Save Staff
//               </Button>
//             </div>
//           </DialogContent>
//         </Dialog>
//       </div>

//       {/* Search Bar */}
//       <Card>
//         <div className="p-6 border-b">
//           <div className="relative">
//             <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//             <Input
//               placeholder="Search staff..."
//               className="pl-10"
//               value={searchTerm}
//               onChange={(e) => handleSearch(e.target.value)}
//             />
//           </div>
//         </div>

//         {/* Staff Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
//           {loading ? (
//             // 🔥 Loading Skeleton Cards
//             [...Array(6)].map((_, i) => (
//               <Card key={i} className="p-4 space-y-4">
//                 <Skeleton className="h-12 w-12 rounded-full" />
//                 <Skeleton className="h-4 w-3/4" />
//                 <Skeleton className="h-4 w-1/2" />
//                 <Skeleton className="h-3 w-2/3" />
//               </Card>
//             ))
//           ) : filteredStaff.length === 0 ? (
//             <div className="col-span-full text-center py-8 text-muted-foreground">
//               No staff found
//             </div>
//           ) : (
//             filteredStaff.map((staff) => (
//               <div
//                 key={staff.id}
//                 className="border rounded-lg p-4 hover:shadow-md transition-shadow"
//               >
//                 {/* Avatar */}
//                 <div className="flex items-start gap-3">
//                   <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
//                     {staff.firstName[0]}
//                     {staff.lastName[0]}
//                   </div>

//                   <div className="flex-1">
//                     <h3 className="font-semibold">
//                       {staff.firstName} {staff.lastName}
//                     </h3>
//                     <p className="text-sm text-muted-foreground">{staff.role}</p>
//                     {staff.specialization && (
//                       <p className="text-xs text-muted-foreground">
//                         {staff.specialization}
//                       </p>
//                     )}
//                   </div>
//                 </div>

//                 {/* Contact + Branch */}
//                 <div className="mt-4 space-y-2 text-sm">
//                   {staff.email && (
//                     <div className="flex items-center gap-2 text-muted-foreground">
//                       <Mail className="h-3.5 w-3.5" />
//                       <span>{staff.email}</span>
//                     </div>
//                   )}

//                   {staff.phone && (
//                     <div className="flex items-center gap-2 text-muted-foreground">
//                       <Phone className="h-3.5 w-3.5" />
//                       <span>{staff.phone}</span>
//                     </div>
//                   )}

//                   <div className="text-muted-foreground">
//                     <span className="text-xs bg-secondary px-2 py-1 rounded">
//                       {getBranchName(staff.branchId)}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </Card>
//     </div>
//   );
// }
