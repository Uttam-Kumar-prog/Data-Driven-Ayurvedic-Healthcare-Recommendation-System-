const express = require('express');
const { getTrends } = require('../controllers/analyticsController');
const router = express.Router();

router.get('/trends', getTrends);  // Add admin auth later

module.exports = router;
