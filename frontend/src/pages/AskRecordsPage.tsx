import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { MessageSquareText, Send, Sparkles, BookOpen, AlertTriangle } from 'lucide-react';

export const AskRecordsPage: React.FC = () => {
  const { qaMessages, sendQAPrompt, records } = useApp();
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [qaMessages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendQAPrompt(inputText);
    setInputText('');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 flex flex-col h-[calc(100vh-6rem)]">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">Ask Questions About My Uploaded Records</h1>
        <p className="text-xs text-slate-500 mt-0.5">Querying {records.length} stored documents</p>
      </div>

      <div className="flex-1 bg-white rounded-3xl border border-slate-200 shadow-xl flex flex-col overflow-hidden">
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-6 bg-slate-50/50">
          {qaMessages.map((msg) => (
            <div key={msg.id} className={`flex gap-3 max-w-3xl ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 ${msg.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-teal-600 text-white'}`}>
                {msg.sender === 'user' ? 'You' : <Sparkles className="w-4 h-4 text-white" />}
              </div>

              <div className={`p-4 rounded-3xl text-sm ${msg.sender === 'user' ? 'bg-blue-600 text-white font-medium' : 'bg-white border border-slate-200 text-slate-800 shadow-card'}`}>
                <p className="whitespace-pre-line">{msg.text}</p>
                {msg.citations && msg.citations.length > 0 && (
                  <div className="mt-3 pt-2 border-t border-slate-100 space-y-1">
                    <span className="text-[11px] font-bold text-teal-700 uppercase flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5" /> Verified Citation
                    </span>
                    {msg.citations.map((cite, i) => (
                      <div key={i} className="p-2 rounded-xl bg-teal-50 text-xs italic">
                        "{cite.snippet}" — <strong>{cite.recordTitle}</strong>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 bg-white border-t border-slate-200">
          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask anything about your lab reports or radiologist findings..."
              className="flex-1 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 text-sm font-medium"
            />
            <button type="submit" disabled={!inputText.trim()} className="p-3.5 rounded-2xl bg-teal-600 text-white font-bold shadow-md">
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
