import React, { useState } from 'react';
import { 
  Sparkles, 
  AlertCircle, 
  Zap, 
  CornerDownLeft, 
  RotateCcw,
  Target,
  ArrowRight
} from 'lucide-react';

export function DiagnosticProbePage({
  topic,
  probeQuestion,
  probeReason,
  onAnswerSubmit,
  onSkip,
  onReset,
}) {
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState('');

  const minChars = 10;
  const maxChars = 5000;
  const charCount = answer.length;
  const isValid = charCount >= minChars && charCount <= maxChars;

  // Clean up probeReason to format nicely if it contains "Investigates whether..."
  const formatInvestigationFocus = (reason) => {
    if (!reason) return 'Targeted Causal Mechanism';
    let clean = reason.replace(/^investigates\s+(whether\s+)?(the\s+student\s+understands\s+)?/i, '');
    clean = clean.charAt(0).toUpperCase() + clean.slice(1);
    return clean;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = answer.trim();
    if (!trimmed) {
      setError('Please provide a brief mechanical answer to clarify this mechanism.');
      return;
    }
    if (trimmed.length < minChars) {
      setError(`Answer must contain at least ${minChars} characters.`);
      return;
    }
    if (trimmed.length > maxChars) {
      setError(`Answer must not exceed ${maxChars} characters.`);
      return;
    }
    setError('');
    onAnswerSubmit(trimmed);
  };

  const handleKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 animate-fadeIn text-left">
      {/* Top Breadcrumb / Diagnostic Mode Status */}
      <div className="flex items-center justify-between mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shadow-[0_0_8px_rgba(245,158,11,0.8)]"></span>
          <span>AI Diagnostic Mode &bull; Active Investigation</span>
        </div>

        <button
          onClick={onReset}
          type="button"
          className="text-xs text-neutral-400 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer font-mono"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Session</span>
        </button>
      </div>

      {/* Main Investigation Card */}
      <div className="relative p-6 sm:p-9 rounded-3xl bg-neutral-900/90 border border-amber-500/30 shadow-2xl backdrop-blur-2xl space-y-7 mb-8 overflow-hidden">
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute -top-16 -left-16 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute -bottom-16 -right-16 w-72 h-72 bg-amber-400/5 rounded-full blur-3xl pointer-events-none -z-10" />

        {/* Header Metadata */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] pb-5">
          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="text-neutral-400 uppercase tracking-wider text-[11px]">Subject:</span>
            <span className="text-white font-semibold text-sm font-sans">{topic}</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 font-mono">
            <Target className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-medium">Investigation Focus: {formatInvestigationFocus(probeReason)}</span>
          </div>
        </div>

        {/* The Targeted Probe Question */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-wider font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Targeted Conceptual Inquiry</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug font-sans">
            {probeQuestion}
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans">
            ClarityAI identified an ambiguous causal step in your initial explanation. Explain the underlying mechanics to resolve this diagnostic inquiry.
          </p>
        </div>

        {/* Answer Form */}
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="probe-answer-input" className="text-xs font-semibold text-neutral-300 font-mono uppercase tracking-wider">
                Your Response
              </label>
              <div className="flex items-center gap-2 font-mono text-xs">
                <span className={isValid ? 'text-emerald-400' : 'text-neutral-500'}>
                  {charCount} / {maxChars} chars
                </span>
                {charCount < minChars && (
                  <span className="text-neutral-500 text-[11px]">(min {minChars})</span>
                )}
              </div>
            </div>

            <textarea
              id="probe-answer-input"
              rows={6}
              value={answer}
              onChange={(e) => {
                setAnswer(e.target.value);
                if (error) setError('');
              }}
              onKeyDown={handleKeyDown}
              placeholder="Explain the step-by-step causal mechanism or invariant..."
              className={`w-full px-4 py-3.5 rounded-2xl bg-neutral-950/80 border text-white placeholder:text-neutral-600 focus:outline-none focus:ring-2 transition-all text-base resize-y leading-relaxed font-sans ${
                error
                  ? 'border-red-500/80 focus:ring-red-500/40 focus:border-red-500'
                  : 'border-white/[0.1] focus:border-amber-400/80 focus:ring-amber-400/20'
              }`}
            />

            {error && (
              <div className="flex items-center gap-1.5 text-xs text-red-400 pt-1">
                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}
          </div>

          {/* Action Row */}
          <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              type="button"
              onClick={onSkip}
              className="text-xs text-neutral-400 hover:text-white transition-colors cursor-pointer py-2 font-mono"
            >
              Skip Probe & View Initial Diagnostic &rarr;
            </button>

            <button
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-semibold text-sm transition-all duration-200 shadow-xl shadow-amber-500/20 hover:shadow-amber-500/30 hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
            >
              <Zap className="w-4 h-4 text-neutral-950" />
              <span>Synthesize Final Diagnostic</span>
              <CornerDownLeft className="w-3.5 h-3.5 opacity-60 hidden sm:inline" />
            </button>
          </div>
        </form>
      </div>

      {/* Helpful Shortcut Indicator */}
      <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] text-xs text-neutral-400 flex items-center justify-between">
        <span className="font-mono text-[11px]">
          Press <kbd className="px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-300 font-mono text-[10px] border border-white/10">Ctrl</kbd> + <kbd className="px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-300 font-mono text-[10px] border border-white/10">Enter</kbd> to submit response.
        </span>
        <span className="text-[11px] font-mono text-neutral-400 hidden sm:inline">
          Dual-Response Synthesis
        </span>
      </div>
    </div>
  );
}
