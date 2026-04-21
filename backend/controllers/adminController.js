const User = require('../models/User');
const Appointment = require('../models/Appointment');
const SymptomHistory = require('../models/SymptomHistory');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');

exports.getPendingDoctors = asyncHandler(async (req, res) => {
  const doctors = await User.find({
    role: 'doctor',
    'doctorProfile.verifiedByAdmin': false,
  }).select('-password');

  return res.json({ success: true, count: doctors.length, doctors });
});

exports.verifyDoctor = asyncHandler(async (req, res) => {
  const doctor = await User.findOne({ _id: req.params.id, role: 'doctor' });
  if (!doctor) {
    throw new ApiError(404, 'Doctor not found');
  }

  doctor.doctorProfile.verifiedByAdmin = true;
  doctor.isVerified = true;
  await doctor.save();

  return res.json({ success: true, message: 'Doctor verified successfully', doctor });
});

exports.getSystemHealth = asyncHandler(async (req, res) => {
  const [users, appointments, assessments] = await Promise.all([
    User.countDocuments(),
    Appointment.countDocuments(),
    SymptomHistory.countDocuments(),
  ]);

  return res.json({
    success: true,
    health: {
      status: 'ok',
      users,
      appointments,
      assessments,
      timestamp: new Date().toISOString(),
    },
  });
});
