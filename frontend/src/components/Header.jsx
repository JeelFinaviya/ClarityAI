import React from 'react';
import { RotateCcw } from 'lucide-react';

export function Header({ currentStep, onReset }) {
  const steps = [
    { id: 'explain', label: '1. Articulation' },
    { id: 'confidence', label: '2. Calibration' },
    { id: 'ready', label: '3. Diagnostic' },
  ];

  return (
    <header className="w-full border-b border-white/[0.06] bg-[#07080b]/80 backdrop-blur-xl sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <div 
          onClick={onReset}
          className="flex items-center gap-3 cursor-pointer group transition-opacity hover:opacity-90"
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 flex items-center justify-center text-neutral-950 font-black text-sm shadow-md shadow-amber-500/25 group-hover:scale-105 transition-transform duration-200">
            C
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-base tracking-tight text-white font-sans">Clarity<span className="text-amber-400 font-extrabold">AI</span></span>
            </div>
            <span className="text-[9px] uppercase tracking-widest text-neutral-400 font-mono -mt-1 font-semibold">
              Cognitive Diagnostic
            </span>
          </div>
        </div>

        {/* Step Indicator (Visible only during session) */}
        {currentStep !== 'landing' && (
          <div className="hidden sm:flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.02] border border-white/[0.08] backdrop-blur-md">
            {steps.map((s, idx) => {
              const isActive = currentStep === s.id;
              const isPassed = 
                (currentStep === 'confidence' && s.id === 'explain') ||
                (currentStep === 'ready' && (s.id === 'explain' || s.id === 'confidence'));

              return (
                <div key={s.id} className="flex items-center gap-2.5">
                  <span
                    className={`text-xs transition-colors font-mono ${
                      isActive
                        ? 'text-amber-400 font-semibold drop-shadow-[0_0_8px_rgba(245,158,11,0.4)]'
                        : isPassed
                        ? 'text-neutral-300'
                        : 'text-neutral-400'
                    }`}
                  >
                    {s.label}
                  </span>
                  {idx < steps.length - 1 && (
                    <span className="text-neutral-700 text-xs font-mono">/</span>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Reset / Action */}
        <div className="flex items-center gap-3">
          {currentStep !== 'landing' ? (
            <button
              onClick={onReset}
              className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white px-3 py-1.5 rounded-lg border border-white/[0.08] hover:border-white/20 hover:bg-white/[0.04] transition-all cursor-pointer font-medium"
              title="Start over"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          ) : (
            <div className="flex items-center gap-2 text-xs text-neutral-400 font-mono px-3 py-1 rounded-full bg-white/[0.02] border border-white/[0.06]">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_6px_rgba(245,158,11,0.8)]"></span>
              <span className="text-neutral-300">Phase 4 Active</span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
