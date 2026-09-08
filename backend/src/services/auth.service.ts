import prisma from '../config/database';
import { hashPassword, comparePassword } from '../utils/password';
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from '../utils/jwt';
import { registerSchema } from '../utils/validators';
import { AppError } from '../utils/errors';

// ─── Register ────────────────────────────────────────────────────────────────

interface RegisterInput {
  email: string;
  phone: string;
  username: string;
  birthday: string | Date;
  password: string;
}

export async function register(data: RegisterInput) {
  // Validate input
  const parsed = registerSchema.safeParse(data);
  if (!parsed.success) {
    const message = parsed.error.issues.map((e) => e.message).join(', ');
    throw new AppError(message, 400);
  }

  const { email, phone, username, birthday, password } = parsed.data;

  // Check if email already exists
  const existingEmail = await prisma.user.findUnique({ where: { email } });
  if (existingEmail) {
    throw new AppError('An account with this email already exists', 409);
  }

  // Check if username already exists
  const existingUsername = await prisma.user.findUnique({ where: { username } });
  if (existingUsername) {
    throw new AppError('This username is already taken', 409);
  }

  // Hash password
  const passwordHash = await hashPassword(password);

  // Generate 6-digit verification code
  const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
  const verificationExpiry = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

  // Create user
  const user = await prisma.user.create({
    data: {
      email,
      phone,
      username,
      birthday,
      passwordHash,
      verificationCode,
      verificationExpiry,
    },
  });

  return { userId: user.id, email: user.email, verificationCode };
}

// ─── Verify Email ────────────────────────────────────────────────────────────

export async function verifyEmail(email: string, code: string) {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    throw new AppError('User not found', 404);
  }

  if (user.verificationCode !== code) {
    throw new AppError('Invalid verification code', 400);
  }

  if (!user.verificationExpiry || user.verificationExpiry < new Date()) {
    throw new AppError('Verification code has expired', 400);
  }

  await prisma.user.update({
    where: { email },
    data: {
      emailVerified: true,
      verificationCode: null,
      verificationExpiry: null,
    },
  });

  return { message: 'Email verified successfully' };
}

// ─── Resend Verification Code ────────────────────────────────────────────────

export async function resendVerificationCode(email: string) {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    throw new AppError('User not found', 404);
  }

  if (user.emailVerified) {
    throw new AppError('Email is already verified', 400);
  }

  // Generate new 6-digit code
  const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
  const verificationExpiry = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

  await prisma.user.update({
    where: { email },
    data: { verificationCode, verificationExpiry },
  });

  return { email, verificationCode };
}

// ─── Login ───────────────────────────────────────────────────────────────────

export async function login(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    throw new AppError('Invalid credentials', 401);
  }

  const isPasswordValid = await comparePassword(password, user.passwordHash);
  if (!isPasswordValid) {
    throw new AppError('Invalid credentials', 401);
  }

  if (!user.emailVerified) {
    throw new AppError('Email verification required', 403);
  }

  // Generate tokens
  const accessToken = signAccessToken(user.id);
  const refreshToken = signRefreshToken(user.id);

  // Update lastPlayedDate for tracking
  await prisma.user.update({
    where: { id: user.id },
    data: { lastPlayedDate: new Date() },
  });

  return {
    accessToken,
    refreshToken,
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      profilePicture: user.profilePicture,
      currentStreak: user.currentStreak,
      role: user.role,
    },
  };
}

// ─── Refresh Token ───────────────────────────────────────────────────────────

export async function refreshToken(token: string) {
  const payload = verifyRefreshToken(token);

  // Generate new access token
  const accessToken = signAccessToken(payload.userId);

  return { accessToken };
}

// ─── Logout ──────────────────────────────────────────────────────────────────

export async function logout() {
  // JWT is stateless - client removes tokens
  return { message: 'Logged out successfully' };
}
