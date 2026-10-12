/**
 * Weather & Microclimate Monitoring Module
 */

import React from 'react';
import {
  CloudSun,
  Thermometer,
  CloudRain,
  Wind,
  Gauge,
  Sun,
  AlertTriangle,
  Activity,
  SlidersHorizontal,
} from 'lucide-react';
import { WeatherData, HistoricalRecord, AIPrediction } from '../../types';
import { SparklineAreaChart } from '../common/Charts';

interface WeatherModuleProps {
  weather: WeatherData;
  historical: HistoricalRecord[];
  prediction?: AIPrediction;
  onNavigateToSim: () => void;
}

export const WeatherModule: React.FC<WeatherModuleProps> = ({
  weather,
  historical,
  prediction,
  onNavigateToSim,
}) => {
  const chartData = historical.map((h) => ({
    label: h.timestamp,
    value: h.temperatureC,
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-orange-400">
            <CloudSun className="w-4 h-4" />
            <span>Agro-Meteorological Station Telemetry</span>
            <span className="text-slate-600">·</span>
            <span className="text-amber-400 font-medium">Demo Data</span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1">Local Microclimate & Forecast Intelligence</h2>
          <p className="text-xs text-slate-400 mt-1">
            Ridge-top ultrasonic anemometer, solar radiation sensor, rain gauge, and 24-hour predictive modeling.
          </p>
        </div>

        <button
          onClick={onNavigateToSim}
          className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-orange-600 hover:bg-orange-500 rounded-xl transition-colors shadow-sm"
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>Simulate Extreme Weather</span>
        </button>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
          <p className="text-xs text-slate-400">Ambient Temperature</p>
          <p className="text-2xl font-bold font-mono text-white mt-1">
            {weather.temperatureC}°C
          </p>
          <div className="mt-2 flex items-center justify-between text-xs">
            <span className="text-amber-400">Heat Index: 39°C</span>
            <span className="text-slate-400 font-mono">Max: 37.2°C</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="bg-orange-500 h-full rounded-full" style={{ width: '82%' }} />
          </div>
        </div>

        {/* Card 2 */}
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
          <p className="text-xs text-slate-400">Precipitation (24h)</p>
          <p className="text-2xl font-bold font-mono text-sky-400 mt-1">
            {weather.rainfallMm} <span className="text-xs font-normal text-slate-400">mm</span>
          </p>
          <div className="mt-2 flex items-center justify-between text-xs">
            <span className="text-slate-300">Dry Spell (Day 9)</span>
            <span className="text-slate-400 font-mono">Rain Prob: 15%</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="bg-sky-500 h-full rounded-full" style={{ width: '5%' }} />
          </div>
        </div>

        {/* Card 3 */}
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
          <p className="text-xs text-slate-400">Relative Humidity</p>
          <p className="text-2xl font-bold font-mono text-white mt-1">
            {weather.humidityPct}%
          </p>
          <div className="mt-2 flex items-center justify-between text-xs">
            <span className="text-slate-300">High Evaporation</span>
            <span className="text-slate-400 font-mono">Dew: 18.5°C</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="bg-teal-500 h-full rounded-full" style={{ width: `${weather.humidityPct}%` }} />
          </div>
        </div>

        {/* Card 4 */}
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
          <p className="text-xs text-slate-400">Wind Velocity & UV</p>
          <p className="text-2xl font-bold font-mono text-white mt-1">
            {weather.windSpeedKmh} <span className="text-xs font-normal text-slate-400">km/h</span>
          </p>
          <div className="mt-2 flex items-center justify-between text-xs">
            <span className="text-purple-400">UV Index: {weather.uvIndex} (Very High)</span>
            <span className="text-slate-400 font-mono">{weather.barometricPressureHpa} hPa</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="bg-purple-500 h-full rounded-full" style={{ width: '65%' }} />
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Temperature Diurnal Curve */}
        <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Diurnal Temperature Profile
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Thermal progression highlighting mid-afternoon heat peaks.
              </p>
            </div>
            <span className="text-xs font-mono text-slate-400">Unit: Degrees Celsius (°C)</span>
          </div>

          <div className="mt-4">
            <SparklineAreaChart
              data={chartData}
              color="#F97316"
              fillColor="rgba(249, 115, 22, 0.2)"
              height={180}
              unit="°C"
              min={20}
              max={40}
            />
          </div>

          <div className="mt-4 p-3 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-1">
              24-Hour Synoptic Summary
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">
              {weather.forecast24h.summary}
            </p>
          </div>
        </div>

        {/* Right: AI Climate Prediction */}
        <div className="lg:col-span-5 bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-orange-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                AI Climate Advisory
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
                  <span>Forecast Horizon:</span>
                  <span className="text-white font-medium">{prediction.predictionPeriod}</span>
                </div>
                <div className="mt-2 text-sm text-slate-200">
                  <span className="text-xs text-slate-400 block">Current Condition</span>
                  <span className="font-mono font-bold text-white">{prediction.currentValue}</span>
                </div>
                <div className="mt-2 text-sm text-amber-400">
                  <span className="text-xs text-slate-400 block">AI Forecast</span>
                  <span className="font-mono font-bold">{prediction.predictedValue}</span>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-800/80 flex justify-between text-[11px] text-slate-400">
                  <span>Confidence: <strong className="text-emerald-400 font-mono">{prediction.confidenceScore}%</strong></span>
                  <span>Trend: <strong className="text-orange-400">{prediction.trend}</strong></span>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Meteorological Rationale:</h4>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed bg-slate-950 p-3 rounded-lg border border-slate-800">
                  {prediction.explanation}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Farmer & Community Advisory:</h4>
                <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-800/40 text-xs text-emerald-200 mt-1 leading-relaxed">
                  {prediction.recommendation}
                </div>
              </div>
            </div>
          ) : (
            <p className="text-xs text-slate-400">No active weather prediction.</p>
          )}
        </div>
      </div>
    </div>
  );
};
