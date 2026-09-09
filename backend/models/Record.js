import mongoose from 'mongoose';

const decodedTermSchema = new mongoose.Schema({
  term: { type: String, required: true },
  definition: { type: String, required: true },
  category: { type: String, default: 'General' }
});

const labValueSchema = new mongoose.Schema({
  testName: { type: String, required: true },
  value: { type: String, required: true },
  unit: { type: String, default: '' },
  referenceRange: { type: String, default: '' },
  status: { type: String, enum: ['normal', 'low', 'high'], default: 'normal' }
});

const recordSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['Lab Results', 'Imaging', 'Discharge Summary', 'Prescription', 'Clinical Notes'],
    default: 'Clinical Notes'
  },
  date: { type: String, required: true },
  facility: { type: String, default: 'HealthLens Partner Facility' },
  doctorName: { type: String, default: 'Attending Physician' },
  fileSize: { type: String, default: '1.5 MB' },
  fileType: { type: String, default: 'pdf' },
  rawText: { type: String, required: true },
  simplifiedSummary: { type: String, required: true },
  decodedTerms: [decodedTermSchema],
  labValues: [labValueSchema]
}, { timestamps: true });

export const Record = mongoose.model('Record', recordSchema);
