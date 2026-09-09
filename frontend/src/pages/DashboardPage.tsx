import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Sparkles, 
  FileText, 
  Clock, 
  MessageSquareText, 
  ArrowRight, 
  Activity, 
  UserCheck
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { 
    userProfile, 
    healthConcern, 
    records, 
    timelineEvents, 
    setCurrentPage,
    startConversationWithPrompt 
  } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="bg-gradient-to-r from-blue-900 via-slate-900 to-teal-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold border border-teal-400/30 flex items-center gap-1.5">
              <UserCheck className="w-3.5 h-3.5" /> Welcome back, {userProfile.name}
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Your Personal Recovery Hub
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm">
            Review your organized medical records, timeline progress, and non-diagnostic wellness insights in one unified dashboard.
          </p>
        </div>

        <button
          onClick={() => startConversationWithPrompt('I want to check my overall recovery progress...')}
          className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-teal-400 to-blue-500 text-slate-950 font-bold text-sm shadow-lg transition-all shrink-0 flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4 text-slate-950" />
          <span>New Concern Assessment</span>
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div onClick={() => setCurrentPage('conversation')} className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm hover:border-blue-300 cursor-pointer space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-teal-600" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm">Start Assistant</h3>
        </div>

        <div onClick={() => setCurrentPage('records')} className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm hover:border-blue-300 cursor-pointer space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center">
            <FileText className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm">My Records ({records.length})</h3>
        </div>

        <div onClick={() => setCurrentPage('timeline')} className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm hover:border-blue-300 cursor-pointer space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-cyan-100 text-cyan-700 flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm">My Timeline ({timelineEvents.length})</h3>
        </div>

        <div onClick={() => setCurrentPage('ask_records')} className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm hover:border-blue-300 cursor-pointer space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
            <MessageSquareText className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm">Ask My Records</h3>
        </div>
      </div>
    </div>
  );
};
