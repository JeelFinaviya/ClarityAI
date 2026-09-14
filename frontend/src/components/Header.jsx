import React from 'react';
import { Sparkles, Trophy, RotateCcw, BrainCircuit, History, Zap } from 'lucide-react';

export function Header({ currentStep, onReset, onNavigateArchive }) {
  const steps = [
    { id: 'explain', label: '1. Articulate', icon: BrainCircuit },
    { id: 'confidence', label: '2. Conviction', icon: Zap },
    { id: 'ready', label: '3. Evaluation', icon: Trophy },
  ];

  const isSessionActive = ['explain', 'confidence', 'ready'].includes(currentStep);

  return (
    <header className="w-full border-b border-white/10 bg-[#090d16]/80 backdrop-blur-xl sticky top-0 z-50 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <div 
          onClick={onReset}
          className="cursor-pointer group flex items-center gap-3 select-none"
          title="Return to Home"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-500 to-cyan-400 p-[1px] shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 group-hover:scale-105 transition-all">
            <div className="w-full h-full bg-[#0b0f19] rounded-[11px] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-cyan-400 group-hover:text-indigo-300 transition-colors" />
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-display text-lg font-bold tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                Clarity<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">AI</span>
              </span>
            </div>
            <span className="text-[11px] text-slate-400 hidden sm:block font-medium">
              Conceptual Understanding Platform
            </span>
          </div>
        </div>

        {/* Step Progression Bar */}
        {isSessionActive && (
          <nav aria-label="Progression" className="hidden md:flex items-center gap-2 lg:gap-4 bg-slate-900/60 p-1.5 px-3 rounded-full border border-white/5">
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
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/25 scale-105'
                      : isPast
                      ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20'
                      : 'text-slate-500 hover:text-slate-400'
                  }`}>
                    <StepIcon className="w-3.5 h-3.5" />
                    <span>{st.label}</span>
                  </div>
                  {idx < steps.length - 1 && (
                    <span className="text-slate-700 text-xs">➔</span>
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
            onClick={onNavigateArchive}
            className={`text-xs font-medium flex items-center gap-2 py-2 px-3.5 rounded-xl border transition-all cursor-pointer ${
              currentStep === 'archive'
                ? 'bg-indigo-600 text-white border-indigo-500 shadow-lg shadow-indigo-500/25 font-semibold'
                : 'bg-slate-900/80 hover:bg-slate-800/80 text-slate-300 hover:text-white border-white/10 hover:border-white/20'
            }`}
          >
            <History className="w-4 h-4 text-cyan-400" />
            <span className="hidden sm:inline">History Log</span>
            <span className="sm:hidden">History</span>
          </button>

          {isSessionActive && (
            <button
              type="button"
              onClick={onReset}
              className="text-xs font-medium text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800/80 border border-white/10 hover:border-white/20 transition-all flex items-center gap-1.5 py-2 px-3 rounded-xl cursor-pointer active:scale-95"
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
