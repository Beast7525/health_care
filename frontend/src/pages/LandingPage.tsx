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
  BookOpen
} from 'lucide-react';
import { motion } from 'framer-motion';

export const LandingPage: React.FC = () => {
  const { startConversationWithPrompt } = useApp();
  const [heroInput, setHeroInput] = useState('I have leg discomfort after hiking...');

  const handleHeroSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startConversationWithPrompt(heroInput);
  };

  return (
    <div className="space-y-24 pb-20">
      <section className="relative overflow-hidden pt-8 pb-16 md:pt-16 md:pb-24 gradient-hero-bg border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-7 space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-800 text-xs font-semibold shadow-xs">
                <span className="flex h-2 w-2 rounded-full bg-teal-500"></span>
                <span>Personal Recovery & Wellness Guidance Assistant</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
                Understand Your <br />
                <span className="gradient-text">Health Journey.</span>
              </h1>

              <p className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed max-w-2xl">
                HealthLens AI helps you organize your personal health records and receive personalized, non-diagnostic wellness guidance based on your own information.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <button
                  onClick={() => startConversationWithPrompt(heroInput)}
                  className="flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-blue-700 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white font-bold text-base shadow-xl shadow-blue-600/20 transition-all scale-100 hover:scale-[1.02]"
                >
                  <Sparkles className="w-5 h-5 text-teal-300" />
                  <span>Start Your Health Journey</span>
                  <ArrowRight className="w-5 h-5 ml-1" />
                </button>

                <a
                  href="#how-it-works"
                  className="flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 font-semibold text-base border border-slate-200 shadow-sm transition-all"
                >
                  <BookOpen className="w-4 h-4 text-slate-500" />
                  <span>See How It Works</span>
                </a>
              </div>

              <div className="flex items-center gap-2 pt-3 text-xs text-slate-500 font-medium">
                <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
                <span>Designed to support understanding — not replace healthcare professionals.</span>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-5"
            >
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200/80 space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">How can we help you today?</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Describe a health concern or symptom to experience HealthLens AI synthesis.
                  </p>
                </div>

                <form onSubmit={handleHeroSubmit} className="space-y-4">
                  <textarea
                    value={heroInput}
                    onChange={(e) => setHeroInput(e.target.value)}
                    rows={3}
                    className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 text-sm font-medium transition-all"
                    placeholder="Describe how you feel..."
                  ></textarea>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4 text-teal-300" />
                    <span>Start Conversation</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </div>
  );
};
