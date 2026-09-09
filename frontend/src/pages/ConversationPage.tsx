import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  FileText, 
  CheckCircle2, 
  BrainCircuit, 
  ShieldAlert, 
  Compass, 
  Upload,
  Info
} from 'lucide-react';
import { motion } from 'framer-motion';

export const ConversationPage: React.FC = () => {
  const { 
    healthConcern, 
    setHealthConcern, 
    records, 
    setCurrentPage 
  } = useApp();

  const [step, setStep] = useState<number>(1);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisProgress, setAnalysisProgress] = useState<number>(0);

  const [description, setDescription] = useState(healthConcern.description || 'I have leg discomfort after hiking...');
  const [duration, setDuration] = useState(healthConcern.duration || '2 weeks');
  const [severity, setSeverity] = useState<'mild' | 'moderate' | 'severe'>(healthConcern.severity || 'moderate');
  const [triggers, setTriggers] = useState(healthConcern.triggers || 'Hiking, sitting for long hours');
  const [selectedRecordIds, setSelectedRecordIds] = useState<string[]>(healthConcern.selectedRecordIds || ['rec-001', 'rec-002']);

  const handleRecordToggle = (id: string) => {
    setSelectedRecordIds(prev => 
      prev.includes(id) ? prev.filter(rId => rId !== id) : [...prev, id]
    );
  };

  const startAnalysisFlow = () => {
    setIsAnalyzing(true);
    setAnalysisProgress(0);

    setHealthConcern({
      description,
      duration,
      severity,
      triggers,
      selectedRecordIds,
      additionalNotes: ''
    });

    const interval = setInterval(() => {
      setAnalysisProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsAnalyzing(false);
          setStep(4);
          return 100;
        }
        return prev + 20;
      });
    }, 350);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Health Concern & Record Synthesis
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Synthesize personal context with uploaded medical documentation.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl min-h-[440px]">
        {step === 1 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <h2 className="text-xl font-bold text-slate-900">1. Describe your concern</h2>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 text-sm font-medium"
              placeholder="e.g. I have leg discomfort along my right knee..."
            ></textarea>
            <div className="flex justify-end">
              <button onClick={() => setStep(2)} className="px-6 py-3 rounded-xl bg-blue-600 text-white font-bold text-sm shadow-md flex items-center gap-2">
                <span>Continue</span> <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <h2 className="text-xl font-bold text-slate-900">2. Contextual details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold uppercase text-slate-600">Duration (Enter timeframe)</label>
                <input 
                  type="text" 
                  value={duration} 
                  onChange={(e) => setDuration(e.target.value)} 
                  placeholder="e.g. 5 days, 2 weeks, 3 months..." 
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-blue-200" 
                />
              </div>
              <div>
                <label className="text-xs font-bold uppercase text-slate-600">Triggers</label>
                <input type="text" value={triggers} onChange={(e) => setTriggers(e.target.value)} className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-sm" />
              </div>
            </div>
            <div className="flex items-center justify-between pt-4">
              <button onClick={() => setStep(1)} className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-sm font-semibold">Back</button>
              <button onClick={() => setStep(3)} className="px-6 py-3 rounded-xl bg-blue-600 text-white font-bold text-sm shadow-md flex items-center gap-2">
                <span>Select Records</span> <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <h2 className="text-xl font-bold text-slate-900">3. Select Medical Records ({records.length} available)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {records.map((rec) => (
                <div
                  key={rec.id}
                  onClick={() => handleRecordToggle(rec.id)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    selectedRecordIds.includes(rec.id) ? 'border-blue-500 bg-blue-50/60' : 'border-slate-200 bg-slate-50/50'
                  }`}
                >
                  <h4 className="font-bold text-sm text-slate-900">{rec.title}</h4>
                  <p className="text-xs text-slate-500">{rec.facility} • {rec.date}</p>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between pt-4">
              <button onClick={() => setStep(2)} className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-sm font-semibold">Back</button>
              <button onClick={startAnalysisFlow} className="px-7 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-teal-600 text-white font-bold text-sm shadow-lg flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-teal-300" />
                <span>Synthesize Insights</span>
              </button>
            </div>
          </motion.div>
        )}

        {isAnalyzing && (
          <div className="py-16 text-center space-y-4">
            <BrainCircuit className="w-12 h-12 text-teal-600 animate-pulse mx-auto" />
            <h3 className="text-lg font-bold text-slate-900">HealthLens AI processing records...</h3>
            <div className="max-w-xs mx-auto bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200">
              <div className="bg-teal-500 h-full transition-all" style={{ width: `${analysisProgress}%` }}></div>
            </div>
          </div>
        )}

        {step === 4 && !isAnalyzing && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-900 to-teal-900 text-white">
              <h2 className="text-lg font-bold">Personal Wellness Insights & Record Synthesis</h2>
            </div>
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h3 className="font-bold text-sm text-slate-900">Plain-English Findings</h3>
              <p className="text-xs text-slate-700 leading-relaxed">
                You reported "{description}". Your July 28 MRI confirmed Grade 1 medial meniscus micro-irritation without cartilage tears. Vitamin D was recorded low at 21.4 ng/mL.
              </p>
            </div>
            <div className="flex justify-between pt-4">
              <button onClick={() => setCurrentPage('guidance')} className="px-5 py-2.5 rounded-xl bg-teal-600 text-white text-xs font-bold">
                Doctor Checklist &rarr;
              </button>
              <button onClick={() => setCurrentPage('ask_records')} className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-bold">
                Ask Questions &rarr;
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
