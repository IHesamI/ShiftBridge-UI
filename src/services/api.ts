import type { Worker, ScheduleMap, AiProposal, Scenario } from '../types';

const API_BASE = 'http://localhost:8000';

export const api = {
  getWorkers: async (): Promise<Worker[]> => {
    const response = await fetch(`${API_BASE}/workers`);
    if (!response.ok) throw new Error('Failed to fetch workers');
    return response.json();
  },

  getSchedule: async (): Promise<ScheduleMap> => {
    const response = await fetch(`${API_BASE}/schedule`);
    if (!response.ok) throw new Error('Failed to fetch schedule');
    return response.json();
  },

  getScenario: async (): Promise<Scenario> => {
    const response = await fetch(`${API_BASE}/scenario`);
    if (!response.ok) throw new Error('Failed to fetch scenario');
    return response.json();
  },

  getProposals: async (): Promise<AiProposal[]> => {
    const response = await fetch(`${API_BASE}/proposals`);
    if (!response.ok) throw new Error('Failed to fetch proposals');
    return response.json();
  },

  applyProposal: async (proposalId: string): Promise<ScheduleMap> => {
    const response = await fetch(`${API_BASE}/proposals/apply`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ proposalId }),
    });
    if (!response.ok) throw new Error('Failed to apply proposal');
    return response.json();
  },
};
