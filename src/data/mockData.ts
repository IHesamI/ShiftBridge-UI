import type { Worker, DayOfWeek, ScheduleMap, Scenario, AiProposal } from '../types';

export const DAYS_OF_WEEK: DayOfWeek[] = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
];

export const INITIAL_WORKERS: Worker[] = [
  {
    id: 'w1',
    name: 'Sarah Jenkins',
    role: 'Senior RN',
    department: 'Critical Care / ICU',
    maxHours: 40,
    currentHours: 40,
    avatar: 'https://images.unsplash.com/photo-1594824813626-d6682701d87e?auto=format&fit=crop&q=80&w=256'
  },
  {
    id: 'w2',
    name: 'David Miller',
    role: 'RN',
    department: 'Emergency & Acute Care',
    maxHours: 40,
    currentHours: 32,
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=256'
  },
  {
    id: 'w3',
    name: 'Elena Rostova',
    role: 'RN',
    department: 'Critical Care / ICU',
    maxHours: 40,
    currentHours: 32,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=256'
  },
  {
    id: 'w4',
    name: 'Marcus Vance',
    role: 'Charge Nurse',
    department: 'Nursing Administration',
    maxHours: 40,
    currentHours: 40,
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=256'
  },
  {
    id: 'w5',
    name: 'Aaliyah Khan',
    role: 'LPN',
    department: 'Sub-Acute Unit',
    maxHours: 40,
    currentHours: 40,
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=256'
  },
  {
    id: 'w6',
    name: 'Carlos Gomez',
    role: 'RN',
    department: 'Cardiology Clinic',
    maxHours: 40,
    currentHours: 32,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=256'
  },
  {
    id: 'w7',
    name: 'Emily Chen',
    role: 'Senior RN',
    department: 'Critical Care / ICU',
    maxHours: 40,
    currentHours: 40,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=256'
  },
  {
    id: 'w8',
    name: 'James Wilson',
    role: 'LPN',
    department: 'Sub-Acute Unit',
    maxHours: 36,
    currentHours: 32,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=256'
  },
  {
    id: 'w9',
    name: 'Priya Patel',
    role: 'RN',
    department: 'Emergency & Acute Care',
    maxHours: 40,
    currentHours: 40,
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=256'
  },
  {
    id: 'w10',
    name: 'Jordan Taylor',
    role: 'Support Specialist',
    department: 'Patient Care Operations',
    maxHours: 40,
    currentHours: 40,
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=256'
  },
  {
    id: 'w11',
    name: 'Hannah Abbott',
    role: 'LPN',
    department: 'Rehabilitation Wing',
    maxHours: 40,
    currentHours: 32,
    avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=256'
  },
  {
    id: 'w12',
    name: 'Robert Kim',
    role: 'RN',
    department: 'Cardiology Clinic',
    maxHours: 40,
    currentHours: 40,
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=256'
  },
  {
    id: 'w13',
    name: 'Maya Lin',
    role: 'Support Specialist',
    department: 'Patient Care Operations',
    maxHours: 32,
    currentHours: 24,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256'
  },
  {
    id: 'w14',
    name: "Liam O'Connor",
    role: 'RN',
    department: 'Emergency & Acute Care',
    maxHours: 40,
    currentHours: 32,
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=256'
  },
  {
    id: 'w15',
    name: 'Samantha Reed',
    role: 'Senior RN',
    department: 'Pediatric Care',
    maxHours: 40,
    currentHours: 40,
    avatar: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&q=80&w=256'
  }
];

export const INITIAL_SCENARIO: Scenario = {
  id: 'scenario_01',
  affectedWorkerId: 'w1',
  affectedWorkerName: 'Sarah Jenkins',
  conflictDay: 'Wednesday',
  originalShift: '08:00 - 16:00',
  reason: 'Unexpected childcare cancellation',
  constraint: "Cannot arrive until 12:00 PM on Wednesday",
  promptText: "My childcare fell through for Wednesday morning, and I can't start until 12:00 PM."
};

// Generates initial 7-day schedule for the 15 workers
export const buildInitialSchedule = (): ScheduleMap => {
  return {
    w1: { // Sarah Jenkins (40 hrs)
      Monday: { id: 's1-1', type: 'regular', shiftTime: '08:00 - 16:00', hours: 8 },
      Tuesday: { id: 's1-2', type: 'regular', shiftTime: '08:00 - 16:00', hours: 8 },
      Wednesday: {
        id: 's1-3',
        type: 'conflict',
        shiftTime: '08:00 - 16:00',
        hours: 8,
        conflictReason: 'Childcare conflict: Needs coverage 08:00 - 12:00'
      },
      Thursday: { id: 's1-4', type: 'regular', shiftTime: '08:00 - 16:00', hours: 8 },
      Friday: { id: 's1-5', type: 'regular', shiftTime: '08:00 - 16:00', hours: 8 },
      Saturday: { id: 's1-6', type: 'off', shiftTime: 'OFF', hours: 0 },
      Sunday: { id: 's1-7', type: 'off', shiftTime: 'OFF', hours: 0 }
    },
    w2: { // David Miller (32 hrs) - Off on Wednesday, working Friday morning
      Monday: { id: 's2-1', type: 'regular', shiftTime: '08:00 - 16:00', hours: 8 },
      Tuesday: { id: 's2-2', type: 'regular', shiftTime: '08:00 - 16:00', hours: 8 },
      Wednesday: { id: 's2-3', type: 'off', shiftTime: 'OFF', hours: 0, note: 'Available for swap' },
      Thursday: { id: 's2-4', type: 'regular', shiftTime: '08:00 - 16:00', hours: 8 },
      Friday: { id: 's2-5', type: 'regular', shiftTime: '08:00 - 16:00', hours: 8 },
      Saturday: { id: 's2-6', type: 'off', shiftTime: 'OFF', hours: 0 },
      Sunday: { id: 's2-7', type: 'off', shiftTime: 'OFF', hours: 0 }
    },
    w3: { // Elena Rostova (32 hrs) - Available for 4hr morning block on Wed
      Monday: { id: 's3-1', type: 'regular', shiftTime: '12:00 - 20:00', hours: 8 },
      Tuesday: { id: 's3-2', type: 'off', shiftTime: 'OFF', hours: 0 },
      Wednesday: { id: 's3-3', type: 'off', shiftTime: 'OFF', hours: 0, note: 'Available for partial shift' },
      Thursday: { id: 's3-4', type: 'regular', shiftTime: '08:00 - 16:00', hours: 8 },
      Friday: { id: 's3-5', type: 'regular', shiftTime: '08:00 - 16:00', hours: 8 },
      Saturday: { id: 's3-6', type: 'regular', shiftTime: '08:00 - 16:00', hours: 8 },
      Sunday: { id: 's3-7', type: 'off', shiftTime: 'OFF', hours: 0 }
    },
    w4: { // Marcus Vance (Charge Nurse, 40 hrs)
      Monday: { id: 's4-1', type: 'regular', shiftTime: '07:00 - 15:30', hours: 8 },
      Tuesday: { id: 's4-2', type: 'regular', shiftTime: '07:00 - 15:30', hours: 8 },
      Wednesday: { id: 's4-3', type: 'regular', shiftTime: '07:00 - 15:30', hours: 8 },
      Thursday: { id: 's4-4', type: 'regular', shiftTime: '07:00 - 15:30', hours: 8 },
      Friday: { id: 's4-5', type: 'regular', shiftTime: '07:00 - 15:30', hours: 8 },
      Saturday: { id: 's4-6', type: 'off', shiftTime: 'OFF', hours: 0 },
      Sunday: { id: 's4-7', type: 'off', shiftTime: 'OFF', hours: 0 }
    },
    w5: { // Aaliyah Khan (40 hrs)
      Monday: { id: 's5-1', type: 'regular', shiftTime: '15:00 - 23:00', hours: 8 },
      Tuesday: { id: 's5-2', type: 'regular', shiftTime: '15:00 - 23:00', hours: 8 },
      Wednesday: { id: 's5-3', type: 'regular', shiftTime: '15:00 - 23:00', hours: 8 },
      Thursday: { id: 's5-4', type: 'regular', shiftTime: '15:00 - 23:00', hours: 8 },
      Friday: { id: 's5-5', type: 'regular', shiftTime: '15:00 - 23:00', hours: 8 },
      Saturday: { id: 's5-6', type: 'off', shiftTime: 'OFF', hours: 0 },
      Sunday: { id: 's5-7', type: 'off', shiftTime: 'OFF', hours: 0 }
    },
    w6: { // Carlos Gomez (32 hrs)
      Monday: { id: 's6-1', type: 'off', shiftTime: 'OFF', hours: 0 },
      Tuesday: { id: 's6-2', type: 'regular', shiftTime: '08:00 - 16:00', hours: 8 },
      Wednesday: { id: 's6-3', type: 'regular', shiftTime: '08:00 - 16:00', hours: 8 },
      Thursday: { id: 's6-4', type: 'regular', shiftTime: '08:00 - 16:00', hours: 8 },
      Friday: { id: 's6-5', type: 'off', shiftTime: 'OFF', hours: 0 },
      Saturday: { id: 's6-6', type: 'regular', shiftTime: '08:00 - 16:00', hours: 8 },
      Sunday: { id: 's6-7', type: 'off', shiftTime: 'OFF', hours: 0 }
    },
    w7: { // Emily Chen (40 hrs)
      Monday: { id: 's7-1', type: 'regular', shiftTime: '08:00 - 16:00', hours: 8 },
      Tuesday: { id: 's7-2', type: 'regular', shiftTime: '08:00 - 16:00', hours: 8 },
      Wednesday: { id: 's7-3', type: 'regular', shiftTime: '08:00 - 16:00', hours: 8 },
      Thursday: { id: 's7-4', type: 'off', shiftTime: 'OFF', hours: 0 },
      Friday: { id: 's7-5', type: 'regular', shiftTime: '08:00 - 16:00', hours: 8 },
      Saturday: { id: 's7-6', type: 'regular', shiftTime: '08:00 - 16:00', hours: 8 },
      Sunday: { id: 's7-7', type: 'off', shiftTime: 'OFF', hours: 0 }
    },
    w8: { // James Wilson (32 hrs)
      Monday: { id: 's8-1', type: 'regular', shiftTime: '07:00 - 15:30', hours: 8 },
      Tuesday: { id: 's8-2', type: 'regular', shiftTime: '07:00 - 15:30', hours: 8 },
      Wednesday: { id: 's8-3', type: 'off', shiftTime: 'OFF', hours: 0 },
      Thursday: { id: 's8-4', type: 'regular', shiftTime: '07:00 - 15:30', hours: 8 },
      Friday: { id: 's8-5', type: 'regular', shiftTime: '07:00 - 15:30', hours: 8 },
      Saturday: { id: 's8-6', type: 'off', shiftTime: 'OFF', hours: 0 },
      Sunday: { id: 's8-7', type: 'off', shiftTime: 'OFF', hours: 0 }
    },
    w9: { // Priya Patel (40 hrs)
      Monday: { id: 's9-1', type: 'off', shiftTime: 'OFF', hours: 0 },
      Tuesday: { id: 's9-2', type: 'regular', shiftTime: '15:00 - 23:00', hours: 8 },
      Wednesday: { id: 's9-3', type: 'regular', shiftTime: '15:00 - 23:00', hours: 8 },
      Thursday: { id: 's9-4', type: 'regular', shiftTime: '15:00 - 23:00', hours: 8 },
      Friday: { id: 's9-5', type: 'regular', shiftTime: '15:00 - 23:00', hours: 8 },
      Saturday: { id: 's9-6', type: 'regular', shiftTime: '15:00 - 23:00', hours: 8 },
      Sunday: { id: 's9-7', type: 'off', shiftTime: 'OFF', hours: 0 }
    },
    w10: { // Jordan Taylor (40 hrs)
      Monday: { id: 's10-1', type: 'regular', shiftTime: '08:00 - 16:00', hours: 8 },
      Tuesday: { id: 's10-2', type: 'regular', shiftTime: '08:00 - 16:00', hours: 8 },
      Wednesday: { id: 's10-3', type: 'regular', shiftTime: '08:00 - 16:00', hours: 8 },
      Thursday: { id: 's10-4', type: 'regular', shiftTime: '08:00 - 16:00', hours: 8 },
      Friday: { id: 's10-5', type: 'regular', shiftTime: '08:00 - 16:00', hours: 8 },
      Saturday: { id: 's10-6', type: 'off', shiftTime: 'OFF', hours: 0 },
      Sunday: { id: 's10-7', type: 'off', shiftTime: 'OFF', hours: 0 }
    },
    w11: { // Hannah Abbott (32 hrs)
      Monday: { id: 's11-1', type: 'regular', shiftTime: '08:00 - 16:00', hours: 8 },
      Tuesday: { id: 's11-2', type: 'off', shiftTime: 'OFF', hours: 0 },
      Wednesday: { id: 's11-3', type: 'regular', shiftTime: '08:00 - 16:00', hours: 8 },
      Thursday: { id: 's11-4', type: 'regular', shiftTime: '08:00 - 16:00', hours: 8 },
      Friday: { id: 's11-5', type: 'off', shiftTime: 'OFF', hours: 0 },
      Saturday: { id: 's11-6', type: 'regular', shiftTime: '08:00 - 16:00', hours: 8 },
      Sunday: { id: 's11-7', type: 'off', shiftTime: 'OFF', hours: 0 }
    },
    w12: { // Robert Kim (40 hrs)
      Monday: { id: 's12-1', type: 'regular', shiftTime: '23:00 - 07:00', hours: 8 },
      Tuesday: { id: 's12-2', type: 'regular', shiftTime: '23:00 - 07:00', hours: 8 },
      Wednesday: { id: 's12-3', type: 'regular', shiftTime: '23:00 - 07:00', hours: 8 },
      Thursday: { id: 's12-4', type: 'regular', shiftTime: '23:00 - 07:00', hours: 8 },
      Friday: { id: 's12-5', type: 'regular', shiftTime: '23:00 - 07:00', hours: 8 },
      Saturday: { id: 's12-6', type: 'off', shiftTime: 'OFF', hours: 0 },
      Sunday: { id: 's12-7', type: 'off', shiftTime: 'OFF', hours: 0 }
    },
    w13: { // Maya Lin (24 hrs)
      Monday: { id: 's13-1', type: 'regular', shiftTime: '10:00 - 18:00', hours: 8 },
      Tuesday: { id: 's13-2', type: 'off', shiftTime: 'OFF', hours: 0 },
      Wednesday: { id: 's13-3', type: 'regular', shiftTime: '10:00 - 18:00', hours: 8 },
      Thursday: { id: 's13-4', type: 'off', shiftTime: 'OFF', hours: 0 },
      Friday: { id: 's13-5', type: 'regular', shiftTime: '10:00 - 18:00', hours: 8 },
      Saturday: { id: 's13-6', type: 'off', shiftTime: 'OFF', hours: 0 },
      Sunday: { id: 's13-7', type: 'off', shiftTime: 'OFF', hours: 0 }
    },
    w14: { // Liam O'Connor (32 hrs)
      Monday: { id: 's14-1', type: 'regular', shiftTime: '08:00 - 16:00', hours: 8 },
      Tuesday: { id: 's14-2', type: 'regular', shiftTime: '08:00 - 16:00', hours: 8 },
      Wednesday: { id: 's14-3', type: 'off', shiftTime: 'OFF', hours: 0 },
      Thursday: { id: 's14-4', type: 'off', shiftTime: 'OFF', hours: 0 },
      Friday: { id: 's14-5', type: 'regular', shiftTime: '08:00 - 16:00', hours: 8 },
      Saturday: { id: 's14-6', type: 'regular', shiftTime: '08:00 - 16:00', hours: 8 },
      Sunday: { id: 's14-7', type: 'off', shiftTime: 'OFF', hours: 0 }
    },
    w15: { // Samantha Reed (40 hrs)
      Monday: { id: 's15-1', type: 'regular', shiftTime: '08:00 - 16:00', hours: 8 },
      Tuesday: { id: 's15-2', type: 'regular', shiftTime: '08:00 - 16:00', hours: 8 },
      Wednesday: { id: 's15-3', type: 'regular', shiftTime: '08:00 - 16:00', hours: 8 },
      Thursday: { id: 's15-4', type: 'regular', shiftTime: '08:00 - 16:00', hours: 8 },
      Friday: { id: 's15-5', type: 'regular', shiftTime: '08:00 - 16:00', hours: 8 },
      Saturday: { id: 's15-6', type: 'off', shiftTime: 'OFF', hours: 0 },
      Sunday: { id: 's15-7', type: 'off', shiftTime: 'OFF', hours: 0 }
    }
  };
};

export const AI_PROPOSALS: AiProposal[] = [
  {
    optionId: 'opt_A',
    title: 'Option A: Full Shift Swap with David Miller',
    subtitle: 'Direct peer swap • Same qualification tier (RN)',
    description: 'David Miller covers Sarah’s Wednesday Morning shift (08:00 - 16:00). In turn, Sarah takes David’s Friday Morning shift (08:00 - 16:00). Both workers maintain full-time balance without exceeding max hours.',
    solutionType: 'swap',
    impact: {
      worker1Name: 'Sarah Jenkins',
      worker1HoursChange: '40 hrs (No Net Change)',
      worker1NewTotal: 40,
      worker2Name: 'David Miller',
      worker2HoursChange: '32 hrs → 40 hrs (+8h)',
      worker2NewTotal: 40,
      teamCoverageScore: 100,
      coverageText: '100% Floor Coverage Maintained',
      overtimeWarning: false
    },
    scheduleChanges: [
      {
        workerId: 'w1',
        day: 'Wednesday',
        newShift: 'OFF',
        newHours: 0,
        note: 'Swapped to Friday with David'
      },
      {
        workerId: 'w1',
        day: 'Friday',
        newShift: '08:00 - 16:00',
        newHours: 8,
        note: 'Covering David Miller'
      },
      {
        workerId: 'w2',
        day: 'Wednesday',
        newShift: '08:00 - 16:00',
        newHours: 8,
        note: 'Covering Sarah Jenkins (ShiftBridge AI)'
      },
      {
        workerId: 'w2',
        day: 'Friday',
        newShift: 'OFF',
        newHours: 0,
        note: 'Swapped with Sarah Jenkins'
      }
    ]
  },
  {
    optionId: 'opt_B',
    title: 'Option B: Late Start + Partial Coverage by Elena Rostova',
    subtitle: 'Split shift • Zero Friday disruption',
    description: 'Sarah works Wednesday afternoon (12:00 - 16:00, 4 hrs) accommodating her childcare window. Elena Rostova covers the morning gap (08:00 - 12:00, 4 hrs). Minimizes disruption across the schedule.',
    solutionType: 'split',
    impact: {
      worker1Name: 'Sarah Jenkins',
      worker1HoursChange: '36 hrs (-4 hrs)',
      worker1NewTotal: 36,
      worker2Name: 'Elena Rostova',
      worker2HoursChange: '32 hrs → 36 hrs (+4 hrs)',
      worker2NewTotal: 36,
      teamCoverageScore: 100,
      coverageText: '100% Floor Coverage Maintained',
      overtimeWarning: false
    },
    scheduleChanges: [
      {
        workerId: 'w1',
        day: 'Wednesday',
        newShift: '12:00 - 16:00',
        newHours: 4,
        note: 'Late Start (Childcare accommodation)'
      },
      {
        workerId: 'w3',
        day: 'Wednesday',
        newShift: '08:00 - 12:00',
        newHours: 4,
        note: 'Morning Coverage for Sarah (ShiftBridge AI)'
      }
    ]
  }
];
