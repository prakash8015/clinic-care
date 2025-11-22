'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarAppointment {
  date: string;
  title: string;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}

interface AppointmentsCalendarProps {
  appointments: CalendarAppointment[];
}

export function AppointmentsCalendar({ appointments }: AppointmentsCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDay }, (_, i) => i);

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-chart-3/10 text-chart-3';
      case 'cancelled':
        return 'bg-destructive/10 text-destructive';
      default:
        return 'bg-primary/10 text-primary';
    }
  };

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Appointment Calendar</h3>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={goToPreviousMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium px-4 py-2">
              {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
            </span>
            <Button variant="outline" size="sm" onClick={goToNextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2 text-center">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="text-xs font-semibold text-muted-foreground py-2">
              {day}
            </div>
          ))}

          {emptyDays.map((_, i) => (
            <div key={`empty-${i}`} className="text-xs py-2" />
          ))}

          {days.map((day) => (
            <div
              key={day}
              className="text-xs py-2 rounded-lg border border-border hover:bg-accent cursor-pointer"
            >
              {day}
            </div>
          ))}
        </div>

        <div className="border-t pt-4 space-y-2">
          <h4 className="text-sm font-semibold">Upcoming Appointments</h4>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {appointments.length === 0 ? (
              <p className="text-xs text-muted-foreground">No appointments scheduled</p>
            ) : (
              appointments.map((apt, idx) => (
                <div key={idx} className={`p-2 rounded-lg text-xs ${getStatusColor(apt.status)}`}>
                  <div className="font-medium">{apt.title}</div>
                  <div className="text-xs opacity-75">{apt.time}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
