const express = require('express');
const { body, param } = require('express-validator');
const {
  createPrescription,
  getMyPrescriptions,
  getPrescriptionByQr,
} = require('../controllers/prescriptionController');
const { protect, authorize } = require('../middleware/auth');
const validate = require('../middleware/validate');

const router = express.Router();

router.post(
  '/',
  protect,
  authorize('doctor', 'admin'),
  body('appointmentId').isMongoId().withMessage('appointmentId must be a valid id'),
  body('diagnosis').optional().isArray().withMessage('diagnosis must be an array'),
  body('diagnosis.*').optional().isString().withMessage('diagnosis entries must be strings'),
  body('medicines').isArray({ min: 1 }).withMessage('medicines must be a non-empty array'),
  body('medicines.*.name').isString().trim().notEmpty().withMessage('medicine name is required'),
  body('medicines.*.dose').isString().trim().notEmpty().withMessage('medicine dose is required'),
  body('medicines.*.frequency').isString().trim().notEmpty().withMessage('medicine frequency is required'),
  body('medicines.*.duration').isString().trim().notEmpty().withMessage('medicine duration is required'),
  body('medicines.*.instructions').optional().isString().withMessage('medicine instructions must be a string'),
  body('advice').optional().isString().isLength({ max: 3000 }).withMessage('advice is too long'),
  body('followUpDate').optional({ nullable: true }).isISO8601().withMessage('followUpDate must be a valid date'),
  validate,
  createPrescription
);
router.get('/mine', protect, authorize('patient', 'doctor', 'admin'), getMyPrescriptions);
router.get(
  '/qr/:token',
  protect,
  authorize('pharmacy', 'admin', 'doctor'),
  param('token').isUUID().withMessage('token must be a valid UUID'),
  validate,
  getPrescriptionByQr
);

module.exports = router;
