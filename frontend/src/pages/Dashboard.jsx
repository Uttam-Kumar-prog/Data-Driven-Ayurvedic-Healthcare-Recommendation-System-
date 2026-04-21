import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import { useAuth } from "../context/AuthContext";
import { appointmentsAPI, symptomsAPI } from "../utils/api";

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
      const fetchDashboardData = async () => {
         try {
            const [historyRes, appointmentsRes] = await Promise.all([
               symptomsAPI.history(),
               appointmentsAPI.mine(),
            ]);

            const mappedHistory = (historyRes?.data?.records || []).map((record) => ({
               id: record._id,
               date: new Date(record.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
               }),
               symptoms: record.symptoms || [],
               doshaImbalance: record?.triage?.doshaImbalance || record?.doshaImbalance || 'General Imbalance',
               severityLevel: record?.triage?.severityLevel || 'moderate',
               recommendedSpecialty: record?.triage?.recommendedSpecialty || 'Kayachikitsa',
               recommendations: record.recommendations || [],
               disclaimer: record?.triage?.disclaimer || '',
               status: record.reviewedByDoctorId ? 'Reviewed' : 'Unreviewed',
            }));

            const mappedAppointments = (appointmentsRes?.data?.appointments || []).map((appt) => ({
               id: appt._id,
               doctorName: appt?.doctorId?.fullName || 'Doctor',
               doctorSpecialty: appt?.doctorId?.doctorProfile?.specialty || appt?.consultationType || 'Specialist',
               date: appt.slotDate,
               time: appt.slotTime,
               status: appt.status,
               joinUrl: appt?.meeting?.joinUrl || '',
            }));

            setHistory(mappedHistory);
            setAppointments(mappedAppointments);
         } catch (error) {
            const savedData = JSON.parse(localStorage.getItem("ayur_history") || "[]");
            const savedAppts = JSON.parse(localStorage.getItem("ayur_appointments") || "[]");
            setHistory(savedData);
            setAppointments(savedAppts);
         }
      };

      fetchDashboardData();
  }, []);

  const totalAssessments = history.length;
   const upcomingCount = appointments.filter(a => !['COMPLETED', 'CANCELLED', 'NO_SHOW'].includes(a.status)).length;

  const handleJoinCall = (appt) => {
    const roomId =
      appt?.joinUrl?.includes('/consultation/')
        ? appt.joinUrl.split('/consultation/')[1]
        : '';
    if (!roomId) {
      alert('Consultation room is not available yet.');
      return;
    }
    navigate(`/consultation/${roomId}`);
  };

  // View the report (Redirects to Results page)
  const handleViewReport = (report) => {
    navigate('/results', { state: { reportData: report } });
  };

  // Find a specialist based on recommendation
  const handleFindSpecialist = (report) => {
    navigate('/doctors', { 
       state: { 
          specialty: report.recommendedSpecialty,
          reason: `Based on your assessment from ${report.date}, we recommend:`
       } 
    });
  };

  return (
    <div className="min-h-screen pt-28 pb-20 px-6 bg-slate-50 font-sans selection:bg-blue-100 selection:text-blue-900">
      
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:20px_20px] opacity-60" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 font-serif">
                     Hello, {user?.fullName || user?.name || 'Patient'}
            </h1>
            <p className="text-slate-500 mt-2">
              Welcome to your personal wellness journey.
            </p>
          </div>
          
          <div className="flex gap-3">
             <Link 
                to="/symptoms"
                className="px-6 py-3 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl shadow-sm hover:bg-slate-50 transition-colors"
             >
                New Assessment
             </Link>
             <Link 
                to="/doctors"
                className="px-6 py-3 bg-slate-900 text-white font-bold rounded-xl shadow-lg hover:bg-slate-800 transition-colors"
             >
                Find a Doctor
             </Link>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-12">
           <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Submitted Reports</p>
              <h3 className="text-3xl font-bold text-slate-800 mt-1">{totalAssessments}</h3>
           </div>
           
           <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Upcoming Visits</p>
              <h3 className="text-3xl font-bold text-blue-600 mt-1">{upcomingCount}</h3>
           </div>
           
           <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-center">
              <p className="text-sm font-medium text-slate-500 text-center">Your health profile is <span className="text-emerald-600 font-bold">Active</span></p>
           </div>
        </div>

        <div className="space-y-16">
           
           {/* === UPCOMING APPOINTMENTS === */}
           <div className="animate-fade-in-up">
              <h2 className="text-2xl font-bold text-slate-800 font-serif mb-6">Upcoming Appointments</h2>

              {appointments.length === 0 ? (
                 <div className="bg-white/60 border border-dashed border-slate-300 rounded-[2rem] p-10 text-center">
                    <p className="text-slate-500 mb-4">No upcoming appointments.</p>
                    <Link to="/doctors" className="text-blue-600 font-bold hover:underline">Book a consultation</Link>
                 </div>
              ) : (
                 <div className="grid md:grid-cols-2 gap-6">
                    {appointments.map((appt) => (
                       <div key={appt.id} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-all flex gap-5 group">
                          {/* Date Badge */}
                          <div className="flex flex-col items-center justify-center bg-blue-50 w-20 rounded-2xl text-blue-800 flex-shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                             <span className="text-xs font-bold uppercase">{new Date(appt.date).toLocaleString('default', { month: 'short' })}</span>
                             <span className="text-2xl font-bold">{new Date(appt.date).getDate()}</span>
                          </div>
                          
                          {/* Info */}
                          <div className="flex-1">
                             <div className="flex justify-between items-start mb-1">
                                <h4 className="font-bold text-slate-900 text-lg">{appt.doctorName}</h4>
                                <span className="bg-emerald-100 text-emerald-700 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase">{appt.status}</span>
                             </div>
                             <p className="text-blue-600 font-bold text-xs uppercase tracking-wide mb-3">{appt.doctorSpecialty}</p>
                             
                          <div className="flex items-center gap-4 text-sm font-medium text-slate-500">
                                <div className="flex items-center gap-1.5">
                                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                   {appt.time}
                                </div>
                                <div className="flex items-center gap-1.5">
                                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                                   Video Call
                                </div>
                             </div>
                          </div>
                          <div className="mt-4">
                            <button
                              onClick={() => handleJoinCall(appt)}
                              className="text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl shadow-md transition-colors"
                            >
                              Join Consultation
                            </button>
                          </div>
                       </div>
                    ))}
                 </div>
              )}
           </div>

           {/* === ASSESSMENT HISTORY === */}
           <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-6 font-serif">Assessment History</h2>
              
              {history.length === 0 ? (
                 <div className="bg-white/60 border border-dashed border-slate-300 rounded-[2rem] p-10 text-center">
                    <p className="text-slate-500 mb-4">No health reports found.</p>
                    <Link to="/symptoms" className="text-blue-600 font-bold hover:underline">Start your first assessment</Link>
                 </div>
              ) : (
                 <div className="space-y-4">
                    {history.map((record) => (
                       <div key={record.id} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-md transition-all">
                          
                          <div className="flex items-center gap-5">
                             <div className="w-14 h-14 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center font-bold text-2xl">
                                📋
                             </div>
                             <div>
                                <h4 className="font-bold text-slate-800 text-lg">Health Assessment</h4>
                                <p className="text-slate-500 text-sm">Submitted on {record.date}</p>
                             </div>
                          </div>
                          
                          <div className="flex flex-col sm:flex-row items-center gap-3">
                             
                             {/* CLICKABLE STATUS BUTTON */}
                             {record.prescription ? (
                                <button 
                                   onClick={() => handleViewReport(record)}
                                   className="px-4 py-1.5 rounded-full text-xs font-bold uppercase bg-indigo-100 text-indigo-700 flex items-center gap-2 border border-indigo-200 animate-pulse hover:bg-indigo-200 transition-colors"
                                >
                                   <span className="text-lg">💊</span>
                                   View Prescription
                                </button>
                             ) : (
                                <span className="px-4 py-1.5 rounded-full text-xs font-bold uppercase bg-emerald-100 text-emerald-700 flex items-center gap-2 border border-emerald-200">
                                   <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                                   Analyzed
                                </span>
                             )}

                             <div className="flex gap-2">
                                <button 
                                    onClick={() => handleViewReport(record)}
                                    className="text-sm font-semibold text-slate-600 hover:text-blue-600 border border-slate-200 px-5 py-2.5 rounded-xl hover:bg-slate-50 transition-colors"
                                >
                                    View Report
                                </button>
                                
                                <button 
                                    onClick={() => handleFindSpecialist(record)}
                                    className="text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 px-5 py-2.5 rounded-xl shadow-lg shadow-blue-500/30 transition-colors flex items-center gap-2"
                                >
                                    <span>Find Specialist</span>
                                </button>
                             </div>
                          </div>
                       </div>
                    ))}
                 </div>
              )}
           </div>

        </div>
      </div>
    </div>
  );
}
