import express from 'express';
import { Guidance } from '../models/Guidance.js';

const router = express.Router();

// GET /api/guidance
router.get('/', async (req, res) => {
  try {
    const items = await Guidance.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
