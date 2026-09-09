import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Compass, 
  CheckSquare, 
  BookMarked, 
  Plus, 
  Sparkles, 
  Printer, 
  Copy, 
  Check, 
  Stethoscope, 
  Sun, 
  Moon, 
  Activity, 
  Info,
  ShieldCheck
} from 'lucide-react';
import { DoctorQuestion } from '../types';

export const GuidancePage: React.FC = () => {
  const { guidanceItems, doctorQuestions, addDoctorQuestion, toggleQuestionBookmark } = useApp();
  const [copied, setCopied] = useState(false);

  // New question form state
  const [newQuestionText, setNewQuestionText] = useState('');
  const [newCategory, setNewCategory] = useState<DoctorQuestion['category']>('Lab Understanding');
  const [newReason, setNewReason] = useState('');
  const [showAddQModal, setShowAddQModal] = useState(false);

  const handleAddQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestionText.trim()) return;

    addDoctorQuestion(newQuestionText, newCategory, newReason || 'User custom question');
    setShowAddQModal(false);
    setNewQuestionText('');
    setNewReason('');
  };

  const copyDoctorGuideToClipboard = () => {
    const formattedText = doctorQuestions
      .map((q, i) => `${i + 1}. [${q.category}] ${q.questionText}\n   Context: ${q.reason}`)
      .join('\n\n');
    
    navigator.clipboard.writeText(`HEALTHLENS AI - DOCTOR VISIT DISCUSSION GUIDE\n\n` + formattedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-emerald-600" /> Non-Diagnostic Wellness Plan
            </span>
            <span className="text-xs text-slate-400 font-mono">Personalized Guidance</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
            Wellness Guidance & Doctor Preparation
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            General lifestyle recommendations based on your records, plus a checklist of questions to bring to your physician.
          </p>
        </div>

        <button
          onClick={copyDoctorGuideToClipboard}
          className="px-4 py-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs shadow-xs flex items-center gap-2"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-500" />}
          <span>{copied ? 'Copied Guide!' : 'Copy Doctor Discussion Guide'}</span>
        </button>
      </div>

      {/* SECTION 1: LIFESTYLE & WELLNESS CARDS */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-emerald-600" />
          Personalized Wellness Recovery Pillars
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {guidanceItems.map((item) => (
            <div key={item.id} className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-card space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-100">
                    {item.category}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>

                {/* Actionable Tips */}
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Actionable Steps</span>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    {item.actionableTips.map((tip, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-1.5"></span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-[11px] text-slate-500 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{item.relevanceReason}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 2: DOCTOR VISIT DISCUSSION GUIDE */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <Stethoscope className="w-5 h-5 text-teal-400" />
              <h2 className="text-xl font-bold">Prepare For Your Doctor Visit</h2>
            </div>
            <p className="text-xs text-slate-300 mt-1">
              Customized questions generated from your uploaded lab results and MRI findings to ask your doctor.
            </p>
          </div>

          <button
            onClick={() => setShowAddQModal(true)}
            className="px-4 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs shadow-md flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Add Custom Question</span>
          </button>
        </div>

        {/* Questions Checklist */}
        <div className="space-y-3">
          {doctorQuestions.map((q) => (
            <div
              key={q.id}
              className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 hover:border-teal-500/50 transition-all flex items-start justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 text-[10px] font-bold uppercase border border-teal-400/20">
                    {q.category}
                  </span>
                  {q.isCustom && (
                    <span className="text-[10px] text-slate-400 font-mono">Custom Added</span>
                  )}
                </div>
                <p className="text-sm font-semibold text-white leading-relaxed">{q.questionText}</p>
                <p className="text-xs text-slate-400">Context: {q.reason}</p>
              </div>

              <button
                onClick={() => toggleQuestionBookmark(q.id)}
                className={`p-2 rounded-xl transition-colors shrink-0 ${
                  q.isBookmarked ? 'bg-teal-500/20 text-teal-400' : 'text-slate-500 hover:text-white'
                }`}
                title="Bookmark for appointment"
              >
                <BookMarked className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ADD QUESTION MODAL */}
      {showAddQModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden">
            <div className="bg-slate-900 text-white p-6">
              <h3 className="text-xl font-bold">Add Question for Your Doctor</h3>
              <p className="text-xs text-slate-400">Save a question to review during your visit</p>
            </div>

            <form onSubmit={handleAddQuestion} className="p-6 space-y-4 text-slate-800 text-sm">
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600">Question Text</label>
                <textarea
                  required
                  rows={3}
                  value={newQuestionText}
                  onChange={(e) => setNewQuestionText(e.target.value)}
                  placeholder="e.g. Is physical therapy recommended twice a week for my knee strain?"
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium"
                ></textarea>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600">Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium"
                >
                  <option value="Lab Understanding">Lab Understanding</option>
                  <option value="Symptom Progression">Symptom Progression</option>
                  <option value="Recovery Plan">Recovery Plan</option>
                  <option value="Medication Clarification">Medication Clarification</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600">Reason / Context</label>
                <input
                  type="text"
                  value={newReason}
                  onChange={(e) => setNewReason(e.target.value)}
                  placeholder="e.g. Follow-up on July MRI"
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddQModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md"
                >
                  Save Question
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
