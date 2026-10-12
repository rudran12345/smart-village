/**
 * Electricity & Smart Microgrid Telemetry Module
 */

import React from 'react';
import {
  Zap,
  Sun,
  BatteryCharging,
  AlertTriangle,
  Activity,
  Flame,
  ShieldAlert,
  ArrowRight,
  SlidersHorizontal,
} from 'lucide-react';
import { ElectricityData, HistoricalRecord, AIPrediction } from '../../types';
import { SparklineAreaChart } from '../common/Charts';

interface ElectricityModuleProps {
  electricity: ElectricityData;
  historical: HistoricalRecord[];
  prediction?: AIPrediction;
  onNavigateToSim: () => void;
}

export const ElectricityModule: React.FC<ElectricityModuleProps> = ({
  electricity,
  historical,
  prediction,
  onNavigateToSim,
}) => {
  const chartData = historical.map((h) => ({
    label: h.timestamp,
    value: h.electricityKw,
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
            <Zap className="w-4 h-4" />
            <span>Village Smart Microgrid Telemetry</span>
            <span className="text-slate-600">·</span>
            <span className="text-amber-400 font-medium">Demo Data</span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1">Electricity Distribution & Solar Generation</h2>
          <p className="text-xs text-slate-400 mt-1">
            Transformer load monitoring, peak demand smoothing, decentralized solar inverters, and battery bank state.
          </p>
        </div>

        <button
          onClick={onNavigateToSim}
          className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-500 rounded-xl transition-colors shadow-sm"
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>Simulate Peak Grid Load</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
          <p className="text-xs text-slate-400">Village Power Demand</p>
          <p className="text-2xl font-bold font-mono text-white mt-1">
            {electricity.gridDemandKw} <span className="text-xs font-normal text-slate-400">kW</span>
          </p>
          <div className="mt-2 flex items-center justify-between text-xs">
            <span className="text-amber-400 font-medium">High Evening Draw</span>
            <span className="text-slate-400 font-mono">Rating: 400 kW</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
            <div
              className="bg-amber-500 h-full rounded-full"
              style={{ width: `${(electricity.gridDemandKw / 400) * 100}%` }}
            />
          </div>
        </div>

        {/* Card 2 */}
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
          <p className="text-xs text-slate-400">Solar Microgrid Output</p>
          <p className="text-2xl font-bold font-mono text-emerald-400 mt-1">
            {electricity.solarGenerationKw} <span className="text-xs font-normal text-slate-400">kW</span>
          </p>
          <div className="mt-2 flex items-center justify-between text-xs">
            <span className="text-emerald-400">59% Clean Share</span>
            <span className="text-slate-400 font-mono">Offset: 420kg CO2</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="bg-emerald-500 h-full rounded-full" style={{ width: '59%' }} />
          </div>
        </div>

        {/* Card 3 */}
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
          <p className="text-xs text-slate-400">Substation Battery Storage</p>
          <p className="text-2xl font-bold font-mono text-white mt-1">
            {electricity.batteryStoragePct}% <span className="text-xs font-normal text-slate-400">SoC</span>
          </p>
          <div className="mt-2 flex items-center justify-between text-xs">
            <span className="text-slate-300">Reserve: 3.4 hrs</span>
            <span className="text-slate-400 font-mono">Lithium-FePO4</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="bg-sky-500 h-full rounded-full" style={{ width: `${electricity.batteryStoragePct}%` }} />
          </div>
        </div>

        {/* Card 4 */}
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
          <p className="text-xs text-slate-400">Transformer #1 Load</p>
          <p className="text-2xl font-bold font-mono text-amber-400 mt-1">
            {electricity.transformerLoadPct}%
          </p>
          <div className="mt-2 flex items-center justify-between text-xs">
            <span className="text-amber-400">Thermal Stress</span>
            <span className="text-slate-400 font-mono">Trip: 95%</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
            <div
              className="bg-amber-500 h-full rounded-full"
              style={{ width: `${electricity.transformerLoadPct}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Grid: Chart + AI Prediction */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Load Profile Graph */}
        <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Daily Electricity Load Profile
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Monitoring agricultural tube well load surges and evening residential peak.
              </p>
            </div>
            <span className="text-xs font-mono text-slate-400">Unit: Kilowatts (kW)</span>
          </div>

          <div className="mt-4">
            <SparklineAreaChart
              data={chartData}
              color="#F59E0B"
              fillColor="rgba(245, 158, 11, 0.2)"
              height={180}
              unit="kW"
              min={100}
              max={400}
            />
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 grid grid-cols-3 gap-3 text-center text-xs">
            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-slate-400 block">Frequency</span>
              <span className="text-sm font-bold text-white font-mono mt-0.5">{electricity.frequencyHz} Hz</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-slate-400 block">Bus Voltage</span>
              <span className="text-sm font-bold text-white font-mono mt-0.5">{electricity.voltageV} V</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-slate-400 block">Blackout Risk</span>
              <span className="text-sm font-bold text-amber-400 font-medium mt-0.5">{electricity.blackoutRisk}</span>
            </div>
          </div>
        </div>

        {/* Right: AI Prediction */}
        <div className="lg:col-span-5 bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                AI Grid Congestion Forecast
              </h3>
            </div>
            <span className="text-xs px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 font-semibold">
              Warning Notice
            </span>
          </div>

          {prediction ? (
            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Horizon:</span>
                  <span className="text-white font-medium">{prediction.predictionPeriod}</span>
                </div>
                <div className="mt-2 text-sm text-slate-200">
                  <span className="text-xs text-slate-400 block">Current Operating Load</span>
                  <span className="font-mono font-bold text-white">{prediction.currentValue}</span>
                </div>
                <div className="mt-2 text-sm text-amber-400">
                  <span className="text-xs text-slate-400 block">Projected Peak</span>
                  <span className="font-mono font-bold">{prediction.predictedValue}</span>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-800/80 flex justify-between text-[11px] text-slate-400">
                  <span>Confidence: <strong className="text-emerald-400 font-mono">{prediction.confidenceScore}%</strong></span>
                  <span>Trend: <strong className="text-amber-400">{prediction.trend}</strong></span>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">AI Grid Diagnostic:</h4>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed bg-slate-950 p-3 rounded-lg border border-slate-800">
                  {prediction.explanation}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Demand Management Protocol:</h4>
                <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-800/40 text-xs text-emerald-200 mt-1 leading-relaxed">
                  {prediction.recommendation}
                </div>
              </div>
            </div>
          ) : (
            <p className="text-xs text-slate-400">No active electricity prediction data.</p>
          )}
        </div>
      </div>
    </div>
  );
};
