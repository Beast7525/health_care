import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  MessageSquareText, 
  Send, 
  Sparkles, 
  FileText, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle, 
  BookOpen,
  ArrowRight,
  Info
} from 'lucide-react';

export const AskRecordsPage: React.FC = () => {
  const { qaMessages, sendQAPrompt, records, setCurrentPage } = useApp();
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [qaMessages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendQAPrompt(inputText);
    setInputText('');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 flex flex-col h-[calc(100vh-6rem)]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-4 shrink-0">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-800 text-xs font-bold border border-indigo-200 flex items-center gap-1.5">
              <MessageSquareText className="w-3.5 h-3.5 text-indigo-600" /> Document Q&A Assistant
            </span>
            <span className="text-xs text-slate-400 font-mono">Querying {records.length} Documents</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
            Ask Questions About My Uploaded Records
          </h1>
        </div>

        <button
          onClick={() => setCurrentPage('records')}
          className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors hidden sm:flex items-center gap-1.5"
        >
          <FileText className="w-4 h-4 text-slate-500" />
          <span>Manage Records ({records.length})</span>
        </button>
      </div>

      {/* Main Chat Container */}
      <div className="flex-1 bg-white rounded-3xl border border-slate-200/90 shadow-xl flex flex-col overflow-hidden">
        
        {/* Messages Feed */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-6 bg-slate-50/50">
          {qaMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 max-w-3xl ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
            >
              {/* Avatar */}
              <div 
                className={`w-9 h-9 rounded-2xl flex items-center justify-center text-xs font-bold shrink-0 shadow-sm ${
                  msg.sender === 'user' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gradient-to-br from-blue-700 to-teal-600 text-white'
                }`}
              >
                {msg.sender === 'user' ? 'You' : <Sparkles className="w-5 h-5 text-teal-300" />}
              </div>

              {/* Message Bubble */}
              <div className={`space-y-3 ${msg.sender === 'user' ? 'items-end' : ''}`}>
                <div 
                  className={`p-4 rounded-3xl text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-tr-none shadow-md font-medium'
                      : 'bg-white border border-slate-200/90 text-slate-800 rounded-tl-none shadow-card'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>

                  {/* Citations block if available */}
                  {msg.citations && msg.citations.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-slate-100 space-y-2">
                      <span className="text-[11px] font-bold text-teal-700 uppercase tracking-wider flex items-center gap-1">
                        <BookOpen className="w-3.5 h-3.5 text-teal-600" /> Verified Record Sources & Citations
                      </span>
                      <div className="space-y-2">
                        {msg.citations.map((cite, i) => (
                          <div key={i} className="p-3 rounded-2xl bg-teal-50/60 border border-teal-200/80 text-xs space-y-1">
                            <div className="flex items-center justify-between font-bold text-teal-900">
                              <span>{cite.recordTitle}</span>
                              <span className="text-[10px] text-slate-400 font-mono">{cite.date}</span>
                            </div>
                            <p className="text-slate-600 italic">"{cite.snippet}"</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Warning Note */}
                  {msg.warningNote && (
                    <div className="mt-3 p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-800 flex items-center gap-1.5 font-medium">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>{msg.warningNote}</span>
                    </div>
                  )}
                </div>

                <span className="text-[10px] text-slate-400 font-mono px-2 block">
                  {msg.timestamp}
                </span>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Footer */}
        <div className="p-4 bg-white border-t border-slate-200 space-y-3">
          {/* Quick Prompts */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            <span className="text-slate-400 font-semibold text-[11px] whitespace-nowrap">Try asking:</span>
            {[
              'What were my Vitamin D numbers?',
              'Did my knee MRI find any cartilage tear?',
              'What physical exercises were suggested?'
            ].map((promptText) => (
              <button
                key={promptText}
                onClick={() => sendQAPrompt(promptText)}
                className="px-3 py-1 rounded-xl bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-600 text-xs whitespace-nowrap transition-colors border border-slate-200"
              >
                {promptText}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask anything about your lab reports or radiologist findings..."
              className="flex-1 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-blue-200 text-slate-800 text-sm font-medium"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="p-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-teal-600 text-white hover:from-blue-700 hover:to-teal-700 disabled:opacity-50 font-bold shadow-md transition-all shrink-0"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>

          <p className="text-[10px] text-center text-slate-400">
            HealthLens AI responds strictly based on documented text from your uploaded files.
          </p>
        </div>

      </div>
    </div>
  );
};
