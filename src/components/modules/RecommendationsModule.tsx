/**
 * AI Recommendations & Decision Support Module
 */

import React from 'react';
import {
  Lightbulb,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Target,
  ListChecks,
  Sparkles,
} from 'lucide-react';
import { AIRecommendation } from '../../types';

interface RecommendationsModuleProps {
  recommendations: AIRecommendation[];
}

export const RecommendationsModule: React.FC<RecommendationsModuleProps> = ({
  recommendations,
}) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400">
            <Lightbulb className="w-4 h-4" />
            <span>Panchayat Decision Support System</span>
            <span className="text-slate-600">·</span>
            <span className="text-amber-400 font-medium">Demo Data</span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1">Operational Recommendations & Mitigation Playbooks</h2>
          <p className="text-xs text-slate-400 mt-1">
            Prescriptive intelligence for rural administrators: water conservation, load balancing, and crop protection.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs bg-slate-800/60 px-3 py-1.5 rounded-xl border border-slate-700">
          <span className="text-slate-400">Active Action Protocols:</span>
          <span className="font-mono font-bold text-emerald-400">{recommendations.length} Protocols</span>
        </div>
      </div>

      {/* Recommendations Cards Grid */}
      <div className="space-y-5">
        {recommendations.map((rec) => (
          <div
            key={rec.id}
            className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all shadow-xl space-y-4"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 text-xs">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      rec.priority === 'High'
                        ? 'bg-red-500/10 text-red-400 border border-red-500/30'
                        : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                    }`}
                  >
                    {rec.priority} Priority
                  </span>
                  <span className="text-slate-400 uppercase font-semibold text-[11px]">
                    {rec.category} Management
                  </span>
                  <span className="text-slate-600">·</span>
                  <span className="text-slate-300 font-mono text-[11px] flex items-center gap-1">
                    <Target className="w-3 h-3 text-slate-400" />
                    Target: {rec.resourceTarget}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mt-2">{rec.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed mt-1">{rec.description}</p>
              </div>
            </div>

            {/* Expected Benefit Box */}
            <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-800/30 flex items-start gap-2.5 text-xs text-emerald-200">
              <TrendingUp className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-emerald-400 block mb-0.5">Quantified Projected Benefit:</strong>
                {rec.expectedBenefit}
              </div>
            </div>

            {/* Implementation Steps */}
            <div className="pt-2 border-t border-slate-800/80">
              <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-2.5 flex items-center gap-1.5">
                <ListChecks className="w-3.5 h-3.5 text-slate-400" />
                Step-by-Step Dispatch Execution Sequence:
              </span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                {rec.steps.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 flex items-start gap-2"
                  >
                    <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center shrink-0 font-mono text-[11px] font-bold">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
