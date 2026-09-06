import jwt from 'jsonwebtoken';
import type { StringValue } from 'ms';
import { env } from '../config/env';

export interface TokenPayload {
  userId: string;
  iat: number;
  exp: number;
}

export function signAccessToken(userId: string): string {
  const payload = { userId };
  const options: jwt.SignOptions = { expiresIn: env.JWT_ACCESS_EXPIRY as StringValue };
  return jwt.sign(payload, env.JWT_ACCESS_SECRET, options);
}

export function signRefreshToken(userId: string): string {
  const payload = { userId };
  const options: jwt.SignOptions = { expiresIn: env.JWT_REFRESH_EXPIRY as StringValue };
  return jwt.sign(payload, env.JWT_REFRESH_SECRET, options);
}

export function verifyAccessToken(token: string): TokenPayload {
  return jwt.verify(token, env.JWT_ACCESS_SECRET) as TokenPayload;
}

export function verifyRefreshToken(token: string): TokenPayload {
  return jwt.verify(token, env.JWT_REFRESH_SECRET) as TokenPayload;
}
