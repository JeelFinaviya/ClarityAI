import React, { useState, useMemo } from 'react';
import { 
  Search, 
  X, 
  BookOpen, 
  Check, 
  Copy, 
  Filter, 
  ChevronDown, 
  ChevronUp,
  Layers,
  ArrowRight
} from 'lucide-react';
import { 
  INTERVIEW_TOPICS, 
  CATEGORIES, 
  REACT_QUESTIONS 
} from '../data/interviewQuestions';

export function InterviewLabPage({ onSelectTopicForExplorer }) {
  const [selectedTopicId, setSelectedTopicId] = useState('react');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [expandedIds, setExpandedIds] = useState(new Set([1, 2, 3])); // First 3 expanded by default for scanning
  const [copiedId, setCopiedId] = useState(null);

  // Questions for current topic (React has 50 questions)
  const topicQuestions = useMemo(() => {
    if (selectedTopicId === 'react') {
      return REACT_QUESTIONS;
    }
    return [];
  }, [selectedTopicId]);

  // Filtered questions
  const filteredQuestions = useMemo(() => {
    return topicQuestions.filter(q => {
      // Category filter
      if (selectedCategory !== 'All' && q.category !== selectedCategory) {
        return false;
      }
      // Difficulty filter
      if (selectedDifficulty !== 'All' && q.difficulty !== selectedDifficulty) {
        return false;
      }
      // Search query filter (matches question or explanation)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchQuestion = q.question.toLowerCase().includes(query);
        const matchExplanation = q.explanation.toLowerCase().includes(query);
        const matchCategory = q.category.toLowerCase().includes(query);
        return matchQuestion || matchExplanation || matchCategory;
      }
      return true;
    });
  }, [topicQuestions, selectedCategory, selectedDifficulty, searchQuery]);

  const toggleExpand = (id) => {
    setExpandedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const expandAll = () => {
    setExpandedIds(new Set(filteredQuestions.map(q => q.id)));
  };

  const collapseAll = () => {
    setExpandedIds(new Set());
  };

  const handleCopy = (q) => {
    const textToCopy = `Q: ${q.question}\n\n${q.explanation}`;
    navigator.clipboard?.writeText(textToCopy);
    setCopiedId(q.id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedDifficulty('All');
  };

  const getDifficultyBadgeColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy':
        return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      case 'Medium':
        return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
      case 'Hard':
        return 'text-rose-400 bg-rose-500/10 border-rose-500/20';
      default:
        return 'text-slate-400 bg-slate-500/10 border-slate-500/20';
    }
  };

  const getCategoryBadgeColor = (category) => {
    switch (category) {
      case 'Fundamentals':
        return 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20';
      case 'Rendering':
        return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
      case 'Hooks':
        return 'text-purple-400 bg-purple-500/10 border-purple-500/20';
      case 'State':
        return 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20';
      case 'Performance':
        return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      case 'Architecture':
        return 'text-pink-400 bg-pink-500/10 border-pink-500/20';
      case 'Advanced':
        return 'text-orange-400 bg-orange-500/10 border-orange-500/20';
      default:
        return 'text-slate-400 bg-slate-500/10 border-slate-500/20';
    }
  };

  const formatNumber = (num) => {
    return num < 10 ? `0${num}` : `${num}`;
  };

  return (
    <div className="w-full flex-1 flex flex-col items-center justify-start px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="w-full max-w-5xl mx-auto flex flex-col space-y-8">
        
        {/* Header Block */}
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-indigo-300 text-xs font-semibold tracking-wider uppercase">
            <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
            <span>Interview Lab</span>
          </div>
          
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            50 High-Value React Interview Questions
          </h1>
          
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
            Prepare for internships, technical rounds, and online assessments with concise, mechanism-focused explanations.
          </p>
        </div>

        {/* Extensible Topic Selector Tabs */}
        <div className="w-full border-b border-white/10 pb-2">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {INTERVIEW_TOPICS.map((topic) => {
              const isSelected = topic.id === selectedTopicId;
              return (
                <button
                  key={topic.id}
                  type="button"
                  onClick={() => topic.active && setSelectedTopicId(topic.id)}
                  disabled={!topic.active}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25 border border-indigo-400/40'
                      : topic.active
                      ? 'bg-slate-900/60 text-slate-300 hover:text-white hover:bg-slate-800/80 border border-white/5'
                      : 'bg-slate-950/40 text-slate-400 border border-white/5 cursor-not-allowed opacity-60'
                  }`}
                >
                  <span>{topic.name}</span>
                  {topic.active ? (
                    <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                      isSelected ? 'bg-indigo-700 text-indigo-100' : 'bg-slate-800 text-cyan-300'
                    }`}>
                      {topic.questionCount}
                    </span>
                  ) : (
                    <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-slate-900 text-slate-400 border border-white/5">
                      {topic.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="flex flex-col space-y-4 bg-slate-900/50 p-4 sm:p-5 rounded-2xl border border-white/10 shadow-lg backdrop-blur-sm">
          
          {/* Search Input Row */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search questions by keyword, hook, lifecycle, or concept..."
                className="w-full bg-[#0b0f19] text-white pl-10 pr-9 py-2.5 rounded-xl border border-white/10 text-sm focus:outline-none focus:border-indigo-500/80 focus:ring-1 focus:ring-indigo-500/50 placeholder:text-slate-400 transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-0.5 rounded cursor-pointer"
                  title="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Quick Expand / Collapse All Controls */}
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button
                type="button"
                onClick={expandAll}
                className="px-3 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 rounded-lg border border-white/5 transition-all cursor-pointer whitespace-nowrap"
              >
                Expand All
              </button>
              <button
                type="button"
                onClick={collapseAll}
                className="px-3 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 rounded-lg border border-white/5 transition-all cursor-pointer whitespace-nowrap"
              >
                Collapse All
              </button>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-col space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-400 flex items-center gap-1.5">
                <Filter className="w-3 h-3 text-indigo-400" />
                Categories:
              </span>
              <span className="text-xs text-slate-400 font-mono-code">
                Showing {filteredQuestions.length} of {topicQuestions.length}
              </span>
            </div>

            <div className="flex items-center gap-1.5 flex-wrap">
              {CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                      isActive
                        ? 'bg-indigo-600 text-white font-semibold shadow-sm shadow-indigo-500/30'
                        : 'bg-slate-950/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800/80 border border-white/5'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Difficulty Filter Pills */}
          <div className="flex items-center gap-2 pt-1 border-t border-white/5 flex-wrap">
            <span className="text-xs font-medium text-slate-400">Difficulty:</span>
            {['All', 'Easy', 'Medium', 'Hard'].map((diff) => {
              const isActive = selectedDifficulty === diff;
              return (
                <button
                  key={diff}
                  type="button"
                  onClick={() => setSelectedDifficulty(diff)}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all cursor-pointer ${
                    isActive
                      ? 'bg-slate-200 text-slate-900 font-semibold shadow-sm'
                      : 'bg-slate-950/40 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-white/5'
                  }`}
                >
                  {diff}
                </button>
              );
            })}

            {(selectedCategory !== 'All' || selectedDifficulty !== 'All' || searchQuery) && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="ml-auto text-xs text-indigo-400 hover:text-indigo-300 underline cursor-pointer"
              >
                Reset Filters
              </button>
            )}
          </div>
        </div>

        {/* Questions List */}
        {filteredQuestions.length === 0 ? (
          <div className="w-full py-16 px-4 flex flex-col items-center justify-center text-center bg-slate-900/30 rounded-2xl border border-white/5">
            <Layers className="w-10 h-10 text-slate-600 mb-3" />
            <h3 className="text-lg font-semibold text-slate-200 mb-1">No questions match your filter</h3>
            <p className="text-sm text-slate-400 max-w-sm mb-4">
              Try adjusting your search keyword or switching category and difficulty filters.
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl transition-all shadow-md cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="w-full flex flex-col space-y-4">
            {filteredQuestions.map((q) => {
              const isExpanded = expandedIds.has(q.id);
              const isCopied = copiedId === q.id;

              return (
                <div
                  key={q.id}
                  className="w-full bg-[#0b0f19] rounded-2xl border border-white/10 hover:border-indigo-500/30 transition-all duration-200 overflow-hidden shadow-md group"
                >
                  {/* Card Header & Question Clickable Row */}
                  <div
                    onClick={() => toggleExpand(q.id)}
                    className="p-4 sm:p-5 flex items-start justify-between gap-3 sm:gap-4 cursor-pointer select-none"
                  >
                    {/* Left: Number + Question */}
                    <div className="flex items-start gap-3 sm:gap-4 flex-1 min-w-0">
                      <span className="font-mono-code text-xs sm:text-sm font-bold text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 sm:px-2.5 py-1 rounded-lg shrink-0">
                        {formatNumber(q.id)}
                      </span>

                      <div className="flex flex-col space-y-1.5 flex-1 min-w-0">
                        <h2 className="text-sm sm:text-base font-semibold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                          {q.question}
                        </h2>

                        {/* Badges on mobile/collapsed */}
                        <div className="flex items-center gap-2 flex-wrap pt-0.5">
                          <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full border ${getCategoryBadgeColor(q.category)}`}>
                            {q.category}
                          </span>
                          <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full border ${getDifficultyBadgeColor(q.difficulty)}`}>
                            {q.difficulty}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right: Expand Toggle Icon & Copy Button */}
                    <div className="flex items-center gap-1.5 shrink-0 pt-0.5">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopy(q);
                        }}
                        className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg border border-transparent hover:border-white/10 transition-all cursor-pointer"
                        title="Copy question and answer"
                      >
                        {isCopied ? (
                          <Check className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>

                      <div className="p-1 text-slate-400 group-hover:text-slate-200 transition-colors">
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Expanded Content Section */}
                  {isExpanded && (
                    <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 border-t border-white/5 bg-slate-950/40">
                      <div className="mt-3.5 p-3.5 sm:p-4 rounded-xl bg-slate-900/70 border border-white/5 text-xs sm:text-sm text-slate-300 leading-relaxed">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 font-mono-code">
                            Key Interview Explanation
                          </span>
                          {onSelectTopicForExplorer && (
                            <button
                              type="button"
                              onClick={() => onSelectTopicForExplorer(`React: ${q.question}`)}
                              className="text-[11px] text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1 cursor-pointer transition-colors"
                              title="Deep dive in Concept Explorer"
                            >
                              <span>Explore in Clarity</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                        <p className="text-slate-200">
                          {q.explanation}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Footer Note */}
        <div className="w-full text-center pt-6 border-t border-white/10">
          <p className="text-xs text-slate-400">
            Interview Lab provides structured, first-principles interview review for technical candidates.
          </p>
        </div>

      </div>
    </div>
  );
}
