import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import { globalLeaderboardHandler, categoryLeaderboardHandler } from '../controllers/leaderboard.controller';

const router = Router();

router.get('/global', authMiddleware, globalLeaderboardHandler);
router.get('/category/:name', authMiddleware, categoryLeaderboardHandler);

export default router;
