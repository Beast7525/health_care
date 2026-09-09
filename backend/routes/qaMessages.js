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

// POST /api/qa-messages
router.post('/', async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: 'Text required' });

    const userMsg = new QAMessage({
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
    await userMsg.save();

    const allRecords = await Record.find().sort({ createdAt: -1 });
    const lower = text.toLowerCase();
    
    let replyText = "";
    let citations = [];

    // Dynamic database search over active records
    const matchingRecord = allRecords.find(r => {
      const titleMatch = r.title && (r.title.toLowerCase().includes(lower) || lower.includes(r.title.toLowerCase()));
      const summaryMatch = r.simplifiedSummary && r.simplifiedSummary.toLowerCase().includes(lower);
      const textMatch = r.rawText && r.rawText.toLowerCase().includes(lower);
      const catMatch = r.category && r.category.toLowerCase().includes(lower);
      const labMatch = r.labValues && r.labValues.some(v => 
        v.testName.toLowerCase().includes(lower) || lower.includes(v.testName.toLowerCase())
      );
      const termMatch = r.decodedTerms && r.decodedTerms.some(t => 
        t.term.toLowerCase().includes(lower) || lower.includes(t.term.toLowerCase())
      );
      return titleMatch || summaryMatch || textMatch || catMatch || labMatch || termMatch;
    });

    const isGeneralDocQuery = lower.includes('picture') || lower.includes('image') || lower.includes('pdf') || lower.includes('report') || lower.includes('record') || lower.includes('show') || lower.includes('what') || lower.includes('analyze') || lower.includes('result') || lower.includes('uploaded');

    if (matchingRecord) {
      let detailsStr = matchingRecord.simplifiedSummary;
      if (matchingRecord.labValues && matchingRecord.labValues.length > 0) {
        const metricsStr = matchingRecord.labValues.map(v => `${v.testName}: ${v.value} ${v.unit} (${v.status.toUpperCase()})`).join(', ');
        detailsStr += `\n\nExtracted Parameters: ${metricsStr}`;
      }
      replyText = `Analysis of your uploaded **${matchingRecord.title}** (${matchingRecord.category}, ${matchingRecord.date}):\n\n${detailsStr}`;
      citations.push({
        recordId: matchingRecord._id.toString(),
        recordTitle: matchingRecord.title,
        snippet: matchingRecord.simplifiedSummary,
        date: matchingRecord.date
      });
    } else if (isGeneralDocQuery && allRecords.length > 0) {
      const latestRec = allRecords[0];
      let detailsStr = latestRec.simplifiedSummary;
      if (latestRec.labValues && latestRec.labValues.length > 0) {
        const metricsStr = latestRec.labValues.map(v => `${v.testName}: ${v.value} ${v.unit} (${v.status.toUpperCase()})`).join(', ');
        detailsStr += `\n\nExtracted Parameters: ${metricsStr}`;
      }
      replyText = `Analysis of your uploaded record **${latestRec.title}** (${latestRec.category}, ${latestRec.date}):\n\n${detailsStr}`;
      citations.push({
        recordId: latestRec._id.toString(),
        recordTitle: latestRec.title,
        snippet: latestRec.simplifiedSummary,
        date: latestRec.date
      });
    } else if (allRecords.length > 0) {
      const recListStr = allRecords.map(r => r.title).join(', ');
      const primaryRec = allRecords[0];
      replyText = `I searched your MongoDB records (**${recListStr}**). Your uploaded documents do **not** contain specific mentions of "${text}".\n\nFor reference, your primary document **${primaryRec.title}** details: ${primaryRec.simplifiedSummary}`;
      citations.push({
        recordId: primaryRec._id.toString(),
        recordTitle: primaryRec.title,
        snippet: primaryRec.simplifiedSummary.slice(0, 150) + '...',
        date: primaryRec.date
      });
    } else {
      replyText = `You have not uploaded any medical records yet. Please upload your PDF or image reports in the "My Records" tab so I can analyze them.`;
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
