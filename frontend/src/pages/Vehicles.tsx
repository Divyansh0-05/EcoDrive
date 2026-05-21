import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Car, Plus, Trash2, CheckCircle2, ShieldAlert } from 'lucide-react';

interface Vehicle {
  id: number;
  nickname: string;
  make: string;
  model: string;
  year: number;
  fuel_type: string;
  is_default: boolean;
}

export const Vehicles: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  // Form states
  const [nickname, setNickname] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('2023');
  const [fuelType, setFuelType] = useState('petrol');
  const [submitting, setSubmitting] = useState(false);

  const fetchVehicles = () => {
    setLoading(true);
    api.get('/vehicles')
      .then(res => setVehicles(res.data.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const handleAddVehicle = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.post('/vehicles', {
        nickname,
        make,
        model,
        year: parseInt(year),
        fuel_type: fuelType,
      });
      setShowAddModal(false);
      // Reset form
      setNickname('');
      setMake('');
      setModel('');
      setYear('2023');
      setFuelType('petrol');
      fetchVehicles();
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleSetDefault = async (id: number) => {
    try {
      await api.patch(`/vehicles/${id}/set-default`);
      fetchVehicles();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/vehicles/${id}`);
      fetchVehicles();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex-1 min-h-screen bg-background p-8 overflow-y-auto font-sans relative select-none">
      <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-eco-glow/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-foreground flex items-center gap-2">
            <Car className="w-6 h-6 text-eco-glow" />
            Garage
          </h1>
          <p className="text-muted-foreground text-sm mt-1">Configure your active vehicles for telemetry adjustment.</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-eco-glow hover:bg-eco-glow/90 text-black font-bold py-2.5 px-4 rounded-xl text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-glow-green"
        >
          <Plus className="w-4 h-4" />
          Add Vehicle
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="w-12 h-12 border-2 border-eco-glow/20 border-t-eco-glow rounded-full animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicles.map((v) => (
            <div key={v.id} className={`glass-card rounded-2xl p-5 border flex flex-col justify-between h-[200px] relative transition-all ${
              v.is_default ? 'border-eco-glow/20 shadow-glow-green' : 'border-border'
            }`}>
              <div>
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-sm font-bold text-foreground block">{v.nickname}</span>
                    <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold block mt-0.5">{v.make} {v.model} ({v.year})</span>
                  </div>
                  <span className={`text-[9px] font-extrabold uppercase px-2 py-1 rounded-md border ${
                    v.fuel_type === 'electric' 
                      ? 'bg-emerald-950/40 text-[#10b981] border-emerald-500/20' 
                      : 'bg-card text-muted-foreground border-border'
                  }`}>
                    {v.fuel_type}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center mt-6 border-t border-border pt-4">
                {v.is_default ? (
                  <div className="flex items-center gap-1 text-[#10b981] text-xs font-bold uppercase tracking-wider">
                    <CheckCircle2 className="w-4 h-4" />
                    Default Vehicle
                  </div>
                ) : (
                  <button
                    onClick={() => handleSetDefault(v.id)}
                    className="text-[10px] font-extrabold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Set as Default
                  </button>
                )}

                <button
                  onClick={() => handleDelete(v.id)}
                  className="text-muted-foreground hover:text-red-400 p-2 hover:bg-red-500/5 rounded-lg border border-transparent hover:border-red-500/10 transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          {vehicles.length === 0 && (
            <div className="col-span-full py-16 flex flex-col items-center justify-center border border-dashed border-border rounded-2xl">
              <ShieldAlert className="w-10 h-10 text-gray-600 mb-3" />
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">No vehicles configured</span>
              <p className="text-[10px] text-gray-600 mt-1 max-w-[280px] text-center leading-normal">Configure a vehicle to accurately calculate baseline fuel efficiencies.</p>
            </div>
          )}
        </div>
      )}

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-[450px] glass-card rounded-2xl p-6 border border-border relative flex flex-col">
            <h2 className="text-lg font-bold text-foreground mb-1">Add Vehicle to Garage</h2>
            <p className="text-xs text-muted-foreground mb-6">Enter vehicle specifics to match efficiency profiles.</p>

            <form onSubmit={handleAddVehicle} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Nickname</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. My daily driver"
                  className="w-full bg-card border border-border rounded-xl py-2 px-3 text-sm text-foreground focus:outline-none focus:border-eco-glow/40 focus:ring-1 focus:ring-eco-glow/40"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Make</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Toyota"
                    className="w-full bg-card border border-border rounded-xl py-2 px-3 text-sm text-foreground focus:outline-none focus:border-eco-glow/40 focus:ring-1 focus:ring-eco-glow/40"
                    value={make}
                    onChange={(e) => setMake(e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Model</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Corolla"
                    className="w-full bg-card border border-border rounded-xl py-2 px-3 text-sm text-foreground focus:outline-none focus:border-eco-glow/40 focus:ring-1 focus:ring-eco-glow/40"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Year</label>
                  <input
                    type="number"
                    required
                    className="w-full bg-card border border-border rounded-xl py-2 px-3 text-sm text-foreground focus:outline-none focus:border-eco-glow/40 focus:ring-1 focus:ring-eco-glow/40"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Fuel Type</label>
                  <select
                    className="w-full bg-card border border-border rounded-xl py-2 px-3 text-sm text-foreground focus:outline-none focus:border-eco-glow/40 focus:ring-1 focus:ring-eco-glow/40"
                    value={fuelType}
                    onChange={(e) => setFuelType(e.target.value)}
                  >
                    <option value="petrol">Petrol</option>
                    <option value="diesel">Diesel</option>
                    <option value="electric">Electric</option>
                    <option value="hybrid">Hybrid</option>
                    <option value="lpg">LPG</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 justify-end pt-4 border-t border-border">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-border hover:bg-card rounded-xl text-xs font-bold uppercase text-muted-foreground tracking-wider transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2 bg-eco-glow hover:bg-eco-glow/90 disabled:opacity-50 text-black font-bold rounded-xl text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5 shadow-glow-green"
                >
                  Confirm Vehicle
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
