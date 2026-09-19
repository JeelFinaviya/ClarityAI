import React, { useState } from 'react';
import { 
  BrainCircuit, 
  ArrowRight, 
  Sparkles, 
  Lightbulb
} from 'lucide-react';

export function ExplainPage({
  topic,
  setTopic,
  explanation,
  setExplanation,
  onContinue,
  onBack,
}) {
  const [showTips, setShowTips] = useState(false);

  const words = explanation.trim() ? explanation.trim().split(/\s+/).length : 0;
  const chars = explanation.length;

  // Gamified depth power meter
  const getPowerLevel = (w) => {
    if (w === 0) return { label: 'Empty Canvas', color: 'bg-zinc-800', text: 'text-zinc-500', pct: 5 };
    if (w < 15) return { label: 'Initial Sparks', color: 'bg-amber-500', text: 'text-amber-400', pct: 25 };
    if (w < 35) return { label: 'Building Mechanics', color: 'bg-orange-500', text: 'text-orange-400', pct: 60 };
    if (w < 60) return { label: 'Solid Articulation 🔥', color: 'bg-[#ff5722]', text: 'text-[#ff7a50]', pct: 85 };
    return { label: 'Deep First-Principles Power! ⚡', color: 'bg-[#a3e635]', text: 'text-[#a3e635]', pct: 100 };
  };

  const power = getPowerLevel(words);
  const isValid = topic.trim().length >= 2 && words >= 4;

  const quickTopicSuggestions = [
    'React Virtual DOM',
    'JavaScript Event Loop',
    'Database B-Tree Indexing',
    'CAP Theorem',
    'Transformer Attention',
    'TCP 3-Way Handshake'
  ];

  return (
    <div className="w-full flex-1 flex flex-col items-center justify-start arena-bg-radial px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="w-full max-w-3xl flex flex-col gap-6">
        
        {/* Stage Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ff5722]/10 border border-[#ff5722]/30 text-[#ff7a50] text-xs font-semibold mb-3">
            <BrainCircuit className="w-3.5 h-3.5 text-[#ff5722]" />
            <span>Stage 1 of 3: Articulate Your Mental Model</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Explain it in your own words
          </h1>
          <p className="text-zinc-400 text-sm mt-2 max-w-lg mx-auto">
            Avoid copy-pasting textbook definitions. Explain <strong className="text-zinc-200 font-semibold">how and why</strong> the underlying mechanism actually works.
          </p>
        </div>

        {/* Quest Card */}
        <div className="glass-card rounded-2xl p-6 sm:p-8 flex flex-col gap-6 border border-white/10 shadow-2xl">
          
          {/* Topic Field */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-300 flex items-center justify-between">
              <span>Target Concept / Topic</span>
              <span className="text-zinc-500 lowercase font-normal">e.g., React Virtual DOM</span>
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="What concept do you want to test?"
              className="w-full px-4 py-3.5 rounded-xl bg-[#07090e]/90 border border-white/10 focus:border-[#ff5722] focus:ring-2 focus:ring-[#ff5722]/20 text-white placeholder-zinc-500 text-base font-medium transition-all outline-none"
            />

            {/* Quick Topic Chips */}
            <div className="flex items-center gap-1.5 flex-wrap pt-1">
              <span className="text-[11px] text-zinc-500 font-medium mr-1">Try:</span>
              {quickTopicSuggestions.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setTopic(item)}
                  className={`text-[11px] font-medium px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                    topic === item
                      ? 'bg-gradient-to-r from-[#ff5722] to-[#f97316] text-white border-orange-400 shadow-sm shadow-orange-500/30'
                      : 'bg-white/[0.03] text-zinc-400 hover:text-zinc-200 border-white/5 hover:border-white/15'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Explanation Textarea */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-2">
                <span>Your Explanation</span>
                <span className="text-zinc-500 font-normal lowercase">(First principles)</span>
              </label>

              <button
                type="button"
                onClick={() => setShowTips(!showTips)}
                className="text-xs text-[#a3e635] hover:text-lime-300 flex items-center gap-1 cursor-pointer font-medium"
              >
                <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                <span>{showTips ? 'Hide Tips' : 'Tips to score high'}</span>
              </button>
            </div>

            {/* Tips Accordion */}
            {showTips && (
              <div className="p-4 rounded-xl bg-[#a3e635]/10 border border-[#a3e635]/25 text-xs text-zinc-200 flex flex-col gap-1.5">
                <div className="font-bold flex items-center gap-1.5 text-[#a3e635]">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>How ClarityAI Evaluates:</span>
                </div>
                <ul className="list-disc list-inside text-zinc-300 space-y-1 pl-1">
                  <li><strong>Mechanisms over Buzzwords:</strong> Don't just say <em>"it's fast"</em>—explain <em>why</em> and <em>how</em> it achieves speed.</li>
                  <li><strong>Causal Sequence:</strong> What is the input? What steps transform it? What is the output?</li>
                  <li><strong>Edge Cases / Boundaries:</strong> Mention when or why the mechanism is chosen over alternatives.</li>
                </ul>
              </div>
            )}

            <textarea
              rows={7}
              value={explanation}
              onChange={(e) => setExplanation(e.target.value)}
              placeholder="Start explaining here... e.g., The Virtual DOM is an in-memory representation of UI elements. When state changes, React builds a new virtual tree, runs a diffing algorithm to calculate minimal changes, and batches DOM updates to prevent expensive browser reflows..."
              className="w-full p-4 rounded-xl bg-[#07090e]/90 border border-white/10 focus:border-[#ff5722] focus:ring-2 focus:ring-[#ff5722]/20 text-white placeholder-zinc-500 text-sm sm:text-base leading-relaxed resize-none transition-all outline-none"
            />

            {/* Live Word Count & Gamified Power Meter */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pt-2 text-xs">
              <div className="flex items-center gap-3 text-zinc-400 font-mono-code">
                <span>{words} words</span>
                <span className="text-zinc-600">&bull;</span>
                <span>{chars} chars</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-zinc-400 text-[11px]">Depth Meter:</span>
                <div className="w-24 sm:w-32 h-2 bg-[#121624] rounded-full overflow-hidden border border-white/5">
                  <div 
                    className={`h-full ${power.color} transition-all duration-300`} 
                    style={{ width: `${power.pct}%` }} 
                  />
                </div>
                <span className={`text-[11px] font-bold ${power.text}`}>{power.label}</span>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-between pt-4 border-t border-white/5">
            <button
              type="button"
              onClick={onBack}
              className="px-4 py-2.5 rounded-xl bg-[#121624] hover:bg-[#181d2e] text-zinc-300 text-xs font-semibold transition-all cursor-pointer"
            >
              ← Back
            </button>

            <button
              type="button"
              disabled={!isValid}
              onClick={onContinue}
              className={`px-6 py-3 rounded-xl font-display text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
                isValid
                  ? 'bg-gradient-to-r from-[#ff5722] via-[#f97316] to-[#a3e635] text-white shadow-lg shadow-orange-500/30 hover:scale-105 active:scale-95'
                  : 'bg-[#121624] text-zinc-500 cursor-not-allowed border border-white/5'
              }`}
            >
              <span>Next: Set Conviction</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
