import type { LeaderboardEntry } from '../types/leaderboard';

interface LeaderboardTableProps {
  entries: LeaderboardEntry[];
  currentUserId?: string;
}

const MEDALS: Record<number, string> = {
  1: '🥇',
  2: '🥈',
  3: '🥉',
};

// Deterministic-ish color for avatar fallback based on username
const AVATAR_COLORS = [
  'bg-purple-500',
  'bg-pink-500',
  'bg-indigo-500',
  'bg-blue-500',
  'bg-teal-500',
  'bg-amber-500',
  'bg-rose-500',
];

function colorForUsername(username: string): string {
  let sum = 0;
  for (let i = 0; i < username.length; i++) {
    sum += username.charCodeAt(i);
  }
  return AVATAR_COLORS[sum % AVATAR_COLORS.length];
}

function Avatar({ username, profilePicture }: { username: string; profilePicture: string | null }) {
  if (profilePicture) {
    return (
      <img
        src={profilePicture}
        alt={username}
        className="h-9 w-9 shrink-0 rounded-full object-cover"
      />
    );
  }

  const initial = username.charAt(0).toUpperCase();
  return (
    <div
      className={`h-9 w-9 shrink-0 rounded-full flex items-center justify-center text-white text-sm font-semibold ${colorForUsername(username)}`}
    >
      {initial}
    </div>
  );
}

export default function LeaderboardTable({ entries, currentUserId }: LeaderboardTableProps) {
  if (entries.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500 text-lg">No scores yet</p>
        <p className="text-gray-400 text-sm mt-1">Be the first to climb the ranks!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-purple-50 text-purple-700 text-xs sm:text-sm">
              <th className="px-2 py-3 sm:px-4 font-semibold w-12 sm:w-16 text-center">Rank</th>
              <th className="px-2 py-3 sm:px-4 font-semibold">Player</th>
              <th className="px-2 py-3 sm:px-4 font-semibold text-right">Score</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {entries.map((entry) => {
              const isCurrentUser = currentUserId != null && entry.userId === currentUserId;
              return (
                <tr
                  key={entry.userId}
                  className={isCurrentUser ? 'bg-purple-100/60' : 'hover:bg-gray-50'}
                >
                  <td className="px-2 py-3 sm:px-4 text-center">
                    <span className="text-base sm:text-lg font-semibold text-gray-700">
                      {MEDALS[entry.rank] ?? entry.rank}
                    </span>
                  </td>
                  <td className="px-2 py-3 sm:px-4">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <Avatar username={entry.username} profilePicture={entry.profilePicture} />
                      <span className={`font-medium text-sm sm:text-base break-words ${isCurrentUser ? 'text-purple-700' : 'text-gray-800'}`}>
                        {entry.username}
                        {isCurrentUser && <span className="ml-2 text-xs text-purple-500">(You)</span>}
                      </span>
                    </div>
                  </td>
                  <td className="px-2 py-3 sm:px-4 text-right font-semibold text-purple-600 text-sm sm:text-base whitespace-nowrap">
                    {entry.totalScore.toLocaleString()}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
