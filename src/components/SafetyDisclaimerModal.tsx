import React from 'react';
import { Shield, AlertTriangle, CheckCircle, Info, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const SafetyDisclaimerModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { setCurrentPage } = useApp();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 to-teal-900 text-white p-6 relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-teal-500/20 border border-teal-400/30 text-teal-300">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold">HealthLens AI Safety Commitment</h3>
              <p className="text-xs text-blue-200 mt-0.5">Please review our non-diagnostic operational guardrails</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto text-slate-700 text-sm">
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-amber-900 text-sm">Not a Medical Doctor or Diagnostic System</h4>
              <p className="text-amber-800 text-xs mt-1">
                HealthLens AI is an educational health records organizer and non-diagnostic wellness assistant. It does <strong>NOT</strong> diagnose illnesses, issue medical prescriptions, recommend drug dosages, or substitute for professional medical care.
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600" /> What HealthLens AI DOES Do:
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-600 pl-6 list-disc">
              <li>Organizes scattered medical records, lab panels, and imaging reports into a unified personal timeline.</li>
              <li>Translates complex medical terminology into clear, accessible plain-English explanations.</li>
              <li>Provides general lifestyle, nutrition, hydration, and ergometrics guidance based on your own documented notes.</li>
              <li>Helps you prepare customized questions to ask your doctor during your next clinical appointment.</li>
            </ul>
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-100">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Info className="w-4 h-4 text-blue-600" /> What HealthLens AI DOES NOT Do:
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-600 pl-6 list-disc">
              <li>Does NOT diagnose specific diseases or medical conditions.</li>
              <li>Does NOT prescribe new medications or advise starting/stopping existing prescriptions.</li>
              <li>Does NOT adjust pharmaceutical dosages or alter treatment protocols.</li>
              <li>Does NOT handle urgent emergency symptoms.</li>
            </ul>
          </div>
        </div>

        {/* Action Footer */}
        <div className="bg-slate-50 p-4 px-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button 
            onClick={() => {
              onClose();
              setCurrentPage('safety');
            }}
            className="text-xs text-blue-600 hover:text-blue-800 font-semibold underline"
          >
            Read Full Safety Policy Details
          </button>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md transition-colors"
          >
            I Understand & Agree
          </button>
        </div>
      </div>
    </div>
  );
};
