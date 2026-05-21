import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { Leaf, Fuel, Cloud, Navigation, Bot, ArrowUp, Calendar, ChevronDown, CheckCircle2 } from 'lucide-react';
import { EcoMap } from '../components/EcoMap';

export const Dashboard: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/dashboard')
      .then(res => setData(res.data.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading || !data) {
    return (
      <div className="flex-1 min-h-full flex items-center justify-center p-8">
        <div className="w-8 h-8 border-2 border-eco-glow/20 border-t-eco-glow rounded-full animate-spin" />
      </div>
    );
  }

  // Mock data for charts if API data is thin
  const fuelData = data.weeklyChart.length > 0 ? data.weeklyChart : [
    { name: '01 May', value: 18 }, { name: '06 May', value: 25 }, 
    { name: '11 May', value: 22 }, { name: '16 May', value: 28 },
    { name: '21 May', value: 24 }, { name: '26 May', value: 35 },
    { name: '31 May', value: 30 }
  ];

  const barData = [
    { name: 'Mon', score: 75 }, { name: 'Tue', score: 82 }, 
    { name: 'Wed', score: 90 }, { name: 'Thu', score: 85 }, 
    { name: 'Fri', score: 86 }, { name: 'Sat', score: 0 }, { name: 'Sun', score: 0 }
  ];

  const pieData = [
    { name: 'Reduced', value: 42.7, color: '#10B981' },
    { name: 'Remaining', value: 57.3, color: '#E8F5E9' }
  ];

  return (
    <div className="p-8 max-w-[1400px] mx-auto space-y-6">
      
      {/* Header Greeting */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Good Morning, {data.user.name.split(' ')[0]}! 👋</h1>
          <p className="text-sm text-muted-foreground mt-1">Track your trips, improve your driving and save our environment.</p>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-xl text-sm font-medium text-foreground shadow-soft">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            This Month
            <ChevronDown className="w-4 h-4 text-muted-foreground ml-1" />
          </button>
          <button className="flex items-center gap-2 px-5 py-2 bg-eco-primary hover:bg-eco-dark text-white rounded-xl text-sm font-bold shadow-soft transition-colors">
            + Add Trip
          </button>
        </div>
      </div>

      {/* 4 Top Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Eco Score', val: '87', sub: '/ 100', icon: Leaf, color: 'text-eco-primary', bg: 'bg-eco-light', up: '12%' },
          { title: 'Fuel Saved', val: '18.6', sub: ' L', icon: Fuel, color: 'text-teal-600', bg: 'bg-teal-50', up: '8.2%' },
          { title: 'CO2 Saved', val: '42.7', sub: ' kg', icon: Cloud, color: 'text-blue-500', bg: 'bg-blue-50', up: '15.3%' },
          { title: 'Distance Driven', val: '624.5', sub: ' km', icon: Navigation, color: 'text-amber-500', bg: 'bg-amber-50', up: '10.4%' },
        ].map((stat, i) => (
          <div key={i} className="glass-card rounded-2xl p-5 relative overflow-hidden flex items-center gap-4">
            <div className={`w-12 h-12 rounded-full ${stat.bg} ${stat.color} flex items-center justify-center shrink-0`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-muted-foreground">{stat.title}</p>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-2xl font-extrabold text-foreground">{stat.val}</span>
                <span className="text-sm font-medium text-muted-foreground">{stat.sub}</span>
              </div>
              <div className="flex items-center gap-1 mt-1 text-[10px] font-bold text-eco-primary">
                <ArrowUp className="w-3 h-3" />
                <span>{stat.up} vs last week</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Map Row */}
      <div className="grid grid-cols-1 gap-6">
        <div className="glass-card rounded-2xl p-6 h-[450px] flex flex-col">
          <div className="flex justify-between items-center mb-4">
             <h3 className="font-bold text-foreground flex items-center gap-2">
               <Navigation className="w-5 h-5 text-eco-primary" />
               Live Telemetry Map
             </h3>
             <div className="flex gap-2">
                <span className="px-3 py-1 bg-eco-light text-eco-primary text-xs font-bold rounded-lg border border-eco-glow/20">Eco Route Active</span>
             </div>
          </div>
          <div className="flex-1 rounded-xl overflow-hidden border border-border relative z-0">
             <EcoMap />
          </div>
        </div>
      </div>

      {/* Chart Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Fuel Consumption Chart */}
        <div className="lg:col-span-6 glass-card rounded-2xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-foreground">Fuel Consumption</h3>
            <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
              This Month <ChevronDown className="w-3 h-3" />
            </button>
          </div>
          <span className="text-[10px] text-muted-foreground block mb-2">(L)</span>
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={fuelData} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorFuel" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="var(--muted-foreground)" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--muted-foreground)" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', borderRadius: '8px', color: 'var(--foreground)' }}
                  itemStyle={{ color: '#10B981', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="value" stroke="#10B981" strokeWidth={3} fill="url(#colorFuel)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Carbon Emission Pie */}
        <div className="lg:col-span-3 glass-card rounded-2xl p-6 flex flex-col">
          <h3 className="font-bold text-foreground mb-4">Carbon Emission</h3>
          <div className="flex-1 flex flex-col items-center justify-center relative">
            <div className="h-[140px] w-[140px] relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} innerRadius={50} outerRadius={70} stroke="none" dataKey="value">
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-extrabold text-foreground">42.7</span>
                <span className="text-[10px] font-bold text-muted-foreground">kg</span>
              </div>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-eco-glow"/> <span className="text-muted-foreground">This Month</span></div>
              <span className="font-bold text-foreground">42.7 kg</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-eco-light"/> <span className="text-muted-foreground">Last Month</span></div>
              <span className="font-bold text-foreground">37.1 kg</span>
            </div>
          </div>
        </div>

        {/* AI Driving Assistant Widget */}
        <div className="lg:col-span-3 glass-card rounded-2xl p-6 flex flex-col">
          <h3 className="font-bold text-foreground mb-4">AI Driving Assistant</h3>
          <div className="bg-eco-light rounded-xl p-4 flex gap-4 items-center mb-4">
             <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center shrink-0">
               <Bot className="w-6 h-6 text-eco-primary" />
             </div>
             <p className="text-xs font-medium text-eco-dark leading-tight">Great driving! You are maintaining smooth speed and reducing harsh braking.</p>
          </div>
          <div className="space-y-3 mt-auto">
             <p className="text-xs font-bold text-foreground">Suggestions for you</p>
             <div className="flex items-start gap-2 text-xs text-muted-foreground">
               <CheckCircle2 className="w-4 h-4 text-eco-glow shrink-0" />
               <span>Avoid idling for long hours</span>
             </div>
             <div className="flex items-start gap-2 text-xs text-muted-foreground">
               <CheckCircle2 className="w-4 h-4 text-eco-glow shrink-0" />
               <span>Maintain steady speed on highways</span>
             </div>
             <button className="w-full py-2 bg-eco-primary text-white rounded-lg text-xs font-bold mt-4 hover:bg-eco-dark transition-colors">
               View All Suggestions
             </button>
          </div>
        </div>

      </div>

      {/* Middle Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Recent Trips Table */}
        <div className="lg:col-span-6 glass-card rounded-2xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-foreground">Recent Trips</h3>
            <button className="text-xs font-bold text-eco-primary hover:underline">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="text-muted-foreground border-b border-border">
                  <th className="pb-3 font-medium">Date</th>
                  <th className="pb-3 font-medium">From - To</th>
                  <th className="pb-3 font-medium">Distance</th>
                  <th className="pb-3 font-medium">Fuel Used</th>
                  <th className="pb-3 font-medium">Avg. Speed</th>
                  <th className="pb-3 font-medium text-center">Eco Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {[
                  { date: '25 May, 2024', route: 'Home - Office', dist: '12.4 km', fuel: '1.2 L', speed: '42 km/h', score: 92 },
                  { date: '24 May, 2024', route: 'Market - Home', dist: '8.7 km', fuel: '0.8 L', speed: '38 km/h', score: 88 },
                  { date: '24 May, 2024', route: 'Road Trip', dist: '120.5 km', fuel: '6.3 L', speed: '65 km/h', score: 76 },
                  { date: '23 May, 2024', route: 'Office - Gym', dist: '6.2 km', fuel: '0.6 L', speed: '30 km/h', score: 90 },
                ].map((trip, i) => (
                  <tr key={i} className="text-foreground">
                    <td className="py-4">{trip.date}</td>
                    <td className="py-4 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-eco-glow"></span>
                      {trip.route}
                    </td>
                    <td className="py-4">{trip.dist}</td>
                    <td className="py-4">{trip.fuel}</td>
                    <td className="py-4">{trip.speed}</td>
                    <td className="py-4 text-center font-bold text-eco-primary">{trip.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Weekly Overview */}
        <div className="lg:col-span-3 glass-card rounded-2xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-foreground">Weekly Overview</h3>
            <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
              This Week <ChevronDown className="w-3 h-3" />
            </button>
          </div>
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="barColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10B981" />
                    <stop offset="100%" stopColor="#A7F3D0" />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="var(--muted-foreground)" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--muted-foreground)" fontSize={10} tickLine={false} axisLine={false} domain={[0, 100]} />
                <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', borderRadius: '8px', color: 'var(--foreground)' }} />
                <Bar dataKey="score" fill="url(#barColor)" radius={[4, 4, 4, 4]} barSize={12} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Achievements */}
        <div className="lg:col-span-3 glass-card rounded-2xl p-6">
           <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-foreground">Achievements</h3>
            <button className="text-xs font-bold text-eco-primary hover:underline">View All</button>
          </div>
          <div className="grid grid-cols-3 gap-y-6 gap-x-2">
            {[
              { name: 'Eco Starter', color: 'bg-green-100 text-green-600', icon: '🌱' },
              { name: 'Smooth Driver', color: 'bg-blue-100 text-blue-600', icon: '🌊' },
              { name: 'Fuel Saver', color: 'bg-yellow-100 text-yellow-600', icon: '⛽' },
              { name: 'Green Rider', color: 'bg-emerald-100 text-emerald-600', icon: '🚲' },
              { name: 'Eco Champion', color: 'bg-purple-100 text-purple-600', icon: '👑' },
            ].map((badge, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-2">
                <div className={`w-12 h-12 rounded-full ${badge.color} flex items-center justify-center text-xl shadow-sm`}>
                  {badge.icon}
                </div>
                <span className="text-[10px] font-bold text-foreground max-w-[60px] leading-tight">{badge.name}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
