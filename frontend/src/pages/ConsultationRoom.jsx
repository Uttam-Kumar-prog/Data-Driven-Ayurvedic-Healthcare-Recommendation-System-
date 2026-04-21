import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { appointmentsAPI } from '../utils/api';

const buildJitsiUrl = (roomId) =>
  `https://meet.jit.si/${encodeURIComponent(roomId)}#config.prejoinPageEnabled=true&config.startWithAudioMuted=false&config.startWithVideoMuted=false`;

export default function ConsultationRoom() {
  const { roomId } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [access, setAccess] = useState(null);
  const [appointment, setAppointment] = useState(null);

  useEffect(() => {
    const loadAccess = async () => {
      setLoading(true);
      setError('');
      try {
        const { data } = await appointmentsAPI.roomAccess(roomId);
        setAccess(data?.access || null);
        setAppointment(data?.appointment || null);
      } catch (apiError) {
        setError(apiError?.response?.data?.message || 'Unable to load consultation details.');
      } finally {
        setLoading(false);
      }
    };
    if (roomId) loadAccess();
  }, [roomId]);

  const meetingUrl = useMemo(() => {
    const fromAppointment = appointment?.meeting?.roomId || roomId;
    return buildJitsiUrl(fromAppointment);
  }, [appointment, roomId]);

  if (loading) {
    return (
      <div className="min-h-screen pt-28 px-6 bg-slate-50 flex items-center justify-center">
        <p className="text-slate-600 font-semibold">Preparing consultation room...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-28 px-6 bg-slate-50 flex items-center justify-center">
        <div className="bg-white border border-slate-200 rounded-2xl p-8 max-w-lg w-full text-center shadow-sm">
          <h1 className="text-2xl font-bold text-slate-900 mb-3">Consultation unavailable</h1>
          <p className="text-slate-600 mb-6">{error}</p>
          <Link to="/dashboard" className="px-5 py-2.5 bg-blue-600 text-white font-bold rounded-xl inline-block">
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  if (!access?.canJoinNow) {
    return (
      <div className="min-h-screen pt-28 pb-20 px-6 bg-slate-50">
        <div className="max-w-3xl mx-auto bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
          <h1 className="text-3xl font-bold text-slate-900 font-serif mb-4">Consultation Room</h1>
          <p className="text-slate-600 mb-3">{access?.reason || 'Meeting not available right now.'}</p>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <p className="text-xs font-bold text-slate-500 uppercase">Window Opens</p>
              <p className="text-slate-800 font-semibold mt-1">
                {access?.windowStart ? new Date(access.windowStart).toLocaleString() : 'N/A'}
              </p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <p className="text-xs font-bold text-slate-500 uppercase">Window Closes</p>
              <p className="text-slate-800 font-semibold mt-1">
                {access?.windowEnd ? new Date(access.windowEnd).toLocaleString() : 'N/A'}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/dashboard" className="px-5 py-2.5 bg-slate-900 text-white font-bold rounded-xl">
              Back to Patient Dashboard
            </Link>
            <Link to="/doctor-dashboard" className="px-5 py-2.5 bg-white border border-slate-300 text-slate-700 font-bold rounded-xl">
              Back to Doctor Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-8 px-4 bg-slate-900">
      <div className="max-w-7xl mx-auto">
        <div className="mb-4 bg-white/10 border border-white/20 rounded-2xl p-4 text-white flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm text-blue-200">Live Consultation</p>
            <h1 className="text-xl font-bold">
              {appointment?.patientName || 'Patient'} with {appointment?.doctorName || 'Doctor'}
            </h1>
            <p className="text-xs text-slate-200">
              Slot: {appointment?.slotDate} at {appointment?.slotTime}
            </p>
          </div>
          <a
            href={meetingUrl}
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2.5 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700"
          >
            Open in New Tab
          </a>
        </div>

        <div className="rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-black">
          <iframe
            title="AyuSetu Consultation Room"
            src={meetingUrl}
            allow="camera; microphone; fullscreen; display-capture"
            className="w-full h-[78vh] border-0"
          />
        </div>
      </div>
    </div>
  );
}

