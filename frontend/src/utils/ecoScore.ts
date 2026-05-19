export const getScoreColor = (score: number) => {
  if (score >= 80) return { bg: 'bg-[#1b2a22]', text: 'text-[#10b981]', border: 'border-[#10b981]/30', label: 'Excellent 🌿' };
  if (score >= 60) return { bg: 'bg-[#2a291b]', text: 'text-[#f59e0b]', border: 'border-[#f59e0b]/30', label: 'Good 🍃' };
  if (score >= 40) return { bg: 'bg-[#2a211b]', text: 'text-[#f97316]', border: 'border-[#f97316]/30', label: 'Fair 🍂' };
  return { bg: 'bg-[#2a1b1b]', text: 'text-[#ef4444]', border: 'border-[#ef4444]/30', label: 'Poor 💨' };
};

export const formatCO2 = (kg: number | string) => {
  const val = typeof kg === 'string' ? parseFloat(kg) : kg;
  if (isNaN(val)) return '0.00 kg';
  return `${val.toFixed(2)} kg`;
};

export const formatDistance = (km: number | string) => {
  const val = typeof km === 'string' ? parseFloat(km) : km;
  if (isNaN(val)) return '0.0 km';
  return `${val.toFixed(1)} km`;
};
