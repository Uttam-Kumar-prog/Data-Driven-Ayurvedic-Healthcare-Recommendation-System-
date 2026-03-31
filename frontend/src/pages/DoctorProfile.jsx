import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doctorsData } from './DoctorList'; 
import { useAuth } from '../context/AuthContext';

export default function DoctorProfile() {
  const { id } = useParams();
  const { user } = useAuth();
  const doctor = doctorsData.find(d => d.id === parseInt(id));

  // Modal & Booking States
  const [showModal, setShowModal] = useState(false);
  const [bookingStep, setBookingStep] = useState(1); 
  const [isLoading, setIsLoading] = useState(false);

  // Form States
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [formData, setFormData] = useState({
     name: user?.name || '',
     phone: '',
     reason: ''
  });

  const availableSlots = ['10:00 AM', '11:30 AM', '02:15 PM', '04:45 PM', '06:00 PM'];

  if (!doctor) return <div className="text-center pt-40">Doctor not found</div>;

  const handleChange = (e) => {
     setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ===== UPDATED SUBMIT LOGIC =====
  const handleBookingSubmit = (e) => {
     e.preventDefault();
     setIsLoading(true);

     // 1. Create Appointment Object
     const newAppointment = {
        id: Date.now(), // Unique ID
        doctorId: doctor.id,
        doctorName: doctor.name,
        doctorSpecialty: doctor.specialty,
        doctorImage: doctor.image, // Save emoji/image for display
        date: selectedDate,
        time: selectedSlot,
        patientName: formData.name,
        status: 'Upcoming', // Default status
        type: 'Video Consultation' // Mock type
     };

     // 2. Simulate Network Delay
     setTimeout(() => {
        // 3. Save to LocalStorage
        const existingAppointments = JSON.parse(localStorage.getItem('ayur_appointments') || '[]');
        localStorage.setItem('ayur_appointments', JSON.stringify([newAppointment, ...existingAppointments]));

        setIsLoading(false);
        setBookingStep(2); 
     }, 1500);
  };

  const handleClose = () => {
     setShowModal(false);
     setTimeout(() => {
        setBookingStep(1);
        setSelectedSlot(null);
        setSelectedDate('');
     }, 300);
  };

  return (
    <div className="min-h-screen pt-28 pb-20 px-6 bg-slate-50 font-sans selection:bg-blue-100 selection:text-blue-900">
       {/* ... (Keep the rest of the UI exactly the same as before) ... */}
       {/* Just make sure the <form onSubmit={handleBookingSubmit}> uses the updated function above */}
       
       <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:20px_20px] opacity-60" />
       </div>

       <div className="max-w-5xl mx-auto relative z-10">
          <div className="mb-8 flex items-center gap-2 text-sm text-slate-500">
             <Link to="/doctors" className="hover:text-blue-600">Doctors</Link> 
             <span>/</span> 
             <span className="text-slate-800 font-bold">{doctor.name}</span>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
             <div className="md:col-span-1">
                <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-lg sticky top-32">
                   <div className="w-32 h-32 bg-blue-50 rounded-3xl mx-auto flex items-center justify-center text-7xl shadow-inner mb-6">
                      {doctor.image}
                   </div>
                   <div className="text-center mb-6">
                      <h1 className="text-2xl font-bold text-slate-900 mb-1">{doctor.name}</h1>
                      <p className="text-blue-600 font-bold text-sm uppercase tracking-wide">{doctor.specialty}</p>
                   </div>
                   
                   <div className="space-y-4 mb-8">
                      <div className="flex justify-between items-center text-sm border-b border-slate-50 pb-3">
                         <span className="text-slate-500">Experience</span>
                         <span className="font-bold text-slate-800">{doctor.experience}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm border-b border-slate-50 pb-3">
                         <span className="text-slate-500">Rating</span>
                         <span className="font-bold text-slate-800 flex items-center gap-1">
                            {doctor.rating} <span className="text-amber-500">★</span>
                         </span>
                      </div>
                      <div className="flex justify-between items-center text-sm border-b border-slate-50 pb-3">
                         <span className="text-slate-500">Fee</span>
                         <span className="font-bold text-slate-800">{doctor.fee}</span>
                      </div>
                   </div>

                   <button 
                      onClick={() => setShowModal(true)}
                      className="w-full py-4 bg-slate-900 text-white font-bold rounded-xl shadow-lg hover:bg-slate-800 hover:scale-[1.02] transition-all"
                   >
                      Book Appointment
                   </button>
                </div>
             </div>

             <div className="md:col-span-2 space-y-6">
                <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
                   <h2 className="text-xl font-bold text-slate-900 mb-4 font-serif">About Dr. {doctor.name.split(' ')[1]}</h2>
                   <p className="text-slate-600 leading-relaxed mb-6">
                      An experienced practitioner specializing in {doctor.specialty} with a focus on holistic healing. 
                      Dedicated to combining ancient Vedic wisdom with modern lifestyle adjustments.
                   </p>
                   <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-slate-50 rounded-2xl">
                         <span className="block text-xs font-bold text-slate-400 uppercase">Qualification</span>
                         <span className="block font-bold text-slate-800 mt-1">{doctor.qualification}</span>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-2xl">
                         <span className="block text-xs font-bold text-slate-400 uppercase">Languages</span>
                         <span className="block font-bold text-slate-800 mt-1">English, Hindi</span>
                      </div>
                   </div>
                </div>

                <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
                   <h2 className="text-xl font-bold text-slate-900 mb-6 font-serif">Clinic Availability</h2>
                   <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 hover:bg-slate-50 rounded-lg transition-colors">
                         <span className="font-medium text-slate-600">Monday - Friday</span>
                         <span className="text-sm font-bold text-blue-600">10:00 AM - 05:00 PM</span>
                      </div>
                   </div>
                </div>
             </div>
          </div>
       </div>

       {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
             <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={handleClose}></div>
             <div className="relative bg-white rounded-[2rem] shadow-2xl w-full max-w-lg overflow-hidden animate-fade-in-up">
                
                {bookingStep === 1 && (
                   <div className="p-8">
                      <div className="flex justify-between items-center mb-6">
                         <h2 className="text-2xl font-bold text-slate-900 font-serif">Book Appointment</h2>
                         <button onClick={handleClose} className="text-slate-400 hover:text-slate-600">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                         </button>
                      </div>

                      <form onSubmit={handleBookingSubmit} className="space-y-6">
                         <div className="space-y-4">
                            <div>
                               <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Select Date</label>
                               <input 
                                  type="date" 
                                  required
                                  value={selectedDate}
                                  onChange={(e) => setSelectedDate(e.target.value)}
                                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-blue-500 outline-none"
                               />
                            </div>
                            
                            <div>
                               <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Available Slots</label>
                               <div className="flex flex-wrap gap-2">
                                  {availableSlots.map((slot) => (
                                     <button
                                        key={slot}
                                        type="button"
                                        onClick={() => setSelectedSlot(slot)}
                                        className={`px-4 py-2 rounded-lg text-sm font-bold transition-all border ${
                                           selectedSlot === slot 
                                           ? 'bg-blue-600 text-white border-blue-600 shadow-md' 
                                           : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300'
                                        }`}
                                     >
                                        {slot}
                                     </button>
                                  ))}
                               </div>
                               {!selectedSlot && selectedDate && <p className="text-xs text-amber-600 mt-2">Please select a time slot.</p>}
                            </div>
                         </div>

                         <div className="space-y-3 pt-4 border-t border-slate-100">
                            <h3 className="text-sm font-bold text-slate-900">Patient Details</h3>
                            <input 
                               type="text" 
                               name="name"
                               placeholder="Patient Name" 
                               required
                               value={formData.name}
                               onChange={handleChange}
                               className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500"
                            />
                            <input 
                               type="tel" 
                               name="phone"
                               placeholder="Phone Number" 
                               required
                               value={formData.phone}
                               onChange={handleChange}
                               className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500"
                            />
                         </div>

                         <button 
                            type="submit" 
                            disabled={!selectedSlot || isLoading}
                            className="w-full py-4 bg-slate-900 text-white font-bold rounded-xl shadow-lg hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                         >
                            {isLoading ? 'Confirming...' : 'Confirm Appointment'}
                         </button>
                      </form>
                   </div>
                )}

                {bookingStep === 2 && (
                   <div className="p-10 text-center">
                      <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                         <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                      </div>
                      <h2 className="text-3xl font-bold text-slate-900 font-serif mb-2">Booked!</h2>
                      <p className="text-slate-500 mb-8">
                         Your appointment with <span className="font-bold text-slate-800">{doctor.name}</span> is confirmed.
                      </p>
                      <Link 
                         to="/dashboard"
                         className="block w-full py-4 bg-emerald-600 text-white font-bold rounded-xl shadow-lg hover:bg-emerald-700 transition-all"
                      >
                         Go to Dashboard
                      </Link>
                   </div>
                )}
             </div>
          </div>
       )}
    </div>
  );
}