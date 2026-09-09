import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FileText, Upload, Search, Trash2, Eye, X, Sparkles, FileCheck, Stethoscope } from 'lucide-react';
import { MedicalRecord } from '../types';

export const RecordsPage: React.FC = () => {
  const { records, addRecord, deleteRecord } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeRecord, setActiveRecord] = useState<MedicalRecord | null>(null);

  const categories = ['All', 'Lab Results', 'Imaging', 'Discharge Summary', 'Clinical Notes'];

  const filteredRecords = records.filter(record => {
    const matchesCategory = selectedCategory === 'All' || record.category === selectedCategory;
    const matchesQuery = record.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         record.facility.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">My Uploaded Health Records</h1>
          <p className="text-xs text-slate-500 mt-1">Upload, organize, and decode medical terminology in reports.</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-3xl border border-slate-200 shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search records..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap ${
                selectedCategory === cat ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecords.map((record) => (
          <div key={record.id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-card space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 text-xs font-bold">{record.category}</span>
              <h3 className="text-base font-bold text-slate-900">{record.title}</h3>
              <p className="text-xs text-slate-500">{record.facility} • {record.date}</p>
              <div className="p-3 rounded-2xl bg-slate-50 text-xs text-slate-600 line-clamp-3 leading-relaxed">
                {record.simplifiedSummary}
              </div>
            </div>
            <div className="pt-4 border-t border-slate-100 flex justify-between">
              <button onClick={() => setActiveRecord(record)} className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-50 text-blue-700 text-xs font-bold">
                <Eye className="w-3.5 h-3.5" /> Read & Decode
              </button>
              <button onClick={() => deleteRecord(record.id)} className="p-2 rounded-xl text-slate-400 hover:text-red-600">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {activeRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
            <div className="bg-gradient-to-r from-blue-900 to-teal-900 text-white p-6 relative">
              <button onClick={() => setActiveRecord(null)} className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white">
                <X className="w-5 h-5" />
              </button>
              <h3 className="text-xl font-bold">{activeRecord.title}</h3>
              <p className="text-xs text-blue-200 mt-0.5">{activeRecord.facility} • {activeRecord.date}</p>
            </div>
            <div className="p-6 space-y-4 overflow-y-auto">
              <div className="p-4 rounded-2xl bg-teal-50 border border-teal-200 space-y-1">
                <h4 className="font-bold text-teal-900 text-xs uppercase">Plain-English Summary</h4>
                <p className="text-slate-700 text-xs leading-relaxed">{activeRecord.simplifiedSummary}</p>
              </div>
              {activeRecord.decodedTerms && (
                <div className="space-y-2">
                  <h4 className="font-bold text-slate-900 text-xs uppercase">Decoded Medical Terms</h4>
                  {activeRecord.decodedTerms.map(t => (
                    <div key={t.term} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                      <strong className="text-blue-900">{t.term}:</strong> {t.definition}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="bg-slate-50 p-4 border-t border-slate-200 flex justify-end">
              <button onClick={() => setActiveRecord(null)} className="px-5 py-2 rounded-xl bg-slate-800 text-white font-semibold text-xs">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
