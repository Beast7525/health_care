import mongoose from 'mongoose';

const citationSchema = new mongoose.Schema({
  recordId: { type: String },
  recordTitle: { type: String },
  snippet: { type: String },
  date: { type: String }
});

const qaMessageSchema = new mongoose.Schema({
  sender: { type: String, enum: ['user', 'ai'], required: true },
  text: { type: String, required: true },
  timestamp: { type: String, default: 'Just now' },
  citations: [citationSchema],
  warningNote: { type: String }
}, { timestamps: true });

export const QAMessage = mongoose.model('QAMessage', qaMessageSchema);
