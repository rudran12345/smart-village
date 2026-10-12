/**
 * Interactive 2D Digital Twin Representation of Smart Village
 * Features spatial topology, visual resource nodes, live status signaling,
 * and comprehensive node inspection modal/drawer.
 */

import React, { useState } from 'react';
import {
  Droplets,
  Sprout,
  Zap,
  CloudSun,
  Wind,
  Building2,
  AlertTriangle,
  CheckCircle2,
  Activity,
  Layers,
  Info,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import { VillageResource, StatusLevel, ResourceCategory } from '../../types';

interface DigitalTwinMapProps {
  resources: VillageResource[];
  onSelectResource?: (resource: VillageResource) => void;
}

export const DigitalTwinMap: React.FC<DigitalTwinMapProps> = ({
  resources,
  onSelectResource,
}) => {
  const [selectedNode, setSelectedNode] = useState<VillageResource | null>(resources[0] || null);
  const [activeCategory, setActiveCategory] = useState<ResourceCategory | 'all'>('all');
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  const filteredResources = activeCategory === 'all'
    ? resources
    : resources.filter((r) => r.category === activeCategory);

  const getStatusColor = (status: StatusLevel) => {
    switch (status) {
      case 'Normal':
        return '#10B981'; // emerald
      case 'Warning':
        return '#F59E0B'; // amber
      case 'Critical':
        return '#EF4444'; // red
    }
  };

  const getCategoryIcon = (category: ResourceCategory) => {
    switch (category) {
      case 'water':
        return <Droplets className="w-4 h-4" />;
      case 'agriculture':
      case 'crop':
        return <Sprout className="w-4 h-4" />;
      case 'electricity':
        return <Zap className="w-4 h-4" />;
      case 'weather':
        return <CloudSun className="w-4 h-4" />;
      case 'environment':
        return <Wind className="w-4 h-4" />;
      case 'infrastructure':
        return <Building2 className="w-4 h-4" />;
    }
  };

  const handleNodeClick = (res: VillageResource) => {
    setSelectedNode(res);
    if (onSelectResource) onSelectResource(res);
  };

  return (
    <div className="space-y-4">
      {/* Map Controls & Layer Selector */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-900/80 border border-slate-800 rounded-xl">
        <div className="flex items-center gap-2 text-xs text-slate-300">
          <Layers className="w-4 h-4 text-emerald-400" />
          <span className="font-semibold uppercase tracking-wider text-slate-400">Layer Filter:</span>
          <div className="flex flex-wrap items-center gap-1">
            {(['all', 'water', 'agriculture', 'electricity', 'weather', 'infrastructure', 'environment'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-2.5 py-1 text-xs font-medium rounded-lg capitalize transition-colors ${
                  activeCategory === cat
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400">Digital Twin Mode:</span>
          <span className="font-mono text-emerald-400 font-medium">Real-Time Telemetry Twin</span>
          <div className="h-4 w-px bg-slate-800 mx-1" />
          <button
            onClick={() => setZoomLevel((z) => (z === 1 ? 1.25 : 1))}
            className="px-2 py-1 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 rounded"
          >
            {zoomLevel === 1 ? 'Zoom In' : 'Reset View'}
          </button>
        </div>
      </div>

      {/* Main Grid: Interactive Canvas + Inspection Detail Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* Left: Spatial Digital Twin Canvas */}
        <div className="lg:col-span-8 bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden relative shadow-2xl">
          {/* Canvas Header Banner */}
          <div className="absolute top-3 left-4 z-10 flex items-center gap-3 bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-800 text-xs">
            <Activity className="w-4 h-4 text-emerald-400" />
            <span className="font-semibold text-slate-200">Village Spatial Twin Matrix</span>
            <span className="text-slate-500">·</span>
            <span className="text-slate-400 font-mono">Grid: 800 x 550m</span>
            <span className="text-slate-500">·</span>
            <span className="text-amber-400 font-medium">Demo Data</span>
          </div>

          {/* Interactive SVG Landscape */}
          <div className="w-full overflow-auto p-2 bg-[#090D16]">
            <svg
              viewBox="0 0 820 540"
              className="w-full h-auto min-w-[650px] transition-transform duration-300 origin-center select-none"
              style={{ transform: `scale(${zoomLevel})` }}
            >
              <defs>
                {/* Patterns and gradients for terrain */}
                <radialGradient id="lakeGradient" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#0284C7" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#0369A1" stopOpacity="0.4" />
                </radialGradient>

                <linearGradient id="paddyField" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#065F46" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#047857" stopOpacity="0.2" />
                </linearGradient>

                <linearGradient id="milletField" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#854D0E" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#A16207" stopOpacity="0.2" />
                </linearGradient>

                <linearGradient id="tomatoField" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#991B1B" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#B91C1C" stopOpacity="0.15" />
                </linearGradient>

                <pattern id="gridPattern" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="1" />
                </pattern>
              </defs>

              {/* Grid Background */}
              <rect width="820" height="540" fill="url(#gridPattern)" />

              {/* Terrain Zones: River / Canal Path */}
              <path
                d="M 280,0 Q 270,120 290,220 T 320,380 T 310,540"
                fill="none"
                stroke="#0284C7"
                strokeWidth="16"
                strokeOpacity="0.35"
                strokeLinecap="round"
              />
              <path
                d="M 280,0 Q 270,120 290,220 T 320,380 T 310,540"
                fill="none"
                stroke="#38BDF8"
                strokeWidth="4"
                strokeOpacity="0.6"
                strokeDasharray="8 6"
              />

              {/* Primary Village Access Road */}
              <path
                d="M 0,380 Q 220,370 410,400 T 820,410"
                fill="none"
                stroke="#334155"
                strokeWidth="14"
                strokeLinecap="round"
              />
              <path
                d="M 0,380 Q 220,370 410,400 T 820,410"
                fill="none"
                stroke="#64748B"
                strokeWidth="2"
                strokeDasharray="6 8"
              />

              {/* Secondary Feeder Road to North Farm */}
              <path
                d="M 410,400 L 430,220 L 260,150"
                fill="none"
                stroke="#1E293B"
                strokeWidth="6"
                strokeDasharray="4 4"
              />

              {/* Electricity Microgrid Power Distribution Line */}
              <path
                d="M 440,320 L 530,400 L 620,240 L 680,110"
                fill="none"
                stroke="#F59E0B"
                strokeWidth="2"
                strokeDasharray="5 5"
                strokeOpacity="0.5"
              />

              {/* Water Body: Central Reservoir */}
              <g className="cursor-pointer">
                <ellipse cx="260" cy="150" rx="75" ry="45" fill="url(#lakeGradient)" stroke="#0284C7" strokeWidth="2" />
                <ellipse cx="260" cy="150" rx="55" ry="32" fill="#0369A1" fillOpacity="0.25" stroke="#38BDF8" strokeWidth="1" strokeDasharray="4 2" />
                <text x="260" y="154" textAnchor="middle" fill="#93C5FD" fontSize="10" fontFamily="sans-serif" fontWeight="bold">
                  Village Reservoir
                </text>
              </g>

              {/* Agricultural Field 1: Paddy Field A (North-West) */}
              <g className="cursor-pointer">
                <polygon
                  points="90,230 250,220 230,340 70,330"
                  fill="url(#paddyField)"
                  stroke="#10B981"
                  strokeWidth="1.5"
                  strokeDasharray="4 2"
                />
                <text x="160" y="285" textAnchor="middle" fill="#6EE7B7" fontSize="10" fontWeight="600">
                  Basmati Paddy Field A
                </text>
              </g>

              {/* Agricultural Field 2: Millet Farm (East Plateau) */}
              <g className="cursor-pointer">
                <polygon
                  points="540,180 720,170 700,310 520,300"
                  fill="url(#milletField)"
                  stroke="#F59E0B"
                  strokeWidth="1.5"
                />
                <text x="620" y="245" textAnchor="middle" fill="#FCD34D" fontSize="10" fontWeight="600">
                  East Millet Plateau (22 Ha)
                </text>
              </g>

              {/* Agricultural Field 3: Tomato Hub (South-West) */}
              <g className="cursor-pointer">
                <polygon
                  points="50,380 180,370 170,490 40,480"
                  fill="url(#tomatoField)"
                  stroke="#EF4444"
                  strokeWidth="1.5"
                />
                <text x="110" y="435" textAnchor="middle" fill="#FCA5A5" fontSize="10" fontWeight="600">
                  West Terrace Tomato Hub
                </text>
              </g>

              {/* Village Civic & Residential Settlement Hub */}
              <g>
                <rect x="360" y="340" width="160" height="130" rx="12" fill="#0F172A" stroke="#334155" strokeWidth="1" />
                <text x="440" y="360" textAnchor="middle" fill="#94A3B8" fontSize="11" fontWeight="bold">
                  Panchayat Civic Core
                </text>
              </g>

              {/* Solar Array Panels Icon Area */}
              <g transform="translate(420, 275)">
                <rect x="0" y="0" width="40" height="24" rx="2" fill="#1E3A8A" stroke="#3B82F6" strokeWidth="1" />
                <line x1="13" y1="0" x2="13" y2="24" stroke="#60A5FA" strokeWidth="0.8" />
                <line x1="26" y1="0" x2="26" y2="24" stroke="#60A5FA" strokeWidth="0.8" />
                <line x1="0" y1="12" x2="40" y2="12" stroke="#60A5FA" strokeWidth="0.8" />
              </g>

              {/* Render Resource Telemetry Nodes */}
              {filteredResources.map((res) => {
                const isSelected = selectedNode?.id === res.id;
                const statusColor = getStatusColor(res.status);

                return (
                  <g
                    key={res.id}
                    className="cursor-pointer transition-transform duration-200"
                    transform={`translate(${res.coordinates.x}, ${res.coordinates.y})`}
                    onClick={() => handleNodeClick(res)}
                  >
                    {/* Pulsing Aura if selected or critical */}
                    {(isSelected || res.status === 'Critical') && (
                      <circle
                        cx="0"
                        cy="0"
                        r="24"
                        fill={statusColor}
                        fillOpacity="0.2"
                        className="animate-ping"
                      />
                    )}

                    {/* Outer Circle Ring */}
                    <circle
                      cx="0"
                      cy="0"
                      r={isSelected ? 18 : 14}
                      fill="#0B132B"
                      stroke={isSelected ? '#FFFFFF' : statusColor}
                      strokeWidth={isSelected ? 3 : 2}
                      className="shadow-lg"
                    />

                    {/* Category Center Dot */}
                    <circle cx="0" cy="0" r={isSelected ? 7 : 5} fill={statusColor} />

                    {/* Floating Label Badge */}
                    <g transform="translate(0, -22)">
                      <rect
                        x="-55"
                        y="-12"
                        width="110"
                        height="18"
                        rx="4"
                        fill="#0F172A"
                        fillOpacity="0.9"
                        stroke={statusColor}
                        strokeWidth="1"
                      />
                      <text
                        x="0"
                        y="0"
                        textAnchor="middle"
                        fill="#F8FAFC"
                        fontSize="9"
                        fontFamily="sans-serif"
                        fontWeight="600"
                      >
                        {res.value} {res.unit.split(' ')[0]}
                      </text>
                    </g>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Map Footer Legend */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-900 border-t border-slate-800 text-xs">
            <div className="flex items-center gap-4">
              <span className="text-slate-400 font-medium">Telemetry Status:</span>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
                <span className="text-slate-300">Normal</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
                <span className="text-slate-300">Warning</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" />
                <span className="text-slate-300">Critical</span>
              </div>
            </div>

            <div className="text-slate-400 text-[11px]">
              Click any node or farm boundary on the map to inspect real-time AI analytics.
            </div>
          </div>
        </div>

        {/* Right: Selected Node Inspection Panel */}
        <div className="lg:col-span-4 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl">
          {selectedNode ? (
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between gap-2 pb-3 border-b border-slate-800">
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400">
                    {getCategoryIcon(selectedNode.category)}
                    <span>{selectedNode.category} Node</span>
                    <span className="text-slate-600">·</span>
                    <span className="text-slate-400">{selectedNode.zone}</span>
                  </div>
                  <h3 className="text-base font-bold text-white mt-1">{selectedNode.name}</h3>
                </div>

                <span
                  className={`px-2.5 py-1 text-xs font-semibold rounded-md border ${
                    selectedNode.status === 'Critical'
                      ? 'bg-red-500/10 text-red-400 border-red-500/30'
                      : selectedNode.status === 'Warning'
                      ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                      : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                  }`}
                >
                  {selectedNode.status}
                </span>
              </div>

              {/* Telemetry Metric Card */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-400">Current Reading</p>
                  <p className="text-2xl font-bold font-mono text-white mt-0.5">
                    {selectedNode.value} <span className="text-sm font-normal text-slate-400">{selectedNode.unit}</span>
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-400">Nominal Safe Buffer</p>
                  <p className="text-xs font-mono text-slate-300 mt-1">
                    {selectedNode.nominalRange.min} - {selectedNode.nominalRange.max} {selectedNode.unit.split(' ')[0]}
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Synced {selectedNode.lastUpdated}</p>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-300 leading-relaxed bg-slate-800/40 p-3 rounded-lg border border-slate-800/80">
                {selectedNode.description}
              </p>

              {/* AI Diagnostic Explanation */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-200">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  <span>AI Digital Twin Diagnostic</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 space-y-2">
                  <p className="leading-relaxed">
                    <span className="text-slate-400 font-medium">Risk Assessment: </span>
                    {selectedNode.status === 'Critical'
                      ? 'Threshold breach detected. Rapid depletion or stress curve observed over past 6 operating hours.'
                      : selectedNode.status === 'Warning'
                      ? 'Approaching operational boundaries. Elevated ambient temperature and usage demand accelerating consumption.'
                      : 'Telemetry parameters fully compliant with nominal village sustainability standards.'}
                  </p>

                  <div className="p-2.5 rounded-lg bg-emerald-950/30 border border-emerald-800/40 text-emerald-300">
                    <span className="font-semibold block mb-0.5">AI Recommended Action:</span>
                    {selectedNode.category === 'water'
                      ? 'Regulate feeder pump release to 4-hour morning window and verify sluice valve pressure.'
                      : selectedNode.category === 'crop' || selectedNode.category === 'agriculture'
                      ? 'Initiate drip pulse irrigation between 20:00 - 04:00 to reduce evaporative loss.'
                      : selectedNode.category === 'electricity'
                      ? 'Stagger agricultural pump startups to avoid tripping distribution transformer.'
                      : 'Maintain periodic routine inspection protocol.'}
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="pt-2 flex items-center gap-2">
                <button
                  onClick={() => {
                    const event = new CustomEvent('navigate-to-section', { detail: selectedNode.category });
                    window.dispatchEvent(event);
                  }}
                  className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-colors"
                >
                  <span>Open Detailed {selectedNode.category.toUpperCase()} View</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ) : (
            <div className="py-16 text-center text-slate-500">
              <Info className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">Select any village node to inspect telemetry and AI diagnosis.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
