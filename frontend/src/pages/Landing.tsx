import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Trophy, Award, Car, Activity, Sparkles, ArrowRight, Compass, Shield, Zap } from 'lucide-react';

export const Landing: React.FC = () => {
  const cars = [
    {
      name: 'Tesla Model 3',
      type: 'Electric',
      maker: 'Tesla',
      co2: '0g/km (Tailpipe)',
      score: '100',
      ecoRating: 5,
      color: 'from-blue-500/20 to-indigo-500/20 border-blue-500/30',
      desc: '100% electric motor with regenerative braking. Converts nearly 80% of battery energy into motion.',
      badge: 'Zero Emission'
    },
    {
      name: 'Toyota Grand Highlander',
      type: 'Hybrid',
      maker: 'Toyota',
      co2: '110g/km',
      score: '90',
      ecoRating: 4,
      color: 'from-emerald-500/20 to-teal-500/20 border-emerald-500/30',
      desc: 'Petrol + Electric hybrid. Switches to electric at low speeds and traffic stops, reducing idle consumption.',
      badge: 'Ultra-Low Emission'
    },
    {
      name: 'Mahindra XUV700',
      type: 'Petrol',
      maker: 'Mahindra',
      co2: '165g/km',
      score: '75',
      ecoRating: 3,
      color: 'from-amber-500/20 to-orange-500/20 border-amber-500/30',
      desc: 'Turbocharged petrol engine. Highly responsive but prone to heavy consumption during aggressive accelerations.',
      badge: 'Standard Clean'
    },
    {
      name: 'Toyota Fortuner',
      type: 'Diesel',
      maker: 'Toyota',
      co2: '190g/km',
      score: '65',
      ecoRating: 2,
      color: 'from-rose-500/20 to-red-500/20 border-rose-500/30',
      desc: 'Heavy-duty diesel engine. Generates high torque but carries a larger greenhouse emission profile per kilometer.',
      badge: 'High Footprint'
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground font-sans overflow-x-hidden selection:bg-eco-glow/30 selection:text-foreground">
      {/* Background ambient glows */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-eco-glow/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[150px] pointer-events-none" />

      {/* Navbar */}
      <header className="w-full max-w-7xl mx-auto px-6 py-6 flex justify-between items-center relative z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-eco-bg border border-eco-glow/20 rounded-xl flex items-center justify-center shadow-glow-green">
            <Leaf className="w-5 h-5 text-eco-glow" />
          </div>
          <span className="text-xl font-extrabold tracking-tight font-sans">
            Eco<span className="text-eco-glow">Drive</span>
          </span>
        </div>
        
        <div className="flex items-center gap-4">
          <Link 
            to="/login" 
            className="text-xs uppercase tracking-wider font-bold text-muted-foreground hover:text-foreground transition-colors"
          >
            Log In
          </Link>
          <Link 
            to="/register" 
            className="bg-eco-glow hover:bg-eco-glow/90 text-black font-extrabold py-2.5 px-5 rounded-xl text-xs uppercase tracking-wider transition-all shadow-glow-green"
          >
            Register
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-24 text-center relative z-10 flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/[0.03] border border-border rounded-full text-[10px] font-bold uppercase tracking-widest text-eco-glow mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          Gamified Drive Telemetry
        </div>
        
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter max-w-3xl leading-[1.05] mb-6">
          Drive Smarter. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-eco-glow via-emerald-400 to-teal-500">
            Save the Planet Greener.
          </span>
        </h1>
        
        <p className="text-muted-foreground text-sm md:text-base max-w-xl leading-relaxed mb-8">
          Turn your daily driving telemetry into a gamified challenge. Track efficiency, compete on global leaderboards, earn exclusive achievements, and optimize your vehicle's performance.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/register"
            className="bg-eco-glow hover:bg-eco-glow/90 text-black font-extrabold py-3 px-8 rounded-xl text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-glow-green"
          >
            Get Started Free
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/login"
            className="bg-card hover:bg-muted border border-border rounded-xl py-3 px-8 text-xs font-extrabold uppercase tracking-wider transition-colors"
          >
            Explore Dashboard
          </Link>
        </div>
      </section>

      {/* What is Telemetry Section */}
      <section className="py-20 border-t border-border bg-muted relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-eco-glow font-bold mb-3">
                <Activity className="w-3.5 h-3.5" />
                Live Telemetry
              </div>
              <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-6">
                What is Driving Telemetry?
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                Telemetry refers to the collection of real-time diagnostic parameters from your car. In EcoDrive, the platform measures simple trip telemetry (your route distance and time taken) and simulates complex indicators such as acceleration smooth profiles, deceleration braking, and idle efficiency.
              </p>
              
              <div className="space-y-4">
                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-lg bg-eco-glow/10 border border-eco-glow/20 flex items-center justify-center shrink-0">
                    <Compass className="w-4 h-4 text-eco-glow" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">Speed Consistency</h4>
                    <p className="text-muted-foreground text-xs mt-1">Driving at consistent speeds on highways drastically reduces fuel burn and power grid demand.</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-lg bg-eco-glow/10 border border-eco-glow/20 flex items-center justify-center shrink-0">
                    <Zap className="w-4 h-4 text-eco-glow" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">G-Force Smoothness</h4>
                    <p className="text-muted-foreground text-xs mt-1">Avoiding rapid stop-and-go movements preserves braking linings and keeps engine thermal efficiency high.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="glass-card rounded-2xl p-6 border border-border relative overflow-hidden">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-muted-foreground block mb-4">Telemetry Model Analysis</span>
              
              <div className="space-y-3">
                <div className="p-3 bg-card border border-border rounded-xl flex items-center justify-between">
                  <span className="text-xs font-bold text-foreground">Route Distance</span>
                  <span className="text-xs font-mono text-eco-glow font-bold">12.8 km</span>
                </div>
                <div className="p-3 bg-card border border-border rounded-xl flex items-center justify-between">
                  <span className="text-xs font-bold text-foreground">Duration Taken</span>
                  <span className="text-xs font-mono text-eco-glow font-bold">22 mins</span>
                </div>
                <div className="p-3 bg-card border border-border rounded-xl flex items-center justify-between">
                  <span className="text-xs font-bold text-foreground">Avg Speed</span>
                  <span className="text-xs font-mono text-emerald-400 font-bold">34.9 km/h</span>
                </div>
                <div className="p-3 bg-card border border-border rounded-xl flex items-center justify-between">
                  <span className="text-xs font-bold text-foreground">Estimated Brake Profile</span>
                  <span className="text-xs font-mono text-emerald-400 font-bold">Excellent</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
                <div>
                  <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest block">Model Eco-Score</span>
                  <span className="text-xl font-black text-foreground mt-0.5 block">89 <span className="text-[10px] text-eco-glow uppercase">Optimized</span></span>
                </div>
                <div className="w-9 h-9 rounded-xl bg-eco-glow/10 border border-eco-glow/20 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-eco-glow" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vehicle Showdown Section */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-eco-glow font-bold mb-3">
            <Car className="w-3.5 h-3.5" />
            Garage Diagnostics
          </div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-4">
            How Eco-Friendly is Your Vehicle?
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Different drivetrains interact uniquely with driving styles. Review how different fuels affect emission rates and telemetry potentials.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cars.map((car, idx) => (
            <div 
              key={idx} 
              className={`glass-card bg-gradient-to-br ${car.color} border rounded-2xl p-6 flex flex-col justify-between`}
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">{car.maker}</span>
                    <h3 className="text-sm font-extrabold text-foreground mt-0.5">{car.name}</h3>
                  </div>
                  <span className="px-2 py-0.5 bg-card border border-border rounded-md text-[9px] font-bold uppercase tracking-wider text-eco-glow">
                    {car.type}
                  </span>
                </div>

                <p className="text-muted-foreground text-xs mt-3 leading-relaxed mb-6">
                  {car.desc}
                </p>
              </div>

              <div>
                <div className="space-y-2 border-t border-border pt-4 mb-4">
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="font-bold text-muted-foreground uppercase tracking-widest">CO2 Footprint</span>
                    <span className="font-bold text-foreground">{car.co2}</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="font-bold text-muted-foreground uppercase tracking-widest">Max Eco Potential</span>
                    <span className="font-mono font-bold text-eco-glow">{car.score}/100</span>
                  </div>
                </div>

                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span 
                      key={i} 
                      className={`w-2.5 h-2.5 rounded-full ${
                        i < car.ecoRating ? 'bg-eco-glow shadow-glow-green' : 'bg-card'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Gamification Explanation Section */}
      <section className="py-20 border-t border-border bg-muted">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="order-2 lg:order-1 grid grid-cols-2 gap-4">
              <div className="glass-card rounded-2xl p-5 border border-border flex flex-col justify-between h-[160px]">
                <div className="w-9 h-9 bg-eco-glow/10 border border-eco-glow/20 rounded-xl flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-eco-glow" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">Competitive Ranks</h4>
                  <p className="text-muted-foreground text-[10px] mt-1">Climb from Eco-Beginner to Eco-Master on our real-time leaderboard.</p>
                </div>
              </div>

              <div className="glass-card rounded-2xl p-5 border border-border flex flex-col justify-between h-[160px]">
                <div className="w-9 h-9 bg-eco-glow/10 border border-eco-glow/20 rounded-xl flex items-center justify-center">
                  <Award className="w-5 h-5 text-eco-glow" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">Milestone Badges</h4>
                  <p className="text-muted-foreground text-[10px] mt-1">Unlock exclusive badges for conserving carbon and logging clean commutes.</p>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-eco-glow font-bold mb-3">
                <Trophy className="w-3.5 h-3.5" />
                Drive Community
              </div>
              <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-6">
                Gamifying Carbon Reduction
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                Why drive green alone? EcoDrive hooks directly into a social feedback loop. Compare your level with drivers globally. Level up by gathering XP on every efficient trip and earn bragging rights as a top Eco Driver on our platforms.
              </p>
              <Link
                to="/register"
                className="bg-eco-glow hover:bg-eco-glow/90 text-black font-extrabold py-3 px-6 rounded-xl text-xs uppercase tracking-wider transition-all inline-flex items-center gap-2 shadow-glow-green"
              >
                Join Leaderboard
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <footer className="py-20 border-t border-border text-center relative">
        <div className="max-w-xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-4">
            Ready to track your eco footprint?
          </h2>
          <p className="text-muted-foreground text-xs mb-8">
            Create your account today, add your default vehicle, and start collecting eco achievements.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              to="/register"
              className="bg-eco-glow hover:bg-eco-glow/90 text-black font-extrabold py-3 px-8 rounded-xl text-xs uppercase tracking-wider transition-all shadow-glow-green"
            >
              Sign Up Now
            </Link>
            <Link
              to="/login"
              className="bg-card hover:bg-muted border border-border rounded-xl py-3 px-8 text-xs font-extrabold uppercase tracking-wider transition-colors"
            >
              Log In
            </Link>
          </div>
          <p className="text-muted-foreground text-[10px] uppercase mt-12 tracking-widest">
            © 2026 EcoDrive. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};
