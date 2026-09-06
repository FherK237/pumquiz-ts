import { useState } from 'react';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import { authApi } from '../services/auth.service';

export default function VerifyEmailPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = (location.state as { email?: string } | null)?.email;

  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resendMessage, setResendMessage] = useState('');

  if (!email) return <Navigate to="/register" replace />;

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length !== 6) {
      setError('Please enter a 6-digit code');
      return;
    }

    try {
      setError('');
      setIsSubmitting(true);
      await authApi.verifyEmail(email, code);
      navigate('/login', { state: { verified: true } });
    } catch (err: unknown) {
      const message =
        err instanceof Object && 'response' in err
          ? (err as { response?: { data?: { error?: { message?: string } } } }).response?.data?.error?.message
          : undefined;
      setError(message || 'Verification failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResend = async () => {
    try {
      setError('');
      await authApi.resendCode(email);
      setResendMessage('A new code has been sent to your email!');
      setTimeout(() => setResendMessage(''), 4000);
    } catch (err: unknown) {
      const message =
        err instanceof Object && 'response' in err
          ? (err as { response?: { data?: { error?: { message?: string } } } }).response?.data?.error?.message
          : undefined;
      setError(message || 'Failed to resend code. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-purple-600 mb-2">Verifica Tu Email</h1>
          <p className="text-gray-600">
            Enviamos un código de 6 dígitos a{' '}
            <span className="font-semibold text-gray-800">{email}</span>
          </p>
        </div>

        <form onSubmit={handleVerify} className="space-y-5">
          <div>
            <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">
              Código de Verificación
            </label>
            <input
              id="code"
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
              placeholder="000000"
              className="w-full px-4 py-3 text-center text-2xl tracking-[0.5em] border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition"
              autoFocus
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm">
              {error}
            </div>
          )}

          {resendMessage && (
            <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg px-4 py-3 text-sm">
              {resendMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting || code.length !== 6}
            className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-300 text-white font-semibold rounded-lg transition"
          >
            {isSubmitting ? 'Verifying...' : 'Verify Email'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            ¿No recibiste el código?{' '}
            <button
              type="button"
              onClick={handleResend}
              className="text-purple-600 hover:text-purple-700 font-medium hover:underline"
            >
              Reenviar Código
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
