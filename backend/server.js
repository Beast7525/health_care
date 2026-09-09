import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import dns from 'node:dns';

import recordsRouter from './routes/records.js';
import timelineRouter from './routes/timeline.js';
import guidanceRouter from './routes/guidance.js';
import doctorQuestionsRouter from './routes/doctorQuestions.js';
import qaMessagesRouter from './routes/qaMessages.js';
import healthConcernRouter from './routes/healthConcern.js';
import { seedDatabase } from './seed.js';

dotenv.config();

const dnsServers = process.env.DNS_SERVERS?.split(',').map(server => server.trim()).filter(Boolean);
if (dnsServers?.length) dns.setServers(dnsServers);

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;
const USE_MONGODB = process.env.DATABASE_MODE === 'mongodb' && Boolean(MONGODB_URI);

// CORS configuration for Render frontend deployment
const allowedOrigins = process.env.CLIENT_URL ? [process.env.CLIENT_URL] : '*';
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

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
    service: 'HealthLens AI Node.js Backend (Render Ready)',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString()
  });
});

// Database Connection & Server Listener
const startServer = (databaseMode) => {
    app.listen(PORT, () => {
      console.log(`🚀 HealthLens AI Express Server running on port ${PORT} (${databaseMode})`);
    });
};

if (!USE_MONGODB) {
  startServer('Memory Mode');
} else {
  mongoose.connect(MONGODB_URI)
    .then(async () => {
      console.log('✅ Connected to MongoDB');
      await seedDatabase();
      startServer('MongoDB');
    })
    .catch((err) => {
      console.warn(`⚠️ MongoDB Connection Error: ${err.message}`);
      startServer('Memory Fallback');
    });
}
