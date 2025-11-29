"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/app/dashboard/lib/utils"
import { Menu, X, BarChart3, Users, Calendar, UserCog, Package, Building2 } from "lucide-react"

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: BarChart3 },
    { href: "/patients", label: "Patients", icon: Users },
    { href: "/appointments", label: "Appointments", icon: Calendar },
    { href: "/staff", label: "Staff", icon: UserCog },
    { href: "/inventory", label: "Inventory", icon: Package },
    { href: "/branches", label: "Branches", icon: Building2 },
  ]

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 p-3 bg-primary text-white rounded-full shadow-lg hover:bg-primary/90 transition-colors"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {isOpen && <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setIsOpen(false)} />}

      <nav
        className={cn(
          "fixed left-0 top-0 h-full w-64 bg-background border-r transform transition-transform duration-300 z-40 overflow-y-auto",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="p-6 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                  isActive ? "bg-primary text-white" : "text-muted-foreground hover:bg-accent",
                )}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
