import React from 'react';
import { 
  AlertTriangle, 
  CheckCircle2, 
  Zap, 
  Sparkles, 
  TrendingUp,
  Target
} from 'lucide-react';

export function ResultsView({
  result,
  userConfidence,
  onRefine,
  onReset,
}) {
  const topic = result.topic || 'Target Concept';
  const score = result.understanding_score ?? result.overall_score ?? 0;
  
  // Format classification label
  const rawClassification = result.understanding_level || result.classification || 'Evaluating';
  const classification = rawClassification
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());

  const summary = result.summary || result.feedback_summary || 'Your explanation demonstrated active conceptual reasoning.';
  
  const conceptsMapped = result.concepts_understood || result.concepts_demonstrated || [];
  const conceptsUnexplored = result.missing_concepts || result.missing_critical_concepts || [];
  const misconceptions = result.possible_misconceptions || [];
  
  // Calibration data
  const statedConf = result.confidence_calibration?.stated_confidence ?? userConfidence ?? 50;
  const calStatus = result.confidence_calibration?.status || 
    (Math.abs(score - statedConf) <= 15 ? 'calibrated' : statedConf > score ? 'overconfident' : 'underconfident');
  
  const calGapAnalysis = result.confidence_calibration?.gap_analysis || 
    (calStatus === 'overconfident'
      ? 'Stated conviction exceeded demonstrated mechanical depth in your explanation.'
      : calStatus === 'underconfident'
      ? 'Your explanation showed deeper first-principles understanding than your initial self-rating.'
      : 'Your confidence is well-calibrated with your actual conceptual grasp.');

  // Dimensions
  const dims = result.diagnostic_dimensions || {
    core_accuracy: score,
    causal_depth: Math.max(10, score - 6),
    relational_coherence: Math.max(10, score - 4)
  };

  // Rank Badge logic
  const getRankBadge = (s) => {
    if (s >= 89) return { title: 'First-Principles Mastery', icon: '👑', color: 'text-amber-400', border: 'border-amber-500/20', bg: 'bg-amber-500/10' };
    if (s >= 71) return { title: 'Mechanics Specialist', icon: '⚔️', color: 'text-[#60a5fa]', border: 'border-[#3b82f6]/20', bg: 'bg-[#3b82f6]/10' };
    if (s >= 46) return { title: 'Concept Explorer', icon: '🛡️', color: 'text-slate-300', border: 'border-slate-500/20', bg: 'bg-slate-800' };
    return { title: 'Surface Familiarity', icon: '🔍', color: 'text-rose-400', border: 'border-rose-500/20', bg: 'bg-rose-500/10' };
  };

  const rank = getRankBadge(score);

  // SVG Circular Gauge calculation
  const radius = 58;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const journey = result.diagnostic_journey;

  return (
    <div className="w-full flex-1 flex flex-col items-center justify-start arena-bg-radial px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="w-full max-w-5xl flex flex-col gap-8">
        
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Evaluation Complete</span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
              {topic}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onRefine}
              className="px-4 py-2 rounded-xl bg-[#121520] hover:bg-[#181c2b] text-slate-300 text-xs font-semibold transition-all cursor-pointer"
            >
              Modify Explanation
            </button>

            <button
              type="button"
              onClick={onReset}
              className="px-5 py-2 rounded-xl bg-[#3b82f6] hover:bg-[#2563eb] text-white text-xs font-bold shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-200" />
              <span>New Topic</span>
            </button>
          </div>
        </div>

        {/* Hero Score & Rank Showcase Banner */}
        <div className="glass-card glass-card-glow rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* Circular Score Gauge */}
          <div className="flex items-center gap-6">
            <div className="relative w-36 h-36 flex items-center justify-center shrink-0">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 140 140">
                <circle
                  cx="70"
                  cy="70"
                  r={radius}
                  className="text-slate-800"
                  strokeWidth="10"
                  stroke="currentColor"
                  fill="transparent"
                />
                <circle
                  cx="70"
                  cy="70"
                  r={radius}
                  className="transition-all duration-1000 ease-out"
                  stroke={score >= 80 ? '#34d399' : score >= 60 ? '#3b82f6' : score >= 45 ? '#f59e0b' : '#f43f5e'}
                  strokeWidth="10"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>
              
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="font-display text-4xl font-black text-white font-mono-code leading-none">
                  {score}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mt-1">
                  Score
                </span>
              </div>
            </div>

            {/* Rank Details */}
            <div className="flex flex-col gap-2">
              <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold ${rank.bg} ${rank.border} ${rank.color} border w-fit`}>
                <span>{rank.icon}</span>
                <span>{rank.title}</span>
              </div>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-white leading-tight">
                {classification}
              </h2>
              <p className="text-xs text-slate-300 max-w-md leading-relaxed">
                {summary}
              </p>
            </div>
          </div>

          {/* Stated Conviction vs Actual Depth Card */}
          <div className="w-full md:w-72 bg-[#090a0f] rounded-2xl p-4 border border-white/10 flex flex-col gap-3 shrink-0">
            <div className="flex items-center justify-between text-xs font-bold text-slate-300">
              <span className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-[#3b82f6]" />
                <span>Calibration Index</span>
              </span>
              <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-mono-code ${
                calStatus === 'calibrated' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                calStatus === 'overconfident' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-blue-500/10 text-[#60a5fa] border border-blue-500/20'
              }`}>
                {calStatus}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-center py-1">
              <div className="bg-[#121520] rounded-xl p-2">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Stated</div>
                <div className="font-display text-lg font-bold text-[#3b82f6] font-mono-code">{statedConf}%</div>
              </div>
              <div className="bg-[#121520] rounded-xl p-2">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Demonstrated</div>
                <div className="font-display text-lg font-bold text-emerald-400 font-mono-code">{score}%</div>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 leading-tight">
              {calGapAnalysis}
            </p>
          </div>

        </div>

        {/* 3 Core Dimensions Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="glass-card rounded-2xl p-5 border border-white/10 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Core Accuracy</span>
              <span className="font-display text-lg font-bold text-emerald-400 font-mono-code">
                {dims.core_accuracy ?? dims.depth_of_explanation?.score ?? score}%
              </span>
            </div>
            <div className="w-full h-2 bg-[#090a0f] rounded-full overflow-hidden mb-3">
              <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${dims.core_accuracy ?? score}%` }} />
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Factual correctness of defined components, invariants, and operations.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-5 border border-white/10 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Causal Depth</span>
              <span className="font-display text-lg font-bold text-[#3b82f6] font-mono-code">
                {dims.causal_depth ?? dims.causal_relationships?.score ?? score}%
              </span>
            </div>
            <div className="w-full h-2 bg-[#090a0f] rounded-full overflow-hidden mb-3">
              <div className="h-full bg-[#3b82f6] rounded-full" style={{ width: `${dims.causal_depth ?? score}%` }} />
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Step-by-step articulation of underlying mechanisms rather than keyword stuffing.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-5 border border-white/10 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Relational Coherence</span>
              <span className="font-display text-lg font-bold text-purple-400 font-mono-code">
                {dims.relational_coherence ?? dims.edge_cases_and_limits?.score ?? score}%
              </span>
            </div>
            <div className="w-full h-2 bg-[#090a0f] rounded-full overflow-hidden mb-3">
              <div className="h-full bg-purple-400 rounded-full" style={{ width: `${dims.relational_coherence ?? score}%` }} />
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Grasp of boundary limits, prerequisite conditions, and failure modes.
            </p>
          </div>
        </div>

        {/* Diagnostic Journey (If follow-up was answered) */}
        {journey && (
          <div className="glass-card rounded-2xl p-6 sm:p-7 border border-[#3b82f6]/20 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#3b82f6]" />
              <h3 className="font-display text-base font-bold text-white">Diagnostic Journey & Evolution</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-[#090a0f]/70 border border-white/5">
                <div className="font-bold text-slate-300 uppercase tracking-wider text-[10px] mb-1">1. Initial Baseline</div>
                <div className="text-slate-400">{journey.initial_hypothesis || 'Initial mental model articulated'}</div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#090a0f]/70 border border-white/5">
                <div className="font-bold text-amber-400 uppercase tracking-wider text-[10px] mb-1">2. Investigated Gap</div>
                <div className="text-slate-400">{journey.investigated_gap || 'Specific causal trigger tested'}</div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#090a0f]/70 border border-white/5">
                <div className="font-bold text-[#60a5fa] uppercase tracking-wider text-[10px] mb-1">3. Follow-up Finding</div>
                <div className="text-slate-400">{journey.followup_finding || 'Demonstrated mechanism depth'}</div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#090a0f]/70 border border-white/5">
                <div className="font-bold text-emerald-400 uppercase tracking-wider text-[10px] mb-1">4. Final Calibration</div>
                <div className="text-slate-400">{journey.synthesis_summary || 'Final score synthesized'}</div>
              </div>
            </div>
          </div>
        )}

        {/* Breakdown: Strengths & Missing Concepts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Mastered Strengths */}
          <div className="glass-card rounded-2xl p-6 border border-emerald-500/20 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-base font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>Demonstrated Mechanisms ({conceptsMapped.length})</span>
              </h3>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Strengths
              </span>
            </div>

            {conceptsMapped.length === 0 ? (
              <p className="text-xs text-slate-500 italic">No verified mechanisms detected in the explanation.</p>
            ) : (
              <div className="flex flex-col gap-3">
                {conceptsMapped.map((c, i) => (
                  <div key={i} className="p-3.5 rounded-xl bg-[#090a0f] border border-white/5 flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-emerald-400 font-display">{c.concept}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono-code">
                        {c.depth?.replace(/_/g, ' ') || 'Demonstrated'}
                      </span>
                    </div>
                    {c.evidence && (
                      <p className="text-xs text-slate-400 italic">
                        "{c.evidence}"
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Missing Mechanisms / Blindspots */}
          <div className="glass-card rounded-2xl p-6 border border-amber-500/20 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-base font-bold text-white flex items-center gap-2">
                <Target className="w-5 h-5 text-amber-400" />
                <span>Missing Mechanisms ({conceptsUnexplored.length})</span>
              </h3>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                To Upgrade
              </span>
            </div>

            {conceptsUnexplored.length === 0 ? (
              <p className="text-xs text-emerald-400 font-medium">✨ Comprehensive! No major gaps detected.</p>
            ) : (
              <div className="flex flex-col gap-3">
                {conceptsUnexplored.map((c, i) => (
                  <div key={i} className="p-3.5 rounded-xl bg-[#090a0f] border border-white/5 flex flex-col gap-1">
                    <span className="text-xs font-bold text-amber-300 font-display">{c.concept}</span>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {c.why_it_matters || c.explanation || 'Essential for complete first-principles mastery.'}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Misconception Busters (If any) */}
        {misconceptions.length > 0 && (
          <div className="glass-card rounded-2xl p-6 border border-rose-500/20 flex flex-col gap-4 bg-rose-950/10">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-rose-400" />
              <h3 className="font-display text-base font-bold text-white">Misconception Busters</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {misconceptions.map((m, i) => (
                <div key={i} className="p-4 rounded-xl bg-[#090a0f] border border-rose-500/20 flex flex-col gap-2">
                  <div className="text-xs font-bold text-rose-300">
                    Claim: "{m.statement}"
                  </div>
                  <div className="text-xs text-slate-400">
                    <strong className="text-slate-300">Erroneous Assumption: </strong>
                    {m.underlying_fallacy}
                  </div>
                  <div className="text-xs text-emerald-300 bg-emerald-950/40 p-2.5 rounded-lg border border-emerald-500/20">
                    <strong>Correction: </strong>
                    {m.correction}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom CTA Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
          <button
            type="button"
            onClick={onReset}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#121520] hover:bg-[#181c2b] text-slate-200 text-xs font-bold transition-all cursor-pointer"
          >
            ← Return to Topic Selector
          </button>

          <button
            type="button"
            onClick={onReset}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#3b82f6] hover:bg-[#2563eb] text-white font-display text-sm font-bold shadow-md hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-blue-200" />
            <span>Test Another Concept</span>
          </button>
        </div>

      </div>
    </div>
  );
}
