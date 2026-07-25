import React, { createContext, useContext, useState } from 'react';
import { INITIAL_WORKERS, INITIAL_JOBS } from '../utils/mockData';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [workers, setWorkers] = useState(INITIAL_WORKERS);
  const [jobs, setJobs] = useState(INITIAL_JOBS);
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [activeVerification, setActiveVerification] = useState(null);
  
  // Real-time Notification System
  const [notifications, setNotifications] = useState([
    { id: 1, title: "System Ready", message: "AI DeepFace & NLP engines operational", time: "Just now", type: "info" }
  ]);

  // Active Job Workflow Lifecycle (1 to 6)
  // Step 1: Employer Creates Job
  // Step 2: Worker Accepts
  // Step 3: OTP Generated
  // Step 4: Worker Arrived (OTP verification)
  // Step 5: Work Started
  // Step 6: Work Completed & Payment Done
  const [activeJobWorkflow, setActiveJobWorkflow] = useState({
    job: INITIAL_JOBS[0],
    hiredWorker: INITIAL_WORKERS[1], // Srinivas Rao
    currentStep: 2, // Default at Worker Accepted step to demonstrate live tracking
    otp: "7492",
    otpEntered: "",
    isOtpVerified: false,
    startTime: "09:00 AM",
    endTime: "05:00 PM",
    paymentAmount: 900
  });

  const addNotification = (title, message, type = "success") => {
    const newNotif = {
      id: Date.now(),
      title,
      message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const addJob = (newJob) => {
    const formattedJob = {
      id: `J-${jobs.length + 501}`,
      created_at: "Just now",
      status: "Active",
      ...newJob
    };
    setJobs(prev => [formattedJob, ...prev]);
    addNotification("Job Posted Successfully", `Posted "${formattedJob.title}" at ${formattedJob.location}`, "info");
    return formattedJob;
  };

  const registerWorker = (formData) => {
    const newWorker = {
      id: `W-${workers.length + 101}`,
      name: formData.fullName,
      category: formData.category || "Skilled Worker",
      skills: formData.skills ? formData.skills.split(',').map(s => s.trim()) : ["General Worker"],
      experience: `${formData.experience || 2} Years`,
      experience_years: parseInt(formData.experience) || 2,
      location: formData.location || "Madhapur, Hyderabad",
      distance_km: 1.5,
      daily_wage: parseInt(formData.expectedWage) || 900,
      availability: formData.availability || "Immediate",
      trust_score: 50,
      badge: "Verified Newbie",
      verified: true,
      rating: 5.0,
      completed_jobs: 0,
      cancellation_rate: 0.0,
      late_arrivals: 0,
      photo: formData.selfiePreview || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80",
      idDoc: formData.idPreview,
      timeline: [
        { title: "Registered", date: new Date().toISOString().split('T')[0], completed: true }
      ]
    };

    setWorkers(prev => [newWorker, ...prev]);
    setActiveVerification(newWorker);
    addNotification("Worker Registered", `${newWorker.name} registered. Identity verification pending...`, "info");
    return newWorker;
  };

  const hireWorkerForJob = (worker, job = null) => {
    const targetJob = job || jobs[0];
    const newOtp = Math.floor(1000 + Math.random() * 9000).toString();
    
    setActiveJobWorkflow({
      job: targetJob,
      hiredWorker: worker,
      currentStep: 2, // Worker Accepted
      otp: newOtp,
      otpEntered: "",
      isOtpVerified: false,
      startTime: "Current",
      endTime: "Scheduled",
      paymentAmount: targetJob.salary || 900
    });

    addNotification("Worker Accepted Job!", `${worker.name} accepted "${targetJob.title}"`, "success");
  };

  const advanceWorkflowStep = (nextStep) => {
    setActiveJobWorkflow(prev => {
      const updated = { ...prev, currentStep: nextStep };
      
      if (nextStep === 3) {
        addNotification("OTP Generated", `Security verification code sent to ${prev.hiredWorker.name}`, "info");
      } else if (nextStep === 4) {
        addNotification("Worker Arrived", `${prev.hiredWorker.name} has arrived at ${prev.job.location}`, "success");
      } else if (nextStep === 5) {
        addNotification("Work Started", `Job session initiated for ${prev.job.title}`, "info");
      } else if (nextStep === 6) {
        addNotification("Job Completed & Payment Released!", `₹${prev.paymentAmount} paid to ${prev.hiredWorker.name}`, "success");
      }

      return updated;
    });
  };

  return (
    <AppContext.Provider value={{
      workers,
      jobs,
      selectedWorker,
      setSelectedWorker,
      activeVerification,
      setActiveVerification,
      notifications,
      addNotification,
      addJob,
      registerWorker,
      activeJobWorkflow,
      hireWorkerForJob,
      advanceWorkflowStep
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
