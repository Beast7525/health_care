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
  MessageCircleHeart
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
                <span>A calmer place to begin</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
                Make sense of <br />
                <span className="gradient-text">what you’re feeling.</span>
              </h1>

              <p className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed max-w-2xl">
                Health questions can feel like a lot to hold on your own. HealthLens helps you gather the pieces, put them into plain language, and decide what might be useful to ask next.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <button
                  onClick={() => startConversationWithPrompt(heroInput)}
                  className="flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-blue-700 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white font-bold text-base shadow-xl shadow-blue-600/20 transition-all scale-100 hover:scale-[1.02]"
                >
                  <Sparkles className="w-5 h-5 text-teal-300" />
                  <span>Tell us what’s on your mind</span>
                  <ArrowRight className="w-5 h-5 ml-1" />
                </button>

                <a
                  href="#how-it-works"
                  className="flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 font-semibold text-base border border-slate-200 shadow-sm transition-all"
                >
                  <BookOpen className="w-4 h-4 text-slate-500" />
                  <span>See how it works</span>
                </a>
              </div>

              <div className="flex items-center gap-2 pt-3 text-xs text-slate-500 font-medium">
                <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
                <span>A thoughtful starting point, never a replacement for your care team.</span>
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
                  <h3 className="text-xl font-bold text-slate-900">What’s on your mind today?</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Start in your own words. There’s no perfect way to describe how you feel.
                  </p>
                </div>

                <form onSubmit={handleHeroSubmit} className="space-y-4">
                  <textarea
                    value={heroInput}
                    onChange={(e) => setHeroInput(e.target.value)}
                    rows={3}
                    className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 text-sm font-medium transition-all"
                    placeholder="For example: I’ve felt unusually tired this week..."
                  ></textarea>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4 text-teal-300" />
                    <span>Start gently</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-28">
        <div className="max-w-2xl mb-10">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-teal-700">A little less overwhelming</p>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">Bring the questions. We’ll help you sort the pieces.</h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600">HealthLens is made for the in-between moments: after an appointment, before a follow-up, or whenever a report leaves you with more questions than answers.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { icon: MessageCircleHeart, number: '01', title: 'Start with your story', text: 'Share what you noticed, what changed, or what you want to understand better.' },
            { icon: ClipboardList, number: '02', title: 'Gather what you have', text: 'Keep records, notes, and key moments together so the bigger picture is easier to see.' },
            { icon: HeartHandshake, number: '03', title: 'Leave with a next step', text: 'Turn uncertainty into useful questions and small, practical things to discuss with your clinician.' }
          ].map(({ icon: Icon, number, title, text }) => (
            <div key={number} className="relative p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold tracking-widest text-slate-300">{number}</span>
              </div>
              <h3 className="mt-5 text-lg font-bold text-slate-900">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="features" className="bg-slate-100/70 border-y border-slate-200/70 scroll-mt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-8">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-blue-700">Made for real life</p>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">Your health story, in one place.</h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-slate-600">No jargon for the sake of jargon. No pressure to have the right words. Just a clearer way to keep track of what matters to you.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              ['Your records', 'Keep important documents and plain-language summaries close at hand.'],
              ['Your timeline', 'Notice patterns across appointments, symptoms, and everyday life.'],
              ['Your questions', 'Prepare for conversations with your clinician while the questions are fresh.']
            ].map(([title, text]) => (
              <div key={title} className="p-5 rounded-2xl bg-white border border-slate-200/80">
                <h3 className="font-bold text-slate-900">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
