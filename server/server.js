import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import recordsRouter from './routes/records.js';
import timelineRouter from './routes/timeline.js';
import guidanceRouter from './routes/guidance.js';
import doctorQuestionsRouter from './routes/doctorQuestions.js';
import qaMessagesRouter from './routes/qaMessages.js';
import healthConcernRouter from './routes/healthConcern.js';
import { seedDatabase } from './seed.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/healthlens';

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/records', recordsRouter);
app.use('/api/timeline', timelineRouter);
app.use('/api/guidance', guidanceRouter);
app.use('/api/doctor-questions', doctorQuestionsRouter);
app.use('/api/qa-messages', qaMessagesRouter);
app.use('/api/health-concern', healthConcernRouter);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    service: 'HealthLens AI Node.js Backend',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString()
  });
});

// Database Connection & Server Listener
mongoose.connect(MONGODB_URI)
  .then(async () => {
    console.log(`✅ Connected to MongoDB at: ${MONGODB_URI}`);
    await seedDatabase();
    app.listen(PORT, () => {
      console.log(`🚀 HealthLens AI Express Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.warn(`⚠️ MongoDB Connection Error: ${err.message}`);
    console.warn(`Starting Express Server in memory-fallback mode on port ${PORT}...`);
    app.listen(PORT, () => {
      console.log(`🚀 Express Server running on http://localhost:${PORT} (Memory Fallback)`);
    });
  });
