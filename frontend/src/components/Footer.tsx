import React from 'react';
import { Activity, Shield, HeartHandshake } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Footer: React.FC = () => {
  const { setCurrentPage } = useApp();

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              A quieter, clearer place to keep track of your health story and prepare for conversations with the people who care for you.
            </p>
            <div className="flex items-center gap-2 text-xs text-teal-400 font-medium">
              <Shield className="w-4 h-4" />
              <span>Built around understanding, not diagnosis</span>
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
            <h4 className="text-white text-xs font-bold uppercase tracking-wider">A note from us</h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              Your health information deserves care. Use HealthLens as a companion for reflection and preparation, and bring important decisions to a qualified professional.
            </p>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-slate-400 text-xs gap-4">
          <p>© {new Date().getFullYear()} HealthLens AI. Made to help health conversations feel a little easier.</p>
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
