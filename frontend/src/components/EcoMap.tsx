import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';

// Create custom icons using divIcon for modern styling
const createCustomIcon = (color: string) => {
  return new L.DivIcon({
    className: 'bg-transparent',
    html: `
      <div class="relative w-8 h-8 flex items-center justify-center">
        <div class="absolute inset-0 rounded-full opacity-30 animate-ping" style="background-color: ${color}"></div>
        <div class="relative w-4 h-4 rounded-full border-2 border-white shadow-sm" style="background-color: ${color}"></div>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16]
  });
};

const startIcon = createCustomIcon('#10B981'); // Eco Green
const endIcon = createCustomIcon('#3B82F6');   // Blue
const trafficIcon = createCustomIcon('#EF4444'); // Red

interface EcoMapProps {
  center?: [number, number];
  ecoRoute?: [number, number][];
  trafficRoute?: [number, number][];
}

// Helper component to auto-center map
const MapUpdater: React.FC<{ center: [number, number] }> = ({ center }) => {
  const map = useMap();
  React.useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
};

export const EcoMap: React.FC<EcoMapProps> = ({ 
  center = [28.6139, 77.2090], // New Delhi
  ecoRoute = [
    [28.6139, 77.2090],
    [28.5900, 77.2200],
    [28.5700, 77.2400],
    [28.5500, 77.2600], // Okhla / Noida direction
  ],
  trafficRoute = [
    [28.6139, 77.2090],
    [28.5950, 77.2300],
    [28.5800, 77.2500],
    [28.5500, 77.2600],
  ]
}) => {
  return (
    <div className="w-full h-full relative z-0">
      <MapContainer 
        center={center} 
        zoom={13} 
        style={{ height: '100%', width: '100%', zIndex: 0 }}
        zoomControl={false}
      >
        <MapUpdater center={center} />
        
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />

        {/* Eco Route Line */}
        {ecoRoute.length > 0 && (
          <Polyline 
            positions={ecoRoute} 
            pathOptions={{ color: '#10B981', weight: 4, dashArray: '5, 10', opacity: 0.8 }} 
          />
        )}

        {/* Traffic Route Line */}
        {trafficRoute.length > 0 && (
          <Polyline 
            positions={trafficRoute} 
            pathOptions={{ color: '#EF4444', weight: 4, opacity: 0.6 }} 
          />
        )}

        {/* Start Point */}
        <Marker position={center} icon={startIcon}>
          <Popup className="rounded-xl overflow-hidden shadow-soft border-0">
            <div className="p-1">
              <strong className="text-foreground text-sm">Start Location</strong>
            </div>
          </Popup>
        </Marker>

        {/* Eco End Point */}
        {ecoRoute.length > 0 && (
          <Marker position={ecoRoute[ecoRoute.length - 1]} icon={endIcon}>
            <Popup className="rounded-xl overflow-hidden shadow-soft border-0">
              <div className="p-1">
                <strong className="text-eco-primary text-sm flex items-center gap-1">Eco Route</strong>
                <p className="text-muted-foreground text-xs m-0 mt-1">Recommended</p>
              </div>
            </Popup>
          </Marker>
        )}

        {/* Traffic End Point */}
        {trafficRoute.length > 0 && (
          <Marker position={trafficRoute[trafficRoute.length - 1]} icon={trafficIcon}>
             <Popup className="rounded-xl overflow-hidden shadow-soft border-0">
              <div className="p-1">
                <strong className="text-red-500 text-sm">Normal Route</strong>
                <p className="text-muted-foreground text-xs m-0 mt-1">Heavy congestion</p>
              </div>
            </Popup>
          </Marker>
        )}

      </MapContainer>
      
      {/* Map Overlay Controls */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2 pointer-events-none">
        <div className="bg-card/90 backdrop-blur-sm border border-border p-3 rounded-xl shadow-soft pointer-events-auto">
          <h4 className="text-xs font-bold text-foreground mb-2 uppercase tracking-wider">Live Traffic</h4>
          <div className="flex flex-col gap-1.5">
             <div className="flex items-center gap-2">
               <div className="w-3 h-3 rounded-full bg-eco-glow border-2 border-white"></div>
               <span className="text-[10px] text-muted-foreground font-medium">Eco Route (Clear)</span>
             </div>
             <div className="flex items-center gap-2">
               <div className="w-3 h-3 rounded-full bg-red-500 border-2 border-white"></div>
               <span className="text-[10px] text-muted-foreground font-medium">Heavy Traffic</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
