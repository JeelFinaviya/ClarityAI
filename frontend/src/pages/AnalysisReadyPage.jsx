import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  AlertCircle, 
  ShieldCheck, 
  RotateCcw
} from 'lucide-react';
import { 
  analyzeExplanation, 
  synthesizeFinalDiagnostic, 
  generateMCQAssessment, 
  submitMCQAssessment, 
  saveDiagnosticRecord 
} from '../services/api';
import { MCQAssessmentPage } from './MCQAssessmentPage';
import { DiagnosticProbePage } from './DiagnosticProbePage';
import { ResultsView } from '../components/ResultsView';

const INITIAL_ANALYSIS_STEPS = [
  { label: 'Analyzing Mental Model', desc: 'Parsing your explanation and stated conviction...' },
  { label: 'Finding Conceptual Gaps', desc: 'Scanning causal mechanisms and boundary fallacies...' },
  { label: 'Preparing Assessment Strategy', desc: 'Structuring targeted cognitive inquiry...' },
];

const MCQ_GENERATION_STEPS = [
  { label: 'Building Targeted Assessment', desc: 'Formulating mechanistic questions from detected gaps...' },
  { label: 'Targeting Conceptual Gaps', desc: 'Calibrating plausible misconception distractors...' },
  { label: 'Finalizing Assessment', desc: 'Preparing your interactive question set...' },
];

const SYNTHESIS_STEPS = [
  { label: 'Evaluating Responses', desc: 'Grading mechanistic accuracy against first-principles...' },
  { label: 'Comparing Demonstrated Grasp', desc: 'Cross-referencing MCQ choices with your explanation...' },
  { label: 'Calibrating Conviction Index', desc: 'Synthesizing stated confidence vs demonstrated depth...' },
  { label: 'Preparing Diagnostic Report', desc: 'Compiling final cognitive dimensions and mastery tier...' },
];

export function AnalysisReadyPage({
  topic,
  explanation,
  confidence,
  onEdit,
  onReset,
}) {
  const [mode, setMode] = useState('ready'); // 'ready' | 'loading_initial' | 'loading_mcq' | 'mcq' | 'probe' | 'loading_synthesis' | 'results'
  const [error, setError] = useState(null);
  const [initialData, setInitialData] = useState(null);
  const [mcqData, setMcqData] = useState(null);
  const [savedMcqAnswers, setSavedMcqAnswers] = useState({});
  const [finalResult, setFinalResult] = useState(null);
  const [activeStepIdx, setActiveStepIdx] = useState(0);

  const wordCount = explanation.trim() ? explanation.trim().split(/\s+/).length : 0;

  // Determine current active loading steps array
  let currentLoadingSteps = INITIAL_ANALYSIS_STEPS;
  let loadingTitle = 'Evaluating Mental Model...';
  let loadingSubtitle = 'Running conceptual causality algorithms on your submission.';

  if (mode === 'loading_mcq') {
    currentLoadingSteps = MCQ_GENERATION_STEPS;
    loadingTitle = 'Generating Targeted Assessment...';
    loadingSubtitle = 'Creating anti-buzzword questions tailored to your specific gaps.';
  } else if (mode === 'loading_synthesis') {
    currentLoadingSteps = SYNTHESIS_STEPS;
    loadingTitle = 'Synthesizing Final Diagnostic...';
    loadingSubtitle = 'Integrating your written argument and assessment choices.';
  }

  // Auto-cycle diagnostic scanning animation
  useEffect(() => {
    if (mode !== 'loading_initial' && mode !== 'loading_mcq' && mode !== 'loading_synthesis') return;

    const interval = setInterval(() => {
      setActiveStepIdx((prev) => (prev < currentLoadingSteps.length - 1 ? prev + 1 : prev));
    }, 1200);

    return () => clearInterval(interval);
  }, [mode, currentLoadingSteps.length]);

  const handleInitialAnalyze = async () => {
    if (mode === 'loading_initial' || mode === 'loading_mcq' || mode === 'loading_synthesis') return;
    setMode('loading_initial');
    setError(null);
    setActiveStepIdx(0);

    try {
      // Step 1: Initial Analysis
      const initResult = await analyzeExplanation(topic, explanation, confidence);
      setInitialData(initResult);

      // Step 2: Adaptive MCQ Generation
      setMode('loading_mcq');
      setActiveStepIdx(0);

      const mcqResult = await generateMCQAssessment(topic, explanation, confidence, initResult);
      setMcqData(mcqResult);
      setMode('mcq');
    } catch (err) {
      console.error('Initial analysis / MCQ error:', err);
      setError(err.message || 'Unable to complete diagnosis. Please verify your connection or retry.');
      setMode('ready');
    }
  };

  const handleMCQAnswersSubmit = async (formattedAnswers) => {
    if (mode === 'loading_synthesis') return;
    setMode('loading_synthesis');
    setError(null);
    setActiveStepIdx(0);

    // Save answers in local state map so they are never lost on network retry
    const answersMap = {};
    formattedAnswers.forEach((ans) => {
      answersMap[ans.question_id] = ans.selected_option;
    });
    setSavedMcqAnswers(answersMap);

    try {
      const synthesized = await submitMCQAssessment({
        assessment_token: mcqData.assessment_token,
        topic,
        initial_explanation: explanation,
        confidence,
        answers: formattedAnswers,
        initial_diagnostic: initialData,
      });
      setFinalResult(synthesized);
      setMode('results');
    } catch (err) {
      console.error('MCQ synthesis error:', err);
      setError(err.message || 'Unable to synthesize final score. Your answers have been preserved.');
      setMode('mcq');
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

  const handleSkipToFinal = () => {
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

  // 2. MCQ Assessment View
  if (mode === 'mcq' && mcqData?.questions) {
    return (
      <div className="w-full flex-1 flex flex-col">
        {error && (
          <div className="max-w-3xl mx-auto w-full px-4 pt-4">
            <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
                <span>{error}</span>
              </div>
              <button
                type="button"
                onClick={() => setError(null)}
                className="text-xs font-semibold underline text-rose-300 hover:text-white"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}
        <MCQAssessmentPage
          topic={topic}
          questions={mcqData.questions}
          initialAnswers={savedMcqAnswers}
          onSubmit={handleMCQAnswersSubmit}
          onSkip={handleSkipToFinal}
        />
      </div>
    );
  }

  // 3. Fallback Probe View (if probe was triggered)
  if (mode === 'probe' && initialData?.probe) {
    return (
      <DiagnosticProbePage
        topic={topic}
        probeQuestion={initialData.probe.probe_question}
        probeReason={initialData.probe.probe_reason}
        onAnswerSubmit={handleProbeAnswerSubmit}
        onSkip={handleSkipToFinal}
      />
    );
  }

  // 4. Loading Telemetry View
  if (mode === 'loading_initial' || mode === 'loading_mcq' || mode === 'loading_synthesis') {
    return (
      <div className="w-full flex-1 flex flex-col items-center justify-center arena-bg-radial px-4 py-16 text-center">
        <div className="w-full max-w-lg glass-card rounded-3xl p-8 sm:p-10 border border-white/10 shadow-2xl flex flex-col items-center">
          
          {/* Animated Glowing Ring */}
          <div className="relative w-20 h-20 mb-6 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#3b82f6] via-blue-500 to-indigo-400 animate-spin blur-sm opacity-60" />
            <div className="relative w-16 h-16 rounded-full bg-[#090a0f] flex items-center justify-center border border-white/10">
              <Sparkles className="w-8 h-8 text-[#3b82f6] animate-pulse" />
            </div>
          </div>

          <h2 className="font-display text-2xl font-bold text-white mb-2">
            {loadingTitle}
          </h2>
          <p className="text-xs text-slate-400 mb-8 max-w-xs">
            {loadingSubtitle}
          </p>

          {/* Stepper progress */}
          <div className="w-full flex flex-col gap-3">
            {currentLoadingSteps.map((step, idx) => {
              const isDone = idx < activeStepIdx;
              const isCurrent = idx === activeStepIdx;
              return (
                <div
                  key={step.label}
                  className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
                    isCurrent
                      ? 'bg-[#3b82f6]/10 border-[#3b82f6] text-white shadow-sm'
                      : isDone
                      ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                      : 'bg-[#090a0f]/40 border-white/5 text-slate-500'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                    isDone ? 'bg-emerald-500 text-slate-950' : isCurrent ? 'bg-[#3b82f6] text-white animate-pulse' : 'bg-[#181c2b] text-slate-500'
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

  // 5. Ready / Review Launch Screen
  return (
    <div className="w-full flex-1 flex flex-col items-center justify-start arena-bg-radial px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="w-full max-w-3xl flex flex-col gap-6">
        
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#3b82f6]/10 border border-[#3b82f6]/20 text-[#60a5fa] text-xs font-semibold mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-[#3b82f6]" />
            <span>Ready for Evaluation</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Review & Start Evaluation
          </h1>
          <p className="text-slate-300 text-sm mt-2 max-w-md mx-auto">
            Your argument and stated conviction are locked in. Start the evaluation to begin your targeted assessment.
          </p>
        </div>

        {error && (
          <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
              <span>{error}</span>
            </div>
            <button
              type="button"
              onClick={handleInitialAnalyze}
              className="px-3 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 text-xs font-semibold flex items-center gap-1 cursor-pointer transition-all shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retry</span>
            </button>
          </div>
        )}

        {/* Summary Card */}
        <div className="glass-card rounded-2xl p-6 sm:p-8 flex flex-col gap-6 border border-white/10 shadow-xl">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-[#090a0f] border border-white/5">
              <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold block mb-1">Target Concept</span>
              <span className="font-display text-lg font-bold text-white">{topic}</span>
            </div>

            <div className="p-4 rounded-xl bg-[#090a0f] border border-white/5">
              <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold block mb-1">Stated Conviction</span>
              <span className="font-display text-lg font-bold text-[#3b82f6] font-mono-code">{confidence}%</span>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-[#090a0f] border border-white/5 flex flex-col gap-2">
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
              className="px-4 py-2.5 rounded-xl bg-[#121520] hover:bg-[#181c2b] text-slate-300 text-xs font-semibold transition-all cursor-pointer"
            >
              ← Edit Details
            </button>

            <button
              type="button"
              onClick={handleInitialAnalyze}
              className="px-8 py-3.5 rounded-xl bg-[#3b82f6] hover:bg-[#2563eb] text-white font-display text-sm font-bold shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-blue-200" />
              <span>Start Evaluation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
