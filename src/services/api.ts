import type { Worker, ScheduleMap, AiProposal, Scenario } from '../types';

const API_BASE = 'http://localhost:8000/data';

export const api = {
  getWorkers: async (): Promise<Worker[]> => {
    try{
      const response = await fetch(`${API_BASE}/workers`);
      if (!response.ok) {}
      return response.json();
    }catch{
      return []
    }
  },

  getSchedule: async (): Promise<ScheduleMap> => {
    try{
      const response = await fetch(`${API_BASE}/shifts`);
      if (!response.ok) {}
      return response.json();
    }catch{
      return []
    }
  },

  getScenario: async (): Promise<Scenario> => {
    return 
  },

  getProposals: async (): Promise<AiProposal[]> => {
    const response = await fetch(`${API_BASE}/proposals`).catch();
    if (!response.ok) [];
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
