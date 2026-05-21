import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { Trips } from './pages/Trips';
import { Vehicles } from './pages/Vehicles';
import { Badges } from './pages/Badges';
import { Leaderboard } from './pages/Leaderboard';
import { Landing } from './pages/Landing';
import { LiveTelemetry } from './pages/LiveTelemetry';
import { AIAssistant } from './pages/AIAssistant';
import { RoutePlanner } from './pages/RoutePlanner';
import { Sidebar } from './components/Sidebar';
import { TopHeader } from './components/TopHeader';
import { ProtectedRoute } from './components/ProtectedRoute';

const AppLayout: React.FC = () => {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <TopHeader />
        <div className="flex-1 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Protected Dashboard Layout */}
        <Route element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/ai-assistant" element={<AIAssistant />} />
          <Route path="/route-planner" element={<RoutePlanner />} />
          <Route path="/live-telemetry" element={<LiveTelemetry />} />
          <Route path="/trips" element={<Trips />} />
          <Route path="/vehicles" element={<Vehicles />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/badges" element={<Badges />} />
        </Route>

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
