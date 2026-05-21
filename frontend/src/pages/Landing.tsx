import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play } from 'lucide-react';

export const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden flex flex-col relative selection:bg-[#9DCB3C]/30">
      
      {/* Light Blue Decorative Background Shape */}
      <div className="absolute top-0 right-0 w-[55vw] h-[100vh] bg-[#EEF8FA] rounded-l-[150px] -z-10" />

      {/* Navigation */}
      <nav className="w-full max-w-[1400px] mx-auto px-8 py-6 flex items-center justify-between z-10 relative">
        <div className="text-[28px] font-extrabold tracking-tight text-[#9DCB3C] uppercase">
          EcoDrive
        </div>

        <div className="hidden md:flex items-center gap-10">
          {['Home', 'About', 'Service', 'Blog', 'Contact'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              className="text-[#888888] font-bold text-sm uppercase tracking-wide hover:text-[#9DCB3C] transition-colors"
            >
              {item}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Link 
            to="/register" 
            className="px-6 py-2 rounded-full border-2 border-[#9DCB3C] text-[#888888] font-bold text-sm hover:bg-[#9DCB3C]/5 transition-colors"
          >
            Sign up
          </Link>
          <Link 
            to="/login" 
            className="px-6 py-2.5 rounded-full bg-[#9DCB3C] text-white font-bold text-sm hover:bg-[#8AB532] shadow-soft transition-colors"
          >
            Sign in
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 w-full max-w-[1400px] mx-auto px-8 flex flex-col md:flex-row items-center justify-between z-10 relative mt-10 md:mt-0">
        
        {/* Left Column (Text) */}
        <div className="w-full md:w-[45%] space-y-8 pb-20 md:pb-0">
          <h1 className="text-[5rem] leading-[1.05] font-black tracking-tight uppercase">
            <span className="text-[#9DCB3C] block">100% Eco</span>
            <span className="text-[#4A4A4A] block">Friendly</span>
          </h1>
          
          <p className="text-[#888888] text-lg max-w-[450px] leading-relaxed font-medium">
            Track your trips, calculate exact carbon emissions, and utilize AI telemetry to optimize your driving habits. Save fuel, reduce wear, and help heal our planet.
          </p>

          <div className="pt-4 flex items-center gap-6">
            <Link 
              to="/register"
              className="group flex items-center gap-2 bg-[#9DCB3C] hover:bg-[#8AB532] text-white px-8 py-3.5 rounded-full font-bold text-[15px] uppercase tracking-wider transition-all shadow-[0_8px_20px_rgba(157,203,60,0.3)] hover:-translate-y-0.5"
            >
              Learn More 
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            {/* Slider Dots/Arrows (Visual only, matching image) */}
            <div className="flex items-center gap-4 ml-10">
               <button className="w-0 h-0 border-t-[6px] border-t-transparent border-r-[10px] border-r-[#9DCB3C] border-b-[6px] border-b-transparent hover:opacity-70 transition-opacity"></button>
               <button className="w-10 h-10 rounded-full border-2 border-[#9DCB3C] flex items-center justify-center text-[#9DCB3C] hover:bg-[#9DCB3C]/10 transition-colors">
                 <Play className="w-4 h-4 fill-current ml-0.5" />
               </button>
            </div>
          </div>
          
          {/* Decorative side dots (matching image left edge) */}
          <div className="absolute left-0 top-[60%] flex flex-col gap-3 -translate-x-4">
             <div className="w-3 h-3 rounded-full border-2 border-[#9DCB3C]"></div>
             <div className="w-3 h-3 rounded-full bg-[#9DCB3C]"></div>
             <div className="w-3 h-3 rounded-full bg-[#9DCB3C]"></div>
             <div className="w-3 h-3 rounded-full bg-[#9DCB3C]"></div>
             <div className="w-3 h-3 rounded-full bg-[#9DCB3C]"></div>
          </div>
        </div>

        {/* Right Column (Image) */}
        <div className="w-full md:w-[55%] relative flex justify-end">
           {/* The generated image */}
           <img 
             src="/hero-ev.png" 
             alt="Isometric EV Charging Station" 
             className="w-[120%] max-w-[800px] object-contain -mr-20 z-10 animate-fade-in"
             style={{ filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.08))' }}
           />
        </div>

      </main>

      {/* Features Section */}
      <section id="service" className="w-full py-24 bg-white z-10 relative">
        <div className="max-w-[1400px] mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-[#9DCB3C] font-bold tracking-widest uppercase text-sm mb-2">Our Services</h2>
            <h3 className="text-4xl font-black text-[#4A4A4A] uppercase">Why Choose EcoDrive?</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: "Live Telemetry", desc: "Monitor your driving in real-time. Identify harsh braking and acceleration events to improve your eco-score." },
              { title: "AI Assistant", desc: "Get personalized insights and tips from our advanced AI driving assistant to help you save fuel and reduce wear." },
              { title: "Carbon Tracking", desc: "Calculate your exact carbon emissions for every trip and track your total CO2 saved over time." }
            ].map((feature, idx) => (
              <div key={idx} className="p-8 rounded-[2rem] border-2 border-[#EEF8FA] hover:border-[#9DCB3C] transition-colors group">
                <div className="w-16 h-16 rounded-2xl bg-[#EEF8FA] text-[#9DCB3C] flex items-center justify-center mb-6 group-hover:bg-[#9DCB3C] group-hover:text-white transition-colors">
                  <div className="w-8 h-8 border-4 border-current rounded-full" />
                </div>
                <h4 className="text-xl font-bold text-[#4A4A4A] mb-3 uppercase">{feature.title}</h4>
                <p className="text-[#888888] leading-relaxed font-medium">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="w-full py-20 bg-[#9DCB3C] text-white z-10 relative">
        <div className="max-w-[1400px] mx-auto px-8 grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
          {[
            { label: "Active Drivers", value: "50K+" },
            { label: "CO2 Saved (Tons)", value: "12M+" },
            { label: "Trips Analyzed", value: "5M+" },
            { label: "Fuel Saved (Gallons)", value: "2M+" }
          ].map((stat, idx) => (
            <div key={idx} className="flex flex-col gap-2">
              <span className="text-5xl font-black">{stat.value}</span>
              <span className="text-sm font-bold uppercase tracking-widest text-white/80">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full py-24 bg-[#F8F9FA] z-10 relative">
        <div className="max-w-[1400px] mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-[#9DCB3C] font-bold tracking-widest uppercase text-sm mb-2">Process</h2>
            <h3 className="text-4xl font-black text-[#4A4A4A] uppercase">How It Works</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            <div className="hidden md:block absolute top-[20%] left-1/6 right-1/6 h-[2px] bg-[#EEF8FA] border-t-2 border-dashed border-[#9DCB3C] z-0"></div>
            {[
              { step: "01", title: "Add Your Vehicle", desc: "Input your car details in the garage. We support all engine types, including EV and Hybrids." },
              { step: "02", title: "Drive Naturally", desc: "Log your trips or connect live telemetry. The AI analyzes your speed, braking, and idling." },
              { step: "03", title: "Earn Rewards", desc: "Increase your EcoScore, climb the global leaderboards, and offset your carbon footprint." }
            ].map((item, idx) => (
              <div key={idx} className="relative z-10 flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-full bg-white border-4 border-[#9DCB3C] text-[#9DCB3C] flex items-center justify-center text-2xl font-black mb-6 shadow-[0_0_20px_rgba(157,203,60,0.2)]">
                  {item.step}
                </div>
                <h4 className="text-xl font-bold text-[#4A4A4A] mb-3 uppercase">{item.title}</h4>
                <p className="text-[#888888] leading-relaxed font-medium max-w-[280px]">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-32 bg-white z-10 relative text-center">
        <div className="max-w-[800px] mx-auto px-8">
          <h2 className="text-5xl font-black text-[#4A4A4A] uppercase mb-6 leading-tight">
            Ready to drive <span className="text-[#9DCB3C]">smarter?</span>
          </h2>
          <p className="text-[#888888] text-lg mb-10 font-medium">
            Join thousands of drivers making a difference. Start tracking your eco-score today and help build a greener future.
          </p>
          <Link 
            to="/register"
            className="inline-block bg-[#9DCB3C] hover:bg-[#8AB532] text-white px-10 py-4 rounded-full font-bold text-lg uppercase tracking-wider transition-all shadow-[0_8px_20px_rgba(157,203,60,0.3)] hover:-translate-y-1"
          >
            Create Free Account
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-12 bg-[#F8F9FA] border-t border-gray-200 z-10 relative">
        <div className="max-w-[1400px] mx-auto px-8 flex flex-col md:flex-row items-center justify-between">
          <div className="text-xl font-extrabold tracking-tight text-[#9DCB3C] uppercase mb-4 md:mb-0">
            EcoDrive
          </div>
          <p className="text-[#888888] text-sm font-medium">
            © {new Date().getFullYear()} EcoDrive. All rights reserved.
          </p>
        </div>
      </footer>

    </div>
  );
};
