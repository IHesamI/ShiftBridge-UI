import React, { useState } from 'react';
import { ShieldCheck, UserCheck, ArrowRight, Calendar } from 'lucide-react';
import type { Worker } from '../types';

interface AuthCardProps {
  onLogin: (role: 'worker' | 'manager', worker: Worker) => void;
  workers: Worker[];
}

export const AuthCard: React.FC<AuthCardProps> = ({ onLogin, workers }) => {
  const [activeTab, setActiveTab] = useState<'worker' | 'manager'>('worker');
  const [selectedWorkerId, setSelectedWorkerId] = useState<string>('w1'); // Default Sarah
  const [selectedManagerId, setSelectedManagerId] = useState<string>('w4'); // Default Marcus Vance

  const sarah = workers.find((w) => w.id === 'w1') || workers[0];
  const marcus = workers.find((w) => w.id === 'w4') || workers[1];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === 'worker') {
      const worker = workers.find((w) => w.id === selectedWorkerId) || sarah;
      onLogin('worker', worker);
    } else {
      const manager = workers.find((w) => w.id === selectedManagerId) || marcus;
      onLogin('manager', manager);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Background ambient decorative glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 -translate-x-1/2 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Brand Header */}
      <div className="text-center mb-8 relative z-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight flex items-center justify-center gap-2.5">
          <span className="p-2 bg-gradient-to-tr from-indigo-600 to-violet-600 rounded-xl shadow-lg shadow-indigo-500/30">
            <Calendar className="w-7 h-7 text-white" />
          </span>
          ShiftBridge
        </h1>
      </div>

      {/* Main Authentication Card */}
      <div className="w-full max-w-md bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-100 overflow-hidden relative z-10">
        {/* Role Toggle Switch */}
        <div className="p-2 bg-slate-100/80 border-b border-slate-200/80 grid grid-cols-2 gap-1.5">
          <button
            type="button"
            onClick={() => setActiveTab('worker')}
            className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-medium transition-all ${
              activeTab === 'worker'
                ? 'bg-white text-indigo-700 shadow-sm font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            Worker View
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('manager')}
            className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-medium transition-all ${
              activeTab === 'manager'
                ? 'bg-white text-indigo-700 shadow-sm font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            Manager View
          </button>
        </div>

        <div className="p-6 sm:p-8">
          {/* Quick Action One-Click Logins */}
          <div className="mb-6">
            <div className="text-xs uppercase tracking-wider font-semibold text-slate-400 mb-2.5">
              Quick Test Personas
            </div>
            {activeTab === 'worker' ? (
              <button
                type="button"
                onClick={() => onLogin('worker', sarah)}
                className="w-full group text-left p-3.5 rounded-xl border border-indigo-100 bg-indigo-50/60 hover:bg-indigo-100/70 hover:border-indigo-300 transition-all flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={sarah.avatar}
                    alt={sarah.name}
                    className="w-10 h-10 rounded-full border-2 border-indigo-200 object-cover"
                  />
                  <div>
                    <div className="font-semibold text-sm text-slate-900 group-hover:text-indigo-950 flex items-center gap-1.5">
                      {sarah.name}
                      <span className="text-[10px] uppercase font-bold bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded">
                        Has Conflict
                      </span>
                    </div>
                    <div className="text-xs text-slate-500">{sarah.role} • {sarah.department}</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-indigo-500 group-hover:translate-x-1 transition-transform" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => onLogin('manager', marcus)}
                className="w-full group text-left p-3.5 rounded-xl border border-indigo-100 bg-indigo-50/60 hover:bg-indigo-100/70 hover:border-indigo-300 transition-all flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={marcus.avatar}
                    alt={marcus.name}
                    className="w-10 h-10 rounded-full border-2 border-indigo-200 object-cover"
                  />
                  <div>
                    <div className="font-semibold text-sm text-slate-900 group-hover:text-indigo-950 flex items-center gap-1.5">
                      {marcus.name}
                      <span className="text-[10px] uppercase font-bold bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded">
                        Approver
                      </span>
                    </div>
                    <div className="text-xs text-slate-500">{marcus.role} • {marcus.department}</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-indigo-500 group-hover:translate-x-1 transition-transform" />
              </button>
            )}
          </div>

          <div className="relative flex items-center my-6">
            <div className="flex-grow border-t border-slate-200" />
            <span className="flex-shrink mx-3 text-xs text-slate-400 uppercase font-medium">Or select any worker</span>
            <div className="flex-grow border-t border-slate-200" />
          </div>

          {/* Form */}
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                {activeTab === 'worker' ? 'Select Worker Profile' : 'Select Manager Profile'}
              </label>
              <select
                value={activeTab === 'worker' ? selectedWorkerId : selectedManagerId}
                onChange={(e) =>
                  activeTab === 'worker'
                    ? setSelectedWorkerId(e.target.value)
                    : setSelectedManagerId(e.target.value)
                }
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow"
              >
                {workers.map((worker) => (
                  <option key={worker.id} value={worker.id}>
                    {worker.name} — {worker.role} ({worker.department})
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-sm font-semibold shadow-md shadow-indigo-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              Enter Dashboard as {activeTab === 'worker' ? 'Worker' : 'Manager'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

        </div>
      </div>
    </div>
  );
};
