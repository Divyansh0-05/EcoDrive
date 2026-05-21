import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { formatCO2 } from '../utils/ecoScore';
import { Trophy, Star } from 'lucide-react';

interface LeaderboardUser {
  id: number;
  name: string;
  avatar: string | null;
  level: number;
  eco_level: string;
  total_xp: number;
  total_co2_saved: string;
  rank: number;
}

export const Leaderboard: React.FC = () => {
  const [users, setUsers] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/leaderboard')
      .then(res => setUsers(res.data.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex-1 min-h-screen flex items-center justify-center bg-background">
        <div className="w-12 h-12 border-2 border-eco-glow/20 border-t-eco-glow rounded-full animate-spin" />
      </div>
    );
  }

  // Get podium users (Top 3)
  const podium = users.slice(0, 3);
  const remaining = users.slice(3);

  return (
    <div className="flex-1 min-h-screen bg-background p-8 overflow-y-auto font-sans relative select-none">
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-eco-glow/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-2xl font-extrabold tracking-tight text-foreground flex items-center gap-2">
          <Trophy className="w-6 h-6 text-eco-glow animate-bounce" />
          Global Standings
        </h1>
        <p className="text-muted-foreground text-sm mt-1">Driver XP rank leaderboards updated globally.</p>
      </div>

      {/* Podium View (Top 3) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 max-w-[900px] mx-auto items-end">
        {/* 2nd Place */}
        {podium[1] && (
          <div className="glass-card rounded-2xl p-6 flex flex-col items-center relative border-border order-2 md:order-1 h-[220px] justify-center">
            <div className="absolute -top-5 w-10 h-10 rounded-full bg-slate-500/20 border border-slate-500/40 flex items-center justify-center text-slate-400 font-bold">2</div>
            <div className="w-14 h-14 rounded-full bg-eco-bg border border-border flex items-center justify-center text-lg font-bold text-foreground mb-3">
              {podium[1].name[0]}
            </div>
            <span className="text-sm font-extrabold text-foreground text-center truncate w-full">{podium[1].name}</span>
            <span className="text-[10px] text-eco-glow uppercase tracking-wider font-semibold mt-1">Level {podium[1].level}</span>
            <span className="text-xs font-bold text-muted-foreground mt-2">{podium[1].total_xp} XP</span>
          </div>
        )}

        {/* 1st Place */}
        {podium[0] && (
          <div className="glass-card rounded-2xl p-8 flex flex-col items-center relative border-eco-glow/20 shadow-glow-green-lg order-1 md:order-2 h-[260px] justify-center bg-eco-bg/25">
            <div className="absolute -top-6 w-12 h-12 rounded-full bg-eco-glow/20 border border-eco-glow/40 flex items-center justify-center text-eco-glow font-bold animate-pulse">
              <Star className="w-5 h-5 fill-eco-glow text-eco-glow" />
            </div>
            <div className="w-16 h-16 rounded-full bg-eco-bg border border-eco-glow/30 flex items-center justify-center text-xl font-bold text-foreground mb-3 shadow-glow-green">
              {podium[0].name[0]}
            </div>
            <span className="text-base font-extrabold text-foreground text-center truncate w-full">{podium[0].name}</span>
            <span className="text-xs text-eco-glow uppercase tracking-wider font-extrabold mt-1">Level {podium[0].level}</span>
            <span className="text-sm font-black text-foreground mt-2">{podium[0].total_xp} XP</span>
          </div>
        )}

        {/* 3rd Place */}
        {podium[2] && (
          <div className="glass-card rounded-2xl p-6 flex flex-col items-center relative border-border order-3 h-[200px] justify-center">
            <div className="absolute -top-5 w-10 h-10 rounded-full bg-amber-700/20 border border-amber-700/40 flex items-center justify-center text-amber-600 font-bold">3</div>
            <div className="w-14 h-14 rounded-full bg-eco-bg border border-border flex items-center justify-center text-lg font-bold text-foreground mb-3">
              {podium[2].name[0]}
            </div>
            <span className="text-sm font-extrabold text-foreground text-center truncate w-full">{podium[2].name}</span>
            <span className="text-[10px] text-eco-glow uppercase tracking-wider font-semibold mt-1">Level {podium[2].level}</span>
            <span className="text-xs font-bold text-muted-foreground mt-2">{podium[2].total_xp} XP</span>
          </div>
        )}
      </div>

      {/* Main Leaderboard Table */}
      <div className="glass-card rounded-2xl overflow-hidden max-w-[900px] mx-auto">
        <div className="px-6 py-4 border-b border-border flex items-center justify-between text-xs font-bold text-muted-foreground uppercase tracking-widest bg-muted">
          <span>Rank & Driver</span>
          <div className="flex gap-16 pr-4">
            <span>CO2 Saved</span>
            <span>XP Score</span>
          </div>
        </div>

        <div className="divide-y divide-white/5">
          {remaining.map((user) => (
            <div key={user.id} className="px-6 py-4 flex items-center justify-between hover:bg-white/[0.01] transition-colors">
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold text-muted-foreground w-6 text-center">{user.rank}</span>
                <div className="w-9 h-9 rounded-xl bg-card border border-border flex items-center justify-center text-xs font-bold text-foreground">
                  {user.name[0]}
                </div>
                <div>
                  <span className="text-sm font-bold text-foreground block">{user.name}</span>
                  <span className="text-[10px] text-muted-foreground font-medium uppercase mt-0.5 block">Level {user.level} • {user.eco_level}</span>
                </div>
              </div>

              <div className="flex gap-16 items-center pr-4">
                <span className="text-xs font-semibold text-muted-foreground w-20 text-right">
                  {formatCO2(user.total_co2_saved)}
                </span>
                <span className="text-sm font-extrabold text-eco-glow w-16 text-right">
                  {user.total_xp}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
