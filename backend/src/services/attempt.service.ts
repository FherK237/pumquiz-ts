import prisma from '../config/database';
import { AppError } from '../utils/errors';
import { calculatePoints } from '../services/scoring.service';

// ─── Types ───────────────────────────────────────────────────────────────────

interface AnswerInput {
  questionId: string;
  selectedIndex: number | null;
  responseTime: number;
}

interface AttemptResult {
  attemptId: string;
  totalScore: number;
  correctCount: number;
  isNewBestScore: boolean;
  previousBestScore: number | null;
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

// ─── Submit Attempt ──────────────────────────────────────────────────────────

export async function submitAttempt(
  userId: string,
  triviaId: string,
  answers: AnswerInput[],
): Promise<AttemptResult> {
  // 1. Verify trivia exists
  const trivia = await prisma.trivia.findUnique({
    where: { id: triviaId },
  });

  if (!trivia) {
    throw new AppError('Trivia not found', 404);
  }

  // 2. Get all questions for the trivia
  const questions = await prisma.question.findMany({
    where: { triviaId },
  });

  // 3. Process each answer
  const processedAnswers = answers.map((answer) => {
    const question = questions.find((q) => q.id === answer.questionId);

    if (!question) {
      throw new AppError(`Question not found: ${answer.questionId}`, 400);
    }

    const isCorrect =
      answer.selectedIndex !== null && answer.selectedIndex === question.correctIndex;

    const pointsEarned = calculatePoints(answer.responseTime, isCorrect);

    return {
      questionId: answer.questionId,
      selectedIndex: answer.selectedIndex,
      responseTime: answer.responseTime,
      isCorrect,
      pointsEarned,
      question: question.question,
      correctIndex: question.correctIndex,
      explanation: question.explanation,
    };
  });

  // 4. Calculate totals
  const totalScore = processedAnswers.reduce((sum, a) => sum + a.pointsEarned, 0);
  const correctCount = processedAnswers.filter((a) => a.isCorrect).length;

  // 5. Create Attempt record with nested answers
  const attempt = await prisma.attempt.create({
    data: {
      userId,
      triviaId,
      totalScore,
      correctCount,
      answers: {
        create: processedAnswers.map((a) => ({
          questionId: a.questionId,
          selectedIndex: a.selectedIndex,
          isCorrect: a.isCorrect,
          responseTime: a.responseTime,
          pointsEarned: a.pointsEarned,
        })),
      },
    },
  });

  // 6. Check and update BestScore
  const existingBestScore = await prisma.bestScore.findUnique({
    where: {
      userId_triviaId: { userId, triviaId },
    },
  });

  let isNewBestScore = false;
  const previousBestScore = existingBestScore ? existingBestScore.score : null;

  if (!existingBestScore) {
    // No existing best score — create one
    await prisma.bestScore.create({
      data: { userId, triviaId, score: totalScore },
    });
    isNewBestScore = true;
  } else if (totalScore > existingBestScore.score) {
    // New score is higher — update
    await prisma.bestScore.update({
      where: { userId_triviaId: { userId, triviaId } },
      data: { score: totalScore, achievedAt: new Date() },
    });
    isNewBestScore = true;
  }

  // 7. Return result object
  return {
    attemptId: attempt.id,
    totalScore,
    correctCount,
    isNewBestScore,
    previousBestScore,
    results: processedAnswers.map((a) => ({
      questionId: a.questionId,
      question: a.question,
      selectedIndex: a.selectedIndex,
      correctIndex: a.correctIndex,
      isCorrect: a.isCorrect,
      pointsEarned: a.pointsEarned,
      explanation: a.explanation,
    })),
  };
}
