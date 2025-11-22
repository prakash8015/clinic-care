
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
  Pencil,
  Trash2
} from 'lucide-react';

export default function InventoryPage() {
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
    { name: 'Staff', icon: UsersRound, active: false },
    { name: 'Inventory', icon: Box, active: true },
    { name: 'Branches', icon: Building2, active: false }
  ];

  const inventoryItems = [
    {
      id: 1,
      name: 'Disposable Gloves',
      category: 'PPE',
      quantity: 150,
      unit: 'boxes',
      supplier: 'Medical Supply Co.',
      branch: 'Boston Medical Center',
      status: 'In Stock'
    },
    {
      id: 2,
      name: 'Face Masks N95',
      category: 'PPE',
      quantity: 8,
      unit: 'boxes',
      supplier: 'Medical Supply Co.',
      branch: 'Boston Medical Center',
      status: 'Low Stock'
    },
    {
      id: 3,
      name: 'Syringes',
      category: 'Medical Supplies',
      quantity: 500,
      unit: 'units',
      supplier: 'PharmaMed Supplies',
      branch: 'Cambridge Health Clinic',
      status: 'In Stock'
    },
    {
      id: 4,
      name: 'Sterile Gauze Pads',
      category: 'Medical Supplies',
      quantity: 12,
      unit: 'packages',
      supplier: 'PharmaMed Supplies',
      branch: 'Cambridge Health Clinic',
      status: 'Low Stock'
    },
    {
      id: 5,
      name: 'Blood Pressure Monitor',
      category: 'Equipment',
      quantity: 5,
      unit: 'units',
      supplier: 'Medical Equipment Inc.',
      branch: 'Somerville Care Center',
      status: 'In Stock'
    },
    {
      id: 6,
      name: 'Thermometers',
      category: 'Equipment',
      quantity: 3,
      unit: 'units',
      supplier: 'Medical Equipment Inc.',
      branch: 'Somerville Care Center',
      status: 'Low Stock'
    }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'In Stock':
        return 'bg-green-100 text-green-700 hover:bg-green-100';
      case 'Low Stock':
        return 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100';
      case 'Out of Stock':
        return 'bg-red-100 text-red-700 hover:bg-red-100';
      default:
        return 'bg-gray-100 text-gray-700 hover:bg-gray-100';
    }
  };

  const getRowColor = (status) => {
    switch(status) {
      case 'In Stock':
        return 'bg-white hover:bg-gray-50';
      case 'Low Stock':
        return 'bg-yellow-50 hover:bg-yellow-100';
      case 'Out of Stock':
        return 'bg-red-50 hover:bg-red-100';
      default:
        return 'bg-white hover:bg-gray-50';
    }
  };

  const filteredItems = inventoryItems.filter(item => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.supplier.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBranch = selectedBranch === 'all' || 
      item.branch === branches.find(b => b.id === selectedBranch)?.name;
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
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Inventory Management</h2>
              <p className="text-gray-600">Track and manage medical supplies and equipment</p>
            </div>
            <Button className="bg-teal-600 hover:bg-teal-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Add Item
            </Button>
          </div>

          {/* Search Card */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search inventory..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          {/* Inventory Table */}
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Item Name</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Category</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Quantity</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Unit</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Supplier</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Branch</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredItems.map((item) => (
                      <tr key={item.id} className={`transition-colors ${getRowColor(item.status)}`}>
                        <td className="px-6 py-4 text-sm text-gray-900 font-medium">{item.name}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{item.category}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{item.quantity}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{item.unit}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{item.supplier}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{item.branch}</td>
                        <td className="px-6 py-4">
                          <Badge className={getStatusColor(item.status)}>
                            {item.status === 'Low Stock' && (
                              <span className="mr-1">⚠</span>
                            )}
                            {item.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredItems.length === 0 && (
                <div className="py-12 text-center">
                  <p className="text-gray-500">No inventory items found matching your search.</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Results Summary */}
          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredItems.length} of {inventoryItems.length} items
          </div>
        </div>
      </main>
    </div>
  );
}