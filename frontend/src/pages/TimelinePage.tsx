import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Clock, Activity, Calendar, FileText } from 'lucide-react';

export const TimelinePage: React.FC = () => {
  const { timelineEvents, setCurrentPage } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Symptom', 'Lab Test', 'Imaging', 'Procedure', 'Consultation'];

  const filteredEvents = timelineEvents.filter(evt => selectedCategory === 'All' || evt.category === selectedCategory);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="border-b border-slate-200 pb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Personal Health Timeline</h1>
        <p className="text-xs text-slate-500 mt-1">Chronological map of symptoms, test results, and clinical milestones.</p>
      </div>

      <div className="flex items-center gap-1.5 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap ${
              selectedCategory === cat ? 'bg-cyan-600 text-white' : 'bg-slate-100 text-slate-600'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="relative pl-6 sm:pl-10 space-y-8 before:absolute before:left-3 before:top-3 before:bottom-3 before:w-0.5 before:bg-cyan-500">
        {filteredEvents.map((evt) => (
          <div key={evt.id} className="relative">
            <div className="absolute -left-6 sm:-left-10 top-1.5 w-6 h-6 rounded-full bg-white border-2 border-cyan-500 shadow-md flex items-center justify-center text-cyan-700 text-xs">
              <Activity className="w-3.5 h-3.5" />
            </div>

            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-card space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded bg-cyan-50 text-cyan-800 text-[11px] font-bold">{evt.category}</span>
                <span className="text-xs font-mono text-slate-400">{evt.date}</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900">{evt.title}</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{evt.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
