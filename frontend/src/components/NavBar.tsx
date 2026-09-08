import { Link, NavLink } from 'react-router-dom';
import { Home, Trophy, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const navItems = [
  { to: '/', label: 'Home', icon: Home, end: true },
  { to: '/leaderboard', label: 'Leaderboard', icon: Trophy, end: false },
  { to: '/profile', label: 'Profile', icon: User, end: false },
];

export function NavBar() {
  const { user } = useAuth();

  // Desktop top bar links
  const topLinkClass = ({ isActive }: { isActive: boolean }) =>
    `inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
      isActive
        ? 'bg-purple-700 text-white'
        : 'text-purple-100 hover:bg-purple-500 hover:text-white'
    }`;

  // // Mobile bottom tab links
  // const tabClass = ({ isActive }: { isActive: boolean }) =>
  //   `flex flex-1 flex-col items-center justify-center gap-1 py-2 text-xs font-medium transition-colors ${
  //     isActive ? 'text-purple-600' : 'text-gray-700 hover:text-purple-400'
  //   }`;

  // Desktop top bar links
  const tabClass = ({ isActive }: { isActive: boolean }) =>
    `flex flex-1 flex-col items-center justify-center gap-1 py-2 text-xs font-medium rounded-lg transition-colors ${
      isActive
        ? 'bg-purple-700 text-white'
        : 'text-purple-500 hover:bg-purple-500 hover:text-white'
    }`;

  return (
    <>
      {/* Desktop / tablet top bar */}
      <nav className="m-3 hidden md:block bg-purple-600 shadow-md rounded-2xl">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between gap-4 h-16">
            {/* Brand */}
            <Link to="/" className="text-2xl font-bold text-white shrink-0">
              PumQuiz!
            </Link>

            {/* Nav links */}
            <div className="flex items-center gap-2">
              {navItems.map(({ to, label, icon: Icon, end }) => (
                <NavLink key={to} to={to} end={end} className={topLinkClass}>
                  <Icon size={18} />
                  <span>{label}</span>
                </NavLink>
              ))}
            </div>

            {/* Username */}
            <div className="flex items-center shrink-0">
              {user && (
                <h1 className='text-sm text-purple-200' >Bienvenido
                <span className="text-sm font-bold text-white"> {user.username}</span>
                !</h1>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile bottom tab bar */}
      {/* <nav className="m-3 md:hidden fixed bottom-0 left-0 right-0 z-50 bg-purple-100 border-t border-gray-200 shadow-[0_-1px_8px_rgba(0,0,0,0.06)] pb-[env(safe-area-inset-bottom)] rounded-2xl">
        <div className="flex items-stretch">
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink key={to} to={to} end={end} className={tabClass}>
              <Icon size={22} />
              <span>{label}</span>
            </NavLink>
          ))}
        </div>
      </nav> */}

      <nav className="px-2 m-4 md:hidden fixed left-0 right-0 z-50 bg-purple-400/30 border-t border-gray-200 shadow-[0_-1px_8px_rgba(0,0,0,0.06)] pb-[env(safe-area-inset-bottom)] rounded-2xl backdrop-blur-sm">
        <div className="flex items-center justify-between gap-4 h-16">
            <Link to="/" className="text-2xl font-bold text-purple-500 shrink-0">
              PumQuiz!
            </Link>
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink key={to} to={to} end={end} className={tabClass}>
              <Icon size={22} />
              <span>{label}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </>
  );
}
