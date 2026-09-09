import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { SafetyDisclaimerModal } from './components/SafetyDisclaimerModal';

import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { ConversationPage } from './pages/ConversationPage';
import { RecordsPage } from './pages/RecordsPage';
import { TimelinePage } from './pages/TimelinePage';
import { GuidancePage } from './pages/GuidancePage';
import { AskRecordsPage } from './pages/AskRecordsPage';
import { SafetyPage } from './pages/SafetyPage';

const MainContent: React.FC = () => {
  const { currentPage } = useApp();
  const [isDisclaimerOpen, setIsDisclaimerOpen] = useState(false);

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage />;
      case 'dashboard':
        return <DashboardPage />;
      case 'conversation':
        return <ConversationPage />;
      case 'records':
        return <RecordsPage />;
      case 'timeline':
        return <TimelinePage />;
      case 'guidance':
        return <GuidancePage />;
      case 'ask_records':
        return <AskRecordsPage />;
      case 'safety':
        return <SafetyPage />;
      default:
        return <LandingPage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50 text-slate-900 selection:bg-teal-500 selection:text-white">
      <Navbar />
      
      <main className="flex-1">
        {renderPage()}
      </main>

      <Footer />

      <SafetyDisclaimerModal 
        isOpen={isDisclaimerOpen} 
        onClose={() => setIsDisclaimerOpen(false)} 
      />
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}

export default App;
