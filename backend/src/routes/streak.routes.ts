import { Router, Request, Response, NextFunction } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import prisma from '../config/database';

const router = Router();

router.get('/me', authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await prisma.user.findUniqueOrThrow({
      where: { id: req.userId },
      select: { currentStreak: true, lastPlayedDate: true },
    });
    res.status(200).json({
      currentStreak: user.currentStreak,
      lastPlayedDate: user.lastPlayedDate,
    });
  } catch (err) {
    next(err);
  }
});

export default router;
