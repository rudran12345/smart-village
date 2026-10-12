/**
 * Automated Risk Detection & Vulnerability Analysis Module
 */

import React, { useState } from 'react';
import {
  ShieldAlert,
  AlertTriangle,
  AlertCircle,
  Users,
  Clock,
  MapPin,
  CheckCircle2,
  Filter,
} from 'lucide-react';
import { DetectedRisk, StatusLevel } from '../../types';

interface RiskDetectionModuleProps {
  risks: DetectedRisk[];
}

export const RiskDetectionModule: React.FC<RiskDetectionModuleProps> = ({
  risks,
}) => {
  const [filterSeverity, setFilterSeverity] = useState<StatusLevel | 'All'>('All');

  const filteredRisks = filterSeverity === 'All'
    ? risks
    : risks.filter((r) => r.severity === filterSeverity);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-red-400">
            <ShieldAlert className="w-4 h-4" />
            <span>Automated Risk Classification Engine</span>
            <span className="text-slate-600">·</span>
            <span className="text-amber-400 font-medium">Demo Data</span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1">Village Threat & Vulnerability Detection</h2>
          <p className="text-xs text-slate-400 mt-1">
            Real-time threshold evaluation classifying resource stress into Normal, Warning, and Critical states.
          </p>
        </div>

        {/* Severity Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-950 border border-slate-800 rounded-xl">
          {(['All', 'Critical', 'Warning', 'Normal'] as const).map((sev) => (
            <button
              key={sev}
              onClick={() => setFilterSeverity(sev)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                filterSeverity === sev
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              {sev}
            </button>
          ))}
        </div>
      </div>

      {/* Risks Cards Matrix */}
      <div className="space-y-4">
        {filteredRisks.map((risk) => {
          const isCritical = risk.severity === 'Critical';
          const isWarning = risk.severity === 'Warning';

          return (
            <div
              key={risk.id}
              className={`p-5 rounded-2xl border transition-all ${
                isCritical
                  ? 'bg-red-950/20 border-red-800/40'
                  : isWarning
                  ? 'bg-amber-950/20 border-amber-800/40'
                  : 'bg-slate-900/80 border-slate-800'
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                      isCritical
                        ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                        : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    }`}
                  >
                    <ShieldAlert className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-semibold uppercase tracking-wider text-slate-400">
                        {risk.category} System
                      </span>
                      <span className="text-slate-600">·</span>
                      <span className="text-slate-400 font-mono flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {risk.detectedAt}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-white mt-1">{risk.title}</h3>
                  </div>
                </div>

                <span
                  className={`px-2.5 py-1 text-xs font-semibold rounded-md border ${
                    isCritical
                      ? 'bg-red-500/20 text-red-400 border-red-500/40'
                      : 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                  }`}
                >
                  {risk.severity} Severity
                </span>
              </div>

              {/* Rationale & Impact Details */}
              <div className="mt-4 grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-8 space-y-2">
                  <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
                    <strong className="text-white block mb-0.5">Underlying Cause:</strong>
                    {risk.reason}
                  </p>

                  <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-800/30 text-xs text-emerald-200">
                    <strong className="text-emerald-400 block mb-0.5">Remedy & Action:</strong>
                    {risk.remedyHint}
                  </div>
                </div>

                <div className="md:col-span-4 p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between text-xs space-y-2">
                  <div>
                    <span className="text-slate-400 block flex items-center gap-1 text-[11px]">
                      <MapPin className="w-3 h-3 text-slate-500" />
                      Affected Geographic Zone:
                    </span>
                    <span className="font-semibold text-slate-200 mt-0.5 block">{risk.impactArea}</span>
                  </div>

                  <div className="pt-2 border-t border-slate-800">
                    <span className="text-slate-400 block flex items-center gap-1 text-[11px]">
                      <Users className="w-3 h-3 text-slate-500" />
                      Impacted Residents / Farmers:
                    </span>
                    <span className="font-mono font-bold text-white text-sm mt-0.5 block">
                      ~{risk.affectedPopulation.toLocaleString()} People
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
