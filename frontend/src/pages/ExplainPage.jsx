import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, AlertCircle, CheckCircle2, CornerDownLeft, Sparkles } from 'lucide-react';

const TOPIC_SUGGESTIONS = [
  'Binary Search',
  'React Virtual DOM',
  'Transformer Self-Attention',
  'Distributed Consensus',
  'Photosynthesis',
];

export function ExplainPage({
  topic,
  setTopic,
  explanation,
  setExplanation,
  onContinue,
  onBack,
}) {
  const [errors, setErrors] = useState({});

  const charCount = explanation.length;
  const minChars = 30;
  const maxChars = 5000;
  const isCharCountValid = charCount >= minChars && charCount <= maxChars;

  const validate = () => {
    const newErrors = {};
    const trimmedTopic = topic.trim();
    const trimmedExplanation = explanation.trim();

    if (!trimmedTopic) {
      newErrors.topic = 'Please enter a topic or concept.';
    } else if (trimmedTopic.length < 2) {
      newErrors.topic = 'Topic must contain at least 2 characters.';
    } else if (trimmedTopic.length > 255) {
      newErrors.topic = 'Topic cannot exceed 255 characters.';
    }

    if (!trimmedExplanation) {
      newErrors.explanation = 'Please provide an explanation in your own words.';
    } else if (trimmedExplanation.length < minChars) {
      newErrors.explanation = `Explanation must be at least ${minChars} characters (currently ${trimmedExplanation.length} characters).`;
    } else if (trimmedExplanation.length > maxChars) {
      newErrors.explanation = `Explanation cannot exceed ${maxChars} characters (currently ${trimmedExplanation.length} characters).`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleTopicChange = (e) => {
    setTopic(e.target.value);
    if (errors.topic) {
      setErrors((prev) => ({ ...prev, topic: '' }));
    }
  };

  const handleExplanationChange = (e) => {
    setExplanation(e.target.value);
    if (errors.explanation) {
      setErrors((prev) => ({ ...prev, explanation: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onContinue();
    }
  };

  const handleKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12 animate-fadeIn text-left">
      {/* Top Breadcrumb & Step */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={onBack}
          type="button"
          className="inline-flex items-center gap-2 text-xs font-medium text-neutral-400 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Home</span>
        </button>
        <span className="text-xs font-mono text-amber-400 tracking-wider uppercase flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_6px_rgba(245,158,11,0.8)]"></span>
          Step 1 &bull; Articulation
        </span>
      </div>

      {/* Heading & Subheading */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-3 font-sans">
          Articulate your understanding.
        </h1>
        <p className="text-sm sm:text-base text-neutral-400 font-normal leading-relaxed">
          Strip away buzzwords. Explain how the underlying process works step-by-step from first principles.
        </p>
      </div>

      {/* Quick Topic Selector */}
      <div className="mb-6 flex flex-wrap items-center gap-1.5">
        <span className="text-[11px] font-mono text-neutral-400 mr-1">Suggestions:</span>
        {TOPIC_SUGGESTIONS.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => {
              setTopic(item);
              if (errors.topic) setErrors((prev) => ({ ...prev, topic: '' }));
            }}
            className={`px-2.5 py-1 rounded-md text-xs font-mono transition-all cursor-pointer ${
              topic === item
                ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40'
                : 'bg-white/[0.02] text-neutral-400 hover:text-neutral-200 border border-white/[0.05] hover:border-white/[0.1]'
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Form Card */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Input 1: Topic */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="topic-input" className="text-xs font-semibold text-neutral-300 font-mono uppercase tracking-wider">
              Concept or Topic
            </label>
            <span className="text-[11px] text-neutral-400 font-mono">Target Subject</span>
          </div>
          <input
            id="topic-input"
            type="text"
            value={topic}
            onChange={handleTopicChange}
            onBlur={validate}
            placeholder="e.g. Binary Search"
            className={`w-full px-4 py-3.5 rounded-xl bg-neutral-900/80 border text-white placeholder:text-neutral-600 focus:outline-none focus:ring-2 transition-all text-base font-sans ${
              errors.topic
                ? 'border-red-500/80 focus:ring-red-500/40 focus:border-red-500'
                : 'border-white/[0.08] focus:border-amber-400/80 focus:ring-amber-400/20'
            }`}
          />
          {errors.topic && (
            <div className="flex items-center gap-1.5 text-xs text-red-400 mt-1.5">
              <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
              <span>{errors.topic}</span>
            </div>
          )}
        </div>

        {/* Input 2: Explanation */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="explanation-input" className="text-xs font-semibold text-neutral-300 font-mono uppercase tracking-wider">
              Your Mechanical Explanation
            </label>
            <div className="flex items-center gap-2 font-mono text-xs">
              <span
                className={`transition-colors ${
                  isCharCountValid ? 'text-emerald-400' : 'text-neutral-500'
                }`}
              >
                {charCount} / {maxChars} chars
              </span>
              {charCount < minChars && (
                <span className="text-neutral-500 text-[11px]">
                  (min {minChars})
                </span>
              )}
            </div>
          </div>
          <textarea
            id="explanation-input"
            rows={8}
            value={explanation}
            onChange={handleExplanationChange}
            onKeyDown={handleKeyDown}
            onBlur={validate}
            placeholder="Explain the step-by-step mechanism in your own words. Why does it work? What are the prerequisite conditions and causal links?"
            className={`w-full px-4 py-3.5 rounded-xl bg-neutral-900/80 border text-white placeholder:text-neutral-600 focus:outline-none focus:ring-2 transition-all text-base resize-y leading-relaxed font-sans ${
              errors.explanation
                ? 'border-red-500/80 focus:ring-red-500/40 focus:border-red-500'
                : 'border-white/[0.08] focus:border-amber-400/80 focus:ring-amber-400/20'
            }`}
          />

          {/* Character counter & requirement helper */}
          <div className="flex items-center justify-between pt-1">
            {errors.explanation ? (
              <div className="flex items-center gap-1.5 text-xs text-red-400">
                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                <span>{errors.explanation}</span>
              </div>
            ) : (
              <p className="text-xs text-neutral-400">
                Describe the mechanics, invariants, and causal relationships.
              </p>
            )}

            {isCharCountValid && !errors.explanation && (
              <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-mono">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Ready for calibration</span>
              </div>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="pt-4 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={onBack}
            className="px-5 py-3.5 rounded-xl border border-white/[0.08] hover:border-white/20 text-neutral-300 hover:text-white text-sm font-medium transition-colors cursor-pointer"
          >
            Back
          </button>
          <button
            id="explain-continue-btn"
            type="submit"
            className="group inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-semibold text-sm transition-all duration-200 shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
          >
            <span>Proceed to Calibration</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            <CornerDownLeft className="w-3 h-3 opacity-60 hidden sm:inline" />
          </button>
        </div>
      </form>
    </div>
  );
}
