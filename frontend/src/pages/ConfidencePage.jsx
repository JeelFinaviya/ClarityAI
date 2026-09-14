import React from 'react';
import { 
  Zap, 
  ArrowRight, 
  ShieldAlert, 
  Sparkles, 
  HelpCircle, 
  Award, 
  Flame 
} from 'lucide-react';

export function ConfidencePage({
  topic,
  confidence,
  setConfidence,
  onContinue,
  onBack,
}) {
  const tiers = [
    {
      value: 25,
      label: 'Curious Guess',
      icon: '🥉',
      badge: 'Level 1',
      desc: 'Familiar with buzzwords but unsure of underlying causality.'
    },
    {
      value: 50,
      label: 'Working Student',
      icon: '🥈',
      badge: 'Level 2',
      desc: 'Understand the basic steps and common use-cases.'
    },
    {
      value: 75,
      label: 'Practitioner',
      icon: '🥇',
      badge: 'Level 3',
      desc: 'Can explain how the mechanism functions and debug edge cases.'
    },
    {
      value: 95,
      label: 'Master / Architect',
      icon: '👑',
      badge: 'Level 4',
      desc: 'Can implement from first principles and articulate tradeoffs.'
    }
  ];

  const getDialColor = (val) => {
    if (val < 40) return 'text-amber-400';
    if (val < 70) return 'text-cyan-400';
    if (val < 85) return 'text-indigo-400';
    return 'text-emerald-400';
  };

  return (
    <div className="w-full flex-1 flex flex-col items-center justify-start arena-bg-radial px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="w-full max-w-3xl flex flex-col gap-6">
        
        {/* Stage Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold mb-3">
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span>Stage 2 of 3: Calibrate Your Conviction</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            How confident are you?
          </h1>
          <p className="text-slate-400 text-sm mt-2 max-w-lg mx-auto">
            ClarityAI calculates your <strong className="text-slate-200 font-semibold">Calibration Index</strong> by comparing your stated conviction against your actual demonstrated depth.
          </p>
        </div>

        {/* Card */}
        <div className="glass-card rounded-2xl p-6 sm:p-8 flex flex-col gap-8 border border-white/10 shadow-2xl">
          
          {/* Target Topic Pill */}
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/80 border border-white/5">
            <span className="text-xs text-slate-400 font-medium">Concept Under Test:</span>
            <span className="text-sm font-bold text-cyan-300 font-display">{topic || 'Selected Concept'}</span>
          </div>

          {/* Interactive Confidence Dial / Display */}
          <div className="flex flex-col items-center justify-center gap-4 py-4">
            <div className="text-center">
              <span className={`font-display text-6xl sm:text-7xl font-extrabold tracking-tight font-mono-code ${getDialColor(confidence)}`}>
                {confidence}%
              </span>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mt-1">
                Stated Conviction
              </div>
            </div>

            {/* Slider */}
            <div className="w-full max-w-md px-2 flex flex-col gap-2">
              <input
                type="range"
                min="5"
                max="100"
                step="5"
                value={confidence}
                onChange={(e) => setConfidence(Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-[11px] font-mono-code text-slate-500">
                <span>5% (Shaky)</span>
                <span>50% (Moderate)</span>
                <span>100% (Certain)</span>
              </div>
            </div>
          </div>

          {/* 4 Quick Bet Preset Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {tiers.map((t) => {
              const isSelected = Math.abs(confidence - t.value) <= 10;
              return (
                <div
                  key={t.value}
                  onClick={() => setConfidence(t.value)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-indigo-600/20 border-indigo-500 shadow-md shadow-indigo-500/20 scale-[1.02]'
                      : 'bg-slate-900/60 hover:bg-slate-800/60 border-white/5 hover:border-white/15'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xl">{t.icon}</span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      isSelected ? 'bg-indigo-500 text-white' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {t.badge}
                    </span>
                  </div>
                  <div className="font-display text-sm font-bold text-white mb-1">
                    {t.label}
                  </div>
                  <div className="text-[11px] text-slate-400 leading-tight">
                    {t.desc}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-between pt-4 border-t border-white/5">
            <button
              type="button"
              onClick={onBack}
              className="px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 text-xs font-semibold transition-all cursor-pointer"
            >
              ← Back
            </button>

            <button
              type="button"
              onClick={onContinue}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 text-white font-display text-sm font-bold shadow-lg shadow-indigo-500/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Evaluate Understanding</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
