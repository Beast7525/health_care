import React, { createContext, useContext, useState, useEffect } from 'react';
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
import { apiClient } from '../api/client';

interface AppContextType {
  currentPage: PageType;
  setCurrentPage: (page: PageType) => void;
  userProfile: UserProfile;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  
  dbStatus: 'connected' | 'fallback' | 'checking';
  
  healthConcern: HealthConcern;
  setHealthConcern: React.Dispatch<React.SetStateAction<HealthConcern>>;
  heroDraftConcern: string;
  setHeroDraftConcern: (text: string) => void;
  startConversationWithPrompt: (promptText: string) => void;
  
  records: MedicalRecord[];
  addRecord: (newRecord: Omit<MedicalRecord, 'id'>) => MedicalRecord;
  addSavedRecord: (record: MedicalRecord) => void;
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
  const [dbStatus, setDbStatus] = useState<'connected' | 'fallback' | 'checking'>('checking');
  
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: 'Alex Morgan',
    email: 'alex.morgan@healthlens.ai',
    isLoggedIn: true
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

  useEffect(() => {
    async function initBackend() {
      const health = await apiClient.checkHealth();
      if (health.status === 'ok') {
        setDbStatus('connected');
        try {
          const dbRecords = await apiClient.getRecords();
          if (dbRecords.length > 0) setRecords(dbRecords);

          const dbTimeline = await apiClient.getTimeline();
          if (dbTimeline.length > 0) setTimelineEvents(dbTimeline);

          const dbGuidance = await apiClient.getGuidance();
          if (dbGuidance.length > 0) setGuidanceItems(dbGuidance);

          const dbQuestions = await apiClient.getDoctorQuestions();
          if (dbQuestions.length > 0) setDoctorQuestions(dbQuestions);

          const dbQA = await apiClient.getQAMessages();
          if (dbQA.length > 0) setQaMessages(dbQA);
        } catch (e) {
          console.warn('Failed to load initial backend collections, using memory data.');
        }
      } else {
        setDbStatus('fallback');
      }
    }
    initBackend();
  }, []);

  const startConversationWithPrompt = (promptText: string) => {
    setHealthConcern(prev => ({
      ...prev,
      description: promptText || 'I have leg discomfort...'
    }));
    setCurrentPage('conversation');
  };

  const addRecord = (newRecordData: Omit<MedicalRecord, 'id'>): MedicalRecord => {
    const tempId = `rec-${Date.now()}`;
    const fullRecord: MedicalRecord = { ...newRecordData, id: tempId };
    
    setRecords(prev => [fullRecord, ...prev]);

    const newEvent: TimelineEvent = {
      id: `evt-${Date.now()}`,
      date: fullRecord.date,
      title: `${fullRecord.title} Uploaded`,
      category: fullRecord.category === 'Lab Results' ? 'Lab Test' : fullRecord.category === 'Imaging' ? 'Imaging' : 'Consultation',
      description: `New medical record uploaded from ${fullRecord.facility}.`,
      keyFindings: [fullRecord.simplifiedSummary.slice(0, 100) + '...'],
      recordId: tempId,
      recordTitle: fullRecord.title,
      statusTag: 'Monitored'
    };
    setTimelineEvents(prev => [newEvent, ...prev]);

    if (dbStatus === 'connected') {
      apiClient.addRecord(newRecordData).then(saved => {
        setRecords(prev => prev.map(r => r.id === tempId ? { ...saved, id: (saved as any)._id || saved.id } : r));
      }).catch(err => console.error('MongoDB sync error:', err));
    }

    return fullRecord;
  };

  const addSavedRecord = (record: MedicalRecord) => {
    setRecords(prev => [record, ...prev.filter(existing => existing.id !== record.id)]);
    setTimelineEvents(prev => [{
      id: `evt-${Date.now()}`,
      date: record.date,
      title: `${record.title} Uploaded`,
      category: record.category === 'Lab Results' ? 'Lab Test' : record.category === 'Imaging' ? 'Imaging' : 'Consultation',
      description: `New medical record uploaded from ${record.facility}.`,
      keyFindings: [record.simplifiedSummary.slice(0, 100)],
      recordId: record.id,
      recordTitle: record.title,
      statusTag: 'Monitored'
    }, ...prev]);
  };

  const deleteRecord = (id: string) => {
    setRecords(prev => prev.filter(r => r.id !== id));
    if (dbStatus === 'connected') {
      apiClient.deleteRecord(id).catch(err => console.error('MongoDB delete error:', err));
    }
  };

  const addTimelineEvent = (eventData: Omit<TimelineEvent, 'id'>) => {
    const newEvent: TimelineEvent = { ...eventData, id: `evt-${Date.now()}` };
    setTimelineEvents(prev => [newEvent, ...prev]);

    if (dbStatus === 'connected') {
      apiClient.addTimelineEvent(eventData).catch(err => console.error('MongoDB timeline sync error:', err));
    }
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

    if (dbStatus === 'connected') {
      apiClient.addDoctorQuestion({ questionText, category, reason }).catch(err => console.error('MongoDB doctor Q error:', err));
    }
  };

  const toggleQuestionBookmark = (id: string) => {
    setDoctorQuestions(prev => prev.map(q => q.id === id ? { ...q, isBookmarked: !q.isBookmarked } : q));
    if (dbStatus === 'connected') {
      apiClient.toggleDoctorQuestionBookmark(id).catch(err => console.error('MongoDB bookmark error:', err));
    }
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

    if (dbStatus === 'connected') {
      apiClient.sendQAPrompt(userText).then(({ aiMsg }) => {
        setQaMessages(prev => [...prev, aiMsg]);
      }).catch(() => {
        generateLocalQAReply(userText);
      });
    } else {
      generateLocalQAReply(userText);
    }
  };

  const generateLocalQAReply = (userText: string) => {
    setTimeout(() => {
      const lower = userText.toLowerCase();
      
      // Dynamic search over active uploaded records
      const matchingRecord = records.find(r => {
        const titleMatch = r.title.toLowerCase().includes(lower) || lower.includes(r.title.toLowerCase());
        const summaryMatch = r.simplifiedSummary.toLowerCase().includes(lower);
        const textMatch = r.rawText.toLowerCase().includes(lower);
        const catMatch = r.category.toLowerCase().includes(lower);
        const labMatch = r.labValues?.some(v => 
          v.testName.toLowerCase().includes(lower) || lower.includes(v.testName.toLowerCase())
        );
        const termMatch = r.decodedTerms?.some(t => 
          t.term.toLowerCase().includes(lower) || lower.includes(t.term.toLowerCase())
        );
        return titleMatch || summaryMatch || textMatch || catMatch || labMatch || termMatch;
      });

      let replyText = "";
      let citations = [];

      const isGeneralDocQuery = lower.includes('picture') || lower.includes('image') || lower.includes('pdf') || lower.includes('report') || lower.includes('record') || lower.includes('show') || lower.includes('what') || lower.includes('analyze') || lower.includes('result') || lower.includes('uploaded');

      if (matchingRecord) {
        let detailsStr = matchingRecord.simplifiedSummary;
        if (matchingRecord.labValues && matchingRecord.labValues.length > 0) {
          const metricsStr = matchingRecord.labValues.map(v => `${v.testName}: ${v.value} ${v.unit} (${v.status.toUpperCase()})`).join(', ');
          detailsStr += `\n\nExtracted Parameters: ${metricsStr}`;
        }
        replyText = `Analysis of your uploaded **${matchingRecord.title}** (${matchingRecord.category}, ${matchingRecord.date}):\n\n${detailsStr}`;
        citations.push({
          recordId: matchingRecord.id,
          recordTitle: matchingRecord.title,
          snippet: matchingRecord.simplifiedSummary,
          date: matchingRecord.date
        });
      } else if (isGeneralDocQuery && records.length > 0) {
        const latestRec = records[0];
        let detailsStr = latestRec.simplifiedSummary;
        if (latestRec.labValues && latestRec.labValues.length > 0) {
          const metricsStr = latestRec.labValues.map(v => `${v.testName}: ${v.value} ${v.unit} (${v.status.toUpperCase()})`).join(', ');
          detailsStr += `\n\nExtracted Parameters: ${metricsStr}`;
        }
        replyText = `Analysis of your uploaded record **${latestRec.title}** (${latestRec.category}, ${latestRec.date}):\n\n${detailsStr}`;
        citations.push({
          recordId: latestRec.id,
          recordTitle: latestRec.title,
          snippet: latestRec.simplifiedSummary,
          date: latestRec.date
        });
      } else if (records.length > 0) {
        const recListStr = records.map(r => r.title).join(', ');
        const primaryRec = records[0];
        replyText = `I searched your uploaded records (**${recListStr}**). Your uploaded documents do **not** contain specific mentions of "${userText}".\n\nFor reference, your primary document **${primaryRec.title}** details: ${primaryRec.simplifiedSummary}`;
        citations.push({
          recordId: primaryRec.id,
          recordTitle: primaryRec.title,
          snippet: primaryRec.simplifiedSummary.slice(0, 150) + '...',
          date: primaryRec.date
        });
      } else {
        replyText = `You have not uploaded any medical records yet. Please upload your PDF or image reports in the "My Records" tab so I can analyze them.`;
      }

      const aiMsg: RecordQAMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'ai',
        text: replyText,
        timestamp: 'Just now',
        citations,
        warningNote: 'Reminder: HealthLens AI explains documented record text. It does not provide medical diagnoses or hallucinate unmentioned data.'
      };

      setQaMessages(prev => [...prev, aiMsg]);
    }, 500);
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
      dbStatus,
      userProfile,
      setUserProfile,
      healthConcern,
      setHealthConcern,
      heroDraftConcern,
      setHeroDraftConcern,
      startConversationWithPrompt,
      records,
      addRecord,
      addSavedRecord,
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
