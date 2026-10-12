/**
 * SmartVillage - Cloud-Based AI Digital Twin for Smart Village Resource Monitoring
 * Main Application Controller & View Orchestrator
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { OverviewDashboard } from './components/dashboard/OverviewDashboard';
import { DigitalTwinMap } from './components/digitaltwin/DigitalTwinMap';
import { WaterModule } from './components/modules/WaterModule';
import { AgricultureModule } from './components/modules/AgricultureModule';
import { ElectricityModule } from './components/modules/ElectricityModule';
import { WeatherModule } from './components/modules/WeatherModule';
import { EnvironmentModule } from './components/modules/EnvironmentModule';
import { InfrastructureModule } from './components/modules/InfrastructureModule';
import { HistoricalAnalysis } from './components/modules/HistoricalAnalysis';
import { PredictionsModule } from './components/modules/PredictionsModule';
import { RiskDetectionModule } from './components/modules/RiskDetectionModule';
import { SimulationSandbox } from './components/modules/SimulationSandbox';
import { AlertsModule } from './components/modules/AlertsModule';
import { RecommendationsModule } from './components/modules/RecommendationsModule';
import { CloudDeploymentGuide } from './components/modules/CloudDeploymentGuide';
import { api } from './services/apiClient';
import {
  VillageHealthOverview,
  VillageResource,
  WaterData,
  CropField,
  ElectricityData,
  WeatherData,
  EnvironmentalData,
  InfrastructureItem,
  HistoricalRecord,
  AIPrediction,
  DetectedRisk,
  VillageAlert,
  AIRecommendation,
} from './types';
import {
  DEMO_WATER_DATA,
  DEMO_CROP_FIELDS,
  DEMO_ELECTRICITY_DATA,
  DEMO_WEATHER_DATA,
  DEMO_ENVIRONMENTAL_DATA,
  DEMO_INFRASTRUCTURE,
  DEMO_RESOURCES,
  DEMO_HISTORICAL_DATA,
  DEMO_PREDICTIONS,
  DEMO_RISKS,
  DEMO_ALERTS,
  DEMO_RECOMMENDATIONS,
} from './services/villageData';
import { Menu } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isRemoteConnected, setIsRemoteConnected] = useState<boolean>(false);

  // Core State
  const [overview, setOverview] = useState<VillageHealthOverview>({
    overallHealthPct: 76,
    villageStatus: 'Warning',
    totalMonitoredResources: DEMO_RESOURCES.length,
    activeAlertsCount: { critical: 2, warning: 2, normal: 0 },
    keyMetrics: {
      waterReservoirPct: 42.5,
      gridLoadKw: 312.4,
      cropHealthAvgPct: 69,
      temperatureC: 34.8,
      aqi: 72,
      infrastructureAvgPct: 77,
    },
    lastSyncedAt: new Date().toLocaleTimeString(),
  });

  const [resources, setResources] = useState<VillageResource[]>(DEMO_RESOURCES);
  const [water, setWater] = useState<WaterData>(DEMO_WATER_DATA);
  const [crops, setCrops] = useState<CropField[]>(DEMO_CROP_FIELDS);
  const [electricity, setElectricity] = useState<ElectricityData>(DEMO_ELECTRICITY_DATA);
  const [weather, setWeather] = useState<WeatherData>(DEMO_WEATHER_DATA);
  const [environment, setEnvironment] = useState<EnvironmentalData>(DEMO_ENVIRONMENTAL_DATA);
  const [infrastructure, setInfrastructure] = useState<InfrastructureItem[]>(DEMO_INFRASTRUCTURE);
  const [historical, setHistorical] = useState<HistoricalRecord[]>(DEMO_HISTORICAL_DATA);
  const [predictions, setPredictions] = useState<AIPrediction[]>(DEMO_PREDICTIONS);
  const [risks, setRisks] = useState<DetectedRisk[]>(DEMO_RISKS);
  const [alerts, setAlerts] = useState<VillageAlert[]>(DEMO_ALERTS);
  const [recommendations, setRecommendations] = useState<AIRecommendation[]>(DEMO_RECOMMENDATIONS);

  // Initialize and load data
  useEffect(() => {
    async function loadInitial() {
      const [
        dash,
        resList,
        wtr,
        crp,
        elec,
        wth,
        env,
        infra,
        hist,
        preds,
        rsk,
        alrts,
        recs,
        health,
      ] = await Promise.all([
        api.getDashboard(),
        api.getResources(),
        api.getWater(),
        api.getCrops(),
        api.getElectricity(),
        api.getWeather(),
        api.getEnvironment(),
        api.getInfrastructure(),
        api.getHistorical(),
        api.getPredictions(),
        api.getRisks(),
        api.getAlerts(),
        api.getRecommendations(),
        api.checkHealth(),
      ]);

      if (dash) setOverview(dash);
      if (resList) setResources(resList);
      if (wtr) setWater(wtr);
      if (crp) setCrops(crp);
      if (elec) setElectricity(elec);
      if (wth) setWeather(wth);
      if (env) setEnvironment(env);
      if (infra) setInfrastructure(infra);
      if (hist) setHistorical(hist);
      if (preds) setPredictions(preds);
      if (rsk) setRisks(rsk);
      if (alrts) setAlerts(alrts);
      if (recs) setRecommendations(recs);
      setIsRemoteConnected(health.status === 'online');
    }
    loadInitial();
  }, []);

  // Listen for custom navigation events
  useEffect(() => {
    const handleNav = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail) {
        if (detail === 'crop') setCurrentTab('agriculture');
        else setCurrentTab(detail);
      }
    };
    window.addEventListener('navigate-to-section', handleNav);
    return () => window.removeEventListener('navigate-to-section', handleNav);
  }, []);

  // Active prediction helper
  const waterPrediction = predictions.find((p) => p.category === 'water');
  const cropPrediction = predictions.find((p) => p.category === 'crop');
  const elecPrediction = predictions.find((p) => p.category === 'electricity');
  const weatherPrediction = predictions.find((p) => p.category === 'weather');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col antialiased">
      {/* Top Bar */}
      <Header
        currentTab={currentTab}
        onNavigate={setCurrentTab}
        onOpenDeployModal={() => setCurrentTab('deployment')}
        isRemoteConnected={isRemoteConnected}
      />

      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar
          currentTab={currentTab}
          onNavigate={setCurrentTab}
          isOpenMobile={isMobileMenuOpen}
          onCloseMobile={() => setIsMobileMenuOpen(false)}
          alertsCount={alerts.filter((a) => !a.acknowledged).length}
        />

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col min-w-0">
          {/* Mobile Top Context Strip */}
          <div className="lg:hidden flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800 text-xs">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="flex items-center gap-2 text-slate-300 hover:text-white"
            >
              <Menu className="w-4 h-4" />
              <span className="font-semibold capitalize">{currentTab.replace('-', ' ')}</span>
            </button>
            <span className="text-[11px] text-amber-400 font-medium">Demo Data</span>
          </div>

          {/* Viewport Content */}
          <div className="flex-1 p-4 md:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
            {currentTab === 'dashboard' && (
              <OverviewDashboard
                overview={overview}
                water={water}
                electricity={electricity}
                weather={weather}
                environment={environment}
                alerts={alerts}
                risks={risks}
                onNavigate={setCurrentTab}
              />
            )}

            {currentTab === 'digital-twin' && (
              <DigitalTwinMap
                resources={resources}
                onSelectResource={(res) => {
                  console.log('Selected twin node:', res.name);
                }}
              />
            )}

            {currentTab === 'water' && (
              <WaterModule
                water={water}
                historical={historical}
                prediction={waterPrediction}
                onNavigateToSim={() => setCurrentTab('simulation')}
              />
            )}

            {currentTab === 'agriculture' && (
              <AgricultureModule
                fields={crops}
                prediction={cropPrediction}
                onNavigateToSim={() => setCurrentTab('simulation')}
              />
            )}

            {currentTab === 'electricity' && (
              <ElectricityModule
                electricity={electricity}
                historical={historical}
                prediction={elecPrediction}
                onNavigateToSim={() => setCurrentTab('simulation')}
              />
            )}

            {currentTab === 'weather' && (
              <WeatherModule
                weather={weather}
                historical={historical}
                prediction={weatherPrediction}
                onNavigateToSim={() => setCurrentTab('simulation')}
              />
            )}

            {currentTab === 'environment' && (
              <EnvironmentModule
                environment={environment}
                historical={historical}
                onNavigateToSim={() => setCurrentTab('simulation')}
              />
            )}

            {currentTab === 'infrastructure' && (
              <InfrastructureModule infrastructure={infrastructure} />
            )}

            {currentTab === 'historical' && (
              <HistoricalAnalysis historical={historical} />
            )}

            {currentTab === 'predictions' && (
              <PredictionsModule
                predictions={predictions}
                onNavigateToSim={() => setCurrentTab('simulation')}
              />
            )}

            {currentTab === 'risks' && (
              <RiskDetectionModule risks={risks} />
            )}

            {currentTab === 'simulation' && (
              <SimulationSandbox />
            )}

            {currentTab === 'alerts' && (
              <AlertsModule
                alerts={alerts}
                onNavigateToCategory={(cat) => {
                  if (cat === 'crop') setCurrentTab('agriculture');
                  else setCurrentTab(cat);
                }}
              />
            )}

            {currentTab === 'recommendations' && (
              <RecommendationsModule recommendations={recommendations} />
            )}

            {currentTab === 'deployment' && (
              <CloudDeploymentGuide
                onConnectionChange={(online) => setIsRemoteConnected(online)}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
