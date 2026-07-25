import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { simulateAIVerification } from '../utils/aiServices';
import { 
  ShieldCheck, 
  FileText, 
  UserCheck, 
  Cpu, 
  Award, 
  CheckCircle2, 
  ArrowRight, 
  Lock, 
  Key,
  Sparkles 
} from 'lucide-react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

export default function VerificationScreen() {
  const navigate = useNavigate();
  const { activeVerification } = useApp();
  
  const workerName = activeVerification?.name || "Rajesh Kumar";
  const workerPhone = activeVerification?.phone || "9876543210";

  const [stepIndex, setStepIndex] = useState(0); // 0: Idle, 1: OCR, 2: DeepFace, 3: Completed
  const [verifData, setVerifData] = useState(null);

  useEffect(() => {
    let timer1, timer2, timer3;

    // Step 1: OCR Scan Reading
    timer1 = setTimeout(() => {
      setStepIndex(1);
    }, 600);

    // Step 2: Face Verification
    timer2 = setTimeout(() => {
      setStepIndex(2);
    }, 2200);

    // Step 3: Completion & Hash Generation
    timer3 = setTimeout(async () => {
      const result = await simulateAIVerification(workerName, workerPhone);
      setVerifData(result);
      setStepIndex(3);
      
      // Fire celebration confetti!
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }, 3800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [workerName, workerPhone]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold border border-emerald-500/20">
          <ShieldCheck className="w-4 h-4" />
          <span>Real-time AI Verification Pipeline</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
          AI Identity <span className="gradient-text">Verification</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          Processing identity document OCR & DeepFace 512D facial embedding for <span className="font-bold text-slate-900 dark:text-white">{workerName}</span>.
        </p>
      </div>

      {/* Progress Cards */}
      <div className="space-y-6">
        
        {/* STEP 1: OCR ID SCAN */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className={`glass-card p-6 rounded-3xl border transition-all ${
            stepIndex >= 1
              ? 'border-blue-500/50 bg-blue-500/5 dark:bg-blue-950/20'
              : 'border-slate-200 dark:border-slate-800 opacity-60'
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-white shadow-md ${
                stepIndex >= 1 ? 'bg-blue-600' : 'bg-slate-400 dark:bg-slate-700'
              }`}>
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs uppercase font-extrabold tracking-wider text-blue-500">Step 1</span>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">OCR Reading ID Document</h3>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Scanning Aadhaar / Government ID structure & text fields
                </p>
              </div>
            </div>

            <div>
              {stepIndex > 1 ? (
                <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-extrabold">
                  <CheckCircle2 className="w-4 h-4" /> <span>Completed</span>
                </span>
              ) : stepIndex === 1 ? (
                <span className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 text-xs font-bold animate-pulse">
                  <Cpu className="w-4 h-4 animate-spin" /> <span>Scanning...</span>
                </span>
              ) : (
                <span className="text-xs text-slate-400 font-semibold">Pending</span>
              )}
            </div>
          </div>

          {stepIndex >= 1 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800/80 grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
              <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                <span className="text-slate-400 block text-[10px]">Extracted Name</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{workerName}</span>
              </div>
              <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                <span className="text-slate-400 block text-[10px]">Document Type</span>
                <span className="font-bold text-blue-600 dark:text-blue-400">Govt Aadhaar ID</span>
              </div>
              <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                <span className="text-slate-400 block text-[10px]">Document ID</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">AADHAAR-8831-9042</span>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* STEP 2: DEEPFACE FACE VERIFICATION */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className={`glass-card p-6 rounded-3xl border transition-all ${
            stepIndex >= 2
              ? 'border-emerald-500/50 bg-emerald-500/5 dark:bg-emerald-950/20'
              : 'border-slate-200 dark:border-slate-800 opacity-60'
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-white shadow-md ${
                stepIndex >= 2 ? 'bg-emerald-600' : 'bg-slate-400 dark:bg-slate-700'
              }`}>
                <UserCheck className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs uppercase font-extrabold tracking-wider text-emerald-500">Step 2</span>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">Face Verification (DeepFace Result)</h3>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Comparing selfie feature matrix against government ID photo
                </p>
              </div>
            </div>

            <div>
              {stepIndex > 2 ? (
                <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-extrabold">
                  <CheckCircle2 className="w-4 h-4" /> <span>Verified</span>
                </span>
              ) : stepIndex === 2 ? (
                <span className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-bold animate-pulse">
                  <Cpu className="w-4 h-4 animate-spin" /> <span>Matching Score...</span>
                </span>
              ) : (
                <span className="text-xs text-slate-400 font-semibold">Pending</span>
              )}
            </div>
          </div>

          {stepIndex >= 2 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800/80 grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                <span className="text-slate-400 block text-[10px]">DeepFace Matching Score</span>
                <span className="text-base font-black text-emerald-600 dark:text-emerald-400">94% Match</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                <span className="text-slate-400 block text-[10px]">Face Liveness</span>
                <span className="font-bold text-emerald-500">Passed (Real Human)</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                <span className="text-slate-400 block text-[10px]">Confidence Level</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">High (0.94 score)</span>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* STEP 3: WORKER ID & TRUST SCORE BADGE */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className={`glass-card p-6 rounded-3xl border transition-all ${
            stepIndex === 3
              ? 'border-purple-500/50 bg-purple-500/5 dark:bg-purple-950/20 shadow-2xl'
              : 'border-slate-200 dark:border-slate-800 opacity-60'
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-white shadow-md ${
                stepIndex === 3 ? 'bg-purple-600' : 'bg-slate-400 dark:bg-slate-700'
              }`}>
                <Award className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs uppercase font-extrabold tracking-wider text-purple-500">Step 3</span>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">Generate Worker ID & Initial Trust Score</h3>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Calculating trust vector & issuing cryptographic SHA-256 identity key
                </p>
              </div>
            </div>

            <div>
              {stepIndex === 3 ? (
                <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-xs font-extrabold">
                  <Sparkles className="w-4 h-4 text-amber-400" /> <span>Identity Issued</span>
                </span>
              ) : (
                <span className="text-xs text-slate-400 font-semibold">Pending</span>
              )}
            </div>
          </div>

          {stepIndex === 3 && verifData && (
            <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="mt-5 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-purple-500/30 space-y-4">
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Worker ID</div>
                  <div className="text-sm font-extrabold text-purple-600 dark:text-purple-400 mt-1">{verifData.worker_id}</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Trust Score</div>
                  <div className="text-sm font-extrabold text-emerald-500 mt-1">{verifData.trust_score} / 100</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Assigned Badge</div>
                  <div className="text-xs font-bold text-amber-500 mt-1.5">{verifData.badge}</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Face Match</div>
                  <div className="text-sm font-extrabold text-blue-500 mt-1">94% DeepFace</div>
                </div>
              </div>

              {/* SHA-256 Hash Display */}
              <div className="p-3 rounded-xl bg-slate-950 text-slate-300 font-mono text-[11px] flex items-center justify-between border border-slate-800 overflow-hidden">
                <div className="flex items-center space-x-2 truncate">
                  <Lock className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-slate-400">SHA-256:</span>
                  <span className="truncate text-emerald-300 font-semibold">{verifData.security_hash}</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => navigate('/matching')}
                  className="flex-1 py-3 rounded-xl font-bold text-xs text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Explore AI Worker Matching Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>

      </div>
    </div>
  );
}
