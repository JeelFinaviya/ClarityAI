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
    <header className="w-full border-b border-white/10 bg-[#07090e]/85 backdrop-blur-xl sticky top-0 z-50 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2 sm:gap-4">
        
        {/* Brand Logo */}
        <div 
          onClick={onReset}
          className="cursor-pointer group flex items-center gap-2.5 sm:gap-3 select-none shrink-0"
          title="Return to Home"
        >
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-[#ff5722] via-[#ff7a50] to-[#ccff00] p-[1px] shadow-lg shadow-orange-500/20 group-hover:shadow-orange-500/40 group-hover:scale-105 transition-all">
            <div className="w-full h-full bg-[#07090e] rounded-[11px] flex items-center justify-center">
              <Compass className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#ff5722] group-hover:text-[#ff7a50] transition-colors" />
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-display text-base sm:text-lg font-bold tracking-tight text-white group-hover:text-orange-200 transition-colors">
                Clarity<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff5722] to-[#a3e635]">AI</span>
              </span>
            </div>
            <span className="text-[10px] sm:text-[11px] text-zinc-400 hidden sm:block font-medium">
              Conceptual Understanding Platform
            </span>
          </div>
        </div>

        {/* Step Progression Bar */}
        {isSessionActive && (
          <nav aria-label="Progression" className="hidden lg:flex items-center gap-2 lg:gap-4 bg-[#121624] p-1.5 px-3 rounded-full border border-white/5 shadow-inner">
            {steps.map((st, idx) => {
              const StepIcon = st.icon;
              const isActive = currentStep === st.id;
              const isPast = 
                (currentStep === 'confidence' && st.id === 'explain') ||
                (currentStep === 'ready' && (st.id === 'explain' || st.id === 'confidence'));

              return (
                <div key={st.id} className="flex items-center gap-2">
                  <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-[#ff5722] to-[#f97316] text-white shadow-md shadow-orange-500/30 scale-105'
                      : isPast
                      ? 'text-[#a3e635] bg-[#a3e635]/10 border border-[#a3e635]/25'
                      : 'text-zinc-500 hover:text-zinc-400'
                  }`}>
                    <StepIcon className="w-3.5 h-3.5" />
                    <span>{st.label}</span>
                  </div>
                  {idx < steps.length - 1 && (
                    <span className="text-zinc-700 text-xs">➔</span>
                  )}
                </div>
              );
            })}
          </nav>
        )}

        {/* Right Navigation & Quick Action Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          <button
            type="button"
            onClick={onNavigateInterviewLab}
            className={`text-xs font-medium flex items-center gap-1.5 sm:gap-2 py-2 px-2.5 sm:px-3.5 rounded-xl border transition-all cursor-pointer ${
              currentStep === 'interview-lab'
                ? 'bg-gradient-to-r from-[#ff5722] to-[#f97316] text-white border-orange-400/50 shadow-lg shadow-orange-500/25 font-semibold'
                : 'bg-[#121624] hover:bg-[#181d2e] text-zinc-300 hover:text-white border-white/10 hover:border-orange-500/30'
            }`}
            title="Interview Lab: Curated technical questions"
          >
            <BookOpen className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${currentStep === 'interview-lab' ? 'text-white' : 'text-[#ff5722]'}`} />
            <span className="hidden xs:inline sm:inline">Interview Lab</span>
            <span className="xs:hidden sm:hidden">Lab</span>
          </button>

          <button
            type="button"
            onClick={onNavigateArchive}
            className={`text-xs font-medium flex items-center gap-1.5 sm:gap-2 py-2 px-2.5 sm:px-3.5 rounded-xl border transition-all cursor-pointer ${
              currentStep === 'archive'
                ? 'bg-gradient-to-r from-[#ff5722] to-[#f97316] text-white border-orange-400/50 shadow-lg shadow-orange-500/25 font-semibold'
                : 'bg-[#121624] hover:bg-[#181d2e] text-zinc-300 hover:text-white border-white/10 hover:border-orange-500/30'
            }`}
          >
            <History className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${currentStep === 'archive' ? 'text-white' : 'text-[#a3e635]'}`} />
            <span className="hidden sm:inline">History Log</span>
            <span className="sm:hidden">History</span>
          </button>

          {isSessionActive && (
            <button
              type="button"
              onClick={onReset}
              className="text-xs font-medium text-zinc-300 hover:text-white bg-[#121624] hover:bg-[#181d2e] border border-white/10 hover:border-orange-500/30 transition-all flex items-center gap-1.5 py-2 px-2.5 sm:px-3 rounded-xl cursor-pointer active:scale-95"
              title="Start a new session"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#ff7a50]" />
              <span className="hidden sm:inline">New Topic</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
