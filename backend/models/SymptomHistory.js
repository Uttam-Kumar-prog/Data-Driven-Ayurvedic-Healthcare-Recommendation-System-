const mongoose = require('mongoose');

const symptomHistorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  symptoms: [{
    name: String,
    severity: Number,  // 1=mild,2=mod,3=severe
    lifestyle: String  // e.g., "sedentary, spicy diet"
  }],
  recommendations: Object,
  doshaImbalance: String,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('SymptomHistory', symptomHistorySchema);
