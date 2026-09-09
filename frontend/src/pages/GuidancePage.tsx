import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Compass, Sparkles, Copy, Check, Stethoscope, ShieldCheck } from 'lucide-react';

export const GuidancePage: React.FC = () => {
  const { guidanceItems, doctorQuestions, toggleQuestionBookmark } = useApp();
  const [copied, setCopied] = useState(false);

  const copyDoctorGuide = () => {
    const text = doctorQuestions.map((q, i) => `${i + 1}. [${q.category}] ${q.questionText}\n   Context: ${q.reason}`).join('\n\n');
    navigator.clipboard.writeText(`HEALTHLENS AI - DOCTOR VISIT GUIDE\n\n` + text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Wellness Guidance & Doctor Prep</h1>
          <p className="text-xs text-slate-500 mt-1">Lifestyle recovery pillars & physician checklist questions.</p>
        </div>
        <button onClick={copyDoctorGuide} className="px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 font-semibold text-xs shadow-xs flex items-center gap-2">
          {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-500" />}
          <span>{copied ? 'Copied Guide!' : 'Copy Doctor Discussion Guide'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {guidanceItems.map((item) => (
          <div key={item.id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-card space-y-3">
            <span className="px-3 py-1 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-bold">{item.category}</span>
            <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>
            <ul className="space-y-1 text-xs text-slate-700 pl-4 list-disc pt-2 border-t border-slate-100">
              {item.actionableTips.map((tip, idx) => (
                <li key={idx}>{tip}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="bg-slate-900 rounded-3xl p-6 text-white space-y-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Stethoscope className="w-5 h-5 text-teal-400" /> Doctor Visit Checklist ({doctorQuestions.length})
        </h2>
        <div className="space-y-3">
          {doctorQuestions.map((q) => (
            <div key={q.id} className="p-4 rounded-2xl bg-slate-800 border border-slate-700 space-y-1">
              <span className="text-[10px] text-teal-300 font-bold uppercase">{q.category}</span>
              <p className="text-sm font-semibold">{q.questionText}</p>
              <p className="text-xs text-slate-400">Context: {q.reason}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
