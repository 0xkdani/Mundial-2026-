import { useState } from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { ARScanner } from './components/ARScanner';
import { InfoSection } from './components/InfoSection';
import { MatchResults } from './components/MatchResults';
import { Quiz } from './components/Quiz';
import { Videos } from './components/Videos';

export default function App() {
  const [activeSection, setActiveSection] = useState<'home' | 'ar' | 'matches' | 'quiz' | 'videos'>('home');

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-black to-slate-900">
      <Navigation activeSection={activeSection} onNavigate={setActiveSection} />
      
      <div className="pt-20">
        {activeSection === 'home' && (
          <>
            <Hero onStartAR={() => setActiveSection('ar')} />
            <InfoSection />
          </>
        )}
        
        {activeSection === 'ar' && (
          <ARScanner onBack={() => setActiveSection('home')} />
        )}
        
        {activeSection === 'matches' && (
          <MatchResults />
        )}
        
        {activeSection === 'quiz' && (
          <Quiz />
        )}
        
        {activeSection === 'videos' && (
          <Videos />
        )}
      </div>
    </div>
  );
}
