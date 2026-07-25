import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { parseJobTextAI } from '../utils/aiServices';
import { 
  Briefcase, 
  Sparkles, 
  MapPin, 
  Clock, 
  DollarSign, 
  CheckCircle2, 
  PlusCircle, 
  Zap, 
  FileText, 
  Users 
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function EmployerDashboard() {
  const navigate = useNavigate();
  const { jobs, addJob, hireWorkerForJob, workers } = useApp();

  const [rawNlpText, setRawNlpText] = useState("Need two waiters tomorrow from 8 AM to 5 PM near Madhapur. ₹900 each.");
  const [isParsing, setIsParsing] = useState(false);
  const [extractedData, setExtractedData] = useState(null);

  const [formData, setFormData] = useState({
    title: 'Event Waiters for Wedding Banquet',
    category: 'Manual Worker',
    workers_needed: 2,
    location: 'Madhapur, Hyderabad',
    salary: 900,
    duration: '8 AM - 5 PM',
    urgency: 'High',
    description: 'Need two waiters tomorrow from 8 AM to 5 PM near Madhapur. ₹900 each.',
    employer_name: 'Royal Banquet Hall'
  });

  const handleNlpParse = async () => {
    if (!rawNlpText.trim()) return;
    setIsParsing(true);
    const parsed = await parseJobTextAI(rawNlpText);
    setExtractedData(parsed);

    setFormData(prev => ({
      ...prev,
      title: parsed.job_title ? `${parsed.job_title} Request` : prev.title,
      workers_needed: parsed.workers_needed || prev.workers_needed,
      location: parsed.location || prev.location,
      salary: parseInt(parsed.salary.replace(/[^\d]/g, '')) || prev.salary,
      duration: parsed.duration || prev.duration,
      urgency: parsed.urgency || prev.urgency,
      description: rawNlpText
    }));

    setIsParsing(false);
  };

  const handleSubmitJob = (e) => {
    e.preventDefault();
    const created = addJob(formData);
    // Find best match worker automatically & navigate to AI Matching
    navigate('/matching');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold border border-emerald-500/20">
          <Briefcase className="w-4 h-4" />
          <span>Employer Portal & AI NLP Parser</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
          Post Job with <span className="gradient-text">AI NLP Parser</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          Paste any natural language job request (e.g., WhatsApp message) and watch AI extract structured fields instantly.
        </p>
      </div>

      {/* AI FEATURE 1: NLP PARSER DEMO BOX */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-3xl p-6 sm:p-8 border border-blue-500/40 shadow-2xl relative overflow-hidden bg-gradient-to-br from-blue-500/5 via-transparent to-emerald-500/5"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl gradient-bg flex items-center justify-center text-white shadow-md">
              <Sparkles className="w-4 h-4" />
            </div>
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
              AI Feature 1: Natural Language Job Extractor
            </h3>
          </div>
          <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400">
            NLP Engine Active
          </span>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Type or Paste Raw Unstructured Job Requirement:
            </label>
            <div className="relative">
              <textarea
                rows={3}
                value={rawNlpText}
                onChange={(e) => setRawNlpText(e.target.value)}
                placeholder="e.g. Need two waiters tomorrow from 8 AM to 5 PM near Madhapur. ₹900 each."
                className="w-full px-4 py-3 rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none resize-none"
              />
              <button
                type="button"
                onClick={handleNlpParse}
                disabled={isParsing}
                className="absolute bottom-3 right-3 px-4 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md transition-all flex items-center gap-1.5 disabled:opacity-50"
              >
                {isParsing ? (
                  <>
                    <Sparkles className="w-4 h-4 animate-spin" /> Parsing...
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 fill-amber-300 text-amber-300" /> Auto-Extract with AI
                  </>
                )}
              </button>
            </div>
          </div>

          {/* NLP Extracted Data Display */}
          {extractedData && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-4 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-emerald-500/40 space-y-2 text-xs"
            >
              <div className="font-extrabold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> AI Successfully Extracted Attributes:
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-1 text-slate-800 dark:text-slate-200">
                <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800">
                  <span className="text-slate-400 block text-[10px]">Job Type</span>
                  <span className="font-bold text-blue-600 dark:text-blue-400">{extractedData.job_title}</span>
                </div>
                <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800">
                  <span className="text-slate-400 block text-[10px]">Workers Needed</span>
                  <span className="font-bold">{extractedData.workers_needed} Workers</span>
                </div>
                <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800">
                  <span className="text-slate-400 block text-[10px]">Location</span>
                  <span className="font-bold">{extractedData.location}</span>
                </div>
                <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800">
                  <span className="text-slate-400 block text-[10px]">Salary Rate</span>
                  <span className="font-bold text-emerald-500">{extractedData.salary}</span>
                </div>
                <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800">
                  <span className="text-slate-400 block text-[10px]">Shift Duration</span>
                  <span className="font-bold">{extractedData.duration}</span>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* MANUAL / POPULATED JOB FORM */}
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        onSubmit={handleSubmitJob}
        className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-6"
      >
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
          <PlusCircle className="w-5 h-5 text-blue-500" /> Confirm & Post Job Requirements
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Job Title</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Location</label>
            <input
              type="text"
              required
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Salary per Worker (₹)</label>
            <input
              type="number"
              required
              value={formData.salary}
              onChange={(e) => setFormData({ ...formData, salary: parseInt(e.target.value) || 900 })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Duration / Shift</label>
            <input
              type="text"
              required
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Urgency Level</label>
            <select
              value={formData.urgency}
              onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="High">High (Immediate Dispatch)</option>
              <option value="Medium">Medium (Within 24 Hours)</option>
              <option value="Low">Low (Scheduled)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Company / Employer Name</label>
            <input
              type="text"
              value={formData.employer_name}
              onChange={(e) => setFormData({ ...formData, employer_name: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-4 rounded-2xl font-bold text-base text-white bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-500/25 transition-all flex items-center justify-center gap-2"
        >
          <Zap className="w-5 h-5 fill-white" />
          <span>Submit & Launch AI Worker Matching Engine</span>
        </button>
      </motion.form>

      {/* ACTIVE POSTED JOBS */}
      <div className="space-y-4 pt-4">
        <h3 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          <FileText className="w-5 h-5 text-blue-500" /> Currently Active Job Postings ({jobs.length})
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {jobs.map((job) => (
            <div key={job.id} className="glass-card p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md space-y-3">
              <div className="flex items-start justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-500/10 text-blue-600 dark:text-blue-400">
                  {job.id}
                </span>
                <span className="text-xs font-extrabold text-emerald-500">₹{job.salary}/day</span>
              </div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">{job.title}</h4>
              <p className="text-xs text-slate-500 line-clamp-2">{job.description}</p>
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-blue-500" /> {job.location.split(',')[0]}</span>
                <span className="font-semibold text-slate-700 dark:text-slate-300">{job.workers_needed} Workers Needed</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
