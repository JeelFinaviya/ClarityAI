import React from 'react';
import { ArrowRight, ArrowLeft, Compass, Info, Sparkles } from 'lucide-react';

export function ConfidencePage({
  topic,
  confidence,
  setConfidence,
  onContinue,
  onBack,
}) {
  const getConfidenceFeedback = (val) => {
    if (val < 25) {
      return {
        label: 'Intuitive / Vague',
        description: 'You recognize the terminology, but cannot yet articulate the step-by-step causal mechanics.',
        color: 'text-neutral-400',
        badge: 'bg-neutral-800 text-neutral-300 border-neutral-700',
      };
    }
    if (val < 55) {
      return {
        label: 'Developing Working Model',
        description: 'You grasp the high-level intuition, but might hesitate on invariants, boundary limits, or deep causal questions.',
        color: 'text-amber-300',
        badge: 'bg-amber-500/10 text-amber-300 border-amber-500/25',
      };
    }
    if (val < 85) {
      return {
        label: 'Solid Mechanical Grasp',
        description: 'You understand the internal mechanisms and can reason through how component interactions operate.',
        color: 'text-amber-400',
        badge: 'bg-amber-400/15 text-amber-300 border-amber-400/35',
      };
    }
    return {
      label: 'Deep First-Principles Mastery',
      description: 'You can teach the concept from ground truth, defend edge cases, and rigorously reason through trade-offs.',
      color: 'text-emerald-400',
      badge: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
    };
  };

  const feedback = getConfidenceFeedback(confidence);

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12 animate-fadeIn text-left">
      {/* Top Breadcrumb & Step */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={onBack}
          type="button"
          className="inline-flex items-center gap-2 text-xs font-medium text-neutral-400 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Articulation</span>
        </button>
        <span className="text-xs font-mono text-amber-400 tracking-wider uppercase flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_6px_rgba(245,158,11,0.8)]"></span>
          Step 2 &bull; Epistemic Calibration
        </span>
      </div>

      {/* Heading & Subheading */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-3 font-sans">
          Calibrate your confidence.
        </h1>
        <p className="text-sm sm:text-base text-neutral-400 font-normal leading-relaxed">
          How confident are you that your mental model represents true first-principles causality?
        </p>
      </div>

      {/* Topic Context Pill */}
      <div className="mb-6 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-amber-400/10 text-amber-400 flex items-center justify-center text-xs font-mono font-bold">
            T
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">
              Diagnostic Subject
            </span>
            <span className="text-sm font-semibold text-white truncate max-w-[240px] sm:max-w-md font-sans">
              {topic || 'Untitled Concept'}
            </span>
          </div>
        </div>
        <button
          onClick={onBack}
          className="text-xs text-amber-400 hover:text-amber-300 font-mono transition-colors cursor-pointer"
        >
          Edit Articulation
        </button>
      </div>

      {/* Epistemic Calibration Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-neutral-900/80 border border-white/[0.08] shadow-2xl space-y-8 backdrop-blur-xl">
        {/* Large Percentage Display */}
        <div className="flex flex-col items-center justify-center text-center space-y-2.5">
          <div className="text-6xl sm:text-7xl font-extrabold font-mono tracking-tight text-white flex items-baseline drop-shadow-[0_0_16px_rgba(245,158,11,0.15)]">
            <span>{confidence}</span>
            <span className="text-3xl sm:text-4xl text-amber-400 font-sans ml-1">%</span>
          </div>

          <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-medium border ${feedback.badge}`}>
            <span>{feedback.label}</span>
          </div>

          <p className="text-xs sm:text-sm text-neutral-400 max-w-md text-center mt-1 leading-relaxed">
            {feedback.description}
          </p>
        </div>

        {/* Range Slider */}
        <div className="space-y-4 pt-2">
          <div className="relative flex items-center">
            <input
              id="confidence-slider"
              type="range"
              min="0"
              max="100"
              step="1"
              value={confidence}
              onChange={(e) => setConfidence(Number(e.target.value))}
              className="w-full h-2 rounded-lg cursor-pointer"
            />
          </div>

          {/* Scale Markers */}
          <div className="flex justify-between text-[11px] font-mono text-neutral-400 px-1">
            <span>0% (Intuitive)</span>
            <span>25%</span>
            <span>50% (Developing)</span>
            <span>75%</span>
            <span>100% (Mastery)</span>
          </div>
        </div>
      </div>

      {/* Epistemic Insight Note */}
      <div className="mt-6 p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] text-xs text-neutral-400 flex items-start gap-3">
        <Info className="w-4 h-4 text-amber-400/80 flex-shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-neutral-300">Epistemic Calibration:</strong> True understanding means your confidence aligns with demonstrated mechanical depth. Significant gaps indicate potential <em className="text-amber-300">surface familiarity</em>.
        </p>
      </div>

      {/* Navigation Buttons */}
      <div className="pt-8 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={onBack}
          className="px-5 py-3.5 rounded-xl border border-white/[0.08] hover:border-white/20 text-neutral-300 hover:text-white text-sm font-medium transition-colors cursor-pointer"
        >
          Back
        </button>

        <button
          id="confidence-continue-btn"
          type="button"
          onClick={onContinue}
          className="group inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-semibold text-sm transition-all duration-200 shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-neutral-950" />
          <span>Launch AI Diagnostic</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
}
