import re
import hashlib
import random
import time
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# -------------------------------------------------------------
# SEED DATA: 20 WORKERS & 10 JOBS
# -------------------------------------------------------------
WORKERS = [
    {
        "id": "W-101",
        "name": "Rajesh Kumar",
        "category": "Skilled Worker",
        "skills": ["Electrician", "Wiring", "AC Repair"],
        "experience": "5 Years",
        "experience_years": 5,
        "location": "Madhapur, Hyderabad",
        "distance_km": 1.2,
        "daily_wage": 950,
        "availability": "Immediate",
        "trust_score": 92,
        "badge": "Top Rated Pro",
        "verified": True,
        "rating": 4.9,
        "completed_jobs": 48,
        "cancellation_rate": 1.2,
        "late_arrivals": 0,
        "photo": "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=400&q=80",
        "timeline": [
            {"title": "Registered", "date": "2024-01-10", "completed": True},
            {"title": "Identity & DeepFace Verified", "date": "2024-01-11", "completed": True},
            {"title": "Completed 1st Job", "date": "2024-01-15", "completed": True},
            {"title": "Earned Top Rated Pro Badge", "date": "2024-04-01", "completed": True}
        ]
    },
    {
        "id": "W-102",
        "name": "Srinivas Rao",
        "category": "Manual Worker",
        "skills": ["Waiter", "Event Staff", "Catering Helper"],
        "experience": "3 Years",
        "experience_years": 3,
        "location": "Madhapur, Hyderabad",
        "distance_km": 0.8,
        "daily_wage": 850,
        "availability": "Immediate",
        "trust_score": 88,
        "badge": "Verified Pro",
        "verified": True,
        "rating": 4.8,
        "completed_jobs": 34,
        "cancellation_rate": 2.0,
        "late_arrivals": 1,
        "photo": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
        "timeline": [
            {"title": "Registered", "date": "2024-02-01", "completed": True},
            {"title": "Identity & DeepFace Verified", "date": "2024-02-02", "completed": True},
            {"title": "Completed 1st Job", "date": "2024-02-05", "completed": True}
        ]
    },
    {
        "id": "W-103",
        "name": "Anitha Reddy",
        "category": "Professional",
        "skills": ["Data Entry", "Front Desk", "Office Assistant"],
        "experience": "4 Years",
        "experience_years": 4,
        "location": "Hitech City, Hyderabad",
        "distance_km": 2.5,
        "daily_wage": 1200,
        "availability": "Today",
        "trust_score": 95,
        "badge": "Elite Verified",
        "verified": True,
        "rating": 5.0,
        "completed_jobs": 62,
        "cancellation_rate": 0.0,
        "late_arrivals": 0,
        "photo": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
        "timeline": [
            {"title": "Registered", "date": "2023-11-05", "completed": True},
            {"title": "Identity & DeepFace Verified", "date": "2023-11-06", "completed": True},
            {"title": "Completed 1st Job", "date": "2023-11-10", "completed": True}
        ]
    },
    {
        "id": "W-104",
        "name": "Venkatesh V.",
        "category": "Skilled Worker",
        "skills": ["Plumber", "Pipe Fitting", "Sanitation"],
        "experience": "6 Years",
        "experience_years": 6,
        "location": "Gachibowli, Hyderabad",
        "distance_km": 3.1,
        "daily_wage": 1000,
        "availability": "Immediate",
        "trust_score": 90,
        "badge": "Top Rated Pro",
        "verified": True,
        "rating": 4.85,
        "completed_jobs": 52,
        "cancellation_rate": 1.5,
        "late_arrivals": 1,
        "photo": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
        "timeline": [
            {"title": "Registered", "date": "2024-01-02", "completed": True},
            {"title": "Identity & DeepFace Verified", "date": "2024-01-03", "completed": True}
        ]
    },
    {
        "id": "W-105",
        "name": "Mohammad Rizwan",
        "category": "Manual Worker",
        "skills": ["Waiter", "Table Service", "Dishwasher"],
        "experience": "2 Years",
        "experience_years": 2,
        "location": "Jubilee Hills, Hyderabad",
        "distance_km": 1.9,
        "daily_wage": 900,
        "availability": "Immediate",
        "trust_score": 86,
        "badge": "Verified Pro",
        "verified": True,
        "rating": 4.7,
        "completed_jobs": 29,
        "cancellation_rate": 2.5,
        "late_arrivals": 0,
        "photo": "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=400&q=80",
        "timeline": [
            {"title": "Registered", "date": "2024-03-01", "completed": True},
            {"title": "Identity Verified", "date": "2024-03-02", "completed": True}
        ]
    },
    {
        "id": "W-106",
        "name": "Priya Sharma",
        "category": "Professional",
        "skills": ["Event Host", "Guest Management", "Bilingual Host"],
        "experience": "3 Years",
        "experience_years": 3,
        "location": "Banjara Hills, Hyderabad",
        "distance_km": 4.0,
        "daily_wage": 1500,
        "availability": "Tomorrow",
        "trust_score": 94,
        "badge": "Elite Verified",
        "verified": True,
        "rating": 4.95,
        "completed_jobs": 41,
        "cancellation_rate": 0.5,
        "late_arrivals": 0,
        "photo": "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
        "timeline": [
            {"title": "Registered", "date": "2024-02-12", "completed": True},
            {"title": "Verified", "date": "2024-02-13", "completed": True}
        ]
    },
    {
        "id": "W-107",
        "name": "Karthik Naidu",
        "category": "Skilled Worker",
        "skills": ["Carpenter", "Furniture Assembly", "Interior Fitting"],
        "experience": "7 Years",
        "experience_years": 7,
        "location": "Kondapur, Hyderabad",
        "distance_km": 3.8,
        "daily_wage": 1100,
        "availability": "Immediate",
        "trust_score": 91,
        "badge": "Top Rated Pro",
        "verified": True,
        "rating": 4.8,
        "completed_jobs": 59,
        "cancellation_rate": 1.0,
        "late_arrivals": 1,
        "photo": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80",
        "timeline": [
            {"title": "Registered", "date": "2023-12-01", "completed": True}
        ]
    },
    {
        "id": "W-108",
        "name": "Mahesh Babu",
        "category": "Manual Worker",
        "skills": ["Mason", "Construction Helper", "Tile Fixing"],
        "experience": "4 Years",
        "experience_years": 4,
        "location": "Kukatpally, Hyderabad",
        "distance_km": 5.2,
        "daily_wage": 850,
        "availability": "Immediate",
        "trust_score": 83,
        "badge": "Verified",
        "verified": True,
        "rating": 4.6,
        "completed_jobs": 22,
        "cancellation_rate": 3.0,
        "late_arrivals": 2,
        "photo": "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80",
        "timeline": [
            {"title": "Registered", "date": "2024-03-10", "completed": True}
        ]
    },
    {
        "id": "W-109",
        "name": "Sunita Devi",
        "category": "Skilled Worker",
        "skills": ["Housekeeper", "Sanitization", "Kitchen Helper"],
        "experience": "5 Years",
        "experience_years": 5,
        "location": "Madhapur, Hyderabad",
        "distance_km": 1.5,
        "daily_wage": 750,
        "availability": "Immediate",
        "trust_score": 89,
        "badge": "Verified Pro",
        "verified": True,
        "rating": 4.75,
        "completed_jobs": 37,
        "cancellation_rate": 1.0,
        "late_arrivals": 0,
        "photo": "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=400&q=80",
        "timeline": [
            {"title": "Registered", "date": "2024-01-20", "completed": True}
        ]
    },
    {
        "id": "W-110",
        "name": "Deepak Verma",
        "category": "Skilled Worker",
        "skills": ["Driver", "Valet Parking", "Commercial Driving"],
        "experience": "8 Years",
        "experience_years": 8,
        "location": "Begumpet, Hyderabad",
        "distance_km": 6.1,
        "daily_wage": 1000,
        "availability": "Immediate",
        "trust_score": 93,
        "badge": "Top Rated Pro",
        "verified": True,
        "rating": 4.9,
        "completed_jobs": 74,
        "cancellation_rate": 0.8,
        "late_arrivals": 0,
        "photo": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80",
        "timeline": [
            {"title": "Registered", "date": "2023-10-15", "completed": True}
        ]
    },
    {
        "id": "W-111",
        "name": "Kavitha Chander",
        "category": "Professional",
        "skills": ["Chef", "South Indian Cuisine", "Bulk Catering"],
        "experience": "6 Years",
        "experience_years": 6,
        "location": "Gachibowli, Hyderabad",
        "distance_km": 2.8,
        "daily_wage": 1600,
        "availability": "Immediate",
        "trust_score": 96,
        "badge": "Master Chef",
        "verified": True,
        "rating": 4.98,
        "completed_jobs": 83,
        "cancellation_rate": 0.0,
        "late_arrivals": 0,
        "photo": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
        "timeline": [
            {"title": "Registered", "date": "2023-09-01", "completed": True}
        ]
    },
    {
        "id": "W-112",
        "name": "Arjun Swamy",
        "category": "Skilled Worker",
        "skills": ["Welder", "Metal Fabrication", "Gate Repair"],
        "experience": "4 Years",
        "experience_years": 4,
        "location": "Secunderabad, Hyderabad",
        "distance_km": 7.5,
        "daily_wage": 1050,
        "availability": "Tomorrow",
        "trust_score": 87,
        "badge": "Verified Pro",
        "verified": True,
        "rating": 4.7,
        "completed_jobs": 31,
        "cancellation_rate": 2.0,
        "late_arrivals": 1,
        "photo": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
        "timeline": [
            {"title": "Registered", "date": "2024-02-18", "completed": True}
        ]
    },
    {
        "id": "W-113",
        "name": "Narendra Prasad",
        "category": "Manual Worker",
        "skills": ["Painter", "Wall Coating", "Waterproofing"],
        "experience": "5 Years",
        "experience_years": 5,
        "location": "LB Nagar, Hyderabad",
        "distance_km": 8.2,
        "daily_wage": 900,
        "availability": "Immediate",
        "trust_score": 85,
        "badge": "Verified",
        "verified": True,
        "rating": 4.65,
        "completed_jobs": 28,
        "cancellation_rate": 2.2,
        "late_arrivals": 1,
        "photo": "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
        "timeline": [
            {"title": "Registered", "date": "2024-03-05", "completed": True}
        ]
    },
    {
        "id": "W-114",
        "name": "Lakshmi Prasanna",
        "category": "Professional",
        "skills": ["Event Supervisor", "Crowd Control", "VIP Usher"],
        "experience": "4 Years",
        "experience_years": 4,
        "location": "Madhapur, Hyderabad",
        "distance_km": 0.9,
        "daily_wage": 1400,
        "availability": "Immediate",
        "trust_score": 93,
        "badge": "Elite Verified",
        "verified": True,
        "rating": 4.9,
        "completed_jobs": 45,
        "cancellation_rate": 0.0,
        "late_arrivals": 0,
        "photo": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
        "timeline": [
            {"title": "Registered", "date": "2024-01-05", "completed": True}
        ]
    },
    {
        "id": "W-115",
        "name": "Ramu Goud",
        "category": "Manual Worker",
        "skills": ["Gardener", "Lawn Mowing", "Tree Trimming"],
        "experience": "6 Years",
        "experience_years": 6,
        "location": "Jubilee Hills, Hyderabad",
        "distance_km": 2.1,
        "daily_wage": 800,
        "availability": "Immediate",
        "trust_score": 88,
        "badge": "Verified Pro",
        "verified": True,
        "rating": 4.8,
        "completed_jobs": 39,
        "cancellation_rate": 1.5,
        "late_arrivals": 0,
        "photo": "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80",
        "timeline": [
            {"title": "Registered", "date": "2024-01-25", "completed": True}
        ]
    },
    {
        "id": "W-116",
        "name": "Sandeep Yadav",
        "category": "Skilled Worker",
        "skills": ["Delivery Executive", "Package Transport", "Bike Courier"],
        "experience": "2 Years",
        "experience_years": 2,
        "location": "Hitech City, Hyderabad",
        "distance_km": 1.7,
        "daily_wage": 850,
        "availability": "Immediate",
        "trust_score": 84,
        "badge": "Fast Responder",
        "verified": True,
        "rating": 4.7,
        "completed_jobs": 60,
        "cancellation_rate": 3.0,
        "late_arrivals": 1,
        "photo": "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=400&q=80",
        "timeline": [
            {"title": "Registered", "date": "2024-02-28", "completed": True}
        ]
    },
    {
        "id": "W-117",
        "name": "Manohar Rao",
        "category": "Skilled Worker",
        "skills": ["Security Guard", "Night Shift", "Access Control"],
        "experience": "5 Years",
        "experience_years": 5,
        "location": "Financial District, Hyderabad",
        "distance_km": 4.5,
        "daily_wage": 950,
        "availability": "Immediate",
        "trust_score": 91,
        "badge": "Top Security",
        "verified": True,
        "rating": 4.85,
        "completed_jobs": 50,
        "cancellation_rate": 0.5,
        "late_arrivals": 0,
        "photo": "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=400&q=80",
        "timeline": [
            {"title": "Registered", "date": "2023-11-20", "completed": True}
        ]
    },
    {
        "id": "W-118",
        "name": "Kalyan Ram",
        "category": "Manual Worker",
        "skills": ["Warehouse Helper", "Loading & Unloading", "Packing"],
        "experience": "3 Years",
        "experience_years": 3,
        "location": "Kondapur, Hyderabad",
        "distance_km": 3.2,
        "daily_wage": 800,
        "availability": "Immediate",
        "trust_score": 82,
        "badge": "Verified",
        "verified": True,
        "rating": 4.6,
        "completed_jobs": 25,
        "cancellation_rate": 2.8,
        "late_arrivals": 2,
        "photo": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
        "timeline": [
            {"title": "Registered", "date": "2024-03-12", "completed": True}
        ]
    },
    {
        "id": "W-119",
        "name": "Bhavana Sen",
        "category": "Professional",
        "skills": ["Graphic Designer", "Banner Design", "Event Branding"],
        "experience": "4 Years",
        "experience_years": 4,
        "location": "Madhapur, Hyderabad",
        "distance_km": 1.1,
        "daily_wage": 1800,
        "availability": "Tomorrow",
        "trust_score": 97,
        "badge": "Creative Specialist",
        "verified": True,
        "rating": 4.99,
        "completed_jobs": 70,
        "cancellation_rate": 0.0,
        "late_arrivals": 0,
        "photo": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
        "timeline": [
            {"title": "Registered", "date": "2023-08-10", "completed": True}
        ]
    },
    {
        "id": "W-120",
        "name": "Vikram Singh",
        "category": "Skilled Worker",
        "skills": ["CCTV Technician", "Camera Setup", "Networking"],
        "experience": "4 Years",
        "experience_years": 4,
        "location": "Gachibowli, Hyderabad",
        "distance_km": 3.0,
        "daily_wage": 1100,
        "availability": "Immediate",
        "trust_score": 89,
        "badge": "Verified Pro",
        "verified": True,
        "rating": 4.8,
        "completed_jobs": 36,
        "cancellation_rate": 1.2,
        "late_arrivals": 1,
        "photo": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
        "timeline": [
            {"title": "Registered", "date": "2024-02-05", "completed": True}
        ]
    }
]

JOBS = [
    {
        "id": "J-501",
        "title": "Event Waiters for Wedding Banquet",
        "category": "Manual Worker",
        "workers_needed": 2,
        "location": "Madhapur, Hyderabad",
        "salary": 900,
        "duration": "8 AM - 5 PM",
        "urgency": "High",
        "description": "Need two waiters tomorrow from 8 AM to 5 PM near Madhapur. ₹900 each for banquet setup and table service.",
        "employer_name": "Royal Banquet Hall",
        "status": "Active",
        "created_at": "2026-07-25 09:30 AM"
    },
    {
        "id": "J-502",
        "title": "Commercial Office Wiring & Light Fitting",
        "category": "Skilled Worker",
        "workers_needed": 1,
        "location": "Hitech City, Hyderabad",
        "salary": 1200,
        "duration": "1 Full Day",
        "urgency": "Medium",
        "description": "Looking for a certified electrician to fix office wiring and LED panel lights in Hitech City Cyber Towers.",
        "employer_name": "Nexus Tech Workspace",
        "status": "Active",
        "created_at": "2026-07-25 10:15 AM"
    },
    {
        "id": "J-503",
        "title": "Catering Assistants for Corporate Luncheon",
        "category": "Manual Worker",
        "workers_needed": 4,
        "location": "Gachibowli, Hyderabad",
        "salary": 950,
        "duration": "10 AM - 4 PM",
        "urgency": "Immediate",
        "description": "Urgent requirement for 4 catering helpers at Financial District Gachibowli for corporate lunch service.",
        "employer_name": "FeastCraft Catering",
        "status": "Active",
        "created_at": "2026-07-25 11:00 AM"
    },
    {
        "id": "J-504",
        "title": "Data Entry & Receptionist Support",
        "category": "Professional",
        "workers_needed": 1,
        "location": "Jubilee Hills, Hyderabad",
        "salary": 1500,
        "duration": "9 AM - 6 PM",
        "urgency": "Low",
        "description": "Need an experienced office assistant for visitor registry and MS Excel data entry at a law firm.",
        "employer_name": "Apex Law Associates",
        "status": "Active",
        "created_at": "2026-07-25 08:00 AM"
    },
    {
        "id": "J-505",
        "title": "Emergency Restaurant Plumbing Repair",
        "category": "Skilled Worker",
        "workers_needed": 1,
        "location": "Madhapur, Hyderabad",
        "salary": 1300,
        "duration": "3 Hours",
        "urgency": "Immediate",
        "description": "Urgent leak repair in kitchen sink and main drainage pipe at restaurant in Inorbit Mall vicinity.",
        "employer_name": "Spicy Spoon Bistro",
        "status": "Active",
        "created_at": "2026-07-25 11:45 AM"
    },
    {
        "id": "J-506",
        "title": "Exhibition Stall Carpenter",
        "category": "Skilled Worker",
        "workers_needed": 2,
        "location": "Hitex Exhibition Center, Kondapur",
        "salary": 1400,
        "duration": "8 Hours",
        "urgency": "High",
        "description": "Assembly of wooden exhibition booth backdrop and brochure racks at Hitex Trade Center.",
        "employer_name": "Vision Expo Media",
        "status": "Active",
        "created_at": "2026-07-24 04:00 PM"
    },
    {
        "id": "J-507",
        "title": "Weekend Delivery Drivers (Light Motor Vehicles)",
        "category": "Skilled Worker",
        "workers_needed": 3,
        "location": "Begumpet, Hyderabad",
        "salary": 1100,
        "duration": "Full Shift",
        "urgency": "Medium",
        "description": "Drivers needed for e-commerce package delivery across central Hyderabad.",
        "employer_name": "Swift Logistics Express",
        "status": "Active",
        "created_at": "2026-07-24 06:20 PM"
    },
    {
        "id": "J-508",
        "title": "Villa Garden Landscaping & Trimming",
        "category": "Manual Worker",
        "workers_needed": 2,
        "location": "Jubilee Hills, Hyderabad",
        "salary": 850,
        "duration": "9 AM - 3 PM",
        "urgency": "Low",
        "description": "Lawn mowing, hedge trimming, and clearing green waste in private villa garden.",
        "employer_name": "GreenHaven Estates",
        "status": "Active",
        "created_at": "2026-07-25 07:10 AM"
    },
    {
        "id": "J-509",
        "title": "Corporate Event Host / usher",
        "category": "Professional",
        "workers_needed": 2,
        "location": "Banjara Hills, Hyderabad",
        "salary": 1800,
        "duration": "5 PM - 11 PM",
        "urgency": "High",
        "description": "Welcoming guests, managing registration desk, and assisting stage presenters at tech summit.",
        "employer_name": "Innovate Summit Labs",
        "status": "Active",
        "created_at": "2026-07-25 10:40 AM"
    },
    {
        "id": "J-510",
        "title": "Warehouse Goods Loading & Stacking",
        "category": "Manual Worker",
        "workers_needed": 5,
        "location": "Kukatpally, Hyderabad",
        "salary": 900,
        "duration": "10 AM - 6 PM",
        "urgency": "High",
        "description": "Unloading carton boxes from trucks and organizing pallet storage in Kukatpally depot.",
        "employer_name": "Metro Retail Warehousing",
        "status": "Active",
        "created_at": "2026-07-25 11:10 AM"
    }
]

# -------------------------------------------------------------
# AI FEATURE 1: NLP JOB DESCRIPTION PARSER
# -------------------------------------------------------------
@app.route('/api/nlp-parse', methods=['POST'])
def parse_job_description():
    data = request.get_json() or {}
    text = data.get('text', '')
    
    if not text:
        return jsonify({"error": "No text provided"}), 400

    # NLP Extraction Rules
    workers_match = re.search(r'(\d+)\s*(?:workers?|waiters?|electricians?|plumbers?|helpers?|staff|people|guys)', text, re.IGNORECASE)
    if not workers_match:
        workers_match = re.search(r'(?:need|require|want)\s*(two|three|four|five|six|one|\d+)', text, re.IGNORECASE)
    
    word_to_num = {"one": 1, "two": 2, "three": 3, "four": 4, "five": 5, "six": 6}
    
    if workers_match:
        w_val = workers_match.group(1).lower()
        workers = word_to_num.get(w_val, int(w_val) if w_val.isdigit() else 1)
    else:
        workers = 1

    # Salary Extraction
    salary_match = re.search(r'(?:₹|rs\.?|inr)?\s*(\d{3,5})\s*(?:each|per day|/day)?', text, re.IGNORECASE)
    salary = f"₹{salary_match.group(1)}" if salary_match else "₹900"

    # Location Extraction
    locations = ["Madhapur", "Gachibowli", "Hitech City", "Jubilee Hills", "Banjara Hills", "Kondapur", "Kukatpally", "Begumpet", "Secunderabad", "LB Nagar"]
    extracted_loc = "Madhapur, Hyderabad"
    for loc in locations:
        if loc.lower() in text.lower():
            extracted_loc = f"{loc}, Hyderabad"
            break

    # Job Category / Role Extraction
    skills_map = {
        "waiter": "Waiter",
        "electrician": "Electrician",
        "plumber": "Plumber",
        "carpenter": "Carpenter",
        "driver": "Driver",
        "data entry": "Data Entry",
        "chef": "Chef",
        "cook": "Chef",
        "welder": "Welder",
        "painter": "Painter",
        "mason": "Mason",
        "gardener": "Gardener",
        "host": "Event Host",
        "security": "Security Guard",
        "helper": "Warehouse Helper"
    }
    
    extracted_job = "General Worker"
    for key, val in skills_map.items():
        if key in text.lower():
            extracted_job = val
            break

    # Duration Extraction
    time_match = re.search(r'(\d{1,2}\s*(?:AM|PM|am|pm))\s*(?:to|-)\s*(\d{1,2}\s*(?:AM|PM|am|pm))', text)
    duration = f"{time_match.group(1)} - {time_match.group(2)}" if time_match else "8 AM - 5 PM"

    return jsonify({
        "status": "success",
        "extracted": {
            "job_title": extracted_job,
            "workers_needed": workers,
            "location": extracted_loc,
            "salary": salary,
            "duration": duration,
            "urgency": "High" if "urgent" in text.lower() or "tomorrow" in text.lower() else "Medium"
        }
    })

# -------------------------------------------------------------
# AI FEATURE 2 & MATCHING ENGINE: WORKER RECOMMENDATION
# -------------------------------------------------------------
@app.route('/api/match-workers', methods=['POST'])
def match_workers():
    data = request.get_json() or {}
    target_skill = data.get('skill', '').strip().lower()
    target_category = data.get('category', '').strip().lower()
    sort_by = data.get('sort_by', 'best_match') # 'best_match', 'nearest', 'trust_score'
    
    matched = []
    for worker in WORKERS:
        # Calculate Skill Match Score (0 to 100)
        worker_skills = [s.lower() for s in worker['skills']]
        if any(target_skill in s or s in target_skill for s in worker_skills):
            skill_score = 95
        elif target_category and target_category == worker['category'].lower():
            skill_score = 80
        else:
            skill_score = 65

        # Calculate Distance Score
        dist = worker['distance_km']
        dist_score = max(50, 100 - (dist * 6))

        # Trust Score
        trust_score = worker['trust_score']

        # Availability Score
        avail_score = 100 if worker['availability'] == 'Immediate' else 80

        # Weighted Overall Match Percentage Formula
        match_percentage = int((skill_score * 0.4) + (dist_score * 0.25) + (trust_score * 0.25) + (avail_score * 0.10))
        match_percentage = min(99, max(60, match_percentage))

        w_copy = dict(worker)
        w_copy['match_percentage'] = match_percentage
        matched.append(w_copy)

    # Sorting
    if sort_by == 'nearest':
        matched.sort(key=lambda x: x['distance_km'])
    elif sort_by == 'trust_score':
        matched.sort(key=lambda x: x['trust_score'], reverse=True)
    else: # best_match
        matched.sort(key=lambda x: x['match_percentage'], reverse=True)

    return jsonify({
        "status": "success",
        "total": len(matched),
        "workers": matched
    })

# -------------------------------------------------------------
# AI FEATURE 3: TRUST SCORE ALGORITHM
# -------------------------------------------------------------
@app.route('/api/trust-score', methods=['POST'])
def calculate_trust_score():
    data = request.get_json() or {}
    completed_jobs = data.get('completed_jobs', 0)
    rating = data.get('rating', 4.5)
    verified = data.get('verified', True)
    cancellation_rate = data.get('cancellation_rate', 0.0) # in %
    late_arrivals = data.get('late_arrivals', 0)

    base = 50.0
    verification_bonus = 15.0 if verified else 0.0
    jobs_bonus = min(20.0, completed_jobs * 0.4)
    rating_bonus = (rating - 3.0) * 8.0 # e.g. 5.0 rating gives +16
    cancellation_penalty = cancellation_rate * 2.0
    late_penalty = late_arrivals * 3.0

    score = base + verification_bonus + jobs_bonus + rating_bonus - cancellation_penalty - late_penalty
    final_score = int(round(min(100.0, max(0.0, score))))

    # Badge determination
    if final_score >= 95:
        badge = "Elite Verified"
    elif final_score >= 90:
        badge = "Top Rated Pro"
    elif final_score >= 80:
        badge = "Verified Pro"
    elif verified:
        badge = "Verified Newbie"
    else:
        badge = "Unverified"

    return jsonify({
        "status": "success",
        "trust_score": final_score,
        "badge": badge,
        "breakdown": {
            "base_score": 50,
            "verification_bonus": verification_bonus,
            "jobs_bonus": jobs_bonus,
            "rating_bonus": round(rating_bonus, 1),
            "cancellation_penalty": round(cancellation_penalty, 1),
            "late_penalty": late_penalty
        }
    })

# -------------------------------------------------------------
# AI FEATURE 4: SIMULATED OCR & DEEPFACE VERIFICATION
# -------------------------------------------------------------
@app.route('/api/verify', methods=['POST'])
def verify_identity():
    data = request.get_json() or {}
    name = data.get('name', 'New Worker')
    phone = data.get('phone', '9876543210')
    
    # Simulate step timings & Hash creation
    time.sleep(0.5)
    raw_id = f"{name}-{phone}-{time.time()}"
    sha256_hash = hashlib.sha256(raw_id.encode()).hexdigest()

    face_match_score = random.randint(92, 98)
    ocr_extracted_id = f"AADHAAR-{random.randint(1000, 9999)}-{random.randint(1000, 9999)}"

    return jsonify({
        "status": "success",
        "ocr_result": {
            "status": "Completed",
            "document_type": "Government Aadhaar / Voter ID",
            "extracted_name": name,
            "id_number": ocr_extracted_id
        },
        "face_verification": {
            "status": "Verified",
            "algorithm": "DeepFace ResNet50 Embeddings",
            "match_score": f"{face_match_score}%",
            "confidence": "High"
        },
        "security_hash": sha256_hash,
        "trust_score": 50,
        "badge": "Verified Newbie",
        "worker_id": f"W-{random.randint(200, 999)}"
    })

# -------------------------------------------------------------
# GENERAL API ENDPOINTS: WORKERS & JOBS
# -------------------------------------------------------------
@app.route('/api/workers', methods=['GET', 'POST'])
def handle_workers():
    if request.method == 'POST':
        new_worker = request.get_json()
        new_worker['id'] = f"W-{len(WORKERS) + 101}"
        new_worker['trust_score'] = 50
        new_worker['badge'] = "Verified Newbie"
        new_worker['verified'] = True
        new_worker['rating'] = 5.0
        new_worker['completed_jobs'] = 0
        new_worker['cancellation_rate'] = 0.0
        new_worker['late_arrivals'] = 0
        WORKERS.insert(0, new_worker)
        return jsonify({"status": "success", "worker": new_worker})
    return jsonify({"status": "success", "workers": WORKERS})

@app.route('/api/jobs', methods=['GET', 'POST'])
def handle_jobs():
    if request.method == 'POST':
        job_data = request.get_json()
        job_data['id'] = f"J-{len(JOBS) + 501}"
        job_data['status'] = "Active"
        job_data['created_at'] = "Just now"
        JOBS.insert(0, job_data)
        return jsonify({"status": "success", "job": job_data})
    return jsonify({"status": "success", "jobs": JOBS})

# -------------------------------------------------------------
# ANALYTICS API DATA
# -------------------------------------------------------------
@app.route('/api/analytics', methods=['GET'])
def get_analytics():
    return jsonify({
        "status": "success",
        "summary": {
            "verified_workers": 10480,
            "jobs_completed": 14290,
            "average_trust_score": 88.4,
            "avg_response_time": "12 min"
        },
        "categories_distribution": [
            {"name": "Skilled Worker", "value": 45},
            {"name": "Manual Worker", "value": 35},
            {"name": "Professional", "value": 20}
        ],
        "jobs_per_day": [
            {"day": "Mon", "jobs": 140},
            {"day": "Tue", "jobs": 185},
            {"day": "Wed", "jobs": 210},
            {"day": "Thu", "jobs": 240},
            {"day": "Fri", "jobs": 310},
            {"day": "Sat", "jobs": 380},
            {"day": "Sun", "jobs": 290}
        ],
        "trust_score_distribution": [
            {"range": "50-60", "count": 420},
            {"range": "61-70", "count": 1150},
            {"range": "71-80", "count": 2840},
            {"range": "81-90", "count": 4120},
            {"range": "91-100", "count": 1950}
        ],
        "top_skills": [
            {"skill": "Electrician", "count": 1820},
            {"skill": "Waiter / Catering", "count": 1640},
            {"skill": "Plumber", "count": 1410},
            {"skill": "Data Entry", "count": 1100},
            {"skill": "Carpenter", "count": 980}
        ]
    })

if __name__ == '__main__':
    print("LaborSync Python Flask Backend running on http://127.0.0.1:5000")
    app.run(host='0.0.0.0', port=5000, debug=True)
