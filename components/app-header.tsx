"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Building2, LogOut, Settings } from "lucide-react";

interface AppHeaderProps {
  branches: Array<{ id: number; name: string }>;
  selectedBranch?: number;
  onBranchChange?: (branchId: number) => void;
}

export function AppHeader({
  branches,
  selectedBranch,
  onBranchChange,
}: AppHeaderProps) {
  const router = useRouter();

  // 🚀 Fix hydration mismatch
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <header className="border-b bg-background">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
            CC
          </div>
          <div className="flex flex-col gap-0.5">
            <h1 className="text-lg font-bold text-foreground">ClinicCare</h1>
            <p className="text-xs text-muted-foreground">
              Multi-Branch Management
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Select
            value={selectedBranch?.toString() ?? "0"}
            onValueChange={(value) => onBranchChange?.(Number(value))}
          >
            <SelectTrigger className="w-48">
              <Building2 className="h-4 w-4" />
              <SelectValue placeholder="Select branch" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">All Branches</SelectItem>
              {branches.map((branch) => (
                <SelectItem key={branch.id} value={branch.id.toString()}>
                  {branch.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}



// "use client"

// import { useRouter } from "next/navigation"
// import { Button } from "@/components/ui/button"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Building2, LogOut, Settings } from "lucide-react"

// interface AppHeaderProps {
//   branches: Array<{ id: number; name: string }>
//   selectedBranch?: number
//   onBranchChange?: (branchId: number) => void
// }

// export function AppHeader({ branches, selectedBranch, onBranchChange }: AppHeaderProps) {
//   const router = useRouter()

//   return (
//     <header className="border-b bg-background">
//       <div className="flex h-16 items-center justify-between px-6">
//         <div className="flex items-center gap-3">
//           <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
//             CC
//           </div>
//           <div className="flex flex-col gap-0.5">
//             <h1 className="text-lg font-bold text-foreground">ClinicCare</h1>
//             <p className="text-xs text-muted-foreground">Multi-Branch Management</p>
//           </div>
//         </div>

//         <div className="flex items-center gap-4">
//           <Select
//             value={selectedBranch?.toString() || "0"}
//             onValueChange={(value) => onBranchChange?.(Number.parseInt(value))}
//           >
//             <SelectTrigger className="w-48">
//               <Building2 className="h-4 w-4" />
//               <SelectValue placeholder="Select branch" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="0">All Branches</SelectItem>
//               {branches.map((branch) => (
//                 <SelectItem key={branch.id} value={branch.id.toString()}>
//                   {branch.name}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>

//           <Button variant="ghost" size="icon">
//             <Settings className="h-5 w-5" />
//           </Button>
//           <Button variant="ghost" size="icon">
//             <LogOut className="h-5 w-5" />
//           </Button>
//         </div>
//       </div>
//     </header>
//   )
// }
