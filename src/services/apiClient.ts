/**
 * Unified API Client for Smart Village Digital Twin
 * 
 * Provides dual mode:
 * 1. Live Remote FastAPI Backend (e.g. Render / local http://localhost:8000)
 * 2. Embedded Client-Side Simulation & Telemetry Engine (Zero-latency fallback)
 */

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
} from './villageData';
import { runWhatIfSimulation } from './aiEngine';
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
  SimulationParams,
  SimulationResult,
} from '../types';

export class VillageApiClient {
  private baseUrl: string;
  private useRemote: boolean;

  constructor() {
    // Check saved URL or env var
    const savedUrl = typeof window !== 'undefined' ? localStorage.getItem('SMART_VILLAGE_API_URL') : null;
    const envUrl = (import.meta as any).env?.VITE_API_URL;
    this.baseUrl = savedUrl || envUrl || 'http://localhost:8000';
    this.useRemote = typeof window !== 'undefined' ? localStorage.getItem('SMART_VILLAGE_USE_REMOTE') === 'true' : false;
  }

  public getBaseUrl(): string {
    return this.baseUrl;
  }

  public setBaseUrl(url: string, enableRemote: boolean = true) {
    this.baseUrl = url.replace(/\/+$/, '');
    this.useRemote = enableRemote;
    if (typeof window !== 'undefined') {
      localStorage.setItem('SMART_VILLAGE_API_URL', this.baseUrl);
      localStorage.setItem('SMART_VILLAGE_USE_REMOTE', enableRemote ? 'true' : 'false');
    }
  }

  public isRemoteMode(): boolean {
    return this.useRemote;
  }

  public setRemoteMode(enabled: boolean) {
    this.useRemote = enabled;
    if (typeof window !== 'undefined') {
      localStorage.setItem('SMART_VILLAGE_USE_REMOTE', enabled ? 'true' : 'false');
    }
  }

  /**
   * Healthcheck prober to verify FastAPI connectivity
   */
  public async checkHealth(): Promise<{ status: 'online' | 'offline'; latencyMs: number; details?: any }> {
    const start = performance.now();
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);

      const res = await fetch(`${this.baseUrl}/health`, {
        signal: controller.signal,
        headers: { 'Accept': 'application/json' },
      });
      clearTimeout(timeoutId);

      const latencyMs = Math.round(performance.now() - start);
      if (res.ok) {
        const data = await res.json();
        return { status: 'online', latencyMs, details: data };
      }
      return { status: 'offline', latencyMs };
    } catch {
      return { status: 'offline', latencyMs: Math.round(performance.now() - start) };
    }
  }

  private async fetchRemote<T>(endpoint: string, options?: RequestInit): Promise<T | null> {
    if (!this.useRemote) return null;
    try {
      const res = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          ...(options?.headers || {}),
        },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      return await res.json();
    } catch (err) {
      console.warn(`Remote API fetch failed for ${endpoint}, falling back to built-in telemetry:`, err);
      return null;
    }
  }

  // 1. Dashboard Overview
  public async getDashboard(): Promise<VillageHealthOverview> {
    const remote = await this.fetchRemote<VillageHealthOverview>('/api/dashboard');
    if (remote) return remote;

    return {
      overallHealthPct: 76,
      villageStatus: 'Warning',
      totalMonitoredResources: DEMO_RESOURCES.length,
      activeAlertsCount: {
        critical: DEMO_ALERTS.filter(a => a.severity === 'Critical').length,
        warning: DEMO_ALERTS.filter(a => a.severity === 'Warning').length,
        normal: DEMO_ALERTS.filter(a => a.severity === 'Normal').length,
      },
      keyMetrics: {
        waterReservoirPct: DEMO_WATER_DATA.reservoirLevelPct,
        gridLoadKw: DEMO_ELECTRICITY_DATA.gridDemandKw,
        cropHealthAvgPct: 69,
        temperatureC: DEMO_WEATHER_DATA.temperatureC,
        aqi: DEMO_ENVIRONMENTAL_DATA.aqi,
        infrastructureAvgPct: 77,
      },
      lastSyncedAt: new Date().toLocaleTimeString(),
    };
  }

  // 2. Resources List
  public async getResources(): Promise<VillageResource[]> {
    const remote = await this.fetchRemote<VillageResource[]>('/api/resources');
    return remote || DEMO_RESOURCES;
  }

  // 3. Water telemetry
  public async getWater(): Promise<WaterData> {
    const remote = await this.fetchRemote<WaterData>('/api/water');
    return remote || DEMO_WATER_DATA;
  }

  // 4. Agriculture & Crops
  public async getAgriculture(): Promise<CropField[]> {
    const remote = await this.fetchRemote<CropField[]>('/api/agriculture');
    return remote || DEMO_CROP_FIELDS;
  }

  public async getCrops(): Promise<CropField[]> {
    const remote = await this.fetchRemote<CropField[]>('/api/crops');
    return remote || DEMO_CROP_FIELDS;
  }

  // 5. Electricity
  public async getElectricity(): Promise<ElectricityData> {
    const remote = await this.fetchRemote<ElectricityData>('/api/electricity');
    return remote || DEMO_ELECTRICITY_DATA;
  }

  // 6. Weather
  public async getWeather(): Promise<WeatherData> {
    const remote = await this.fetchRemote<WeatherData>('/api/weather');
    return remote || DEMO_WEATHER_DATA;
  }

  // 7. Environment
  public async getEnvironment(): Promise<EnvironmentalData> {
    const remote = await this.fetchRemote<EnvironmentalData>('/api/environment');
    return remote || DEMO_ENVIRONMENTAL_DATA;
  }

  // 8. Infrastructure
  public async getInfrastructure(): Promise<InfrastructureItem[]> {
    const remote = await this.fetchRemote<InfrastructureItem[]>('/api/infrastructure');
    return remote || DEMO_INFRASTRUCTURE;
  }

  // 9. Historical time series
  public async getHistorical(_resourceCategory: string = 'all'): Promise<HistoricalRecord[]> {
    const remote = await this.fetchRemote<HistoricalRecord[]>(`/api/historical/${_resourceCategory}`);
    return remote || DEMO_HISTORICAL_DATA;
  }

  // 10. AI Predictions
  public async getPredictions(_resourceCategory: string = 'all'): Promise<AIPrediction[]> {
    const remote = await this.fetchRemote<AIPrediction[]>(`/api/predictions/${_resourceCategory}`);
    return remote || DEMO_PREDICTIONS;
  }

  // 11. Risks
  public async getRisks(): Promise<DetectedRisk[]> {
    const remote = await this.fetchRemote<DetectedRisk[]>('/api/risks');
    return remote || DEMO_RISKS;
  }

  // 12. Alerts
  public async getAlerts(): Promise<VillageAlert[]> {
    const remote = await this.fetchRemote<VillageAlert[]>('/api/alerts');
    return remote || DEMO_ALERTS;
  }

  // 13. Recommendations
  public async getRecommendations(): Promise<AIRecommendation[]> {
    const remote = await this.fetchRemote<AIRecommendation[]>('/api/recommendations');
    return remote || DEMO_RECOMMENDATIONS;
  }

  // 14. What-If Simulation
  public async runSimulation(params: SimulationParams): Promise<SimulationResult> {
    const remote = await this.fetchRemote<SimulationResult>('/api/simulation', {
      method: 'POST',
      body: JSON.stringify(params),
    });
    return remote || runWhatIfSimulation(params);
  }

  // 15. Create Resource
  public async addResource(resource: Partial<VillageResource>): Promise<VillageResource> {
    const remote = await this.fetchRemote<VillageResource>('/api/resources', {
      method: 'POST',
      body: JSON.stringify(resource),
    });
    if (remote) return remote;

    const newRes: VillageResource = {
      id: `res-${Date.now()}`,
      name: resource.name || 'New Village Node',
      category: resource.category || 'water',
      status: resource.status || 'Normal',
      value: resource.value || 50,
      unit: resource.unit || '%',
      nominalRange: resource.nominalRange || { min: 20, max: 80 },
      zone: resource.zone || 'Central Sector',
      coordinates: resource.coordinates || { x: 300, y: 300 },
      lastUpdated: 'Just added',
      description: resource.description || 'Custom provisioned telemetry node.',
    };
    return newRes;
  }
}

export const api = new VillageApiClient();
