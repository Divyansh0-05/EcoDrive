import React, { useState, useEffect, useRef } from 'react';
import api from '../services/api';
import { Bot, Send, User, Sparkles, AlertTriangle, ShieldCheck } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export const AIAssistant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hello! I'm EcoBot, your personal AI Driving Assistant. I can analyze your telemetry and help you optimize your driving to save fuel and reduce emissions. What would you like to know?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [contextData, setContextData] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Fetch telemetry context on load
  useEffect(() => {
    api.get('/dashboard').then(res => {
      const data = res.data.data;
      const totalBrakes = data.recentTrips.reduce((acc: number, t: any) => acc + (t.hard_braking_count || 0), 0);
      const totalAccels = data.recentTrips.reduce((acc: number, t: any) => acc + (t.hard_acceleration_count || 0), 0);
      const avgEcoScore = data.recentTrips.length > 0 
        ? (data.recentTrips.reduce((acc: number, t: any) => acc + parseFloat(t.eco_score), 0) / data.recentTrips.length).toFixed(0)
        : '0';

      setContextData({
        totalTrips: data.user.total_trips,
        avgEcoScore,
        totalBrakes,
        totalAccels
      });
    }).catch(err => console.error("Could not load dashboard context", err));
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const res = await api.post('/ai/chat', {
        message: userMsg.content,
        context: contextData
      });

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: res.data.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I'm having trouble connecting to my neural network right now. Please try again later.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex-1 h-screen bg-background flex flex-col md:flex-row overflow-hidden relative">
      {/* Background Glow */}
      <div className="absolute top-[20%] left-[50%] w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none translate-x-[-50%]" />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col max-w-5xl mx-auto w-full p-4 md:p-8 h-full">
        
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
            <Bot className="w-8 h-8 text-eco-glow" />
            AI Driving Assistant
          </h1>
          <p className="text-gray-400 mt-2 text-sm">Powered by advanced telemetry analysis.</p>
        </div>

        {/* Chat Window */}
        <div className="flex-1 glass-card rounded-2xl flex flex-col overflow-hidden border border-white/10 shadow-xl bg-[#0a0f0d]/80 relative z-10">
          
          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {/* AI Avatar */}
                {msg.role === 'assistant' && (
                  <div className="w-10 h-10 rounded-xl bg-eco-bg border border-eco-glow/20 flex items-center justify-center shrink-0 shadow-glow-green">
                    <Bot className="w-5 h-5 text-eco-glow" />
                  </div>
                )}
                
                {/* Message Bubble */}
                <div className={`max-w-[80%] rounded-2xl p-5 ${
                  msg.role === 'user' 
                    ? 'bg-eco-glow/10 border border-eco-glow/20 text-white rounded-tr-sm' 
                    : 'bg-white/5 border border-white/10 text-gray-200 rounded-tl-sm'
                }`}>
                  <div className="prose prose-invert prose-sm max-w-none">
                    {msg.role === 'assistant' ? (
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    ) : (
                      <p className="m-0 leading-relaxed text-[15px]">{msg.content}</p>
                    )}
                  </div>
                  <span className={`text-[10px] mt-2 block ${msg.role === 'user' ? 'text-eco-glow/50 text-right' : 'text-gray-500'}`}>
                    {msg.timestamp}
                  </span>
                </div>

                {/* User Avatar */}
                {msg.role === 'user' && (
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                    <User className="w-5 h-5 text-gray-400" />
                  </div>
                )}
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex gap-4 justify-start">
                <div className="w-10 h-10 rounded-xl bg-eco-bg border border-eco-glow/20 flex items-center justify-center shrink-0 shadow-glow-green">
                  <Bot className="w-5 h-5 text-eco-glow animate-pulse" />
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-sm p-5 flex items-center gap-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-black/40 border-t border-white/5">
            <form onSubmit={handleSend} className="relative flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about your driving habits, eco scores, or route tips..."
                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-5 pr-14 text-white placeholder-gray-500 focus:outline-none focus:border-eco-glow/50 transition-colors"
                disabled={isTyping}
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="absolute right-2 p-2.5 rounded-lg bg-eco-glow text-black font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-eco-glow/90 transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Side Context Panel (Desktop Only) */}
      <div className="hidden xl:flex w-[320px] bg-black/20 border-l border-white/5 p-6 flex-col z-10">
        <h3 className="text-sm font-extrabold text-white uppercase tracking-wider mb-6 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-eco-glow" />
          Active AI Context
        </h3>
        
        <div className="space-y-4">
          <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
            <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Avg Eco Score</span>
            <div className="text-2xl font-black text-white mt-1">{contextData?.avgEcoScore || '--'}</div>
          </div>
          
          <div className="p-4 bg-red-500/5 border border-red-500/10 rounded-xl">
            <span className="text-[10px] text-red-400 uppercase tracking-widest font-bold flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" /> Hard Brakes
            </span>
            <div className="text-2xl font-black text-white mt-1">{contextData?.totalBrakes ?? '--'}</div>
          </div>

          <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-xl">
            <span className="text-[10px] text-emerald-400 uppercase tracking-widest font-bold flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" /> Total Trips Analyzed
            </span>
            <div className="text-2xl font-black text-white mt-1">{contextData?.totalTrips ?? '--'}</div>
          </div>
        </div>

        <p className="text-xs text-gray-500 mt-8 leading-relaxed">
          The AI uses your recent telemetry logs to provide personalized recommendations for improving driving efficiency.
        </p>
      </div>
    </div>
  );
};
