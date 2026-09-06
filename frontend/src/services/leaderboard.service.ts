import api from './api';
import type { LeaderboardEntry } from '../types/leaderboard';

export const leaderboardApi = {
  global: () => api.get<LeaderboardEntry[]>('/leaderboard/global'),
  byCategory: (name: string) => api.get<LeaderboardEntry[]>(`/leaderboard/category/${name}`),
};
