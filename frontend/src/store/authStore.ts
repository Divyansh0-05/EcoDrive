import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '../services/api';

interface User {
  id: number;
  name: string;
  email: string;
  avatar_url: string | null;
  bio: string | null;
  city: string | null;
  country: string | null;
  level: number;
  eco_level: string;
  total_xp: number;
  total_trips: number;
  total_distance_km: string;
  total_co2_saved: string;
  global_rank: number | null;
  is_admin: boolean;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, password_confirmation: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (userData: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      login: async (email, password) => {
        const { data } = await api.post('/auth/login', { email, password });
        const { user, token } = data.data;
        localStorage.setItem('ecodrive_token', token);
        set({ user, token, isAuthenticated: true });
      },
      register: async (name, email, password, password_confirmation) => {
        const { data } = await api.post('/auth/register', { name, email, password, password_confirmation });
        const { user, token } = data.data;
        localStorage.setItem('ecodrive_token', token);
        set({ user, token, isAuthenticated: true });
      },
      logout: async () => {
        try {
          await api.post('/auth/logout');
        } catch (e) {
          // Ignore logout error if token expired
        }
        localStorage.removeItem('ecodrive_token');
        set({ user: null, token: null, isAuthenticated: false });
      },
      updateUser: (userData) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null,
        }));
      },
    }),
    {
      name: 'ecodrive-auth-storage',
    }
  )
);
