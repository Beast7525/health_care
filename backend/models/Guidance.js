import mongoose from 'mongoose';

const guidanceSchema = new mongoose.Schema({
  category: { 
    type: String, 
    enum: ['Physical Recovery', 'Hydration & Nutrition', 'Sleep & Rest', 'Ergonomics & Activity'],
    required: true
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  actionableTips: [{ type: String }],
  relevanceReason: { type: String, default: 'Based on personal record analysis' }
}, { timestamps: true });

export const Guidance = mongoose.model('Guidance', guidanceSchema);
