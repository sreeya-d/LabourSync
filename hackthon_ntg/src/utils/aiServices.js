import { INITIAL_WORKERS } from './mockData';

// -------------------------------------------------------------
// NLP JOB PARSER SERVICE
// -------------------------------------------------------------
export async function parseJobTextAI(promptText) {
  try {
    const res = await fetch('/api/nlp-parse', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: promptText })
    });
    if (res.ok) {
      const data = await res.json();
      return data.extracted;
    }
  } catch (err) {
    console.warn("Using client-side NLP fallback parsing", err);
  }

  // Client Fallback Logic
  const text = promptText.toLowerCase();
  
  // Extract worker count
  const countMatch = text.match(/(\d+)\s*(?:workers?|waiters?|electricians?|helpers?|staff|people)/i) || 
                     text.match(/(?:need|require|want)\s*(two|three|four|five|six|one|\d+)/i);
  const wordMap = { one: 1, two: 2, three: 3, four: 4, five: 5 };
  let workers = 1;
  if (countMatch) {
    const val = countMatch[1];
    workers = wordMap[val] || parseInt(val, 10) || 1;
  }

  // Extract Salary
  const salMatch = text.match(/(?:₹|rs\.?|inr)?\s*(\d{3,5})/i);
  const salary = salMatch ? `₹${salMatch[1]}` : "₹900";

  // Extract Location
  const locs = ["Madhapur", "Gachibowli", "Hitech City", "Jubilee Hills", "Banjara Hills", "Kondapur", "Kukatpally"];
  let location = "Madhapur, Hyderabad";
  for (const l of locs) {
    if (text.includes(l.toLowerCase())) {
      location = `${l}, Hyderabad`;
      break;
    }
  }

  // Extract Job Title
  const jobMap = {
    waiter: "Waiter",
    electrician: "Electrician",
    plumber: "Plumber",
    carpenter: "Carpenter",
    driver: "Driver",
    "data entry": "Data Entry",
    chef: "Chef",
    cook: "Chef",
    helper: "Warehouse Helper"
  };
  let jobTitle = "General Worker";
  for (const [k, v] of Object.entries(jobMap)) {
    if (text.includes(k)) {
      jobTitle = v;
      break;
    }
  }

  // Duration
  const timeMatch = text.match(/(\d{1,2}\s*(?:am|pm))\s*(?:to|-)\s*(\d{1,2}\s*(?:am|pm))/i);
  const duration = timeMatch ? `${timeMatch[1].toUpperCase()} - ${timeMatch[2].toUpperCase()}` : "8 AM - 5 PM";

  return {
    job_title: jobTitle,
    workers_needed: workers,
    location,
    salary,
    duration,
    urgency: text.includes("urgent") || text.includes("tomorrow") ? "High" : "Medium"
  };
}

// -------------------------------------------------------------
// WORKER MATCHING SERVICE
// -------------------------------------------------------------
export async function matchWorkersAI({ skill = '', category = '', sortBy = 'best_match', workersList = INITIAL_WORKERS }) {
  try {
    const res = await fetch('/api/match-workers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ skill, category, sort_by: sortBy })
    });
    if (res.ok) {
      const data = await res.json();
      return data.workers;
    }
  } catch (err) {
    console.warn("Using client-side match fallback", err);
  }

  const targetSkill = skill.toLowerCase().trim();
  const targetCat = category.toLowerCase().trim();

  const results = workersList.map(worker => {
    const wSkills = worker.skills.map(s => s.toLowerCase());
    let skillScore = 65;
    if (targetSkill && wSkills.some(s => s.includes(targetSkill) || targetSkill.includes(s))) {
      skillScore = 95;
    } else if (targetCat && worker.category.toLowerCase() === targetCat) {
      skillScore = 82;
    }

    const distScore = Math.max(50, 100 - (worker.distance_km * 6));
    const trustScore = worker.trust_score;
    const availScore = worker.availability === 'Immediate' ? 100 : 80;

    let matchPct = Math.round((skillScore * 0.4) + (distScore * 0.25) + (trustScore * 0.25) + (availScore * 0.10));
    matchPct = Math.min(99, Math.max(62, matchPct));

    return { ...worker, match_percentage: matchPct };
  });

  if (sortBy === 'nearest') {
    results.sort((a, b) => a.distance_km - b.distance_km);
  } else if (sortBy === 'trust_score') {
    results.sort((a, b) => b.trust_score - a.trust_score);
  } else {
    results.sort((a, b) => b.match_percentage - a.match_percentage);
  }

  return results;
}

// -------------------------------------------------------------
// OCR & DEEPFACE VERIFICATION SIMULATION
// -------------------------------------------------------------
export async function simulateAIVerification(name, phone) {
  try {
    const res = await fetch('/api/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, phone })
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn("Using client verification simulation fallback", err);
  }

  const sha256 = Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(`${name}-${phone}-${Date.now()}`))))
    .map(b => b.toString(16).padStart(2, '0')).join('');

  return {
    status: "success",
    ocr_result: {
      status: "Completed",
      document_type: "Government Aadhaar Card",
      extracted_name: name || "Verified Worker",
      id_number: `AADHAAR-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`
    },
    face_verification: {
      status: "Verified",
      algorithm: "DeepFace ResNet50",
      match_score: "94%",
      confidence: "High"
    },
    security_hash: sha256,
    trust_score: 50,
    badge: "Verified Newbie",
    worker_id: `W-${Math.floor(200 + Math.random() * 800)}`
  };
}

// -------------------------------------------------------------
// TRUST SCORE COMPUTATION ALGORITHM
// -------------------------------------------------------------
export function calculateTrustScore({ completed_jobs = 0, rating = 4.5, verified = true, cancellation_rate = 0, late_arrivals = 0 }) {
  const base = 50.0;
  const verifBonus = verified ? 15.0 : 0.0;
  const jobsBonus = Math.min(20.0, completed_jobs * 0.4);
  const ratingBonus = (rating - 3.0) * 8.0;
  const cancelPenalty = cancellation_rate * 2.0;
  const latePenalty = late_arrivals * 3.0;

  const rawScore = base + verifBonus + jobsBonus + ratingBonus - cancelPenalty - latePenalty;
  const finalScore = Math.min(100, Math.max(0, Math.round(rawScore)));

  let badge = "Unverified";
  if (finalScore >= 95) badge = "Elite Verified";
  else if (finalScore >= 90) badge = "Top Rated Pro";
  else if (finalScore >= 80) badge = "Verified Pro";
  else if (verified) badge = "Verified Newbie";

  return { trust_score: finalScore, badge };
}
