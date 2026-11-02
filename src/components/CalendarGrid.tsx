import React, { useState } from 'react';
import {
  AlertTriangle,
  Sparkles,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Briefcase
} from 'lucide-react';
import type { Worker, DayOfWeek, ScheduleMap, ShiftInfo } from '../types';
import { DAYS_OF_WEEK } from '../data/mockData';

interface CalendarGridProps {
  workers: Worker[];
  schedule: ScheduleMap;
  selectedDay?: DayOfWeek;
  onSelectShift?: (worker: Worker, day: DayOfWeek, shift: ShiftInfo) => void;
  appliedProposalTitle?: string | null;
}

export const CalendarGrid: React.FC<CalendarGridProps> = ({
  workers,
  schedule,
  appliedProposalTitle
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('ALL');
  const [activeShiftDetail, setActiveShiftDetail] = useState<{
    worker: Worker;
    day: DayOfWeek;
    shift: ShiftInfo;
  } | null>(null);

  // Filter workers based on search query & role
  const filteredWorkers = workers.filter((worker) => {
    const matchesQuery =
      worker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      worker.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      worker.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = selectedRole === 'ALL' || worker.role === selectedRole;
    return matchesQuery && matchesRole;
  });

  const getShiftBadge = (shift: ShiftInfo, day: DayOfWeek) => {
    if (shift.type === 'off') {
      return (
        <div className="h-full w-full rounded-lg bg-slate-100/70 border border-slate-200/50 p-2 flex flex-col items-center justify-center text-slate-400 group-hover:bg-slate-200/60 transition-colors">
          <span className="text-[11px] font-semibold tracking-wide uppercase">OFF</span>
          {shift.note && (
            <span className="text-[9px] text-slate-400 text-center truncate max-w-full">
              {shift.note}
            </span>
          )}
        </div>
      );
    }

    if (shift.type === 'conflict') {
      return (
        <div className="h-full w-full rounded-lg bg-amber-500/10 border-2 border-amber-500 p-2 text-amber-900 flex flex-col justify-between shadow-xs relative overflow-hidden group-hover:bg-amber-500/15 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-amber-200 text-amber-900 inline-flex items-center gap-1">
              <AlertTriangle className="w-3 h-3 text-amber-700" />
              Conflict
            </span>
            <span className="text-[10px] font-bold text-amber-800">{shift.hours}h</span>
          </div>
          <div className="my-1">
            <div className="text-xs font-bold text-amber-950">{shift.shiftTime}</div>
            <div className="text-[10px] text-amber-800 line-clamp-1">{shift.conflictReason}</div>
          </div>
          <div className="text-[9px] text-amber-700 font-semibold uppercase flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
            Needs AI Swap
          </div>
        </div>
      );
    }

    if (shift.type === 'updated' || shift.updatedByAi) {
      return (
        <div className="h-full w-full rounded-lg bg-emerald-500/10 border-2 border-emerald-500 p-2 text-emerald-950 flex flex-col justify-between shadow-xs group-hover:bg-emerald-500/15 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[9px] uppercase font-extrabold tracking-wider px-1.5 py-0.5 rounded bg-emerald-200 text-emerald-900 inline-flex items-center gap-0.5">
              <Sparkles className="w-2.5 h-2.5 text-emerald-700" />
              Updated via AI
            </span>
            <span className="text-[10px] font-bold text-emerald-800">{shift.hours}h</span>
          </div>
          <div className="my-1">
            <div className="text-xs font-bold text-emerald-950">{shift.shiftTime}</div>
            {shift.note && (
              <div className="text-[10px] text-emerald-800 font-medium truncate">{shift.note}</div>
            )}
          </div>
          <div className="text-[9px] text-emerald-700 font-bold uppercase flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            Approved
          </div>
        </div>
      );
    }

    // Standard Shift
    return (
      <div className="h-full w-full rounded-lg bg-indigo-50/60 border border-indigo-100 hover:border-indigo-300 p-2 text-indigo-950 flex flex-col justify-between transition-all group-hover:shadow-xs">
        <div className="flex items-center justify-between text-[10px] text-indigo-700 font-medium">
          <span>{day.slice(0, 3)} Shift</span>
          <span className="font-semibold">{shift.hours}h</span>
        </div>
        <div className="text-xs font-bold text-slate-800 my-0.5">{shift.shiftTime}</div>
        <div className="text-[10px] text-slate-500 truncate">Standard Roster</div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 overflow-hidden">
      {/* Top Banner / Controls */}
      <div className="p-4 bg-white border-b border-slate-200 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">
              7-Day Staff Schedule (Mon – Sun)
            </h2>
            <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
              15 Active Personnel
            </span>
            {appliedProposalTitle && (
              <span className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                {appliedProposalTitle}
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time schedule synchronization with automated caregiving swap coverage.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex items-center gap-2.5 w-full lg:w-auto">
          <div className="relative flex-1 lg:w-48">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search worker..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div className="relative">
            <Filter className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="pl-8 pr-6 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer"
            >
              <option value="ALL">All Roles</option>
              <option value="Senior RN">Senior RN</option>
              <option value="Charge Nurse">Charge Nurse</option>
              <option value="RN">RN</option>
              <option value="LPN">LPN</option>
              <option value="Support Specialist">Support Specialist</option>
            </select>
          </div>
        </div>
      </div>

      {/* Schedule Legend */}
      <div className="bg-slate-100/70 border-b border-slate-200 px-4 py-2 flex flex-wrap items-center gap-4 text-xs text-slate-600">
        <span className="font-semibold text-slate-700 flex items-center gap-1">
          <Briefcase className="w-3.5 h-3.5 text-slate-500" /> Shift Legend:
        </span>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-indigo-50 border border-indigo-200" />
          <span>Standard Shift</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-amber-100 border border-amber-400" />
          <span className="font-medium text-amber-800">Childcare Conflict Flag</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-emerald-100 border border-emerald-400" />
          <span className="font-medium text-emerald-800">ShiftBridge AI Swap Applied</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-slate-200 border border-slate-300" />
          <span>Rest / Scheduled OFF</span>
        </div>
      </div>

      {/* Grid Container */}
      <div className="flex-1 overflow-x-auto overflow-y-auto">
        <table className="w-full min-w-[960px] border-collapse bg-white text-left">
          {/* Header Days Row */}
          <thead className="sticky top-0 bg-slate-100/95 backdrop-blur-xs z-10 border-b border-slate-200 text-slate-700">
            <tr>
              <th className="py-3 px-4 text-xs font-bold uppercase tracking-wider w-64 border-r border-slate-200">
                Worker / Qualifications
              </th>
              {DAYS_OF_WEEK.map((day) => {
                const isWednesday = day === 'Wednesday';
                return (
                  <th
                    key={day}
                    className={`py-3 px-2 text-center text-xs font-bold uppercase tracking-wider border-r border-slate-200 last:border-r-0 ${
                      isWednesday ? 'bg-amber-50/70 text-amber-900' : ''
                    }`}
                  >
                    <div className="flex flex-col items-center">
                      <span>{day}</span>
                      {isWednesday && (
                        <span className="text-[9px] font-bold text-amber-700 lowercase bg-amber-200/70 px-1.5 rounded mt-0.5">
                          target day
                        </span>
                      )}
                    </div>
                  </th>
                );
              })}
              <th className="py-3 px-3 text-center text-xs font-bold uppercase tracking-wider w-20">
                Hours
              </th>
            </tr>
          </thead>

          {/* Workers Schedule Rows */}
          <tbody className="divide-y divide-slate-200 text-xs">
            {filteredWorkers.map((worker) => {
              const workerSchedule = schedule[worker.id] || {};
              const currentTotalHours = DAYS_OF_WEEK.reduce((total, day) => {
                const shift = workerSchedule[day];
                return total + (shift ? shift.hours : 0);
              }, 0);

              return (
                <tr
                  key={worker.id}
                  className="hover:bg-slate-50/80 transition-colors group"
                >
                  {/* Worker Information Column */}
                  <td className="py-2.5 px-4 border-r border-slate-200 bg-white group-hover:bg-slate-50/80 sticky left-0 z-5">
                    <div className="flex items-center gap-3">
                      <img
                        src={worker.avatar}
                        alt={worker.name}
                        className="w-9 h-9 rounded-full object-cover border border-slate-200 flex-shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="font-bold text-slate-900 truncate flex items-center gap-1.5">
                          {worker.name}
                          {worker.id === 'w1' && (
                            <span className="text-[9px] bg-amber-100 text-amber-800 font-bold px-1 rounded border border-amber-200">
                              Affected
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-500 font-medium truncate">
                          {worker.role}
                        </div>
                        <div className="text-[10px] text-indigo-600 truncate">
                          {worker.department}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* 7 Day Shift Cells */}
                  {DAYS_OF_WEEK.map((day) => {
                    const shift = workerSchedule[day] || {
                      id: `${worker.id}-${day}`,
                      type: 'off',
                      shiftTime: 'OFF',
                      hours: 0
                    };

                    return (
                      <td
                        key={day}
                        onClick={() => setActiveShiftDetail({ worker, day, shift })}
                        className="p-1.5 border-r border-slate-200 last:border-r-0 align-top h-20 min-w-[105px] cursor-pointer"
                      >
                        {getShiftBadge(shift, day)}
                      </td>
                    );
                  })}

                  {/* Weekly Total Hours */}
                  <td className="py-2.5 px-3 text-center border-l border-slate-100 font-bold">
                    <span
                      className={`inline-block px-2 py-1 rounded-md text-xs ${
                        currentTotalHours > worker.maxHours
                          ? 'bg-rose-100 text-rose-800'
                          : currentTotalHours === worker.maxHours
                          ? 'bg-slate-100 text-slate-800'
                          : 'bg-indigo-50 text-indigo-700'
                      }`}
                    >
                      {currentTotalHours}h / {worker.maxHours}h
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Selected Shift Detail Popover / Modal */}
      {activeShiftDetail && (
        <div className="p-3 bg-white border-t border-slate-200 flex items-center justify-between text-xs text-slate-700">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-indigo-600" />
            <span>
              <strong>{activeShiftDetail.worker.name}</strong> on{' '}
              <strong>{activeShiftDetail.day}</strong>: {activeShiftDetail.shift.shiftTime} (
              {activeShiftDetail.shift.hours} hrs)
              {activeShiftDetail.shift.note && ` — Note: ${activeShiftDetail.shift.note}`}
            </span>
          </div>
          <button
            onClick={() => setActiveShiftDetail(null)}
            className="text-slate-400 hover:text-slate-700 px-2 py-0.5 rounded text-xs"
          >
            Dismiss
          </button>
        </div>
      )}
    </div>
  );
};
