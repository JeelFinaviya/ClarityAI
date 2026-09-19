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
  TOPIC_GROUPS, 
  getQuestionsForTopic, 
  getCategoriesForTopic 
} from '../data/interviewQuestions';

export function InterviewLabPage({ onSelectTopicForExplorer }) {
  const [selectedTopicId, setSelectedTopicId] = useState('react');
  const [selectedGroup, setSelectedGroup] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [expandedIds, setExpandedIds] = useState(new Set([1, 2, 3])); // First 3 expanded by default
  const [copiedId, setCopiedId] = useState(null);

  const handleSelectTopic = (topicId) => {
    setSelectedTopicId(topicId);
    setSelectedCategory('All');
    setSearchQuery('');
    setSelectedDifficulty('All');
    setExpandedIds(new Set([1, 2, 3]));
  };

  // Active topic object
  const activeTopic = useMemo(() => {
    return INTERVIEW_TOPICS.find(t => t.id === selectedTopicId) || INTERVIEW_TOPICS[0];
  }, [selectedTopicId]);

  // Filter topics by domain track (All, Frontend, Backend, Databases, Core CS, APIs & Tools)
  const visibleTopics = useMemo(() => {
    if (selectedGroup === 'All') return INTERVIEW_TOPICS;
    return INTERVIEW_TOPICS.filter(t => t.group === selectedGroup);
  }, [selectedGroup]);

  // Questions for active topic
  const topicQuestions = useMemo(() => {
    return getQuestionsForTopic(selectedTopicId);
  }, [selectedTopicId]);

  // Dynamic categories for current topic
  const topicCategories = useMemo(() => {
    return getCategoriesForTopic(selectedTopicId);
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
      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchQuestion = q.question.toLowerCase().includes(query);
        const matchExplanation = q.explanation.toLowerCase().includes(query);
        const matchCategory = q.category?.toLowerCase().includes(query);
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

  const handleCopy = (questionItem) => {
    const textToCopy = `Question: ${questionItem.question}\n\nCategory: ${questionItem.category} | Difficulty: ${questionItem.difficulty}\n\nExplanation:\n${questionItem.explanation}`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(questionItem.id);
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
        return 'text-[#a3e635] bg-[#a3e635]/10 border-[#a3e635]/25';
      case 'Medium':
        return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
      case 'Hard':
        return 'text-rose-400 bg-rose-500/10 border-rose-500/20';
      default:
        return 'text-zinc-400 bg-zinc-500/10 border-zinc-500/20';
    }
  };

  const formatNumber = (num) => {
    return num < 10 ? `0${num}` : `${num}`;
  };

  return (
    <div className="w-full flex-1 flex flex-col items-center justify-start px-4 sm:px-6 lg:px-8 py-8 sm:py-12 arena-bg-radial">
      <div className="w-full max-w-5xl mx-auto flex flex-col space-y-8">
        
        {/* Main Header Block */}
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ff5722]/10 border border-[#ff5722]/25 text-[#ff7a50] text-xs font-semibold tracking-wider uppercase shadow-sm">
            <BookOpen className="w-3.5 h-3.5 text-[#a3e635]" />
            <span>Technical Interview Library</span>
          </div>
          
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            Technical Interview Library
          </h1>
          
          <p className="text-sm sm:text-base text-zinc-300 max-w-2xl leading-relaxed">
            1,100+ high-value questions across modern development, databases, APIs, and core computer science.
          </p>
        </div>

        {/* Topic Selector Hub */}
        <div className="flex flex-col space-y-4 bg-[#121624] p-4 sm:p-5 rounded-2xl border border-white/10 shadow-lg">
          
          {/* Domain Track Navigation Tabs */}
          <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-3.5 flex-wrap">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-400">
              <Layers className="w-3.5 h-3.5 text-[#ff5722]" />
              <span>Domain Track:</span>
            </div>

            <div className="flex items-center gap-1.5 flex-wrap">
              {TOPIC_GROUPS.map((group) => {
                const isActive = selectedGroup === group;
                return (
                  <button
                    key={group}
                    type="button"
                    onClick={() => setSelectedGroup(group)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-r from-[#ff5722] to-[#f97316] text-white font-semibold shadow-sm'
                        : 'bg-[#07090e]/60 text-zinc-400 hover:text-zinc-200 hover:bg-[#181d2e] border border-white/5'
                    }`}
                  >
                    {group}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 22 Topic Chips Grid */}
          <div className="flex items-center gap-2 flex-wrap pt-0.5">
            {visibleTopics.map((topic) => {
              const isSelected = topic.id === selectedTopicId;
              return (
                <button
                  key={topic.id}
                  type="button"
                  onClick={() => handleSelectTopic(topic.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap active:scale-95 ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#ff5722] to-[#f97316] text-white shadow-lg shadow-orange-500/25 border border-orange-400/50 scale-[1.02]'
                      : 'bg-[#07090e]/70 text-zinc-300 hover:text-white hover:bg-[#181d2e] border border-white/10 hover:border-white/20'
                  }`}
                  title={`${topic.name}: ${topic.description}`}
                >
                  <span>{topic.shortName || topic.name}</span>
                  <span className={`px-1.5 py-0.2 rounded-md text-[10px] font-mono-code ${
                    isSelected ? 'bg-orange-700/60 text-orange-100' : 'bg-[#181d2e] text-[#a3e635]'
                  }`}>
                    {topic.questionCount}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Topic Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 sm:p-5 rounded-2xl bg-[#161b2c] border border-[#ff5722]/30">
          <div className="flex flex-col space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono-code font-semibold text-[#ff7a50] uppercase tracking-wider">
                {activeTopic.group} Track
              </span>
            </div>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-white">
              50 High-Value {activeTopic.name} Questions
            </h2>
            <p className="text-xs sm:text-sm text-zinc-300">
              {activeTopic.description} &bull; Curated for technical rounds, online assessments, and internships.
            </p>
          </div>
        </div>

        {/* Search & Dynamic Category Filter Suite */}
        <div className="flex flex-col space-y-4 bg-[#121624] p-4 sm:p-5 rounded-2xl border border-white/10 shadow-lg">
          
          {/* Search Input Row */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Search ${activeTopic.name} questions by keyword, concept, or scenario...`}
                className="w-full bg-[#07090e] text-white pl-10 pr-9 py-2.5 rounded-xl border border-white/10 text-sm focus:outline-none focus:border-[#ff5722]/80 focus:ring-1 focus:ring-[#ff5722]/50 placeholder:text-zinc-500 transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white p-0.5 rounded cursor-pointer"
                  title="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Expand / Collapse All Controls */}
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button
                type="button"
                onClick={expandAll}
                className="px-3 py-2 text-xs font-medium text-zinc-300 hover:text-white bg-[#181d2e] hover:bg-[#1f253a] rounded-lg border border-white/10 transition-all cursor-pointer whitespace-nowrap"
              >
                Expand All
              </button>
              <button
                type="button"
                onClick={collapseAll}
                className="px-3 py-2 text-xs font-medium text-zinc-300 hover:text-white bg-[#181d2e] hover:bg-[#1f253a] rounded-lg border border-white/10 transition-all cursor-pointer whitespace-nowrap"
              >
                Collapse All
              </button>
            </div>
          </div>

          {/* Dynamic Category Filter Pills */}
          <div className="flex flex-col space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-zinc-400 flex items-center gap-1.5">
                <Filter className="w-3 h-3 text-[#ff5722]" />
                Categories:
              </span>
              <span className="text-xs text-zinc-400 font-mono-code">
                Showing {filteredQuestions.length} of {topicQuestions.length}
              </span>
            </div>

            <div className="flex items-center gap-1.5 flex-wrap">
              {topicCategories.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-r from-[#ff5722] to-[#f97316] text-white font-semibold shadow-sm shadow-orange-500/30'
                        : 'bg-[#07090e]/60 text-zinc-400 hover:text-zinc-200 hover:bg-[#181d2e] border border-white/5'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Difficulty Filter Chips */}
          <div className="flex items-center gap-2 pt-2 border-t border-white/5 flex-wrap">
            <span className="text-xs font-medium text-zinc-400">Difficulty:</span>
            {['All', 'Easy', 'Medium', 'Hard'].map((diff) => {
              const isActive = selectedDifficulty === diff;
              return (
                <button
                  key={diff}
                  type="button"
                  onClick={() => setSelectedDifficulty(diff)}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all cursor-pointer ${
                    isActive
                      ? 'bg-zinc-200 text-zinc-900 font-semibold shadow-sm'
                      : 'bg-[#07090e]/40 text-zinc-400 hover:text-zinc-200 hover:bg-[#181d2e] border border-white/5'
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
                className="ml-auto text-xs text-[#ff7a50] hover:text-[#ff5722] underline cursor-pointer"
              >
                Reset Filters
              </button>
            )}
          </div>
        </div>

        {/* Questions List */}
        {filteredQuestions.length === 0 ? (
          <div className="w-full py-16 px-4 flex flex-col items-center justify-center text-center bg-[#121624] rounded-2xl border border-white/5">
            <Layers className="w-10 h-10 text-zinc-600 mb-3" />
            <h3 className="text-lg font-semibold text-zinc-200 mb-1">No questions match your filter</h3>
            <p className="text-sm text-zinc-400 max-w-sm mb-4">
              Try adjusting your search keyword or switching category and difficulty filters.
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="px-4 py-2 bg-gradient-to-r from-[#ff5722] to-[#f97316] hover:from-[#ff6b3a] hover:to-[#ff5722] text-white text-xs font-semibold rounded-xl transition-all shadow-md cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="w-full flex flex-col space-y-3.5">
            {filteredQuestions.map((q) => {
              const isExpanded = expandedIds.has(q.id);
              const isCopied = copiedId === q.id;

              return (
                <div
                  key={q.id}
                  className="w-full bg-[#121624] rounded-2xl border border-white/10 hover:border-[#ff5722]/35 transition-all duration-200 overflow-hidden shadow-md group"
                >
                  {/* Card Header & Question Clickable Row */}
                  <div
                    onClick={() => toggleExpand(q.id)}
                    className="p-4 sm:p-5 flex items-start justify-between gap-3 sm:gap-4 cursor-pointer select-none"
                  >
                    {/* Left: Number + Question */}
                    <div className="flex items-start gap-3 sm:gap-4 flex-1 min-w-0">
                      <span className="font-mono-code text-xs sm:text-sm font-bold text-[#ff7a50] bg-[#ff5722]/10 border border-[#ff5722]/20 px-2 sm:px-2.5 py-1 rounded-lg shrink-0">
                        {formatNumber(q.id)}
                      </span>

                      <div className="flex flex-col space-y-1.5 flex-1 min-w-0">
                        <h3 className="text-sm sm:text-base font-semibold text-white group-hover:text-orange-200 transition-colors leading-snug">
                          {q.question}
                        </h3>

                        {/* Badges on mobile/collapsed */}
                        <div className="flex items-center gap-2 flex-wrap pt-0.5">
                          {q.category && (
                            <span className="text-[11px] font-medium px-2 py-0.5 rounded-full border text-[#ff7a50] bg-[#ff5722]/10 border-[#ff5722]/20">
                              {q.category}
                            </span>
                          )}
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
                        className="p-1.5 text-zinc-400 hover:text-white hover:bg-[#181d2e] rounded-lg border border-transparent hover:border-white/10 transition-all cursor-pointer"
                        title="Copy question and explanation"
                      >
                        {isCopied ? (
                          <Check className="w-4 h-4 text-[#a3e635]" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>

                      <div className="p-1 text-zinc-400 group-hover:text-zinc-200 transition-colors">
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
                    <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 border-t border-white/5 bg-[#07090e]/50">
                      <div className="mt-3.5 p-3.5 sm:p-4 rounded-xl bg-[#0a0d16] border-l-2 border-[#ff5722] text-xs sm:text-sm text-zinc-300 leading-relaxed">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 font-mono-code">
                            Key Interview Explanation
                          </span>
                          {onSelectTopicForExplorer && (
                            <button
                              type="button"
                              onClick={() => onSelectTopicForExplorer(`${activeTopic.name}: ${q.question}`)}
                              className="text-[11px] text-[#ff7a50] hover:text-[#ff5722] font-medium flex items-center gap-1 cursor-pointer transition-colors"
                              title="Deep dive into this concept with ClarityAI"
                            >
                              <span>Explore in Concept Explorer</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                        <p className="text-zinc-200">
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
          <p className="text-xs text-zinc-400">
            Interview Lab provides structured technical interview preparation across 22 technologies (1,100 curated questions).
          </p>
        </div>

      </div>
    </div>
  );
}
