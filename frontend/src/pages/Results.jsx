import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Results = () => {
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);

    if (location.state?.reportData) {
        setRecommendations(location.state.reportData);
        setLoading(false);
    } else {
        const data = JSON.parse(localStorage.getItem('recommendations') || 'null');
        if (data) {
           setTimeout(() => {
              setRecommendations(data);
              setLoading(false);
           }, 1000);
        } else {
           setLoading(false);
        }
    }
  }, [location.state]);

  const handleConsultSpecialist = () => {
     navigate('/doctors', {
        state: { 
           specialty: recommendations.recommendedSpecialty,
           reason: "Recommended based on your recent report"
        }
     });
  };

  // NEW: Print Function
  const handlePrintPrescription = () => {
     window.print();
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-28 pb-20 px-6 flex flex-col items-center justify-center bg-slate-50 font-sans">
        <div className="relative">
           <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center animate-pulse"><span className="text-4xl">🧘</span></div>
           <div className="absolute inset-0 border-4 border-blue-500/30 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
        <h2 className="mt-8 text-2xl font-bold text-slate-800 font-serif">Loading Report...</h2>
      </div>
    );
  }

  if (!recommendations) {
    return (
      <div className="min-h-screen pt-28 pb-20 px-6 flex flex-col items-center justify-center bg-slate-50 font-sans">
        <div className="bg-white p-10 rounded-[2rem] shadow-xl text-center max-w-md border border-slate-100">
          <h1 className="text-3xl font-bold text-slate-800 mb-4 font-serif">No Report Found</h1>
          <Link to="/symptoms" className="inline-flex items-center justify-center px-8 py-3.5 bg-blue-600 text-white font-bold rounded-xl shadow-lg hover:bg-blue-700 transition-all">
            Start New Assessment
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-20 px-6 bg-slate-50 font-sans selection:bg-blue-100 selection:text-blue-900 print:bg-white print:pt-0 print:px-0">
      
      {/* Background Decor (Hidden when printing) */}
      <div className="fixed inset-0 z-0 pointer-events-none print:hidden">
         <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:20px_20px] opacity-60" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* HEADER */}
        <div className="text-center mb-12 print:mb-6 print:text-left">
           <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-blue-100 shadow-sm mb-6 print:hidden">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="text-slate-600 font-semibold text-xs uppercase tracking-wider">Report Generated: {recommendations.date}</span>
           </div>
           <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 font-serif">
             Your Ayurvedic Report
           </h1>
           <div className="print:hidden">
              <Link to="/dashboard" className="text-blue-600 font-bold hover:underline">← Back to Dashboard</Link>
           </div>
        </div>

        {/* =========================================
            PRESCRIPTION CARD (With Print Button)
        ========================================= */}
        {recommendations.prescription && (
           <div className="bg-white rounded-[2rem] shadow-xl border-l-8 border-indigo-600 overflow-hidden mb-12 animate-fade-in-down print:shadow-none print:rounded-none print:border-l-4 print:border-black">
              <div className="bg-indigo-50 p-6 border-b border-indigo-100 flex items-center justify-between print:bg-white print:border-b-2 print:border-black">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg print:hidden">Rx</div>
                    <div>
                       <h2 className="text-xl font-bold text-indigo-900 font-serif print:text-black">Doctor's Prescription</h2>
                       <p className="text-indigo-600 text-sm font-medium print:text-slate-600">Verified Medical Advice</p>
                    </div>
                 </div>
                 
                 {/* PRINT BUTTON */}
                 <button 
                    onClick={handlePrintPrescription}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-bold rounded-xl shadow-md hover:bg-indigo-700 transition-all print:hidden"
                 >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
                    Print / Save PDF
                 </button>
              </div>
              
              <div className="p-8">
                 <p className="text-slate-700 text-lg leading-relaxed whitespace-pre-wrap font-medium font-serif print:text-black">
                    {recommendations.prescription}
                 </p>
                 <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between text-sm text-slate-400 print:border-black print:text-black">
                    <span className="flex items-center gap-2">
                       <span className="w-2 h-2 bg-emerald-500 rounded-full print:bg-black"></span>
                       Signed Digitally
                    </span>
                    <span className="font-bold text-slate-300 print:text-black">AyurSaaS Clinical Network</span>
                 </div>
              </div>
           </div>
        )}

        {/* SUMMARY CARDS (Hide in Print if desired, or keep to show context) */}
        <div className="grid md:grid-cols-2 gap-6 mb-10 print:grid-cols-2 print:gap-4">
           <div className="bg-white/80 backdrop-blur-xl border border-white/60 shadow-lg rounded-[2rem] p-8 flex items-center gap-6 relative overflow-hidden group print:shadow-none print:border print:rounded-xl">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-3xl text-white relative z-10 print:hidden">⚖️</div>
              <div className="relative z-10">
                 <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1 print:text-black">Detected Imbalance</p>
                 <h2 className="text-3xl font-bold text-slate-800 print:text-black">{recommendations.doshaImbalance}</h2>
              </div>
           </div>
           <div className="bg-white/80 backdrop-blur-xl border border-white/60 shadow-lg rounded-[2rem] p-8 flex items-center gap-6 relative overflow-hidden group print:shadow-none print:border print:rounded-xl">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl text-white relative z-10 ${recommendations.severityLevel === 'severe' ? 'bg-rose-500' : 'bg-amber-500'} print:hidden`}>📉</div>
              <div className="relative z-10">
                 <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1 print:text-black">Condition Severity</p>
                 <h2 className="text-3xl font-bold text-slate-800 capitalize print:text-black">{recommendations.severityLevel}</h2>
              </div>
           </div>
        </div>

        {/* RECOMMENDATIONS GRID */}
        {recommendations.recommendations && recommendations.recommendations.length > 0 ? (
            <div className="space-y-8">
               <h3 className="text-2xl font-bold text-slate-800 font-serif border-l-4 border-blue-600 pl-4 print:text-black print:border-black">Analysis & Remedies</h3>
               <div className="grid lg:grid-cols-3 gap-6 print:grid-cols-2">
                 {recommendations.recommendations.map((rec, index) => (
                   <div key={index} className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 flex flex-col print:shadow-none print:border print:rounded-xl">
                     <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-50 print:border-slate-200">
                        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center text-xl font-bold uppercase print:hidden">{rec.symptom.charAt(0)}</div>
                        <div><h4 className="text-lg font-bold text-slate-800 capitalize print:text-black">{rec.symptom.replace('_', ' ')}</h4></div>
                     </div>
                     <div className="space-y-4 flex-1">
                        {rec.home && (
                           <div>
                              <p className="text-xs font-bold text-slate-400 uppercase mb-1 print:text-black">Home Remedy</p>
                              <p className="text-slate-700 font-medium leading-relaxed print:text-black">{rec.home}</p>
                           </div>
                        )}
                        {rec.med && (
                           <div>
                              <p className="text-xs font-bold text-slate-400 uppercase mb-1 print:text-black">Herbal Support</p>
                              <p className="text-slate-700 font-medium leading-relaxed print:text-black">{rec.med}</p>
                           </div>
                        )}
                     </div>
                   </div>
                 ))}
               </div>
            </div>
        ) : null}

        {/* CTA: Book Doctor (Hidden in Print) */}
        {!recommendations.prescription && recommendations.recommendedSpecialty && (
            <div className="mt-12 bg-slate-900 rounded-[2rem] p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden print:hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full filter blur-[80px] opacity-20"></div>
                <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-white font-serif mb-2">Professional Care Recommended</h3>
                    <p className="text-slate-300">
                        Based on your profile, we suggest consulting a <span className="text-white font-bold">{recommendations.recommendedSpecialty}</span> specialist.
                    </p>
                </div>
                <button 
                    onClick={handleConsultSpecialist}
                    className="relative z-10 px-8 py-4 bg-white text-slate-900 font-bold rounded-xl shadow-lg hover:bg-blue-50 transition-all whitespace-nowrap"
                >
                    Find Specialists
                </button>
            </div>
        )}

      </div>
    </div>
  );
};

export default Results;