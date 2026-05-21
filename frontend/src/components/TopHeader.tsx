import React from 'react';
import { Search, Sun, Moon, Bell } from 'lucide-react';
import { useThemeStore } from '../store/themeStore';
import { useAuthStore } from '../store/authStore';

export const TopHeader: React.FC = () => {
  const { theme, toggleTheme } = useThemeStore();
  const user = useAuthStore((state) => state.user);

  return (
    <div className="h-20 border-b border-border bg-card/50 backdrop-blur-sm flex items-center justify-between px-8 sticky top-0 z-10 transition-colors duration-300">
      
      {/* Search Bar */}
      <div className="relative w-full max-w-md hidden md:block">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2.5 border border-border rounded-full bg-muted text-sm placeholder-gray-400 focus:outline-none focus:bg-card focus:ring-1 focus:ring-eco-glow transition-all duration-200"
          placeholder="Search trips, analytics, reports..."
        />
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-6 ml-auto">
        
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-muted text-gray-500 hover:text-foreground transition-colors"
          aria-label="Toggle Theme"
        >
          {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5 text-yellow-400" />}
        </button>

        {/* Notifications */}
        <button className="p-2 rounded-full hover:bg-muted text-gray-500 hover:text-foreground transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-eco-primary rounded-full border-2 border-card"></span>
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-3 pl-4 border-l border-border">
          <div className="w-10 h-10 rounded-full bg-eco-light border border-eco-glow/20 flex items-center justify-center text-eco-primary font-bold overflow-hidden shadow-sm">
            {user?.name?.[0]?.toUpperCase() || 'U'}
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-bold text-foreground leading-tight">
              Hello, {user?.name?.split(' ')[0] || 'Driver'}
            </p>
            <p className="text-[11px] font-medium text-eco-primary mt-0.5">
              Eco Driver
            </p>
          </div>
        </div>
        
      </div>
    </div>
  );
};
