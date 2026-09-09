export type PageType = 
  | 'landing' 
  | 'dashboard' 
  | 'conversation' 
  | 'records' 
  | 'timeline' 
  | 'guidance' 
  | 'ask_records' 
  | 'safety';

export interface MedicalTerm {
  term: string;
  definition: string;
  category: string;
}

export interface LabValue {
  testName: string;
  value: string;
  unit: string;
  referenceRange: string;
  status: 'normal' | 'low' | 'high';
}

export interface MedicalRecord {
  id: string;
  title: string;
  category: 'Lab Results' | 'Imaging' | 'Discharge Summary' | 'Prescription' | 'Clinical Notes';
  date: string;
  facility: string;
  doctorName: string;
  fileSize: string;
  fileType: 'pdf' | 'png' | 'jpg' | 'doc';
  rawText: string;
  simplifiedSummary: string;
  decodedTerms: MedicalTerm[];
  labValues?: LabValue[];
}

export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  category: 'Symptom' | 'Lab Test' | 'Imaging' | 'Procedure' | 'Consultation' | 'Medication Record';
  description: string;
  keyFindings: string[];
  recordId?: string;
  recordTitle?: string;
  statusTag?: 'Stable' | 'Monitored' | 'Resolved' | 'Follow-up Needed';
}

export interface WellnessGuidance {
  id: string;
  category: 'Physical Recovery' | 'Hydration & Nutrition' | 'Sleep & Rest' | 'Ergonomics & Activity';
  title: string;
  description: string;
  actionableTips: string[];
  relevanceReason: string;
}

export interface DoctorQuestion {
  id: string;
  category: 'Lab Understanding' | 'Symptom Progression' | 'Recovery Plan' | 'Medication Clarification';
  questionText: string;
  reason: string;
  isCustom?: boolean;
  isBookmarked?: boolean;
}

export interface QACitation {
  recordId: string;
  recordTitle: string;
  snippet: string;
  date: string;
}

export interface RecordQAMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  citations?: QACitation[];
  warningNote?: string;
}

export interface HealthConcern {
  description: string;
  duration: string;
  severity: 'mild' | 'moderate' | 'severe';
  triggers: string;
  selectedRecordIds: string[];
  additionalNotes: string;
  createdAt?: string;
}

export interface UserProfile {
  name: string;
  email: string;
  isLoggedIn: boolean;
  emergencyContact: string;
}
