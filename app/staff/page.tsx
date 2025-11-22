"use client"
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  LayoutDashboard,
  UserSquare2,
  CalendarDays,
  UsersRound,
  Box,
  Building2,
  Search,
  Plus,
  Mail,
  Phone
} from 'lucide-react';

export default function StaffPage() {
  const [selectedBranch, setSelectedBranch] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

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
    { name: 'Staff', icon: UsersRound, active: true },
    { name: 'Inventory', icon: Box, active: false },
    { name: 'Branches', icon: Building2, active: false }
  ];

  const staffMembers = [
    {
      id: 1,
      name: 'Dr. Anderson',
      initials: 'DA',
      role: 'Physician',
      specialty: 'General Practice',
      email: 'dr.anderson@cliniccare.com',
      phone: '(617) 555-2001',
      branch: 'Boston Medical Center',
      color: 'bg-teal-600'
    },
    {
      id: 2,
      name: 'Nurse Bradley',
      initials: 'NB',
      role: 'Registered Nurse',
      specialty: 'Pediatrics',
      email: 'n.bradley@cliniccare.com',
      phone: '(617) 555-2002',
      branch: 'Boston Medical Center',
      color: 'bg-teal-600'
    },
    {
      id: 3,
      name: 'Dr. Clark',
      initials: 'DC',
      role: 'Physician',
      specialty: 'Cardiology',
      email: 'dr.clark@cliniccare.com',
      phone: '(617) 555-2003',
      branch: 'Cambridge Health Clinic',
      color: 'bg-teal-600'
    },
    {
      id: 4,
      name: 'Dr. Martinez',
      initials: 'DM',
      role: 'Physician',
      specialty: 'Internal Medicine',
      email: 'dr.martinez@cliniccare.com',
      phone: '(617) 555-2004',
      branch: 'Somerville Care Center',
      color: 'bg-teal-600'
    }
  ];

  const filteredStaff = staffMembers.filter(staff => {
    const matchesSearch = 
      staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBranch = selectedBranch === 'all' || 
      staff.branch === branches.find(b => b.id === selectedBranch)?.name;
    return matchesSearch && matchesBranch;
  });

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
          {/* Page Header */}
          <div className="flex items-start justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Staff Management</h2>
              <p className="text-gray-600">Manage your medical staff across all branches</p>
            </div>
            <Button className="bg-teal-600 hover:bg-teal-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Add Staff
            </Button>
          </div>

          {/* Search Card */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search staff..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          {/* Staff Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStaff.map((staff) => (
              <Card key={staff.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-16 h-16 ${staff.color} rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0`}>
                      {staff.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-gray-900 mb-1">{staff.name}</h3>
                      <p className="text-sm text-gray-600 mb-0.5">{staff.role}</p>
                      <p className="text-sm text-gray-500">{staff.specialty}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <p className="text-sm text-gray-600 truncate">{staff.email}</p>
                    </div>

                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <p className="text-sm text-gray-600">{staff.phone}</p>
                    </div>

                    <div className="pt-3">
                      <Badge className="bg-teal-100 text-teal-700 hover:bg-teal-100">
                        {staff.branch}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredStaff.length === 0 && (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-gray-500">No staff members found matching your search.</p>
              </CardContent>
            </Card>
          )}

          {/* Results Summary */}
          <div className="mt-6 text-sm text-gray-600">
            Showing {filteredStaff.length} of {staffMembers.length} staff members
          </div>
        </div>
      </main>
    </div>
  );
}