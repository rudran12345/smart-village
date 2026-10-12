/**
 * Village Alerts & Notification Center
 */

import React, { useState } from 'react';
import {
  BellRing,
  AlertTriangle,
  AlertCircle,
  CheckCircle2,
  Clock,
  Check,
  Filter,
} from 'lucide-react';
import { VillageAlert, StatusLevel } from '../../types';

interface AlertsModuleProps {
  alerts: VillageAlert[];
  onAcknowledgeAlert?: (id: string) => void;
  onNavigateToCategory?: (category: string) => void;
}

export const AlertsModule: React.FC<AlertsModuleProps> = ({
  alerts: initialAlerts,
  onNavigateToCategory,
}) => {
  const [alerts, setAlerts] = useState<VillageAlert[]>(initialAlerts);
  const [filterSeverity, setFilterSeverity] = useState<StatusLevel | 'All'>('All');

  const handleToggleAck = (id: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, acknowledged: !a.acknowledged } : a))
    );
  };

  const filteredAlerts = filterSeverity === 'All'
    ? alerts
    : alerts.filter((a) => a.severity === filterSeverity);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-red-400">
            <BellRing className="w-4 h-4" />
            <span>Emergency Operations & Dispatch Queue</span>
            <span className="text-slate-600">·</span>
            <span className="text-amber-400 font-medium">Demo Data</span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1">Village Warning Notices & Safety Alerts</h2>
          <p className="text-xs text-slate-400 mt-1">
            Automated alerts triggered by low water buffers, transformer peak loads, crop blight, and thermal advisories.
          </p>
        </div>

        {/* Severity Filter */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-950 border border-slate-800 rounded-xl">
          {(['All', 'Critical', 'Warning'] as const).map((sev) => (
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

      {/* Alerts Matrix */}
      <div className="space-y-3.5">
        {filteredAlerts.map((alert) => {
          const isCritical = alert.severity === 'Critical';

          return (
            <div
              key={alert.id}
              className={`p-5 rounded-2xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                alert.acknowledged
                  ? 'bg-slate-950/60 border-slate-800/80 opacity-70'
                  : isCritical
                  ? 'bg-red-950/20 border-red-800/40 shadow-lg shadow-red-950/10'
                  : 'bg-amber-950/20 border-amber-800/40 shadow-lg shadow-amber-950/10'
              }`}
            >
              <div className="space-y-1.5 max-w-2xl">
                <div className="flex items-center gap-2 text-xs">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      isCritical
                        ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                        : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    }`}
                  >
                    {alert.severity}
                  </span>
                  <span className="text-slate-400 uppercase font-semibold text-[11px]">
                    {alert.category}
                  </span>
                  <span className="text-slate-600">·</span>
                  <span className="text-slate-500 font-mono flex items-center gap-1 text-[11px]">
                    <Clock className="w-3 h-3" />
                    {alert.timestamp}
                  </span>
                  {alert.acknowledged && (
                    <span className="text-emerald-400 font-medium text-[11px] flex items-center gap-1">
                      <Check className="w-3 h-3" /> Acknowledged
                    </span>
                  )}
                </div>

                <h3 className="text-base font-bold text-white">{alert.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{alert.message}</p>

                <div className="pt-1 text-xs text-amber-300/90 font-medium">
                  Required Action: <span className="text-slate-300 font-normal">{alert.actionRequired}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 shrink-0 pt-2 md:pt-0">
                <button
                  onClick={() => handleToggleAck(alert.id)}
                  className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                    alert.acknowledged
                      ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      : 'bg-slate-800 text-emerald-400 hover:bg-slate-700 border border-emerald-500/30'
                  }`}
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>{alert.acknowledged ? 'Mark Unread' : 'Acknowledge'}</span>
                </button>

                {onNavigateToCategory && (
                  <button
                    onClick={() => onNavigateToCategory(alert.category)}
                    className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
                  >
                    Inspect
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
