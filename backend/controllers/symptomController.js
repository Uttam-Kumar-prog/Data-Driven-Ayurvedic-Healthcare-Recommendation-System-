const fs = require('fs');
const path = require('path');
const SymptomHistory = require('../models/SymptomHistory');
const rules = JSON.parse(fs.readFileSync(path.join(__dirname, '../config/rules.json')));

exports.submitSymptoms = async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ msg: 'Auth required' });

    const { symptoms, lifestyle } = req.body;  // symptoms: [{name: 'headache', severity: 2}, ...]

    // Rule-based engine: Calculate dosha & recs
    let totalSeverity = 0;
    let doshaTriggers = [];
    let recommendations = [];

    symptoms.forEach(sym => {
      const rule = rules.symptoms[sym.name];
      if (rule) {
        const sevKey = ['mild', 'moderate', 'severe'][sym.severity - 1];
        totalSeverity += rule.severity[sevKey].score;
        doshaTriggers.push(rule.dosha);
        recommendations.push({
          symptom: sym.name,
          ...rule.severity[sevKey],
          explanation: rule.severity[sevKey].reason
        });
      }
    });

    const primaryDosha = [...new Set(doshaTriggers)].join('/');  // e.g., "Pitta/Vata" [web:1]

    const history = new SymptomHistory({
      userId: req.user.id,
      symptoms: symptoms.map(s => ({ ...s, lifestyle })),
      recommendations,
      doshaImbalance: primaryDosha
    });
    await history.save();

    res.json({
      recommendations,
      doshaImbalance: primaryDosha,
      severityLevel: totalSeverity > 4 ? 'severe' : totalSeverity > 2 ? 'moderate' : 'mild',
      disclaimer: rules.disclaimer
    });
  } catch (err) {
    res.status(500).json({ msg: 'Error processing' });
  }
};
