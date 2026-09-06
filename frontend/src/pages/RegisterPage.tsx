import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { RegisterRequest } from '../types/user';
import { Eye, EyeOff } from 'lucide-react';

export default function RegisterPage() {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterRequest>();
  const [serverError, setServerError] = useState('');

  const [showPass, setShowPass] = useState(false);


  const onSubmit = async (data: RegisterRequest) => {
    try {
      setServerError('');
      const result = await registerUser(data);
      navigate('/verify-email', { state: { email: result.email } });
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { error?: { message?: string } } } };
        setServerError(axiosErr.response?.data?.error?.message || 'Registration failed');
      } else {
        setServerError('Registration failed');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-700 to-indigo-900 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center text-purple-700 mb-2">PumQuiz!</h1>
        <p className="text-center text-gray-500 mb-6">Create your account</p>

        {serverError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Enter a valid email address',
                },
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            <input
              id="phone"
              type="tel"
              {...register('phone', {
                required: 'Phone number is required',
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
              placeholder="+1 234 567 8900"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              id="username"
              type="text"
              {...register('username', {
                required: 'Username is required',
                minLength: { value: 3, message: 'Username must be at least 3 characters' },
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
              placeholder="coolquizzer"
            />
            {errors.username && (
              <p className="mt-1 text-sm text-red-600">{errors.username.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="birthday" className="block text-sm font-medium text-gray-700 mb-1">
              Birthday
            </label>
            <input
              id="birthday"
              type="date"
              {...register('birthday', {
                required: 'Birthday is required',
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
            />
            {errors.birthday && (
              <p className="mt-1 text-sm text-red-600">{errors.birthday.message}</p>
            )}
          </div>

          <div className='relative'>
            <input
              id="password"
              type={showPass ? 'text' : 'password'}
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 8, message: 'Password must be at least 8 characters' },
                validate: {
                  hasUppercase: (v) =>
                    /[A-Z]/.test(v) || 'Password must contain at least 1 uppercase letter',
                  hasNumber: (v) =>
                    /\d/.test(v) || 'Password must contain at least 1 number',
                  hasSymbol: (v) =>
                    /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(v) ||
                    'Password must contain at least 1 symbol',
                },
              })}
              // Nota: Se quitó la clase 'pr-11' para que el texto ocupe todo el input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition pr-10"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPass(prev => !prev)}
              className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
            >
              {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>

            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 mt-4 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 focus:ring-4 focus:ring-purple-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{' '}
          <Link to="/login" className="text-purple-600 font-medium hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}