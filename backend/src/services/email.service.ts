import { Resend } from 'resend';
import { env } from '../config/env';

const resend = new Resend(env.RESEND_API_KEY);

const buildHtml = (code: string): string => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <h1 style="color: #6366f1;">¡Bienvenido a PumQuiz!</h1>
    <p>Tu código de verificación es:</p>
    <div style="background: #f3f4f6; padding: 20px; text-align: center; border-radius: 8px;">
      <span style="font-size: 32px; font-weight: bold; letter-spacing: 8px;">${code}</span>
    </div>
    <p style="color: #6b7280; margin-top: 16px;">Este código expira en 15 minutos.</p>
  </div>
`;

/**
 * Sends the verification email through the Resend HTTP API.
 * Uses HTTPS (port 443), which is allowed on hosts like Render that block SMTP.
 * If sending fails, the error is logged but NOT thrown, so registration can
 * still proceed and the user can request a new code via /resend-code.
 */
export async function sendVerificationEmail(to: string, code: string): Promise<void> {
  if (!env.RESEND_API_KEY) {
    console.warn('⚠️  RESEND_API_KEY not set — skipping email send. Verification code:', code);
    return;
  }

  try {
    const { error } = await resend.emails.send({
      from: env.EMAIL_FROM,
      to,
      subject: 'PumQuiz! - Verifica tu email',
      html: buildHtml(code),
    });

    if (error) {
      console.error('❌ Failed to send verification email:', error);
    }
  } catch (err) {
    console.error('❌ Error sending verification email:', err);
  }
}
