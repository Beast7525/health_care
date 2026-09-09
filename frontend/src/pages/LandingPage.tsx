import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Sparkles, 
  ArrowRight, 
  FileText, 
  Clock, 
  ShieldCheck, 
  Search, 
  User, 
  Layers, 
  FileSpreadsheet, 
  BrainCircuit, 
  Lock, 
  Compass, 
  MessageSquare,
  Activity,
  BookOpen,
  HeartHandshake,
  ClipboardList,
  MessageCircleHeart,
  AlertTriangle,
  PhoneCall,
  Shield,
  CheckCircle2,
  Stethoscope,
  Building2,
  UserCheck
} from 'lucide-react';
import { motion } from 'framer-motion';

export const LandingPage: React.FC = () => {
  const { startConversationWithPrompt, setCurrentPage } = useApp();
  const [heroInput, setHeroInput] = useState('I have leg discomfort after hiking...');

  const handleHeroSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startConversationWithPrompt(heroInput);
  };

  return (
    <div className="space-y-16 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-4 pb-12 md:pt-10 md:pb-20 gradient-hero-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-7 space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-teal-900 text-xs font-bold shadow-xs">
                <ShieldCheck className="w-4 h-4 text-teal-600" />
                <span>Personal health understanding, made simpler</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
                Your health story, <br />
                <span className="gradient-text">all in one place.</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-2xl">
                Understand medical reports, prepare for doctor visits, and keep the details of your health journey easier to follow.
              </p>

              {/* Quick Action Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => setCurrentPage('records')}
                  className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-md hover:shadow-lg transition-all text-left group scale-100 hover:scale-[1.02] sm:col-span-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 font-bold text-[10px] uppercase tracking-wider">
                      Document Decoder
                    </span>
                    <FileText className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-base mt-2">Upload & Decode PDF / Image Report</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    OCR text extraction for lab panels, blood sugar, MRI & prescriptions.
                  </p>
                </button>
              </div>

              <div className="flex items-center gap-2 pt-2 text-xs text-slate-500 font-medium">
                <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
                <span>Non-diagnostic guidance engine built with medical safety guardrails.</span>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-5"
            >
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200/80 space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">Instant AI Health Assistant</h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Describe your concern in 1 sentence for an immediate breakdown.
                    </p>
                  </div>
                  <Sparkles className="w-6 h-6 text-teal-600" />
                </div>

                <form onSubmit={handleHeroSubmit} className="space-y-4">
                  <textarea
                    value={heroInput}
                    onChange={(e) => setHeroInput(e.target.value)}
                    rows={3}
                    className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 text-sm font-medium transition-all focus:ring-2 focus:ring-blue-200"
                    placeholder="e.g. I have mild chest discomfort and fatigue after physical exertion..."
                  ></textarea>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4 text-teal-300" />
                    <span>Analyze Concern Instantly</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>

                <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs">
                  <button
                    onClick={() => startConversationWithPrompt('I feel dizzy and lightheaded when standing up')}
                    className="p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 text-slate-700 text-left font-medium border border-slate-200/60 transition-colors"
                  >
                    💡 Dizziness & Lightheadedness
                  </button>
                  <button
                    onClick={() => startConversationWithPrompt('How do I prepare for my upcoming blood test?')}
                    className="p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 text-slate-700 text-left font-medium border border-slate-200/60 transition-colors"
                  >
                    💡 Blood Test Preparation
                  </button>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Professional Healthcare Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="px-3.5 py-1 rounded-full bg-blue-50 text-blue-700 font-extrabold text-xs uppercase tracking-wider border border-blue-200">
            Advanced Clinical Platform
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Comprehensive Medical Assistance for Every Situation
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Whether managing lab reports or preparing for a follow-up, HealthLens helps turn scattered information into useful next steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-card hover:shadow-card-hover transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-slate-900">Document & OCR Decoder</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Upload PDF reports, blood sugar panels, X-rays, or MRI images to extract readable metrics, normal ranges, and simplified terms.
            </p>
            <button
              onClick={() => setCurrentPage('records')}
              className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
            >
              Upload Medical Report &rarr;
            </button>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-card hover:shadow-card-hover transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center font-bold">
              <Stethoscope className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-slate-900">Doctor Visit Checklist</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Automatically generates specific, targeted questions for your physician based on your uploaded reports and health concerns.
            </p>
            <button
              onClick={() => setCurrentPage('guidance')}
              className="text-xs font-bold text-teal-600 hover:text-teal-800 flex items-center gap-1"
            >
              View Guidance Plan &rarr;
            </button>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-card hover:shadow-card-hover transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-slate-900">Document Q&A Engine</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Ask direct questions about your stored medical records. Retrieves exact metrics without inventing unmentioned findings.
            </p>
            <button
              onClick={() => setCurrentPage('ask_records')}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
            >
              Ask My Records &rarr;
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
