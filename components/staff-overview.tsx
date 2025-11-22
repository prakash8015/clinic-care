'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface StaffMember {
  id: number;
  firstName: string;
  lastName: string;
  role: string;
  specialization?: string;
  phone?: string;
  status: 'active' | 'inactive' | 'on-leave';
}

interface StaffOverviewProps {
  staff: StaffMember[];
}

export function StaffOverview({ staff }: StaffOverviewProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-chart-3/10 text-chart-3';
      case 'on-leave':
        return 'bg-amber-100/10 text-amber-700';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {staff.slice(0, 4).map((member) => (
        <Card key={member.id} className="p-4 hover:shadow-md transition-shadow">
          <div className="flex items-start gap-4">
            <Avatar className="h-12 w-12">
              <AvatarFallback className="bg-primary text-primary-foreground">
                {getInitials(member.firstName, member.lastName)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="font-medium">{member.firstName} {member.lastName}</h4>
                  <p className="text-xs text-muted-foreground">{member.role}</p>
                </div>
                <Badge className={getStatusColor(member.status)}>
                  {member.status}
                </Badge>
              </div>
              {member.specialization && (
                <p className="text-xs text-muted-foreground mt-1">{member.specialization}</p>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
