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

  // 📊 Demo chart data
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

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, index) => (
          <Card key={index} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600 mb-2">
                    {stat.title}
                  </p>
                  <h3 className="text-4xl font-bold text-gray-900 mb-1">
                    {stat.value}
                  </h3>
                  <p className="text-sm text-gray-500">{stat.subtitle}</p>
                </div>

                {/* Icon */}
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
                </div>
              </div>

              <div className="flex items-center gap-1 text-sm">
                {stat.trendUp ? (
                  <>
                    <TrendingUp className="w-4 h-4 text-orange-500" />
                    <span className="text-orange-600 font-medium">
                      {stat.trend}
                    </span>
                  </>
                ) : (
                  <>
                    <TrendingDown className="w-4 h-4 text-red-500" />
                    <span className="text-red-600 font-medium">
                      {stat.trend}
                    </span>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 📈 Line Chart */}
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

        {/* 🥧 Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Appointments Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={appointmentStats}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={100}
                >
                  {appointmentStats.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* 📊 Bar Chart */}
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
                <Bar dataKey="patients" fill="#10b981" barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


// "use client"
// import React, { useState } from 'react';
// import { Card, CardContent } from '@/components/ui/card';
// import { 
//   Users, 
//   Calendar, 
//   UserCheck, 
//   Package,
//   LayoutDashboard,
//   UserSquare2,
//   CalendarDays,
//   UsersRound,
//   Box,
//   Building2,
//   TrendingUp,
//   TrendingDown
// } from 'lucide-react';


// export default function ClinicCareDashboard() {
//   const [selectedBranch, setSelectedBranch] = useState('all');

//     const stats = [
//     {
//       title: 'Total Patients',
//       value: '6',
//       subtitle: '3 male, 3 female',
//       trend: '+12% vs last month',
//       trendUp: true,
//       icon: Users,
//       bgColor: 'bg-cyan-50',
//       iconColor: 'text-cyan-600'
//     },
//     {
//       title: 'Appointments',
//       value: '5',
//       subtitle: '4 scheduled',
//       trend: '+8% vs last month',
//       trendUp: true,
//       icon: Calendar,
//       bgColor: 'bg-blue-50',
//       iconColor: 'text-blue-600'
//     },
//     {
//       title: 'Staff Members',
//       value: '4',
//       subtitle: 'Active staff',
//       trend: '+2% vs last month',
//       trendUp: true,
//       icon: UserCheck,
//       bgColor: 'bg-teal-50',
//       iconColor: 'text-teal-600'
//     },
//     {
//       title: 'Inventory Items',
//       value: '6',
//       subtitle: '3 low stock',
//       trend: '-3% vs last month',
//       trendUp: false,
//       icon: Package,
//       bgColor: 'bg-red-50',
//       iconColor: 'text-red-600'
//     }
//   ];

//   return (
//     <div className="px-6 py-8 max-w-7xl mx-auto">
//       <div className="mb-8">
//         <h2 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h2>
//         <p className="text-gray-600">Welcome to ClinicCare Management System</p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         {stats.map((stat, index) => (
//           <Card key={index} className="overflow-hidden">
//             <CardContent className="p-6">
//               <div className="flex items-start justify-between mb-4">
//                 <div className="flex-1">
//                   <p className="text-sm font-medium text-gray-600 mb-2">{stat.title}</p>
//                   <h3 className="text-4xl font-bold text-gray-900 mb-1">{stat.value}</h3>
//                   <p className="text-sm text-gray-500">{stat.subtitle}</p>
//                 </div>
//                 {/* FIXED: Icon added */}
//       <div className={`p-3 rounded-lg ${stat.bgColor}`}>
//         <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
//       </div>
//               </div>
//               <div className="flex items-center gap-1 text-sm">
//                 {stat.trendUp ? (
//                   <>
//                     <TrendingUp className="w-4 h-4 text-orange-500" />
//                     <span className="text-orange-600 font-medium">{stat.trend}</span>
//                   </>
//                 ) : (
//                   <>
//                     <TrendingDown className="w-4 h-4 text-red-500" />
//                     <span className="text-red-600 font-medium">{stat.trend}</span>
//                   </>
//                 )}
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// }

// // "use client"
// // import React, { useState } from 'react';
// // import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// // import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// // import { 
// //   Users, 
// //   Calendar, 
// //   UserCheck, 
// //   Package,
// //   LayoutDashboard,
// //   UserSquare2,
// //   CalendarDays,
// //   UsersRound,
// //   Box,
// //   Building2,
// //   TrendingUp,
// //   TrendingDown
// // } from 'lucide-react';

// // export default function ClinicCareDashboard() {
// //   const [selectedBranch, setSelectedBranch] = useState('all');

// //   const branches = [
// //     { id: 'all', name: 'All Branches' },
// //     { id: 'boston', name: 'Boston Medical Center' },
// //     { id: 'cambridge', name: 'Cambridge Health Clinic' },
// //     { id: 'somerville', name: 'Somerville Care Center' }
// //   ];

// //   const stats = [
// //     {
// //       title: 'Total Patients',
// //       value: '6',
// //       subtitle: '3 male, 3 female',
// //       trend: '+12% vs last month',
// //       trendUp: true,
// //       icon: Users,
// //       bgColor: 'bg-cyan-50',
// //       iconColor: 'text-cyan-600'
// //     },
// //     {
// //       title: 'Appointments',
// //       value: '5',
// //       subtitle: '4 scheduled',
// //       trend: '+8% vs last month',
// //       trendUp: true,
// //       icon: Calendar,
// //       bgColor: 'bg-blue-50',
// //       iconColor: 'text-blue-600'
// //     },
// //     {
// //       title: 'Staff Members',
// //       value: '4',
// //       subtitle: 'Active staff',
// //       trend: '+2% vs last month',
// //       trendUp: true,
// //       icon: UserCheck,
// //       bgColor: 'bg-teal-50',
// //       iconColor: 'text-teal-600'
// //     },
// //     {
// //       title: 'Inventory Items',
// //       value: '6',
// //       subtitle: '3 low stock',
// //       trend: '-3% vs last month',
// //       trendUp: false,
// //       icon: Package,
// //       bgColor: 'bg-red-50',
// //       iconColor: 'text-red-600'
// //     }
// //   ];

// //   const navItems = [
// //     { name: 'Dashboard', icon: LayoutDashboard, active: true },
// //     { name: 'Patients', icon: UserSquare2, active: false },
// //     { name: 'Appointments', icon: CalendarDays, active: false },
// //     { name: 'Staff', icon: UsersRound, active: false },
// //     { name: 'Inventory', icon: Box, active: false },
// //     { name: 'Branches', icon: Building2, active: false }
// //   ];

// //   return (
// //     <div className="min-h-screen bg-gray-50">
// //       {/* Header */}
// //       <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
// //         <div className="flex items-center justify-between px-6 py-4">
// //           <div className="flex items-center gap-3">
// //             <div className="w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
// //               CC
// //             </div>
// //             <div>
// //               <h1 className="text-xl font-bold text-gray-900">ClinicCare</h1>
// //               <p className="text-sm text-gray-500">Multi-Branch Management</p>
// //             </div>
// //           </div>
// //           <div className="flex items-center gap-4">
// //             <Select value={selectedBranch} onValueChange={setSelectedBranch}>
// //               <SelectTrigger className="w-64">
// //                 <SelectValue />
// //               </SelectTrigger>
// //               <SelectContent>
// //                 {branches.map(branch => (
// //                   <SelectItem key={branch.id} value={branch.id}>
// //                     {branch.name}
// //                   </SelectItem>
// //                 ))}
// //               </SelectContent>
// //             </Select>
// //           </div>
// //         </div>
// //       </header>

// //       {/* Navigation */}
// //       <nav className="bg-white border-b border-gray-200">
// //         <div className="px-6">
// //           <div className="flex gap-8">
// //             {navItems.map(item => (
// //               <button
// //                 key={item.name}
// //                 className={`flex items-center gap-2 px-4 py-4 border-b-2 transition-colors ${
// //                   item.active
// //                     ? 'border-teal-600 text-teal-600'
// //                     : 'border-transparent text-gray-600 hover:text-gray-900'
// //                 }`}
// //               >
// //                 <item.icon className="w-5 h-5" />
// //                 <span className="font-medium">{item.name}</span>
// //               </button>
// //             ))}
// //           </div>
// //         </div>
// //       </nav>

// //       {/* Main Content */}
// //       <main className="px-6 py-8">
// //         <div className="max-w-7xl mx-auto">
// //           <div className="mb-8">
// //             <h2 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h2>
// //             <p className="text-gray-600">Welcome to ClinicCare Management System</p>
// //           </div>

// //           {/* Stats Grid */}
// //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
// //             {stats.map((stat, index) => (
// //               <Card key={index} className="overflow-hidden">
// //                 <CardContent className="p-6">
// //                   <div className="flex items-start justify-between mb-4">
// //                     <div className="flex-1">
// //                       <p className="text-sm font-medium text-gray-600 mb-2">
// //                         {stat.title}
// //                       </p>
// //                       <h3 className="text-4xl font-bold text-gray-900 mb-1">
// //                         {stat.value}
// //                       </h3>
// //                       <p className="text-sm text-gray-500">{stat.subtitle}</p>
// //                     </div>
// //                     <div className={`p-3 rounded-lg ${stat.bgColor}`}>
// //                       <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
// //                     </div>
// //                   </div>
// //                   <div className="flex items-center gap-1 text-sm">
// //                     {stat.trendUp ? (
// //                       <>
// //                         <TrendingUp className="w-4 h-4 text-orange-500" />
// //                         <span className="text-orange-600 font-medium">{stat.trend}</span>
// //                       </>
// //                     ) : (
// //                       <>
// //                         <TrendingDown className="w-4 h-4 text-red-500" />
// //                         <span className="text-red-600 font-medium">{stat.trend}</span>
// //                       </>
// //                     )}
// //                   </div>
// //                 </CardContent>
// //               </Card>
// //             ))}
// //           </div>
// //         </div>
// //       </main>
// //     </div>
// //   );
// // }