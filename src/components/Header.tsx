import React from 'react';
import { Calendar, Shield, User, ArrowLeftRight, LogOut, CheckCircle } from 'lucide-react';
import type { Worker } from '../types';

interface HeaderProps {
  currentUser: Worker;
  currentRole: 'worker' | 'manager';
  onSwitchRole: () => void;
  onLogout: () => void;
  onResetData: () => void;
  isResolved: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentUser,
  currentRole,
  onSwitchRole,
  onLogout,
  onResetData,
  isResolved
}) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Tag */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-tr from-indigo-600 to-violet-600 rounded-xl text-white shadow-sm shadow-indigo-500/20">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg text-slate-900 tracking-tight">ShiftBridge</span>
                <span className="text-[11px] font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full border border-indigo-200/60">
                  AI MVP
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block">Automated Scheduling Conflict & Caregiver Relief</p>
            </div>
          </div>

          {/* Right Controls: Role Badge, Role Switcher, Reset, Logout */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Status indicator */}
            {isResolved ? (
              <div className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-medium">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                Schedule Synchronized
              </div>
            ) : (
              <div className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-medium">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                1 Pending Conflict
              </div>
            )}

            {/* User Profile Capsule */}
            <div className="flex items-center gap-2.5 bg-slate-50 border border-slate-200/80 px-2.5 py-1.5 rounded-xl">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-7 h-7 rounded-full object-cover border border-slate-300"
              />
              <div className="text-left text-xs leading-tight">
                <div className="font-semibold text-slate-900 flex items-center gap-1">
                  {currentUser.name}
                  {currentRole === 'manager' ? (
                    <span className="inline-flex items-center text-[10px] font-bold px-1.5 py-0.2 rounded bg-purple-100 text-purple-800">
                      <Shield className="w-2.5 h-2.5 mr-0.5" /> Manager
                    </span>
                  ) : (
                    <span className="inline-flex items-center text-[10px] font-bold px-1.5 py-0.2 rounded bg-blue-100 text-blue-800">
                      <User className="w-2.5 h-2.5 mr-0.5" /> Worker
                    </span>
                  )}
                </div>
                <div className="text-[11px] text-slate-500 truncate max-w-[120px]">{currentUser.role}</div>
              </div>
            </div>

            {/* Quick Switch Role Button */}
            <button
              onClick={onSwitchRole}
              title={`Switch to ${currentRole === 'worker' ? 'Manager' : 'Worker'} View`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium shadow-xs transition-colors cursor-pointer"
            >
              <ArrowLeftRight className="w-3.5 h-3.5 text-indigo-600" />
              <span className="hidden sm:inline">Switch to {currentRole === 'worker' ? 'Manager' : 'Worker'}</span>
            </button>

            {/* Reset Simulation State */}
            <button
              onClick={onResetData}
              title="Reset scenario data to initial state"
              className="text-xs text-slate-500 hover:text-slate-800 px-2 py-1.5 rounded-lg hover:bg-slate-100 transition-colors"
            >
              Reset
            </button>

            {/* Logout */}
            <button
              onClick={onLogout}
              title="Exit to login screen"
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
