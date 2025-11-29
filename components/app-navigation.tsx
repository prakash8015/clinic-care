"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/app/dashboard/lib/utils";
import {
  BarChart3,
  Users,
  Calendar,
  UserCog,
  Package,
  Building2,
} from "lucide-react";

export function AppNavigation() {
  const pathname = usePathname();

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: BarChart3 },
    { href: "/dashboard/patients", label: "Patients", icon: Users },
    { href: "/dashboard/appointments", label: "Appointments", icon: Calendar },
    { href: "/dashboard/staff", label: "Staff", icon: UserCog },
    { href: "/dashboard/inventory", label: "Inventory", icon: Package },
    { href: "/dashboard/branches", label: "Branches", icon: Building2 },
  ];

  return (
    <nav className="flex gap-1 border-b px-6 bg-background">
      {navItems.map((item) => {
        const Icon = item.icon;

        const isActive =
          pathname === item.href ||
          (item.href !== "/dashboard" && pathname.startsWith(item.href));

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors border-b-2 -mb-px",
              isActive
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            <Icon className="h-4 w-4" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}


// import { usePathname } from 'next/navigation';
// import { cn } from '@/lib/utils';
// import { BarChart3, Users, Calendar, UserCog, Package, Building2 } from 'lucide-react';

// export function AppNavigation() {
//   const pathname = usePathname();

//   const navItems = [
//     { href: '/dashboard', label: 'Dashboard', icon: BarChart3 },
//     { href: '/patients', label: 'Patients', icon: Users },
//     { href: '/appointments', label: 'Appointments', icon: Calendar },
//     { href: '/staff', label: 'Staff', icon: UserCog },
//     { href: '/inventory', label: 'Inventory', icon: Package },
//     { href: '/branches', label: 'Branches', icon: Building2 },
//   ];

//   return (
//     <nav className="flex gap-1 border-b px-6 bg-background">
//       {navItems.map((item) => {
//         const Icon = item.icon;
//         const isActive = pathname === item.href;

//         return (
//           <Link
//             key={item.href}
//             href={item.href}
//             className={cn(
//               'flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors border-b-2 -mb-px',
//               isActive
//                 ? 'border-primary text-primary'
//                 : 'border-transparent text-muted-foreground hover:text-foreground'
//             )}
//           >
//             <Icon className="h-4 w-4" />
//             {item.label}
//           </Link>
//         );
//       })}
//     </nav>
//   );
// }
