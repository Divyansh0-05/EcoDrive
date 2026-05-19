import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { formatCO2, formatDistance, getScoreColor } from '../utils/ecoScore';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
import { Shield, Sparkles, Navigation, Gauge, Zap } from 'lucide-react';

interface DashboardData {
  user: {
    name: string;
    level: number;
    total_xp: number;
    total_trips: number;
    total_distance_km: string;
    total_co2_saved: string;
  };
  recentTrips: any[];
  weeklyChart: any[];
  recentBadges: any[];
}

export const Dashboard: React.FC = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/dashboard')
      .then(res => {
        setData(res.data.data);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading || !data) {
    return (
      <div className="flex-1 min-h-screen flex items-center justify-center bg-background">
        <div className="relative flex items-center justify-center">
          <div className="w-12 h-12 border-2 border-eco-glow/20 border-t-eco-glow rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  // Calculate average eco score
  const avgEcoScore = data.recentTrips.length > 0
    ? (data.recentTrips.reduce((acc, t) => acc + parseFloat(t.eco_score), 0) / data.recentTrips.length).toFixed(0)
    : '85';

  const getInsights = () => {
    const insights = [];
    
    if (data.recentTrips.length === 0) {
      insights.push({
        type: 'info',
        title: 'Start Logging Drives',
        desc: 'Log your first trip using the Telemetry page to generate driving efficiency reports and personalized eco-tips.'
      });
      return insights;
    }

    const totalBrakes = data.recentTrips.reduce((acc, t) => acc + (t.hard_braking_count || 0), 0);
    const totalAcc = data.recentTrips.reduce((acc, t) => acc + (t.hard_acceleration_count || 0), 0);
    const totalIdle = data.recentTrips.reduce((acc, t) => acc + (t.idle_time_seconds || 0), 0);
    const avgScoreVal = parseInt(avgEcoScore);

    if (avgScoreVal >= 90) {
      insights.push({
        type: 'success',
        title: 'Excellent Eco Habits',
        desc: 'Your average eco score is outstanding! You are optimizing your fuel range and saving significant CO2.'
      });
    } else if (avgScoreVal >= 70) {
      insights.push({
        type: 'warning',
        title: 'Good Progress, Room to Optimize',
        desc: 'You are driving relatively green. Minor adjustments to speed consistency could push you into the Eco Master tier.'
      });
    } else {
      insights.push({
        type: 'danger',
        title: 'Efficiency Warning',
        desc: 'Your average eco score is low. Try keeping speed changes gradual and reduce stop-and-go movements.'
      });
    }

    if (totalBrakes > data.recentTrips.length * 1.5) {
      insights.push({
        type: 'danger',
        title: 'Frequent Hard Braking Detected',
        desc: `You logged ${totalBrakes} hard braking events. Try scanning the road 10-15 seconds ahead to glide to a stop and save brake wear.`
      });
    } else {
      insights.push({
        type: 'success',
        title: 'Smooth Deceleration',
        desc: 'Great job maintaining space and coasting to stops, which avoids friction energy losses.'
      });
    }

    if (totalAcc > data.recentTrips.length * 1.5) {
      insights.push({
        type: 'danger',
        title: 'Rapid Acceleration Events',
        desc: `You logged ${totalAcc} hard acceleration events. Pressing the pedal smoothly can improve fuel economy by up to 15%.`
      });
    } else {
      insights.push({
        type: 'success',
        title: 'Gentle Throttle Control',
        desc: 'You are maintaining a light foot on the gas. This is excellent for keeping fuel consumption low.'
      });
    }

    if (totalIdle > data.recentTrips.length * 120) {
      insights.push({
        type: 'warning',
        title: 'High Idle Times',
        desc: `You spent ${Math.round(totalIdle / 60)} minutes idling. Turn off the engine if stopped for more than 10 seconds (unless in active traffic).`
      });
    }

    return insights;
  };

  const scoreDetails = getScoreColor(parseInt(avgEcoScore));

  return (
    <div className="flex-1 min-h-screen bg-background p-8 overflow-y-auto font-sans relative">
      {/* Background ambient glows */}
      <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-eco-glow/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-white">Telemetry Control</h1>
          <p className="text-gray-400 text-sm mt-1">Real-time driver efficiency analytics and CO2 telemetry.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-eco-bg border border-eco-glow/20 rounded-xl flex items-center gap-2 shadow-glow-green">
            <Zap className="w-4 h-4 text-eco-glow animate-pulse" />
            <span className="text-xs font-bold text-white tracking-wider uppercase">Level {data.user.level}</span>
          </div>
        </div>
      </div>

      {/* Grid: Main Telemetry Indicator & Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        
        {/* Core Eco-Score Telemetry (Tesla Steering-wheel Telemetry Vibe) */}
        <div className="glass-card rounded-2xl p-6 flex flex-col items-center justify-center relative overflow-hidden group">
          <div className="absolute top-4 left-4 flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-gray-500 font-bold">
            <Gauge className="w-3.5 h-3.5" />
            Avg Efficiency
          </div>

          <div className="relative w-40 h-40 flex items-center justify-center mt-4">
            {/* Glow ring */}
            <div className={`absolute inset-0 rounded-full border-4 border-white/5 flex items-center justify-center`}>
              <div className={`w-32 h-32 rounded-full border-4 ${scoreDetails.border} shadow-glow-green`} />
            </div>
            {/* Score */}
            <div className="flex flex-col items-center z-10">
              <span className="text-5xl font-black text-white tracking-tighter">{avgEcoScore}</span>
              <span className={`text-[10px] font-extrabold mt-1 tracking-wider uppercase ${scoreDetails.text}`}>
                {scoreDetails.label}
              </span>
            </div>
          </div>

          <div className="w-full grid grid-cols-2 gap-4 mt-6 border-t border-white/5 pt-4 text-center">
            <div>
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block">Total XP</span>
              <span className="text-sm font-extrabold text-white mt-1 block">{data.user.total_xp}</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block">Trips Tracked</span>
              <span className="text-sm font-extrabold text-white mt-1 block">{data.user.total_trips}</span>
            </div>
          </div>
        </div>

        {/* Real-time Telemetry Trend Chart */}
        <div className="lg:col-span-2 glass-card rounded-2xl p-6 flex flex-col justify-between min-h-[260px]">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xs font-extrabold text-gray-400 uppercase tracking-wider">Weekly Drive Performance</span>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-eco-glow block" />
              <span className="text-[10px] text-gray-500 font-semibold uppercase">Eco Score</span>
            </div>
          </div>
          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.weeklyChart} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorEco" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#4b5563" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis domain={[0, 100]} stroke="#4b5563" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{ background: '#090d0b', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px' }}
                  labelStyle={{ color: '#fff', fontSize: '11px', fontWeight: 'bold' }}
                  itemStyle={{ color: '#10b981', fontSize: '11px' }}
                />
                <Area type="monotone" dataKey="score" stroke="#10B981" strokeWidth={2} fillOpacity={1} fill="url(#colorEco)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bottom Grid: Stats, Recent Trips & Badges */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Core Stats Overview */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* AI Driving Insights & Recommendations */}
          <div className="glass-card rounded-2xl p-6">
            <span className="text-xs font-extrabold text-gray-400 uppercase tracking-wider block mb-4">Driving Insights & Recommendations</span>
            <div className="space-y-3">
              {getInsights().map((insight, idx) => (
                <div key={idx} className="flex gap-3 p-3.5 bg-white/[0.02] border border-white/5 rounded-xl">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-xs font-extrabold ${
                    insight.type === 'success' ? 'bg-emerald-500/10 text-emerald-400' :
                    insight.type === 'warning' ? 'bg-amber-500/10 text-amber-400' :
                    insight.type === 'danger' ? 'bg-rose-500/10 text-rose-400' :
                    'bg-blue-500/10 text-blue-400'
                  }`}>
                    {insight.type === 'success' ? '✓' : '!'}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">{insight.title}</span>
                    <span className="text-[11px] text-gray-400 mt-1 block leading-relaxed">{insight.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Quick Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="glass-card rounded-2xl p-5 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block">Total Carbon Offset</span>
                <span className="text-2xl font-extrabold text-white mt-1.5 block">
                  {formatCO2(data.user.total_co2_saved)}
                </span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-eco-bg border border-eco-glow/10 flex items-center justify-center text-eco-glow">
                <Sparkles className="w-5 h-5" />
              </div>
            </div>

            <div className="glass-card rounded-2xl p-5 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block">Distance Covered</span>
                <span className="text-2xl font-extrabold text-white mt-1.5 block">
                  {formatDistance(data.user.total_distance_km)}
                </span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-eco-bg border border-white/5 flex items-center justify-center text-gray-400">
                <Navigation className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Recent Telemetry Logs */}
          <div className="glass-card rounded-2xl p-6">
            <span className="text-xs font-extrabold text-gray-400 uppercase tracking-wider block mb-4">Recent Drives</span>
            <div className="space-y-4">
              {data.recentTrips.map((trip) => (
                <div key={trip.id} className="flex items-center justify-between p-3.5 bg-black/20 border border-white/5 rounded-xl">
                  <div>
                    <span className="text-xs font-bold text-white block">{trip.title || 'Commute Drive'}</span>
                    <span className="text-[10px] text-gray-500 mt-1 block">
                      {formatDistance(trip.distance_km)} • {trip.duration_minutes} mins
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold text-gray-400">-{parseFloat(trip.co2_saved_vs_avg_kg).toFixed(1)}kg CO2</span>
                    <div className={`px-2.5 py-1.5 rounded-lg text-xs font-bold ${getScoreColor(parseInt(trip.eco_score)).bg} ${getScoreColor(parseInt(trip.eco_score)).text} border ${getScoreColor(parseInt(trip.eco_score)).border}`}>
                      {parseInt(trip.eco_score)}
                    </div>
                  </div>
                </div>
              ))}
              {data.recentTrips.length === 0 && (
                <span className="text-xs text-gray-500 text-center block py-4">No recent drive logs recorded.</span>
              )}
            </div>
          </div>
        </div>

        {/* Gamified Achievements Sidebar */}
        <div className="glass-card rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <span className="text-xs font-extrabold text-gray-400 uppercase tracking-wider block mb-4">Unlocked Badges</span>
            <div className="space-y-4">
              {data.recentBadges.map((badge) => (
                <div key={badge.id} className="flex items-center gap-3.5 p-3 bg-black/10 border border-white/5 rounded-xl">
                  <div className="text-2xl">{badge.icon_emoji}</div>
                  <div>
                    <span className="text-xs font-bold text-white block">{badge.name}</span>
                    <span className="text-[10px] text-gray-500 mt-0.5 block">{badge.description}</span>
                  </div>
                </div>
              ))}
              {data.recentBadges.length === 0 && (
                <div className="flex flex-col items-center justify-center py-10 border border-dashed border-white/5 rounded-xl">
                  <Shield className="w-8 h-8 text-gray-600 mb-2" />
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">No badges unlocked</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
