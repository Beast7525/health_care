import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  BrainCircuit, 
  Clock, 
  Stethoscope, 
  ShieldAlert, 
  Compass, 
  HelpCircle,
  Upload,
  Plus,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const ConversationPage: React.FC = () => {
  const { 
    healthConcern, 
    setHealthConcern, 
    records, 
    setCurrentPage, 
    addDoctorQuestion 
  } = useApp();

  const [step, setStep] = useState<number>(1);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisProgress, setAnalysisProgress] = useState<number>(0);

  // Form local state
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

    // Simulated multi-stage AI analysis loading animation
    const interval = setInterval(() => {
      setAnalysisProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsAnalyzing(false);
          setStep(4); // Move to summary step
          return 100;
        }
        return prev + 20;
      });
    }, 400);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" /> Interactive Wellness Assistant
            </span>
            <span className="text-xs text-slate-400 font-mono">Non-Diagnostic</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
            Health Concern & Record Synthesis
          </h1>
        </div>

        {/* Stepper Indicator */}
        <div className="flex items-center gap-2 bg-white p-2 rounded-2xl border border-slate-200 shadow-xs">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center gap-1.5">
              <div 
                className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold transition-all ${
                  step === s 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : step > s 
                      ? 'bg-teal-500 text-white' 
                      : 'bg-slate-100 text-slate-400'
                }`}
              >
                {step > s ? <CheckCircle2 className="w-4 h-4" /> : s}
              </div>
              {s < 4 && <div className="w-4 h-0.5 bg-slate-200"></div>}
            </div>
          ))}
        </div>
      </div>

      {/* Main Multi-Step Content */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xl relative min-h-[480px] flex flex-col justify-between">
        
        {/* STEP 1: Describe Concern */}
        {step === 1 && (
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center text-sm">1</span>
                What health concern or symptom are you experiencing?
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Describe your concern in your own words. HealthLens AI will cross-reference this with your uploaded records.
              </p>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                Primary Concern Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-blue-200 text-slate-800 text-sm font-medium transition-all"
                placeholder="e.g. I have leg discomfort along my right knee after running or sitting..."
              ></textarea>
            </div>

            <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-100 flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <p className="text-xs text-blue-900 leading-relaxed">
                <strong>Tip:</strong> Mention specific body locations, when the discomfort started, or activities that make it feel better or worse.
              </p>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                onClick={() => setStep(2)}
                className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md flex items-center gap-2 transition-all"
              >
                <span>Continue to Context Questions</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 2: Contextual Questions */}
        {step === 2 && (
          <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center text-sm">2</span>
                Answer a few contextual questions
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                This helps customize wellness guidance and rest suggestions to your routine.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                  How long has this concern lasted?
                </label>
                <select
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-sm font-medium"
                >
                  <option value="Less than 3 days">Less than 3 days</option>
                  <option value="1 to 2 weeks">1 to 2 weeks</option>
                  <option value="1 month">1 month</option>
                  <option value="More than 3 months">More than 3 months</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                  Discomfort Severity Level
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { level: 'mild', label: 'Mild (1-3)', color: 'border-emerald-200 bg-emerald-50 text-emerald-800' },
                    { level: 'moderate', label: 'Moderate (4-6)', color: 'border-amber-200 bg-amber-50 text-amber-800' },
                    { level: 'severe', label: 'Significant (7+)', color: 'border-red-200 bg-red-50 text-red-800' }
                  ].map((item) => (
                    <button
                      key={item.level}
                      type="button"
                      onClick={() => setSeverity(item.level as any)}
                      className={`p-3 rounded-xl border text-xs font-bold transition-all text-center ${
                        severity === item.level ? item.color + ' ring-2 ring-blue-500' : 'bg-slate-50 border-slate-200 text-slate-600'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                  Triggering activities or conditions
                </label>
                <input
                  type="text"
                  value={triggers}
                  onChange={(e) => setTriggers(e.target.value)}
                  className="w-full p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-sm font-medium"
                  placeholder="e.g. Downhill walking, prolonged sitting at desk, morning stiffness"
                />
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between">
              <button
                onClick={() => setStep(1)}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md flex items-center gap-2"
              >
                <span>Select Medical Records</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 3: Attach Medical Records */}
        {step === 3 && (
          <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center text-sm">3</span>
                Attach relevant medical records for AI synthesis
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Select your previously uploaded records or upload a new report to synthesize findings.
              </p>
            </div>

            <div className="space-y-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                Your Available Records ({records.length})
              </label>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {records.map((record) => {
                  const isSelected = selectedRecordIds.includes(record.id);
                  return (
                    <div
                      key={record.id}
                      onClick={() => handleRecordToggle(record.id)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 ${
                        isSelected 
                          ? 'border-blue-500 bg-blue-50/60 shadow-sm ring-1 ring-blue-500' 
                          : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100/60'
                      }`}
                    >
                      <div className={`p-2.5 rounded-xl shrink-0 ${isSelected ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'}`}>
                        <FileText className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-blue-800 bg-blue-100/80 px-2 py-0.5 rounded">
                            {record.category}
                          </span>
                          <span className="text-[11px] text-slate-400 font-mono">{record.date}</span>
                        </div>
                        <h4 className="text-sm font-bold text-slate-900 truncate mt-1">{record.title}</h4>
                        <p className="text-[11px] text-slate-500 truncate">{record.facility}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 border-dashed flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Upload className="w-5 h-5 text-slate-500" />
                <span className="text-xs text-slate-600 font-semibold">Want to upload a new record?</span>
              </div>
              <button
                onClick={() => setCurrentPage('records')}
                className="px-3 py-1.5 rounded-xl bg-white border border-slate-300 hover:bg-slate-100 text-xs font-bold text-slate-700"
              >
                Go to Record Manager &rarr;
              </button>
            </div>

            <div className="pt-4 flex items-center justify-between">
              <button
                onClick={() => setStep(2)}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              
              <button
                onClick={startAnalysisFlow}
                className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white font-bold text-sm shadow-lg flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-teal-300 animate-spin" />
                <span>Synthesize My Health Insights</span>
              </button>
            </div>
          </motion.div>
        )}

        {/* LOADING STATE ANIMATION */}
        {isAnalyzing && (
          <div className="py-16 text-center space-y-6">
            <div className="w-20 h-20 rounded-3xl bg-blue-100 text-blue-600 flex items-center justify-center mx-auto shadow-inner">
              <BrainCircuit className="w-10 h-10 animate-pulse text-teal-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">HealthLens AI is processing your records...</h3>
              <p className="text-xs text-slate-500 mt-1">Cross-referencing symptoms, lab metrics, and radiologist findings.</p>
            </div>

            <div className="max-w-md mx-auto space-y-2">
              <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden border border-slate-200">
                <div 
                  className="bg-gradient-to-r from-blue-600 to-teal-500 h-full transition-all duration-300"
                  style={{ width: `${analysisProgress}%` }}
                ></div>
              </div>
              <p className="text-[11px] font-mono text-slate-400">{analysisProgress}% completed</p>
            </div>
          </div>
        )}

        {/* STEP 4: AI Synthesis Summary Results */}
        {step === 4 && !isAnalyzing && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
            {/* Header Disclaimer Card */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-900 to-teal-900 text-white flex items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-teal-500/30 text-teal-300 text-[10px] font-bold uppercase">
                    Non-Diagnostic Guidance Summary
                  </span>
                  <span className="text-xs text-blue-200">Based on your {selectedRecordIds.length} selected records</span>
                </div>
                <h2 className="text-lg font-bold">Personal Wellness Insights & Record Synthesis</h2>
              </div>
              <button 
                onClick={() => setStep(1)}
                className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white whitespace-nowrap"
              >
                Modify Concern
              </button>
            </div>

            {/* Plain English Summary Box */}
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                Plain-English Findings from Your Documents
              </h3>
              <p className="text-slate-700 text-sm leading-relaxed">
                You described <strong>"{description}"</strong> lasting for <strong>{duration}</strong>. Based on your cross-referenced medical records:
              </p>
              <div className="space-y-2 text-xs text-slate-700 bg-white p-4 rounded-2xl border border-slate-200">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>No Ligament or Bone Structural Tear:</strong> Your July 28 MRI confirmed an intact ACL/PCL with Grade 1 medial meniscus micro-irritation and minor patellar tendon strain.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span><strong>Vitamin D Baseline:</strong> Your August 14 blood panel noted 21.4 ng/mL Vitamin D (low), which plays a key role in muscle recovery and joint comfort.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span><strong>Ergonomics & Desk Routine:</strong> Your June PT assessment highlighted hip stabilizer delay during long desk sessions.</span>
                </div>
              </div>
            </div>

            {/* Actionable Wellness Tips Grid */}
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Compass className="w-5 h-5 text-teal-600" />
                Recommended Non-Diagnostic Lifestyle Guidance
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-teal-50/60 border border-teal-200 space-y-2">
                  <h4 className="font-bold text-teal-900 text-xs uppercase tracking-wider">1. Low-Impact Mobility</h4>
                  <p className="text-slate-700 text-xs">Switch from downhill running to flat walking, stationary cycling, or pool exercises while tendon heals.</p>
                </div>
                <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200 space-y-2">
                  <h4 className="font-bold text-blue-900 text-xs uppercase tracking-wider">2. Desk Breaks</h4>
                  <p className="text-slate-700 text-xs">Stand every 45 minutes and perform 10 bodyweight glute squeezes to keep pelvis stabilized.</p>
                </div>
                <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-2">
                  <h4 className="font-bold text-amber-900 text-xs uppercase tracking-wider">3. Nutrition & Sun</h4>
                  <p className="text-slate-700 text-xs">Discuss Vitamin D supplementation with your PCP to support muscle recovery.</p>
                </div>
              </div>
            </div>

            {/* Red Flag Warning Box */}
            <div className="p-4 rounded-2xl bg-red-50 border border-red-200 flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-red-900 text-xs uppercase tracking-wider">When to Seek Immediate Medical Evaluation</h4>
                <p className="text-red-800 text-xs mt-1">
                  Contact a physician promptly if you experience severe sudden joint locking, inability to bear weight, fever, or red spreading warmth around the joint.
                </p>
              </div>
            </div>

            {/* Next Action Shortcuts */}
            <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => setCurrentPage('guidance')}
                className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-sm"
              >
                View Doctor Discussion Checklist &rarr;
              </button>

              <button
                onClick={() => setCurrentPage('ask_records')}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-sm"
              >
                Ask Questions About My Records &rarr;
              </button>

              <button
                onClick={() => setCurrentPage('timeline')}
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-sm"
              >
                View Timeline View &rarr;
              </button>
            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
};
