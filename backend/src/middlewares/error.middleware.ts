import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { Prisma } from '@prisma/client';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import multer from 'multer';
import { AppError } from '../utils/errors';
import { env } from '../config/env';

export function errorHandler(err: Error, _req: Request, res: Response, _next: NextFunction): void {
  if (env.NODE_ENV === 'development') {
    console.error(`[Error] ${err.message}`, err.stack);
  }

  // AppError (custom errors with statusCode)
  if (err instanceof AppError) {
    res.status(err.statusCode).json({ error: { message: err.message } });
    return;
  }

  // Zod validation errors
  if (err instanceof ZodError) {
    res.status(400).json({
      error: { message: 'Validation error', details: err.flatten().fieldErrors },
    });
    return;
  }

  // Prisma errors
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case 'P2002':
        res.status(409).json({ error: { message: 'Resource already exists' } });
        return;
      case 'P2025':
        res.status(404).json({ error: { message: 'Resource not found' } });
        return;
      default:
        res.status(500).json({ error: { message: 'Internal server error' } });
        return;
    }
  }

  // JWT errors
  if (err instanceof TokenExpiredError) {
    res.status(401).json({ error: { message: 'Token expired' } });
    return;
  }
  if (err instanceof JsonWebTokenError) {
    res.status(401).json({ error: { message: 'Invalid token' } });
    return;
  }

  // Multer errors
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      res.status(400).json({ error: { message: 'File too large (max 2MB)' } });
      return;
    }
    res.status(400).json({ error: { message: err.message } });
    return;
  }

  // Unknown errors
  const isDevelopment = env.NODE_ENV === 'development';
  const message = isDevelopment ? err.message : 'Internal server error';
  res.status(500).json({
    error: {
      message,
      ...(isDevelopment && { stack: err.stack }),
    },
  });
}
