import { Request, Response, NextFunction } from 'express';
import { getGlobalLeaderboard, getCategoryLeaderboard } from '../services/leaderboard.service';

export async function globalLeaderboardHandler(_req: Request, res: Response, next: NextFunction) {
  try {
    const results = await getGlobalLeaderboard();
    res.status(200).json(results);
  } catch (err) {
    next(err);
  }
}

export async function categoryLeaderboardHandler(req: Request<{ name: string }>, res: Response, next: NextFunction) {
  try {
    const { name } = req.params;
    const results = await getCategoryLeaderboard(name);
    res.status(200).json(results);
  } catch (err) {
    next(err);
  }
}
