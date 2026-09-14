import React, { useState } from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  Lightbulb, 
  Send, 
  AlertCircle, 
  HelpCircle,
  Flame,
  CheckCircle2,
  HelpCircle as QuestionIcon
} from 'lucide-react';

export function DiagnosticProbePage({
  topic,
  probeQuestion,
  probeReason,
  onAnswerSubmit,
  onSkip,
}) {
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState('');

  const wordCount = answer.trim() ? answer.trim().split(/\s+/).length : 0;
  const minWords = 4;
  const isAnswerSufficient = wordCount >= minWords;

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!answer.trim()) {
      setError('Please provide your response to this targeted question.');
      return;
    }
    if (wordCount < minWords) {
      setError(`Please provide a more detailed explanation (at least ${minWords} words; current: ${wordCount}).`);
      return;
    }
    setError('');
    onAnswerSubmit(answer.trim());
  };

  return (
    <div className="w-full flex-1 flex flex-col items-center justify-start arena-bg-radial px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="w-full max-w-4xl flex flex-col gap-6">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Targeted Mechanism Inquiry</span>
          </div>

          <button
            type="button"
            onClick={onSkip}
            className="text-xs text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer font-medium"
          >
            <span>Skip & Finalize Score</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Main Probe Card */}
        <div className="glass-card rounded-2xl p-6 sm:p-8 flex flex-col gap-6 border border-white/10 shadow-2xl relative overflow-hidden">
          
          {/* Target Concept Pill */}
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="text-xs font-semibold text-slate-400">
              Target Concept: <strong className="text-white font-bold">{topic}</strong>
            </span>
            <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 flex items-center gap-1.5">
              <span>Investigating Mechanism Depth</span>
            </span>
          </div>

          {/* The Question Box */}
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-7 border border-white/10 shadow-inner">
            <div className="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-2">
              Specific Mechanism Question:
            </div>
            <h2 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-white leading-relaxed tracking-tight">
              {probeQuestion}
            </h2>
          </div>

          {/* Why This Matters Box */}
          <div className="p-4 rounded-xl bg-slate-900/50 border border-white/5 flex items-start gap-3 text-xs text-slate-300 leading-relaxed">
            <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white font-semibold">Why this question? </strong>
              {probeReason || 'Your initial explanation outlined high-level concepts, but left this exact causal trigger ambiguous. Answering this directly helps verify your true mechanical depth.'}
            </div>
          </div>

          {/* Response Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <span>Your Causal Explanation</span>
                </label>
                <span className={`text-xs font-mono-code font-bold ${isAnswerSufficient ? 'text-emerald-400' : 'text-slate-500'}`}>
                  {wordCount} words (min. {minWords})
                </span>
              </div>

              <textarea
                rows={6}
                value={answer}
                onChange={(e) => {
                  setAnswer(e.target.value);
                  if (error) setError('');
                }}
                placeholder="Explain the specific step-by-step mechanism here..."
                className="w-full p-4 rounded-xl bg-slate-900/90 border border-white/10 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-white placeholder-slate-500 text-sm sm:text-base leading-relaxed resize-none transition-all outline-none"
                autoFocus
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 text-rose-400 text-xs font-medium p-3 rounded-lg bg-rose-500/10 border border-rose-500/20">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Action Row */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <button
                type="button"
                onClick={onSkip}
                className="text-xs text-slate-400 hover:text-slate-200 transition-colors py-2 cursor-pointer font-medium"
              >
                Skip / Score Without Answering
              </button>

              <button
                type="submit"
                disabled={!isAnswerSufficient}
                className={`w-full sm:w-auto px-8 py-3.5 rounded-xl font-display text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  isAnswerSufficient
                    ? 'bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 text-white shadow-lg shadow-indigo-500/30 hover:scale-105 active:scale-95'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-white/5'
                }`}
              >
                <span>Synthesize Final Mastery Score</span>
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>

        </div>

      </div>
    </div>
  );
}
