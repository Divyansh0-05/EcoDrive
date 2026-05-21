import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { formatDistance, getScoreColor } from '../utils/ecoScore';
import { Compass, Navigation, Plus, Loader2 } from 'lucide-react';

interface Trip {
  id: number;
  title: string;
  distance_km: string;
  duration_minutes: number;
  avg_speed_kmh: string;
  hard_braking_count: number;
  hard_acceleration_count: number;
  idle_time_seconds: number;
  eco_score: string;
  co2_saved_vs_avg_kg: string;
  started_at: string;
}

export const Trips: React.FC = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [showLogModal, setShowLogModal] = useState(false);

  // Form states
  const [title, setTitle] = useState('');
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const fetchTrips = () => {
    setLoading(true);
    api.get('/trips')
      .then(res => setTrips(res.data.data.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  const handleLogTrip = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const dist = parseFloat(distance);
      const mins = parseInt(duration);
      
      // Auto-calculate Avg Speed (km/h)
      const computedAvgSpeed = mins > 0 ? Math.round((dist / (mins / 60)) * 10) / 10 : 0;
      
      // Auto-simulate braking & accelerating events based on distance
      const computedHardAcc = Math.floor(Math.random() * (dist / 4 + 1));
      const computedHardBraking = Math.floor(Math.random() * (dist / 4 + 1));
      
      // Auto-simulate idle traffic time (roughly 10% of drive time)
      const computedIdleTime = Math.floor(Math.random() * (mins * 6));

      await api.post('/trips', {
        title: title || 'Commute Drive',
        distance_km: dist,
        duration_minutes: mins,
        avg_speed_kmh: computedAvgSpeed,
        hard_braking_count: computedHardBraking,
        hard_acceleration_count: computedHardAcc,
        idle_time_seconds: computedIdleTime,
        started_at: new Date().toISOString(),
      });
      setShowLogModal(false);
      // Reset form
      setTitle('');
      setDistance('');
      setDuration('');
      fetchTrips();
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex-1 min-h-screen bg-background p-8 overflow-y-auto font-sans relative">
      <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-eco-glow/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-foreground flex items-center gap-2">
            <Compass className="w-6 h-6 text-eco-glow" />
            Telemetry Logs
          </h1>
          <p className="text-muted-foreground text-sm mt-1">Detailed breakdown of individual drive diagnostics.</p>
        </div>
        <button
          onClick={() => setShowLogModal(true)}
          className="bg-eco-glow hover:bg-eco-glow/90 text-black font-bold py-2.5 px-4 rounded-xl text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-glow-green"
        >
          <Plus className="w-4 h-4" />
          Simulate Trip
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="w-12 h-12 border-2 border-eco-glow/20 border-t-eco-glow rounded-full animate-spin" />
        </div>
      ) : (
        <div className="glass-card rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-border flex items-center justify-between text-xs font-bold text-muted-foreground uppercase tracking-widest bg-muted">
            <span>Drive Summary</span>
            <div className="flex gap-20 pr-4">
              <span>Diagnostics</span>
              <span>Efficiency</span>
            </div>
          </div>

          <div className="divide-y divide-white/5">
            {trips.map((trip) => {
              const score = parseInt(trip.eco_score);
              const scoreDetails = getScoreColor(score);
              return (
                <div key={trip.id} className="px-6 py-4 flex items-center justify-between hover:bg-white/[0.01] transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-card border border-border flex items-center justify-center text-muted-foreground">
                      <Navigation className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-sm font-bold text-foreground block">{trip.title}</span>
                      <span className="text-[10px] text-muted-foreground font-medium uppercase mt-1 block">
                        {formatDistance(trip.distance_km)} • {trip.duration_minutes} minutes
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-20 items-center pr-4">
                    <div className="text-right text-[10px] font-bold text-muted-foreground space-y-0.5 uppercase tracking-wider">
                      <div>Accel Events: {trip.hard_acceleration_count}</div>
                      <div>Brake Events: {trip.hard_braking_count}</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <span className="text-xs font-semibold text-[#10b981] block">-{parseFloat(trip.co2_saved_vs_avg_kg).toFixed(1)}kg CO2</span>
                        <span className="text-[9px] text-muted-foreground block uppercase tracking-widest mt-0.5">Offset</span>
                      </div>
                      <div className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center font-black ${scoreDetails.bg} ${scoreDetails.text} border ${scoreDetails.border}`}>
                        <span className="text-sm">{score}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            {trips.length === 0 && (
              <span className="text-xs text-muted-foreground text-center block py-10">No drive telemetries found. Start simulating drives to generate score profiles!</span>
            )}
          </div>
        </div>
      )}

      {/* Log Modal */}
      {showLogModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-[450px] glass-card rounded-2xl p-6 border border-border relative flex flex-col">
            <h2 className="text-lg font-bold text-foreground mb-1">Simulate Trip Telemetry</h2>
            <p className="text-xs text-muted-foreground mb-6">Enter basic trip parameters. Advanced telemetry data will be calculated automatically.</p>

            <form onSubmit={handleLogTrip} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Route Nickname</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Office Commute"
                  className="w-full bg-card border border-border rounded-xl py-2.5 px-3 text-sm text-foreground focus:outline-none focus:border-eco-glow/40 focus:ring-1 focus:ring-eco-glow/40"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Distance (km)</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    placeholder="e.g. 15.2"
                    className="w-full bg-card border border-border rounded-xl py-2.5 px-3 text-sm text-foreground focus:outline-none focus:border-eco-glow/40 focus:ring-1 focus:ring-eco-glow/40"
                    value={distance}
                    onChange={(e) => setDistance(e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Duration (mins)</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 30"
                    className="w-full bg-card border border-border rounded-xl py-2.5 px-3 text-sm text-foreground focus:outline-none focus:border-eco-glow/40 focus:ring-1 focus:ring-eco-glow/40"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex gap-3 justify-end pt-4 border-t border-border">
                <button
                  type="button"
                  onClick={() => setShowLogModal(false)}
                  className="px-4 py-2 border border-border hover:bg-card rounded-xl text-xs font-bold uppercase text-muted-foreground tracking-wider transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2 bg-eco-glow hover:bg-eco-glow/90 disabled:opacity-50 text-black font-bold rounded-xl text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5 shadow-glow-green"
                >
                  {submitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  Submit Telemetry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
