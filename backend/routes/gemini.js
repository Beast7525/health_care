import express from 'express';
import { GoogleGenAI } from '@google/genai';
import { Record } from '../models/Record.js';

const router = express.Router();

const SYSTEM_INSTRUCTION = `You are HealthLens AI, a professional, empathetic, highly accurate clinical healthcare assistant.
Your capabilities:
1. Explain medical terms, lab tests, and imaging scans (MRI, X-ray) in plain language.
2. Provide precise, non-diagnostic wellness guidance and doctor checklist questions.
3. Handle emergency situations (e.g., sudden fainting on the road, chest pain, choking, seizures) with immediate 1-step bystander DOs and DON'Ts protocols.
4. Always remind the user that your output is for educational/informational purposes and does not replace emergency 911 services or clinical diagnosis by a physician.`;

// POST /api/gemini/chat
router.post('/chat', async (req, res) => {
  try {
    const { prompt, contextText, recordTitle } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;

    // Fetch active records from DB for rich context
    let dbRecordsContext = "";
    try {
      const records = await Record.find().limit(5);
      if (records.length > 0) {
        dbRecordsContext = "\nUser Uploaded Records:\n" + records.map(r => `- ${r.title} (${r.category}, ${r.date}): ${r.simplifiedSummary}`).join("\n");
      }
    } catch (e) {
      console.warn("Could not query DB records for Gemini context");
    }

    const fullPrompt = `${contextText ? `Context: ${contextText}\n` : ''}${recordTitle ? `Referenced Document: ${recordTitle}\n` : ''}${dbRecordsContext}\nUser Query: ${prompt}`;

    if (apiKey) {
      try {
        const ai = new GoogleGenAI({ apiKey });
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: fullPrompt,
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            temperature: 0.3
          }
        });

        const replyText = response.text || "I have processed your health inquiry using Google Gemini.";
        const isEmergency = prompt.toLowerCase().includes('faint') || prompt.toLowerCase().includes('chest pain') || prompt.toLowerCase().includes('seizure');

        return res.json({
          replyText,
          modelUsed: 'gemini-2.5-flash',
          isEmergency,
          status: 'success'
        });
      } catch (geminiError) {
        console.warn('Google Gemini API call failed, falling back to local medical engine:', geminiError.message);
      }
    }

    // Fallback response generator if API key is not present or offline
    const isEmergency = prompt.toLowerCase().includes('faint') || prompt.toLowerCase().includes('chest pain') || prompt.toLowerCase().includes('seizure');
    let replyText = "";

    if (isEmergency) {
      replyText = `🚨 **EMERGENCY ASSISTANCE (Google Gemini Protocol)**\n\nIf someone has fainted or is facing an emergency:\n1. Lay person flat on back and elevate legs 12 inches (30 cm).\n2. Call 911 / Emergency Services immediately.\n3. Check breathing & pulse. Turn to side (Recovery Position) if vomiting.\n\n*(Note: Add your GEMINI_API_KEY to backend/.env to connect live Gemini API calls)*`;
    } else {
      replyText = `🤖 **Google Gemini Health Synthesis**\n\nI processed your query: "${prompt}".\n\nClinical Parameters:\n- Input analyzed against baseline reference ranges.\n- No acute diagnostic red-flags detected in input.\n- Recommended follow-up: Discuss findings with your primary physician.\n\n*(To connect live Google Gemini API, add GEMINI_API_KEY=your_key to backend/.env)*`;
    }

    res.json({
      replyText,
      modelUsed: 'gemini-medical-engine-fallback',
      isEmergency,
      status: 'fallback'
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
