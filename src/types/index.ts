/**
 * Data contracts and schema interfaces for Smart Village AI Digital Twin
 */

export type StatusLevel = 'Normal' | 'Warning' | 'Critical';
export type ResourceCategory = 'water' | 'agriculture' | 'crop' | 'electricity' | 'weather' | 'environment' | 'infrastructure';

export interface VillageResource {
  id: string;
  name: string;
  category: ResourceCategory;
  status: StatusLevel;
  value: number;
  unit: string;
  nominalRange: { min: number; max: number };
  zone: string;
  coordinates: { x: number; y: number };
  lastUpdated: string;
  description: string;
}

export interface WaterData {
  reservoirLevelPct: number;
  groundwaterDepthMeters: number;
  dailyConsumptionKLD: number; // Kilo Liters per Day
  waterQualityTDS: number; // ppm
  supplyStatus: 'Continuous' | 'Rationed' | 'Restricted';
  pumpsOperating: number;
  totalPumps: number;
  pipePressureBar: number;
  leakRisk: 'Low' | 'Moderate' | 'High';
}

export interface CropField {
  id: string;
  name: string;
  cropType: string;
  areaHectares: number;
  growthStage: 'Vegetative' | 'Flowering' | 'Maturity' | 'Harvest Ready';
  soilMoisturePct: number;
  nitrogenPpm: number;
  phosphorusPpm: number;
  potassiumPpm: number;
  healthIndexNDVI: number; // 0.0 - 1.0
  irrigationStatus: 'Optimal' | 'Under-Irrigated' | 'Over-Irrigated';
  pestDiseaseRisk: StatusLevel;
  projectedYieldTons: number;
}

export interface ElectricityData {
  gridDemandKw: number;
  solarGenerationKw: number;
  batteryStoragePct: number;
  transformerLoadPct: number;
  frequencyHz: number;
  voltageV: number;
  blackoutRisk: StatusLevel;
  carbonOffsetKg: number;
}

export interface WeatherData {
  temperatureC: number;
  rainfallMm: number;
  humidityPct: number;
  windSpeedKmh: number;
  uvIndex: number;
  barometricPressureHpa: number;
  condition: 'Sunny' | 'Partly Cloudy' | 'Cloudy' | 'Showers' | 'Heavy Rain' | 'Heatwave';
  forecast24h: {
    tempMax: number;
    tempMin: number;
    rainProbability: number;
    summary: string;
  };
}

export interface EnvironmentalData {
  aqi: number;
  pm25: number;
  co2Ppm: number;
  ambientNoiseDb: number;
  soilSalinityDsm: number;
  airQualityStatus: StatusLevel;
}

export interface InfrastructureItem {
  id: string;
  name: string;
  type: 'Road' | 'Primary Health Clinic' | 'Community School' | 'Pumping Station' | 'Solar Substation' | 'Cold Storage Unit';
  healthScorePct: number;
  operationalStatus: 'Fully Functional' | 'Needs Maintenance' | 'Service Interruption';
  riskLevel: StatusLevel;
  lastInspected: string;
  criticality: 'High' | 'Medium' | 'Low';
}

export interface HistoricalRecord {
  timestamp: string;
  waterLevelPct: number;
  electricityKw: number;
  soilMoisturePct: number;
  temperatureC: number;
  rainfallMm: number;
  aqi: number;
}

export interface AIPrediction {
  id: string;
  category: ResourceCategory;
  resourceName: string;
  currentValue: string;
  predictedValue: string;
  predictionPeriod: string;
  riskLevel: StatusLevel;
  confidenceScore: number; // 0 - 100
  trend: 'Rising' | 'Stable' | 'Declining' | 'Volatile';
  explanation: string;
  recommendation: string;
}

export interface DetectedRisk {
  id: string;
  category: ResourceCategory;
  title: string;
  severity: StatusLevel;
  reason: string;
  impactArea: string;
  detectedAt: string;
  affectedPopulation: number;
  remedyHint: string;
}

export interface VillageAlert {
  id: string;
  category: ResourceCategory;
  severity: StatusLevel;
  title: string;
  message: string;
  timestamp: string;
  acknowledged: boolean;
  actionRequired: string;
}

export interface AIRecommendation {
  id: string;
  category: ResourceCategory;
  priority: 'High' | 'Medium' | 'Low';
  title: string;
  description: string;
  expectedBenefit: string;
  resourceTarget: string;
  steps: string[];
}

export interface SimulationParams {
  waterLevelDeltaPct: number; // e.g. -25%
  electricityUsageMultiplier: number; // e.g. 1.3x
  rainfallMm: number; // e.g. 0 mm or 55 mm
  temperatureC: number; // e.g. 38 C
  soilMoistureDeltaPct: number; // e.g. -15%
}

export interface SimulationResult {
  isSimulated: true;
  waterStressIndexPct: number;
  blackoutRiskProbabilityPct: number;
  cropYieldImpactPct: number; // negative is yield loss
  overallVillageHealthPct: number;
  simulatedRiskLevel: StatusLevel;
  predictedOutcomes: string[];
  recommendedMitigations: string[];
  resourceProjections: {
    resource: string;
    baseline: string;
    simulated: string;
    status: StatusLevel;
  }[];
}

export interface VillageHealthOverview {
  overallHealthPct: number;
  villageStatus: StatusLevel;
  totalMonitoredResources: number;
  activeAlertsCount: {
    critical: number;
    warning: number;
    normal: number;
  };
  keyMetrics: {
    waterReservoirPct: number;
    gridLoadKw: number;
    cropHealthAvgPct: number;
    temperatureC: number;
    aqi: number;
    infrastructureAvgPct: number;
  };
  lastSyncedAt: string;
}
