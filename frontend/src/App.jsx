import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { LandingPage } from './pages/LandingPage';
import { ExplainPage } from './pages/ExplainPage';
import { ConfidencePage } from './pages/ConfidencePage';
import { AnalysisReadyPage } from './pages/AnalysisReadyPage';
import { ArchivePage } from './pages/ArchivePage';
import { InterviewLabPage } from './pages/InterviewLabPage';

export default function App() {
  // Step state: 'landing' | 'explain' | 'confidence' | 'ready' | 'archive' | 'interview-lab'
  const [step, setStep] = useState(() => {
    const hash = window.location.hash.replace('#', '');
    if (['landing', 'explain', 'confidence', 'ready', 'archive', 'interview-lab'].includes(hash)) {
      return hash;
    }
    return 'landing';
  });

  // Understanding data state (persists across navigation)
  const [topic, setTopic] = useState('');
  const [explanation, setExplanation] = useState('');
  const [confidence, setConfidence] = useState(75);

  // Sync hash with browser history
  useEffect(() => {
    const handlePopState = () => {
      const hash = window.location.hash.replace('#', '');
      if (['landing', 'explain', 'confidence', 'ready', 'archive', 'interview-lab'].includes(hash)) {
        setStep(hash);
      } else {
        setStep('landing');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (newStep, replace = false) => {
    setStep(newStep);
    if (replace) {
      window.history.replaceState(null, '', `#${newStep}`);
    } else {
      window.history.pushState(null, '', `#${newStep}`);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStart = () => {
    navigateTo('explain');
  };

  const handleSelectTopic = (selectedTopic) => {
    setTopic(selectedTopic);
    navigateTo('explain');
  };

  const handleExplainContinue = () => {
    navigateTo('confidence');
  };

  const handleConfidenceContinue = () => {
    navigateTo('ready');
  };

  const handleReset = () => {
    setTopic('');
    setExplanation('');
    setConfidence(75);
    navigateTo('landing');
  };

  const handleStartNewFromArchive = () => {
    setTopic('');
    setExplanation('');
    setConfidence(75);
    navigateTo('explain');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#07090e] arena-bg-radial text-[#f3f4f6] font-sans selection:bg-orange-500/30 selection:text-orange-200">
      {/* Header */}
      <Header
        currentStep={step}
        onReset={handleReset}
        onNavigateArchive={() => navigateTo('archive')}
        onNavigateInterviewLab={() => navigateTo('interview-lab')}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">
        {step === 'landing' && (
          <LandingPage 
            onStart={handleStart} 
            onSelectTopic={handleSelectTopic} 
            onNavigateInterviewLab={() => navigateTo('interview-lab')}
          />
        )}

        {step === 'interview-lab' && (
          <InterviewLabPage onSelectTopicForExplorer={handleSelectTopic} />
        )}

        {step === 'explain' && (
          <ExplainPage
            topic={topic}
            setTopic={setTopic}
            explanation={explanation}
            setExplanation={setExplanation}
            onContinue={handleExplainContinue}
            onBack={() => navigateTo('landing')}
          />
        )}

        {step === 'confidence' && (
          <ConfidencePage
            topic={topic}
            confidence={confidence}
            setConfidence={setConfidence}
            onContinue={handleConfidenceContinue}
            onBack={() => navigateTo('explain')}
          />
        )}

        {step === 'ready' && (
          <AnalysisReadyPage
            topic={topic}
            explanation={explanation}
            confidence={confidence}
            onEdit={() => navigateTo('explain')}
            onReset={handleReset}
          />
        )}

        {step === 'archive' && (
          <ArchivePage
            onStartNew={handleStartNewFromArchive}
            onSelectTopic={handleSelectTopic}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-white/10 py-6 text-xs text-zinc-400 bg-[#07090e]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-white">Clarity</span>
            <span className="text-zinc-600">&bull;</span>
            <span className="text-zinc-400">Conceptual Understanding & Reasoning Platform</span>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-zinc-400 font-mono-code">
            <span className="w-2 h-2 rounded-full bg-[#a3e635] shadow-[0_0_8px_rgba(163,230,53,0.6)]" />
            <span>First-Principles Diagnostics &bull; Operational</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
