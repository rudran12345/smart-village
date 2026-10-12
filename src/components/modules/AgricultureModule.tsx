/**
 * Agriculture & Crop Monitoring Module with AI Yield Forecasts
 */

import React, { useState } from 'react';
import {
  Sprout,
  AlertTriangle,
  CheckCircle2,
  TrendingDown,
  Info,
  Bug,
  Droplets,
  Thermometer,
  Calendar,
} from 'lucide-react';
import { CropField, AIPrediction } from '../../types';

interface AgricultureModuleProps {
  fields: CropField[];
  prediction?: AIPrediction;
  onNavigateToSim: () => void;
}

export const AgricultureModule: React.FC<AgricultureModuleProps> = ({
  fields,
  prediction,
  onNavigateToSim,
}) => {
  const [selectedField, setSelectedField] = useState<CropField>(fields[0]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400">
            <Sprout className="w-4 h-4" />
            <span>Precision Agriculture & Field Telemetry</span>
            <span className="text-slate-600">·</span>
            <span className="text-amber-400 font-medium">Demo Data</span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1">Crop Health & Soil Sensor Monitoring</h2>
          <p className="text-xs text-slate-400 mt-1">
            Multispectral NDVI indices, capacitive soil moisture probes, NPK fertility metrics, and yield forecasting.
          </p>
        </div>

        <button
          onClick={onNavigateToSim}
          className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl transition-colors shadow-sm"
        >
          Simulate Moisture & Heat Impact
        </button>
      </div>

      {/* Field Cards Carousel / Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {fields.map((field) => {
          const isSelected = selectedField.id === field.id;
          return (
            <div
              key={field.id}
              onClick={() => setSelectedField(field)}
              className={`p-4 rounded-xl border transition-all cursor-pointer ${
                isSelected
                  ? 'bg-slate-900 border-emerald-500 shadow-md ring-1 ring-emerald-500/30'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 font-mono">{field.areaHectares} Ha</span>
                <span
                  className={`px-2 py-0.5 rounded font-semibold text-[11px] ${
                    field.pestDiseaseRisk === 'Critical'
                      ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                      : field.pestDiseaseRisk === 'Warning'
                      ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  }`}
                >
                  {field.pestDiseaseRisk}
                </span>
              </div>

              <h4 className="text-sm font-bold text-white mt-2 truncate">{field.name}</h4>
              <p className="text-xs text-emerald-400 font-medium">{field.cropType}</p>

              <div className="mt-3 grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-800">
                <div>
                  <span className="text-slate-500 block text-[11px]">Moisture</span>
                  <span className="font-mono font-bold text-slate-200">{field.soilMoisturePct}%</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px]">NDVI Index</span>
                  <span className="font-mono font-bold text-slate-200">{field.healthIndexNDVI}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detailed Field Inspection & Diagnostic */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Detailed Parameters */}
        <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <span className="text-xs text-emerald-400 font-semibold uppercase tracking-wider">
                Field Telemetry Profile
              </span>
              <h3 className="text-base font-bold text-white mt-0.5">{selectedField.name}</h3>
            </div>
            <span className="text-xs text-slate-400 font-mono">Stage: {selectedField.growthStage}</span>
          </div>

          {/* Metric Badges */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-[11px] text-slate-400 block">Soil Moisture</span>
              <span className="text-xl font-bold font-mono text-white mt-0.5">{selectedField.soilMoisturePct}%</span>
              <span className="text-[10px] text-amber-400 block mt-1">{selectedField.irrigationStatus}</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-[11px] text-slate-400 block">Vegetative Health (NDVI)</span>
              <span className="text-xl font-bold font-mono text-emerald-400 mt-0.5">{selectedField.healthIndexNDVI}</span>
              <span className="text-[10px] text-slate-400 block mt-1">Satellite multispectral</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-[11px] text-slate-400 block">Projected Harvest</span>
              <span className="text-xl font-bold font-mono text-white mt-0.5">{selectedField.projectedYieldTons} T</span>
              <span className="text-[10px] text-slate-400 block mt-1">Market potential</span>
            </div>
          </div>

          {/* Soil NPK Nutrients Status */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Soil N-P-K Macronutrient Analysis (ppm)
            </h4>

            {/* Nitrogen */}
            <div>
              <div className="flex justify-between text-xs text-slate-400 mb-1">
                <span>Nitrogen (N): {selectedField.nitrogenPpm} ppm</span>
                <span className="text-slate-500">Target: 50-70 ppm</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-500 h-full rounded-full"
                  style={{ width: `${Math.min(100, (selectedField.nitrogenPpm / 70) * 100)}%` }}
                />
              </div>
            </div>

            {/* Phosphorus */}
            <div>
              <div className="flex justify-between text-xs text-slate-400 mb-1">
                <span>Phosphorus (P): {selectedField.phosphorusPpm} ppm</span>
                <span className="text-slate-500">Target: 25-40 ppm</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-sky-500 h-full rounded-full"
                  style={{ width: `${Math.min(100, (selectedField.phosphorusPpm / 40) * 100)}%` }}
                />
              </div>
            </div>

            {/* Potassium */}
            <div>
              <div className="flex justify-between text-xs text-slate-400 mb-1">
                <span>Potassium (K): {selectedField.potassiumPpm} ppm</span>
                <span className="text-slate-500">Target: 180-240 ppm</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-purple-500 h-full rounded-full"
                  style={{ width: `${Math.min(100, (selectedField.potassiumPpm / 240) * 100)}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right: AI Crop Yield Prediction & Recommendation */}
        <div className="lg:col-span-5 bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Sprout className="w-4 h-4 text-emerald-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                AI Agricultural Prognosis
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
                  <span>Forecast Window:</span>
                  <span className="text-white font-medium">{prediction.predictionPeriod}</span>
                </div>
                <div className="mt-2 text-sm text-slate-200">
                  <span className="text-xs text-slate-400 block">Crop Health Status</span>
                  <span className="font-mono font-bold text-white">{prediction.currentValue}</span>
                </div>
                <div className="mt-2 text-sm text-red-400">
                  <span className="text-xs text-slate-400 block">AI Forecast</span>
                  <span className="font-mono font-bold">{prediction.predictedValue}</span>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-800/80 flex justify-between text-[11px] text-slate-400">
                  <span>Confidence: <strong className="text-emerald-400 font-mono">{prediction.confidenceScore}%</strong></span>
                  <span>Trend: <strong className="text-amber-400">{prediction.trend}</strong></span>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">AI Root Cause Analysis:</h4>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed bg-slate-950 p-3 rounded-lg border border-slate-800">
                  {prediction.explanation}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Agronomist Recommendation:</h4>
                <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-800/40 text-xs text-emerald-200 mt-1 leading-relaxed">
                  {prediction.recommendation}
                </div>
              </div>
            </div>
          ) : (
            <p className="text-xs text-slate-400">No active agricultural prediction data.</p>
          )}
        </div>
      </div>
    </div>
  );
};
