import React from 'react';
import { 
  CheckCircle2, 
  CircleDashed, 
  AlertTriangle, 
  RotateCcw, 
  Edit3, 
  Sparkles,
  Activity,
  Compass,
  ShieldCheck,
  AlertCircle,
  Target
} from 'lucide-react';

export function ResultsView({
  result,
  userConfidence,
  onRefine,
  onReset,
}) {
  const {
    topic,
    understanding_score = 0,
    understanding_level,
    diagnostic_dimensions,
    confidence_calibration,
    diagnostic_journey,
    concepts_understood = [],
    missing_concepts = [],
    possible_misconceptions = [],
    summary,
  } = result;

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-emerald-400';
    if (score >= 60) return 'text-amber-400';
    return 'text-orange-400';
  };

  const getScoreGradient = (score) => {
    if (score >= 80) return 'from-emerald-500/20 via-emerald-500/5 to-transparent border-emerald-500/30';
    if (score >= 60) return 'from-amber-500/20 via-amber-500/5 to-transparent border-amber-500/30';
    return 'from-orange-500/20 via-orange-500/5 to-transparent border-orange-500/30';
  };

  const getDepthBadge = (depth) => {
    switch (depth) {
      case 'deep_mastery':
        return {
          label: 'Deep Mastery',
          className: 'bg-amber-500/10 text-amber-300 border-amber-500/25',
        };
      case 'causal_mechanism':
        return {
          label: 'Causal Mechanism',
          className: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/25',
        };
      case 'surface_familiarity':
      default:
        return {
          label: 'Surface Familiarity',
          className: 'bg-neutral-800 text-neutral-300 border-neutral-700',
        };
    }
  };

  const getCalibrationBadge = (status) => {
    switch (status) {
      case 'overconfident':
        return {
          title: 'Illusion of Competence Gap',
          badge: 'Overconfident',
          badgeClass: 'bg-orange-500/10 text-orange-400 border-orange-500/30',
          borderClass: 'border-orange-500/20 bg-orange-500/[0.03]',
          icon: AlertCircle,
        };
      case 'underconfident':
        return {
          title: 'Unrealized Conceptual Mastery',
          badge: 'Underconfident',
          badgeClass: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
          borderClass: 'border-cyan-500/20 bg-cyan-500/[0.03]',
          icon: Compass,
        };
      case 'calibrated':
      default:
        return {
          title: 'Well-Calibrated Self-Assessment',
          badge: 'Calibrated',
          badgeClass: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
          borderClass: 'border-emerald-500/20 bg-emerald-500/[0.03]',
          icon: ShieldCheck,
        };
    }
  };

  const calibrationInfo = confidence_calibration
    ? getCalibrationBadge(confidence_calibration.status)
    : null;

  // Defensive Resolution for Diagnostic Journey fields
  const journeyHypothesis = diagnostic_journey?.initial_hypothesis || '';
  const journeyInvestigated = diagnostic_journey?.investigated_gap || diagnostic_journey?.probe_focus || '';
  const journeyFinding = diagnostic_journey?.followup_finding || diagnostic_journey?.probe_outcome || '';
  const journeySynthesis = diagnostic_journey?.synthesis_summary || diagnostic_journey?.outcome_explanation || '';

  const hasValidJourney = journeyHypothesis || journeyInvestigated || journeyFinding || journeySynthesis;

  return (
    <div className="space-y-8 animate-fadeIn text-left">
      {/* Top Banner with Understanding Score and Level */}
      <div className={`p-6 sm:p-9 rounded-3xl bg-gradient-to-b ${getScoreGradient(understanding_score)} border shadow-2xl backdrop-blur-xl`}>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Target & Score */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-mono text-neutral-200">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>AI Conceptual Diagnostic</span>
              </div>
              {understanding_level && (
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs font-mono font-medium">
                  {understanding_level}
                </div>
              )}
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-sans">
              {topic}
            </h2>
            <p className="text-sm sm:text-base text-neutral-300 max-w-lg leading-relaxed font-sans">
              {summary}
            </p>
          </div>

          {/* Primary Score Dial */}
          <div className="flex items-center gap-4 bg-[#07080b]/90 p-6 rounded-2xl border border-white/[0.08] self-stretch md:self-auto justify-center shadow-xl">
            <div className="text-center">
              <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider block mb-1">
                Diagnostic Score
              </span>
              <div className={`text-5xl sm:text-6xl font-extrabold font-mono tracking-tight ${getScoreColor(understanding_score)} drop-shadow-sm`}>
                {understanding_score}%
              </div>
            </div>
          </div>
        </div>

        {/* Confidence vs Measured Diagnostic Metric Bar */}
        <div className="mt-7 pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-neutral-950/60 border border-white/5 flex items-center justify-between">
            <span className="text-xs text-neutral-400 font-sans">Self-Assessed Confidence:</span>
            <span className="text-sm font-semibold font-mono text-white">{userConfidence}%</span>
          </div>
          <div className="p-4 rounded-xl bg-neutral-950/60 border border-white/5 flex items-center justify-between">
            <span className="text-xs text-neutral-400 font-sans">Measured Conceptual Grasp:</span>
            <span className={`text-sm font-semibold font-mono ${getScoreColor(understanding_score)}`}>
              {understanding_score}%
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Diagnostic Journey (Connected 4-Stage Verification Path) */}
      {diagnostic_journey && hasValidJourney && (
        <div className="p-6 sm:p-8 rounded-3xl bg-neutral-900/80 border border-amber-500/25 shadow-2xl backdrop-blur-xl space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-amber-400/10 text-amber-400 flex items-center justify-center">
                <Target className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white font-sans">Interactive Diagnostic Journey</h3>
                <span className="text-[11px] text-neutral-400">
                  How ClarityAI probed your causal understanding and synthesized the evaluation
                </span>
              </div>
            </div>
            <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-amber-300 hidden sm:inline-block">
              2-Stage Verification
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
            {/* Step 1: Initial Hypothesis */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-neutral-300 font-medium">
                <span className="w-5 h-5 rounded-full bg-neutral-800 text-neutral-200 flex items-center justify-center text-[10px] font-bold">1</span>
                <span>Initial Articulation Grasp</span>
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed pl-7">
                {journeyHypothesis || 'Evaluated baseline conceptual definitions and detected mechanical uncertainties.'}
              </p>
            </div>

            {/* Step 2: Investigated Mechanism */}
            <div className="p-4 rounded-2xl bg-amber-500/[0.03] border border-amber-500/15 space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-medium">
                <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center text-[10px] font-bold">2</span>
                <span>Investigated Mechanism</span>
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed pl-7">
                {journeyInvestigated || 'Targeted the underlying causal invariant and operational mechanics.'}
              </p>
            </div>

            {/* Step 3: Follow-up Finding */}
            <div className="p-4 rounded-2xl bg-cyan-500/[0.03] border border-cyan-500/15 space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-medium">
                <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center text-[10px] font-bold">3</span>
                <span>Probe Finding</span>
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed pl-7">
                {journeyFinding || 'Evaluated follow-up answer against first-principles reasoning.'}
              </p>
            </div>

            {/* Step 4: Synthesized Verdict */}
            <div className="p-4 rounded-2xl bg-emerald-500/[0.03] border border-emerald-500/15 space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-medium">
                <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center text-[10px] font-bold">4</span>
                <span>Synthesized Verdict</span>
              </div>
              <p className="text-xs text-neutral-200 leading-relaxed pl-7 font-medium">
                {journeySynthesis || 'Consolidated total demonstrated understanding and calibrated score.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Diagnostic Dimensions Breakdown (Three Pillars of Understanding) */}
      {diagnostic_dimensions && (
        <div className="p-6 sm:p-7 rounded-3xl bg-neutral-900/80 border border-white/[0.08] space-y-5 shadow-xl backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-amber-400/10 text-amber-400 flex items-center justify-center">
                <Activity className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white font-sans">Three Pillars of Understanding</h3>
                <span className="text-[11px] text-neutral-400">
                  Granular cognitive evaluation across definition, step-by-step causality, and relational invariants
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
            {/* Dimension 1: Core Accuracy */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-neutral-300 font-medium">Core Accuracy</span>
                <span className="font-mono text-amber-400 font-semibold">{diagnostic_dimensions.core_accuracy}%</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-neutral-800 overflow-hidden">
                <div 
                  className="h-full bg-amber-400 rounded-full transition-all duration-700 shadow-[0_0_8px_rgba(245,158,11,0.6)]"
                  style={{ width: `${diagnostic_dimensions.core_accuracy}%` }}
                />
              </div>
              <p className="text-[11px] text-neutral-400 leading-tight">
                Factual precision and definition clarity
              </p>
            </div>

            {/* Dimension 2: Causal Depth */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-neutral-300 font-medium">Causal Depth</span>
                <span className="font-mono text-emerald-400 font-semibold">{diagnostic_dimensions.causal_depth}%</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-neutral-800 overflow-hidden">
                <div 
                  className="h-full bg-emerald-400 rounded-full transition-all duration-700 shadow-[0_0_8px_rgba(16,185,129,0.6)]"
                  style={{ width: `${diagnostic_dimensions.causal_depth}%` }}
                />
              </div>
              <p className="text-[11px] text-neutral-400 leading-tight">
                Step-by-step 'how' & 'why' mechanisms
              </p>
            </div>

            {/* Dimension 3: Relational Coherence */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-neutral-300 font-medium">Relational Coherence</span>
                <span className="font-mono text-cyan-400 font-semibold">{diagnostic_dimensions.relational_coherence}%</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-neutral-800 overflow-hidden">
                <div 
                  className="h-full bg-cyan-400 rounded-full transition-all duration-700 shadow-[0_0_8px_rgba(6,182,212,0.6)]"
                  style={{ width: `${diagnostic_dimensions.relational_coherence}%` }}
                />
              </div>
              <p className="text-[11px] text-neutral-400 leading-tight">
                Prerequisites, constraints & invariants
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Epistemic Confidence Calibration Card */}
      {confidence_calibration && calibrationInfo && (
        <div className={`p-5 sm:p-7 rounded-3xl border ${calibrationInfo.borderClass} space-y-3 backdrop-blur-xl shadow-xl`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <calibrationInfo.icon className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm font-semibold text-white font-sans">
                {calibrationInfo.title}
              </h3>
            </div>
            <span className={`text-[10px] uppercase font-mono px-2.5 py-0.5 rounded-md border ${calibrationInfo.badgeClass}`}>
              {calibrationInfo.badge}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans">
            {confidence_calibration.gap_analysis}
          </p>
        </div>
      )}

      {/* Main Analysis Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Section 1: Concepts Demonstrated */}
        <div className="p-6 sm:p-7 rounded-3xl bg-neutral-900/80 border border-white/[0.08] space-y-4 shadow-xl backdrop-blur-xl">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white font-sans">Concepts Demonstrated</h3>
              <span className="text-[11px] text-neutral-400 font-mono">
                {concepts_understood.length} identified in explanation
              </span>
            </div>
          </div>

          {concepts_understood.length > 0 ? (
            <ul className="space-y-3 pt-1">
              {concepts_understood.map((item, idx) => {
                const badge = getDepthBadge(item.depth);
                return (
                  <li
                    key={idx}
                    className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] space-y-2 text-sm text-neutral-200"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-medium leading-snug font-sans">{item.concept}</span>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md border flex-shrink-0 ${badge.className}`}>
                        {badge.label}
                      </span>
                    </div>
                    {item.evidence && (
                      <p className="text-xs text-neutral-400 italic pl-2.5 border-l-2 border-amber-400/30 font-sans">
                        &ldquo;{item.evidence}&rdquo;
                      </p>
                    )}
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="text-xs text-neutral-400 italic py-2">
              No core conceptual mechanisms were clearly identified in the explanation.
            </p>
          )}
        </div>

        {/* Section 2: Missing / Not Yet Demonstrated */}
        <div className="p-6 sm:p-7 rounded-3xl bg-neutral-900/80 border border-white/[0.08] space-y-4 shadow-xl backdrop-blur-xl">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-neutral-800 text-neutral-400 flex items-center justify-center">
              <CircleDashed className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white font-sans">Missing Concepts & Constraints</h3>
              <span className="text-[11px] text-neutral-400 font-normal font-sans">
                Prerequisites or mechanics not yet articulated
              </span>
            </div>
          </div>

          {missing_concepts.length > 0 ? (
            <ul className="space-y-3 pt-1">
              {missing_concepts.map((item, idx) => (
                <li
                  key={idx}
                  className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] text-sm space-y-1"
                >
                  <div className="text-neutral-200 font-medium flex items-center gap-2 font-sans">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400/80 flex-shrink-0" />
                    <span>{item.concept}</span>
                  </div>
                  {item.why_it_matters && (
                    <p className="text-xs text-neutral-400 leading-relaxed pl-3.5 font-sans">
                      {item.why_it_matters}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-neutral-400 italic py-2">
              No critical conceptual omissions detected for this topic scope.
            </p>
          )}
        </div>
      </div>

      {/* Section 3: Possible Misconceptions (Only rendered if present) */}
      {possible_misconceptions.length > 0 && (
        <div className="p-6 sm:p-7 rounded-3xl bg-amber-500/[0.04] border border-amber-500/20 space-y-4 shadow-xl backdrop-blur-xl">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-amber-200 font-sans">Possible Misconceptions</h3>
              <span className="text-[11px] text-neutral-400 font-normal font-sans">
                Identified claims that reflect oversimplifications or inaccurate models
              </span>
            </div>
          </div>

          <div className="space-y-3.5 pt-1">
            {possible_misconceptions.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-[#07080b]/80 border border-amber-500/20 space-y-2"
              >
                <div className="text-xs font-mono text-amber-300 font-medium">
                  &ldquo;{item.statement}&rdquo;
                </div>
                {item.underlying_fallacy && (
                  <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                    <span className="text-neutral-400 font-mono">Fallacy: </span>
                    {item.underlying_fallacy}
                  </p>
                )}
                {item.correction && (
                  <p className="text-xs text-emerald-400/90 leading-relaxed font-sans">
                    <span className="text-neutral-400 font-mono">Correction: </span>
                    {item.correction}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
        <button
          onClick={onRefine}
          type="button"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-white/[0.08] hover:border-white/20 text-neutral-200 hover:text-white text-sm font-medium transition-colors cursor-pointer font-mono"
        >
          <Edit3 className="w-4 h-4 text-amber-400" />
          <span>Refine & Re-explain</span>
        </button>

        <button
          onClick={onReset}
          type="button"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 text-sm font-semibold transition-all shadow-xl shadow-amber-500/20 hover:scale-[1.01] active:scale-[0.99] cursor-pointer font-sans"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Test Another Topic</span>
        </button>
      </div>
    </div>
  );
}
