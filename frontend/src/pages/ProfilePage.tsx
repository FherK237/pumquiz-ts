import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import StreakBadge from '../components/StreakBadge';
import AddTrivia from '../components/AddTrivia';

export default function ProfilePage() {
  const { user, setUser, logout } = useAuth();

  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [usernameInput, setUsernameInput] = useState(user?.username ?? '');
  const [savingUsername, setSavingUsername] = useState(false);
  const [usernameError, setUsernameError] = useState('');

  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [avatarError, setAvatarError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!user) {
    return (
      <div className="min-h-screen* flex items-center justify-center bg-gray-50"> 
        <p className="text-gray-500">Loading profile...</p>
      </div>
    );
  }

  // Backend serves uploads at /uploads/... and stores paths like "uploads/avatars/x.jpg".
  const avatarUrl = user.profilePicture ? `/${user.profilePicture}` : null;

  const handleSaveUsername = async () => {
    const trimmed = usernameInput.trim();
    if (!trimmed || trimmed === user.username) {
      setIsEditingUsername(false);
      setUsernameInput(user.username);
      return;
    }

    setSavingUsername(true);
    setUsernameError('');
    try {
      const res = await api.patch('/users/me/username', { username: trimmed });
      setUser(res.data.user);
      setUsernameInput(res.data.user.username);
      setIsEditingUsername(false);
    } catch (err: any) {
      setUsernameError(
        err?.response?.data?.message || 'Could not update username'
      );
    } finally {
      setSavingUsername(false);
    }
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingAvatar(true);
    setAvatarError('');
    try {
      const formData = new FormData();
      formData.append('avatar', file);
      const res = await api.patch('/users/me/avatar', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setUser(res.data.user);
    } catch (err: any) {
      setAvatarError(
        err?.response?.data?.message || 'Could not upload avatar'
      );
    } finally {
      setUploadingAvatar(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <div className="bg-gray-50 px-4 py-6 rounded-2xl m-5"> {/*min-h-screen*/}
      <div className="max-w-lg mx-auto">
        <Link
          to="/"
          className="inline-flex items-center text-sm text-gray-600 hover:text-purple-600 mb-3"
        >
          ← Back to Home
        </Link>

        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
          {/* Avatar + identity */}
          <div className="flex flex-col items-center text-center">
            <div className="relative">
              <div className="w-28 h-28 rounded-full overflow-hidden bg-purple-100 flex items-center justify-center ring-4 ring-purple-100">
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt={`${user.username}'s avatar`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-4xl font-bold text-purple-500">
                    {user.username.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploadingAvatar}
              className="mt-3 text-sm font-medium text-purple-600 hover:text-purple-700 disabled:opacity-50"
            >
              {uploadingAvatar ? 'Uploading...' : 'Change photo'}
            </button>
            {avatarError && (
              <p className="mt-1 text-sm text-red-600">{avatarError}</p>
            )}
          </div>

          {/* Username */}
          <div className="mt-4">
            <label className="block text-xs uppercase tracking-wide text-gray-500 mb-1">
              Username
            </label>
            {isEditingUsername ? (
              <div className="flex flex-col gap-2">
                <input
                  type="text"
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  autoFocus
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleSaveUsername}
                    disabled={savingUsername}
                    className="flex-1 sm:flex-none px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg disabled:opacity-50"
                  >
                    {savingUsername ? 'Saving...' : 'Save'}
                  </button>
                  <button
                    onClick={() => {
                      setIsEditingUsername(false);
                      setUsernameInput(user.username);
                      setUsernameError('');
                    }}
                    className="flex-1 sm:flex-none px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                </div>
                {usernameError && (
                  <p className="text-sm text-red-600">{usernameError}</p>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-between gap-3">
                <span className="text-lg font-semibold text-gray-900 break-words min-w-0">
                  {user.username}
                </span>
                <button
                  onClick={() => setIsEditingUsername(true)}
                  className="shrink-0 text-sm font-medium text-purple-600 hover:text-purple-700"
                >
                  Edit
                </button>
              </div>
            )}
          </div>

          {/* Email */}
          <div className="mt-2">
            <label className="block text-xs uppercase tracking-wide text-gray-500 mb-1">
              Email
            </label>
            <span className="block text-gray-800 break-words">{user.email}</span>
          </div>

          {/* Streak */}
          <div className="mt-4 border-t border-gray-100 pt-2">
            <label className="block text-xs uppercase tracking-wide text-gray-500 text-center"> {/*mb-3*/}
              Current Streak
            </label>
            <div className="flex justify-center">
              <StreakBadge streak={user.currentStreak} />
            </div>
          </div>

          {/* Logout */}
          <div className="mt-4 border-t border-gray-100 pt-6">
            <button
              onClick={logout}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-red-200 text-red-600 font-medium hover:bg-red-50 transition-colors cursor-pointer"
            >
              <LogOut size={18} />
              Cerrar Sesión
            </button>
          </div>
        </div>
        <div>
          {user?.role === 'ADMIN' && (
            <AddTrivia/>
          ) }
        </div>
      </div>
    </div>
  );
}
