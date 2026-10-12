/**
 * Comprehensive Smart Village Dashboard Overview
 */

import React from 'react';
import {
  Droplets,
  Zap,
  Sprout,
  CloudSun,
  Wind,
  Building2,
  AlertTriangle,
  ArrowRight,
  TrendingDown,
  TrendingUp,
  Sparkles,
  Layers,
  SlidersHorizontal,
} from 'lucide-react';
import {
  VillageHealthOverview,
  WaterData,
  ElectricityData,
  WeatherData,
  EnvironmentalData,
  VillageAlert,
  DetectedRisk,
} from '../../types';
import { SparklineAreaChart, MetricGauge } from '../common/Charts';

interface OverviewDashboardProps {
  overview: VillageHealthOverview;
  water: WaterData;
  electricity: ElectricityData;
  weather: WeatherData;
  environment: EnvironmentalData;
  alerts: VillageAlert[];
  risks: DetectedRisk[];
  onNavigate: (tab: string) => void;
}

export const OverviewDashboard: React.FC<OverviewDashboardProps> = ({
  overview,
  water,
  electricity,
  weather,
  environment,
  alerts,
  risks,
  onNavigate,
}) => {
  const criticalAlerts = alerts.filter((a) => a.severity === 'Critical');

  return (
    <div className="space-y-6">
      {/* Top Banner: Status & Health Index */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch">
        {/* Health Gauge */}
        <div className="md:col-span-5 lg:col-span-4 bg-slate-900/80 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold uppercase tracking-wider">Village Resilience Score</span>
              <span className="text-amber-400 font-medium">Demo Data</span>
            </div>
            <h2 className="text-lg font-bold text-white mt-1">Overall System Health</h2>
          </div>

          <div className="my-4">
            <MetricGauge
              value={overview.overallHealthPct}
              title="Resilience Index"
              subtitle={overview.overallHealthPct > 75 ? 'Operational Buffer Stable' : 'Attention Required'}
              status={overview.villageStatus}
            />
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            Composite index synthesizing reservoir volume (42.5%), transformer head room (21.5%), and agricultural soil moisture deficits.
          </p>
        </div>

        {/* Critical Alerts Strip */}
        <div className="md:col-span-7 lg:col-span-8 bg-slate-900/80 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Active Critical & Warning Notices ({alerts.length})
              </h3>
            </div>
            <button
              onClick={() => onNavigate('alerts')}
              className="text-xs text-emerald-400 hover:text-emerald-300 font-medium flex items-center gap-1"
            >
              <span>View All Alerts</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2.5 my-3">
            {criticalAlerts.slice(0, 2).map((alert) => (
              <div
                key={alert.id}
                className="p-3 rounded-xl bg-red-950/20 border border-red-900/40 flex items-start justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-red-400">
                    <span className="w-2 h-2 rounded-full bg-red-500 inline-block" />
                    <span>{alert.title}</span>
                    <span className="text-slate-500">·</span>
                    <span className="text-slate-400 font-normal">{alert.timestamp}</span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1">{alert.message}</p>
                </div>
                <button
                  onClick={() => onNavigate(alert.category)}
                  className="px-2.5 py-1 text-[11px] font-semibold text-red-300 bg-red-900/40 hover:bg-red-800/50 rounded-lg whitespace-nowrap transition-colors"
                >
                  Inspect
                </button>
              </div>
            ))}

            {risks.slice(0, 1).map((risk) => (
              <div
                key={risk.id}
                className="p-3 rounded-xl bg-amber-950/20 border border-amber-900/40 flex items-start justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
                    <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" />
                    <span>{risk.title}</span>
                    <span className="text-slate-500">·</span>
                    <span className="text-slate-400 font-normal">{risk.impactArea}</span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1">{risk.reason}</p>
                </div>
                <button
                  onClick={() => onNavigate('risks')}
                  className="px-2.5 py-1 text-[11px] font-semibold text-amber-300 bg-amber-900/40 hover:bg-amber-800/50 rounded-lg whitespace-nowrap transition-colors"
                >
                  Details
                </button>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800">
            <span>{overview.totalMonitoredResources} Active Telemetry Sensors Online</span>
            <span>Last Telemetry Sync: <strong className="text-slate-200 font-mono">{overview.lastSyncedAt}</strong></span>
          </div>
        </div>
      </div>

      {/* 6 Key Resource Domain Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* 1. Water Card */}
        <div
          onClick={() => onNavigate('water')}
          className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer group shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div className="w-9 h-9 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
              <Droplets className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
              Warning
            </span>
          </div>
          <h4 className="text-sm font-semibold text-slate-300 mt-3">Water Resources</h4>
          <p className="text-2xl font-bold font-mono text-white mt-0.5">
            {water.reservoirLevelPct}% <span className="text-xs font-normal text-slate-400">Reservoir Level</span>
          </p>
          <div className="mt-3 text-xs text-slate-400 space-y-1">
            <div className="flex justify-between">
              <span>Aquifer Borewell Depth:</span>
              <span className="text-slate-200 font-mono">{water.groundwaterDepthMeters} m</span>
            </div>
            <div className="flex justify-between">
              <span>Supply Protocol:</span>
              <span className="text-amber-400 font-medium">{water.supplyStatus}</span>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-emerald-400 group-hover:translate-x-1 transition-transform">
            <span>Water telemetry details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* 2. Agriculture & Crop Card */}
        <div
          onClick={() => onNavigate('agriculture')}
          className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer group shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Sprout className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
              Moisture Stress
            </span>
          </div>
          <h4 className="text-sm font-semibold text-slate-300 mt-3">Agriculture & Crops</h4>
          <p className="text-2xl font-bold font-mono text-white mt-0.5">
            0.69 <span className="text-xs font-normal text-slate-400">Mean NDVI Index</span>
          </p>
          <div className="mt-3 text-xs text-slate-400 space-y-1">
            <div className="flex justify-between">
              <span>Monitored Cultivation:</span>
              <span className="text-slate-200 font-mono">63.3 Hectares</span>
            </div>
            <div className="flex justify-between">
              <span>High-Risk Fields:</span>
              <span className="text-red-400 font-medium">1 Field (Tomatoes)</span>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-emerald-400 group-hover:translate-x-1 transition-transform">
            <span>Crop health analytics</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* 3. Electricity Card */}
        <div
          onClick={() => onNavigate('electricity')}
          className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer group shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Zap className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
              78.5% Load
            </span>
          </div>
          <h4 className="text-sm font-semibold text-slate-300 mt-3">Electricity & Microgrid</h4>
          <p className="text-2xl font-bold font-mono text-white mt-0.5">
            {electricity.gridDemandKw} <span className="text-xs font-normal text-slate-400">kW Load</span>
          </p>
          <div className="mt-3 text-xs text-slate-400 space-y-1">
            <div className="flex justify-between">
              <span>Solar Clean Generation:</span>
              <span className="text-emerald-400 font-mono">{electricity.solarGenerationKw} kW</span>
            </div>
            <div className="flex justify-between">
              <span>Battery Storage Bank:</span>
              <span className="text-slate-200 font-mono">{electricity.batteryStoragePct}%</span>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-emerald-400 group-hover:translate-x-1 transition-transform">
            <span>Energy flow metrics</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* 4. Weather Card */}
        <div
          onClick={() => onNavigate('weather')}
          className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer group shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div className="w-9 h-9 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
              <CloudSun className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
              {weather.condition}
            </span>
          </div>
          <h4 className="text-sm font-semibold text-slate-300 mt-3">Weather & Climate</h4>
          <p className="text-2xl font-bold font-mono text-white mt-0.5">
            {weather.temperatureC}°C <span className="text-xs font-normal text-slate-400">Dry Heat</span>
          </p>
          <div className="mt-3 text-xs text-slate-400 space-y-1">
            <div className="flex justify-between">
              <span>24h Rainfall:</span>
              <span className="text-slate-200 font-mono">{weather.rainfallMm} mm</span>
            </div>
            <div className="flex justify-between">
              <span>Relative Humidity:</span>
              <span className="text-slate-200 font-mono">{weather.humidityPct}%</span>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-emerald-400 group-hover:translate-x-1 transition-transform">
            <span>Meteorological station</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* 5. Environment Card */}
        <div
          onClick={() => onNavigate('environment')}
          className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer group shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div className="w-9 h-9 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
              <Wind className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Nominal
            </span>
          </div>
          <h4 className="text-sm font-semibold text-slate-300 mt-3">Environmental Quality</h4>
          <p className="text-2xl font-bold font-mono text-white mt-0.5">
            {environment.aqi} <span className="text-xs font-normal text-slate-400">AQI Index</span>
          </p>
          <div className="mt-3 text-xs text-slate-400 space-y-1">
            <div className="flex justify-between">
              <span>PM2.5 Ambient Level:</span>
              <span className="text-slate-200 font-mono">{environment.pm25} µg/m³</span>
            </div>
            <div className="flex justify-between">
              <span>Soil Salinity (EC):</span>
              <span className="text-slate-200 font-mono">{environment.soilSalinityDsm} dS/m</span>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-emerald-400 group-hover:translate-x-1 transition-transform">
            <span>Air & soil telemetry</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* 6. Infrastructure Card */}
        <div
          onClick={() => onNavigate('infrastructure')}
          className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer group shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <Building2 className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
              6 Assets Monitored
            </span>
          </div>
          <h4 className="text-sm font-semibold text-slate-300 mt-3">Village Infrastructure</h4>
          <p className="text-2xl font-bold font-mono text-white mt-0.5">
            {overview.keyMetrics.infrastructureAvgPct}% <span className="text-xs font-normal text-slate-400">Readiness Score</span>
          </p>
          <div className="mt-3 text-xs text-slate-400 space-y-1">
            <div className="flex justify-between">
              <span>Urgent Maintenance:</span>
              <span className="text-amber-400 font-medium">Canal Sluice #2</span>
            </div>
            <div className="flex justify-between">
              <span>Clinic Power Backup:</span>
              <span className="text-emerald-400 font-mono">100% Ready</span>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-emerald-400 group-hover:translate-x-1 transition-transform">
            <span>Asset maintenance log</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>

      {/* Quick Launch Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/40 to-slate-900 border border-emerald-800/30 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
              <Layers className="w-4 h-4" />
              <span>Digital Twin Spatial Viewer</span>
            </div>
            <h4 className="text-base font-bold text-white mt-1">Explore Village Sensor Matrix</h4>
            <p className="text-xs text-slate-400 mt-1">
              Visualize farm plots, water tanks, transformer nodes, and road sensors on the interactive 2D map.
            </p>
          </div>
          <button
            onClick={() => onNavigate('digital-twin')}
            className="px-4 py-2.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl transition-colors whitespace-nowrap shrink-0 shadow-md"
          >
            Open Map
          </button>
        </div>

        <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-950/40 to-slate-900 border border-purple-800/30 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-purple-400 uppercase tracking-wider">
              <SlidersHorizontal className="w-4 h-4" />
              <span>Predictive What-If Sandbox</span>
            </div>
            <h4 className="text-base font-bold text-white mt-1">Simulate Resource Scenarios</h4>
            <p className="text-xs text-slate-400 mt-1">
              Alter rainfall, pump loads, and temperatures to forecast drought or blackout vulnerabilities.
            </p>
          </div>
          <button
            onClick={() => onNavigate('simulation')}
            className="px-4 py-2.5 text-xs font-semibold text-white bg-purple-600 hover:bg-purple-500 rounded-xl transition-colors whitespace-nowrap shrink-0 shadow-md"
          >
            Launch Sandbox
          </button>
        </div>
      </div>
    </div>
  );
};
