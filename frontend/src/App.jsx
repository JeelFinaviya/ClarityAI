import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { LandingPage } from './pages/LandingPage';
import { ExplainPage } from './pages/ExplainPage';
import { ConfidencePage } from './pages/ConfidencePage';
import { AnalysisReadyPage } from './pages/AnalysisReadyPage';

export default function App() {
  // Step state: 'landing' | 'explain' | 'confidence' | 'ready'
  const [step, setStep] = useState(() => {
    const hash = window.location.hash.replace('#', '');
    if (['landing', 'explain', 'confidence', 'ready'].includes(hash)) {
      return hash;
    }
    return 'landing';
  });

  // Understanding data state (persists across navigation)
  const [topic, setTopic] = useState('');
  const [explanation, setExplanation] = useState('');
  const [confidence, setConfidence] = useState(65);

  // Sync hash with browser history
  useEffect(() => {
    const handlePopState = () => {
      const hash = window.location.hash.replace('#', '');
      if (['landing', 'explain', 'confidence', 'ready'].includes(hash)) {
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
    setConfidence(65);
    navigateTo('landing');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#07080b] text-neutral-100 bg-grid-subtle">
      {/* Top Header */}
      <Header currentStep={step} onReset={handleReset} />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">
        {step === 'landing' && (
          <LandingPage onStart={handleStart} onSelectTopic={handleSelectTopic} />
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
      </main>

      {/* Subtle Minimalist Footer */}
      <footer className="w-full border-t border-white/[0.06] py-6 text-center text-xs text-neutral-400">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 font-mono">
            <span className="font-semibold text-neutral-300">ClarityAI</span>
            <span>&bull;</span>
            <span className="text-neutral-400">AI Conceptual Understanding Diagnostic</span>
          </div>
          <div className="text-neutral-400 font-mono text-[11px]">
            Calibrated Cognitive Intelligence
          </div>
        </div>
      </footer>
    </div>
  );
}
