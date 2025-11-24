'use client';

import { useState, useEffect } from 'react';
import { getInventory, getBranches } from '../../lib/action';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Search, AlertCircle } from 'lucide-react';
import type { Inventory, Branch } from '../../lib/type';
import { toast } from 'sonner';

export default function InventoryPage() {
  const [inventory, setInventory] = useState<Inventory[]>([]);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [filteredInventory, setFilteredInventory] = useState<Inventory[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [inventoryData, branchesData] = await Promise.all([
        getInventory(),
        getBranches(),
      ]);
      setInventory(inventoryData);
      setBranches(branchesData);
      setFilteredInventory(inventoryData);
    } catch (error) {
      console.error('Error loading data:', error);
      toast.error('Failed to load inventory');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    const filtered = inventory.filter(
      (item) =>
        item.name.toLowerCase().includes(value.toLowerCase()) ||
        item.category.toLowerCase().includes(value.toLowerCase()) ||
        item.supplier?.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredInventory(filtered);
  };

  const getBranchName = (branchId?: number) => {
    if (!branchId) return 'All Branches';
    const branch = branches.find((b) => b.id === branchId);
    return branch?.name || 'Unknown';
  };

  const isLowStock = (quantity: number, reorderLevel?: number) => {
    return reorderLevel ? quantity <= reorderLevel : quantity <= 10;
  };

  const lowStockItems = filteredInventory.filter(
    (item) => isLowStock(item.quantity, item.reorderLevel)
  ).length;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading inventory...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Inventory Management</h1>
          <p className="text-muted-foreground">Manage medical supplies and equipment</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Item
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add Inventory Item</DialogTitle>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>

      {lowStockItems > 0 && (
        <Card className="bg-amber-50 border-amber-200 p-4 flex items-center gap-3">
          <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0" />
          <div>
            <p className="font-semibold text-amber-900">Low Stock Alert</p>
            <p className="text-sm text-amber-800">{lowStockItems} item(s) are below reorder level</p>
          </div>
        </Card>
      )}

      <Card>
        <div className="p-6 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search inventory..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Unit</TableHead>
                <TableHead>Supplier</TableHead>
                <TableHead>Branch</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInventory.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    No inventory items found
                  </TableCell>
                </TableRow>
              ) : (
                filteredInventory.map((item) => (
                  <TableRow key={item.id} className={isLowStock(item.quantity, item.reorderLevel) ? 'bg-amber-50' : ''}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{item.unit || '-'}</TableCell>
                    <TableCell>{item.supplier || '-'}</TableCell>
                    <TableCell>{getBranchName(item.branchId)}</TableCell>
                    <TableCell>
                      {isLowStock(item.quantity, item.reorderLevel) ? (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-amber-100 text-amber-800">
                          <AlertCircle className="h-3 w-3" />
                          Low Stock
                        </span>
                      ) : (
                        <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                          In Stock
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
