import nodemailer from 'nodemailer';
import { env } from '../config/env';

const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: parseInt(env.SMTP_PORT, 10),
  secure: parseInt(env.SMTP_PORT, 10) === 465,
  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASS,
  },
});

export async function sendVerificationEmail(to: string, code: string): Promise<void> {
  await transporter.sendMail({
    from: env.SMTP_FROM,
    to,
    subject: 'PumQuiz! - Verifica tu email',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #6366f1;">¡Bienvenido a PumQuiz!</h1>
        <p>Tu código de verificación es:</p>
        <div style="background: #f3f4f6; padding: 20px; text-align: center; border-radius: 8px;">
          <span style="font-size: 32px; font-weight: bold; letter-spacing: 8px;">${code}</span>
        </div>
        <p style="color: #6b7280; margin-top: 16px;">Este código expira en 15 minutos.</p>
      </div>
    `,
  });
}
