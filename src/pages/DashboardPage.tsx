import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  LayoutDashboard, 
  Sparkles, 
  FileText, 
  Clock, 
  Compass, 
  MessageSquareText, 
  ShieldCheck, 
  Plus, 
  ArrowRight, 
  CheckCircle2, 
  Activity, 
  Stethoscope, 
  AlertTriangle,
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
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-slate-900 to-teal-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl relative z-10">
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
          className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-teal-400 to-blue-500 text-slate-950 font-bold text-sm shadow-lg hover:brightness-110 transition-all shrink-0 flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4 text-slate-950" />
          <span>New Concern Assessment</span>
        </button>
      </div>

      {/* Quick Action Cards Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div 
          onClick={() => setCurrentPage('conversation')}
          className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm hover:shadow-card hover:border-blue-300 cursor-pointer transition-all space-y-3 group"
        >
          <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Sparkles className="w-5 h-5 text-teal-600" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-sm group-hover:text-blue-700 transition-colors">Start Assistant</h3>
            <p className="text-slate-500 text-[11px] mt-0.5">Synthesize concern & records</p>
          </div>
        </div>

        <div 
          onClick={() => setCurrentPage('records')}
          className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm hover:shadow-card hover:border-blue-300 cursor-pointer transition-all space-y-3 group"
        >
          <div className="w-10 h-10 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center group-hover:scale-110 transition-transform">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-sm group-hover:text-blue-700 transition-colors">My Records</h3>
            <p className="text-slate-500 text-[11px] mt-0.5">{records.length} files organized & decoded</p>
          </div>
        </div>

        <div 
          onClick={() => setCurrentPage('timeline')}
          className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm hover:shadow-card hover:border-blue-300 cursor-pointer transition-all space-y-3 group"
        >
          <div className="w-10 h-10 rounded-2xl bg-cyan-100 text-cyan-700 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-sm group-hover:text-blue-700 transition-colors">My Timeline</h3>
            <p className="text-slate-500 text-[11px] mt-0.5">{timelineEvents.length} milestones tracked</p>
          </div>
        </div>

        <div 
          onClick={() => setCurrentPage('ask_records')}
          className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm hover:shadow-card hover:border-blue-300 cursor-pointer transition-all space-y-3 group"
        >
          <div className="w-10 h-10 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center group-hover:scale-110 transition-transform">
            <MessageSquareText className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-sm group-hover:text-blue-700 transition-colors">Ask My Records</h3>
            <p className="text-slate-500 text-[11px] mt-0.5">RAG document search</p>
          </div>
        </div>
      </div>

      {/* Main Grid: Active Concern & Recent Records */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Active Concern Overview */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-bold text-slate-900">Current Health Concern Summary</h2>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold border border-amber-200">
              {healthConcern.severity.toUpperCase()} SEVERITY
            </span>
          </div>

          <div className="space-y-3 text-slate-700 text-sm">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Concern Description</span>
              <p className="font-medium text-slate-800">
                "{healthConcern.description || 'I have leg discomfort after hiking...'}"
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-400 font-medium">Duration:</span>
                <p className="font-bold text-slate-800">{healthConcern.duration}</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-400 font-medium">Triggers:</span>
                <p className="font-bold text-slate-800">{healthConcern.triggers}</p>
              </div>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              onClick={() => setCurrentPage('guidance')}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm inline-flex items-center gap-1.5"
            >
              <span>View Guidance & Doctor Checklist</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Recent Records Widget */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-teal-600" />
              <h2 className="text-lg font-bold text-slate-900">Recent Records</h2>
            </div>
            <button
              onClick={() => setCurrentPage('records')}
              className="text-xs font-bold text-blue-600 hover:text-blue-800 underline"
            >
              View All ({records.length})
            </button>
          </div>

          <div className="space-y-3">
            {records.slice(0, 3).map((rec) => (
              <div
                key={rec.id}
                onClick={() => setCurrentPage('records')}
                className="p-3.5 rounded-2xl bg-slate-50 hover:bg-blue-50/50 border border-slate-200 transition-all cursor-pointer space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-blue-800 bg-blue-100/70 px-2 py-0.5 rounded">
                    {rec.category}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">{rec.date}</span>
                </div>
                <h4 className="font-bold text-slate-900 text-xs truncate">{rec.title}</h4>
                <p className="text-[11px] text-slate-500 truncate">{rec.facility}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
