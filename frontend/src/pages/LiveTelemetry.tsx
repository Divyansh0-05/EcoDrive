import React, { useState, useEffect, useRef } from 'react';
import { Activity, Play, Square, AlertTriangle, Zap, CheckCircle2, TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface TelemetryPoint {
  time: string;
  speed: number;
  rpm: number;
}

interface LogEvent {
  id: string;
  type: 'warning' | 'info' | 'success';
  message: string;
  timestamp: string;
}

export const LiveTelemetry: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [data, setData] = useState<TelemetryPoint[]>([]);
  const [events, setEvents] = useState<LogEvent[]>([]);
  
  const [currentSpeed, setCurrentSpeed] = useState(0);
  const [currentRpm, setCurrentRpm] = useState(0);
  const [ecoScore, setEcoScore] = useState(100);

  const speedRef = useRef(0);
  const rpmRef = useRef(0);

  // Simulation Interval
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning) {
      interval = setInterval(() => {
        // Simulate realistic driving physics
        const isAccelerating = Math.random() > 0.4;
        const speedChange = isAccelerating ? (Math.random() * 5) : -(Math.random() * 7);
        
        let newSpeed = speedRef.current + speedChange;
        newSpeed = Math.max(0, Math.min(newSpeed, 140)); // Max 140 km/h, min 0
        
        // RPM correlates with speed but has some jitter
        let newRpm = newSpeed > 0 ? (newSpeed * 30) + 800 + (Math.random() * 500) : 0;
        newRpm = Math.max(0, Math.min(newRpm, 7000)); // Max 7000 RPM

        speedRef.current = newSpeed;
        rpmRef.current = newRpm;

        setCurrentSpeed(Math.round(newSpeed));
        setCurrentRpm(Math.round(newRpm));

        // Generate events based on extreme changes
        if (speedChange > 4) {
          addEvent('warning', 'Rapid Acceleration Detected');
          setEcoScore(prev => Math.max(0, prev - 2));
        } else if (speedChange < -5) {
          addEvent('warning', 'Hard Braking Detected');
          setEcoScore(prev => Math.max(0, prev - 3));
        } else if (newSpeed > 100) {
          addEvent('warning', 'High Speed Cruising - Lower Efficiency');
          setEcoScore(prev => Math.max(0, prev - 1));
        } else if (newSpeed > 40 && newSpeed < 80 && Math.abs(speedChange) < 1) {
          if (Math.random() > 0.8) {
            addEvent('success', 'Optimal Eco-Cruising Speed');
            setEcoScore(prev => Math.min(100, prev + 1));
          }
        }

        setData(prev => {
          const newData = [...prev, {
            time: new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second:'2-digit' }),
            speed: Math.round(newSpeed),
            rpm: Math.round(newRpm)
          }];
          if (newData.length > 20) newData.shift();
          return newData;
        });
      }, 1000);
    } else {
      // Coast down to 0 if stopped
      interval = setInterval(() => {
        if (speedRef.current > 0) {
          speedRef.current = Math.max(0, speedRef.current - 5);
          rpmRef.current = Math.max(0, rpmRef.current - 500);
          setCurrentSpeed(Math.round(speedRef.current));
          setCurrentRpm(Math.round(rpmRef.current));
        }
      }, 500);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  const addEvent = (type: 'warning' | 'info' | 'success', message: string) => {
    setEvents(prev => {
      const newEvents = [{
        id: Math.random().toString(),
        type,
        message,
        timestamp: new Date().toLocaleTimeString()
      }, ...prev];
      return newEvents.slice(0, 8); // Keep last 8 events
    });
  };

  const handleToggle = () => {
    if (!isRunning) {
      addEvent('info', 'Engine Started. Telemetry active.');
      setEcoScore(100);
      setData([]);
    } else {
      addEvent('info', 'Engine Stopped.');
    }
    setIsRunning(!isRunning);
  };

  return (
    <div className="flex-1 bg-background p-8 overflow-y-auto">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Live Telemetry</h1>
            <p className="text-gray-400 mt-2">Real-time vehicle data streaming simulation.</p>
          </div>
          <button
            onClick={handleToggle}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
              isRunning 
                ? 'bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500/20' 
                : 'bg-eco-glow/10 text-eco-glow border border-eco-glow/20 hover:bg-eco-glow/20 shadow-glow-green'
            }`}
          >
            {isRunning ? <Square className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            {isRunning ? 'Stop Engine' : 'Start Engine'}
          </button>
        </div>

        {/* Top Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Activity className="w-24 h-24" />
            </div>
            <h3 className="text-gray-400 font-medium mb-2">Current Speed</h3>
            <div className="flex items-baseline gap-2">
              <span className="text-6xl font-bold text-white font-mono">{currentSpeed}</span>
              <span className="text-gray-500">km/h</span>
            </div>
          </div>
          
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10">
              <TrendingUp className="w-24 h-24" />
            </div>
            <h3 className="text-gray-400 font-medium mb-2">Engine RPM</h3>
            <div className="flex items-baseline gap-2">
              <span className="text-6xl font-bold text-white font-mono">{currentRpm}</span>
              <span className="text-gray-500">RPM</span>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm relative overflow-hidden flex flex-col justify-center">
            <h3 className="text-gray-400 font-medium mb-2">Live Eco Score</h3>
            <div className="flex items-center gap-4">
              <div className="flex-1 bg-white/10 rounded-full h-4 overflow-hidden">
                <div 
                  className={`h-full transition-all duration-300 ${
                    ecoScore > 80 ? 'bg-eco-glow' : ecoScore > 50 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${ecoScore}%` }}
                />
              </div>
              <span className="text-2xl font-bold text-white w-12 text-right">{ecoScore}</span>
            </div>
          </div>
        </div>

        {/* Chart and Events */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Chart */}
          <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
            <h3 className="text-lg font-bold text-white mb-6">Speed Telemetry Graph</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                  <XAxis dataKey="time" stroke="#ffffff50" fontSize={12} />
                  <YAxis stroke="#ffffff50" fontSize={12} domain={[0, 150]} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#030504', border: '1px solid #ffffff20', borderRadius: '8px' }}
                    itemStyle={{ color: '#00ffcc' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="speed" 
                    stroke="#00ffcc" 
                    strokeWidth={3} 
                    dot={false}
                    isAnimationActive={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Event Log */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-6">
              <Zap className="w-5 h-5 text-eco-glow" />
              <h3 className="text-lg font-bold text-white">Live Event Feed</h3>
            </div>
            <div className="space-y-4">
              {events.length === 0 && (
                <p className="text-gray-500 text-sm text-center py-8">Start the engine to capture events.</p>
              )}
              {events.map(event => (
                <div 
                  key={event.id}
                  className={`p-3 rounded-xl border flex gap-3 text-sm animate-in fade-in slide-in-from-right-4 duration-300 ${
                    event.type === 'warning' ? 'bg-red-500/10 border-red-500/20 text-red-200' :
                    event.type === 'success' ? 'bg-eco-glow/10 border-eco-glow/20 text-eco-glow' :
                    'bg-white/5 border-white/10 text-gray-300'
                  }`}
                >
                  <div className="shrink-0 mt-0.5">
                    {event.type === 'warning' && <AlertTriangle className="w-4 h-4 text-red-400" />}
                    {event.type === 'success' && <CheckCircle2 className="w-4 h-4 text-eco-glow" />}
                    {event.type === 'info' && <Activity className="w-4 h-4 text-blue-400" />}
                  </div>
                  <div>
                    <p className="font-medium">{event.message}</p>
                    <p className="text-xs opacity-50 mt-1">{event.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
