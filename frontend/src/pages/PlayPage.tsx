import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { triviaApi } from '../services/trivia.service';
import type { Question, AnswerInput } from '../types/trivia';
import { useTimer } from '../hooks/useTimer';
import Timer from '../components/Timer';
import QuestionCard from '../components/QuestionCard';
import OptionButton from '../components/OptionButton';

type OptionState = 'default' | 'correct' | 'incorrect' | 'revealed' | 'disabled';

const TIMER_DURATION = 10;
const FEEDBACK_DELAY = 2000;

export default function PlayPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [answers, setAnswers] = useState<AnswerInput[]>([]);
  const [optionStates, setOptionStates] = useState<OptionState[]>(['default', 'default', 'default', 'default']);
  const [answered, setAnswered] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const questionStartTime = useRef<number>(0);
  const feedbackTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { timeLeft, start: startTimer, stop: stopTimer } = useTimer(TIMER_DURATION);

  // Fetch questions on mount
  useEffect(() => {
    if (!id) return;
    const fetchQuestions = async () => {
      try {
        const res = await triviaApi.getQuestions(id);
        setQuestions(res.data);
        setLoading(false);
      } catch {
        setError('Failed to load questions. Please try again.');
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [id]);

  // Start timer when questions are loaded or question changes
  useEffect(() => {
    if (questions.length > 0 && currentIndex < questions.length && !answered) {
      startTimer();
      questionStartTime.current = performance.now();
    }
  }, [questions, currentIndex, startTimer, answered]);

  // Handle timer expiry
  useEffect(() => {
    if (timeLeft === 0 && !answered && questions.length > 0) {
      handleTimeout();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (feedbackTimeout.current) {
        clearTimeout(feedbackTimeout.current);
      }
    };
  }, []);

  const handleTimeout = useCallback(() => {
    if (answered) return;
    setAnswered(true);

    const currentQuestion = questions[currentIndex];
    const responseTime = TIMER_DURATION;

    // Reveal correct answer
    const newStates: OptionState[] = currentQuestion.options.map((_, i) =>
      i === currentQuestion.correctIndex ? 'revealed' : 'disabled'
    );
    setOptionStates(newStates);

    // Record the answer
    const answerRecord: AnswerInput = {
      questionId: currentQuestion.id,
      selectedIndex: null,
      responseTime,
    };
    setAnswers(prev => [...prev, answerRecord]);

    // Move to next after delay
    feedbackTimeout.current = setTimeout(() => {
      moveToNext([...answers, answerRecord]);
    }, FEEDBACK_DELAY);
  }, [answered, questions, currentIndex, answers]);

  const handleAnswer = (selectedIndex: number) => {
    if (answered) return;
    setAnswered(true);
    stopTimer();

    const currentQuestion = questions[currentIndex];
    const elapsed = (performance.now() - questionStartTime.current) / 1000;
    const responseTime = Math.min(Math.round(elapsed * 10) / 10, TIMER_DURATION);
    const isCorrect = selectedIndex === currentQuestion.correctIndex;

    // Set option states for feedback
    const newStates: OptionState[] = currentQuestion.options.map((_, i) => {
      if (i === selectedIndex && isCorrect) return 'correct';
      if (i === selectedIndex && !isCorrect) return 'incorrect';
      if (i === currentQuestion.correctIndex && !isCorrect) return 'revealed';
      return 'disabled';
    });
    setOptionStates(newStates);

    // Record the answer
    const answerRecord: AnswerInput = {
      questionId: currentQuestion.id,
      selectedIndex,
      responseTime,
    };
    setAnswers(prev => [...prev, answerRecord]);

    // Move to next after delay
    feedbackTimeout.current = setTimeout(() => {
      moveToNext([...answers, answerRecord]);
    }, FEEDBACK_DELAY);
  };

  const moveToNext = async (currentAnswers: AnswerInput[]) => {
    const nextIndex = currentIndex + 1;

    if (nextIndex >= questions.length) {
      // All questions done — submit attempt
      await submitAttempt(currentAnswers);
    } else {
      setCurrentIndex(nextIndex);
      setAnswered(false);
      setOptionStates(['default', 'default', 'default', 'default']);
    }
  };

  const submitAttempt = async (finalAnswers: AnswerInput[]) => {
    if (!id) return;
    setSubmitting(true);
    try {
      const res = await triviaApi.submitAttempt(id, finalAnswers);
      navigate(`/trivia/${id}/results`, { state: { result: res.data } });
    } catch {
      setError('Failed to submit your attempt. Please try again.');
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin" />
          <p className="text-purple-600 font-medium">Loading questions...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-50 px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md text-center">
          <p className="text-red-600 font-medium mb-4">{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (submitting) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin" />
          <p className="text-purple-600 font-medium">Calculating your score...</p>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-50">
        <p className="text-gray-600">No questions found for this trivia.</p>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 flex flex-col">
      {/* Progress bar */}
      <div className="w-full h-1.5 bg-gray-200">
        <div
          className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-500 ease-out"
          style={{ width: `${((currentIndex + (answered ? 1 : 0)) / questions.length) * 100}%` }}
        />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 max-w-2xl mx-auto w-full">
        {/* Timer */}
        <div className="mb-6">
          <Timer timeLeft={timeLeft} duration={TIMER_DURATION} />
        </div>

        {/* Question */}
        <div className="w-full bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-6">
          <QuestionCard
            questionNumber={currentIndex + 1}
            totalQuestions={questions.length}
            questionText={currentQuestion.question}
          />
        </div>

        {/* Options */}
        <div className="w-full space-y-3">
          {currentQuestion.options.map((option, i) => (
            <OptionButton
              key={`${currentQuestion.id}-${i}`}
              label={option}
              index={i}
              state={optionStates[i]}
              onClick={handleAnswer}
            />
          ))}
        </div>

        {/* Answered indicator */}
        {answered && !submitting && (
          <p className="mt-4 text-sm text-gray-500 animate-pulse">
            Next question in a moment...
          </p>
        )}
      </div>
    </div>
  );
}
