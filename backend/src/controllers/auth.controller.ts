import { Request, Response, NextFunction } from 'express';
import * as authService from '../services/auth.service';
import { sendVerificationEmail } from '../services/email.service';
import { AppError } from '../utils/errors';

export async function registerHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await authService.register(req.body);
    await sendVerificationEmail(result.email, result.verificationCode);
    res.status(201).json({ message: 'Registration successful. Please verify your email.', userId: result.userId });
  } catch (err) {
    next(err);
  }
}

export async function verifyEmailHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await authService.verifyEmail(req.body.email, req.body.code);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

export async function resendCodeHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await authService.resendVerificationCode(req.body.email);
    await sendVerificationEmail(result.email, result.verificationCode);
    res.status(200).json({ message: 'Verification code resent successfully.' });
  } catch (err) {
    next(err);
  }
}

export async function loginHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await authService.login(req.body.email, req.body.password);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

export async function refreshHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await authService.refreshToken(req.body.refreshToken);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

export async function logoutHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await authService.logout();
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}
