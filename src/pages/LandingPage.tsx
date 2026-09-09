import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Sparkles, 
  ArrowRight, 
  FileText, 
  Clock, 
  ShieldCheck, 
  Search, 
  CheckCircle2, 
  HelpCircle, 
  BrainCircuit, 
  User, 
  Layers, 
  FileSpreadsheet, 
  HeartPulse, 
  Stethoscope, 
  Lock, 
  Compass, 
  MessageSquare,
  Activity,
  Zap,
  BookOpen
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
    <div className="space-y-24 pb-20">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-8 pb-16 md:pt-16 md:pb-24 gradient-hero-bg border-b border-slate-200/60">
        {/* Background Ambient Glow Effects */}
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-teal-300/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content Column */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-7 space-y-6"
            >
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-800 text-xs font-semibold shadow-xs">
                <span className="flex h-2 w-2 rounded-full bg-teal-500"></span>
                <span>Personal Recovery & Wellness Guidance Assistant</span>
              </div>

              {/* Large Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
                Understand Your <br />
                <span className="gradient-text">Health Journey.</span>
              </h1>

              {/* Subheading */}
              <p className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed max-w-2xl">
                HealthLens AI helps you organize your personal health records and receive personalized, non-diagnostic wellness guidance based on your own information.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <button
                  onClick={() => startConversationWithPrompt(heroInput)}
                  className="flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-blue-700 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white font-bold text-base shadow-xl shadow-blue-600/20 hover:shadow-blue-600/30 transition-all scale-100 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Sparkles className="w-5 h-5 text-teal-300" />
                  <span>Start Your Health Journey</span>
                  <ArrowRight className="w-5 h-5 ml-1" />
                </button>

                <a
                  href="#how-it-works"
                  className="flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 font-semibold text-base border border-slate-200 shadow-sm transition-all hover:border-slate-300"
                >
                  <BookOpen className="w-4 h-4 text-slate-500" />
                  <span>See How It Works</span>
                </a>
              </div>

              {/* Small Trust Message */}
              <div className="flex items-center gap-2 pt-3 text-xs text-slate-500 font-medium">
                <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
                <span>Designed to support understanding — not replace healthcare professionals.</span>
              </div>

              {/* Visual Healthcare AI Diagram Strip */}
              <div className="pt-6 border-t border-slate-200/80">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Unified Record Synthesis Flow</p>
                <div className="grid grid-cols-4 gap-2 bg-white/80 p-3 rounded-2xl border border-slate-200 shadow-xs text-center text-xs font-semibold text-slate-700">
                  <div className="flex flex-col items-center gap-1.5 p-2 rounded-xl bg-blue-50/70 border border-blue-100">
                    <User className="w-5 h-5 text-blue-600" />
                    <span>1. Person</span>
                  </div>
                  <div className="flex flex-col items-center gap-1.5 p-2 rounded-xl bg-teal-50/70 border border-teal-100">
                    <FileText className="w-5 h-5 text-teal-600" />
                    <span>2. Medical Record</span>
                  </div>
                  <div className="flex flex-col items-center gap-1.5 p-2 rounded-xl bg-indigo-50/70 border border-indigo-100">
                    <BrainCircuit className="w-5 h-5 text-indigo-600" />
                    <span>3. AI Analysis</span>
                  </div>
                  <div className="flex flex-col items-center gap-1.5 p-2 rounded-xl bg-cyan-50/70 border border-cyan-100">
                    <Clock className="w-5 h-5 text-cyan-600" />
                    <span>4. Health Timeline</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Interactive Demo Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-5"
            >
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200/80 relative space-y-6">
                {/* Demo Card Top Badge */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                    <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                    <span className="text-xs font-mono font-semibold text-slate-400 ml-2">Interactive AI Demo</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-teal-50 text-teal-700 text-[11px] font-bold border border-teal-200">
                    Live Assistant
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900">How can we help you today?</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Describe a health concern or symptom to experience HealthLens AI synthesis.
                  </p>
                </div>

                <form onSubmit={handleHeroSubmit} className="space-y-4">
                  <div className="relative">
                    <textarea
                      value={heroInput}
                      onChange={(e) => setHeroInput(e.target.value)}
                      rows={3}
                      className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-slate-800 font-medium text-sm transition-all resize-none shadow-inner"
                      placeholder="Describe how you feel (e.g. I have leg discomfort after walking...)"
                    ></textarea>
                    <div className="absolute bottom-3 right-3 text-[11px] text-slate-400">
                      Press enter or click below
                    </div>
                  </div>

                  {/* Pre-fill suggestion pills */}
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Or select sample scenario:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        'I have leg discomfort after hiking...',
                        'Understand Vitamin D lab results',
                        'Knee MRI scan explanation',
                        'Desk sitting back stiffness'
                      ].map((sample) => (
                        <button
                          key={sample}
                          type="button"
                          onClick={() => setHeroInput(sample)}
                          className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-600 text-xs font-medium border border-slate-200 transition-all text-left"
                        >
                          {sample}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group"
                  >
                    <Sparkles className="w-4 h-4 text-teal-300 group-hover:rotate-12 transition-transform" />
                    <span>Start Conversation</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>

                {/* Simulated AI Security Pill */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-slate-400" /> Private & Confidential
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">256-bit Encrypted</span>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* PROBLEM SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold uppercase tracking-wider">
            The Healthcare Challenge
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Medical information shouldn't be difficult to understand.
          </h2>
          <p className="text-slate-600 text-base">
            Individuals often navigate fragmented health records, obscure medical jargon, and generic search engine queries that cause confusion.
          </p>
        </div>

        {/* 3 Challenge Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div 
            whileHover={{ y: -6 }}
            className="bg-white rounded-3xl p-8 shadow-card hover:shadow-card-hover border border-slate-200/80 space-y-4 relative overflow-hidden group"
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-xl">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Scattered Records</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Prescriptions, discharge summaries and reports are often stored separately across different patient portals, envelopes, and PDF downloads.
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -6 }}
            className="bg-white rounded-3xl p-8 shadow-card hover:shadow-card-hover border border-slate-200/80 space-y-4 relative overflow-hidden group"
          >
            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xl">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Complex Information</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Medical terminology like "grade 1 signal abnormality" or "hs-CRP" can be difficult for individuals to interpret without medical training.
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -6 }}
            className="bg-white rounded-3xl p-8 shadow-card hover:shadow-card-hover border border-slate-200/80 space-y-4 relative overflow-hidden group"
          >
            <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold text-xl">
              <User className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Limited Personal Context</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Generic online health searches don't consider a person's specific medical history, prior lab values, or unique daily lifestyle activities.
            </p>
          </motion.div>
        </div>

        {/* OUR SOLUTION BANNER */}
        <div className="mt-12 bg-gradient-to-r from-blue-900 via-slate-900 to-teal-900 rounded-3xl p-8 sm:p-10 text-white shadow-xl relative overflow-hidden">
          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
            <Activity className="w-96 h-96" />
          </div>
          <div className="max-w-3xl space-y-4 relative z-10">
            <span className="px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold uppercase tracking-wider border border-teal-400/30">
              Our Solution
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              HealthLens AI connects the individual's concern, personal context, and uploaded records into one clear timeline and guidance hub.
            </h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              We empower you to take charge of your personal wellness recovery with plain-English document decoders, interactive timeline visualization, and structured doctor discussion guides.
            </p>
            <div className="pt-2">
              <button
                onClick={() => startConversationWithPrompt(heroInput)}
                className="px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-sm shadow-md transition-all inline-flex items-center gap-2"
              >
                <span>Experience Our Solution</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold uppercase tracking-wider">
            Step-by-Step Experience
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            How HealthLens AI Works
          </h2>
          <p className="text-slate-600 text-base">
            4 simple steps to transform messy health files into clear personal guidance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            {
              step: '01',
              title: 'Share Concern',
              desc: 'Describe what you are feeling and answer contextual questions about your routine.',
              icon: MessageSquare,
              color: 'text-blue-600 bg-blue-50 border-blue-100'
            },
            {
              step: '02',
              title: 'Upload Records',
              desc: 'Securely upload PDFs or photos of lab panels, radiologist reports, or clinical notes.',
              icon: FileText,
              color: 'text-teal-600 bg-teal-50 border-teal-100'
            },
            {
              step: '03',
              title: 'AI Synthesis',
              desc: 'Our engine extracts key values, decodes medical terms, and maps events chronologically.',
              icon: BrainCircuit,
              color: 'text-indigo-600 bg-indigo-50 border-indigo-100'
            },
            {
              step: '04',
              title: 'Guidance & Q&A',
              desc: 'Review personalized lifestyle tips, doctor visit questions, and query your records anytime.',
              icon: Compass,
              color: 'text-emerald-600 bg-emerald-50 border-emerald-100'
            }
          ].map((item) => (
            <div key={item.step} className="bg-white rounded-3xl p-6 border border-slate-200/80 space-y-4 shadow-sm relative">
              <div className="flex items-center justify-between">
                <span className="font-mono text-2xl font-black text-slate-300">{item.step}</span>
                <div className={`p-3 rounded-2xl border ${item.color}`}>
                  <item.icon className="w-5 h-5" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
              <p className="text-slate-600 text-xs leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold uppercase tracking-wider">
            Built for Clarity & Trust
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Key Features of HealthLens AI
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Plain-English Term Decoder</h3>
            <p className="text-slate-600 text-sm">
              Hover over or click complex terms like <em>"patellar tendinopathy"</em> or <em>"hs-CRP"</em> to see clear, jargon-free explanations.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-cyan-100 text-cyan-700 flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Interactive Health Timeline</h3>
            <p className="text-slate-600 text-sm">
              Visualize your health milestones, lab tests, imaging dates, and symptoms in one unified chronological flow.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Ask My Records Q&A</h3>
            <p className="text-slate-600 text-sm">
              Query your uploaded medical records in natural language and receive verified responses with line-by-line citations.
            </p>
          </div>
        </div>
      </section>

      {/* BOTTOM CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-teal-900 rounded-3xl p-10 md:p-14 text-white text-center space-y-6 shadow-2xl relative overflow-hidden">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight max-w-3xl mx-auto">
            Ready to understand your personal health records?
          </h2>
          <p className="text-blue-100 text-base max-w-2xl mx-auto">
            Get non-diagnostic wellness insights and organize your medical history in minutes.
          </p>
          <div className="pt-2">
            <button
              onClick={() => startConversationWithPrompt(heroInput)}
              className="px-8 py-4 rounded-2xl bg-white text-blue-900 font-extrabold text-base shadow-xl hover:bg-slate-100 transition-all scale-100 hover:scale-105 active:scale-95 inline-flex items-center gap-2"
            >
              <Sparkles className="w-5 h-5 text-teal-600" />
              <span>Start Free Assistant Demo</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
