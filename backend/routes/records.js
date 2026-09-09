import express from 'express';
import multer from 'multer';
import { createWorker } from 'tesseract.js';
import { Record } from '../models/Record.js';
import { TimelineEvent } from '../models/TimelineEvent.js';
import { analyzeExtractedDocument } from '../utils/documentAnalyzer.js';

const router = express.Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 25 * 1024 * 1024 }
});

// GET /api/records
router.get('/', async (req, res) => {
  try {
    const records = await Record.find().sort({ createdAt: -1 });
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/records/analyze - OCR and analyze an uploaded medical document
router.post('/analyze', upload.single('file'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'Please upload a document.' });

  try {
    let extractedText = '';
    const isImage = req.file.mimetype.startsWith('image/');

    if (isImage) {
      const worker = await createWorker('eng');
      const result = await worker.recognize(req.file.buffer);
      extractedText = result.data.text.trim();
      await worker.terminate();
    } else if (req.file.mimetype.startsWith('text/')) {
      extractedText = req.file.buffer.toString('utf8');
    } else {
      return res.status(415).json({ error: 'Image uploads and text files are supported for analysis.' });
    }

    if (!extractedText) {
      return res.status(422).json({
        error: 'No readable text was found in this file. Please upload a clearer image with the full report visible.'
      });
    }

    const title = req.body.title || req.file.originalname.replace(/\.[^/.]+$/, '');
    const category = req.body.category || 'Clinical Notes';
    const analysis = analyzeExtractedDocument(extractedText, title, category);
    const record = await new Record({
      title,
      category,
      date: req.body.date || new Date().toISOString().split('T')[0],
      facility: req.body.facility || 'Healthcare Facility',
      doctorName: req.body.doctorName || 'Attending Physician',
      fileSize: `${(req.file.size / 1024 / 1024).toFixed(1)} MB`,
      fileType: req.file.mimetype.includes('pdf') ? 'pdf' : req.file.mimetype.includes('png') ? 'png' : 'jpg',
      rawText: extractedText,
      ...analysis
    }).save();

    await new TimelineEvent({
      date: record.date,
      title: `${record.title} Uploaded`,
      category: record.category === 'Lab Results' ? 'Lab Test' : record.category === 'Imaging' ? 'Imaging' : 'Consultation',
      description: `Uploaded record from ${record.facility}.`,
      keyFindings: [record.simplifiedSummary.slice(0, 100)],
      recordId: record._id.toString(),
      recordTitle: record.title,
      statusTag: 'Monitored'
    }).save();

    res.status(201).json({ record, adviceTips: analysis.adviceTips, doctorQuestions: analysis.doctorQuestions });
  } catch (err) {
    console.error('Document analysis error:', err);
    res.status(500).json({ error: 'The document could not be analyzed. Please try a clearer image.' });
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
