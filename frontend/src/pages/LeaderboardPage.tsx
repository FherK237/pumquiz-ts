import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLeaderboard } from '../hooks/useLeaderboard';
import LeaderboardTable from '../components/LeaderboardTable';
import { useAuth } from '../context/AuthContext';
import AddTrivia from '../components/AddTrivia';

const CATEGORIES = ['Science', 'History', 'Geography', 'Sports'];

type Tab = 'global' | string;

export default function LeaderboardPage() {
  const [tab, setTab] = useState<Tab>('global');
  const { entries, loading } = useLeaderboard(tab);
  const { user } = useAuth();

  const tabs: { key: Tab; label: string }[] = [
    { key: 'global', label: 'Global' },
    ...CATEGORIES.map((cat) => ({ key: cat, label: cat })),
  ];

  return (
    <div className=" bg-gray-50 px-4 py-8 rounded-2xl m-5">  {/*min-h-screen*/}
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between gap-3 mb-8">
          <h1 className="flex items-center gap-2 text-2xl sm:text-3xl font-bold text-purple-600">
            {/* <span>🏆</span> */}
            Leaderboard
          </h1>
          <Link
            to="/"
            className="shrink-0 px-3 py-2 sm:px-4 border border-gray-300 rounded-lg bg-white hover:bg-gray-100 text-gray-700 text-sm transition-colors whitespace-nowrap"
          >
            ← <span className="hidden sm:inline">Back to home</span><span className="sm:hidden">Home</span>
          </Link>
        </div>

        {/* Tab bar */}
        <div className="flex flex-wrap gap-2 mb-6">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                tab === t.key
                  ? 'bg-purple-600 text-white'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-purple-50'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-4 border-purple-200 border-t-purple-600" />
          </div>
        ) : (
          <LeaderboardTable entries={entries} currentUserId={user?.id} />
        )}
          <div>
            {user?.role === 'ADMIN' && (
              <AddTrivia/>
              
            ) }
          </div>
      </div>
    </div>
  );
}
