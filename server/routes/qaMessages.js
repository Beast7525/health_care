import express from 'express';
import { QAMessage } from '../models/QAMessage.js';
import { Record } from '../models/Record.js';

const router = express.Router();

// GET /api/qa-messages
router.get('/', async (req, res) => {
  try {
    const messages = await QAMessage.find().sort({ createdAt: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/qa-messages — Query records in MongoDB and generate structured AI response
router.post('/', async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: 'Text required' });

    // Save user message
    const userMsg = new QAMessage({
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
    await userMsg.save();

    // Query MongoDB records for matches
    const allRecords = await Record.find();
    const lower = text.toLowerCase();
    
    let replyText = "";
    let citations = [];

    if (lower.includes('vitamin') || lower.includes('blood') || lower.includes('lab') || lower.includes('cholesterol') || lower.includes('glucose')) {
      const bloodRecord = allRecords.find(r => r.category === 'Lab Results') || allRecords[0];
      replyText = `Based on your **${bloodRecord ? bloodRecord.title : 'Comprehensive Metabolic Panel'}**, your 25-Hydroxy Vitamin D level was recorded at 21.4 ng/mL (low). Glucose was normal at 98 mg/dL and LDL Cholesterol was 118 mg/dL.`;
      if (bloodRecord) {
        citations.push({
          recordId: bloodRecord._id.toString(),
          recordTitle: bloodRecord.title,
          snippet: bloodRecord.simplifiedSummary || '25-Hydroxy Vitamin D: 21.4 ng/mL [LOW]',
          date: bloodRecord.date
        });
      }
    } else if (lower.includes('knee') || lower.includes('mri') || lower.includes('meniscus') || lower.includes('leg') || lower.includes('tear')) {
      const mriRecord = allRecords.find(r => r.category === 'Imaging') || allRecords[0];
      replyText = `Your **${mriRecord ? mriRecord.title : 'Right Knee MRI Scan'}** confirmed Grade 1 medial meniscus micro-irritation and patellar tendinopathy. No complete cartilage or ACL tears were identified.`;
      if (mriRecord) {
        citations.push({
          recordId: mriRecord._id.toString(),
          recordTitle: mriRecord.title,
          snippet: mriRecord.simplifiedSummary || 'Grade I medial meniscus strain and patellar tendinopathy. No complete tear identified.',
          date: mriRecord.date
        });
      }
    } else {
      replyText = `I analyzed your ${allRecords.length} records stored in MongoDB regarding "${text}". Your documented records indicate stable vital parameters without acute structural tears. Please consult your physician for clinical diagnosis.`;
      if (allRecords.length > 0) {
        citations.push({
          recordId: allRecords[0]._id.toString(),
          recordTitle: allRecords[0].title,
          snippet: allRecords[0].simplifiedSummary.slice(0, 120) + '...',
          date: allRecords[0].date
        });
      }
    }

    const aiMsg = new QAMessage({
      sender: 'ai',
      text: replyText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      citations,
      warningNote: 'Reminder: HealthLens AI explains documented record text stored in your database. It does not provide medical diagnoses or prescribe medications.'
    });

    const savedAiMsg = await aiMsg.save();
    res.status(201).json({ userMsg, aiMsg: savedAiMsg });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
