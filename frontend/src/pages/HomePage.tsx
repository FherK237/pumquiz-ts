import { useEffect, useState, useRef } from 'react';
import { triviaApi } from '../services/trivia.service';
import type { Trivia } from '../types/trivia';
import TriviaCard from '../components/TriviaCard';
import { useAuth } from '../context/AuthContext';
import AddTrivia from '../components/AddTrivia';
import { ChevronDown } from 'lucide-react';

const CATEGORIES = ['Ciencia', 'Historia', 'Geografía', 'Deporte', 'Entretenimiento', 'Tecnología', 'Programación', 'Conocimiento General', 'Naturaleza' , 'Videojuegos', 'Autos', 'Cine y Animación', 'Mitologías', 'Arte y Literatura' ];
const DIFFICULTIES: Trivia['difficulty'][] = ['EASY', 'MEDIUM', 'HARD'];

export default function HomePage() {
  const [trivias, setTrivias] = useState<Trivia[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('');

  const { user, isLoading } = useAuth();

  // Custom select states
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [difficultyOpen, setDifficultyOpen] = useState(false);
  const categoryRef = useRef<HTMLDivElement>(null);
  const difficultyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (categoryRef.current && !categoryRef.current.contains(e.target as Node)) {
        setCategoryOpen(false);
      }
      if (difficultyRef.current && !difficultyRef.current.contains(e.target as Node)) {
        setDifficultyOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  useEffect(() => {
    setLoading(true);
    const params: Record<string, string> = {};
    if (category) params.category = category;
    if (difficulty) params.difficulty = difficulty;

    triviaApi.list(params)
      .then(res => setTrivias(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [category, difficulty]);

  // Intercepta el renderizado mientras carga la sesión
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-xl font-bold text-purple-600 animate-pulse">
          Cargando PumQuiz...
        </div>
      </div>
    );
  }

  return (
      <div className="bg-gray-50 px-4 py-8 rounded-2xl m-5">
        <div className="max-w-6xl mx-auto">
          {/* Filters */}
          <div className="mb-5 flex flex-col sm:flex-row gap-4 justify-center">

            {/* Category Select */}
            <div ref={categoryRef} className="relative w-full sm:w-56">
              <button
                type="button"
                onClick={() => setCategoryOpen(!categoryOpen)}
                className="w-full flex items-center justify-between px-4 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <span className={category ? 'text-gray-900' : 'text-gray-500'}>
                  {category || 'All Categories'}
                </span>
                <ChevronDown
                  className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${
                    categoryOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {categoryOpen && (
                <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg py-1">
                  <li
                    onClick={() => { setCategory(''); setCategoryOpen(false); }}
                    className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 ${
                      category === '' ? 'bg-purple-50 text-purple-600' : ''
                    }`}
                  >
                    All Categories
                  </li>
                  {CATEGORIES.map(cat => (
                    <li
                      key={cat}
                      onClick={() => { setCategory(cat); setCategoryOpen(false); }}
                      className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 ${
                        category === cat ? 'bg-purple-50 text-purple-600' : ''
                      }`}
                    >
                      {cat}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Difficulty Select */}
            <div ref={difficultyRef} className="relative w-full sm:w-56">
              <button
                type="button"
                onClick={() => setDifficultyOpen(!difficultyOpen)}
                className="w-full flex items-center justify-between px-4 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <span className={difficulty ? 'text-gray-900' : 'text-gray-500'}>
                  {difficulty || 'All Difficulties'}
                </span>
                <ChevronDown
                  className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${
                    difficultyOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {difficultyOpen && (
                <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg py-1">
                  <li
                    onClick={() => { setDifficulty(''); setDifficultyOpen(false); }}
                    className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 ${
                      difficulty === '' ? 'bg-purple-50 text-purple-600' : ''
                    }`}
                  >
                    All Difficulties
                  </li>
                  {DIFFICULTIES.map(diff => (
                    <li
                      key={diff}
                      onClick={() => { setDifficulty(diff); setDifficultyOpen(false); }}
                      className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 ${
                        difficulty === diff ? 'bg-purple-50 text-purple-600' : ''
                      }`}
                    >
                      {diff}
                    </li>
                  ))}
                </ul>
              )}
            </div>

          </div>

          {/* Content */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-10 w-10 border-4 border-purple-200 border-t-purple-600" />
            </div>
          ) : trivias.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">No trivias found</p>
              <p className="text-gray-400 text-sm mt-1">Try adjusting your filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trivias.map(trivia => (
                <TriviaCard key={trivia.id} trivia={trivia} />
              ))}
            </div>
          )}
          <div>
            {user?.role === 'ADMIN' && (
              <AddTrivia />
            )}
          </div>
        </div>
      </div>
  );
}   