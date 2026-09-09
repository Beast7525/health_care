import mongoose from 'mongoose';

const healthConcernSchema = new mongoose.Schema({
  description: { type: String, required: true },
  duration: { type: String, default: '2 weeks' },
  severity: { type: String, enum: ['mild', 'moderate', 'severe'], default: 'moderate' },
  triggers: { type: String, default: '' },
  selectedRecordIds: [{ type: String }],
  additionalNotes: { type: String, default: '' }
}, { timestamps: true });

export const HealthConcern = mongoose.model('HealthConcern', healthConcernSchema);
