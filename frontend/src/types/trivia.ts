export interface Trivia {
  id: string;
  title: string;
  category: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  type: 'OFFICIAL' | 'COMMUNITY';
  createdAt: string;
  _count?: { questions: number };
  creator?: { username: string };
}

export interface Question {
  id: string;
  triviaId: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string | null;
}

export interface AnswerInput {
  questionId: string;
  selectedIndex: number | null;
  responseTime: number;
}

export interface AttemptResult {
  attemptId: string;
  totalScore: number;
  correctCount: number;
  isNewBestScore: boolean;
  previousBestScore: number | null;
  streakUpdated: boolean;
  currentStreak: number;
  results: Array<{
    questionId: string;
    question: string;
    selectedIndex: number | null;
    correctIndex: number;
    isCorrect: boolean;
    pointsEarned: number;
    explanation: string | null;
  }>;
}
