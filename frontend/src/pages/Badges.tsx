import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Award, Lock, CheckCircle2 } from 'lucide-react';

interface Badge {
  id: number;
  name: string;
  slug: string;
  description: string;
  icon_emoji: string;
  category: string;
  rarity: string;
  xp_reward: number;
}

export const Badges: React.FC = () => {
  const [allBadges, setAllBadges] = useState<Badge[]>([]);
  const [myBadges, setMyBadges] = useState<Badge[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get('/badges'),
      api.get('/badges/mine')
    ]).then(([allRes, mineRes]) => {
      setAllBadges(allRes.data.data);
      setMyBadges(mineRes.data.data);
    }).catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex-1 min-h-screen flex items-center justify-center bg-background">
        <div className="w-12 h-12 border-2 border-eco-glow/20 border-t-eco-glow rounded-full animate-spin" />
      </div>
    );
  }

  const isUnlocked = (badgeId: number) => {
    return myBadges.some(b => b.id === badgeId);
  };

  return (
    <div className="flex-1 min-h-screen bg-background p-8 overflow-y-auto font-sans relative select-none">
      <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-eco-glow/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold tracking-tight text-foreground flex items-center gap-2">
          <Award className="w-6 h-6 text-eco-glow" />
          Achievements
        </h1>
        <p className="text-muted-foreground text-sm mt-1">Unlock badges to rank up and earn bonus XP multipliers.</p>
      </div>

      {/* Grid of Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {allBadges.map((badge) => {
          const unlocked = isUnlocked(badge.id);
          return (
            <div key={badge.id} className={`glass-card rounded-2xl p-5 border flex flex-col justify-between h-[180px] relative transition-all ${
              unlocked ? 'border-eco-glow/20 shadow-glow-green bg-eco-bg/10' : 'border-border opacity-55'
            }`}>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-4xl">{badge.icon_emoji}</div>
                  <div>
                    <span className="text-sm font-extrabold text-foreground block">{badge.name}</span>
                    <span className="text-[10px] text-eco-glow uppercase tracking-wider font-bold block mt-0.5">{badge.category} • {badge.rarity}</span>
                  </div>
                </div>
                {unlocked ? (
                  <CheckCircle2 className="w-4 h-4 text-[#10b981]" />
                ) : (
                  <Lock className="w-3.5 h-3.5 text-muted-foreground" />
                )}
              </div>

              <div className="mt-3">
                <p className="text-xs text-muted-foreground leading-normal">{badge.description}</p>
              </div>

              <div className="flex justify-between items-center mt-4 border-t border-border pt-3">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Reward</span>
                <span className="text-xs font-extrabold text-foreground">+{badge.xp_reward} XP</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
