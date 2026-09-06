import { useLocation, useNavigate, useParams, Navigate } from 'react-router-dom';
import type { AttemptResult } from '../types/trivia';

export default function ResultsPage() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state as { result?: AttemptResult } | null;
  const result = state?.result;

  if (!result) {
    return <Navigate to="/" replace />;
  }

  const totalQuestions = result.results.length;
  const scorePercentage = totalQuestions > 0 ? Math.round((result.correctCount / totalQuestions) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 px-4 py-8">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Score Summary Card */}
        <div
          className={`bg-white rounded-2xl shadow-lg p-6 sm:p-8 text-center ${
            result.isNewBestScore ? 'border-4 border-yellow-400 ring-4 ring-yellow-100' : ''
          }`}
        >
          {/* New Best Score Celebration */}
          {result.isNewBestScore && (
            <div className="mb-4 flex items-center justify-center gap-2 text-yellow-600">
              <span className="text-2xl">⭐</span>
              <span className="font-bold text-lg">New Best Score!</span>
              <span className="text-2xl">⭐</span>
            </div>
          )}

          {/* Big Score Number */}
          <div className="mb-2">
            <span className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              {result.totalScore}
            </span>
            <p className="text-gray-500 text-sm mt-1">points</p>
          </div>

          {/* Correct Count */}
          <p className="text-xl font-semibold text-gray-700 mb-2">
            {result.correctCount}/{totalQuestions} correct ({scorePercentage}%)
          </p>

          {/* Previous Best Score */}
          {result.previousBestScore !== null && (
            <p className="text-sm text-gray-500">
              Previous best: {result.previousBestScore} pts
            </p>
          )}

          {/* Streak Info */}
          {result.streakUpdated && result.currentStreak > 0 && (
            <div className="mt-4 inline-flex items-center gap-1 bg-orange-50 text-orange-600 px-4 py-2 rounded-full font-semibold">
              <span className="text-xl">🔥</span>
              <span>{result.currentStreak} day streak!</span>
            </div>
          )}
        </div>

        {/* Per-Question Breakdown */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Question Breakdown</h2>
          <div className="space-y-4">
            {result.results.map((q, index) => (
              <div
                key={q.questionId}
                className={`rounded-xl border-2 p-4 ${
                  q.isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <p className="font-medium text-gray-800">
                    <span className="text-sm text-gray-500 mr-2">Q{index + 1}.</span>
                    {q.question}
                  </p>
                  <span
                    className={`shrink-0 text-xs font-bold px-2 py-1 rounded-full ${
                      q.isCorrect
                        ? 'bg-green-200 text-green-800'
                        : 'bg-red-200 text-red-800'
                    }`}
                  >
                    +{q.pointsEarned}
                  </span>
                </div>

                {/* User's Answer */}
                {q.selectedIndex !== null ? (
                  <p className={`text-sm ${q.isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                    Your answer: Option {q.selectedIndex + 1}
                    {!q.isCorrect && (
                      <span className="text-green-700 ml-2">
                        • Correct: Option {q.correctIndex + 1}
                      </span>
                    )}
                  </p>
                ) : (
                  <p className="text-sm text-gray-500">
                    Timed out
                    <span className="text-green-700 ml-2">
                      • Correct: Option {q.correctIndex + 1}
                    </span>
                  </p>
                )}

                {/* Explanation for incorrect / timed-out */}
                {!q.isCorrect && q.explanation && (
                  <p className="mt-2 text-sm text-gray-600 italic border-t border-gray-200 pt-2">
                    💡 {q.explanation}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <button
            onClick={() => navigate(`/trivia/${id}/play`)}
            className="flex-1 py-3 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 transition-colors shadow-md"
          >
            Retry
          </button>
          <button
            onClick={() => navigate('/')}
            className="flex-1 py-3 bg-white text-purple-600 font-semibold rounded-xl border-2 border-purple-200 hover:border-purple-400 transition-colors shadow-md"
          >
            Back to Catalog
          </button>
        </div>
      </div>
    </div>
  );
}
