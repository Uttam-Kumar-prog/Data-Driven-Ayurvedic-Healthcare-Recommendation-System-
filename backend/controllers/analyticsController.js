const SymptomHistory = require('../models/SymptomHistory');

exports.getTrends = async (req, res) => {
  // Admin check can be added
  try {
    const trends = await SymptomHistory.aggregate([
      { $group: { _id: '$symptoms.name', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);
    res.json(trends);
  } catch (err) {
    res.status(500).json({ msg: 'Error' });
  }
};
