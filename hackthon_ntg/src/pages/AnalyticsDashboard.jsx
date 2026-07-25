import React from 'react';
import { 
  BarChart3, 
  Users, 
  CheckCircle2, 
  Award, 
  Clock, 
  TrendingUp, 
  PieChart as PieIcon, 
  Activity 
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { motion } from 'framer-motion';

export default function AnalyticsDashboard() {
  const summaryCards = [
    { label: "Verified Workers", value: "10,480", change: "+12% this month", icon: Users, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "Jobs Completed", value: "14,290", change: "+18% this month", icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { label: "Average Trust Score", value: "88.4", change: "Top Tier Pro Avg", icon: Award, color: "text-purple-500", bg: "bg-purple-500/10" },
    { label: "Avg Response Time", value: "12 min", change: "Fast AI Dispatch", icon: Clock, color: "text-amber-500", bg: "bg-amber-500/10" }
  ];

  const categoriesData = [
    { name: 'Skilled Worker', value: 45, color: '#2563eb' },
    { name: 'Manual Worker', value: 35, color: '#10b981' },
    { name: 'Professional', value: 20, color: '#8b5cf6' }
  ];

  const jobsPerDayData = [
    { day: 'Mon', jobs: 140 },
    { day: 'Tue', jobs: 185 },
    { day: 'Wed', jobs: 210 },
    { day: 'Thu', jobs: 240 },
    { day: 'Fri', jobs: 310 },
    { day: 'Sat', jobs: 380 },
    { day: 'Sun', jobs: 290 }
  ];

  const trustScoreData = [
    { range: '50-60', count: 420 },
    { range: '61-70', count: 1150 },
    { range: '71-80', count: 2840 },
    { range: '81-90', count: 4120 },
    { range: '91-100', count: 1950 }
  ];

  const topSkillsData = [
    { skill: 'Electrician', count: 1820 },
    { skill: 'Waiter Staff', count: 1640 },
    { skill: 'Plumber', count: 1410 },
    { skill: 'Data Entry', count: 1100 },
    { skill: 'Carpenter', count: 980 }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold border border-blue-500/20 mb-2">
            <BarChart3 className="w-4 h-4" />
            <span>Platform Intelligence & Real-time Metrics</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            Analytics <span className="gradient-text">Dashboard</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Real-time overview of labor demand, worker distribution, trust ratings, and daily job fulfillments.
          </p>
        </div>
      </div>

      {/* KPI SUMMARY CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {summaryCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={idx}
              whileHover={{ y: -3 }}
              className="glass-card p-5 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xl flex items-center justify-between"
            >
              <div>
                <div className="text-xs font-bold text-slate-400">{card.label}</div>
                <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">{card.value}</div>
                <div className="text-[11px] font-semibold text-emerald-500 mt-0.5">{card.change}</div>
              </div>
              <div className={`w-12 h-12 rounded-2xl ${card.bg} ${card.color} flex items-center justify-center shrink-0`}>
                <Icon className="w-6 h-6" />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* CHARTS GRID 1: CATEGORIES & JOBS PER DAY */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* CHART 1: WORKER CATEGORIES (DONUT PIE) */}
        <div className="glass-card p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <PieIcon className="w-5 h-5 text-blue-500" /> Worker Category Breakdown
            </h3>
            <span className="text-xs text-slate-400 font-semibold">10,480 Total</span>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoriesData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoriesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: 'none', color: '#fff' }}
                  formatter={(val) => [`${val}%`, 'Share']}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CHART 2: JOBS PER DAY (AREA TREND) */}
        <div className="glass-card p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-500" /> Weekly Jobs Completed Trend
            </h3>
            <span className="text-xs text-emerald-500 font-bold">Peak: Sat (380)</span>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={jobsPerDayData}>
                <defs>
                  <linearGradient id="jobsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: 'none', color: '#fff' }}
                  formatter={(val) => [`${val} Jobs`, 'Volume']}
                />
                <Area type="monotone" dataKey="jobs" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#jobsGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* CHARTS GRID 2: TRUST SCORE DIST & TOP SKILLS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* CHART 3: TRUST SCORE HISTOGRAM (BAR) */}
        <div className="glass-card p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-purple-500" /> Trust Score Distribution Histogram
            </h3>
            <span className="text-xs text-purple-400 font-bold">81-90 Range Mode</span>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trustScoreData}>
                <XAxis dataKey="range" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: 'none', color: '#fff' }}
                  formatter={(val) => [`${val} Workers`, 'Count']}
                />
                <Bar dataKey="count" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CHART 4: TOP SKILLS DEMAND (HORIZONTAL BAR) */}
        <div className="glass-card p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-amber-500" /> Top In-Demand Skills
            </h3>
            <span className="text-xs text-amber-500 font-bold">Electrician #1</span>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={topSkillsData}>
                <XAxis type="number" stroke="#94a3b8" fontSize={12} />
                <YAxis dataKey="skill" type="category" stroke="#94a3b8" fontSize={12} width={100} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: 'none', color: '#fff' }}
                  formatter={(val) => [`${val} Requests`, 'Demand']}
                />
                <Bar dataKey="count" fill="#f59e0b" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

    </div>
  );
}
