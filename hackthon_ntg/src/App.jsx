import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AppProvider } from './context/AppContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import NotificationToast from './components/NotificationToast';

import LandingPage from './pages/LandingPage';
import WorkerRegister from './pages/WorkerRegister';
import VerificationScreen from './pages/VerificationScreen';
import EmployerDashboard from './pages/EmployerDashboard';
import AIMatchingDashboard from './pages/AIMatchingDashboard';
import WorkerProfile from './pages/WorkerProfile';
import LiveJobStatus from './pages/LiveJobStatus';
import AnalyticsDashboard from './pages/AnalyticsDashboard';

export default function App() {
  return (
    <ThemeProvider>
      <AppProvider>
        <Router>
          <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/register" element={<WorkerRegister />} />
                <Route path="/verify" element={<VerificationScreen />} />
                <Route path="/employer" element={<EmployerDashboard />} />
                <Route path="/matching" element={<AIMatchingDashboard />} />
                <Route path="/profile/:id" element={<WorkerProfile />} />
                <Route path="/live-status" element={<LiveJobStatus />} />
                <Route path="/analytics" element={<AnalyticsDashboard />} />
              </Routes>
            </main>
            <Footer />
            <NotificationToast />
          </div>
        </Router>
      </AppProvider>
    </ThemeProvider>
  );
}
