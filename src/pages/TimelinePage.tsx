import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Clock, 
  Filter, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Stethoscope, 
  Activity, 
  Plus, 
  Calendar,
  Sparkles,
  Search
} from 'lucide-react';
import { TimelineEvent } from '../types';

export const TimelinePage: React.FC = () => {
  const { timelineEvents, addTimelineEvent, setCurrentPage } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<TimelineEvent['category']>('Symptom');
  const [newDesc, setNewDesc] = useState('');
  const [newDate, setNewDate] = useState(new Date().toISOString().split('T')[0]);

  const categories = ['All', 'Symptom', 'Lab Test', 'Imaging', 'Procedure', 'Consultation'];

  const filteredEvents = timelineEvents.filter(event => {
    const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;
    const matchesQuery = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    addTimelineEvent({
      date: newDate,
      title: newTitle,
      category: newCategory,
      description: newDesc,
      keyFindings: [newDesc],
      statusTag: 'Monitored'
    });

    setShowAddModal(false);
    setNewTitle('');
    setNewDesc('');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-cyan-50 text-cyan-800 text-xs font-bold border border-cyan-200 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-cyan-600" /> Personal Health Timeline
            </span>
            <span className="text-xs text-slate-400 font-mono">Chronological Map</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
            My Health Journey Timeline
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Track key medical events, symptoms, diagnostic tests, and clinical consultations in chronological order.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-5 py-3 rounded-2xl bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-sm shadow-md flex items-center gap-2 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add Timeline Milestone</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-3xl border border-slate-200 shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search timeline events..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-medium"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat 
                  ? 'bg-cyan-600 text-white shadow-xs' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* VISUAL TIMELINE VERTICAL FEED */}
      <div className="relative pl-6 sm:pl-10 space-y-8 before:absolute before:left-3 sm:before:left-5 before:top-3 before:bottom-3 before:w-0.5 before:bg-gradient-to-b before:from-cyan-500 before:via-blue-500 before:to-teal-500">
        {filteredEvents.map((evt, idx) => (
          <div key={evt.id} className="relative group">
            {/* Timeline Node Icon Pin */}
            <div className="absolute -left-6 sm:-left-10 top-1.5 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white border-2 border-cyan-500 shadow-md flex items-center justify-center text-cyan-700 text-xs font-bold z-10 group-hover:scale-110 transition-transform">
              <Activity className="w-3.5 h-3.5" />
            </div>

            {/* Event Card */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-card hover:shadow-card-hover transition-all space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md bg-cyan-50 text-cyan-800 text-[11px] font-bold border border-cyan-100">
                    {evt.category}
                  </span>
                  {evt.statusTag && (
                    <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase ${
                      evt.statusTag === 'Resolved' 
                        ? 'bg-emerald-100 text-emerald-800'
                        : evt.statusTag === 'Monitored'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-amber-100 text-amber-800'
                    }`}>
                      {evt.statusTag}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1 text-xs text-slate-400 font-mono">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{evt.date}</span>
                </div>
              </div>

              <h3 className="text-lg font-bold text-slate-900">{evt.title}</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{evt.description}</p>

              {/* Key findings bullet list */}
              {evt.keyFindings && evt.keyFindings.length > 0 && (
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Key Documented Takeaways</span>
                  <ul className="space-y-1 text-xs text-slate-700 pl-4 list-disc">
                    {evt.keyFindings.map((kf, i) => (
                      <li key={i}>{kf}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Linked Record CTA if attached */}
              {evt.recordTitle && (
                <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                  <span className="text-xs text-slate-500 flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-blue-600" />
                    <span>Linked Document: <strong>{evt.recordTitle}</strong></span>
                  </span>
                  <button
                    onClick={() => setCurrentPage('records')}
                    className="text-xs font-semibold text-blue-600 hover:text-blue-800 underline"
                  >
                    View Document &rarr;
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* ADD MILESTONE MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden">
            <div className="bg-gradient-to-r from-cyan-900 to-blue-900 text-white p-6 relative">
              <h3 className="text-xl font-bold">Add Health Milestone</h3>
              <p className="text-xs text-cyan-200">Log a symptom onset, doctor visit, or test date</p>
            </div>

            <form onSubmit={handleAddEvent} className="p-6 space-y-4 text-slate-800 text-sm">
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600">Milestone Title</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Follow-up Physical Exam"
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-600">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium"
                  >
                    <option value="Symptom">Symptom</option>
                    <option value="Lab Test">Lab Test</option>
                    <option value="Imaging">Imaging</option>
                    <option value="Procedure">Procedure</option>
                    <option value="Consultation">Consultation</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-600">Date</label>
                  <input
                    type="date"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600">Description</label>
                <textarea
                  rows={3}
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Notes about how you felt or doctor recommendations..."
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium"
                ></textarea>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs shadow-md"
                >
                  Save Milestone
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
