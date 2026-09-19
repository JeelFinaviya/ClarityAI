import React from 'react';
import { Compass, Trophy, RotateCcw, BrainCircuit, History, Zap, BookOpen } from 'lucide-react';

export function Header({ currentStep, onReset, onNavigateArchive, onNavigateInterviewLab }) {
  const steps = [
    { id: 'explain', label: '1. Articulate', icon: BrainCircuit },
    { id: 'confidence', label: '2. Conviction', icon: Zap },
    { id: 'ready', label: '3. Evaluation', icon: Trophy },
  ];

  const isSessionActive = ['explain', 'confidence', 'ready'].includes(currentStep);

  return (
    <header className="w-full border-b border-white/5 bg-[#090a0f]/90 backdrop-blur-md sticky top-0 z-50 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2 sm:gap-4">
        
        {/* Brand Logo */}
        <div 
          onClick={onReset}
          className="cursor-pointer group flex items-center gap-2.5 select-none shrink-0"
          title="Return to Home"
        >
          <div className="w-8 h-8 rounded-lg bg-[#121520] border border-white/10 flex items-center justify-center group-hover:border-[#3b82f6]/50 transition-all">
            <Compass className="w-4 h-4 text-[#3b82f6] group-hover:scale-105 transition-transform" />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-display text-lg font-bold tracking-tight text-white group-hover:text-blue-200 transition-colors">
                Clarity<span className="text-[#3b82f6] ml-0.5">AI</span>
              </span>
            </div>
            <span className="text-[10px] text-slate-400 hidden sm:block font-medium">
              Technical Intelligence Platform
            </span>
          </div>
        </div>

        {/* Step Progression Bar */}
        {isSessionActive && (
          <nav aria-label="Progression" className="hidden lg:flex items-center gap-1.5 bg-[#121520] p-1 px-2.5 rounded-xl border border-white/5">
            {steps.map((st, idx) => {
              const StepIcon = st.icon;
              const isActive = currentStep === st.id;
              const isPast = 
                (currentStep === 'confidence' && st.id === 'explain') ||
                (currentStep === 'ready' && (st.id === 'explain' || st.id === 'confidence'));

              return (
                <div key={st.id} className="flex items-center gap-1.5">
                  <div className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-[#3b82f6] text-white shadow-sm'
                      : isPast
                      ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20'
                      : 'text-slate-400 hover:text-slate-300'
                  }`}>
                    <StepIcon className="w-3.5 h-3.5" />
                    <span>{st.label}</span>
                  </div>
                  {idx < steps.length - 1 && (
                    <span className="text-slate-600 text-xs">➔</span>
                  )}
                </div>
              );
            })}
          </nav>
        )}

        {/* Right Navigation & Quick Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={onNavigateInterviewLab}
            className={`text-xs font-medium flex items-center gap-1.5 sm:gap-2 py-2 px-3 sm:px-3.5 rounded-lg border transition-all cursor-pointer ${
              currentStep === 'interview-lab'
                ? 'bg-[#3b82f6] text-white border-[#3b82f6] font-semibold shadow-sm'
                : 'bg-[#121520] hover:bg-[#181c2b] text-slate-300 hover:text-white border-white/10 hover:border-white/20'
            }`}
            title="Interview Lab: Curated technical questions"
          >
            <BookOpen className={`w-3.5 h-3.5 ${currentStep === 'interview-lab' ? 'text-white' : 'text-[#3b82f6]'}`} />
            <span className="hidden xs:inline sm:inline">Interview Lab</span>
            <span className="xs:hidden sm:hidden">Lab</span>
          </button>

          <button
            type="button"
            onClick={onNavigateArchive}
            className={`text-xs font-medium flex items-center gap-1.5 sm:gap-2 py-2 px-3 sm:px-3.5 rounded-lg border transition-all cursor-pointer ${
              currentStep === 'archive'
                ? 'bg-[#3b82f6] text-white border-[#3b82f6] font-semibold shadow-sm'
                : 'bg-[#121520] hover:bg-[#181c2b] text-slate-300 hover:text-white border-white/10 hover:border-white/20'
            }`}
          >
            <History className={`w-3.5 h-3.5 ${currentStep === 'archive' ? 'text-white' : 'text-slate-300'}`} />
            <span className="hidden sm:inline">History Log</span>
            <span className="sm:hidden">History</span>
          </button>

          {isSessionActive && (
            <button
              type="button"
              onClick={onReset}
              className="text-xs font-medium text-slate-300 hover:text-white bg-[#121520] hover:bg-[#181c2b] border border-white/10 transition-all flex items-center gap-1.5 py-2 px-2.5 sm:px-3 rounded-lg cursor-pointer active:scale-95"
              title="Start a new session"
            >
              <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">New Topic</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
