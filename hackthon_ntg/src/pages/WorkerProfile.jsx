import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { calculateTrustScore } from '../utils/aiServices';
import { 
  ShieldCheck, 
  MapPin, 
  Award, 
  Star, 
  Clock, 
  CheckCircle2, 
  Briefcase, 
  Zap, 
  ArrowLeft,
  Calendar,
  AlertTriangle,
  RotateCcw
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function WorkerProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { workers, selectedWorker, hireWorkerForJob } = useApp();

  const worker = workers.find(w => w.id === id) || selectedWorker || workers[0];

  // Interactive Trust Score Simulator states
  const [compJobs, setCompJobs] = useState(worker.completed_jobs || 30);
  const [workerRating, setWorkerRating] = useState(worker.rating || 4.9);
  const [cancRate, setCancRate] = useState(worker.cancellation_rate || 1.0);
  const [lateCount, setLateCount] = useState(worker.late_arrivals || 0);

  const computedTrust = calculateTrustScore({
    completed_jobs: compJobs,
    rating: workerRating,
    verified: worker.verified,
    cancellation_rate: cancRate,
    late_arrivals: lateCount
  });

  const handleHireClick = () => {
    hireWorkerForJob(worker);
    navigate('/live-status');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center space-x-2 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-blue-500 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> <span>Back to Worker Dashboard</span>
      </button>

      {/* Main Profile Header Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-2xl relative overflow-hidden"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img
                src={worker.photo}
                alt={worker.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl object-cover ring-4 ring-blue-500/30 shadow-xl"
              />
              {worker.verified && (
                <div className="absolute -bottom-1 -right-1 bg-blue-600 text-white rounded-full p-1 ring-2 ring-white dark:ring-slate-900" title="Identity & Face Verified">
                  <ShieldCheck className="w-4 h-4" />
                </div>
              )}
            </div>

            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">{worker.name}</h1>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  {computedTrust.badge}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-1">
                <MapPin className="w-4 h-4 text-blue-500" /> {worker.location} ({worker.distance_km} km away)
              </p>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {worker.skills.map((s, idx) => (
                  <span key={idx} className="px-2.5 py-0.5 rounded-lg text-xs font-medium bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-900">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Action CTA */}
          <div className="w-full sm:w-auto text-right">
            <button
              onClick={handleHireClick}
              className="w-full sm:w-auto px-6 py-3 rounded-2xl font-bold text-sm text-white bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-500/25 transition-all flex items-center justify-center space-x-2"
            >
              <Zap className="w-4 h-4 fill-white" />
              <span>Hire Worker Now</span>
            </button>
          </div>
        </div>

        {/* METRICS STATS BAR */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 text-center">
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60">
            <div className="text-[10px] uppercase font-bold text-slate-400">Completed Jobs</div>
            <div className="text-lg font-black text-slate-900 dark:text-white mt-0.5">{compJobs} Jobs</div>
          </div>
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60">
            <div className="text-[10px] uppercase font-bold text-slate-400">Rating Score</div>
            <div className="text-lg font-black text-amber-500 mt-0.5 flex items-center justify-center gap-1">
              <Star className="w-4 h-4 fill-amber-400" /> {workerRating}
            </div>
          </div>
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60">
            <div className="text-[10px] uppercase font-bold text-slate-400">Daily Wage</div>
            <div className="text-lg font-black text-emerald-600 dark:text-emerald-400 mt-0.5">₹{worker.daily_wage}</div>
          </div>
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60">
            <div className="text-[10px] uppercase font-bold text-slate-400">Experience</div>
            <div className="text-lg font-black text-blue-600 dark:text-blue-400 mt-0.5">{worker.experience}</div>
          </div>
        </div>
      </motion.div>

      {/* AI FEATURE 3: TRUST SCORE SIMULATOR & BREAKDOWN */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card rounded-3xl p-6 sm:p-8 border border-purple-500/30 shadow-xl space-y-6"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Award className="w-6 h-6 text-purple-500" />
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
              AI Feature 3: Dynamic Trust Score Predictor
            </h3>
          </div>
          <div className="text-2xl font-black text-purple-600 dark:text-purple-400">
            {computedTrust.trust_score} <span className="text-xs font-semibold text-slate-400">/ 100</span>
          </div>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-400">
          The Trust Score is continuously computed from Completed Jobs (+), Rating (+), Verification (+), Cancellation Rate (-), and Late Arrivals (-).
        </p>

        {/* Interactive Simulator Sliders */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs">
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
              Completed Jobs: <span className="text-blue-600 font-extrabold">{compJobs}</span>
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={compJobs}
              onChange={(e) => setCompJobs(parseInt(e.target.value))}
              className="w-full accent-blue-600"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
              Rating Stars: <span className="text-amber-500 font-extrabold">{workerRating}★</span>
            </label>
            <input
              type="range"
              min="3.0"
              max="5.0"
              step="0.1"
              value={workerRating}
              onChange={(e) => setWorkerRating(parseFloat(e.target.value))}
              className="w-full accent-amber-500"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
              Cancellation Rate: <span className="text-rose-500 font-extrabold">{cancRate}%</span>
            </label>
            <input
              type="range"
              min="0"
              max="15"
              step="0.5"
              value={cancRate}
              onChange={(e) => setCancRate(parseFloat(e.target.value))}
              className="w-full accent-rose-500"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
              Late Arrivals Count: <span className="text-orange-500 font-extrabold">{lateCount}</span>
            </label>
            <input
              type="range"
              min="0"
              max="10"
              value={lateCount}
              onChange={(e) => setLateCount(parseInt(e.target.value))}
              className="w-full accent-orange-500"
            />
          </div>
        </div>
      </motion.div>

      {/* VERIFICATION TIMELINE */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-4"
      >
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Calendar className="w-5 h-5 text-emerald-500" /> Verification & Milestone Timeline
        </h3>

        <div className="relative pl-6 space-y-6 before:absolute before:left-2 font-sans before:top-2 before:bottom-2 before:w-0.5 before:bg-blue-500/30">
          {(worker.timeline || []).map((t, idx) => (
            <div key={idx} className="relative flex items-center justify-between">
              <div className="absolute -left-6 w-4 h-4 rounded-full bg-blue-600 ring-4 ring-blue-500/20" />
              <div>
                <div className="text-sm font-bold text-slate-900 dark:text-white">{t.title}</div>
                <div className="text-xs text-slate-400">{t.date}</div>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                Verified
              </span>
            </div>
          ))}
        </div>
      </motion.div>

    </div>
  );
}
