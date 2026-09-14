import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  ArrowLeft, 
  ArrowRight, 
  AlertCircle, 
  RotateCcw, 
  CheckCircle2, 
  Zap, 
  ShieldCheck, 
  Layers
} from 'lucide-react';
import { analyzeExplanation, synthesizeFinalDiagnostic, saveDiagnosticRecord } from '../services/api';
import { DiagnosticProbePage } from './DiagnosticProbePage';
import { ResultsView } from '../components/ResultsView';

const SCANNER_STEPS = [
  { label: 'Parsing Mental Model', desc: 'Extracting key causal assertions and definitions...' },
  { label: 'Analyzing Causal Mechanics', desc: 'Evaluating step-by-step invariant transformations...' },
  { label: 'Scanning for Misconceptions', desc: 'Checking common conceptual traps and boundary fallacies...' },
  { label: 'Calibrating Conviction Index', desc: 'Comparing stated confidence vs demonstrated mechanical depth...' },
];

export function AnalysisReadyPage({
  topic,
  explanation,
  confidence,
  onEdit,
  onReset,
}) {
  const [mode, setMode] = useState('ready');
  const [error, setError] = useState(null);
  const [initialData, setInitialData] = useState(null);
  const [finalResult, setFinalResult] = useState(null);
  const [activeStepIdx, setActiveStepIdx] = useState(0);

  const wordCount = explanation.trim() ? explanation.trim().split(/\s+/).length : 0;

  // Auto-cycle diagnostic scanning animation
  useEffect(() => {
    if (mode !== 'loading_initial' && mode !== 'loading_synthesis') return;

    const interval = setInterval(() => {
      setActiveStepIdx((prev) => (prev < SCANNER_STEPS.length - 1 ? prev + 1 : prev));
    }, 1200);

    return () => clearInterval(interval);
  }, [mode]);

  const handleInitialAnalyze = async () => {
    if (mode === 'loading_initial' || mode === 'loading_synthesis') return;
    setMode('loading_initial');
    setError(null);
    setActiveStepIdx(0);

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
      setError(err.message || 'Unable to complete diagnosis. Please verify your connection or retry.');
      setMode('ready');
    }
  };

  const handleProbeAnswerSubmit = async (probeAnswer) => {
    if (mode === 'loading_synthesis') return;
    setMode('loading_synthesis');
    setError(null);
    setActiveStepIdx(0);

    try {
      const synthesized = await synthesizeFinalDiagnostic({
        topic,
        initial_explanation: explanation,
        confidence,
        probe_question: initialData?.probe?.probe_question || '',
        probe_answer: probeAnswer,
      });
      setFinalResult(synthesized);
      setMode('results');
    } catch (err) {
      console.error('Final synthesis error:', err);
      setError(err.message || 'Unable to synthesize final score.');
      setMode('probe');
    }
  };

  const handleSkipProbe = () => {
    if (initialData) {
      setFinalResult(initialData);
      setMode('results');
      if (!initialData.saved_record_id) {
        saveDiagnosticRecord({
          topic,
          initial_explanation: explanation,
          confidence,
          diagnostic_result: initialData,
        }).catch((e) => console.warn('Auto-archive notice:', e));
      }
    }
  };

  // 1. Results View
  if (mode === 'results' && finalResult) {
    return (
      <ResultsView
        result={finalResult}
        userConfidence={confidence}
        onRefine={onEdit}
        onReset={onReset}
      />
    );
  }

  // 2. Probe Challenge View
  if (mode === 'probe' && initialData?.probe) {
    return (
      <DiagnosticProbePage
        topic={topic}
        probeQuestion={initialData.probe.probe_question}
        probeReason={initialData.probe.probe_reason}
        onAnswerSubmit={handleProbeAnswerSubmit}
        onSkip={handleSkipProbe}
      />
    );
  }

  // 3. Loading Telemetry View
  if (mode === 'loading_initial' || mode === 'loading_synthesis') {
    return (
      <div className="w-full flex-1 flex flex-col items-center justify-center arena-bg-radial px-4 py-16 text-center">
        <div className="w-full max-w-lg glass-card rounded-3xl p-8 sm:p-10 border border-indigo-500/30 shadow-2xl flex flex-col items-center">
          
          {/* Animated Glowing Ring */}
          <div className="relative w-20 h-20 mb-6 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-cyan-400 animate-spin blur-sm opacity-70" />
            <div className="relative w-16 h-16 rounded-full bg-slate-950 flex items-center justify-center border border-white/10">
              <Sparkles className="w-8 h-8 text-cyan-400 animate-pulse" />
            </div>
          </div>

          <h2 className="font-display text-2xl font-bold text-white mb-2">
            {mode === 'loading_initial' ? 'Evaluating Mental Model...' : 'Synthesizing Final Rank...'}
          </h2>
          <p className="text-xs text-slate-400 mb-8 max-w-xs">
            Running conceptual causality algorithms on your submission.
          </p>

          {/* Stepper progress */}
          <div className="w-full flex flex-col gap-3">
            {SCANNER_STEPS.map((step, idx) => {
              const isDone = idx < activeStepIdx;
              const isCurrent = idx === activeStepIdx;
              return (
                <div
                  key={step.label}
                  className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
                    isCurrent
                      ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-md'
                      : isDone
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                      : 'bg-slate-900/40 border-white/5 text-slate-500'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                    isDone ? 'bg-emerald-500 text-slate-950' : isCurrent ? 'bg-indigo-500 text-white animate-pulse' : 'bg-slate-800 text-slate-600'
                  }`}>
                    {isDone ? '✓' : idx + 1}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold leading-none">{step.label}</span>
                    <span className="text-[10px] text-slate-400 mt-1">{step.desc}</span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    );
  }

  // 4. Ready / Launch Screen
  return (
    <div className="w-full flex-1 flex flex-col items-center justify-start arena-bg-radial px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="w-full max-w-3xl flex flex-col gap-6">
        
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Ready for Evaluation</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Review & Start Evaluation
          </h1>
          <p className="text-slate-400 text-sm mt-2 max-w-md mx-auto">
            Your argument and stated conviction are locked in. Start the evaluation to calculate your score.
          </p>
        </div>

        {error && (
          <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Summary Card */}
        <div className="glass-card rounded-2xl p-6 sm:p-8 flex flex-col gap-6 border border-white/10 shadow-2xl">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-900/80 border border-white/5">
              <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold block mb-1">Target Concept</span>
              <span className="font-display text-lg font-bold text-white">{topic}</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-white/5">
              <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold block mb-1">Stated Conviction</span>
              <span className="font-display text-lg font-bold text-indigo-400 font-mono-code">{confidence}%</span>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-slate-900/80 border border-white/5 flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold uppercase tracking-wider">Your Articulated Argument</span>
              <span className="font-mono-code">{wordCount} words</span>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed max-h-48 overflow-y-auto pr-2">
              "{explanation}"
            </p>
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-between pt-4 border-t border-white/5">
            <button
              type="button"
              onClick={onEdit}
              className="px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 text-xs font-semibold transition-all cursor-pointer"
            >
              ← Edit Details
            </button>

            <button
              type="button"
              onClick={handleInitialAnalyze}
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 text-white font-display text-sm font-bold shadow-xl shadow-indigo-500/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-cyan-200" />
              <span>Start Evaluation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
