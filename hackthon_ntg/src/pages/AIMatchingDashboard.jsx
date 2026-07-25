import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { matchWorkersAI } from '../utils/aiServices';
import WorkerCard from '../components/WorkerCard';
import MapsPlaceholder from '../components/MapsPlaceholder';
import { 
  Users, 
  Sparkles, 
  Search, 
  Filter, 
  MapPin, 
  Award, 
  ArrowUpDown, 
  Map as MapIcon, 
  Grid, 
  CheckCircle2 
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function AIMatchingDashboard() {
  const navigate = useNavigate();
  const { workers, setSelectedWorker, hireWorkerForJob } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('best_match'); // 'best_match', 'nearest', 'trust_score'
  const [showMap, setShowMap] = useState(true);
  const [matchedList, setMatchedList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function runMatching() {
      setLoading(true);
      const results = await matchWorkersAI({
        skill: searchQuery,
        category: selectedCategory === 'All' ? '' : selectedCategory,
        sortBy,
        workersList: workers
      });
      setMatchedList(results);
      setLoading(false);
    }
    runMatching();
  }, [searchQuery, selectedCategory, sortBy, workers]);

  const handleHire = (worker) => {
    hireWorkerForJob(worker);
    navigate('/live-status');
  };

  const handleViewProfile = (worker) => {
    setSelectedWorker(worker);
    navigate(`/profile/${worker.id}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold border border-blue-500/20 mb-2">
            <Sparkles className="w-4 h-4 text-emerald-500" />
            <span>AI Feature 2: Smart Geo-Matching & Trust Score Engine</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            AI Worker <span className="gradient-text">Matching Dashboard</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Displaying <span className="font-bold text-slate-900 dark:text-white">{matchedList.length} verified workers</span> ranked by AI Match % algorithm.
          </p>
        </div>

        {/* View Toggle Button */}
        <div className="flex items-center space-x-2 bg-slate-100 dark:bg-slate-800/80 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700">
          <button
            onClick={() => setShowMap(!showMap)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              showMap
                ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <MapIcon className="w-4 h-4 text-blue-500" />
            <span>{showMap ? 'Hide Radar Map' : 'Show Radar Map'}</span>
          </button>
        </div>
      </div>

      {/* MAP RADAR VIEW */}
      {showMap && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
          <MapsPlaceholder workers={matchedList} selectedLocation="Madhapur, Hyderabad" />
        </motion.div>
      )}

      {/* FILTER & SORT CONTROL BAR */}
      <div className="glass-card p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-lg flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search skill (e.g. Electrician, Waiter)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 dark:text-white"
          />
        </div>

        {/* Category Filters */}
        <div className="flex items-center space-x-1.5 overflow-x-auto max-w-full pb-1 md:pb-0">
          {['All', 'Skilled Worker', 'Manual Worker', 'Professional'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sort Controls */}
        <div className="flex items-center space-x-2 w-full md:w-auto">
          <ArrowUpDown className="w-4 h-4 text-slate-400 shrink-0" />
          <span className="text-xs font-bold text-slate-600 dark:text-slate-400 shrink-0">Sort By:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="best_match">Best Match %</option>
            <option value="nearest">Nearest Distance (km)</option>
            <option value="trust_score">Highest Trust Score</option>
          </select>
        </div>

      </div>

      {/* WORKER CARDS GRID */}
      {loading ? (
        <div className="py-20 text-center space-y-3">
          <Sparkles className="w-8 h-8 text-blue-500 animate-spin mx-auto" />
          <p className="text-sm font-bold text-slate-600 dark:text-slate-300">Evaluating 20+ Candidate Workers via AI Algorithm...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {matchedList.map((worker) => (
            <WorkerCard
              key={worker.id}
              worker={worker}
              onHire={handleHire}
              onViewProfile={handleViewProfile}
            />
          ))}
        </div>
      )}

    </div>
  );
}
