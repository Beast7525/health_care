import express from 'express';
import { DoctorQuestion } from '../models/DoctorQuestion.js';

const router = express.Router();

// GET /api/doctor-questions
router.get('/', async (req, res) => {
  try {
    const questions = await DoctorQuestion.find().sort({ createdAt: -1 });
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/doctor-questions
router.post('/', async (req, res) => {
  try {
    const newQuestion = new DoctorQuestion(req.body);
    const saved = await newQuestion.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PATCH /api/doctor-questions/:id/bookmark
router.patch('/:id/bookmark', async (req, res) => {
  try {
    const question = await DoctorQuestion.findById(req.params.id);
    if (!question) return res.status(404).json({ error: 'Question not found' });

    question.isBookmarked = !question.isBookmarked;
    const updated = await question.save();
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
