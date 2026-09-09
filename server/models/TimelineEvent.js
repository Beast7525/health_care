import mongoose from 'mongoose';

const timelineEventSchema = new mongoose.Schema({
  date: { type: String, required: true },
  title: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['Symptom', 'Lab Test', 'Imaging', 'Procedure', 'Consultation', 'Medication Record'],
    default: 'Symptom'
  },
  description: { type: String, required: true },
  keyFindings: [{ type: String }],
  recordId: { type: String },
  recordTitle: { type: String },
  statusTag: { 
    type: String, 
    enum: ['Stable', 'Monitored', 'Resolved', 'Follow-up Needed'],
    default: 'Monitored'
  }
}, { timestamps: true });

export const TimelineEvent = mongoose.model('TimelineEvent', timelineEventSchema);
