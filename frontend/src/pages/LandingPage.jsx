import React from 'react';
import { 
  Sparkles, 
  BrainCircuit, 
  Trophy, 
  Zap, 
  ShieldCheck, 
  ArrowRight, 
  Layers, 
  Target, 
  Code2, 
  Cpu, 
  Database, 
  Network,
  BookOpen
} from 'lucide-react';

export function LandingPage({ onStart, onSelectTopic }) {
  const popularTopics = [
    {
      title: 'React Virtual DOM',
      category: 'Frontend',
      icon: Code2,
      difficulty: 'Medium',
      color: 'from-cyan-500 to-blue-500',
      badge: 'Popular',
      desc: 'Diffing algorithms, reconciliation, and batched browser reflows.'
    },
    {
      title: 'JavaScript Event Loop',
      category: 'Runtime',
      icon: Cpu,
      difficulty: 'Hard',
      color: 'from-amber-500 to-orange-500',
      badge: 'Core Concept',
      desc: 'Call stack, Web APIs, Microtasks vs Macrotasks execution.'
    },
    {
      title: 'Database B-Tree Indexing',
      category: 'Databases',
      icon: Database,
      difficulty: 'Hard',
      color: 'from-emerald-500 to-teal-500',
      badge: 'Essential',
      desc: 'Disk I/O minimization, logarithmic traversal, and leaf node links.'
    },
    {
      title: 'CAP Theorem',
      category: 'Distributed',
      icon: Network,
      difficulty: 'Medium',
      color: 'from-purple-500 to-indigo-500',
      badge: 'Classic',
      desc: 'Consistency vs Availability trade-offs during network partitions.'
    },
    {
      title: 'Transformer Self-Attention',
      category: 'Deep Learning',
      icon: BookOpen,
      difficulty: 'Advanced',
      color: 'from-pink-500 to-rose-500',
      badge: 'Key Architecture',
      desc: 'Query, Key, Value vectors and scaled dot-product matrix multiplication.'
    },
    {
      title: 'TCP vs UDP',
      category: 'Networking',
      icon: Layers,
      difficulty: 'Easy',
      color: 'from-blue-500 to-indigo-500',
      badge: 'Fundamentals',
      desc: '3-way handshake, packet loss recovery, and connection overhead.'
    }
  ];

  const masteryTiers = [
    { rank: '👑 First-Principles Mastery', score: '89–100%', desc: 'Deep causal mechanics & edge case mastery.' },
    { rank: '⚔️ Mechanics Specialist', score: '71–88%', desc: 'Clear working knowledge with step-by-step logic.' },
    { rank: '🛡️ Concept Explorer', score: '46–70%', desc: 'Understands basics but relies on high-level analogies.' },
    { rank: '🔍 Surface Familiarity', score: '0–45%', desc: 'Definitions and buzzwords without operational mechanisms.' }
  ];

  return (
    <div className="w-full flex-1 flex flex-col items-center justify-start arena-bg-radial px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      
      {/* Hero Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-6 animate-float shadow-lg shadow-indigo-500/10">
        <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
        <span>Understanding Intelligence Platform</span>
      </div>

      {/* Main Hero Header */}
      <div className="text-center max-w-4xl mx-auto mb-10">
        <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 leading-tight">
          Do you <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-400">actually understand</span> it, or just memorized the buzzwords?
        </h1>
        <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Clarity tests your true mechanical grasp from first principles. Explain any concept in your own words, verify your depth against targeted follow-ups, and calibrate your mental models.
        </p>
      </div>

      {/* Primary CTA Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-16">
        <button
          type="button"
          onClick={onStart}
          className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 text-white font-display text-base sm:text-lg font-bold shadow-xl shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 cursor-pointer group"
        >
          <Sparkles className="w-5 h-5 text-cyan-200 group-hover:rotate-12 transition-transform" />
          <span>Start Understanding Test</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Step Walkthrough Cards */}
      <div className="w-full max-w-5xl mb-20">
        <div className="text-center mb-8">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-2">How It Works</h2>
          <p className="text-slate-400 text-sm">A fast, structured process to evaluate and upgrade your conceptual models.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="glass-card rounded-2xl p-5 relative overflow-hidden group hover:border-indigo-500/40 transition-all">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold mb-4">
              01
            </div>
            <h3 className="font-display text-base font-bold text-white mb-1">Articulate</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Write your mental model in plain English without looking at documentation.</p>
          </div>

          <div className="glass-card rounded-2xl p-5 relative overflow-hidden group hover:border-cyan-500/40 transition-all">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold mb-4">
              02
            </div>
            <h3 className="font-display text-base font-bold text-white mb-1">Set Conviction</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Rate your confidence to test for blindspots or overconfidence traps.</p>
          </div>

          <div className="glass-card rounded-2xl p-5 relative overflow-hidden group hover:border-amber-500/40 transition-all">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold mb-4">
              03
            </div>
            <h3 className="font-display text-base font-bold text-white mb-1">Clarify Mechanism</h3>
            <p className="text-xs text-slate-400 leading-relaxed">If needed, answer 1 targeted follow-up question to verify exact causality.</p>
          </div>

          <div className="glass-card rounded-2xl p-5 relative overflow-hidden group hover:border-emerald-500/40 transition-all">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold mb-4">
              04
            </div>
            <h3 className="font-display text-base font-bold text-white mb-1">Mastery Report</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Receive calibrated scores, misconception breakdowns, and strength insights.</p>
          </div>
        </div>
      </div>

      {/* Popular Concepts Section */}
      <div className="w-full max-w-5xl mb-16">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <Target className="w-5 h-5 text-indigo-400" />
              <span>Select a Topic to Test</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">Pick a concept below or enter any custom topic of your choice.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {popularTopics.map((topicItem) => {
            const IconComponent = topicItem.icon;
            return (
              <div
                key={topicItem.title}
                onClick={() => onSelectTopic(topicItem.title)}
                className="glass-card glass-card-hover rounded-2xl p-5 cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${topicItem.color} flex items-center justify-center text-white shadow-md`}>
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/5 border border-white/10 text-slate-300">
                      {topicItem.badge}
                    </span>
                  </div>

                  <h3 className="font-display text-base font-bold text-white group-hover:text-cyan-300 transition-colors mb-1">
                    {topicItem.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                    {topicItem.desc}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-white/5 text-xs">
                  <span className="text-slate-500 font-medium">{topicItem.category}</span>
                  <span className="text-indigo-400 font-semibold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    Test Topic ➔
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mastery Levels Showcase */}
      <div className="w-full max-w-5xl glass-card rounded-2xl p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-6">
          <Trophy className="w-6 h-6 text-amber-400" />
          <div>
            <h3 className="font-display text-lg font-bold text-white">Understanding Levels & Calibration System</h3>
            <p className="text-xs text-slate-400">How your mental models are evaluated and scored.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {masteryTiers.map((item) => (
            <div key={item.rank} className="bg-slate-900/60 rounded-xl p-4 border border-white/5">
              <div className="font-display text-sm font-bold text-slate-100 mb-1">{item.rank}</div>
              <div className="text-xs font-bold text-indigo-400 mb-2 font-mono-code">{item.score}</div>
              <div className="text-xs text-slate-400 leading-relaxed">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
