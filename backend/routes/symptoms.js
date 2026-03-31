const express = require('express');
const { submitSymptoms } = require('../controllers/symptomController');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/submit', auth, submitSymptoms);

module.exports = router;
