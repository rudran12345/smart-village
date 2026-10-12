/**
 * Professional Sidebar navigation for Smart Village Dashboard
 */

import React from 'react';
import {
  LayoutDashboard,
  Layers,
  Droplets,
  Sprout,
  Zap,
  CloudSun,
  Wind,
  Building2,
  LineChart,
  BrainCircuit,
  ShieldAlert,
  SlidersHorizontal,
  BellRing,
  Lightbulb,
  Server,
  X,
} from 'lucide-react';

interface SidebarProps {
  currentTab: string;
  onNavigate: (tab: string) => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  alertsCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onNavigate,
  isOpenMobile,
  onCloseMobile,
  alertsCount,
}) => {
  const navSections = [
    {
      group: 'Core Monitoring',
      items: [
        { id: 'dashboard', label: 'Dashboard Overview', icon: LayoutDashboard },
        { id: 'digital-twin', label: 'Digital Twin Map', icon: Layers },
      ],
    },
    {
      group: 'Resource Systems',
      items: [
        { id: 'water', label: 'Water Resources', icon: Droplets },
        { id: 'agriculture', label: 'Agriculture & Crops', icon: Sprout },
        { id: 'electricity', label: 'Electricity Grid', icon: Zap },
        { id: 'weather', label: 'Weather & Climate', icon: CloudSun },
        { id: 'environment', label: 'Environmental Quality', icon: Wind },
        { id: 'infrastructure', label: 'Village Infrastructure', icon: Building2 },
      ],
    },
    {
      group: 'Intelligence & Decision Support',
      items: [
        { id: 'historical', label: 'Historical Analysis', icon: LineChart },
        { id: 'predictions', label: 'AI Predictions', icon: BrainCircuit },
        { id: 'risks', label: 'Risk Detection', icon: ShieldAlert },
        { id: 'simulation', label: 'What-If Simulation', icon: SlidersHorizontal },
        { id: 'alerts', label: 'Village Alerts', icon: BellRing, badge: alertsCount },
        { id: 'recommendations', label: 'Recommendations', icon: Lightbulb },
      ],
    },
    {
      group: 'Deployment & Systems',
      items: [
        { id: 'deployment', label: 'Cloud API & Deploy', icon: Server },
      ],
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-xs"
        />
      )}

      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-64 bg-slate-950 border-r border-slate-800/80 flex flex-col justify-between transition-transform duration-300 lg:translate-x-0 ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full overflow-hidden">
          {/* Mobile close row */}
          <div className="lg:hidden flex items-center justify-between px-5 py-4 border-b border-slate-800">
            <span className="font-bold text-white text-sm">Navigation</span>
            <button
              onClick={onCloseMobile}
              className="p-1 rounded-md text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links Scrollable Area */}
          <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
            {navSections.map((section, idx) => (
              <div key={idx} className="space-y-1">
                <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  {section.group}
                </p>
                <div className="mt-1 space-y-0.5">
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = currentTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          onNavigate(item.id);
                          onCloseMobile();
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                          isActive
                            ? 'bg-emerald-600/15 text-emerald-400 font-semibold border border-emerald-500/20'
                            : 'text-slate-300 hover:text-white hover:bg-slate-900'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                          <span className="truncate">{item.label}</span>
                        </div>
                        {item.badge !== undefined && item.badge > 0 && (
                          <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-red-500/20 text-red-400 border border-red-500/30">
                            {item.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Footer Metadata */}
          <div className="p-3.5 border-t border-slate-800/80 bg-slate-900/30">
            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span>Smart Village Twin</span>
              <span className="text-amber-400 font-medium">Demo Data</span>
            </div>
            <p className="text-[10px] text-slate-400 mt-0.5">
              React + FastAPI + PostgreSQL
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};
