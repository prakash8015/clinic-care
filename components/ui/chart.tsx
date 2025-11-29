"use client"

import * as React from "react"
import { cn } from "@/app/dashboard/lib/utils"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  Pie,
  PieChart,
  Area,
  AreaChart,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from "recharts"

export function ChartContainer({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("w-full h-full", className)} {...props}>
      {children}
    </div>
  )
}

export function ChartTooltip({
  content,
}: {
  content: React.ReactNode
}) {
  return (
    <RechartsTooltip
      cursor={false}
      content={({ active, payload, label }) =>
        React.cloneElement(content as any, {
          active,
          payload,
          label,
        })
      }
    />
  )
}

export function ChartTooltipContent({
  active,
  payload,
  label,
}: {
  active?: boolean
  payload?: any[]
  label?: string | number
}) {
  if (!active || !payload || payload.length === 0) return null

  return (
    <div className="rounded-md border bg-background p-2 shadow">
      <div className="font-medium mb-1">{label}</div>
      {payload.map((item, index) => (
        <div key={index} className="flex justify-between gap-4 text-sm">
          <span className="text-muted-foreground">{item.name}</span>
          <span className="font-medium">{item.value}</span>
        </div>
      ))}
    </div>
  )
}

// Re-exports for convenience
export {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  Pie,
  PieChart,
  Area,
  AreaChart,
  XAxis,
  YAxis,
  ResponsiveContainer,
}
