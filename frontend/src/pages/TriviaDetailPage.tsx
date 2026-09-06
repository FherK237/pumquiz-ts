import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { triviaApi } from '../services/trivia.service';
import type { Trivia } from '../types/trivia';

export default function TriviaDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [trivia, setTrivia] = useState<Trivia | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    triviaApi
      .getById(id)
      .then((res) => setTrivia(res.data))
      .catch(() => setError('Failed to load trivia details'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
          <p className="mt-3 text-gray-600">Loading trivia...</p>
        </div>
      </div>
    );
  }

  if (error || !trivia) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || 'Trivia not found'}</p>
          <Link
            to="/"
            className="text-purple-600 hover:text-purple-700 font-medium"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const difficultyColors: Record<string, string> = {
    EASY: 'bg-green-100 text-green-700',
    MEDIUM: 'bg-yellow-100 text-yellow-700',
    HARD: 'bg-red-100 text-red-700',
  };

  return (
    <div className="bg-gray-50 px-4 py-8 rounded-2xl m-3"> {/*min-h-screen */}
      <div className="max-w-lg mx-auto">
        <Link
          to="/"
          className="inline-flex items-center text-sm text-gray-600 hover:text-purple-600 mb-6"
        >
          ← Back to Home
        </Link>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {trivia.title}
          </h1>

          <div className="space-y-3 mb-6">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Category</span>
              <span className="text-sm font-medium text-gray-800">
                {trivia.category}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Difficulty</span>
              <span
                className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${difficultyColors[trivia.difficulty] || 'bg-gray-100 text-gray-700'}`}
              >
                {trivia.difficulty}
              </span>
            </div>

            {trivia.creator && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Created by</span>
                <span className="text-sm font-medium text-gray-800">
                  {trivia.creator.username}
                </span>
              </div>
            )}

            {trivia._count?.questions != null && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Questions</span>
                <span className="text-sm font-medium text-gray-800">
                  {trivia._count.questions}
                </span>
              </div>
            )}
          </div>

          <button
            onClick={() => navigate(`/trivia/${id}/play`)}
            className="w-full py-3 px-6 bg-purple-600 hover:bg-purple-700 text-white text-lg font-semibold rounded-lg transition-colors"
          >
            Play Now
          </button>
        </div>
      </div>
    </div>
  );
}
