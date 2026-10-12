/**
 * Environmental Quality & Pollution Sensing Module
 */

import React from 'react';
import {
  Wind,
  CheckCircle2,
  AlertTriangle,
  Activity,
  Flame,
  Volume2,
  Globe,
  SlidersHorizontal,
} from 'lucide-react';
import { EnvironmentalData, HistoricalRecord } from '../../types';
import { SparklineAreaChart } from '../common/Charts';

interface EnvironmentModuleProps {
  environment: EnvironmentalData;
  historical: HistoricalRecord[];
  onNavigateToSim: () => void;
}

export const EnvironmentModule: React.FC<EnvironmentModuleProps> = ({
  environment,
  historical,
  onNavigateToSim,
}) => {
  const chartData = historical.map((h) => ({
    label: h.timestamp,
    value: h.aqi,
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-400">
            <Wind className="w-4 h-4" />
            <span>Village Environmental Health Grid</span>
            <span className="text-slate-600">·</span>
            <span className="text-amber-400 font-medium">Demo Data</span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1">Air Quality, Carbon Flux & Soil Salinity</h2>
          <p className="text-xs text-slate-400 mt-1">
            Particulate matter optical counters, NDIR carbon dioxide sensors, and soil electrical conductivity telemetry.
          </p>
        </div>

        <button
          onClick={onNavigateToSim}
          className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-500 rounded-xl transition-colors shadow-sm"
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>Simulate Stress Factors</span>
        </button>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
          <p className="text-xs text-slate-400">Air Quality Index (AQI)</p>
          <p className="text-2xl font-bold font-mono text-white mt-1">
            {environment.aqi}
          </p>
          <div className="mt-2 flex items-center justify-between text-xs">
            <span className="text-emerald-400 font-medium">Moderate / Satisfactory</span>
            <span className="text-slate-400 font-mono">Good &lt; 50</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="bg-emerald-500 h-full rounded-full" style={{ width: '48%' }} />
          </div>
        </div>

        {/* Card 2 */}
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
          <p className="text-xs text-slate-400">Fine Particulate (PM2.5)</p>
          <p className="text-2xl font-bold font-mono text-white mt-1">
            {environment.pm25} <span className="text-xs font-normal text-slate-400">µg/m³</span>
          </p>
          <div className="mt-2 flex items-center justify-between text-xs">
            <span className="text-slate-300">Agricultural Dust</span>
            <span className="text-slate-400 font-mono">Limit: 35.0</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="bg-sky-500 h-full rounded-full" style={{ width: '40%' }} />
          </div>
        </div>

        {/* Card 3 */}
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
          <p className="text-xs text-slate-400">Ambient Carbon (CO2)</p>
          <p className="text-2xl font-bold font-mono text-white mt-1">
            {environment.co2Ppm} <span className="text-xs font-normal text-slate-400">ppm</span>
          </p>
          <div className="mt-2 flex items-center justify-between text-xs">
            <span className="text-emerald-400">Clean Rural Baseline</span>
            <span className="text-slate-400 font-mono">Global: 422</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="bg-teal-500 h-full rounded-full" style={{ width: '55%' }} />
          </div>
        </div>

        {/* Card 4 */}
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
          <p className="text-xs text-slate-400">Soil Salinity Index (EC)</p>
          <p className="text-2xl font-bold font-mono text-white mt-1">
            {environment.soilSalinityDsm} <span className="text-xs font-normal text-slate-400">dS/m</span>
          </p>
          <div className="mt-2 flex items-center justify-between text-xs">
            <span className="text-emerald-400">Non-Saline Arable</span>
            <span className="text-slate-400 font-mono">Hazard: &gt; 2.0</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="bg-emerald-500 h-full rounded-full" style={{ width: '30%' }} />
          </div>
        </div>
      </div>

      {/* Historical Air Quality Trend & Ecology Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                AQI Telemetry Timeline
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Monitoring field dust and road transport particulate concentrations.
              </p>
            </div>
            <span className="text-xs font-mono text-slate-400">Unit: Air Quality Index</span>
          </div>

          <div className="mt-4">
            <SparklineAreaChart
              data={chartData}
              color="#14B8A6"
              fillColor="rgba(20, 184, 166, 0.2)"
              height={180}
              unit=""
              min={40}
              max={90}
            />
          </div>
        </div>

        <div className="lg:col-span-5 bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider pb-3 border-b border-slate-800">
            Environmental Risk Diagnostic
          </h3>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
            <div className="flex justify-between text-slate-300">
              <span>Ambient Sound Level:</span>
              <strong className="font-mono text-white">{environment.ambientNoiseDb} dB (Quiet Rural)</strong>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>Air Ecological Risk:</span>
              <strong className="text-emerald-400 font-medium">Minimal / Healthy</strong>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>Groundwater Salinization:</span>
              <strong className="text-emerald-400 font-medium">Safe (Low Leaching)</strong>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed">
            <span className="font-semibold text-teal-400 block mb-1">Ecological Advisory:</span>
            Ambient parameters remain within permissible national rural air standards. Maintain vegetative windbreaks around open agricultural boundaries to retard fugitive soil dust during summer harvesting.
          </div>
        </div>
      </div>
    </div>
  );
};
