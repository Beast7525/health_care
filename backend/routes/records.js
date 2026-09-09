import express from 'express';
import { Record } from '../models/Record.js';
import { TimelineEvent } from '../models/TimelineEvent.js';

const router = express.Router();

// GET /api/records
router.get('/', async (req, res) => {
  try {
    const records = await Record.find().sort({ createdAt: -1 });
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/records
router.post('/', async (req, res) => {
  try {
    const recordData = req.body;
    
    if (!recordData.decodedTerms || recordData.decodedTerms.length === 0) {
      recordData.decodedTerms = [
        {
          term: 'Document OCR Intake',
          definition: 'Structured extraction of digital text from medical documentation.',
          category: 'Record Reader'
        }
      ];
    }

    const newRecord = new Record(recordData);
    const savedRecord = await newRecord.save();

    const newTimelineEvent = new TimelineEvent({
      date: savedRecord.date || new Date().toISOString().split('T')[0],
      title: `${savedRecord.title} Uploaded`,
      category: savedRecord.category === 'Lab Results' ? 'Lab Test' : savedRecord.category === 'Imaging' ? 'Imaging' : 'Consultation',
      description: `Uploaded record from ${savedRecord.facility || 'Healthcare Facility'}.`,
      keyFindings: [savedRecord.simplifiedSummary ? savedRecord.simplifiedSummary.slice(0, 100) + '...' : 'New record file processed.'],
      recordId: savedRecord._id.toString(),
      recordTitle: savedRecord.title,
      statusTag: 'Monitored'
    });
    await newTimelineEvent.save();

    res.status(201).json(savedRecord);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /api/records/:id
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Record.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Record not found' });
    res.json({ message: 'Record deleted successfully', id: req.params.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
