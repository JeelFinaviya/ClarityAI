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

  // Depth power meter
  const getPowerLevel = (w) => {
    if (w === 0) return { label: 'Empty Canvas', color: 'bg-slate-800', text: 'text-slate-500', pct: 5 };
    if (w < 15) return { label: 'Initial Sparks', color: 'bg-amber-500', text: 'text-amber-400', pct: 25 };
    if (w < 35) return { label: 'Building Mechanics', color: 'bg-blue-500', text: 'text-[#60a5fa]', pct: 60 };
    if (w < 60) return { label: 'Solid Articulation 🔥', color: 'bg-[#3b82f6]', text: 'text-blue-300', pct: 85 };
    return { label: 'Deep First-Principles Power! ⚡', color: 'bg-emerald-500', text: 'text-emerald-400', pct: 100 };
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
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#3b82f6]/10 border border-[#3b82f6]/20 text-[#60a5fa] text-xs font-semibold mb-3">
            <BrainCircuit className="w-3.5 h-3.5 text-[#3b82f6]" />
            <span>Stage 1 of 3: Articulate Your Mental Model</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Explain it in your own words
          </h1>
          <p className="text-slate-300 text-sm mt-2 max-w-lg mx-auto">
            Avoid copy-pasting textbook definitions. Explain <strong className="text-white font-semibold">how and why</strong> the underlying mechanism actually works.
          </p>
        </div>

        {/* Quest Card */}
        <div className="glass-card rounded-2xl p-6 sm:p-8 flex flex-col gap-6 border border-white/10 shadow-xl">
          
          {/* Topic Field */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center justify-between">
              <span>Target Concept / Topic</span>
              <span className="text-slate-500 lowercase font-normal">e.g., React Virtual DOM</span>
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="What concept do you want to test?"
              className="w-full px-4 py-3.5 rounded-xl bg-[#090a0f] border border-white/10 focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6]/40 text-white placeholder-slate-500 text-base font-medium transition-all outline-none"
            />

            {/* Quick Topic Chips */}
            <div className="flex items-center gap-1.5 flex-wrap pt-1">
              <span className="text-[11px] text-slate-500 font-medium mr-1">Try:</span>
              {quickTopicSuggestions.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setTopic(item)}
                  className={`text-[11px] font-medium px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                    topic === item
                      ? 'bg-[#3b82f6] text-white border-[#3b82f6] shadow-sm font-semibold'
                      : 'bg-white/[0.03] text-slate-400 hover:text-slate-200 border-white/5 hover:border-white/15'
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
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <span>Your Explanation</span>
                <span className="text-slate-500 font-normal lowercase">(First principles)</span>
              </label>

              <button
                type="button"
                onClick={() => setShowTips(!showTips)}
                className="text-xs text-[#3b82f6] hover:text-blue-400 flex items-center gap-1 cursor-pointer font-medium transition-colors"
              >
                <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                <span>{showTips ? 'Hide Tips' : 'Tips to score high'}</span>
              </button>
            </div>

            {/* Tips Accordion */}
            {showTips && (
              <div className="p-4 rounded-xl bg-[#121520] border border-white/10 text-xs text-slate-200 flex flex-col gap-1.5">
                <div className="font-bold flex items-center gap-1.5 text-blue-300">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>How ClarityAI Evaluates:</span>
                </div>
                <ul className="list-disc list-inside text-slate-300 space-y-1 pl-1">
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
              className="w-full p-4 rounded-xl bg-[#090a0f] border border-white/10 focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6]/40 text-white placeholder-slate-500 text-sm sm:text-base leading-relaxed resize-none transition-all outline-none"
            />

            {/* Live Word Count & Gamified Power Meter */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pt-2 text-xs">
              <div className="flex items-center gap-3 text-slate-400 font-mono-code">
                <span>{words} words</span>
                <span className="text-slate-600">&bull;</span>
                <span>{chars} chars</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-slate-400 text-[11px]">Depth Meter:</span>
                <div className="w-24 sm:w-32 h-2 bg-[#121520] rounded-full overflow-hidden border border-white/5">
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
              className="px-4 py-2.5 rounded-xl bg-[#121520] hover:bg-[#181c2b] text-slate-300 text-xs font-semibold transition-all cursor-pointer"
            >
              ← Back
            </button>

            <button
              type="button"
              disabled={!isValid}
              onClick={onContinue}
              className={`px-6 py-3 rounded-xl font-display text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
                isValid
                  ? 'bg-[#3b82f6] hover:bg-[#2563eb] text-white shadow-md active:scale-95'
                  : 'bg-[#121520] text-slate-500 cursor-not-allowed border border-white/5'
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
