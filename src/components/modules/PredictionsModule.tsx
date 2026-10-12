/**
 * AI Predictive Intelligence & Resource Forecasts
 */

import React from 'react';
import {
  BrainCircuit,
  TrendingDown,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Info,
} from 'lucide-react';
import { AIPrediction, StatusLevel } from '../../types';

interface PredictionsModuleProps {
  predictions: AIPrediction[];
  onNavigateToSim: () => void;
}

export const PredictionsModule: React.FC<PredictionsModuleProps> = ({
  predictions,
  onNavigateToSim,
}) => {
  const getStatusBadge = (status: StatusLevel) => {
    switch (status) {
      case 'Critical':
        return 'bg-red-500/10 text-red-400 border-red-500/30';
      case 'Warning':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'Normal':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-purple-400">
            <BrainCircuit className="w-4 h-4" />
            <span>AI Predictive Modeling Service</span>
            <span className="text-slate-600">·</span>
            <span className="text-amber-400 font-medium">Demo Data (Baseline Time-Series Model)</span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1">Multi-Horizon AI Resource Forecasts</h2>
          <p className="text-xs text-slate-400 mt-1">
            Algorithmic trend extrapolation, evapotranspiration forecasting, and transformer load prediction models.
          </p>
        </div>

        <button
          onClick={onNavigateToSim}
          className="px-4 py-2 text-xs font-semibold text-white bg-purple-600 hover:bg-purple-500 rounded-xl transition-colors shadow-sm"
        >
          Test in What-If Sandbox
        </button>
      </div>

      {/* Model Notice Banner */}
      <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 flex items-start gap-3 text-xs text-slate-300">
        <Info className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold text-white">Algorithmic Baseline Prototype Note:</span> Predictions are generated using modular statistical regression, historical diurnals, and physical mass-balance equations. When connected to the Python backend, this interfaces with trained ML microservices.
        </div>
      </div>

      {/* Predictions Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {predictions.map((pred) => (
          <div
            key={pred.id}
            className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between shadow-lg space-y-4"
          >
            <div>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-purple-400">
                    {pred.category} Resource
                  </span>
                  <h3 className="text-base font-bold text-white mt-0.5">{pred.resourceName}</h3>
                </div>

                <span className={`px-2.5 py-1 text-xs font-semibold rounded-md border ${getStatusBadge(pred.riskLevel)}`}>
                  {pred.riskLevel}
                </span>
              </div>

              {/* Telemetry Comparison Box */}
              <div className="mt-4 p-3.5 rounded-xl bg-slate-950 border border-slate-800 grid grid-cols-2 gap-3">
                <div>
                  <span className="text-[11px] text-slate-400 block">Current Telemetry</span>
                  <span className="text-sm font-bold font-mono text-white mt-1 block">
                    {pred.currentValue}
                  </span>
                </div>
                <div>
                  <span className="text-[11px] text-purple-300 block">
                    Projected ({pred.predictionPeriod})
                  </span>
                  <span className={`text-sm font-bold font-mono mt-1 block ${
                    pred.riskLevel === 'Critical' ? 'text-red-400' : 'text-amber-400'
                  }`}>
                    {pred.predictedValue}
                  </span>
                </div>
              </div>

              {/* Statistical Confidence */}
              <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
                <span>Model Confidence: <strong className="text-emerald-400 font-mono">{pred.confidenceScore}%</strong></span>
                <span>Trajectory: <strong className="text-slate-200">{pred.trend}</strong></span>
              </div>

              {/* Explanation */}
              <div className="mt-3 pt-3 border-t border-slate-800">
                <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-1">
                  AI Diagnostic Rationale
                </span>
                <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-lg border border-slate-800/80">
                  {pred.explanation}
                </p>
              </div>
            </div>

            {/* Recommendation */}
            <div className="pt-2 border-t border-slate-800">
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider block mb-1">
                Suggested Intervention
              </span>
              <p className="text-xs text-emerald-200 leading-relaxed bg-emerald-950/30 p-3 rounded-lg border border-emerald-800/30">
                {pred.recommendation}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
