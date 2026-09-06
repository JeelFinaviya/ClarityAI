import React from 'react';
import { ArrowRight, Sparkles, BrainCircuit, Target, ShieldCheck } from 'lucide-react';

const SUGGESTED_TOPICS = [
  'Binary Search',
  'React Virtual DOM',
  'Transformer Self-Attention',
  'Distributed Consensus (Raft)',
  'Photosynthesis',
  'TCP Handshake',
];

export function LandingPage({ onStart, onSelectTopic }) {
  const handleTopicClick = (selectedTopic) => {
    if (onSelectTopic) {
      onSelectTopic(selectedTopic);
    } else {
      onStart();
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[calc(100vh-4.5rem)] px-4 sm:px-6 py-16 overflow-hidden animate-fadeIn">
      {/* Ambient background light gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[380px] bg-amber-500/[0.05] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[700px] h-[240px] bg-indigo-500/[0.03] rounded-full blur-[160px] pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto text-center flex flex-col items-center">
        {/* Intelligence Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-xs font-mono text-neutral-300 mb-8 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.8)]"></span>
          <span className="tracking-wide">AI Conceptual Understanding Diagnostic</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.08] font-sans">
          Do you actually <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100 drop-shadow-sm">
            understand it?
          </span>
        </h1>

        {/* Hero Subtitle */}
        <p className="text-base sm:text-lg md:text-xl text-neutral-400 max-w-2xl mb-8 leading-relaxed font-normal">
          Distinguish <span className="text-neutral-200 font-medium">surface familiarity</span> from <span className="text-amber-300 font-medium">genuine mechanical comprehension</span> through interactive cognitive probing.
        </p>

        {/* Primary CTA */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-10">
          <button
            id="start-test-btn"
            onClick={onStart}
            className="w-full sm:w-auto group relative inline-flex items-center justify-center gap-3 px-9 py-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-semibold text-base transition-all duration-200 shadow-xl shadow-amber-500/20 hover:shadow-amber-500/30 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            <Sparkles className="w-5 h-5 text-neutral-950" />
            <span>Begin Understanding Diagnostic</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </button>
        </div>

        {/* Suggested Topics Bar */}
        <div className="w-full max-w-2xl flex flex-col items-center space-y-2.5 mb-16">
          <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">
            Quick Topic Inspiration
          </span>
          <div className="flex flex-wrap justify-center gap-2">
            {SUGGESTED_TOPICS.map((topicItem) => (
              <button
                key={topicItem}
                type="button"
                onClick={() => handleTopicClick(topicItem)}
                className="px-3 py-1.5 rounded-lg bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.06] hover:border-amber-400/40 text-xs font-mono text-neutral-300 hover:text-amber-300 transition-all cursor-pointer"
              >
                {topicItem}
              </button>
            ))}
          </div>
        </div>

        {/* 3-Phase Cognitive Methodology */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left w-full max-w-3xl">
          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] transition-colors group">
            <div className="w-8 h-8 rounded-xl bg-amber-400/10 text-amber-400 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <BrainCircuit className="w-4 h-4" />
            </div>
            <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider mb-1">
              Phase 1
            </div>
            <h3 className="text-sm font-semibold text-white mb-1.5">First-Principles Articulation</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Strip away memorized jargon. Articulate the step-by-step causality of the concept in your own words.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] transition-colors group">
            <div className="w-8 h-8 rounded-xl bg-cyan-400/10 text-cyan-400 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <Target className="w-4 h-4" />
            </div>
            <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider mb-1">
              Phase 2
            </div>
            <h3 className="text-sm font-semibold text-white mb-1.5">Targeted Mechanism Probe</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              ClarityAI isolates the single most critical missing causal link and probes your reasoning dynamically.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] transition-colors group">
            <div className="w-8 h-8 rounded-xl bg-emerald-400/10 text-emerald-400 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider mb-1">
              Phase 3
            </div>
            <h3 className="text-sm font-semibold text-white mb-1.5">Calibrated Understanding</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Synthesizes both responses to calibrate confidence against demonstrated first-principles mastery.
            </p>
          </div>
        </div>

        {/* Minimal Footer Signature */}
        <div className="mt-16 text-xs text-neutral-400 font-mono tracking-widest uppercase">
          ClarityAI &bull; Epistemic Diagnostic Framework
        </div>
      </div>
    </div>
  );
}
