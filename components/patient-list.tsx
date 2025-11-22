//3
'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface Patient {
  id: number;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  lastVisit?: string; // ISO string
}

interface PatientListProps {
  patients: Patient[];
  title?: string;
}

export function PatientList({ patients, title = 'Recent Patients' }: PatientListProps) {
  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <div className="space-y-3">
        {patients.length === 0 ? (
          <p className="text-sm text-muted-foreground">No patients to display</p>
        ) : (
          patients.slice(0, 5).map((patient) => (
            <div key={patient.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {getInitials(patient.firstName, patient.lastName)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm">{patient.firstName} {patient.lastName}</p>
                <p className="text-xs text-muted-foreground truncate">{patient.email ?? patient.phone}</p>
              </div>
              {patient.lastVisit && (
                <Badge variant="outline" className="text-xs">
                  {new Date(patient.lastVisit).toLocaleDateString()}
                </Badge>
              )}
            </div>
          ))
        )}
      </div>
    </Card>
  );
}


// 'use client';

// import { Card } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import { Avatar, AvatarFallback } from '@/components/ui/avatar';

// interface Patient {
//   id: number;
//   firstName: string;
//   lastName: string;
//   email?: string;
//   phone?: string;
//   lastVisit?: string;
// }

// interface PatientListProps {
//   patients: Patient[];
//   title?: string;
// }

// export function PatientList({ patients, title = 'Recent Patients' }: PatientListProps) {
//   const getInitials = (firstName: string, lastName: string) => {
//     return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
//   };

//   return (
//     <Card className="p-6">
//       <h3 className="text-lg font-semibold mb-4">{title}</h3>
//       <div className="space-y-3">
//         {patients.length === 0 ? (
//           <p className="text-sm text-muted-foreground">No patients to display</p>
//         ) : (
//           patients.slice(0, 5).map((patient) => (
//             <div key={patient.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent">
//               <Avatar className="h-10 w-10">
//                 <AvatarFallback className="bg-primary text-primary-foreground">
//                   {getInitials(patient.firstName, patient.lastName)}
//                 </AvatarFallback>
//               </Avatar>
//               <div className="flex-1 min-w-0">
//                 <p className="font-medium text-sm">{patient.firstName} {patient.lastName}</p>
//                 <p className="text-xs text-muted-foreground truncate">{patient.email}</p>
//               </div>
//               {patient.lastVisit && (
//                 <Badge variant="outline" className="text-xs">
//                   {new Date(patient.lastVisit).toLocaleDateString()}
//                 </Badge>
//               )}
//             </div>
//           ))
//         )}
//       </div>
//     </Card>
//   );
// }
