import React from 'react';
import { ShieldCheck, MapPin, Award, Star, Clock, CheckCircle2, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export default function WorkerCard({ worker, onHire, onViewProfile }) {
  const getBadgeColor = (badge) => {
    if (badge?.includes('Elite')) return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20';
    if (badge?.includes('Top')) return 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20';
    if (badge?.includes('Pro')) return 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20';
    return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20';
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="glass-card rounded-2xl p-5 relative overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-lg hover:shadow-2xl transition-all group flex flex-col justify-between"
    >
      {/* Top Banner Accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-emerald-500 to-indigo-500 opacity-80 group-hover:opacity-100 transition-opacity" />

      <div>
        {/* Header: Photo + Name + Match Badge */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <img
                src={worker.photo}
                alt={worker.name}
                className="w-14 h-14 rounded-2xl object-cover ring-2 ring-blue-500/30 group-hover:ring-blue-500 transition-all shadow-md"
              />
              {worker.verified && (
                <div className="absolute -bottom-1 -right-1 bg-blue-600 text-white rounded-full p-0.5 ring-2 ring-white dark:ring-slate-900" title="Identity & Face Verified">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex items-center gap-1.5">
                {worker.name}
              </h3>
              <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                <span>{worker.location}</span>
                <span className="font-semibold text-slate-700 dark:text-slate-300">({worker.distance_km} km)</span>
              </div>
            </div>
          </div>

          {/* AI Match Percentage Badge */}
          {worker.match_percentage && (
            <div className="shrink-0 text-right">
              <div className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-extrabold text-xs">
                <Zap className="w-3 h-3 fill-emerald-500" />
                <span>{worker.match_percentage}% Match</span>
              </div>
            </div>
          )}
        </div>

        {/* Badge & Category */}
        <div className="flex items-center space-x-2 mb-3">
          <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${getBadgeColor(worker.badge)}`}>
            {worker.badge || 'Verified Newbie'}
          </span>
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
            {worker.category}
          </span>
        </div>

        {/* Skills Pills */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {worker.skills.map((skill, idx) => (
            <span
              key={idx}
              className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-900/40"
            >
              {skill}
            </span>
          ))}
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800/80 mb-4 text-center">
          <div>
            <div className="text-[10px] uppercase font-bold text-slate-400">Experience</div>
            <div className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-0.5">{worker.experience}</div>
          </div>
          <div>
            <div className="text-[10px] uppercase font-bold text-slate-400">Daily Wage</div>
            <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">₹{worker.daily_wage}</div>
          </div>
          <div>
            <div className="text-[10px] uppercase font-bold text-slate-400">Rating</div>
            <div className="text-xs font-bold text-amber-500 mt-0.5 flex items-center justify-center gap-0.5">
              <Star className="w-3 h-3 fill-amber-400" />
              <span>{worker.rating || 4.9}</span>
            </div>
          </div>
        </div>

        {/* Trust Score Progress Bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-semibold text-slate-600 dark:text-slate-400 flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-blue-500" /> Trust Score
            </span>
            <span className="font-extrabold text-blue-600 dark:text-blue-400">{worker.trust_score} / 100</span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
            <div
              className="gradient-bg h-full rounded-full transition-all duration-500"
              style={{ width: `${worker.trust_score}%` }}
            />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800/80">
        <button
          onClick={() => onViewProfile(worker)}
          className="w-full py-2 px-3 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
        >
          View Profile
        </button>
        <button
          onClick={() => onHire(worker)}
          className="w-full py-2 px-3 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-1"
        >
          <Zap className="w-3.5 h-3.5 fill-white" /> Hire Worker
        </button>
      </div>
    </motion.div>
  );
}
