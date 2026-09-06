import { useState, useEffect } from 'react';
import { leaderboardApi } from '../services/leaderboard.service';
import type { LeaderboardEntry } from '../types/leaderboard';

export function useLeaderboard(mode: 'global' | string) {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetch = mode === 'global'
      ? leaderboardApi.global()
      : leaderboardApi.byCategory(mode);
    fetch
      .then(res => setEntries(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [mode]);

  return { entries, loading };
}
