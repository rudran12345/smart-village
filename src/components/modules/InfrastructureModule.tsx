/**
 * Village Infrastructure & Civic Assets Health Module
 */

import React from 'react';
import {
  Building2,
  CheckCircle2,
  AlertTriangle,
  Wrench,
  ShieldCheck,
  Calendar,
  Layers,
} from 'lucide-react';
import { InfrastructureItem } from '../../types';

interface InfrastructureModuleProps {
  infrastructure: InfrastructureItem[];
}

export const InfrastructureModule: React.FC<InfrastructureModuleProps> = ({
  infrastructure,
}) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-400">
            <Building2 className="w-4 h-4" />
            <span>Civic Assets & Public Works Digital Twin</span>
            <span className="text-slate-600">·</span>
            <span className="text-amber-400 font-medium">Demo Data</span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1">Village Infrastructure Health & Maintenance Log</h2>
          <p className="text-xs text-slate-400 mt-1">
            Condition scoring, structural integrity sensing, and preventive maintenance work orders for community assets.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs bg-slate-800/60 px-3 py-1.5 rounded-xl border border-slate-700">
          <span className="text-slate-400">Total Monitored Assets:</span>
          <span className="font-mono font-bold text-white">{infrastructure.length} Units</span>
        </div>
      </div>

      {/* Asset Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {infrastructure.map((item) => {
          const isWarning = item.riskLevel === 'Warning';
          const isCritical = item.riskLevel === 'Critical';

          return (
            <div
              key={item.id}
              className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between shadow-lg"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
                    {item.type}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                      isCritical
                        ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                        : isWarning
                        ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    }`}
                  >
                    {item.riskLevel}
                  </span>
                </div>

                <h4 className="text-base font-bold text-white mt-2">{item.name}</h4>

                <div className="mt-4 p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400">Structural Health Index:</span>
                    <span className="font-mono font-bold text-white text-sm">{item.healthScorePct}%</span>
                  </div>

                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        item.healthScorePct > 80
                          ? 'bg-emerald-500'
                          : item.healthScorePct > 60
                          ? 'bg-amber-500'
                          : 'bg-red-500'
                      }`}
                      style={{ width: `${item.healthScorePct}%` }}
                    />
                  </div>

                  <div className="flex justify-between text-[11px] text-slate-400 pt-1">
                    <span>Operational State:</span>
                    <strong className={isWarning ? 'text-amber-400 font-medium' : 'text-slate-200'}>
                      {item.operationalStatus}
                    </strong>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-500" />
                  <span>Inspected: {item.lastInspected}</span>
                </div>
                <span className="font-mono text-[11px] text-indigo-300">
                  Criticality: {item.criticality}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
