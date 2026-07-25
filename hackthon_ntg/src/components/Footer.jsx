import React from 'react';
import { ShieldCheck, Heart, Github, Twitter, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 pt-12 pb-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-extrabold text-white">
                Labor<span className="gradient-text">Sync</span>
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              AI-driven labor marketplace bringing trust, facial identity verification, NLP job parsing, and dynamic trust scoring to everyday work.
            </p>
            <div className="flex space-x-3 text-slate-400">
              <a href="#" className="p-2 rounded-lg bg-slate-800 hover:text-white hover:bg-slate-700 transition-colors"><Twitter className="w-4 h-4" /></a>
              <a href="#" className="p-2 rounded-lg bg-slate-800 hover:text-white hover:bg-slate-700 transition-colors"><Linkedin className="w-4 h-4" /></a>
              <a href="#" className="p-2 rounded-lg bg-slate-800 hover:text-white hover:bg-slate-700 transition-colors"><Github className="w-4 h-4" /></a>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Platform</h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link to="/matching" className="hover:text-blue-400 transition-colors">Find Verified Workers</Link></li>
              <li><Link to="/employer" className="hover:text-blue-400 transition-colors">Post Job with AI NLP</Link></li>
              <li><Link to="/register" className="hover:text-blue-400 transition-colors">Worker Registration</Link></li>
              <li><Link to="/verify" className="hover:text-blue-400 transition-colors">AI DeepFace Verification</Link></li>
              <li><Link to="/live-status" className="hover:text-blue-400 transition-colors">Live Job Tracker & OTP</Link></li>
            </ul>
          </div>

          {/* AI Technology */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">AI Features</h4>
            <ul className="space-y-2.5 text-xs">
              <li><span className="text-slate-300 font-medium">OCR ID Reader</span> - Automatic Doc Extraction</li>
              <li><span className="text-slate-300 font-medium">DeepFace ResNet</span> - Face Match Engine</li>
              <li><span className="text-slate-300 font-medium">NLP Parser</span> - Unstructured Text Extraction</li>
              <li><span className="text-slate-300 font-medium">Trust Score ML</span> - Dynamic Worker Rating</li>
              <li><span className="text-slate-300 font-medium">Geo-Match</span> - Proximity Worker Ranking</li>
            </ul>
          </div>

          {/* Contact & Location */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Hyderabad Hub</h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>HITEC City, Madhapur, Hyderabad, TS 500081</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <span>+91 40 8822 9900</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>support@laborsync.ai</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 LaborSync Inc. Built with React & Python AI Engine.</p>
          <div className="flex items-center space-x-1">
            <span>Powered by</span>
            <span className="text-emerald-400 font-semibold">DeepFace AI & SHA-256</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
