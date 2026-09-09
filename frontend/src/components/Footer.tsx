import React from 'react';
import { Activity, Shield, HeartHandshake, AlertTriangle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Footer: React.FC = () => {
  const { setCurrentPage } = useApp();

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 p-4 rounded-2xl bg-amber-950/50 border border-amber-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 shrink-0 mt-0.5">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-amber-200 font-bold text-sm">Medical Emergency Reminder</h4>
              <p className="text-slate-300 text-xs mt-0.5 max-w-3xl">
                If you are experiencing severe chest pain, shortness of breath, sudden numbness, or a medical emergency, please call <strong>911</strong> or contact your local emergency response service immediately. Do not rely on AI tools during emergency situations.
              </p>
            </div>
          </div>
          <button 
            onClick={() => setCurrentPage('safety')}
            className="px-4 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-semibold whitespace-nowrap transition-colors"
          >
            Read Safety Policy
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-teal-500 flex items-center justify-center text-white shadow-md">
                <Activity className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">
                HEALTHLENS<span className="text-teal-400">.AI</span>
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Your personal recovery and wellness guidance assistant. Empowering individuals to organize medical records and understand their personal health history with clear, non-diagnostic AI insights.
            </p>
            <div className="flex items-center gap-2 text-xs text-teal-400 font-medium">
              <Shield className="w-4 h-4" />
              <span>HIPAA-Ready Architecture Concept</span>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-white text-xs font-bold uppercase tracking-wider">Product Features</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setCurrentPage('conversation')} className="hover:text-teal-400 transition-colors">
                  Personal Assessment Flow
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('records')} className="hover:text-teal-400 transition-colors">
                  Medical Record OCR & Reader
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('timeline')} className="hover:text-teal-400 transition-colors">
                  Interactive Health Timeline
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('guidance')} className="hover:text-teal-400 transition-colors">
                  Wellness & Doctor Visit Guide
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('ask_records')} className="hover:text-teal-400 transition-colors">
                  Ask My Records Q&A
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-white text-xs font-bold uppercase tracking-wider">Safety & Privacy</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setCurrentPage('safety')} className="hover:text-teal-400 transition-colors">
                  Non-Diagnostic Commitment
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('safety')} className="hover:text-teal-400 transition-colors">
                  Data Security & Encryption
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('safety')} className="hover:text-teal-400 transition-colors">
                  Medical AI Ethics Statement
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-white text-xs font-bold uppercase tracking-wider">Developer Stack (Render Ready)</h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              Configured for standalone deployment on Render Web Services & Render Static Sites.
            </p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {['React', 'TypeScript', 'Tailwind', 'Render Ready', 'MongoDB Atlas'].map((tech) => (
                <span key={tech} className="px-2 py-1 rounded bg-slate-800 text-slate-300 text-[10px] font-mono border border-slate-700">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-slate-400 text-xs gap-4">
          <p>© {new Date().getFullYear()} HealthLens AI. Designed for Hackathon Demo & Render Deployment.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-slate-400">
              <HeartHandshake className="w-3.5 h-3.5 text-teal-400" /> Patient-First Design
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
