import type { Worker, ScheduleMap, AiProposal, Scenario } from '../types';

const API_BASE = 'http://localhost:8000/data';
const AUTH_BASE = 'http://localhost:8000/auth';

export const api = {
  login: async (credentials: { username: string; password: string }): Promise<{ token: string; user: Worker }> => {
    const response = await fetch(`${AUTH_BASE}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    if (!response.ok) throw new Error('Login failed');
    return response.json();
  },

  getMe: async (token: string): Promise<Worker> => {
    const response = await fetch(`${AUTH_BASE}/me`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    if (!response.ok) throw new Error('Failed to get user');
    return response.json();
  },

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
      return {};
    }
  },

  getScenario: async (): Promise<Scenario> => {
    return {} as Scenario;
  },

  getProposals: async (): Promise<AiProposal[]> => {
    try {
      const response = await fetch(`${API_BASE}/proposals`);
      if (!response.ok) return [];
      return response.json();
    } catch {
      return [];
    }
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
