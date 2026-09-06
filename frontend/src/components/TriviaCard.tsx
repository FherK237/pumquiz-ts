import { useNavigate } from 'react-router-dom';
import type { Trivia } from '../types/trivia';

const difficultyColors: Record<Trivia['difficulty'], string> = {
  EASY: 'bg-green-100 text-green-800',
  MEDIUM: 'bg-yellow-100 text-yellow-800',
  HARD: 'bg-red-100 text-red-800',
};

interface TriviaCardProps {
  trivia: Trivia;
}

export default function TriviaCard({ trivia }: TriviaCardProps) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/trivia/${trivia.id}`)}
      className="bg-white rounded-2xl shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow border border-gray-100"
    >
      <h3 className="text-lg font-semibold text-gray-800 mb-3 line-clamp-2">
        {trivia.title}
      </h3>

      <div className="flex flex-wrap gap-2">
        <span className="px-3 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800">
          {trivia.category}
        </span>
        <span
          className={`px-3 py-1 text-xs font-medium rounded-full ${difficultyColors[trivia.difficulty]}`}
        >
          {trivia.difficulty}
        </span>
      </div>
    </div>
  );
}
