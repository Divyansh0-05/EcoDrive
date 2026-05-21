import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { Leaf, LayoutDashboard, Car, Compass, Trophy, LogOut, Award, Activity, Bot } from 'lucide-react';

export const Sidebar: React.FC = () => {
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const navLinks = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/ai-assistant', label: 'AI Assistant', icon: Bot },
    { to: '/live-telemetry', label: 'Live Drive', icon: Activity },
    { to: '/trips', label: 'Past Trips', icon: Compass },
    { to: '/vehicles', label: 'Vehicles', icon: Car },
    { to: '/leaderboard', label: 'Leaderboard', icon: Trophy },
    { to: '/badges', label: 'Achievements', icon: Award },
  ];

  return (
    <div className="w-[260px] h-screen border-r border-white/5 bg-[#030504]/90 backdrop-blur-md flex flex-col justify-between py-6 px-4 shrink-0 select-none z-20">
      <div className="space-y-8">
        {/* Brand */}
        <div className="flex items-center gap-3 px-2">
          <div className="w-9 h-9 bg-eco-bg border border-eco-glow/20 rounded-xl flex items-center justify-center shadow-glow-green">
            <Leaf className="w-5 h-5 text-eco-glow" />
          </div>
          <span className="text-lg font-extrabold tracking-tight text-white font-sans">
            Eco<span className="text-eco-glow">Drive</span>
          </span>
        </div>

        {/* Navigation */}
        <nav className="space-y-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-eco-glow/10 text-eco-glow border border-eco-glow/20 shadow-glow-green'
                    : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
                }`
              }
            >
              <link.icon className="w-4 h-4" />
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* User Info / Logout */}
      <div className="space-y-4 pt-4 border-t border-white/5">
        <div className="flex items-center gap-3 px-2">
          <div className="w-9 h-9 rounded-xl bg-eco-bg border border-white/10 flex items-center justify-center text-sm font-bold text-eco-glow">
            {user?.name?.[0]?.toUpperCase() || 'U'}
          </div>
          <div className="flex flex-col truncate">
            <span className="text-xs font-semibold text-white leading-none truncate">{user?.name}</span>
            <span className="text-[10px] text-eco-glow mt-0.5 uppercase tracking-wider">{user?.eco_level || 'Beginner'}</span>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-500 hover:text-red-400 hover:bg-red-500/5 border border-transparent hover:border-red-500/10 transition-all duration-200"
        >
          <LogOut className="w-4 h-4" />
          Disconnect
        </button>
      </div>
    </div>
  );
};
