import React from 'react';
import { ShieldCheck, AlertTriangle, CheckCircle, Lock, PhoneCall } from 'lucide-react';

export const SafetyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-3xl bg-red-50 border border-red-200 space-y-3">
          <h3 className="text-lg font-bold text-red-900">What We NEVER Do</h3>
          <ul className="space-y-2 text-xs text-red-900 font-medium">
            <li>✕ We do NOT diagnose diseases or medical conditions.</li>
            <li>✕ We do NOT prescribe medications or pharmaceutical remedies.</li>
            <li>✕ We do NOT recommend medication dosages or schedule changes.</li>
          </ul>
        </div>

        <div className="p-6 rounded-3xl bg-emerald-50 border border-emerald-200 space-y-3">
          <h3 className="text-lg font-bold text-emerald-900">What We ALWAYS Do</h3>
          <ul className="space-y-2 text-xs text-emerald-900 font-medium">
            <li>✓ Organize scattered medical files into a clear timeline.</li>
            <li>✓ Translate complex medical jargon into plain-English.</li>
            <li>✓ Offer general non-diagnostic wellness and posture guidance.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
