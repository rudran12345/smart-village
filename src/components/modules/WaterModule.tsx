/**
 * Water Resources Monitoring & AI Predictive Diagnostics
 */

import React from 'react';
import {
  Droplets,
  AlertTriangle,
  CheckCircle2,
  TrendingDown,
  Gauge,
  Activity,
  ArrowRight,
  ShieldAlert,
  SlidersHorizontal,
} from 'lucide-react';
import { WaterData, HistoricalRecord, AIPrediction } from '../../types';
import { SparklineAreaChart } from '../common/Charts';

interface WaterModuleProps {
  water: WaterData;
  historical: HistoricalRecord[];
  prediction?: AIPrediction;
  onNavigateToSim: () => void;
}

export const WaterModule: React.FC<WaterModuleProps> = ({
  water,
  historical,
  prediction,
  onNavigateToSim,
}) => {
  const chartData = historical.map((h) => ({
    label: h.timestamp,
    value: h.waterLevelPct,
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-400">
            <Droplets className="w-4 h-4" />
            <span>Village Hydrological Monitoring System</span>
            <span className="text-slate-600">·</span>
            <span className="text-amber-400 font-medium">Demo Data</span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1">Water Storage & Aquifer Telemetry</h2>
          <p className="text-xs text-slate-400 mt-1">
            Real-time ultrasonic reservoir level sensing, submersible well depth transducers, and municipal distribution meters.
          </p>
        </div>

        <button
          onClick={onNavigateToSim}
          className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-500 rounded-xl transition-colors shadow-sm"
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>Simulate Drought Scenario</span>
        </button>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
          <p className="text-xs text-slate-400">Central Reservoir Level</p>
          <p className="text-2xl font-bold font-mono text-white mt-1">
            {water.reservoirLevelPct}%
          </p>
          <div className="mt-2 flex items-center justify-between text-xs">
            <span className="text-amber-400 font-medium">Warning Threshold</span>
            <span className="text-slate-400 font-mono">Min safe: 50%</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
            <div
              className="bg-amber-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${water.reservoirLevelPct}%` }}
            />
          </div>
        </div>

        {/* Card 2 */}
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
          <p className="text-xs text-slate-400">Groundwater Borewell Depth</p>
          <p className="text-2xl font-bold font-mono text-white mt-1">
            {water.groundwaterDepthMeters} <span className="text-xs font-normal text-slate-400">meters</span>
          </p>
          <div className="mt-2 flex items-center justify-between text-xs">
            <span className="text-slate-300">Cluster #3 Active</span>
            <span className="text-slate-400 font-mono">Static: 22.0m</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="bg-sky-500 h-full rounded-full" style={{ width: '68%' }} />
          </div>
        </div>

        {/* Card 3 */}
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
          <p className="text-xs text-slate-400">Daily Village Consumption</p>
          <p className="text-2xl font-bold font-mono text-white mt-1">
            {water.dailyConsumptionKLD} <span className="text-xs font-normal text-slate-400">KLD</span>
          </p>
          <div className="mt-2 flex items-center justify-between text-xs">
            <span className="text-slate-300">{water.supplyStatus} Supply</span>
            <span className="text-slate-400 font-mono">185,000 L/day</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="bg-emerald-500 h-full rounded-full" style={{ width: '75%' }} />
          </div>
        </div>

        {/* Card 4 */}
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
          <p className="text-xs text-slate-400">Water Quality (TDS)</p>
          <p className="text-2xl font-bold font-mono text-white mt-1">
            {water.waterQualityTDS} <span className="text-xs font-normal text-slate-400">ppm</span>
          </p>
          <div className="mt-2 flex items-center justify-between text-xs">
            <span className="text-emerald-400">Potable Grade</span>
            <span className="text-slate-400 font-mono">WHO Max: 500</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="bg-emerald-500 h-full rounded-full" style={{ width: '62%' }} />
          </div>
        </div>
      </div>

      {/* Main Grid: Historical Chart & AI Prediction Diagnostic */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Historical Graph */}
        <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Reservoir Depletion Curve (Today's Trend)
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Hourly telemetry readings showing steady draw-down under dry weather.
              </p>
            </div>
            <span className="text-xs font-mono text-slate-400">Unit: % Storage Capacity</span>
          </div>

          <div className="mt-4">
            <SparklineAreaChart
              data={chartData}
              color="#0284C7"
              fillColor="rgba(2, 132, 199, 0.2)"
              height={180}
              unit="%"
              min={30}
              max={60}
            />
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 grid grid-cols-3 gap-3 text-center text-xs">
            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-slate-400 block">Pumps Active</span>
              <span className="text-sm font-bold text-white font-mono mt-0.5">
                {water.pumpsOperating} / {water.totalPumps} Units
              </span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-slate-400 block">Line Pressure</span>
              <span className="text-sm font-bold text-white font-mono mt-0.5">
                {water.pipePressureBar} Bar
              </span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-slate-400 block">Pipe Leakage Risk</span>
              <span className="text-sm font-bold text-amber-400 font-medium mt-0.5">
                {water.leakRisk}
              </span>
            </div>
          </div>
        </div>

        {/* Right: AI Prediction & Risk Recommendation */}
        <div className="lg:col-span-5 bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-sky-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                AI Hydrological Prediction
              </h3>
            </div>
            <span className="text-xs px-2 py-0.5 rounded bg-red-500/10 text-red-400 border border-red-500/30 font-semibold">
              Critical in 48h
            </span>
          </div>

          {prediction ? (
            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Forecast Horizon:</span>
                  <span className="text-white font-medium">{prediction.predictionPeriod}</span>
                </div>
                <div className="flex justify-between items-baseline mt-2">
                  <div>
                    <span className="text-xs text-slate-400 block">Current Storage</span>
                    <span className="text-lg font-bold font-mono text-white">{prediction.currentValue}</span>
                  </div>
                  <div className="text-center text-slate-500">
                    <TrendingDown className="w-5 h-5 text-red-400 mx-auto" />
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-400 block">Predicted Storage</span>
                    <span className="text-lg font-bold font-mono text-red-400">{prediction.predictedValue}</span>
                  </div>
                </div>
                <div className="mt-2 text-[11px] text-slate-400 flex justify-between">
                  <span>Model Confidence: <strong className="text-emerald-400 font-mono">{prediction.confidenceScore}%</strong></span>
                  <span>Trend: <strong className="text-red-400">{prediction.trend}</strong></span>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">AI Root Cause Explanation:</h4>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed bg-slate-950 p-3 rounded-lg border border-slate-800">
                  {prediction.explanation}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Operational Recommendation:</h4>
                <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-800/40 text-xs text-emerald-200 mt-1 leading-relaxed">
                  {prediction.recommendation}
                </div>
              </div>
            </div>
          ) : (
            <p className="text-xs text-slate-400">No active water prediction generated.</p>
          )}
        </div>
      </div>
    </div>
  );
};
