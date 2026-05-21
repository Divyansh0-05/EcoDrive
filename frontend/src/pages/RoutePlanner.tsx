import React, { useState } from 'react';
import { Search, MapPin, Navigation, Bot, Leaf, Droplets, CloudRain, ShieldCheck } from 'lucide-react';
import { EcoMap } from '../components/EcoMap';

export const RoutePlanner: React.FC = () => {
  const [start, setStart] = useState('');
  const [destination, setDestination] = useState('');
  const [isCalculating, setIsCalculating] = useState(false);
  const [routeData, setRouteData] = useState<any>(null);

  const handleCalculateRoute = (e: React.FormEvent) => {
    e.preventDefault();
    if (!start || !destination) return;
    
    setIsCalculating(true);
    
    // Simulate API delay
    setTimeout(() => {
      setRouteData({
        center: [19.0760, 72.8777], // Mumbai
        ecoRoute: [
          [19.0760, 72.8777], // Mumbai
          [19.0330, 73.0188], // Navi Mumbai
          [18.7500, 73.3500], // Lonavala
          [18.5204, 73.8567], // Pune
        ],
        trafficRoute: [
          [19.0760, 72.8777],
          [19.0500, 73.0000],
          [18.8000, 73.3000],
          [18.5204, 73.8567],
        ],
        analytics: {
          distance: '5.2 km',
          time: '18 mins',
          fuelSaved: '1.2L',
          co2Saved: '2.4kg',
          ecoScore: 94,
          treesSaved: 1
        }
      });
      setIsCalculating(false);
    }, 1500);
  };

  return (
    <div className="p-8 max-w-[1400px] mx-auto space-y-6">
      
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-3">
          <MapPin className="w-6 h-6 text-eco-primary" />
          Eco Route Planner
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Calculate the most environmentally friendly route to your destination.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column - Controls & Analytics */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Input Card */}
          <div className="glass-card rounded-2xl p-6 relative z-10">
            <h3 className="font-bold text-foreground mb-4">Route Search</h3>
            <form onSubmit={handleCalculateRoute} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Start Location</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Navigation className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mumbai"
                    className="block w-full pl-10 pr-3 py-2.5 border border-border rounded-xl bg-muted text-sm text-foreground focus:outline-none focus:bg-card focus:ring-1 focus:ring-eco-glow transition-all"
                    value={start}
                    onChange={(e) => setStart(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-1 relative">
                <div className="absolute left-4 -top-3 bottom-5 w-0.5 bg-border z-0"></div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground relative z-10">Destination</label>
                <div className="relative z-10">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="h-4 w-4 text-eco-primary" />
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Pune"
                    className="block w-full pl-10 pr-3 py-2.5 border border-border rounded-xl bg-muted text-sm text-foreground focus:outline-none focus:bg-card focus:ring-1 focus:ring-eco-glow transition-all"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isCalculating}
                className="w-full mt-2 py-3 bg-eco-primary text-white rounded-xl text-sm font-bold hover:bg-eco-dark transition-colors flex items-center justify-center gap-2 shadow-soft disabled:opacity-70"
              >
                {isCalculating ? (
                  <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Search className="w-4 h-4" />
                    Find Eco Route
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Analytics Results (Shows only when routeData exists) */}
          {routeData && (
            <div className="animate-fade-in space-y-6">
              
              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="glass-card rounded-xl p-4 flex flex-col justify-center border-l-4 border-l-[#10B981]">
                  <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider mb-1 flex items-center gap-1"><CloudRain className="w-3 h-3"/> CO₂ Saved</span>
                  <span className="text-xl font-black text-foreground">{routeData.analytics.co2Saved}</span>
                </div>
                <div className="glass-card rounded-xl p-4 flex flex-col justify-center border-l-4 border-l-[#3B82F6]">
                  <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider mb-1 flex items-center gap-1"><Droplets className="w-3 h-3"/> Fuel Saved</span>
                  <span className="text-xl font-black text-foreground">{routeData.analytics.fuelSaved}</span>
                </div>
                <div className="glass-card rounded-xl p-4 flex flex-col justify-center border-l-4 border-l-[#F59E0B]">
                  <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider mb-1 flex items-center gap-1"><ShieldCheck className="w-3 h-3"/> Eco Score</span>
                  <span className="text-xl font-black text-foreground">{routeData.analytics.ecoScore}/100</span>
                </div>
                <div className="glass-card rounded-xl p-4 flex flex-col justify-center border-l-4 border-l-[#8B5CF6]">
                  <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider mb-1 flex items-center gap-1"><Leaf className="w-3 h-3"/> Trees Equiv.</span>
                  <span className="text-xl font-black text-foreground">{routeData.analytics.treesSaved} Tree</span>
                </div>
              </div>

              {/* AI Suggestion Box */}
              <div className="glass-card rounded-2xl p-5 border-eco-glow/20 shadow-glow-green bg-eco-light/50 relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-3 opacity-10">
                   <Bot className="w-20 h-20 text-eco-primary" />
                 </div>
                 <div className="flex items-center gap-2 mb-3 relative z-10">
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                      <Bot className="w-4 h-4 text-eco-primary" />
                    </div>
                    <h4 className="text-sm font-bold text-foreground">AI Insight</h4>
                 </div>
                 <p className="text-sm text-foreground/80 font-medium relative z-10 leading-relaxed mb-3">
                   "This route avoids high traffic areas in the city center. The Eco route reduces emissions by roughly 18% compared to the normal path."
                 </p>
                 <p className="text-xs text-eco-dark font-bold relative z-10 flex items-center gap-1">
                   <Leaf className="w-3 h-3" />
                   Maintaining 45km/h will optimize fuel efficiency.
                 </p>
              </div>

            </div>
          )}

          {!routeData && !isCalculating && (
            <div className="glass-card rounded-2xl p-8 flex flex-col items-center justify-center text-center border-dashed border-border opacity-60">
              <MapPin className="w-8 h-8 text-muted-foreground mb-3" />
              <p className="text-sm font-medium text-muted-foreground">Enter a start and destination to generate eco-friendly route analytics.</p>
            </div>
          )}
        </div>

        {/* Right Column - Map */}
        <div className="lg:col-span-8 glass-card rounded-2xl overflow-hidden h-[600px] border border-border relative z-0">
          <EcoMap 
            center={routeData?.center}
            ecoRoute={routeData?.ecoRoute}
            trafficRoute={routeData?.trafficRoute}
          />
        </div>

      </div>
    </div>
  );
};
