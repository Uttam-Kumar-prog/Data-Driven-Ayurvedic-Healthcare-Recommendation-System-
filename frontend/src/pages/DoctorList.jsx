import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

// Expanded Mock Data: 5 Doctors per Category
export const doctorsData = [
  // ... (Keep the same list of 20 doctors from previous step)
  // === PANCHAKARMA ===
  { id: 101, name: "Dr. Ananya Iyer", specialty: "Panchakarma", qualification: "BAMS, MD", experience: "12 Years", rating: 4.9, fee: "₹800", image: "👩‍⚕️", location: "Mumbai, India" },
  { id: 102, name: "Dr. Rahul Deshmukh", specialty: "Panchakarma", qualification: "BAMS, PhD", experience: "15 Years", rating: 4.8, fee: "₹1200", image: "👨‍⚕️", location: "Pune, India" },
  { id: 103, name: "Dr. Kavita Singh", specialty: "Panchakarma", qualification: "MD (Ayurveda)", experience: "9 Years", rating: 4.7, fee: "₹900", image: "👩‍⚕️", location: "Bangalore, India" },
  { id: 104, name: "Dr. Arjun Nair", specialty: "Panchakarma", qualification: "BAMS, Kerala Ayurveda", experience: "20 Years", rating: 5.0, fee: "₹2000", image: "👨‍⚕️", location: "Kochi, Kerala" },
  { id: 105, name: "Dr. Meera Joshi", specialty: "Panchakarma", qualification: "BAMS, Detox Specialist", experience: "6 Years", rating: 4.5, fee: "₹600", image: "👩‍⚕️", location: "Ahmedabad, India" },

  // === KAYACHIKITSA ===
  { id: 201, name: "Dr. Rajesh Verma", specialty: "Kayachikitsa", qualification: "BAMS, PhD", experience: "18 Years", rating: 4.8, fee: "₹1200", image: "👨‍⚕️", location: "Delhi, India" },
  { id: 202, name: "Dr. Sunita Rao", specialty: "Kayachikitsa", qualification: "MD (Internal Med)", experience: "14 Years", rating: 4.9, fee: "₹1100", image: "👩‍⚕️", location: "Hyderabad, India" },
  { id: 203, name: "Dr. Amit Khanna", specialty: "Kayachikitsa", qualification: "BAMS, Healer", experience: "10 Years", rating: 4.6, fee: "₹800", image: "👨‍⚕️", location: "Chandigarh, India" },
  { id: 204, name: "Dr. Neha Gupta", specialty: "Kayachikitsa", qualification: "BAMS, MD", experience: "7 Years", rating: 4.7, fee: "₹700", image: "👩‍⚕️", location: "Jaipur, India" },
  { id: 205, name: "Dr. Suresh Patil", specialty: "Kayachikitsa", qualification: "BAMS, Senior", experience: "25 Years", rating: 4.9, fee: "₹1500", image: "👨‍⚕️", location: "Mumbai, India" },

  // === DIET & NUTRITION ===
  { id: 301, name: "Dr. Saira Banu", specialty: "Diet & Nutrition", qualification: "BAMS, Nutritionist", experience: "8 Years", rating: 4.7, fee: "₹600", image: "👩‍⚕️", location: "Online" },
  { id: 302, name: "Dr. Rohan Mehta", specialty: "Diet & Nutrition", qualification: "BAMS, MSc Nutrition", experience: "5 Years", rating: 4.6, fee: "₹500", image: "👨‍⚕️", location: "Online" },
  { id: 303, name: "Dr. Priya Sharma", specialty: "Diet & Nutrition", qualification: "BAMS, Gut Expert", experience: "11 Years", rating: 4.9, fee: "₹900", image: "👩‍⚕️", location: "Bangalore, India" },
  { id: 304, name: "Dr. Deepak Chopra", specialty: "Diet & Nutrition", qualification: "Ayurvedic Dietician", experience: "13 Years", rating: 4.8, fee: "₹1000", image: "👨‍⚕️", location: "Delhi, India" },
  { id: 305, name: "Dr. Anjali Desai", specialty: "Diet & Nutrition", qualification: "BAMS, Coach", experience: "7 Years", rating: 4.7, fee: "₹700", image: "👩‍⚕️", location: "Online" },

  // === NADI PARIKSHA ===
  { id: 401, name: "Dr. Vikram Singh", specialty: "Nadi Pariksha", qualification: "BAMS, MD", experience: "15 Years", rating: 5.0, fee: "₹1500", image: "👨‍⚕️", location: "Bangalore, India" },
  { id: 402, name: "Dr. Hema Malini", specialty: "Nadi Pariksha", qualification: "BAMS, Pulse Master", experience: "22 Years", rating: 4.9, fee: "₹1800", image: "👩‍⚕️", location: "Chennai, India" },
  { id: 403, name: "Dr. Alok Nath", specialty: "Nadi Pariksha", qualification: "Vaidya Visharad", experience: "30 Years", rating: 5.0, fee: "₹2500", image: "👨‍⚕️", location: "Haridwar, India" },
  { id: 404, name: "Dr. Ritu Dalal", specialty: "Nadi Pariksha", qualification: "BAMS, Nadi Specialist", experience: "10 Years", rating: 4.8, fee: "₹1000", image: "👩‍⚕️", location: "Gurgaon, India" },
  { id: 405, name: "Dr. Sameer Khan", specialty: "Nadi Pariksha", qualification: "MD Ayurveda", experience: "12 Years", rating: 4.7, fee: "₹1200", image: "👨‍⚕️", location: "Lucknow, India" }
];

export default function DoctorList() {
  const location = useLocation();
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState(''); // NEW STATE
  
  // Get recommendation from Assessment redirect
  const recommendedSpecialty = location.state?.specialty;
  const recommendationReason = location.state?.reason;

  useEffect(() => {
    if (recommendedSpecialty) {
      setFilter(recommendedSpecialty);
    }
  }, [recommendedSpecialty]);

  // ===== FILTER LOGIC =====
  const filteredDoctors = doctorsData.filter(doc => {
     // 1. Check Category Filter
     const matchesCategory = filter === 'All' || doc.specialty === filter;
     
     // 2. Check Search Query (Name OR Specialty OR Location)
     const searchLower = searchQuery.toLowerCase();
     const matchesSearch = 
        doc.name.toLowerCase().includes(searchLower) || 
        doc.specialty.toLowerCase().includes(searchLower) || 
        doc.location.toLowerCase().includes(searchLower);

     return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen pt-28 pb-20 px-6 bg-slate-50 font-sans selection:bg-blue-100 selection:text-blue-900">
      
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:20px_20px] opacity-60" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Recommendation Banner */}
        {recommendedSpecialty && (
          <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 mb-8 flex items-start gap-4 shadow-sm animate-fade-in-down">
             <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-xl flex-shrink-0">✨</div>
             <div>
                <h3 className="text-lg font-bold text-emerald-800 mb-1">We've analyzed your symptoms.</h3>
                <p className="text-emerald-700 text-sm mb-2">{recommendationReason}</p>
                <div className="inline-block px-3 py-1 bg-white border border-emerald-200 rounded-full text-xs font-bold text-emerald-800 uppercase tracking-wider">
                   Recommended: {recommendedSpecialty}
                </div>
             </div>
          </div>
        )}

        {/* Header */}
        <div className="text-center mb-10">
           <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 font-serif">
             Find Your Specialist
           </h1>
           
           {/* === SEARCH BAR === */}
           <div className="max-w-xl mx-auto relative group z-20">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </div>
              <input 
                type="text" 
                placeholder="Search doctor by name, city, or specialty..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-4 bg-white border border-slate-200 rounded-2xl shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-slate-800 placeholder-slate-400"
              />
           </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
           {['All', 'Panchakarma', 'Kayachikitsa', 'Diet & Nutrition', 'Nadi Pariksha'].map((cat) => (
             <button
               key={cat}
               onClick={() => setFilter(cat)}
               className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
                 filter === cat 
                   ? 'bg-slate-900 text-white shadow-lg' 
                   : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
               }`}
             >
               {cat}
             </button>
           ))}
        </div>

        {/* Doctor Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
           {filteredDoctors.length > 0 ? (
              filteredDoctors.map((doc) => (
                <div key={doc.id} className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group">
                   
                   <div className="flex justify-between items-start mb-6">
                      <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center text-5xl shadow-inner group-hover:scale-105 transition-transform">
                         {doc.image}
                      </div>
                      <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg border border-amber-100">
                         <span className="text-amber-500 text-xs">★</span>
                         <span className="text-amber-900 text-xs font-bold">{doc.rating}</span>
                      </div>
                   </div>

                   <div className="mb-6 flex-1">
                      <h3 className="text-lg font-bold text-slate-900 mb-1">{doc.name}</h3>
                      <p className="text-blue-600 text-xs font-bold uppercase tracking-wide mb-2">{doc.specialty}</p>
                      <p className="text-slate-500 text-sm mb-4">{doc.qualification}</p>
                      
                      <div className="flex items-center gap-2 text-xs text-slate-400">
                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                         {doc.location}
                      </div>
                   </div>

                   <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                      <div>
                         <span className="block text-xs text-slate-400 font-medium">Consultation</span>
                         <span className="block text-slate-900 font-bold">{doc.fee}</span>
                      </div>
                      <Link 
                         to={`/doctors/${doc.id}`}
                         className="px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20"
                      >
                         Book Now
                      </Link>
                   </div>
                </div>
              ))
           ) : (
              <div className="col-span-full text-center py-20 text-slate-500">
                 <p className="text-xl font-serif mb-2">No doctors found matching "{searchQuery}"</p>
                 <button onClick={() => {setSearchQuery(''); setFilter('All');}} className="text-blue-600 font-bold hover:underline">Clear all filters</button>
              </div>
           )}
        </div>

      </div>
    </div>
  );
}