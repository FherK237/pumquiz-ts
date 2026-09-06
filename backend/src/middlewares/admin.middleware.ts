import { Request, Response, NextFunction } from 'express';
import prisma from '../config/database';

export async function adminMiddleware(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.userId } });
    if (!user || user.role !== 'ADMIN') {
      res.status(403).json({ error: { message: 'Admin access required' } });
      return;
    }
    next();
  } catch (error) {
    res.status(500).json({ error: { message: 'Internal server error' } });
  }
}
