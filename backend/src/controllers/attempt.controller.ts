import { Request, Response, NextFunction } from 'express';
import { submitAttempt } from '../services/attempt.service';
import { updateStreak } from '../services/streak.service';
import { AppError } from '../utils/errors';

export async function submitAttemptHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.userId;
    if (!userId) {
      throw new AppError('Unauthorized', 401);
    }

    const triviaId = req.params.id as string;
    const { answers } = req.body;

    const attemptResult = await submitAttempt(userId, triviaId, answers);
    const streakResult = await updateStreak(userId);

    res.status(201).json({
      ...attemptResult,
      streakUpdated: streakResult.streakUpdated,
      currentStreak: streakResult.currentStreak,
    });
  } catch (err) {
    next(err);
  }
}
