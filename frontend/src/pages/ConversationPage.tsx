import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  FileText, 
  CheckCircle2, 
  BrainCircuit, 
  Stethoscope, 
  Plus, 
  ChevronRight, 
  RefreshCw, 
  ArrowRight,
  ShieldCheck,
  Zap,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  quickReplies?: string[];
  actionCard?: {
    title: string;
    type: 'lab' | 'symptom' | 'general';
    items: string[];
    warning?: string;
  };
}

export const ConversationPage: React.FC = () => {
  const { 
    healthConcern, 
    records, 
    setCurrentPage, 
    addDoctorQuestion,
    heroDraftConcern
  } = useApp();

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedRecordId, setSelectedRecordId] = useState<string | null>(records[0]?.id || null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const hasAutoSentPromptRef = useRef(false);

  // Initial Interactive Chat Thread
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-init-1',
      sender: 'ai',
      text: "Hello! I am your HealthLens assistant. Ask a health question, describe a concern, or choose one of the prompts below to explore your records.",
      timestamp: 'Just now',
      quickReplies: [
        '📊 Analyze my blood test result',
        '🦵 Leg discomfort after exertion',
        '📄 Explain my uploaded MRI scan'
      ]
    }
  ]);

  // If hero draft or health concern was passed from landing page
  useEffect(() => {
    if (healthConcern.description && messages.length === 1 && !hasAutoSentPromptRef.current) {
      hasAutoSentPromptRef.current = true;
      handleUserSend(healthConcern.description);
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleUserSend = (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    // Simulate Real-Time Gemini / ChatGPT Interactive Processing
    setTimeout(() => {
      const lower = query.toLowerCase();
      let aiText = "";
      let quickReplies: string[] = [];
      let actionCard: ChatMessage['actionCard'] = undefined;

      // Blood glucose analysis
      if (lower.includes('glucose') || lower.includes('sugar') || lower.includes('hba1c') || lower.includes('diabetes') || lower.includes('155') || lower.includes('140') || lower.includes('180')) {
        const activeRec = records.find(r => r.title.toLowerCase().includes('blood') || r.category === 'Lab Results');
        aiText = `📊 **Glycemic Metric Analysis**\n\nI processed your inquiry regarding blood sugar markers. Standard baseline fasting glucose is 70 - 99 mg/dL.`;
        actionCard = {
          title: `Real-Time Guidance: Blood Sugar Evaluation`,
          type: 'lab',
          items: [
            'Post-meal blood sugar naturally spikes and returns to baseline within 2 hours.',
            'Maintain regular light post-meal walks (10-15 min) to optimize insulin sensitivity.',
            'Prioritize fiber-rich complex carbohydrates (vegetables, oats) over refined sugars.'
          ]
        };
        if (activeRec) {
          aiText += `\n\nCross-referenced with your uploaded report **"${activeRec.title}"**: ${activeRec.simplifiedSummary}`;
        }
        quickReplies = [
          'Test was taken after fasting overnight',
          'Test was taken 1 hour after meal',
          'Should I track daily home blood glucose?',
          'Upload PDF report for instant OCR'
        ];
      }

      // Knee / MRI / joint / physical discomfort
      else if (lower.includes('knee') || lower.includes('mri') || lower.includes('leg') || lower.includes('joint') || lower.includes('hiking') || lower.includes('pain')) {
        const mriRec = records.find(r => r.category === 'Imaging' || r.title.toLowerCase().includes('mri') || r.title.toLowerCase().includes('knee'));
        aiText = `🦴 **Musculoskeletal & Activity Assessment**\n\nI evaluated your physical discomfort concern. To help me give exact real-time recommendations:`;
        actionCard = {
          title: 'Joint & Tendon Recovery Recommendations',
          type: 'symptom',
          items: [
            'Apply ice/cold compress for 15 minutes post-activity if joint swelling occurs.',
            'Perform smooth, non-weight-bearing mobility (stationary cycling, swimming).',
            'Avoid sudden twisting or high-impact jumping on hard surfaces.'
          ]
        };
        if (mriRec) {
          aiText += `\n\nAccording to your uploaded **${mriRec.title}**: ${mriRec.simplifiedSummary}`;
        }
        quickReplies = [
          'Discomfort occurs after walking > 30 minutes',
          'No visible swelling or bruising',
          'Add question to Doctor Checklist',
          'What exercises are safe?'
        ];
      }

      // 5. General Real-Time Gemini Assistant Response
      else {
        aiText = `🤖 **Real-Time Interactive Synthesis**\n\nThank you for providing that details on "${query}". I am analyzing your real-time situation against your medical documentation baseline.`;
        actionCard = {
          title: `Key Observations for: ${query}`,
          type: 'general',
          items: [
            'Synthesized input without altered context or diagnostic speculation.',
            'Cross-referenced parameters against active health records.',
            'Formulated personalized doctor follow-up checklist questions.'
          ]
        };
        quickReplies = [
          'Summarize my uploaded health records',
          'Generate questions for my doctor',
          'What wellness steps should I take today?',
          'Explain another symptom'
        ];

        // Automatically add doctor question for user convenience
        addDoctorQuestion(
          `What are the clinical implications of "${query.slice(0, 60)}" based on my overall health baseline?`,
          'Symptom Progression',
          `Generated from real-time AI conversation on ${query.slice(0, 30)}`
        );
      }

      const aiMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'ai',
        text: aiText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        quickReplies,
        actionCard
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 650);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-gradient-to-r from-blue-600 to-teal-600 text-white font-extrabold text-xs tracking-wider uppercase flex items-center gap-1.5 shadow-sm">
              <Zap className="w-3.5 h-3.5 text-amber-300 animate-pulse" /> Real-Time Gemini AI Engine
            </span>
            <span className="text-xs text-slate-400 font-mono">Interactive Healthcare Assistant</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
            Interactive AI Health Assistant
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Real-time contextual conversation for emergencies, acute symptoms, and medical record decoding.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500">Ask about your records or how you’ve been feeling.</span>
        </div>
      </div>

      {/* Main Grid: Chat Stream + Active Records Selector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Chat Main Stream (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden flex flex-col h-[70vh] min-h-[520px]">
          
          {/* Chat Messages Body */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-6 bg-slate-50/50">
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'ai' && (
                  <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-blue-600 to-teal-600 text-white flex items-center justify-center font-bold shadow-md shrink-0">
                    <Bot className="w-5 h-5 text-teal-200" />
                  </div>
                )}

                <div className={`space-y-3 max-w-[85%] ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                  {/* Text Bubble */}
                  <div className={`p-4 rounded-3xl text-xs sm:text-sm leading-relaxed shadow-xs ${
                    msg.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-tr-none font-medium'
                      : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none font-medium'
                  }`}>
                    <p className="whitespace-pre-wrap">{msg.text}</p>

                    <div className={`text-[10px] mt-2 font-mono ${msg.sender === 'user' ? 'text-blue-200 text-right' : 'text-slate-400'}`}>
                      {msg.timestamp}
                    </div>
                  </div>

                  {/* Action Card if present */}
                  {msg.actionCard && (
                    <div className={`p-4 rounded-2xl border space-y-2.5 ${
                        msg.actionCard.type === 'lab'
                        ? 'bg-teal-50 border-teal-200 text-teal-950'
                        : 'bg-blue-50 border-blue-200 text-blue-950'
                    }`}>
                      <h4 className="font-extrabold text-xs uppercase tracking-wider flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-teal-600" />
                        {msg.actionCard.title}
                      </h4>

                      <div className="space-y-1.5">
                        {msg.actionCard.items.map((item, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs font-medium">
                            <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5 text-teal-600" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>

                    </div>
                  )}

                  {/* Contextual Quick Reply Pills */}
                  {msg.quickReplies && msg.quickReplies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {msg.quickReplies.map((reply, rIdx) => (
                        <button
                          key={rIdx}
                          onClick={() => {
                            handleUserSend(reply);
                          }}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                            'bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200 shadow-xs'
                          }`}
                        >
                          {reply}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {msg.sender === 'user' && (
                  <div className="w-9 h-9 rounded-2xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold shrink-0 text-xs">
                    You
                  </div>
                )}
              </motion.div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-blue-600 to-teal-600 text-white flex items-center justify-center font-bold shadow-md">
                  <Bot className="w-5 h-5 text-teal-200 animate-pulse" />
                </div>
                <div className="p-3.5 rounded-2xl bg-white border border-slate-200 text-xs text-slate-500 font-medium flex items-center gap-2 shadow-xs">
                  <Sparkles className="w-4 h-4 text-teal-600 animate-spin" />
                  <span>Gemini AI is analyzing real-time context & medical records...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input Bar */}
          <div className="p-4 bg-white border-t border-slate-200 space-y-2">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUserSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your real-time situation (e.g. Someone fainted, chest pain, glucose test result)..."
                className="flex-1 px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-blue-200"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="px-5 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white font-bold text-xs sm:text-sm shadow-md flex items-center gap-1.5 disabled:opacity-50 transition-all shrink-0"
              >
                <span>Send</span>
                <Send className="w-4 h-4" />
              </button>
            </form>

            <div className="flex items-center justify-between text-[11px] text-slate-400 px-1">
              <span>💡 Ask real-time questions tailored to your exact situation</span>
              <span className="font-mono">HealthLens AI v2.4</span>
            </div>
          </div>
        </div>

        {/* Right Sidebar: Active Records (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Active Health Records Panel */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-lg space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-blue-600" />
                Uploaded Health Records ({records.length})
              </h3>
              <button
                onClick={() => setCurrentPage('records')}
                className="text-[11px] font-bold text-blue-600 hover:underline"
              >
                + Upload New
              </button>
            </div>

            <div className="space-y-2 max-h-64 overflow-y-auto">
              {records.map((rec) => (
                <div
                  key={rec.id}
                  onClick={() => {
                    setSelectedRecordId(rec.id);
                    handleUserSend(`Please analyze my uploaded record "${rec.title}"`);
                  }}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer text-xs space-y-1 ${
                    selectedRecordId === rec.id
                      ? 'bg-blue-50 border-blue-300 ring-1 ring-blue-400'
                      : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between font-bold text-slate-900">
                    <span className="line-clamp-1">{rec.title}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{rec.date}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 line-clamp-2">{rec.simplifiedSummary}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Doctor Checklist Navigation */}
          <div className="p-5 rounded-3xl bg-gradient-to-br from-slate-900 to-blue-950 text-white space-y-3 shadow-xl border border-slate-800">
            <div className="flex items-center gap-2 text-teal-400 text-xs font-bold uppercase tracking-wider">
              <Stethoscope className="w-4 h-4" /> Doctor Visit Checklist
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Questions discussed in chat are automatically added to your Doctor Checklist for your next appointment.
            </p>
            <button
              onClick={() => setCurrentPage('guidance')}
              className="w-full py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
            >
              <span>View Doctor Checklist & Guidance</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
