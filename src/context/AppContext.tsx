import React, { createContext, useContext, useState } from 'react';
import { 
  PageType, 
  MedicalRecord, 
  TimelineEvent, 
  WellnessGuidance, 
  DoctorQuestion, 
  RecordQAMessage, 
  HealthConcern, 
  UserProfile 
} from '../types';
import { 
  INITIAL_RECORDS, 
  INITIAL_TIMELINE, 
  INITIAL_GUIDANCE, 
  INITIAL_DOCTOR_QUESTIONS, 
  INITIAL_QA_MESSAGES 
} from '../data/mockData';

interface AppContextType {
  currentPage: PageType;
  setCurrentPage: (page: PageType) => void;
  userProfile: UserProfile;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  
  healthConcern: HealthConcern;
  setHealthConcern: React.Dispatch<React.SetStateAction<HealthConcern>>;
  heroDraftConcern: string;
  setHeroDraftConcern: (text: string) => void;
  startConversationWithPrompt: (promptText: string) => void;
  
  records: MedicalRecord[];
  addRecord: (newRecord: Omit<MedicalRecord, 'id'>) => MedicalRecord;
  deleteRecord: (id: string) => void;
  
  timelineEvents: TimelineEvent[];
  addTimelineEvent: (event: Omit<TimelineEvent, 'id'>) => void;
  
  guidanceItems: WellnessGuidance[];
  doctorQuestions: DoctorQuestion[];
  addDoctorQuestion: (questionText: string, category: DoctorQuestion['category'], reason: string) => void;
  toggleQuestionBookmark: (id: string) => void;
  
  qaMessages: RecordQAMessage[];
  sendQAPrompt: (userText: string) => void;
  
  resetDemoData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<PageType>('landing');
  
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: 'Alex Morgan',
    email: 'alex.morgan@healthlens.ai',
    isLoggedIn: true,
    emergencyContact: 'Jane Morgan (Spouse) - 555-0199'
  });

  const [heroDraftConcern, setHeroDraftConcern] = useState<string>('I have leg discomfort after hiking...');

  const [healthConcern, setHealthConcern] = useState<HealthConcern>({
    description: '',
    duration: '2 weeks',
    severity: 'moderate',
    triggers: 'Hiking, sitting for long hours',
    selectedRecordIds: ['rec-001', 'rec-002'],
    additionalNotes: ''
  });

  const [records, setRecords] = useState<MedicalRecord[]>(INITIAL_RECORDS);
  const [timelineEvents, setTimelineEvents] = useState<TimelineEvent[]>(INITIAL_TIMELINE);
  const [guidanceItems, setGuidanceItems] = useState<WellnessGuidance[]>(INITIAL_GUIDANCE);
  const [doctorQuestions, setDoctorQuestions] = useState<DoctorQuestion[]>(INITIAL_DOCTOR_QUESTIONS);
  const [qaMessages, setQaMessages] = useState<RecordQAMessage[]>(INITIAL_QA_MESSAGES);

  const startConversationWithPrompt = (promptText: string) => {
    setHealthConcern(prev => ({
      ...prev,
      description: promptText || 'I have leg discomfort...'
    }));
    setCurrentPage('conversation');
  };

  const addRecord = (newRecordData: Omit<MedicalRecord, 'id'>): MedicalRecord => {
    const newId = `rec-${Date.now()}`;
    const fullRecord: MedicalRecord = {
      ...newRecordData,
      id: newId
    };
    
    setRecords(prev => [fullRecord, ...prev]);

    // Automatically add a timeline event for uploaded record
    const newEvent: TimelineEvent = {
      id: `evt-${Date.now()}`,
      date: fullRecord.date,
      title: `${fullRecord.title} Uploaded`,
      category: fullRecord.category === 'Lab Results' ? 'Lab Test' : fullRecord.category === 'Imaging' ? 'Imaging' : 'Consultation',
      description: `New medical record uploaded from ${fullRecord.facility}.`,
      keyFindings: [fullRecord.simplifiedSummary.slice(0, 100) + '...'],
      recordId: newId,
      recordTitle: fullRecord.title,
      statusTag: 'Monitored'
    };
    
    setTimelineEvents(prev => [newEvent, ...prev]);
    return fullRecord;
  };

  const deleteRecord = (id: string) => {
    setRecords(prev => prev.filter(r => r.id !== id));
  };

  const addTimelineEvent = (eventData: Omit<TimelineEvent, 'id'>) => {
    const newEvent: TimelineEvent = {
      ...eventData,
      id: `evt-${Date.now()}`
    };
    setTimelineEvents(prev => [newEvent, ...prev]);
  };

  const addDoctorQuestion = (questionText: string, category: DoctorQuestion['category'], reason: string) => {
    const newQ: DoctorQuestion = {
      id: `dq-${Date.now()}`,
      category,
      questionText,
      reason,
      isCustom: true,
      isBookmarked: true
    };
    setDoctorQuestions(prev => [newQ, ...prev]);
  };

  const toggleQuestionBookmark = (id: string) => {
    setDoctorQuestions(prev => prev.map(q => q.id === id ? { ...q, isBookmarked: !q.isBookmarked } : q));
  };

  const sendQAPrompt = (userText: string) => {
    if (!userText.trim()) return;

    const userMsgId = `msg-${Date.now()}`;
    const userMsg: RecordQAMessage = {
      id: userMsgId,
      sender: 'user',
      text: userText,
      timestamp: 'Just now'
    };

    setQaMessages(prev => [...prev, userMsg]);

    // Simulated RAG Search over uploaded records
    setTimeout(() => {
      const lower = userText.toLowerCase();
      let replyText = "";
      let citations = [];

      if (lower.includes('vitamin') || lower.includes('blood') || lower.includes('lab') || lower.includes('cholesterol') || lower.includes('glucose')) {
        replyText = "Based on your **Comprehensive Metabolic & Lipid Panel** (Aug 14, 2026), your Vitamin D was 21.4 ng/mL (low reference threshold 30 ng/mL) and Glucose was normal at 98 mg/dL. Your LDL Cholesterol was 118 mg/dL (borderline elevated).";
        citations.push({
          recordId: 'rec-001',
          recordTitle: 'Comprehensive Metabolic & Lipid Panel',
          snippet: '25-Hydroxy Vitamin D: 21.4 ng/mL [LOW]. Serum Glucose: 98 mg/dL. LDL Cholesterol: 118 mg/dL.',
          date: '2026-08-14'
        });
      } else if (lower.includes('knee') || lower.includes('mri') || lower.includes('meniscus') || lower.includes('leg') || lower.includes('tear')) {
        replyText = "Your **Right Knee MRI Scan** (Jul 28, 2026) showed a Grade 1 meniscus signal abnormality without any cartilage tears. Ligaments (ACL & PCL) are completely intact. A small amount of joint fluid (effusion) was noted.";
        citations.push({
          recordId: 'rec-002',
          recordTitle: 'Right Knee MRI Scan & Radiologist Report',
          snippet: 'IMPRESSION: Grade I medial meniscus strain/micro-irritation and mild patellar tendinopathy. No complete tear identified.',
          date: '2026-07-28'
        });
      } else if (lower.includes('physical therapy') || lower.includes('pt') || lower.includes('exercise') || lower.includes('stretch') || lower.includes('desk')) {
        replyText = "Your **Physical Therapy Assessment** (Jun 10, 2026) recommends taking a desk break every 45 minutes, strengthening your gluteus medius, and performing active hamstring stretches before prolonged walking.";
        citations.push({
          recordId: 'rec-003',
          recordTitle: 'Physical Therapy Assessment & Discharge Plan',
          snippet: 'PLAN & GUIDANCE: Ergonomic adjustments (stand up every 45 mins), Quadriceps and hip abduction strengthening exercises.',
          date: '2026-06-10'
        });
      } else {
        replyText = `I analyzed your ${records.length} uploaded health records for "${userText}". Here is what your documented records indicate: your records confirm stable vital signs and no acute surgical tears. Please consult your physician for individualized clinical evaluation.`;
        if (records.length > 0) {
          citations.push({
            recordId: records[0].id,
            recordTitle: records[0].title,
            snippet: records[0].simplifiedSummary.slice(0, 120) + '...',
            date: records[0].date
          });
        }
      }

      const aiMsg: RecordQAMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'ai',
        text: replyText,
        timestamp: 'Just now',
        citations,
        warningNote: 'Reminder: HealthLens AI explains documented record text. It does not provide medical diagnoses or prescribe medications.'
      };

      setQaMessages(prev => [...prev, aiMsg]);
    }, 600);
  };

  const resetDemoData = () => {
    setRecords(INITIAL_RECORDS);
    setTimelineEvents(INITIAL_TIMELINE);
    setGuidanceItems(INITIAL_GUIDANCE);
    setDoctorQuestions(INITIAL_DOCTOR_QUESTIONS);
    setQaMessages(INITIAL_QA_MESSAGES);
  };

  return (
    <AppContext.Provider value={{
      currentPage,
      setCurrentPage,
      userProfile,
      setUserProfile,
      healthConcern,
      setHealthConcern,
      heroDraftConcern,
      setHeroDraftConcern,
      startConversationWithPrompt,
      records,
      addRecord,
      deleteRecord,
      timelineEvents,
      addTimelineEvent,
      guidanceItems,
      doctorQuestions,
      addDoctorQuestion,
      toggleQuestionBookmark,
      qaMessages,
      sendQAPrompt,
      resetDemoData
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
