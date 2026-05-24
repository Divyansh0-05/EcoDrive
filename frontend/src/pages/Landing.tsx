import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, Leaf, Zap, BarChart3, Activity, ShieldCheck, Globe, Route } from 'lucide-react';
import { FloatingNav } from '../components/ui/floating-navbar';
import { TextGenerateEffect } from '../components/ui/text-generate-effect';

export const Landing: React.FC = () => {
  const navItems = [
    { name: 'Home', link: '#' },
    { name: 'Features', link: '#features' },
    { name: 'Analytics', link: '#analytics' },
    { name: 'Mission', link: '#mission' },
  ];

  return (
    <div className="min-h-screen bg-[#FAFCFF] font-sans overflow-x-hidden flex flex-col relative selection:bg-eco-primary/30">
      
      {/* Decorative Background Mesh Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-eco-glow/20 rounded-full blur-[120px] -z-10 mix-blend-multiply" />
      <div className="absolute top-[20%] right-[-10%] w-[40vw] h-[40vw] bg-blue-400/10 rounded-full blur-[120px] -z-10 mix-blend-multiply" />
      
      <FloatingNav navItems={navItems} />

      {/* Navigation */}
      <nav className="w-full max-w-[1400px] mx-auto px-6 py-6 flex items-center justify-between z-10 relative">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-eco-primary to-eco-dark flex items-center justify-center shadow-lg shadow-eco-primary/20">
            <Leaf className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-black tracking-tight text-foreground">Eco<span className="text-eco-primary">Drive</span></span>
        </div>

        <div className="hidden md:flex items-center gap-8 bg-white/60 backdrop-blur-md border border-border px-8 py-3 rounded-full shadow-sm">
          {['Home', 'Features', 'Analytics', 'Mission'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              className="text-sm font-bold text-muted-foreground hover:text-eco-primary transition-colors uppercase tracking-wider"
            >
              {item}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link 
            to="/login" 
            className="hidden sm:block px-6 py-2.5 rounded-full text-sm font-bold text-muted-foreground hover:text-foreground transition-colors"
          >
            Sign In
          </Link>
          <Link 
            to="/register" 
            className="px-6 py-2.5 rounded-full bg-foreground text-background font-bold text-sm hover:bg-foreground/90 transition-all hover:scale-105 active:scale-95 shadow-lg"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 w-full max-w-[1400px] mx-auto px-6 pt-20 pb-32 flex flex-col items-center justify-center z-10 relative text-center">
        
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-border shadow-sm mb-8 animate-fade-in">
          <span className="flex h-2 w-2 rounded-full bg-eco-primary animate-pulse"></span>
          <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">The Future of Sustainable Driving</span>
        </div>

        <h1 className="scroll-m-20 text-6xl md:text-8xl font-extrabold tracking-tight text-foreground leading-[0.9] mb-4 max-w-[900px] animate-fade-in" style={{ animationDelay: '100ms' }}>
          Drive Smarter. <br />
          <TextGenerateEffect words="Breathe Cleaner." className="text-6xl md:text-8xl font-extrabold tracking-tight" />
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-[600px] leading-relaxed font-medium mb-12 animate-fade-in" style={{ animationDelay: '200ms' }}>
          Advanced AI telemetry that analyzes your habits, calculates your carbon footprint, and guides you to a greener, more efficient commute.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: '300ms' }}>
          <Link 
            to="/register"
            className="group flex items-center justify-center gap-2 bg-eco-primary hover:bg-eco-dark text-white px-8 py-4 rounded-full font-bold text-[15px] uppercase tracking-wider transition-all shadow-glow-green hover:-translate-y-1"
          >
            Start Tracking Free
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>

          <button className="group flex items-center justify-center gap-3 bg-white hover:bg-gray-50 border border-border text-foreground px-8 py-4 rounded-full font-bold text-[15px] uppercase tracking-wider transition-all shadow-sm hover:-translate-y-1">
            <div className="w-6 h-6 rounded-full bg-eco-light flex items-center justify-center text-eco-primary">
              <Play className="w-3 h-3 fill-current ml-0.5" />
            </div>
            Watch Demo
          </button>
        </div>

        {/* Hero Dashboard Preview (Abstracted) */}
        <div className="mt-24 w-full max-w-[1000px] relative animate-fade-in" style={{ animationDelay: '400ms' }}>
          <div className="absolute inset-0 bg-gradient-to-t from-[#FAFCFF] via-transparent to-transparent z-20" />
          <div className="glass-card rounded-[2rem] border border-border shadow-2xl p-4 md:p-8 bg-white/50 backdrop-blur-xl relative z-10 overflow-hidden group text-left">
            {/* Mock Dashboard UI elements */}
            <div className="flex items-center justify-between border-b border-border/50 pb-6 mb-6">
               <div className="flex gap-4 items-center">
                 <div className="w-12 h-12 rounded-xl bg-eco-light flex items-center justify-center"><Activity className="text-eco-primary" /></div>
                 <div>
                   <div className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Live Eco Score</div>
                   <div className="text-3xl font-black text-foreground">94<span className="text-eco-primary text-xl">/100</span></div>
                 </div>
               </div>
               <div className="hidden sm:flex gap-2">
                 <div className="h-8 w-24 bg-gray-100 rounded-lg animate-pulse" />
                 <div className="h-8 w-24 bg-eco-light rounded-lg animate-pulse" />
               </div>
            </div>
            {/* Bento Grid inside Mockup */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[200px]">
               <div className="col-span-2 bg-gradient-to-br from-gray-50 to-white border border-border/50 rounded-2xl p-6 relative overflow-hidden">
                 <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-eco-light to-transparent" />
                 <svg className="absolute bottom-0 left-0 w-full text-eco-primary/20" viewBox="0 0 100 20" preserveAspectRatio="none">
                    <path d="M0 20 L0 10 Q25 0 50 10 T100 10 L100 20 Z" fill="currentColor"/>
                 </svg>
               </div>
               <div className="bg-gray-50 border border-border/50 rounded-2xl flex flex-col items-center justify-center p-6">
                 <div className="w-16 h-16 rounded-full border-4 border-eco-primary border-l-transparent animate-spin-slow mb-4" />
                 <div className="h-4 w-16 bg-gray-200 rounded-full" />
               </div>
            </div>
          </div>
        </div>

      </main>

      {/* Bento Box Features Section */}
      <section id="features" className="w-full py-24 bg-white z-10 relative">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="mb-16">
            <h2 className="text-eco-primary font-bold tracking-widest uppercase text-sm mb-2">Powerful Features</h2>
            <h3 className="text-4xl md:text-5xl font-black text-foreground tracking-tight">Everything you need to <br/>drive sustainably.</h3>
          </div>
          
          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6 h-auto md:h-[600px]">
            
            {/* Large Feature 1 */}
            <div className="md:col-span-2 md:row-span-1 glass-card rounded-[2rem] p-8 border border-border flex flex-col justify-between group hover:border-eco-primary/50 transition-all hover:shadow-glow-green overflow-hidden relative bg-white">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <Route className="w-32 h-32 text-eco-primary" />
              </div>
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-eco-light text-eco-primary flex items-center justify-center mb-6">
                  <Route className="w-6 h-6" />
                </div>
                <h4 className="text-2xl font-bold text-foreground mb-3">Eco Route Planner</h4>
                <p className="text-muted-foreground font-medium max-w-md">
                  Stop driving blindly. Our AI calculates the most fuel-efficient routes by analyzing traffic, elevation, and historical congestion data.
                </p>
              </div>
            </div>

            {/* Square Feature 1 */}
            <div className="glass-card rounded-[2rem] p-8 border border-border flex flex-col justify-between group hover:border-blue-400/50 transition-all hover:shadow-lg overflow-hidden relative bg-gradient-to-br from-white to-blue-50/50">
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-500 flex items-center justify-center mb-6">
                  <Activity className="w-6 h-6" />
                </div>
                <h4 className="text-2xl font-bold text-foreground mb-3">Live Telemetry</h4>
                <p className="text-muted-foreground font-medium">
                  Track rapid acceleration and hard braking events in real-time.
                </p>
              </div>
            </div>

            {/* Square Feature 2 */}
            <div className="glass-card rounded-[2rem] p-8 border border-border flex flex-col justify-between group hover:border-purple-400/50 transition-all hover:shadow-lg overflow-hidden relative bg-gradient-to-br from-white to-purple-50/50">
               <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-500 flex items-center justify-center mb-6">
                  <Zap className="w-6 h-6" />
                </div>
                <h4 className="text-2xl font-bold text-foreground mb-3">EV Transition</h4>
                <p className="text-muted-foreground font-medium">
                  Simulate your cost savings if you switched to an Electric Vehicle.
                </p>
              </div>
            </div>

            {/* Large Feature 2 */}
            <div className="md:col-span-2 md:row-span-1 glass-card rounded-[2rem] p-8 border border-border flex flex-col md:flex-row items-center gap-8 group hover:border-emerald-400/50 transition-all hover:shadow-glow-green overflow-hidden relative bg-foreground text-background">
              <div className="flex-1 relative z-10">
                <div className="w-12 h-12 rounded-xl bg-white/10 text-white flex items-center justify-center mb-6">
                  <BarChart3 className="w-6 h-6" />
                </div>
                <h4 className="text-2xl font-bold mb-3">Deep Analytics Dashboard</h4>
                <p className="text-gray-400 font-medium">
                  Visualize your carbon footprint over time. Track fuel saved, emissions reduced, and compare your EcoScore against city leaderboards.
                </p>
              </div>
              <div className="w-full md:w-1/3 aspect-square bg-gradient-to-br from-eco-primary to-emerald-600 rounded-2xl p-4 flex flex-col items-center justify-center transform group-hover:scale-105 transition-transform shadow-2xl">
                 <Globe className="w-16 h-16 text-white/80 mb-2 animate-pulse" />
                 <span className="font-bold text-white uppercase tracking-wider text-xs">Global Impact</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="w-full py-24 bg-eco-light/30 border-y border-eco-glow/20 z-10 relative">
        <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {[
            { label: "Active Drivers", value: "50K+" },
            { label: "CO2 Saved", value: "12M kg" },
            { label: "Trips Analyzed", value: "5M+" },
            { label: "Fuel Saved", value: "2M L" }
          ].map((stat, idx) => (
            <div key={idx} className="flex flex-col gap-3 group">
              <span className="text-5xl lg:text-6xl font-black text-foreground group-hover:text-eco-primary transition-colors">{stat.value}</span>
              <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-32 bg-white z-10 relative text-center overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-eco-glow/10 rounded-full blur-[100px] -z-10" />
        <div className="max-w-[800px] mx-auto px-6">
          <ShieldCheck className="w-16 h-16 text-eco-primary mx-auto mb-8" />
          <h2 className="text-5xl md:text-6xl font-black text-foreground tracking-tight mb-6 leading-tight">
            Ready to drive <span className="text-transparent bg-clip-text bg-gradient-to-r from-eco-primary to-emerald-400">smarter?</span>
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl mb-12 font-medium">
            Join thousands of drivers making a difference. Start tracking your eco-score today and help build a greener future.
          </p>
          <Link 
            to="/register"
            className="inline-block bg-foreground hover:bg-black text-background px-12 py-5 rounded-full font-bold text-lg uppercase tracking-wider transition-all shadow-xl hover:-translate-y-1 hover:shadow-2xl"
          >
            Create Free Account
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-12 bg-white border-t border-border z-10 relative">
        <div className="max-w-[1400px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
             <Leaf className="w-5 h-5 text-eco-primary" />
             <span className="text-lg font-black tracking-tight text-foreground">Eco<span className="text-eco-primary">Drive</span></span>
          </div>
          <div className="flex gap-8 mb-4 md:mb-0">
            {['Privacy', 'Terms', 'Twitter', 'GitHub'].map(link => (
              <a key={link} href="#" className="text-sm font-bold text-muted-foreground hover:text-eco-primary transition-colors">{link}</a>
            ))}
          </div>
          <p className="text-muted-foreground text-sm font-medium">
            © {new Date().getFullYear()} EcoDrive. All rights reserved.
          </p>
        </div>
      </footer>

    </div>
  );
};
