import { z } from 'zod';

// Password must contain at least one uppercase, one number, one symbol
const passwordSchema = z
  .string()
  .min(8)
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(/[^A-Za-z0-9]/, 'Password must contain at least one symbol');

export const registerSchema = z.object({
  email: z.string().email(),
  phone: z.string(),
  username: z.string().min(3),
  birthday: z.coerce.date(),
  password: passwordSchema,
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const verifyEmailSchema = z.object({
  email: z.string().email(),
  code: z.string().length(6),
});

export const resendCodeSchema = z.object({
  email: z.string().email(),
});

export const refreshTokenSchema = z.object({
  refreshToken: z.string(),
});

export const updateUsernameSchema = z.object({
  username: z.string().min(3),
});

export const submitAttemptSchema = z.object({
  answers: z.array(
    z.object({
      questionId: z.string().uuid(),
      selectedIndex: z.number().nullable().optional(),
      responseTime: z.number(),
    })
  ),
});

export const uploadTriviaSchema = z.object({
  title: z.string(),
  category: z.string(),
  difficulty: z.enum(['EASY', 'MEDIUM', 'HARD']),
  questions: z
    .array(
      z.object({
        question: z.string(),
        options: z.array(z.string()).length(4),
        correctIndex: z.number().min(0).max(3),
        explanation: z.string().optional(),
      })
    )
    .length(10),
});
