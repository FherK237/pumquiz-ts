import { env } from '../config/env';

const BREVO_API_URL = 'https://api.brevo.com/v3/smtp/email';

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
 * Sends the verification email through the Brevo HTTP API (v3).
 * Uses HTTPS (port 443), which is allowed on hosts like Render that block SMTP.
 * If sending fails, the error is logged but NOT thrown, so registration can
 * still proceed and the user can request a new code via /resend-code.
 */
export async function sendVerificationEmail(to: string, code: string): Promise<void> {
  if (!env.BREVO_API_KEY) {
    console.warn('⚠️  BREVO_API_KEY not set — skipping email send. Verification code:', code);
    return;
  }

  try {
    const response = await fetch(BREVO_API_URL, {
      method: 'POST',
      headers: {
        'api-key': env.BREVO_API_KEY,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        sender: { name: env.EMAIL_FROM_NAME, email: env.EMAIL_FROM_ADDRESS },
        to: [{ email: to }],
        subject: 'PumQuiz! - Verifica tu email',
        htmlContent: buildHtml(code),
      }),
    });

    if (!response.ok) {
      const body = await response.text();
      console.error(`❌ Brevo email failed (${response.status}):`, body);
    }
  } catch (err) {
    console.error('❌ Error sending verification email via Brevo:', err);
  }
}
