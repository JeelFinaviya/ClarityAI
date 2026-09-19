import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Trash2, 
  ArrowRight, 
  Sparkles, 
  History, 
  Trophy, 
  ArrowLeft, 
  Filter 
} from 'lucide-react';
import { fetchDiagnosticHistory, fetchDiagnosticDetail, deleteDiagnosticRecord } from '../services/api';
import { ResultsView } from '../components/ResultsView';

export function ArchivePage({ onStartNew, onSelectTopic }) {
  const [records, setRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  const [selectedRecord, setSelectedRecord] = useState(null);
  const [recordToDelete, setRecordToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Load history from API
  useEffect(() => {
    let isCancelled = false;
    
    async function fetchArchive() {
      try {
        const data = await fetchDiagnosticHistory(searchQuery, sortBy);
        if (!isCancelled) {
          setRecords(data || []);
          setError(null);
          setIsLoading(false);
        }
      } catch (err) {
        if (!isCancelled) {
          console.error('Failed to load history:', err);
          setError(err.message || 'Failed to load history log.');
          setIsLoading(false);
        }
      }
    }

    fetchArchive();
    return () => {
      isCancelled = true;
    };
  }, [searchQuery, sortBy]);

  const handleOpenDetail = async (recordId) => {
    try {
      const fullData = await fetchDiagnosticDetail(recordId);
      const formattedResult = {
        topic: fullData.topic,
        understanding_score: fullData.final_score,
        understanding_level: fullData.verdict,
        summary: fullData.summary,
        diagnostic_dimensions: fullData.diagnostic_dimensions && Object.keys(fullData.diagnostic_dimensions).length > 0
          ? fullData.diagnostic_dimensions
          : {
              core_accuracy: fullData.core_accuracy,
              causal_depth: fullData.causal_depth,
              relational_coherence: fullData.relational_coherence,
            },
        confidence_calibration: fullData.confidence_calibration?.status ? fullData.confidence_calibration : {
          stated_confidence: fullData.confidence,
          calibration_gap: fullData.final_score - fullData.confidence,
          status: Math.abs(fullData.final_score - fullData.confidence) <= 15 ? 'calibrated' : (fullData.final_score - fullData.confidence < 0 ? 'overconfident' : 'underconfident'),
          gap_analysis: `Stated conviction: ${fullData.confidence}%, Measured understanding: ${fullData.final_score}%.`
        },
        concepts_understood: fullData.demonstrated_concepts || [],
        missing_concepts: fullData.missing_concepts || [],
        possible_misconceptions: fullData.possible_misconceptions || [],
        probe: fullData.probe_question ? {
          needs_probe: true,
          probe_question: fullData.probe_question,
          rationale: fullData.probe_reason,
        } : { needs_probe: false },
        diagnostic_journey: fullData.diagnostic_journey || null,
        _isArchived: true,
        _archivedDate: fullData.created_at,
      };

      setSelectedRecord({
        raw: fullData,
        viewData: formattedResult,
        confidence: fullData.confidence,
      });
    } catch (err) {
      console.error('Error fetching detail:', err);
    }
  };

  const confirmDelete = async () => {
    if (!recordToDelete) return;
    setIsDeleting(true);
    try {
      await deleteDiagnosticRecord(recordToDelete.id);
      setRecords((prev) => prev.filter((r) => r.id !== recordToDelete.id));
      if (selectedRecord?.raw?.id === recordToDelete.id) {
        setSelectedRecord(null);
      }
      setRecordToDelete(null);
    } catch (err) {
      console.error('Delete error:', err);
    } finally {
      setIsDeleting(false);
    }
  };

  // If viewing a detail record
  if (selectedRecord) {
    return (
      <div className="w-full flex-1 flex flex-col items-center justify-start arena-bg-radial px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="w-full max-w-5xl mb-4">
          <button
            type="button"
            onClick={() => setSelectedRecord(null)}
            className="px-4 py-2 rounded-xl bg-[#121624] hover:bg-[#181d2e] text-zinc-200 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to History Log</span>
          </button>
        </div>

        <ResultsView
          result={selectedRecord.viewData}
          userConfidence={selectedRecord.confidence}
          onRefine={() => {
            onSelectTopic(selectedRecord.viewData.topic);
          }}
          onReset={onStartNew}
        />
      </div>
    );
  }

  return (
    <div className="w-full flex-1 flex flex-col items-center justify-start arena-bg-radial px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="w-full max-w-5xl flex flex-col gap-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff5722]/10 border border-[#ff5722]/30 text-[#ff7a50] text-xs font-semibold mb-2">
              <History className="w-3.5 h-3.5 text-[#a3e635]" />
              <span>Learning Log</span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
              Evaluation History & Mastery Log
            </h1>
          </div>

          <button
            type="button"
            onClick={onStartNew}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#ff5722] via-[#f97316] to-[#a3e635] text-white font-display text-xs font-bold shadow-lg shadow-orange-500/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-orange-200" />
            <span>New Evaluation</span>
          </button>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search concepts or topics..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#07090e]/80 border border-white/10 text-white placeholder-zinc-500 text-xs font-medium focus:border-[#ff5722] focus:outline-none transition-all"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <Filter className="w-3.5 h-3.5 text-zinc-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 rounded-xl bg-[#07090e]/80 border border-white/10 text-zinc-300 text-xs font-medium focus:outline-none cursor-pointer"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="score_desc">Highest Score</option>
              <option value="score_asc">Lowest Score</option>
            </select>
          </div>
        </div>

        {/* Content list */}
        {isLoading ? (
          <div className="py-20 text-center text-xs text-zinc-400">
            Loading your history log...
          </div>
        ) : error ? (
          <div className="py-12 text-center text-xs text-rose-400">
            {error}
          </div>
        ) : records.length === 0 ? (
          <div className="glass-card rounded-2xl p-12 text-center flex flex-col items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#ff5722]/10 text-[#ff5722] flex items-center justify-center">
              <Trophy className="w-6 h-6" />
            </div>
            <h3 className="font-display text-base font-bold text-white">No Evaluation Records Found</h3>
            <p className="text-xs text-zinc-400 max-w-sm">
              Complete your first concept evaluation to build your mastery log!
            </p>
            <button
              type="button"
              onClick={onStartNew}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#ff5722] to-[#f97316] text-white text-xs font-bold shadow-md hover:from-[#ff6b3a] hover:to-[#ff5722] transition-all cursor-pointer"
            >
              Start First Evaluation
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {records.map((rec) => {
              const score = rec.final_score ?? rec.initial_score ?? 0;
              const dateStr = rec.created_at ? new Date(rec.created_at).toLocaleDateString(undefined, {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              }) : 'Recent';

              return (
                <div
                  key={rec.id}
                  className="glass-card glass-card-hover rounded-2xl p-5 flex flex-col justify-between group border border-white/10"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold font-mono-code ${
                        score >= 80 ? 'bg-[#a3e635]/20 text-[#a3e635]' :
                        score >= 60 ? 'bg-amber-500/20 text-amber-300' :
                        score >= 45 ? 'bg-orange-500/20 text-orange-300' : 'bg-rose-500/20 text-rose-300'
                      }`}>
                        {score}% Score
                      </span>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setRecordToDelete(rec);
                        }}
                        className="text-zinc-500 hover:text-rose-400 p-1 rounded transition-colors cursor-pointer"
                        title="Delete record"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <h3 
                      onClick={() => handleOpenDetail(rec.id)}
                      className="font-display text-base font-bold text-white group-hover:text-[#ff7a50] transition-colors cursor-pointer mb-1 line-clamp-1"
                    >
                      {rec.topic}
                    </h3>
                    <p className="text-xs text-zinc-400 line-clamp-2 mb-4 leading-relaxed">
                      {rec.summary || rec.verdict || 'Conceptual evaluation record.'}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-white/5 text-xs">
                    <span className="text-zinc-500 text-[11px] font-mono-code">{dateStr}</span>
                    <button
                      type="button"
                      onClick={() => handleOpenDetail(rec.id)}
                      className="text-[#ff7a50] hover:text-[#ff5722] font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      <span>View Report</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {recordToDelete && (
          <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="glass-card rounded-2xl p-6 max-w-sm w-full border border-white/10 shadow-2xl flex flex-col gap-4">
              <h3 className="font-display text-base font-bold text-white">Delete Evaluation Record?</h3>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Are you sure you want to delete the record for <strong className="text-white">"{recordToDelete.topic}"</strong>? This action cannot be undone.
              </p>
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setRecordToDelete(null)}
                  className="px-4 py-2 rounded-xl bg-[#121624] hover:bg-[#181d2e] text-zinc-300 text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={confirmDelete}
                  disabled={isDeleting}
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold cursor-pointer shadow-md"
                >
                  {isDeleting ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
