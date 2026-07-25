import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Activity, 
  CheckCircle2, 
  Clock, 
  Key, 
  MapPin, 
  Play, 
  ShieldCheck, 
  UserCheck, 
  DollarSign, 
  Sparkles, 
  ArrowRight,
  Send,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

export default function LiveJobStatus() {
  const { activeJobWorkflow, advanceWorkflowStep, addNotification } = useApp();
  const { job, hiredWorker, currentStep, otp, paymentAmount } = activeJobWorkflow;

  const [inputOtp, setInputOtp] = useState('');
  const [otpError, setOtpError] = useState(false);

  const steps = [
    { step: 1, label: 'Employer Creates Job', desc: 'Job posted on LaborSync network' },
    { step: 2, label: 'Worker Accepts', desc: `${hiredWorker.name} accepted request` },
    { step: 3, label: 'OTP Generated', desc: `Security OTP sent: ${otp}` },
    { step: 4, label: 'Worker Arrived', desc: 'Arrived at job site & OTP verified' },
    { step: 5, label: 'Work Started', desc: 'Active shift session in progress' },
    { step: 6, label: 'Work Completed & Paid', desc: `₹${paymentAmount} released to worker` }
  ];

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (inputOtp === otp) {
      setOtpError(false);
      advanceWorkflowStep(4); // Worker Arrived
    } else {
      setOtpError(true);
    }
  };

  const handleCompletePayment = () => {
    advanceWorkflowStep(6);
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      
      {/* Header */}
      <div className="text-center max-w-xl mx-auto space-y-2">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold border border-emerald-500/20">
          <Activity className="w-4 h-4 animate-pulse" />
          <span>Real-time Live Job Status & Notification Engine</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
          Live Job <span className="gradient-text">Progress Tracker</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          Tracking lifecycle for <span className="font-bold text-slate-900 dark:text-white">"{job.title}"</span> with <span className="font-bold text-slate-900 dark:text-white">{hiredWorker.name}</span>.
        </p>
      </div>

      {/* ACTIVE JOB & WORKER SUMMARY BANNER */}
      <div className="glass-card rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Worker Info */}
        <div className="flex items-center space-x-4">
          <img
            src={hiredWorker.photo}
            alt={hiredWorker.name}
            className="w-16 h-16 rounded-2xl object-cover ring-2 ring-blue-500/40 shadow-md"
          />
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">{hiredWorker.name}</h3>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/10 text-blue-600 dark:text-blue-400">
                {hiredWorker.badge}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-blue-500" /> {job.location}
            </p>
          </div>
        </div>

        {/* OTP Code Display */}
        <div className="p-3 rounded-2xl bg-slate-900 text-white text-center border border-slate-800 shrink-0 w-full sm:w-auto">
          <div className="text-[10px] uppercase font-bold text-slate-400">Job Verification OTP</div>
          <div className="text-xl font-mono font-black text-amber-400 tracking-widest mt-0.5">
            {otp}
          </div>
        </div>

      </div>

      {/* 6-STEP PROGRESS TIMELINE */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-2xl space-y-6">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
          <Activity className="w-5 h-5 text-blue-500" /> 6-Step Job Workflow Timeline
        </h3>

        <div className="space-y-4">
          {steps.map((s) => {
            const isDone = currentStep >= s.step;
            const isCurrent = currentStep === s.step;

            return (
              <div
                key={s.step}
                className={`p-4 rounded-2xl border transition-all flex items-center justify-between ${
                  isDone
                    ? 'bg-emerald-500/5 dark:bg-emerald-950/20 border-emerald-500/40'
                    : isCurrent
                    ? 'bg-blue-500/10 border-blue-500'
                    : 'bg-slate-50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 opacity-50'
                }`}
              >
                <div className="flex items-center space-x-3.5">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs shadow-sm ${
                    isDone
                      ? 'bg-emerald-600 text-white'
                      : isCurrent
                      ? 'bg-blue-600 text-white animate-bounce'
                      : 'bg-slate-300 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                  }`}>
                    {isDone ? <CheckCircle2 className="w-5 h-5" /> : s.step}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">{s.label}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{s.desc}</p>
                  </div>
                </div>

                <span className={`px-3 py-1 rounded-full text-xs font-extrabold ${
                  isDone
                    ? 'text-emerald-600 dark:text-emerald-400'
                    : isCurrent
                    ? 'text-blue-600 dark:text-blue-400 animate-pulse'
                    : 'text-slate-400'
                }`}>
                  {isDone ? 'Completed' : isCurrent ? 'Active Step' : 'Pending'}
                </span>
              </div>
            );
          })}
        </div>

        {/* INTERACTIVE WORKFLOW CONTROLS */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-4">
          
          {/* STEP 2 to 3: Generate OTP */}
          {currentStep === 2 && (
            <button
              onClick={() => advanceWorkflowStep(3)}
              className="w-full py-3.5 rounded-2xl font-bold text-sm text-white bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-500/25 transition-all flex items-center justify-center gap-2"
            >
              <Key className="w-4 h-4" /> <span>Simulate OTP Generation & Send SMS</span>
            </button>
          )}

          {/* STEP 3: OTP Verification Form */}
          {currentStep === 3 && (
            <form onSubmit={handleVerifyOtp} className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-amber-700 dark:text-amber-300">
                <span>Enter 4-Digit Security OTP to Verify Worker Arrival:</span>
                <span>Code: {otp}</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  maxLength={4}
                  placeholder="Enter 7492"
                  value={inputOtp}
                  onChange={(e) => setInputOtp(e.target.value)}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-mono text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl font-bold text-xs text-white bg-emerald-600 hover:bg-emerald-700 shadow-md"
                >
                  Verify OTP
                </button>
              </div>
              {otpError && (
                <div className="text-xs text-rose-500 font-bold flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> Invalid OTP code. Try entering {otp}.
                </div>
              )}
            </form>
          )}

          {/* STEP 4: Start Work Session */}
          {currentStep === 4 && (
            <button
              onClick={() => advanceWorkflowStep(5)}
              className="w-full py-3.5 rounded-2xl font-bold text-sm text-white bg-emerald-600 hover:bg-emerald-700 shadow-xl shadow-emerald-500/25 transition-all flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4 fill-white" /> <span>Start Work Session</span>
            </button>
          )}

          {/* STEP 5: Complete & Release Payment */}
          {currentStep === 5 && (
            <button
              onClick={handleCompletePayment}
              className="w-full py-3.5 rounded-2xl font-bold text-sm text-white gradient-bg shadow-xl shadow-blue-500/25 transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-300" /> <span>Complete Job & Release ₹{paymentAmount} Digital Payment</span>
            </button>
          )}

          {/* STEP 6: Completed Receipt */}
          {currentStep === 6 && (
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
              <h4 className="text-base font-extrabold text-emerald-600 dark:text-emerald-400">Job Complete & Paid!</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Payment receipt #PAY-99201 generated. Worker trust score increased +2 points!
              </p>
            </div>
          )}

        </div>
      </div>

    </div>
  );
}
