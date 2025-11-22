'use client';

import { Card } from '@/components/ui/card';
import { AlertCircle, TrendingDown, Package } from 'lucide-react';

interface InventoryItem {
  id: number;
  name: string;
  quantity: number;
  minStock: number;
  category: string;
}

interface InventoryAlertsProps {
  items: InventoryItem[];
}

export function InventoryAlerts({ items }: InventoryAlertsProps) {
  const criticalItems = items.filter(item => item.quantity <= item.minStock);

  if (criticalItems.length === 0) {
    return (
      <Card className="p-4 bg-chart-3/10 border-chart-3/20">
        <div className="flex items-center gap-3">
          <Package className="h-5 w-5 text-chart-3" />
          <div>
            <h3 className="font-semibold text-chart-3">All Inventory Levels Good</h3>
            <p className="text-sm text-chart-3/80">No items below reorder level</p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-4">
        <AlertCircle className="h-5 w-5 text-destructive" />
        <h3 className="font-semibold text-destructive">Low Stock Alert</h3>
      </div>
      {criticalItems.map((item) => (
        <Card key={item.id} className="p-4 border-destructive/20 bg-destructive/5">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h4 className="font-medium text-foreground">{item.name}</h4>
              <p className="text-xs text-muted-foreground">{item.category}</p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 text-destructive">
                <TrendingDown className="h-4 w-4" />
                <span className="font-bold">{item.quantity}</span>
              </div>
              <p className="text-xs text-muted-foreground">Min: {item.minStock}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
