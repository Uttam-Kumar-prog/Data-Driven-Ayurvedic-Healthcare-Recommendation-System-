import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export default function DoctorDashboard() {
  const { user } = useAuth();
  
  // ===== STATE MANAGEMENT =====
  const [activeTab, setActiveTab] = useState('appointments'); // 'appointments' | 'reports'
  const [appointments, setAppointments] = useState([]);
  const [reports, setReports] = useState([]);
  const [stats, setStats] = useState({ today: 0, pending: 0, earnings: '0' });
  
  // Modal State for Reviewing/Prescribing
  const [selectedCase, setSelectedCase] = useState(null);
  const [prescriptionNote, setPrescriptionNote] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // ===== LOAD DATA =====
  useEffect(() => {
    // 1. Fetch Appointments (Booked by Patients)
    const storedAppts = JSON.parse(localStorage.getItem('ayur_appointments') || '[]');
    setAppointments(storedAppts);

    // 2. Fetch Patient Reports (Symptom Assessments)
    const storedReports = JSON.parse(localStorage.getItem('ayur_history') || '[]');
    // Filter reports that are specifically "Sent to Specialist" or "Unreviewed"
    const pendingReports = storedReports.filter(r => r.status === 'Unreviewed' || r.status === 'Sent to Expert');
    setReports(pendingReports);

    // 3. Calculate Stats
    setStats({
       today: storedAppts.length, // Simplified for demo
       pending: pendingReports.length,
       earnings: `₹${storedAppts.length * 800}` // Mock calculation
    });
  }, []);

  // ===== ACTIONS =====
  
  const handleJoinCall = (apptId) => {
    alert(`Launching secure video room for Appointment #${apptId}...`);
  };

  const openCaseReview = (report) => {
     setSelectedCase(report);
     setPrescriptionNote('');
  };

  const closeCaseReview = () => {
     setSelectedCase(null);
  };

  const submitPrescription = () => {
     setIsProcessing(true);
     
     setTimeout(() => {
        // 1. Update the local report status
        const updatedReports = reports.filter(r => r.id !== selectedCase.id);
        setReports(updatedReports);
        
        // 2. Update Global Storage (In a real app, this sends to DB)
        const allReports = JSON.parse(localStorage.getItem('ayur_history') || '[]');
        const newAllReports = allReports.map(r => 
           r.id === selectedCase.id ? { ...r, status: 'Prescribed', prescription: prescriptionNote } : r
        );
        localStorage.setItem('ayur_history', JSON.stringify(newAllReports));

        // 3. Update Stats
        setStats(prev => ({ ...prev, pending: prev.pending - 1 }));

        setIsProcessing(false);
        setSelectedCase(null);
        alert("Prescription sent to patient dashboard!");
     }, 1500);
  };

  return (
    <div className="min-h-screen pt-28 pb-20 px-6 bg-slate-50 font-sans selection:bg-blue-100 selection:text-blue-900">
      
      {/* Background Decor */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:20px_20px] opacity-60" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* ===== HEADER ===== */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
               Clinician Portal • Dr. {user?.name?.split(' ')[1] || 'User'}
            </div>
            <h1 className="text-4xl font-bold text-slate-900 font-serif">
              Workstation
            </h1>
          </div>
          <div className="flex gap-3">
             <div className="px-6 py-3 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl shadow-sm">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
             </div>
             <button className="px-6 py-3 bg-slate-900 text-white font-bold rounded-xl shadow-lg hover:bg-slate-800 transition-colors">
                Available Now
             </button>
          </div>
        </div>

        {/* ===== STATS GRID ===== */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
           {[
             { label: 'Appointments Today', val: stats.today, color: 'text-slate-800' },
             { label: 'Pending Reviews', val: stats.pending, color: 'text-amber-600' },
             { label: 'Total Patients', val: stats.today + 12, color: 'text-blue-600' }, // Mock +12
             { label: 'Est. Earnings', val: stats.earnings, color: 'text-emerald-600' }
           ].map((stat, i) => (
             <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{stat.label}</p>
                <h3 className={`text-3xl font-bold mt-1 ${stat.color}`}>{stat.val}</h3>
             </div>
           ))}
        </div>

        {/* ===== MAIN WORKSPACE ===== */}
        <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-200 overflow-hidden min-h-[500px]">
           
           {/* TABS */}
           <div className="flex border-b border-slate-100">
              <button 
                 onClick={() => setActiveTab('appointments')}
                 className={`flex-1 py-6 text-sm font-bold uppercase tracking-wider transition-all ${activeTab === 'appointments' ? 'bg-blue-50 text-blue-700 border-b-4 border-blue-600' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'}`}
              >
                 Appointments ({appointments.length})
              </button>
              <button 
                 onClick={() => setActiveTab('reports')}
                 className={`flex-1 py-6 text-sm font-bold uppercase tracking-wider transition-all ${activeTab === 'reports' ? 'bg-amber-50 text-amber-700 border-b-4 border-amber-500' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'}`}
              >
                 Patient Reports ({reports.length})
              </button>
           </div>

           {/* CONTENT: APPOINTMENTS */}
           {activeTab === 'appointments' && (
              <div className="p-8">
                 {appointments.length === 0 ? (
                    <div className="text-center py-20 text-slate-400">
                       <div className="text-5xl mb-4">☕</div>
                       <p>No appointments scheduled for today.</p>
                    </div>
                 ) : (
                    <div className="grid gap-4">
                       {appointments.map((appt) => (
                          <div key={appt.id} className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:border-blue-200 transition-colors group">
                             <div className="flex items-center gap-6">
                                <div className="text-center w-20">
                                   <div className="text-blue-600 font-bold text-lg">{appt.time || '10:00 AM'}</div>
                                   <div className="text-xs text-slate-400 font-bold uppercase">Today</div>
                                </div>
                                <div>
                                   <h3 className="text-xl font-bold text-slate-800">{appt.patientName}</h3>
                                   <p className="text-slate-500 text-sm">Reason: {appt.type || 'Consultation'}</p>
                                </div>
                             </div>
                             <div className="flex gap-3">
                                <button className="px-5 py-2.5 bg-white border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-100">
                                   View History
                                </button>
                                <button 
                                   onClick={() => handleJoinCall(appt.id)}
                                   className="px-5 py-2.5 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 hover:bg-blue-700 flex items-center gap-2"
                                >
                                   <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                                   Join Call
                                </button>
                             </div>
                          </div>
                       ))}
                    </div>
                 )}
              </div>
           )}

           {/* CONTENT: REPORTS */}
           {activeTab === 'reports' && (
              <div className="p-8">
                 {reports.length === 0 ? (
                    <div className="text-center py-20 text-slate-400">
                       <div className="text-5xl mb-4">✅</div>
                       <p>All patient reports have been reviewed.</p>
                    </div>
                 ) : (
                    <div className="grid gap-4">
                       {reports.map((report) => (
                          <div key={report.id} className="flex items-center justify-between p-6 bg-amber-50/50 rounded-2xl border border-amber-100 hover:border-amber-300 transition-colors">
                             <div className="flex items-center gap-6">
                                <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center text-2xl shadow-sm">
                                   📋
                                </div>
                                <div>
                                   <h3 className="text-lg font-bold text-slate-800">
                                      {report.doshaImbalance} Imbalance Detected
                                   </h3>
                                   <p className="text-slate-500 text-sm">
                                      Submitted on {report.date} • Severity: <span className="font-bold capitalize">{report.severityLevel}</span>
                                   </p>
                                </div>
                             </div>
                             <button 
                                onClick={() => openCaseReview(report)}
                                className="px-6 py-3 bg-slate-900 text-white font-bold rounded-xl shadow-lg hover:bg-slate-800"
                             >
                                Review Case
                             </button>
                          </div>
                       ))}
                    </div>
                 )}
              </div>
           )}

        </div>
      </div>

      {/* =========================================
          CASE REVIEW MODAL
      ========================================= */}
      {selectedCase && (
         <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={closeCaseReview}></div>
            <div className="relative bg-white rounded-[2rem] shadow-2xl w-full max-w-4xl h-[90vh] flex flex-col overflow-hidden animate-fade-in-up">
               
               {/* Modal Header */}
               <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                  <div>
                     <h2 className="text-2xl font-bold text-slate-900 font-serif">Clinical Assessment</h2>
                     <p className="text-slate-500 text-sm">Case ID: #{selectedCase.id}</p>
                  </div>
                  <button onClick={closeCaseReview} className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-100">✕</button>
               </div>

               {/* Modal Body (Scrollable) */}
               <div className="flex-1 overflow-y-auto p-8 bg-white">
                  <div className="grid md:grid-cols-2 gap-8">
                     
                     {/* LEFT: Analysis Data */}
                     <div className="space-y-6">
                        <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                           <h3 className="text-sm font-bold text-blue-800 uppercase mb-4">Diagnostic Summary</h3>
                           <div className="grid grid-cols-2 gap-4">
                              <div>
                                 <span className="block text-xs text-blue-600 font-bold uppercase">Dosha</span>
                                 <span className="text-xl font-bold text-slate-800">{selectedCase.doshaImbalance}</span>
                              </div>
                              <div>
                                 <span className="block text-xs text-blue-600 font-bold uppercase">Severity</span>
                                 <span className="text-xl font-bold text-slate-800 capitalize">{selectedCase.severityLevel}</span>
                              </div>
                           </div>
                        </div>

                        <div>
                           <h3 className="text-lg font-bold text-slate-800 mb-3">Reported Symptoms</h3>
                           <div className="space-y-2">
                              {selectedCase.symptoms.map((s, i) => (
                                 <div key={i} className="flex justify-between items-center p-3 border border-slate-100 rounded-xl">
                                    <span className="font-medium text-slate-700 capitalize">{s.name.replace('_', ' ')}</span>
                                    <span className={`px-2 py-1 rounded text-xs font-bold ${s.severity === 3 ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-600'}`}>
                                       Level {s.severity}
                                    </span>
                                 </div>
                              ))}
                           </div>
                        </div>
                     </div>

                     {/* RIGHT: Action / Prescription */}
                     <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col h-full">
                        <h3 className="text-lg font-bold text-slate-900 mb-1">Prescription & Advice</h3>
                        <p className="text-slate-500 text-sm mb-4">Write your medical advice for the patient.</p>
                        
                        <textarea 
                           className="flex-1 w-full p-4 bg-white border border-slate-200 rounded-xl outline-none focus:border-blue-500 resize-none font-medium text-slate-700 mb-4"
                           placeholder="Rx: Recommended herbs, diet changes, and lifestyle adjustments..."
                           value={prescriptionNote}
                           onChange={(e) => setPrescriptionNote(e.target.value)}
                        ></textarea>

                        <div className="flex gap-3">
                           <button onClick={closeCaseReview} className="flex-1 py-3 bg-white border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-100">Cancel</button>
                           <button 
                              onClick={submitPrescription} 
                              disabled={!prescriptionNote || isProcessing}
                              className="flex-1 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 disabled:opacity-50"
                           >
                              {isProcessing ? 'Sending...' : 'Send to Patient'}
                           </button>
                        </div>
                     </div>

                  </div>
               </div>

            </div>
         </div>
      )}

    </div>
  );
}