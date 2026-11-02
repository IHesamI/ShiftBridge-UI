export interface Worker {
  id: string;
  name: string;
  role: 'Senior RN' | 'Charge Nurse' | 'RN' | 'LPN' | 'Support Specialist';
  department: string;
  maxHours: number;
  currentHours: number;
  avatar: string;
}

export type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

export interface ShiftInfo {
  id: string;
  type: 'regular' | 'conflict' | 'updated' | 'off';
  shiftTime: string; // e.g. "08:00 - 16:00", "OFF", "12:00 - 16:00"
  hours: number;
  note?: string;
  updatedByAi?: boolean;
  conflictReason?: string;
}

export type ScheduleMap = Record<string, Record<DayOfWeek, ShiftInfo>>;

export interface AiProposal {
  optionId: 'opt_A' | 'opt_B';
  title: string;
  subtitle: string;
  description: string;
  solutionType: 'swap' | 'split';
  impact: {
    worker1Name: string;
    worker1HoursChange: string;
    worker1NewTotal: number;
    worker2Name: string;
    worker2HoursChange: string;
    worker2NewTotal: number;
    teamCoverageScore: number; // percentage
    coverageText: string;
    overtimeWarning: boolean;
  };
  scheduleChanges: Array<{
    workerId: string;
    day: DayOfWeek;
    newShift: string;
    newHours: number;
    note: string;
  }>;
}

export interface Scenario {
  id: string;
  affectedWorkerId: string;
  affectedWorkerName: string;
  conflictDay: DayOfWeek;
  originalShift: string;
  reason: string;
  constraint: string;
  promptText: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  roleName?: string;
  text: string;
  timestamp: string;
  options?: AiProposal[];
  isPendingApproval?: boolean;
  proposalId?: 'opt_A' | 'opt_B';
  approvalState?: {
    workerApproved: boolean;
    managerApproved: boolean;
    applied: boolean;
  };
}
