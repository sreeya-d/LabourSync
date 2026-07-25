import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  UserCheck, 
  Briefcase, 
  Award, 
  Zap, 
  ArrowRight, 
  CheckCircle2, 
  Star, 
  Users, 
  TrendingUp, 
  FileText, 
  Smartphone, 
  Sparkles,
  Lock
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function LandingPage() {
  const stats = [
    { label: "Verified Workers", value: "10,000+", icon: Users, color: "from-blue-500 to-indigo-600" },
    { label: "Active Employers", value: "2,500+", icon: Briefcase, color: "from-emerald-500 to-teal-600" },
    { label: "Verified Users", value: "98%", icon: ShieldCheck, color: "from-purple-500 to-pink-600" },
    { label: "Avg Match Time", value: "< 5 Mins", icon: Zap, color: "from-amber-500 to-orange-600" }
  ];

  const steps = [
    { num: 1, title: "Register Profile", desc: "Create your profile with basic contact details and target work categories." },
    { num: 2, title: "Verify Identity", desc: "AI OCR document scanning & DeepFace 94%+ facial matching algorithm." },
    { num: 3, title: "Find Jobs", desc: "NLP-matched job postings near your location with instant dispatch." },
    { num: 4, title: "Complete Work", desc: "Fulfill work requests verified by OTP check-in and location tracking." },
    { num: 5, title: "Build Trust Score", desc: "Earn higher wages and top-tier badges (Up to 100 Trust Score)." }
  ];

  const testimonials = [
    {
      quote: "LaborSync found us 4 verified waiters for our Madhapur banquet in less than 10 minutes. The DeepFace identity check gave us 100% peace of mind.",
      name: "Vikram Malhotra",
      role: "Event Manager, Royal Banquet",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
      rating: 5
    },
    {
      quote: "As an electrician, getting paid daily with an official Verified Pro badge has doubled my weekly job requests. The OTP verification is seamless!",
      name: "Rajesh Kumar",
      role: "Skilled Electrician",
      avatar: "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=150&q=80",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen space-y-20 pb-16">
      
      {/* HERO SECTION */}
      <section className="relative pt-12 pb-20 overflow-hidden">
        
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-72 h-72 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass-panel border border-blue-500/30 text-xs font-bold text-blue-600 dark:text-blue-400 mb-6 shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-emerald-500" />
            <span>Next-Gen AI Labor Marketplace with DeepFace & NLP</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15] max-w-4xl mx-auto"
          >
            Find <span className="gradient-text">Trusted Workers</span> Near You in Minutes.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed"
          >
            LaborSync connects employers with identity-verified daily workers using facial recognition, NLP job description extraction, and automated trust scores.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/register"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-base text-white bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-500/30 hover:scale-105 transition-all flex items-center justify-center space-x-2"
            >
              <UserCheck className="w-5 h-5" />
              <span>Register as Worker</span>
            </Link>

            <Link
              to="/employer"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-base text-slate-900 dark:text-white glass-panel hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-700 shadow-lg hover:scale-105 transition-all flex items-center justify-center space-x-2"
            >
              <Briefcase className="w-5 h-5 text-emerald-500" />
              <span>Register as Employer</span>
            </Link>
          </motion.div>

          {/* Illustration Preview Graphic */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-14 max-w-5xl mx-auto rounded-3xl p-3 glass-panel border border-slate-200/80 dark:border-slate-800 shadow-2xl overflow-hidden relative"
          >
            <div className="bg-slate-900 rounded-2xl p-6 sm:p-8 text-left text-white grid grid-cols-1 md:grid-cols-3 gap-6 relative overflow-hidden">
              <div className="md:col-span-2 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold">
                  <ShieldCheck className="w-4 h-4" /> DeepFace Identity Verified
                </div>
                <h3 className="text-2xl font-bold">Smart AI Matching Dashboard</h3>
                <p className="text-sm text-slate-400">
                  Real-time worker radar across Madhapur, Gachibowli, & Hitech City with skill embeddings & dynamic Trust Scores.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="px-3 py-1 rounded-xl bg-slate-800 text-xs text-blue-400 font-semibold border border-slate-700">OCR Read ID</span>
                  <span className="px-3 py-1 rounded-xl bg-slate-800 text-xs text-emerald-400 font-semibold border border-slate-700">94% Face Score</span>
                  <span className="px-3 py-1 rounded-xl bg-slate-800 text-xs text-amber-400 font-semibold border border-slate-700">Live OTP Check-in</span>
                </div>
              </div>
              
              <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700 space-y-3 flex flex-col justify-between">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Trust Score</span>
                  <span className="text-emerald-400 font-bold">95 / 100</span>
                </div>
                <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full w-[95%]" />
                </div>
                <div className="text-xs text-slate-300 pt-2 border-t border-slate-700 flex justify-between">
                  <span>Badge Status:</span>
                  <span className="font-bold text-amber-400">Elite Verified</span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* STATISTICS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-xs uppercase font-extrabold tracking-widest text-blue-600 dark:text-blue-400">Platform Growth</h2>
          <p className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-1">Trusted by thousands across Hyderabad</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={idx}
                whileHover={{ y: -4 }}
                className="glass-card p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xl flex items-center space-x-4"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white shadow-lg shrink-0`}>
                  <Icon className="w-7 h-7" />
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">{stat.value}</div>
                  <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5">{stat.label}</div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-extrabold uppercase">Simplified Process</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-3">How LaborSync Works</h2>
          <p className="text-slate-600 dark:text-slate-400 mt-2 text-sm">From identity verification to instant digital payouts in 5 easy steps.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
          {steps.map((step) => (
            <div key={step.num} className="glass-card p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-lg relative flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center text-white font-extrabold text-sm mb-4 shadow-md">
                  {step.num}
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">{step.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-slate-200 dark:border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">What Our Community Says</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((t, idx) => (
              <div key={idx} className="glass-card p-6 rounded-2xl border border-slate-200 dark:border-slate-700/80 shadow-md space-y-4">
                <div className="flex items-center space-x-1 text-amber-400">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-slate-700 dark:text-slate-300 italic leading-relaxed">"{t.quote}"</p>
                <div className="flex items-center space-x-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-500/40" />
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">{t.name}</div>
                    <div className="text-[11px] text-slate-500">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="max-w-5xl mx-auto px-4 text-center">
        <div className="gradient-bg rounded-3xl p-10 text-white shadow-2xl space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold">Ready to Experience AI Labor Matching?</h2>
          <p className="text-blue-100 max-w-xl mx-auto text-sm">Join over 10,000 workers and 2,500 employers using LaborSync today.</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/matching" className="px-6 py-3 rounded-xl font-bold bg-white text-blue-900 hover:bg-slate-100 transition-all shadow-lg text-sm">
              Explore Worker Matching
            </Link>
            <Link to="/verify" className="px-6 py-3 rounded-xl font-bold bg-emerald-500 text-white hover:bg-emerald-600 transition-all shadow-lg text-sm">
              Try AI DeepFace Verification
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
