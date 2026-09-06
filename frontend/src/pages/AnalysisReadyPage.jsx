import React, { useState } from 'react';
import { 
  Check, 
  ArrowLeft, 
  Sparkles, 
  ShieldCheck, 
  AlertCircle, 
  RefreshCw, 
  ArrowRight,
  Zap,
  Activity,
  Layers,
  BrainCircuit,
  Compass
} from 'lucide-react';
import { analyzeExplanation, synthesizeFinalDiagnostic } from '../services/api';
import { DiagnosticProbePage } from './DiagnosticProbePage';
import { ResultsView } from '../components/ResultsView';

export function AnalysisReadyPage({
  topic,
  explanation,
  confidence,
  onEdit,
  onReset,
}) {
  // Mode: 'ready' | 'loading_initial' | 'probe' | 'loading_synthesis' | 'results'
  const [mode, setMode] = useState('ready');
  const [error, setError] = useState(null);
  const [initialData, setInitialData] = useState(null);
  const [finalResult, setFinalResult] = useState(null);

  const wordCount = explanation.trim() ? explanation.trim().split(/\s+/).length : 0;
  const charCount = explanation.length;

  const handleInitialAnalyze = async () => {
    if (mode === 'loading_initial' || mode === 'loading_synthesis') return;
    setMode('loading_initial');
    setError(null);

    try {
      const data = await analyzeExplanation(topic, explanation, confidence);
      setInitialData(data);

      if (data.probe && data.probe.needs_probe && data.probe.probe_question) {
        setMode('probe');
      } else {
        setFinalResult(data);
        setMode('results');
      }
    } catch (err) {
      console.error('Initial analysis error:', err);
      setError(err.message || 'An unexpected error occurred during initial conceptual diagnosis.');
      setMode('ready');
    }
  };

  const handleProbeAnswerSubmit = async (probeAnswer) => {
    if (mode === 'loading_synthesis') return;
    setMode('loading_synthesis');
    setError(null);

    try {
      const synthesized = await synthesizeFinalDiagnostic({
        topic,
        initial_explanation: explanation,
        confidence,
        probe_question: initialData.probe.probe_question,
        probe_answer: probeAnswer,
      });
      setFinalResult(synthesized);
      setMode('results');
    } catch (err) {
      console.error('Final synthesis error:', err);
      setError(err.message || 'Failed to synthesize final diagnostic from your follow-up answer.');
      setMode('probe');
    }
  };

  const handleSkipProbe = () => {
    if (initialData) {
      setFinalResult(initialData);
      setMode('results');
    }
  };

  // If in results mode, render ResultsView
  if (mode === 'results' && finalResult) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <ResultsView
          result={finalResult}
          userConfidence={confidence}
          onRefine={onEdit}
          onReset={onReset}
        />
      </div>
    );
  }

  // If in interactive probe mode
  if (mode === 'probe' && initialData) {
    return (
      <div>
        {error && (
          <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-6">
            <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-left space-y-1">
              <div className="flex items-center gap-2 text-sm font-semibold text-red-400 font-mono">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>Synthesis Error</span>
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed pl-6">
                {error}
              </p>
            </div>
          </div>
        )}

        <DiagnosticProbePage
          topic={topic}
          probeQuestion={initialData.probe.probe_question}
          probeReason={initialData.probe.probe_reason}
          onAnswerSubmit={handleProbeAnswerSubmit}
          onSkip={handleSkipProbe}
          onReset={onReset}
        />
      </div>
    );
  }

  // Loading Initial Diagnostic State: Multi-stage visualizer
  if (mode === 'loading_initial') {
    return (
      <div className="max-w-xl mx-auto px-4 sm:px-6 py-20 text-center animate-fadeIn">
        <div className="p-8 sm:p-10 rounded-3xl bg-neutral-900/90 border border-amber-500/25 shadow-2xl backdrop-blur-2xl space-y-7">
          {/* Animated Center Radar */}
          <div className="relative flex items-center justify-center">
            <div className="w-16 h-16 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 shadow-[0_0_25px_rgba(245,158,11,0.25)]">
              <BrainCircuit className="w-8 h-8 animate-pulse" />
            </div>
            <div className="absolute -inset-3 rounded-3xl bg-amber-400/10 blur-xl -z-10 animate-pulse" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-sans">
              Diagnosing Conceptual Model
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-sm mx-auto font-sans">
              Investigating "{topic}" across definition accuracy, causal depth, and boundary invariants.
            </p>
          </div>

          {/* Sequential Cognitive Pipeline Stages */}
          <div className="space-y-2.5 text-left pt-2 border-t border-white/[0.08]">
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-2.5 text-neutral-300">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
                <span>1. Evaluating Causal Depth & Mechanics</span>
              </div>
              <span className="text-amber-400 font-semibold text-[10px]">ACTIVE</span>
            </div>

            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-2.5 text-neutral-400">
                <span className="w-2 h-2 rounded-full bg-neutral-600"></span>
                <span>2. Testing Invariant Constraints</span>
              </div>
              <span className="text-neutral-500 text-[10px]">QUEUED</span>
            </div>

            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-2.5 text-neutral-400">
                <span className="w-2 h-2 rounded-full bg-neutral-600"></span>
                <span>3. Formulating Targeted Probe</span>
              </div>
              <span className="text-neutral-500 text-[10px]">QUEUED</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Loading Synthesis Diagnostic State
  if (mode === 'loading_synthesis') {
    return (
      <div className="max-w-xl mx-auto px-4 sm:px-6 py-20 text-center animate-fadeIn">
        <div className="p-8 sm:p-10 rounded-3xl bg-neutral-900/90 border border-amber-500/35 shadow-2xl backdrop-blur-2xl space-y-7">
          <div className="relative flex items-center justify-center">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/15 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-[0_0_25px_rgba(245,158,11,0.3)]">
              <Zap className="w-8 h-8 animate-bounce" style={{ animationDuration: '1.2s' }} />
            </div>
            <div className="absolute -inset-3 rounded-3xl bg-amber-500/20 blur-xl -z-10 animate-pulse" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-sans">
              Synthesizing Dual Diagnostic
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-sm mx-auto font-sans">
              Harmonizing your initial articulation with the follow-up probe response.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-amber-500/[0.05] border border-amber-500/20 text-xs font-mono text-amber-300 flex items-center justify-center gap-2">
            <Activity className="w-4 h-4 animate-spin" />
            <span>Calibrating Epistemic Confidence vs Verified Mechanics</span>
          </div>
        </div>
      </div>
    );
  }

  // Analysis Ready State
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12 animate-fadeIn text-left">
      {/* Top Breadcrumb & Step */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={onEdit}
          type="button"
          className="inline-flex items-center gap-2 text-xs font-medium text-neutral-400 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Edit Articulation</span>
        </button>
        <span className="text-xs font-mono text-amber-400 tracking-wider uppercase flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_6px_rgba(245,158,11,0.8)]"></span>
          Step 3 &bull; Diagnostic Dispatch
        </span>
      </div>

      {/* Main Heading & Text */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono mb-4">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Session Payload Validated</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-3 font-sans">
          Ready for diagnostic.
        </h1>
        <p className="text-sm sm:text-base text-neutral-400 font-normal leading-relaxed">
          ClarityAI will evaluate your causal mental model. If key operational mechanisms are missing, you will receive a targeted inquiry.
        </p>
      </div>

      {/* Error Banner if API failed */}
      {error && (
        <div className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-left space-y-2">
          <div className="flex items-center gap-2 text-sm font-semibold text-red-400 font-mono">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>Analysis Request Failed</span>
          </div>
          <p className="text-xs text-neutral-300 leading-relaxed pl-6">
            {error}
          </p>
          <div className="pt-2 pl-6 flex items-center gap-3">
            <button
              onClick={handleInitialAnalyze}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 text-xs text-red-200 font-medium transition-colors cursor-pointer font-mono"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retry Diagnostic</span>
            </button>
          </div>
        </div>
      )}

      {/* Captured Summary Card */}
      <div className="p-6 sm:p-7 rounded-3xl bg-neutral-900/80 border border-white/[0.08] shadow-2xl space-y-5 mb-8 backdrop-blur-xl">
        <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">
          Diagnostic Session Parameters
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Topic */}
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] space-y-1">
            <span className="text-[10px] text-neutral-400 font-mono uppercase tracking-wider">Subject</span>
            <div className="text-base font-semibold text-white truncate font-sans" title={topic}>
              {topic || 'None specified'}
            </div>
          </div>

          {/* Confidence */}
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] space-y-1">
            <span className="text-[10px] text-neutral-400 font-mono uppercase tracking-wider">Self-Assessed Confidence</span>
            <div className="text-base font-semibold text-amber-400 font-mono flex items-baseline gap-1">
              <span>{confidence}%</span>
              <span className="text-xs text-neutral-400 font-sans">
                {confidence >= 75 ? '(High)' : confidence >= 50 ? '(Moderate)' : '(Low)'}
              </span>
            </div>
          </div>
        </div>

        {/* Payload Metrics */}
        <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] flex items-center justify-between text-xs font-mono text-neutral-400">
          <span>Payload: {charCount} chars ({wordCount} words)</span>
          <span className="text-emerald-400 flex items-center gap-1">
            <Check className="w-3.5 h-3.5" /> Client Verified
          </span>
        </div>
      </div>

      {/* Primary Action Button */}
      <div className="space-y-4">
        <button
          id="analyze-btn"
          onClick={handleInitialAnalyze}
          className="w-full group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-semibold text-base transition-all duration-200 shadow-xl shadow-amber-500/20 hover:shadow-amber-500/30 hover:scale-[1.01] active:scale-[0.99] cursor-pointer font-sans"
        >
          <Sparkles className="w-5 h-5 text-neutral-950" />
          <span>Launch AI Conceptual Diagnostic</span>
          <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
        </button>

        <div className="flex items-center justify-between pt-2">
          <button
            onClick={onEdit}
            type="button"
            className="text-xs text-neutral-400 hover:text-white transition-colors cursor-pointer font-mono"
          >
            Edit Articulation
          </button>
          <button
            onClick={onReset}
            type="button"
            className="text-xs text-neutral-400 hover:text-white transition-colors cursor-pointer font-mono"
          >
            Cancel Session
          </button>
        </div>
      </div>
    </div>
  );
}

