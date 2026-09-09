import React from 'react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle, 
  Lock, 
  Activity, 
  Stethoscope, 
  FileText, 
  BrainCircuit, 
  PhoneCall,
  Info
} from 'lucide-react';

export const SafetyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Hero Safety Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-slate-900 to-teal-900 rounded-3xl p-8 text-white space-y-4 shadow-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold border border-teal-400/30">
          <ShieldCheck className="w-4 h-4 text-teal-400" /> Operational Guardrails
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          Safety, Ethics & Non-Diagnostic Commitment
        </h1>
        <p className="text-slate-300 text-sm leading-relaxed max-w-2xl">
          HealthLens AI was engineered from the ground up with strict healthcare AI boundaries. Our mission is to support personal understanding — never to replace human medical judgment.
        </p>
      </div>

      {/* CORE NON-DIAGNOSTIC PRINCIPLES */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900">Strict System Guardrails</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-3xl bg-red-50/80 border border-red-200 space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-red-100 text-red-700 flex items-center justify-center font-bold">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-red-900">What We NEVER Do</h3>
            <ul className="space-y-2 text-xs text-red-900 font-medium">
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold">✕</span>
                <span>We do NOT diagnose diseases or clinical medical conditions.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold">✕</span>
                <span>We do NOT prescribe medications or pharmaceutical remedies.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold">✕</span>
                <span>We do NOT recommend medication dosages or schedule changes.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold">✕</span>
                <span>We do NOT instruct users to alter existing physician treatment plans.</span>
              </li>
            </ul>
          </div>

          <div className="p-6 rounded-3xl bg-emerald-50/80 border border-emerald-200 space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <CheckCircle className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-emerald-900">What We ALWAYS Do</h3>
            <ul className="space-y-2 text-xs text-emerald-900 font-medium">
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>Organize scattered medical files into a clear chronological timeline.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>Translate complex medical jargon into plain-English explanations.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>Offer general non-diagnostic wellness, posture, and rest guidance.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>Help you prepare custom questions to bring to your doctor.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* EMERGENCY WARNING SECTION */}
      <div className="p-8 rounded-3xl bg-amber-900 text-white space-y-4 shadow-lg relative overflow-hidden">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-amber-500/20 text-amber-300 border border-amber-400/30">
            <PhoneCall className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-amber-100">Medical Emergency Protocol</h3>
            <p className="text-xs text-amber-200">Immediate action required for acute symptoms</p>
          </div>
        </div>
        <p className="text-amber-100 text-xs sm:text-sm leading-relaxed">
          If you or someone near you experiences chest tightness, acute shortness of breath, sudden facial drooping, severe uncontrolled bleeding, or loss of consciousness, call <strong>911</strong> or go to the nearest emergency department immediately.
        </p>
      </div>

      {/* PRIVACY & ENCRYPTION ARCHITECTURE */}
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-blue-50 text-blue-700">
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">Data Privacy & Encryption Security</h3>
            <p className="text-xs text-slate-500">Built for HIPAA compliance readiness</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-600">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <h4 className="font-bold text-slate-900">256-bit Encryption</h4>
            <p>All uploaded PDFs and health notes are encrypted both in transit (TLS 1.3) and at rest (AES-256).</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <h4 className="font-bold text-slate-900">No Selling of Data</h4>
            <p>Your medical data is never sold, leased, or harvested for third-party commercial advertising.</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <h4 className="font-bold text-slate-900">User Data Control</h4>
            <p>You retain 100% ownership of your records with full ability to export or wipe data anytime.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
