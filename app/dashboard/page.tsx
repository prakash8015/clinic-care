// DashboardPage.jsx

"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Users,
  Calendar,
  UserCheck,
  Package,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

export default function ClinicCareDashboard() {
  const [selectedBranch, setSelectedBranch] = useState("all");

  const stats = [
    {
      title: "Total Patients",
      value: "6",
      subtitle: "3 male, 3 female",
      trend: "+12% vs last month",
      trendUp: true,
      icon: Users,
      bgColor: "bg-cyan-50",
      iconColor: "text-cyan-600",
    },
    {
      title: "Appointments",
      value: "5",
      subtitle: "4 scheduled",
      trend: "+8% vs last month",
      trendUp: true,
      icon: Calendar,
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      title: "Staff Members",
      value: "4",
      subtitle: "Active staff",
      trend: "+2% vs last month",
      trendUp: true,
      icon: UserCheck,
      bgColor: "bg-teal-50",
      iconColor: "text-teal-600",
    },
    {
      title: "Inventory Items",
      value: "6",
      subtitle: "3 low stock",
      trend: "-3% vs last month",
      trendUp: false,
      icon: Package,
      bgColor: "bg-red-50",
      iconColor: "text-red-600",
    },
  ];

  const patientGrowth = [
    { month: "Jan", patients: 20 },
    { month: "Feb", patients: 25 },
    { month: "Mar", patients: 22 },
    { month: "Apr", patients: 30 },
    { month: "May", patients: 28 },
  ];

  const appointmentStats = [
    { name: "Completed", value: 40 },
    { name: "Pending", value: 25 },
    { name: "Cancelled", value: 10 },
  ];

  const COLORS = ["#0ea5e9", "#10b981", "#f43f5e"];

  return (
    <div className="px-6 py-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h2>
        <p className="text-gray-600">Welcome to ClinicCare Management System</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, index) => (
          <Card key={index} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600 mb-2">{stat.title}</p>
                  <h3 className="text-4xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                  <p className="text-sm text-gray-500">{stat.subtitle}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
                </div>
              </div>

              <div className="flex items-center gap-1 text-sm">
                {stat.trendUp ? (
                  <>
                    <TrendingUp className="w-4 h-4 text-orange-500" />
                    <span className="text-orange-600 font-medium">{stat.trend}</span>
                  </>
                ) : (
                  <>
                    <TrendingDown className="w-4 h-4 text-red-500" />
                    <span className="text-red-600 font-medium">{stat.trend}</span>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Patient Growth</CardTitle>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={patientGrowth}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="patients" stroke="#0ea5e9" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Appointments Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={appointmentStats} dataKey="value" nameKey="name" outerRadius={100}>
                  {appointmentStats.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Monthly Appointments</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={patientGrowth}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="patients" barSize={40} fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
