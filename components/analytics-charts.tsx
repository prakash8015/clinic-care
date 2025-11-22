'use client';

import { Card } from '@/components/ui/card';
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, Area, AreaChart
} from 'recharts';

interface AnalyticsChartsProps {
  chartData?: Array<{ name: string; value: number; fill: string }>;
  trendData?: Array<{ [key: string]: string | number }>;
}

export function AnalyticsCharts({ chartData = [], trendData = [] }: AnalyticsChartsProps) {
  const defaultChartData = [
    { name: 'Patients', value: 45, fill: 'var(--color-chart-1)' },
    { name: 'Appointments', value: 62, fill: 'var(--color-chart-2)' },
    { name: 'Staff', value: 28, fill: 'var(--color-chart-3)' },
    { name: 'Inventory', value: 156, fill: 'var(--color-chart-4)' },
  ];

  const defaultTrendData = [
    { month: 'Jan', appointments: 12, patients: 8 },
    { month: 'Feb', appointments: 19, patients: 12 },
    { month: 'Mar', appointments: 15, patients: 10 },
    { month: 'Apr', appointments: 25, patients: 18 },
    { month: 'May', appointments: 22, patients: 16 },
    { month: 'Jun', appointments: 30, patients: 24 },
  ];

  const displayChartData = chartData.length > 0 ? chartData : defaultChartData;
  const displayTrendData = trendData.length > 0 ? trendData : defaultTrendData;

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">System Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={displayChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="name" stroke="var(--color-muted-foreground)" />
              <YAxis stroke="var(--color-muted-foreground)" />
              <Tooltip contentStyle={{ backgroundColor: 'var(--color-card)', border: '1px solid var(--color-border)' }} />
              <Bar dataKey="value" fill="var(--color-primary)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Category Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={displayChartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {displayChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: 'var(--color-card)', border: '1px solid var(--color-border)' }} />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">6-Month Trend Analysis</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={displayTrendData}>
            <defs>
              <linearGradient id="colorAppointments" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-chart-2)" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="var(--color-chart-2)" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorPatients" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-chart-1)" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="var(--color-chart-1)" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="month" stroke="var(--color-muted-foreground)" />
            <YAxis stroke="var(--color-muted-foreground)" />
            <Tooltip contentStyle={{ backgroundColor: 'var(--color-card)', border: '1px solid var(--color-border)' }} />
            <Legend />
            <Area type="monotone" dataKey="appointments" stroke="var(--color-chart-2)" fillOpacity={1} fill="url(#colorAppointments)" />
            <Area type="monotone" dataKey="patients" stroke="var(--color-chart-1)" fillOpacity={1} fill="url(#colorPatients)" />
          </AreaChart>
        </ResponsiveContainer>
      </Card>
    </>
  );
}
