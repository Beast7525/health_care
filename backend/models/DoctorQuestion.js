import mongoose from 'mongoose';

const doctorQuestionSchema = new mongoose.Schema({
  category: { 
    type: String, 
    enum: ['Lab Understanding', 'Symptom Progression', 'Recovery Plan', 'Medication Clarification'],
    required: true
  },
  questionText: { type: String, required: true },
  reason: { type: String, required: true },
  isCustom: { type: Boolean, default: false },
  isBookmarked: { type: Boolean, default: true }
}, { timestamps: true });

export const DoctorQuestion = mongoose.model('DoctorQuestion', doctorQuestionSchema);
