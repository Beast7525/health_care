import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Record } from './models/Record.js';
import { TimelineEvent } from './models/TimelineEvent.js';
import { Guidance } from './models/Guidance.js';
import { DoctorQuestion } from './models/DoctorQuestion.js';
import { QAMessage } from './models/QAMessage.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/healthlens';

const sampleRecords = [
  {
    title: 'Comprehensive Metabolic & Lipid Panel',
    category: 'Lab Results',
    date: '2026-08-14',
    facility: 'Apex Diagnostics & Lab Center',
    doctorName: 'Dr. Sarah Jenkins, MD',
    fileSize: '1.8 MB',
    fileType: 'pdf',
    rawText: `PATIENT RECORD - LAB RESULTS\nDate: 14-Aug-2026\nFacility: Apex Diagnostics\n\nSerum Glucose: 98 mg/dL\n25-Hydroxy Vitamin D: 21.4 ng/mL [LOW]\nSerum Triglycerides: 142 mg/dL\nLDL Cholesterol: 118 mg/dL\nTotal Cholesterol: 195 mg/dL\nhs-CRP: 1.1 mg/L [MILD SPIKE]`,
    simplifiedSummary: 'Your blood work shows overall good metabolic function, but your Vitamin D level (21.4 ng/mL) is slightly below the recommended target of 30 ng/mL. Your LDL cholesterol is borderline elevated, and there is a very mild indicator of general tissue inflammation (hs-CRP).',
    decodedTerms: [
      { term: '25-Hydroxy Vitamin D', definition: 'The primary circulating form of Vitamin D in the blood.', category: 'Lab Metric' },
      { term: 'hs-CRP', definition: 'A protein produced by the liver that rises during tissue inflammation.', category: 'Inflammatory Marker' }
    ],
    labValues: [
      { testName: '25-Hydroxy Vitamin D', value: '21.4', unit: 'ng/mL', referenceRange: '30.0 - 100.0', status: 'low' },
      { testName: 'Serum Glucose', value: '98', unit: 'mg/dL', referenceRange: '70 - 99', status: 'normal' },
      { testName: 'LDL Cholesterol', value: '118', unit: 'mg/dL', referenceRange: '< 100', status: 'high' }
    ]
  },
  {
    title: 'Right Knee MRI Scan & Radiologist Report',
    category: 'Imaging',
    date: '2026-07-28',
    facility: 'Metro Orthopedic Imaging Center',
    doctorName: 'Dr. Robert Vance, MD (Radiology)',
    fileSize: '4.2 MB',
    fileType: 'pdf',
    rawText: `MRI RIGHT KNEE WITHOUT CONTRAST\nDate: 28-Jul-2026\nFINDINGS: Grade 1 signal abnormality posterior horn medial meniscus. ACL and PCL intact. Mild patellar tendinopathy. Small joint effusion.`,
    simplifiedSummary: 'Your MRI scan showed no broken bones or severe ligament tears. The radiologist identified minor strain in the inner knee joint cushion (Grade 1 medial meniscus) and mild tendon irritation right below the kneecap.',
    decodedTerms: [
      { term: 'Grade 1 Signal Abnormality', definition: 'Minor internal fluid change inside cartilage without complete tear.', category: 'Imaging' },
      { term: 'Patellar Tendinopathy', definition: 'Soreness in the tendon connecting kneecap to shinbone.', category: 'Condition' }
    ]
  }
];

const sampleTimeline = [
  {
    date: '2026-08-14',
    title: 'Blood Panel & Vitamin D Assessment',
    category: 'Lab Test',
    description: 'Routine blood checkup at Apex Diagnostics. Mild Vitamin D deficiency (21.4 ng/mL) flagged.',
    keyFindings: ['Vitamin D low at 21.4 ng/mL', 'Glucose normal at 98 mg/dL'],
    statusTag: 'Monitored'
  },
  {
    date: '2026-07-28',
    title: 'Right Knee Diagnostic MRI',
    category: 'Imaging',
    description: 'Non-contrast MRI confirming Grade 1 meniscus irritation and mild patellar tendon strain.',
    keyFindings: ['No ACL tear', 'Small joint effusion'],
    statusTag: 'Resolved'
  }
];

const sampleGuidance = [
  {
    category: 'Ergonomics & Activity',
    title: 'Desk Break & Quad Activation Routine',
    description: 'Break up long sitting intervals every 45 minutes to relieve lower body stiffness.',
    actionableTips: [
      'Set a gentle 45-minute timer during work sessions to stand and stretch.',
      'Perform 10 standing bodyweight glute squeezes.'
    ],
    relevanceReason: 'Addresses seated leg tightness logged in PT evaluation.'
  },
  {
    category: 'Hydration & Nutrition',
    title: 'Vitamin D & Joint Support Nutrition',
    description: 'Incorporate Vitamin D-rich whole foods into your meal routine to support muscle recovery.',
    actionableTips: [
      'Include salmon, eggs, and fortified plant milks.',
      'Aim for 15 minutes of morning sunlight.'
    ],
    relevanceReason: 'Aligned with low Vitamin D flagged in August lab panel.'
  }
];

const sampleDoctorQuestions = [
  {
    category: 'Lab Understanding',
    questionText: 'My recent blood work showed Vitamin D at 21.4 ng/mL. What daily OTC supplement dosage do you recommend?',
    reason: 'Flagged low Vitamin D in August 2026 Lab Panel.'
  },
  {
    category: 'Symptom Progression',
    questionText: 'Is it safe for me to resume moderate incline hiking with Grade 1 meniscus signal on MRI?',
    reason: 'Follow-up on MRI findings from Metro Orthopedic.'
  }
];

const sampleQAMessages = [
  {
    sender: 'ai',
    text: 'Hello! I am your HealthLens AI Document Assistant powered by MongoDB. Ask me any question about your uploaded records.',
    timestamp: 'Just now'
  }
];

export const seedDatabase = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB for seeding...');

    const recordCount = await Record.countDocuments();
    if (recordCount === 0) {
      console.log('Seeding initial MongoDB collections...');
      await Record.insertMany(sampleRecords);
      await TimelineEvent.insertMany(sampleTimeline);
      await Guidance.insertMany(sampleGuidance);
      await DoctorQuestion.insertMany(sampleDoctorQuestions);
      await QAMessage.insertMany(sampleQAMessages);
      console.log('MongoDB successfully seeded with HealthLens initial data!');
    } else {
      console.log(`Database already contains ${recordCount} records. Skipping seed.`);
    }
  } catch (err) {
    console.error('Database seed error:', err.message);
  }
};

// Run directly if executed via node seed.js
if (process.argv[1]?.includes('seed.js')) {
  seedDatabase().then(() => mongoose.disconnect());
}
