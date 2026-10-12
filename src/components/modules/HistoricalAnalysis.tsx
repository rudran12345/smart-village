/**
 * Historical Analysis & Multi-Resource Telemetry Trends
 */

import React, { useState } from 'react';
import {
  LineChart,
  Calendar,
  Filter,
  Layers,
  ArrowUpRight,
  TrendingDown,
  TrendingUp,
} from 'lucide-react';
import { HistoricalRecord } from '../../types';
import { SparklineAreaChart } from '../common/Charts';

interface HistoricalAnalysisProps {
  historical: HistoricalRecord[];
}

export const HistoricalAnalysis: React.FC<HistoricalAnalysisProps> = ({
  historical,
}) => {
  const [selectedMetric, setSelectedMetric] = useState<'waterLevelPct' | 'electricityKw' | 'soilMoisturePct' | 'temperatureC' | 'aqi'>('waterLevelPct');

  const metricConfigs = {
    waterLevelPct: {
      name: 'Water Storage Reservoir Level',
      unit: '%',
      color: '#0284C7',
      fill: 'rgba(2, 132, 199, 0.2)',
      domain: [20, 70],
    },
    electricityKw: {
      name: 'Substation Electrical Demand',
      unit: 'kW',
      color: '#F59E0B',
      fill: 'rgba(245, 158, 11, 0.2)',
      domain: [100, 400],
    },
    soilMoisturePct: {
      name: 'Mean Agricultural Soil Moisture',
      unit: '%',
      color: '#10B981',
      fill: 'rgba(16, 185, 129, 0.2)',
      domain: [20, 60],
    },
    temperatureC: {
      name: 'Ambient Meteorological Temperature',
      unit: '°C',
      color: '#F97316',
      fill: 'rgba(249, 115, 22, 0.2)',
      domain: [20, 40],
    },
    aqi: {
      name: 'Air Quality Index (AQI)',
      unit: '',
      color: '#14B8A6',
      fill: 'rgba(20, 184, 166, 0.2)',
      domain: [40, 100],
    },
  };

  const currentCfg = metricConfigs[selectedMetric];
  const chartData = historical.map((h) => ({
    label: h.timestamp,
    value: h[selectedMetric],
  }));

  const values = historical.map((h) => h[selectedMetric]);
  const minVal = Math.min(...values);
  const maxVal = Math.max(...values);
  const meanVal = (values.reduce((a, b) => a + b, 0) / values.length).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400">
            <LineChart className="w-4 h-4" />
            <span>Multi-Resource Time-Series Intelligence</span>
            <span className="text-slate-600">·</span>
            <span className="text-amber-400 font-medium">Demo Data</span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1">Historical Resource Telemetry Analytics</h2>
          <p className="text-xs text-slate-400 mt-1">
            Analyze diurnals, drawdown rates, and resource correlation across historical operational windows.
          </p>
        </div>

        {/* Metric Segmented Control */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-950 border border-slate-800 rounded-xl">
          {(Object.keys(metricConfigs) as Array<keyof typeof metricConfigs>).map((key) => (
            <button
              key={key}
              onClick={() => setSelectedMetric(key)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                selectedMetric === key
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              {key === 'waterLevelPct'
                ? 'Water %'
                : key === 'electricityKw'
                ? 'Electricity kW'
                : key === 'soilMoisturePct'
                ? 'Soil Moisture'
                : key === 'temperatureC'
                ? 'Temp °C'
                : 'AQI'}
            </button>
          ))}
        </div>
      </div>

      {/* Main Chart Card */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
          <div>
            <span className="text-xs text-slate-400 uppercase font-semibold tracking-wider">
              Selected Telemetry Feed
            </span>
            <h3 className="text-lg font-bold text-white mt-0.5">{currentCfg.name}</h3>
          </div>

          {/* Statistical Highlights */}
          <div className="flex items-center gap-6 text-xs font-mono">
            <div>
              <span className="text-slate-500 block text-[11px]">Minimum</span>
              <span className="text-white font-bold">{minVal} {currentCfg.unit}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[11px]">Maximum</span>
              <span className="text-white font-bold">{maxVal} {currentCfg.unit}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[11px]">Mean Average</span>
              <span className="text-emerald-400 font-bold">{meanVal} {currentCfg.unit}</span>
            </div>
          </div>
        </div>

        {/* SVG Chart */}
        <div className="py-2">
          <SparklineAreaChart
            data={chartData}
            color={currentCfg.color}
            fillColor={currentCfg.fill}
            height={240}
            unit={currentCfg.unit}
            min={currentCfg.domain[0]}
            max={currentCfg.domain[1]}
          />
        </div>

        {/* Data Points Grid */}
        <div className="pt-4 border-t border-slate-800">
          <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">
            Recorded Telemetry Sequence
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
            {chartData.map((d, i) => (
              <div key={i} className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-center">
                <span className="text-[11px] text-slate-500 font-mono block">{d.label}</span>
                <span className="text-sm font-bold font-mono text-white mt-1 block">
                  {d.value} <span className="text-[10px] font-normal text-slate-400">{currentCfg.unit}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
