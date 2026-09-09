import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Activity, 
  Sparkles, 
  FileText, 
  Clock, 
  Compass, 
  MessageSquareText, 
  Shield, 
  Menu, 
  X, 
  UserCheck, 
  Home, 
  LayoutDashboard,
  HelpCircle,
  ChevronRight,
  Stethoscope
} from 'lucide-react';
import { PageType } from '../types';

export const Navbar: React.FC = () => {
  const { currentPage, setCurrentPage, userProfile, setUserProfile } = useApp();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItemClass = (page: PageType) => `
    flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer
    ${currentPage === page 
      ? 'bg-blue-50 text-blue-700 shadow-sm border border-blue-100/80 font-semibold' 
      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'}
  `;

  const handleNavClick = (page: PageType) => {
    setCurrentPage(page);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-slate-200/80 transition-all duration-300">
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-blue-900 via-slate-900 to-teal-900 text-slate-100 text-xs py-1.5 px-4 text-center flex items-center justify-center gap-2">
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 text-[10px] uppercase font-bold tracking-wider">
          <Shield className="w-3 h-3 text-teal-400" /> Non-Diagnostic Safety First
        </span>
        <span className="hidden sm:inline opacity-90">HealthLens AI provides wellness & personal record understanding. Not a doctor or diagnostic tool.</span>
        <button 
          onClick={() => handleNavClick('safety')}
          aria-label="Learn about safety standards"
          className="underline hover:text-white font-medium ml-1 text-[11px]"
        >
          Learn Safety Standards &rarr;
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div 
          onClick={() => handleNavClick('landing')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-600 via-blue-700 to-teal-600 flex items-center justify-center text-white shadow-md group-hover:shadow-blue-500/25 transition-all duration-300 group-hover:scale-105">
            <Activity className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-teal-500"></span>
            </span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xl tracking-tight text-slate-900 group-hover:text-blue-700 transition-colors">
                HEALTHLENS<span className="text-teal-600 font-bold">.AI</span>
              </span>
              <span className="px-1.5 py-0.5 rounded-md bg-blue-100 text-blue-800 text-[10px] font-bold uppercase tracking-wider">
                Hackathon Edition
              </span>
            </div>
            <p className="text-[10px] text-slate-500 font-medium hidden sm:block">
              Your Personal Health Journey, Made Understandable
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {userProfile.isLoggedIn ? (
            <>
              <button onClick={() => handleNavClick('dashboard')} className={navItemClass('dashboard')}>
                <LayoutDashboard className="w-4 h-4 text-blue-600" />
                <span>Dashboard</span>
              </button>

              <button onClick={() => handleNavClick('conversation')} className={navItemClass('conversation')}>
                <Sparkles className="w-4 h-4 text-teal-600" />
                <span>Conversation</span>
              </button>

              <button onClick={() => handleNavClick('records')} className={navItemClass('records')}>
                <FileText className="w-4 h-4 text-slate-600" />
                <span>My Records</span>
              </button>

              <button onClick={() => handleNavClick('timeline')} className={navItemClass('timeline')}>
                <Clock className="w-4 h-4 text-cyan-600" />
                <span>My Timeline</span>
              </button>

              <button onClick={() => handleNavClick('guidance')} className={navItemClass('guidance')}>
                <Compass className="w-4 h-4 text-emerald-600" />
                <span>My Guidance</span>
              </button>

              <button onClick={() => handleNavClick('ask_records')} className={navItemClass('ask_records')}>
                <MessageSquareText className="w-4 h-4 text-indigo-600" />
                <span>Ask My Records</span>
              </button>

              <button onClick={() => handleNavClick('safety')} className={navItemClass('safety')}>
                <Shield className="w-4 h-4 text-amber-600" />
                <span>Safety</span>
              </button>
            </>
          ) : (
            <>
              <button onClick={() => handleNavClick('landing')} className={navItemClass('landing')}>
                <Home className="w-4 h-4" />
                <span>Home</span>
              </button>
              <a href="#how-it-works" onClick={() => setCurrentPage('landing')} className="px-3 py-2 rounded-xl text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100/70 transition-all">
                How It Works
              </a>
              <a href="#features" onClick={() => setCurrentPage('landing')} className="px-3 py-2 rounded-xl text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100/70 transition-all">
                Features
              </a>
              <button onClick={() => handleNavClick('safety')} className={navItemClass('safety')}>
                <Shield className="w-4 h-4 text-amber-600" />
                <span>Safety</span>
              </button>
            </>
          )}
        </nav>

        {/* Right CTA / Auth Status */}
        <div className="hidden md:flex items-center gap-3">
          {userProfile.isLoggedIn ? (
            <div className="flex items-center gap-2">
              <button 
                onClick={() => handleNavClick('dashboard')}
                className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-200 transition-all"
              >
                <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
                  {userProfile.name.charAt(0)}
                </div>
                <span>{userProfile.name}</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setUserProfile(p => ({ ...p, isLoggedIn: true }))}
                className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-100 transition-all"
              >
                Log In
              </button>
              <button 
                onClick={() => {
                  setUserProfile(p => ({ ...p, isLoggedIn: true }));
                  handleNavClick('conversation');
                }}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white font-semibold text-sm shadow-md shadow-blue-500/20 transition-all"
              >
                <span>Get Started</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white/95 backdrop-blur-xl px-4 pt-3 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="grid grid-cols-2 gap-2 pt-1 pb-3">
            <button
              onClick={() => handleNavClick('dashboard')}
              className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 hover:bg-blue-50 text-slate-700 text-sm font-medium border border-slate-200"
            >
              <LayoutDashboard className="w-4 h-4 text-blue-600" />
              <span>Dashboard</span>
            </button>
            <button
              onClick={() => handleNavClick('conversation')}
              className="flex items-center gap-2 p-3 rounded-xl bg-blue-50 text-blue-700 text-sm font-semibold border border-blue-200"
            >
              <Sparkles className="w-4 h-4 text-teal-600" />
              <span>Conversation</span>
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            <div className="py-2 space-y-1">
              <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">Health Portal</p>
              <button onClick={() => handleNavClick('records')} className="w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-700 text-sm font-medium hover:bg-slate-50">
                <FileText className="w-4 h-4 text-slate-500" /> My Records
              </button>
              <button onClick={() => handleNavClick('timeline')} className="w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-700 text-sm font-medium hover:bg-slate-50">
                <Clock className="w-4 h-4 text-cyan-500" /> My Timeline
              </button>
              <button onClick={() => handleNavClick('guidance')} className="w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-700 text-sm font-medium hover:bg-slate-50">
                <Compass className="w-4 h-4 text-emerald-500" /> Wellness Guidance
              </button>
              <button onClick={() => handleNavClick('ask_records')} className="w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-700 text-sm font-medium hover:bg-slate-50">
                <MessageSquareText className="w-4 h-4 text-indigo-500" /> Ask My Records
              </button>
              <button onClick={() => handleNavClick('safety')} className="w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-700 text-sm font-medium hover:bg-slate-50">
                <Shield className="w-4 h-4 text-amber-500" /> Safety & Guardrails
              </button>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-200 flex flex-col gap-2">
            <button
              onClick={() => {
                setUserProfile(p => ({ ...p, isLoggedIn: true }));
                handleNavClick('conversation');
              }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-teal-600 text-white font-semibold text-sm shadow-md text-center"
            >
              Start Health Journey Assistant
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
