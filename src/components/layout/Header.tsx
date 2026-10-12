/**
 * Top Navigation Bar adhering to the Top Bar Contract:
 * [Brand title, one line] — [4–5 nav links, 1–2 word labels, single-line] — [1 primary action]
 */

import React from 'react';
import { Cloud, Wifi } from 'lucide-react';

interface HeaderProps {
  currentTab: string;
  onNavigate: (tab: string) => void;
  onOpenDeployModal: () => void;
  isRemoteConnected: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onNavigate,
  onOpenDeployModal,
  isRemoteConnected,
}) => {
  return (
    <header className="flex items-center justify-between gap-8 px-6 py-3.5 bg-slate-950 border-b border-slate-800/80 sticky top-0 z-40">
      {/* Zone 1: Single text element wordmark */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => onNavigate('dashboard')}
          className="text-lg font-bold tracking-tight text-white hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0 flex items-center gap-2"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block shadow-sm shadow-emerald-500/50" />
          SmartVillage Digital Twin
        </button>
      </div>

      {/* Zone 2: 4–5 clean single-line text navigation links */}
      <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
        <button
          onClick={() => onNavigate('dashboard')}
          className={`hover:text-white transition-colors whitespace-nowrap shrink-0 ${
            currentTab === 'dashboard' ? 'text-emerald-400 font-semibold' : ''
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => onNavigate('digital-twin')}
          className={`hover:text-white transition-colors whitespace-nowrap shrink-0 ${
            currentTab === 'digital-twin' ? 'text-emerald-400 font-semibold' : ''
          }`}
        >
          Digital Twin
        </button>
        <button
          onClick={() => onNavigate('simulation')}
          className={`hover:text-white transition-colors whitespace-nowrap shrink-0 ${
            currentTab === 'simulation' ? 'text-emerald-400 font-semibold' : ''
          }`}
        >
          Simulation
        </button>
        <button
          onClick={() => onNavigate('predictions')}
          className={`hover:text-white transition-colors whitespace-nowrap shrink-0 ${
            currentTab === 'predictions' ? 'text-emerald-400 font-semibold' : ''
          }`}
        >
          AI Predictions
        </button>
        <button
          onClick={() => onNavigate('alerts')}
          className={`hover:text-white transition-colors whitespace-nowrap shrink-0 ${
            currentTab === 'alerts' ? 'text-emerald-400 font-semibold' : ''
          }`}
        >
          Alerts
        </button>
      </nav>

      {/* Zone 3: 1 primary action */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={onOpenDeployModal}
          className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-slate-600 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-sm"
          title="Configure backend REST API and deployment targets"
        >
          {isRemoteConnected ? (
            <Wifi className="w-3.5 h-3.5 text-emerald-400" />
          ) : (
            <Cloud className="w-3.5 h-3.5 text-sky-400" />
          )}
          <span>{isRemoteConnected ? 'Render Connected' : 'Cloud API & Deploy'}</span>
        </button>
      </div>
    </header>
  );
};
