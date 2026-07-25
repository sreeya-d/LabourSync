import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  UserCheck, 
  Upload, 
  ShieldCheck, 
  Camera, 
  FileText, 
  MapPin, 
  Briefcase, 
  DollarSign, 
  Clock, 
  Sparkles 
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function WorkerRegister() {
  const navigate = useNavigate();
  const { registerWorker } = useApp();

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    location: 'Madhapur, Hyderabad',
    category: 'Skilled Worker',
    skills: 'Electrician, AC Repair',
    experience: '4',
    expectedWage: '950',
    availability: 'Immediate'
  });

  const [idPreview, setIdPreview] = useState('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80');
  const [selfiePreview, setSelfiePreview] = useState('https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=400&q=80');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleIdUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIdPreview(URL.createObjectURL(file));
    }
  };

  const handleSelfieUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelfiePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const registered = registerWorker({
      ...formData,
      idPreview,
      selfiePreview
    });
    navigate('/verify');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold">
          <UserCheck className="w-4 h-4" />
          <span>Worker Portal</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
          Register as <span className="gradient-text">Verified Worker</span>
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm">
          Complete registration to trigger real-time AI OCR scanning and DeepFace identity verification.
        </p>
      </div>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
        className="glass-card rounded-3xl p-6 sm:p-10 border border-slate-200/80 dark:border-slate-800 shadow-2xl space-y-8"
      >
        {/* Personal Details */}
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
            <UserCheck className="w-5 h-5 text-blue-500" /> Personal Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
              <input
                type="text"
                name="fullName"
                required
                placeholder="e.g. Rajesh Kumar"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Phone Number</label>
              <input
                type="tel"
                name="phone"
                required
                placeholder="+91 98765 43210"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
              <input
                type="email"
                name="email"
                required
                placeholder="rajesh.kumar@example.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Location</label>
              <input
                type="text"
                name="location"
                required
                placeholder="Madhapur, Hyderabad"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Skill & Category */}
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
            <Briefcase className="w-5 h-5 text-emerald-500" /> Work Category & Experience
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="Manual Worker">Manual Worker</option>
                <option value="Skilled Worker">Skilled Worker</option>
                <option value="Professional">Professional</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Experience (Years)</label>
              <input
                type="number"
                name="experience"
                min="0"
                max="30"
                value={formData.experience}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Expected Daily Wage (₹)</label>
              <input
                type="number"
                name="expectedWage"
                step="50"
                value={formData.expectedWage}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Primary Skills (Comma separated)</label>
              <input
                type="text"
                name="skills"
                placeholder="Electrician, Wiring, AC Repair"
                value={formData.skills}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Availability</label>
              <select
                name="availability"
                value={formData.availability}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="Immediate">Immediate (Today)</option>
                <option value="Tomorrow">Tomorrow</option>
                <option value="Flexible">Flexible Shifts</option>
              </select>
            </div>
          </div>
        </div>

        {/* Verification Uploads */}
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
            <ShieldCheck className="w-5 h-5 text-purple-500" /> Identity Documents (AI Scan)
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Government ID Upload */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Upload Government ID (Aadhaar / Voter ID)
              </label>
              <div className="relative border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-4 text-center hover:border-blue-500 transition-colors bg-slate-50 dark:bg-slate-900/50">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleIdUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />
                <img src={idPreview} alt="ID Document" className="w-full h-32 object-cover rounded-xl mb-2 border border-slate-200 dark:border-slate-800" />
                <div className="flex items-center justify-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400">
                  <Upload className="w-3.5 h-3.5" /> Upload Document
                </div>
              </div>
            </div>

            {/* Selfie Upload */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Upload Selfie Photo (DeepFace Match)
              </label>
              <div className="relative border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-4 text-center hover:border-blue-500 transition-colors bg-slate-50 dark:bg-slate-900/50">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleSelfieUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />
                <img src={selfiePreview} alt="Selfie" className="w-full h-32 object-cover rounded-xl mb-2 border border-slate-200 dark:border-slate-800" />
                <div className="flex items-center justify-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  <Camera className="w-3.5 h-3.5" /> Upload Selfie
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Submit Action */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
          <button
            type="submit"
            className="w-full py-4 rounded-2xl font-bold text-base text-white gradient-bg shadow-xl shadow-blue-500/25 hover:scale-[1.01] transition-all flex items-center justify-center space-x-2"
          >
            <Sparkles className="w-5 h-5 text-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
            <span>Complete Registration & Run AI Verification</span>
          </button>
        </div>
      </motion.form>
    </div>
  );
}
