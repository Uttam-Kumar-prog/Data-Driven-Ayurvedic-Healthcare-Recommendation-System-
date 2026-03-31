import React from "react";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="min-h-screen pt-28 pb-20 px-6 bg-slate-50 font-sans selection:bg-blue-100 selection:text-blue-900">
      
      {/* ===== BACKGROUND GRAPHICS ===== */}
      <div className="fixed inset-0 z-0 pointer-events-none">
         <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:20px_20px] opacity-60" />
         <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-100/40 rounded-full blur-3xl opacity-50" />
         <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-100/40 rounded-full blur-3xl opacity-50" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* ===== HERO SECTION ===== */}
        <div className="text-center mb-24">
           <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-blue-100 shadow-sm mb-8 animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
              <span className="text-slate-600 font-semibold text-xs uppercase tracking-wider">Our Mission</span>
           </div>
           
           <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-8 font-serif tracking-tight leading-tight">
             Bridging Ancient Wisdom <br />
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
               & Modern Science
             </span>
           </h1>
           
           <p className="max-w-2xl mx-auto text-xl text-slate-600 leading-relaxed">
             AyurSaaS is a data-driven health platform that demystifies Ayurveda, 
             making personalized holistic wellness accessible, explainable, and actionable for everyone.
           </p>
        </div>

        {/* ===== STORY GRID ===== */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-32">
           
           {/* Left: The Concept */}
           <div className="order-2 md:order-1 space-y-8">
              <div className="bg-white/60 backdrop-blur-md border-l-4 border-blue-600 pl-6 py-2">
                 <h3 className="text-2xl font-bold text-slate-800 font-serif mb-2">The Problem</h3>
                 <p className="text-slate-600 leading-relaxed">
                    Modern healthcare treats symptoms, not root causes. Traditional Ayurveda has the answers, 
                    but it's often viewed as complex or inaccessible to the digital generation.
                 </p>
              </div>
              <div className="bg-white/60 backdrop-blur-md border-l-4 border-emerald-500 pl-6 py-2">
                 <h3 className="text-2xl font-bold text-slate-800 font-serif mb-2">Our Solution</h3>
                 <p className="text-slate-600 leading-relaxed">
                    We use NLP and algorithmic analysis to digitize Ayurvedic diagnosis. 
                    By analyzing your unique symptoms and lifestyle data, we generate a precise "Dosha Profile" 
                    and a tailored wellness roadmap.
                 </p>
              </div>
           </div>

           {/* Right: Visual Abstract */}
           <div className="order-1 md:order-2 relative h-[400px] bg-gradient-to-br from-blue-50 to-indigo-50 rounded-[2.5rem] border border-white shadow-xl overflow-hidden flex items-center justify-center group">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,white_0%,transparent_70%)] opacity-50" />
              
              {/* Floating Elements Animation */}
              <div className="relative z-10 text-center">
                 <div className="w-24 h-24 mx-auto bg-white rounded-2xl shadow-lg flex items-center justify-center text-4xl mb-6 group-hover:scale-110 transition-transform duration-500">
                    🌿
                 </div>
                 <div className="flex gap-4">
                    <div className="bg-white/80 backdrop-blur px-6 py-3 rounded-xl shadow-sm border border-white animate-bounce" style={{animationDelay: '0s'}}>
                       <span className="font-bold text-blue-900">Data</span>
                    </div>
                    <div className="bg-white/80 backdrop-blur px-6 py-3 rounded-xl shadow-sm border border-white animate-bounce" style={{animationDelay: '0.2s'}}>
                       <span className="font-bold text-emerald-800">Nature</span>
                    </div>
                    <div className="bg-white/80 backdrop-blur px-6 py-3 rounded-xl shadow-sm border border-white animate-bounce" style={{animationDelay: '0.4s'}}>
                       <span className="font-bold text-indigo-900">Balance</span>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* ===== CREATOR SECTION ===== */}
        <div className="relative mb-32">
           <div className="absolute inset-0 bg-slate-900 rounded-[3rem] transform -rotate-1 shadow-2xl"></div>
           <div className="relative bg-white rounded-[3rem] p-12 md:p-16 shadow-xl border border-slate-100 overflow-hidden">
              
              <div className="grid md:grid-cols-2 gap-16 items-center">
                 
                 {/* Text Content */}
                 <div>
                    <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 font-bold text-xs rounded-lg mb-6 uppercase tracking-wider">
                       Meet the Creator
                    </div>
                    <h2 className="text-4xl font-bold text-slate-900 font-serif mb-6">
                       Shashank Kumar
                    </h2>
                    <p className="text-slate-600 mb-6 leading-relaxed text-lg">
                       An entrepreneur and developer passionate about the intersection of healthcare and technology. 
                       Currently researching <span className="font-semibold text-slate-800">NLP in Healthcare</span> and building scalable systems to solve real-world problems.
                    </p>
                    <p className="text-slate-600 leading-relaxed mb-8">
                       With a background in event planning and startup ecosystems, Abhay envisions AyurSaaS not just as a tool, 
                       but as a movement towards preventative, personalized health for students and professionals alike.
                    </p>
                    
                    <div className="flex gap-4">
                       <a href="#" className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-blue-600 hover:text-white transition-colors">
                          {/* LinkedIn Icon */}
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                       </a>
                       <a href="#" className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-900 hover:text-white transition-colors">
                          {/* GitHub Icon */}
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                       </a>
                    </div>
                 </div>

                 {/* Photo Placeholder */}
                 <div className="relative mx-auto w-64 h-64 md:w-80 md:h-80">
                    <div className="absolute inset-0 bg-blue-100 rounded-[2rem] transform rotate-6 transition-transform group-hover:rotate-12"></div>
                    <div className="absolute inset-0 bg-slate-200 rounded-[2rem] overflow-hidden shadow-inner border-2 border-white">
                        {/* Replace this with an actual <img> tag when available */}
                        <div className="w-full h-full flex flex-col items-center justify-center bg-slate-100 text-slate-400">
                           <span className="text-4xl mb-2">👨‍💻</span>
                           <span className="text-sm font-semibold">Creator Portrait</span>
                        </div>
                    </div>
                 </div>

              </div>
           </div>
        </div>

        {/* ===== STATS / VALUES ===== */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24">
           {[
             { label: "Algorithms", value: "15+", icon: "⚡" },
             { label: "Herbs Indexed", value: "200+", icon: "🌿" },
             { label: "Accuracy", value: "94%", icon: "🎯" },
             { label: "Users", value: "Growing", icon: "🚀" }
           ].map((stat, i) => (
             <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 text-center hover:shadow-md transition-shadow">
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">{stat.label}</div>
             </div>
           ))}
        </div>

        {/* ===== CTA ===== */}
        <div className="text-center bg-blue-900 rounded-[3rem] p-12 md:p-20 relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-full opacity-10">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                 <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
              </svg>
           </div>
           
           <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-serif">
                 Ready to find your balance?
              </h2>
              <p className="text-blue-200 text-lg mb-10 max-w-2xl mx-auto">
                 Join the movement towards personalized, preventative healthcare. 
                 It starts with a simple assessment.
              </p>
              <Link 
                 to="/symptoms" 
                 className="inline-block px-10 py-4 bg-white text-blue-900 font-bold rounded-xl shadow-xl hover:scale-105 hover:bg-blue-50 transition-transform"
              >
                 Start Assessment
              </Link>
           </div>
        </div>

      </div>
    </div>
  );
}