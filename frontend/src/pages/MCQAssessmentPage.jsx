import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  Send
} from 'lucide-react';

const OPTION_LABELS = ['A', 'B', 'C', 'D'];

export function MCQAssessmentPage({
  topic,
  questions = [],
  initialAnswers = {},
  onSubmit,
  onSkip,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState(initialAnswers);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalQuestions = questions.length;
  const currentQuestion = questions[currentIndex] || {};
  const currentQId = currentQuestion.id || `q${currentIndex + 1}`;
  const currentSelectedOption = selectedAnswers[currentQId];
  const hasSelectedCurrent = currentSelectedOption !== undefined && currentSelectedOption !== null;

  const answeredCount = Object.keys(selectedAnswers).filter(
    (k) => selectedAnswers[k] !== undefined && selectedAnswers[k] !== null
  ).length;
  const isAllAnswered = totalQuestions > 0 && answeredCount >= totalQuestions;
  const isLastQuestion = currentIndex === totalQuestions - 1;

  const handleSelectOption = (optionIndex) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQId]: optionIndex,
    }));
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (isSubmitting || !isAllAnswered) return;
    setIsSubmitting(true);

    const formattedAnswers = questions.map((q) => ({
      question_id: q.id,
      selected_option: selectedAnswers[q.id],
    }));

    onSubmit(formattedAnswers);
  };

  // Keyboard shortcut listener for options (1-4 or A-D) and navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

      const key = e.key.toUpperCase();
      let optionIdx = null;

      if (['1', 'A'].includes(key)) optionIdx = 0;
      else if (['2', 'B'].includes(key)) optionIdx = 1;
      else if (['3', 'C'].includes(key)) optionIdx = 2;
      else if (['4', 'D'].includes(key)) optionIdx = 3;

      if (optionIdx !== null && currentQuestion?.options && optionIdx < currentQuestion.options.length) {
        handleSelectOption(optionIdx);
      } else if (e.key === 'ArrowRight' || e.key === 'Enter') {
        if (hasSelectedCurrent && !isLastQuestion) {
          handleNext();
        }
      } else if (e.key === 'ArrowLeft') {
        if (currentIndex > 0) {
          handlePrev();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  const getDifficultyBadge = (difficulty) => {
    const diff = (difficulty || 'medium').toLowerCase();
    if (diff === 'easy') {
      return (
        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
          Easy
        </span>
      );
    }
    if (diff === 'hard') {
      return (
        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-purple-500/10 text-purple-300 border border-purple-500/20">
          Deep Reasoning
        </span>
      );
    }
    return (
      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
        Mechanistic
      </span>
    );
  };

  if (!currentQuestion || !currentQuestion.options) {
    return null;
  }

  const progressPercent = totalQuestions > 0 ? ((currentIndex + 1) / totalQuestions) * 100 : 0;

  return (
    <div className="w-full flex-1 flex flex-col items-center justify-start arena-bg-radial px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="w-full max-w-3xl flex flex-col gap-6">
        
        {/* Top Navigation & Status Bar */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Targeted Diagnostic Assessment</span>
            </div>
          </div>

          <button
            type="button"
            onClick={onSkip}
            className="text-xs text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer font-medium"
          >
            <span>Skip & Finalize Score</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Progress & Stepper Bar */}
        <div className="glass-card rounded-2xl p-4 sm:p-5 flex flex-col gap-3 border border-white/10 shadow-xl">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-white text-sm">
                Question {currentIndex + 1}
              </span>
              <span className="text-slate-500">of</span>
              <span className="text-slate-400 font-medium">{totalQuestions}</span>
            </div>
            
            <div className="flex items-center gap-2 font-mono-code text-[11px] text-slate-400">
              <span>{answeredCount}/{totalQuestions} Answered</span>
            </div>
          </div>

          {/* Progress Bar Track */}
          <div className="w-full h-2 rounded-full bg-slate-900/80 border border-white/5 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 transition-all duration-300 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Question & Options Card */}
        <div className="glass-card rounded-2xl p-6 sm:p-8 flex flex-col gap-6 border border-white/10 shadow-2xl relative overflow-hidden">
          
          {/* Metadata Row */}
          <div className="flex items-center justify-between flex-wrap gap-2 pb-2 border-b border-white/5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-semibold text-slate-400">
                Concept: <strong className="text-white">{currentQuestion.concept || topic}</strong>
              </span>
            </div>
            <div>
              {getDifficultyBadge(currentQuestion.difficulty)}
            </div>
          </div>

          {/* Question Text */}
          <div className="bg-slate-900/90 rounded-2xl p-5 sm:p-7 border border-white/10 shadow-inner">
            <h2 className="font-display text-lg sm:text-xl lg:text-2xl font-bold text-white leading-relaxed tracking-tight">
              {currentQuestion.question}
            </h2>
          </div>

          {/* Options Grid */}
          <div className="flex flex-col gap-3">
            {currentQuestion.options.map((optionText, idx) => {
              const isSelected = currentSelectedOption === idx;
              const label = OPTION_LABELS[idx] || `${idx + 1}`;

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full p-4 sm:p-4.5 rounded-xl border text-left transition-all flex items-start gap-3.5 cursor-pointer group ${
                    isSelected
                      ? 'bg-gradient-to-r from-indigo-950/80 to-purple-950/60 border-indigo-500 text-white ring-2 ring-indigo-500/30 shadow-lg shadow-indigo-500/10'
                      : 'bg-slate-900/70 hover:bg-slate-850 border-white/5 hover:border-white/15 text-slate-300'
                  }`}
                >
                  {/* Option Letter Pill */}
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 transition-all mt-0.5 ${
                      isSelected
                        ? 'bg-indigo-500 text-white shadow-md'
                        : 'bg-slate-800 text-slate-400 group-hover:bg-slate-700 group-hover:text-white'
                    }`}
                  >
                    {label}
                  </div>

                  {/* Option Text */}
                  <span className={`text-sm sm:text-base leading-relaxed flex-1 ${isSelected ? 'text-white font-medium' : 'text-slate-300'}`}>
                    {optionText}
                  </span>

                  {/* Radio Indicator */}
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 border transition-all mt-1 ${
                      isSelected
                        ? 'border-cyan-400 bg-cyan-400/20 text-cyan-300'
                        : 'border-slate-700 bg-slate-900/50'
                    }`}
                  >
                    {isSelected && <div className="w-2 h-2 rounded-full bg-cyan-300" />}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Completion Banner on Final Question */}
          {isLastQuestion && isAllAnswered && (
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center justify-between gap-3 animate-fade-in">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-semibold">Assessment Complete &bull; {totalQuestions} of {totalQuestions} questions answered</span>
              </div>
              <span className="text-[11px] text-emerald-400/80 hidden sm:inline">Ready to evaluate</span>
            </div>
          )}

          {/* Action Row */}
          <div className="flex items-center justify-between gap-4 pt-4 border-t border-white/5">
            {/* Previous Button */}
            <button
              type="button"
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                currentIndex > 0
                  ? 'bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 cursor-pointer'
                  : 'opacity-40 bg-slate-900 text-slate-600 cursor-not-allowed border border-white/5'
              }`}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </button>

            {/* Next or Submit Button */}
            {!isLastQuestion ? (
              <button
                type="button"
                onClick={handleNext}
                disabled={!hasSelectedCurrent}
                className={`px-6 py-2.5 rounded-xl font-display text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
                  hasSelectedCurrent
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/20 hover:scale-105 active:scale-95 cursor-pointer'
                    : 'bg-slate-800/50 text-slate-500 cursor-not-allowed border border-white/5'
                }`}
              >
                <span>Next Question</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!isAllAnswered || isSubmitting}
                className={`px-8 py-3 rounded-xl font-display text-sm font-bold flex items-center gap-2 transition-all shadow-xl ${
                  isAllAnswered && !isSubmitting
                    ? 'bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 text-white shadow-indigo-500/30 hover:scale-105 active:scale-95 cursor-pointer'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-white/5'
                }`}
              >
                <span>{isSubmitting ? 'Evaluating Assessment...' : 'Submit Assessment'}</span>
                <Send className="w-4 h-4" />
              </button>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
