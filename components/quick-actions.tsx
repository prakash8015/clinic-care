'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus, Calendar, FileText, Settings } from 'lucide-react';

export function QuickActions() {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Button variant="outline" className="h-auto flex-col gap-2 py-4">
          <Plus className="h-5 w-5" />
          <span className="text-xs text-center">Add Patient</span>
        </Button>
        <Button variant="outline" className="h-auto flex-col gap-2 py-4">
          <Calendar className="h-5 w-5" />
          <span className="text-xs text-center">New Appointment</span>
        </Button>
        <Button variant="outline" className="h-auto flex-col gap-2 py-4">
          <FileText className="h-5 w-5" />
          <span className="text-xs text-center">Generate Report</span>
        </Button>
        <Button variant="outline" className="h-auto flex-col gap-2 py-4">
          <Settings className="h-5 w-5" />
          <span className="text-xs text-center">Settings</span>
        </Button>
      </div>
    </Card>
  );
}
