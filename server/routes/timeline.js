import express from 'express';
import { TimelineEvent } from '../models/TimelineEvent.js';

const router = express.Router();

// GET /api/timeline
router.get('/', async (req, res) => {
  try {
    const events = await TimelineEvent.find().sort({ date: -1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/timeline
router.post('/', async (req, res) => {
  try {
    const newEvent = new TimelineEvent(req.body);
    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
