'use client';

import { Card } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';

interface StatCardProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: number;
  subtext: string;
  trend?: number;
  isAlert?: boolean;
}

export function StatCard({ icon: Icon, label, value, subtext, trend = 0, isAlert = false }: StatCardProps) {
  return (
    <Card className={`p-6 hover:shadow-md transition-shadow ${isAlert ? 'border-destructive/30 bg-destructive/5' : ''}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-muted-foreground mb-1">{label}</p>
          <p className="text-4xl font-bold text-foreground">{value}</p>
          <p className="text-xs text-muted-foreground mt-2">{subtext}</p>
        </div>
        <div className={`p-3 rounded-lg ${isAlert ? 'bg-destructive/20' : 'bg-primary/10'}`}>
          <Icon className={`h-6 w-6 ${isAlert ? 'text-destructive' : 'text-primary'}`} />
        </div>
      </div>
      {trend !== 0 && (
        <div className="mt-4 flex items-center gap-1 text-xs">
          <TrendingUp className={`h-3 w-3 ${trend > 0 ? 'text-chart-3' : 'text-destructive'}`} />
          <span className={trend > 0 ? 'text-chart-3' : 'text-destructive'}>
            {trend > 0 ? '+' : ''}{trend}% vs last month
          </span>
        </div>
      )}
    </Card>
  );
}
