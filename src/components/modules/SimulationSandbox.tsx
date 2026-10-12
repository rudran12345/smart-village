/**
 * Interactive What-If Simulation Sandbox
 * Enables rural planners to model drought, heatwaves, and load surges.
 * Clearly labeled as "Simulation" and distinct from real-world telemetry.
 */

import React, { useState } from 'react';
import {
  SlidersHorizontal,
  RotateCcw,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  TrendingDown,
  TrendingUp,
  Droplets,
  Zap,
  CloudRain,
  Thermometer,
  Sprout,
  ShieldAlert,
  Info,
} from 'lucide-react';
import { SimulationParams, SimulationResult } from '../../types';
import { runWhatIfSimulation } from '../../services/aiEngine';

export const SimulationSandbox: React.FC = () => {
  const initialParams: SimulationParams = {
    waterLevelDeltaPct: -15, // simulate 15% drop in reservoir
    electricityUsageMultiplier: 1.25, // simulate 25% peak surge
    rainfallMm: 0, // no rain
    temperatureC: 38, // heat wave
    soilMoistureDeltaPct: -10, // dry soil
  };

  const [params, setParams] = useState<SimulationParams>(initialParams);
  const [result, setResult] = useState<SimulationResult>(() => runWhatIfSimulation(initialParams));

  const handleParamChange = (field: keyof SimulationParams, value: number) => {
    const updated = { ...params, [field]: value };
    setParams(updated);
    setResult(runWhatIfSimulation(updated));
  };

  const handleReset = () => {
    const defaultParams: SimulationParams = {
      waterLevelDeltaPct: 0,
      electricityUsageMultiplier: 1.0,
      rainfallMm: 5,
      temperatureC: 32,
      soilMoistureDeltaPct: 0,
    };
    setParams(defaultParams);
    setResult(runWhatIfSimulation(defaultParams));
  };

  const handlePresetDrought = () => {
    const drought: SimulationParams = {
      waterLevelDeltaPct: -30,
      electricityUsageMultiplier: 1.35,
      rainfallMm: 0,
      temperatureC: 41,
      soilMoistureDeltaPct: -22,
    };
    setParams(drought);
    setResult(runWhatIfSimulation(drought));
  };

  const handlePresetMonsoon = () => {
    const monsoon: SimulationParams = {
      waterLevelDeltaPct: 25,
      electricityUsageMultiplier: 0.85,
      rainfallMm: 65,
      temperatureC: 28,
      soilMoistureDeltaPct: 20,
    };
    setParams(monsoon);
    setResult(runWhatIfSimulation(monsoon));
  };

  return (
    <div className="space-y-6">
      {/* Simulation Banner - Mandatory Clear Label */}
      <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-600/40 flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
            <Info className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider">
                Simulated Scenario
              </span>
              <span className="text-amber-200 text-xs font-semibold">
                Predictive Stress Modeling Environment
              </span>
            </div>
            <p className="text-xs text-amber-200/80 mt-1">
              Results shown here are projected mathematical simulations and do not reflect real-time village physical measurements.
            </p>
          </div>
        </div>

        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors whitespace-nowrap shrink-0 border border-slate-700"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Defaults</span>
        </button>
      </div>

      {/* Main Grid: Control Sliders on Left, Simulated Outcome on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Interactive Simulation Sliders */}
        <div className="lg:col-span-5 bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-purple-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Simulation Variables
              </h3>
            </div>
            <span className="text-[11px] text-slate-400">Live Recalculation</span>
          </div>

          {/* Preset Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePresetDrought}
              className="flex-1 py-1.5 px-2.5 text-xs font-medium rounded-lg bg-red-950/40 text-red-300 border border-red-800/40 hover:bg-red-900/40 transition-colors text-center"
            >
              Preset: Severe Heatwave
            </button>
            <button
              onClick={handlePresetMonsoon}
              className="flex-1 py-1.5 px-2.5 text-xs font-medium rounded-lg bg-sky-950/40 text-sky-300 border border-sky-800/40 hover:bg-sky-900/40 transition-colors text-center"
            >
              Preset: Heavy Monsoon
            </button>
          </div>

          {/* Slider 1: Water Reservoir Level Delta */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300 flex items-center gap-1.5 font-medium">
                <Droplets className="w-3.5 h-3.5 text-sky-400" />
                Reservoir Volume Delta:
              </span>
              <span className="font-mono font-bold text-sky-400">
                {params.waterLevelDeltaPct > 0 ? `+${params.waterLevelDeltaPct}` : params.waterLevelDeltaPct}%
              </span>
            </div>
            <input
              type="range"
              min="-40"
              max="40"
              step="5"
              value={params.waterLevelDeltaPct}
              onChange={(e) => handleParamChange('waterLevelDeltaPct', Number(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>-40% (Depletion)</span>
              <span>Baseline</span>
              <span>+40% (Abundance)</span>
            </div>
          </div>

          {/* Slider 2: Electricity Usage Multiplier */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300 flex items-center gap-1.5 font-medium">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                Grid Demand Multiplier:
              </span>
              <span className="font-mono font-bold text-amber-400">
                {params.electricityUsageMultiplier.toFixed(2)}x
              </span>
            </div>
            <input
              type="range"
              min="0.6"
              max="2.0"
              step="0.05"
              value={params.electricityUsageMultiplier}
              onChange={(e) => handleParamChange('electricityUsageMultiplier', Number(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>0.6x (Low Draw)</span>
              <span>1.0x (Normal)</span>
              <span>2.0x (Overload)</span>
            </div>
          </div>

          {/* Slider 3: Rainfall mm */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300 flex items-center gap-1.5 font-medium">
                <CloudRain className="w-3.5 h-3.5 text-teal-400" />
                Precipitation Inflow:
              </span>
              <span className="font-mono font-bold text-teal-400">
                {params.rainfallMm} mm
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="80"
              step="5"
              value={params.rainfallMm}
              onChange={(e) => handleParamChange('rainfallMm', Number(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>0 mm (Drought)</span>
              <span>25 mm</span>
              <span>80 mm (Torrential)</span>
            </div>
          </div>

          {/* Slider 4: Ambient Temperature */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300 flex items-center gap-1.5 font-medium">
                <Thermometer className="w-3.5 h-3.5 text-orange-400" />
                Simulated Temperature:
              </span>
              <span className="font-mono font-bold text-orange-400">
                {params.temperatureC} °C
              </span>
            </div>
            <input
              type="range"
              min="18"
              max="46"
              step="1"
              value={params.temperatureC}
              onChange={(e) => handleParamChange('temperatureC', Number(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-orange-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>18°C (Cool)</span>
              <span>32°C (Mean)</span>
              <span>46°C (Extreme)</span>
            </div>
          </div>

          {/* Slider 5: Soil Moisture Delta */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300 flex items-center gap-1.5 font-medium">
                <Sprout className="w-3.5 h-3.5 text-emerald-400" />
                Soil Root Moisture Delta:
              </span>
              <span className="font-mono font-bold text-emerald-400">
                {params.soilMoistureDeltaPct > 0 ? `+${params.soilMoistureDeltaPct}` : params.soilMoistureDeltaPct}%
              </span>
            </div>
            <input
              type="range"
              min="-25"
              max="25"
              step="5"
              value={params.soilMoistureDeltaPct}
              onChange={(e) => handleParamChange('soilMoistureDeltaPct', Number(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>-25% (Dry Crust)</span>
              <span>Baseline</span>
              <span>+25% (Saturated)</span>
            </div>
          </div>
        </div>

        {/* Right Column: Calculated Impact & Predicted Outcomes */}
        <div className="lg:col-span-7 space-y-5">
          {/* Top KPI Cards for Simulation */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {/* 1. Health */}
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-[11px] text-slate-400 block">Village Health</span>
              <span className="text-xl font-bold font-mono text-white mt-1 block">
                {result.overallVillageHealthPct}%
              </span>
              <span className={`text-[10px] font-semibold mt-1 block ${
                result.simulatedRiskLevel === 'Critical'
                  ? 'text-red-400'
                  : result.simulatedRiskLevel === 'Warning'
                  ? 'text-amber-400'
                  : 'text-emerald-400'
              }`}>
                {result.simulatedRiskLevel} State
              </span>
            </div>

            {/* 2. Water Stress */}
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-[11px] text-slate-400 block">Water Stress Index</span>
              <span className={`text-xl font-bold font-mono mt-1 block ${
                result.waterStressIndexPct > 70 ? 'text-red-400' : 'text-sky-400'
              }`}>
                {result.waterStressIndexPct}%
              </span>
              <span className="text-[10px] text-slate-500 block mt-1">Shortage Risk</span>
            </div>

            {/* 3. Blackout Risk */}
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-[11px] text-slate-400 block">Blackout Risk</span>
              <span className={`text-xl font-bold font-mono mt-1 block ${
                result.blackoutRiskProbabilityPct > 70 ? 'text-red-400' : 'text-amber-400'
              }`}>
                {result.blackoutRiskProbabilityPct}%
              </span>
              <span className="text-[10px] text-slate-500 block mt-1">Transformer Trip</span>
            </div>

            {/* 4. Crop Yield Impact */}
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-[11px] text-slate-400 block">Crop Yield Shift</span>
              <span className={`text-xl font-bold font-mono mt-1 block ${
                result.cropYieldImpactPct < 0 ? 'text-red-400' : 'text-emerald-400'
              }`}>
                {result.cropYieldImpactPct > 0 ? `+${result.cropYieldImpactPct}` : result.cropYieldImpactPct}%
              </span>
              <span className="text-[10px] text-slate-500 block mt-1">Harvest Deviation</span>
            </div>
          </div>

          {/* Projected Resource Differences Table */}
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-3">
            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Projected Resource State vs. Real Baseline
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="text-slate-400 border-b border-slate-800">
                    <th className="pb-2 font-medium">Resource Node</th>
                    <th className="pb-2 font-medium">Current Real</th>
                    <th className="pb-2 font-medium">Simulated Projected</th>
                    <th className="pb-2 font-medium text-right">Projected Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono">
                  {result.resourceProjections.map((p, i) => (
                    <tr key={i} className="hover:bg-slate-800/30">
                      <td className="py-2.5 font-sans font-medium text-white">{p.resource}</td>
                      <td className="py-2.5 text-slate-400">{p.baseline}</td>
                      <td className="py-2.5 text-white font-bold">{p.simulated}</td>
                      <td className="py-2.5 text-right">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-semibold font-sans ${
                            p.status === 'Critical'
                              ? 'bg-red-500/10 text-red-400 border border-red-500/30'
                              : p.status === 'Warning'
                              ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                              : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                          }`}
                        >
                          {p.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Predicted Outcomes & Recommended Mitigations */}
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-4">
            <div>
              <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Simulated Outcome Impacts
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {result.predictedOutcomes.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
                    <span className="text-purple-400 font-bold">·</span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-2 border-t border-slate-800">
              <h4 className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">
                Algorithmic Mitigation Action Plan
              </h4>
              <ul className="space-y-1.5 text-xs text-emerald-200">
                {result.recommendedMitigations.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 bg-emerald-950/30 p-2.5 rounded-lg border border-emerald-800/40">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
