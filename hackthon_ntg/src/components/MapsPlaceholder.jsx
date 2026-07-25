import React, { useState } from 'react';
import { MapPin, Navigation, Compass, Layers, ShieldCheck, Zap } from 'lucide-react';

export default function MapsPlaceholder({ workers = [], selectedLocation = "Madhapur, Hyderabad" }) {
  const [hoveredWorker, setHoveredWorker] = useState(null);

  // Map pins simulation around Hyderabad IT hub coordinates
  const pins = workers.slice(0, 8).map((w, idx) => {
    // Generate styled offset positions on virtual map grid
    const offsets = [
      { top: '35%', left: '42%' },
      { top: '48%', left: '55%' },
      { top: '25%', left: '62%' },
      { top: '60%', left: '38%' },
      { top: '30%', left: '28%' },
      { top: '70%', left: '68%' },
      { top: '52%', left: '78%' },
      { top: '40%', left: '18%' }
    ];
    return {
      worker: w,
      pos: offsets[idx % offsets.length]
    };
  });

  return (
    <div className="relative w-full h-80 sm:h-96 rounded-2xl overflow-hidden glass-card border border-slate-200 dark:border-slate-800 shadow-xl flex flex-col justify-between p-4 group">
      
      {/* Simulated Map Background Canvas Grid */}
      <div className="absolute inset-0 bg-slate-100 dark:bg-slate-900/90 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px] opacity-20 dark:opacity-40" />
        
        {/* Radar Proximity Animation Circle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-blue-500/30 rounded-full animate-pulse-glow" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-emerald-500/20 rounded-full" />
      </div>

      {/* Map Header Overlay */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center space-x-2 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm text-xs font-bold text-slate-900 dark:text-white">
          <Navigation className="w-4 h-4 text-blue-500 animate-spin" style={{ animationDuration: '8s' }} />
          <span>Geo-AI Radar: {selectedLocation}</span>
        </div>

        <div className="flex items-center space-x-2 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-2.5 py-1 rounded-xl border border-slate-200 dark:border-slate-800 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
          <Zap className="w-3.5 h-3.5 fill-emerald-500" />
          <span>{workers.length} Active Workers Near You</span>
        </div>
      </div>

      {/* Map Pins Grid */}
      <div className="relative z-10 flex-1 my-4">
        
        {/* Center Employer Location Marker */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
          <div className="w-6 h-6 rounded-full bg-blue-600 ring-4 ring-blue-500/30 flex items-center justify-center text-white shadow-lg animate-bounce">
            <MapPin className="w-4 h-4" />
          </div>
          <span className="mt-1 px-2 py-0.5 rounded-md bg-slate-900 text-white text-[10px] font-bold shadow-md">
            Job Location
          </span>
        </div>

        {/* Worker Location Markers */}
        {pins.map(({ worker, pos }) => (
          <div
            key={worker.id}
            style={{ top: pos.top, left: pos.left }}
            onMouseEnter={() => setHoveredWorker(worker)}
            onMouseLeave={() => setHoveredWorker(null)}
            className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group/pin z-20"
          >
            <div className="relative flex items-center justify-center">
              <div className="w-8 h-8 rounded-full ring-2 ring-emerald-500 overflow-hidden shadow-md group-hover/pin:scale-125 transition-transform bg-white">
                <img src={worker.photo} alt={worker.name} className="w-full h-full object-cover" />
              </div>
              {worker.verified && (
                <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white rounded-full p-0.5">
                  <ShieldCheck className="w-2.5 h-2.5" />
                </div>
              )}
            </div>

            {/* Hover Tooltip Card */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover/pin:block w-44 p-2.5 rounded-xl glass-panel bg-white/95 dark:bg-slate-900/95 shadow-xl border border-slate-200 dark:border-slate-700 text-left text-xs z-30">
              <div className="font-bold text-slate-900 dark:text-white">{worker.name}</div>
              <div className="text-[10px] text-slate-500">{worker.skills[0]} • {worker.distance_km} km</div>
              <div className="mt-1 flex items-center justify-between text-[11px]">
                <span className="text-emerald-600 font-bold">₹{worker.daily_wage}/day</span>
                <span className="text-blue-500 font-bold">Score: {worker.trust_score}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Map Footer Bar */}
      <div className="relative z-10 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-2 rounded-xl border border-slate-200 dark:border-slate-800">
        <span className="flex items-center gap-1">
          <Compass className="w-3.5 h-3.5 text-blue-500" /> Radius: 10 km Coverage
        </span>
        <span className="font-medium">Hyderabad Metro AI Grid</span>
      </div>

    </div>
  );
}
