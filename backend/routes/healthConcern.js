import express from 'express';
import { HealthConcern } from '../models/HealthConcern.js';

const router = express.Router();

// GET /api/health-concern
router.get('/', async (req, res) => {
  try {
    const concern = await HealthConcern.findOne().sort({ createdAt: -1 });
    res.json(concern || {
      description: 'I have leg discomfort after hiking...',
      duration: '2 weeks',
      severity: 'moderate',
      triggers: 'Hiking, sitting for long hours',
      selectedRecordIds: [],
      additionalNotes: ''
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/health-concern
router.post('/', async (req, res) => {
  try {
    const newConcern = new HealthConcern(req.body);
    const saved = await newConcern.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
