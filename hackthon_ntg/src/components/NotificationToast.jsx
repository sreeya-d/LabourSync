import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, Info, AlertCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function NotificationToast() {
  const { notifications } = useApp();
  const [activeToast, setActiveToast] = useState(null);

  useEffect(() => {
    if (notifications.length > 0) {
      const latest = notifications[0];
      setActiveToast(latest);
      const timer = setTimeout(() => {
        setActiveToast(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notifications]);

  if (!activeToast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md w-full px-4 pointer-events-none">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          className="pointer-events-auto glass-panel border border-emerald-500/30 rounded-2xl shadow-2xl p-4 flex items-start space-x-3 bg-white/95 dark:bg-slate-900/95"
        >
          <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h5 className="text-sm font-bold text-slate-900 dark:text-white">
                {activeToast.title}
              </h5>
              <span className="text-[10px] text-slate-400">{activeToast.time}</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
              {activeToast.message}
            </p>
          </div>
          <button
            onClick={() => setActiveToast(null)}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
