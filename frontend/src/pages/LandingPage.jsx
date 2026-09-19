import React from 'react';
import { 
  ArrowRight, 
  Layers, 
  Target, 
  Code2, 
  Cpu, 
  Database, 
  Network,
  BookOpen,
  Trophy,
  BrainCircuit,
  CheckCircle2,
  Compass
} from 'lucide-react';

export function LandingPage({ onStart, onSelectTopic, onNavigateInterviewLab }) {
  const popularTopics = [
    {
      title: 'React Virtual DOM',
      category: 'Frontend',
      icon: Code2,
      difficulty: 'Medium',
      badge: 'Frontend Core',
      desc: 'Diffing algorithms, reconciliation, fiber tree, and batched browser reflows.'
    },
    {
      title: 'JavaScript Event Loop',
      category: 'Runtime',
      icon: Cpu,
      difficulty: 'Hard',
      badge: 'Runtime Engine',
      desc: 'Call stack, Web APIs, Microtask queue vs Macrotask queue scheduling.'
    },
    {
      title: 'Database B-Tree Indexing',
      category: 'Databases',
      icon: Database,
      difficulty: 'Hard',
      badge: 'Storage & I/O',
      desc: 'Disk page reads, balanced search tree traversal, and leaf-node scans.'
    },
    {
      title: 'CAP Theorem',
      category: 'Distributed Systems',
      icon: Network,
      difficulty: 'Medium',
      badge: 'Architecture',
      desc: 'Trade-offs between linearizable consistency and availability under partition.'
    },
    {
      title: 'Transformer Self-Attention',
      category: 'Deep Learning',
      icon: BrainCircuit,
      difficulty: 'Advanced',
      badge: 'Neural Architectures',
      desc: 'Query, Key, Value matrix projections and scaled dot-product attention weights.'
    },
    {
      title: 'TCP vs UDP',
      category: 'Networking',
      icon: Layers,
      difficulty: 'Easy',
      badge: 'Transport Protocols',
      desc: '3-way handshake, sequence numbers, congestion control vs connectionless datagrams.'
    }
  ];

  const masteryTiers = [
    { rank: 'First-Principles Mastery', score: '89–100%', desc: 'Deep causal mechanics, operational precision, and edge-case mastery.' },
    { rank: 'Mechanics Specialist', score: '71–88%', desc: 'Clear working knowledge with step-by-step causal logic.' },
    { rank: 'Concept Explorer', score: '46–70%', desc: 'Understands high-level analogies but lacks deeper execution mechanics.' },
    { rank: 'Surface Familiarity', score: '0–45%', desc: 'Relies on definitions and buzzwords without underlying mental models.' }
  ];

  return (
    <div className="w-full flex-1 flex flex-col items-center justify-start arena-bg-radial px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      
      {/* Hero Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#3b82f6]/10 border border-[#3b82f6]/20 text-[#60a5fa] text-xs font-semibold mb-6 shadow-sm">
        <Compass className="w-3.5 h-3.5 text-[#3b82f6]" />
        <span>Technical Intelligence & Architectural Practice</span>
      </div>

      {/* Main Hero Header - Ultra High Contrast */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
          Do you <span className="text-[#3b82f6]">actually understand</span> it, or just memorized the buzzwords?
        </h1>
        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
          Test your true mechanical grasp from first principles. Articulate concepts in your own words, uncover hidden blindspots with targeted diagnostics, and master 1,100+ curated technical questions.
        </p>
      </div>

      {/* Dual Product Pillar Showcase Cards */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        
        {/* Pillar 1: Concept Explorer */}
        <div className="bg-[#121520] rounded-2xl p-6 sm:p-7 border border-white/10 shadow-lg flex flex-col justify-between group hover:border-[#3b82f6]/40 transition-all">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#3b82f6]/10 border border-[#3b82f6]/20 flex items-center justify-center text-[#3b82f6]">
                <BrainCircuit className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-mono-code font-semibold px-2.5 py-1 rounded-md bg-[#3b82f6]/10 text-[#60a5fa] border border-[#3b82f6]/20">
                Interactive Diagnostic
              </span>
            </div>

            <h2 className="font-display text-xl sm:text-2xl font-bold text-white mb-2">
              Concept Explorer
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5 font-normal">
              Test whether you actually understand a technical concept from first principles.
            </p>

            <ul className="space-y-2.5 mb-6 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#3b82f6] shrink-0 mt-0.5" />
                <span>Explain in plain language without looking at documentation</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#3b82f6] shrink-0 mt-0.5" />
                <span>Calibrate your confidence against your actual mechanical depth</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#3b82f6] shrink-0 mt-0.5" />
                <span>Solve targeted diagnostic probes and adaptive scenario MCQs</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#3b82f6] shrink-0 mt-0.5" />
                <span>Receive causal mastery scoring and misconception breakdowns</span>
              </li>
            </ul>
          </div>

          <button
            type="button"
            onClick={onStart}
            className="w-full py-3.5 px-5 rounded-xl bg-[#3b82f6] hover:bg-[#2563eb] text-white font-semibold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer group/btn active:scale-[0.99]"
          >
            <span>Start Concept Evaluation</span>
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Pillar 2: Interview Lab */}
        <div className="bg-[#121520] rounded-2xl p-6 sm:p-7 border border-white/10 shadow-lg flex flex-col justify-between group hover:border-[#3b82f6]/40 transition-all">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-slate-800/80 border border-white/10 flex items-center justify-center text-slate-300">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-mono-code font-semibold px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 border border-white/10">
                1,100+ Questions &bull; 22 Topics
              </span>
            </div>

            <h2 className="font-display text-xl sm:text-2xl font-bold text-white mb-2">
              Interview Lab
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5 font-normal">
              Prepare across 22 technical domains with 1,100+ curated interview questions.
            </p>

            <ul className="space-y-2.5 mb-6 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>50 high-value questions per topic across 22 software engineering areas</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Frontend, Backend, Databases, Core CS, APIs, and Version Control</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Mix of fundamentals, debugging, system scenarios, and trade-offs</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>100% free, local, and instantly searchable with zero latency</span>
              </li>
            </ul>
          </div>

          <button
            type="button"
            onClick={onNavigateInterviewLab || onStart}
            className="w-full py-3.5 px-5 rounded-xl bg-[#181c2b] hover:bg-[#1e2336] text-white font-semibold text-sm border border-white/10 hover:border-white/20 shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer group/btn active:scale-[0.99]"
          >
            <span>Explore 22 Interview Topics</span>
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform text-[#3b82f6]" />
          </button>
        </div>

      </div>

      {/* 4-Step Evaluation Process */}
      <div className="w-full max-w-5xl mb-16">
        <div className="text-center mb-8">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-2">
            The Concept Evaluation Process
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm max-w-md mx-auto">
            A structured workflow to evaluate your mental models against rigorous first principles.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#121520] rounded-xl p-5 border border-white/10 hover:border-[#3b82f6]/30 transition-all flex flex-col">
            <div className="w-8 h-8 rounded-lg bg-[#3b82f6]/10 text-[#3b82f6] flex items-center justify-center text-xs font-mono-code font-bold mb-3">
              01
            </div>
            <h3 className="font-display text-sm font-bold text-white mb-1">Articulate</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Write your explanation in plain English without looking up definitions.</p>
          </div>

          <div className="bg-[#121520] rounded-xl p-5 border border-white/10 hover:border-[#3b82f6]/30 transition-all flex flex-col">
            <div className="w-8 h-8 rounded-lg bg-slate-800 text-slate-300 flex items-center justify-center text-xs font-mono-code font-bold mb-3">
              02
            </div>
            <h3 className="font-display text-sm font-bold text-white mb-1">Set Conviction</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Rate your confidence to test for overconfidence traps and blindspots.</p>
          </div>

          <div className="bg-[#121520] rounded-xl p-5 border border-white/10 hover:border-[#3b82f6]/30 transition-all flex flex-col">
            <div className="w-8 h-8 rounded-lg bg-slate-800 text-slate-300 flex items-center justify-center text-xs font-mono-code font-bold mb-3">
              03
            </div>
            <h3 className="font-display text-sm font-bold text-white mb-1">Targeted Probes & MCQs</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Answer targeted follow-ups and scenario-based questions to verify causality.</p>
          </div>

          <div className="bg-[#121520] rounded-xl p-5 border border-white/10 hover:border-[#3b82f6]/30 transition-all flex flex-col">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-xs font-mono-code font-bold mb-3">
              04
            </div>
            <h3 className="font-display text-sm font-bold text-white mb-1">Mastery Diagnostic</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Receive a calibrated score, identified misconceptions, and strength insights.</p>
          </div>
        </div>
      </div>

      {/* Starter Concepts Section */}
      <div className="w-full max-w-5xl mb-16">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <Target className="w-5 h-5 text-[#3b82f6]" />
              <span>Explore Sample Concepts</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">Select a concept below or enter any custom technical topic of your choice.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {popularTopics.map((topicItem) => {
            const IconComponent = topicItem.icon;
            return (
              <div
                key={topicItem.title}
                onClick={() => onSelectTopic(topicItem.title)}
                className="bg-[#121520] rounded-xl p-5 border border-white/10 hover:border-[#3b82f6]/40 cursor-pointer flex flex-col justify-between group transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-8 h-8 rounded-lg bg-[#3b82f6]/10 border border-[#3b82f6]/20 flex items-center justify-center text-[#3b82f6]">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-white/5 border border-white/10 text-slate-300">
                      {topicItem.badge}
                    </span>
                  </div>

                  <h3 className="font-display text-sm sm:text-base font-bold text-white group-hover:text-blue-200 transition-colors mb-1">
                    {topicItem.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                    {topicItem.desc}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-white/5 text-xs">
                  <span className="text-slate-500 font-medium">{topicItem.category}</span>
                  <span className="text-[#3b82f6] font-semibold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    Evaluate ➔
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Understanding Calibration Breakdown */}
      <div className="w-full max-w-5xl bg-[#121520] rounded-2xl p-6 sm:p-7 border border-white/10">
        <div className="flex items-center gap-3 mb-5">
          <Trophy className="w-5 h-5 text-amber-400" />
          <div>
            <h3 className="font-display text-base sm:text-lg font-bold text-white">Understanding Calibration Tiers</h3>
            <p className="text-xs text-slate-400">How your conceptual explanations and responses are graded.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {masteryTiers.map((item) => (
            <div key={item.rank} className="bg-[#090a0f]/80 rounded-xl p-3.5 border border-white/5">
              <div className="font-display text-xs sm:text-sm font-bold text-slate-100 mb-1">{item.rank}</div>
              <div className="text-xs font-bold text-[#3b82f6] mb-1.5 font-mono-code">{item.score}</div>
              <div className="text-[11px] text-slate-400 leading-relaxed">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
