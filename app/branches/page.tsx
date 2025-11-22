"use client"
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  LayoutDashboard,
  UserSquare2,
  CalendarDays,
  UsersRound,
  Box,
  Building2,
  Plus,
  MapPin,
  Phone,
  Mail
} from 'lucide-react';

export default function BranchesPage() {
  const [selectedBranch, setSelectedBranch] = useState('all');

  const branches = [
    { id: 'all', name: 'All Branches' },
    { id: 'boston', name: 'Boston Medical Center' },
    { id: 'cambridge', name: 'Cambridge Health Clinic' },
    { id: 'somerville', name: 'Somerville Care Center' }
  ];

  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, active: false },
    { name: 'Patients', icon: UserSquare2, active: false },
    { name: 'Appointments', icon: CalendarDays, active: false },
    { name: 'Staff', icon: UsersRound, active: false },
    { name: 'Inventory', icon: Box, active: false },
    { name: 'Branches', icon: Building2, active: true }
  ];

  const branchData = [
    {
      id: 1,
      name: 'Boston Medical Center',
      branchId: '1',
      address: '123 Main Street, Boston, MA 02101',
      phone: '(617) 555-0001',
      email: 'boston@cliniccare.com'
    },
    {
      id: 2,
      name: 'Cambridge Health Clinic',
      branchId: '2',
      address: '456 University Ave, Cambridge, MA 02138',
      phone: '(617) 555-0002',
      email: 'cambridge@cliniccare.com'
    },
    {
      id: 3,
      name: 'Somerville Care Center',
      branchId: '3',
      address: '789 Highland Ave, Somerville, MA 02144',
      phone: '(617) 555-0003',
      email: 'somerville@cliniccare.com'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
              CC
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">ClinicCare</h1>
              <p className="text-sm text-gray-500">Multi-Branch Management</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Select value={selectedBranch} onValueChange={setSelectedBranch}>
              <SelectTrigger className="w-64">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {branches.map(branch => (
                  <SelectItem key={branch.id} value={branch.id}>
                    {branch.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="px-6">
          <div className="flex gap-8">
            {navItems.map(item => (
              <button
                key={item.name}
                className={`flex items-center gap-2 px-4 py-4 border-b-2 transition-colors ${
                  item.active
                    ? 'border-teal-600 text-teal-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="px-6 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Branches Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {branchData.map((branch) => (
              <Card key={branch.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardHeader className="bg-white pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-xl font-bold text-gray-900 mb-1">
                        {branch.name}
                      </CardTitle>
                      <p className="text-sm text-gray-500">Branch ID: {branch.branchId}</p>
                    </div>
                    <div className="w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Building2 className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 pt-6">
                  {/* Address */}
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">Address</p>
                      <p className="text-sm text-gray-900">{branch.address}</p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">Phone</p>
                      <p className="text-sm text-gray-900">{branch.phone}</p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">Email</p>
                      <p className="text-sm text-gray-900">{branch.email}</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4 border-t border-gray-200">
                    <Button 
                      variant="outline" 
                      className="flex-1 border-gray-300 hover:bg-gray-50"
                    >
                      Edit
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex-1 border-gray-300 hover:bg-red-50 hover:text-red-600 hover:border-red-300"
                    >
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}