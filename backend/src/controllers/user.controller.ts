import { Request, Response, NextFunction } from 'express';
import prisma from '../config/database';
import { AppError } from '../utils/errors';

// ─── Get Profile ─────────────────────────────────────────────────────────────

export async function getProfileHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      select: {
        id: true,
        email: true,
        username: true,
        phone: true,
        birthday: true,
        profilePicture: true,
        emailVerified: true,
        role: true,
        currentStreak: true,
        lastPlayedDate: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new AppError('User not found', 404);
    }

    res.json({ user });
  } catch (error) {
    next(error);
  }
}

// ─── Update Username ─────────────────────────────────────────────────────────

export async function updateUsernameHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const { username } = req.body;

    // Check uniqueness
    const existing = await prisma.user.findUnique({ where: { username } });
    if (existing && existing.id !== req.userId) {
      throw new AppError('This username is already taken', 409);
    }

    const user = await prisma.user.update({
      where: { id: req.userId },
      select: {
        id: true,
        email: true,
        username: true,
        phone: true,
        birthday: true,
        profilePicture: true,
        emailVerified: true,
        role: true,
        currentStreak: true,
        lastPlayedDate: true,
        createdAt: true,
        updatedAt: true,
      },
      data: { username },
    });

    res.json({ user });
  } catch (error) {
    next(error);
  }
}

// ─── Update Avatar ───────────────────────────────────────────────────────────

export async function updateAvatarHandler(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.file) {
      throw new AppError('No image file provided', 400);
    }

    const filePath = req.file.path.replace(/\\/g, '/');

    const user = await prisma.user.update({
      where: { id: req.userId },
      select: {
        id: true,
        email: true,
        username: true,
        phone: true,
        birthday: true,
        profilePicture: true,
        emailVerified: true,
        role: true,
        currentStreak: true,
        lastPlayedDate: true,
        createdAt: true,
        updatedAt: true,
      },
      data: { profilePicture: filePath },
    });

    res.json({ user });
  } catch (error) {
    next(error);
  }
}
