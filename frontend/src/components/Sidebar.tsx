import React from 'react';
import { NavLink } from 'react-router-dom';
import { Leaf, LayoutDashboard, Car, Compass, Trophy, Award, Activity, Bot, Settings, Bell, MapPin, LogOut } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export const Sidebar: React.FC = () => {
  const logout = useAuthStore((state) => state.logout);

  const navLinks = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/trips', label: 'Trips', icon: Compass },
    { to: '/analytics', label: 'Analytics', icon: Activity },
    { to: '/vehicles', label: 'Vehicles', icon: Car },
    { to: '/badges', label: 'Rewards', icon: Award },
    { to: '/leaderboard', label: 'Leaderboard', icon: Trophy },
    { to: '/ai-assistant', label: 'AI Assistant', icon: Bot },
    { to: '/route-planner', label: 'Route Planner', icon: MapPin },
    { to: '/challenges', label: 'Challenges', icon: Award },
    { to: '/notifications', label: 'Notifications', icon: Bell },
    { to: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="w-[260px] h-screen bg-card border-r border-border flex flex-col py-6 shrink-0 z-20 transition-colors duration-300">
      
      {/* Brand */}
      <div className="flex items-center gap-3 px-8 mb-8">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-eco-primary">
          <Leaf className="w-6 h-6 fill-current" />
        </div>
        <span className="text-xl font-bold text-foreground tracking-tight">
          EcoDrive
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-4 space-y-1">
        {navLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-eco-light text-eco-primary font-bold shadow-sm'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`
            }
          >
            <link.icon className="w-5 h-5 stroke-[2px]" />
            {link.label}
          </NavLink>
        ))}
      </nav>

      {/* Promotional Card (Drive Green Save Earth) */}
      <div className="px-6 mt-auto pb-4">
        <div className="bg-eco-light rounded-2xl p-5 relative overflow-hidden">
          {/* Abstract illustrations background could go here */}
          <h3 className="text-eco-primary font-bold text-base mb-1 relative z-10">Drive Green<br/>Save Earth</h3>
          <p className="text-[11px] text-eco-dark/70 mb-4 relative z-10 font-medium max-w-[140px]">
            Your small effort can make a big difference.
          </p>
          <button className="bg-eco-primary text-white text-xs font-bold py-2 px-4 rounded-lg relative z-10 hover:bg-eco-dark transition-colors shadow-sm">
            Explore More
          </button>
          
          {/* Mockup Car Illustration SVG */}
          <div className="absolute -bottom-2 -right-4 w-28 h-28 opacity-40 pointer-events-none">
             <svg viewBox="0 0 100 100" className="w-full h-full fill-eco-primary">
               <path d="M80 60 L20 60 C15 60 10 55 10 50 L10 40 C10 35 15 30 20 30 L60 30 L70 40 L80 40 C85 40 90 45 90 50 L90 60 Z" />
               <circle cx="30" cy="65" r="10" className="fill-gray-800" />
               <circle cx="70" cy="65" r="10" className="fill-gray-800" />
             </svg>
          </div>
        </div>
      </div>
      
      {/* Logout Button */}
      <div className="px-6 pb-6 pt-2">
        <button 
          onClick={() => logout()}
          className="flex w-full items-center gap-4 px-4 py-3 rounded-xl text-sm font-bold text-red-500/80 hover:text-red-500 hover:bg-red-500/10 transition-all duration-200"
        >
          <LogOut className="w-5 h-5 stroke-[2px]" />
          Sign Out
        </button>
      </div>

    </div>
  );
};
