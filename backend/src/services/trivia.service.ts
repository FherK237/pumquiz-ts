import prisma from '../config/database';
import { AppError } from '../utils/errors';
import { Difficulty } from '@prisma/client';

// ─── Types ───────────────────────────────────────────────────────────────────

interface TriviaFilters {
  category?: string;
  difficulty?: Difficulty;
}

// ─── Shuffle Utility (Fisher-Yates) ─────────────────────────────────────────

export function shuffle<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// ─── List Trivias ────────────────────────────────────────────────────────────

export async function listTrivias(filters?: TriviaFilters) {
  const where: Record<string, unknown> = {};

  if (filters?.category) {
    where.category = filters.category;
  }

  if (filters?.difficulty) {
    where.difficulty = filters.difficulty;
  }

  const trivias = await prisma.trivia.findMany({
    where,
    select: {
      id: true,
      title: true,
      category: true,
      difficulty: true,
      type: true,
      createdAt: true,
      _count: {
        select: { questions: true },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  return trivias;
}

// ─── Get Trivia By ID ────────────────────────────────────────────────────────

export async function getTriviaById(id: string) {
  const trivia = await prisma.trivia.findUnique({
    where: { id },
    include: {
      creator: {
        select: { username: true },
      },
      _count: {
        select: { questions: true },
      },
    },
  });

  if (!trivia) {
    throw new AppError('Trivia not found', 404);
  }

  return trivia;
}

// ─── Get Questions ───────────────────────────────────────────────────────────

export async function getQuestions(triviaId: string) {
  // Verify trivia exists
  const trivia = await prisma.trivia.findUnique({
    where: { id: triviaId },
  });

  if (!trivia) {
    throw new AppError('Trivia not found', 404);
  }

  const questions = await prisma.question.findMany({
    where: { triviaId },
    select: {
      id: true,
      question: true,
      options: true,
      correctIndex: true,
      explanation: true,
      triviaId: true,
    },
  });

  // Randomize question order
  return shuffle(questions);
}
