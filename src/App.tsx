import { useState, useEffect } from 'react';
import type { Worker, ScheduleMap, AiProposal } from './types';
import {
  INITIAL_WORKERS,
  INITIAL_SCENARIO,
  buildInitialSchedule,
  AI_PROPOSALS
} from './data/mockData';
import { AuthCard } from './components/AuthCard';
import { Header } from './components/Header';
import { SidebarChat } from './components/SidebarChat';
import { CalendarGrid } from './components/CalendarGrid';

export default function App() {
  // Navigation: '/login' vs '/dashboard'
  const [currentPage, setCurrentPage] = useState<'login' | 'dashboard'>(() => {
    return window.location.pathname === '/login' ? 'login' : 'dashboard';
  });

  // Current session user and role
  const [currentRole, setCurrentRole] = useState<'worker' | 'manager'>('worker');
  const [currentUser, setCurrentUser] = useState<Worker>(INITIAL_WORKERS[0]); // Sarah Jenkins

  // Core Schedule State
  const [workers, setWorkers] = useState<Worker[]>(INITIAL_WORKERS);
  const [schedule, setSchedule] = useState<ScheduleMap>(buildInitialSchedule);

  // Approval and AI Resolution State
  const [pendingProposalId, setPendingProposalId] = useState<'opt_A' | 'opt_B' | null>(null);
  const [appliedProposalTitle, setAppliedProposalTitle] = useState<string | null>(null);
  const [approvalStatus, setApprovalStatus] = useState<{
    workerApproved: boolean;
    managerApproved: boolean;
    applied: boolean;
    selectedOption: 'opt_A' | 'opt_B' | null;
  }>({
    workerApproved: false,
    managerApproved: false,
    applied: false,
    selectedOption: null
  });

  // Keep browser history and URL in sync with state
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path === '/login') {
        setCurrentPage('login');
      } else {
        setCurrentPage('dashboard');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (page: 'login' | 'dashboard') => {
    setCurrentPage(page);
    window.history.pushState({}, '', page === 'login' ? '/login' : '/dashboard');
  };

  const handleLogin = (role: 'worker' | 'manager', user: Worker) => {
    setCurrentRole(role);
    setCurrentUser(user);
    navigateTo('dashboard');
  };

  const handleLogout = () => {
    navigateTo('login');
  };

  const handleSwitchRole = () => {
    if (currentRole === 'worker') {
      setCurrentRole('manager');
      // Default to Marcus Vance for manager
      const managerUser = workers.find((w) => w.id === 'w4') || workers[0];
      setCurrentUser(managerUser);
    } else {
      setCurrentRole('worker');
      // Default back to Sarah Jenkins for worker
      const workerUser = workers.find((w) => w.id === 'w1') || workers[0];
      setCurrentUser(workerUser);
    }
  };

  // Reset all scenario states
  const handleResetData = () => {
    setSchedule(buildInitialSchedule());
    setWorkers(INITIAL_WORKERS);
    setPendingProposalId(null);
    setAppliedProposalTitle(null);
    setApprovalStatus({
      workerApproved: false,
      managerApproved: false,
      applied: false,
      selectedOption: null
    });
  };

  // Worker initiates or signs off on approval
  const handleRequestApproval = (proposal: AiProposal) => {
    setPendingProposalId(proposal.optionId);
    setApprovalStatus((prev) => ({
      ...prev,
      workerApproved: true,
      selectedOption: proposal.optionId
    }));
  };

  // Manager approves and immediately applies schedule updates to the calendar
  const handleApplyProposal = (proposal: AiProposal) => {
    setPendingProposalId(proposal.optionId);
    setApprovalStatus({
      workerApproved: true,
      managerApproved: true,
      applied: true,
      selectedOption: proposal.optionId
    });
    setAppliedProposalTitle(proposal.title);

    // Apply schedule changes immutably
    setSchedule((prevSchedule) => {
      const nextSchedule: ScheduleMap = JSON.parse(JSON.stringify(prevSchedule));

      proposal.scheduleChanges.forEach((change) => {
        if (!nextSchedule[change.workerId]) return;

        nextSchedule[change.workerId][change.day] = {
          id: `updated-${change.workerId}-${change.day}-${Date.now()}`,
          type: change.newShift === 'OFF' ? 'off' : 'updated',
          shiftTime: change.newShift,
          hours: change.newHours,
          updatedByAi: true,
          note: change.note
        };
      });

      return nextSchedule;
    });

    // Update worker current hours based on proposal metrics
    setWorkers((prevWorkers) =>
      prevWorkers.map((w) => {
        if (proposal.optionId === 'opt_A') {
          if (w.id === 'w1') return { ...w, currentHours: 40 };
          if (w.id === 'w2') return { ...w, currentHours: 40 };
        } else if (proposal.optionId === 'opt_B') {
          if (w.id === 'w1') return { ...w, currentHours: 36 };
          if (w.id === 'w3') return { ...w, currentHours: 36 };
        }
        return w;
      })
    );
  };

  if (currentPage === 'login') {
    return <AuthCard onLogin={handleLogin} workers={workers} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      {/* Top Application Navigation */}
      <Header
        currentUser={currentUser}
        currentRole={currentRole}
        onSwitchRole={handleSwitchRole}
        onLogout={handleLogout}
        onResetData={handleResetData}
        isResolved={approvalStatus.applied}
      />

      {/* Main Split Screen Layout */}
      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden h-[calc(100vh-64px)]">
        {/* Left Section: ShiftBridge AI Assistant (Width 400px - 440px on desktop) */}
        <div className="w-full lg:w-[420px] xl:w-[450px] flex-shrink-0 h-[480px] lg:h-full border-b lg:border-b-0">
          <SidebarChat
            currentUser={currentUser}
            currentRole={currentRole}
            scenario={INITIAL_SCENARIO}
            aiProposals={AI_PROPOSALS}
            onApplyProposal={handleApplyProposal}
            onRequestApproval={handleRequestApproval}
            pendingProposalId={pendingProposalId}
            approvalStatus={approvalStatus}
            onResetChat={handleResetData}
          />
        </div>

        {/* Right Section: Interactive 7-Day Calendar & Shift Grid */}
        <div className="flex-1 h-full min-w-0">
          <CalendarGrid
            workers={workers}
            schedule={schedule}
            appliedProposalTitle={appliedProposalTitle}
          />
        </div>
      </main>
    </div>
  );
}
