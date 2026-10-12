/**
 * Baseline AI Engine & What-If Simulation Algorithms
 * 
 * NOTE: This is a modular baseline algorithmic engine for prototype demonstration,
 * time-series trend extrapolation, and multi-variable what-if resilience modeling.
 * In production, this interfaces directly with the Python FastAPI ML microservice.
 */

import {
  SimulationParams,
  SimulationResult,
  StatusLevel,
  VillageResource,
  AIPrediction,
} from '../types';

export function runWhatIfSimulation(params: SimulationParams): SimulationResult {
  const {
    waterLevelDeltaPct,
    electricityUsageMultiplier,
    rainfallMm,
    temperatureC,
    soilMoistureDeltaPct,
  } = params;

  // Baseline reference values
  const baseWaterLevel = 42.5; // %
  const baseElectricityKw = 312.4; // kW (max transformer capacity is 400 kW)
  const baseSoilMoisture = 34.0; // %

  // Simulated dynamic values
  const simulatedWaterLevel = Math.max(0, Math.min(100, baseWaterLevel + waterLevelDeltaPct + (rainfallMm * 0.45)));
  const simulatedElectricityKw = baseElectricityKw * electricityUsageMultiplier;
  const simulatedSoilMoisture = Math.max(5, Math.min(95, baseSoilMoisture + soilMoistureDeltaPct + (rainfallMm * 0.6) - (Math.max(0, temperatureC - 30) * 0.8)));

  // 1. Water Stress Index (0 = no stress, 100 = catastrophic shortage)
  let waterStress = 100 - simulatedWaterLevel;
  if (rainfallMm < 5) waterStress += 15;
  if (temperatureC > 36) waterStress += 10;
  waterStress = Math.max(5, Math.min(98, Math.round(waterStress)));

  // 2. Blackout Risk Probability (0 = zero risk, 100 = imminent grid failure)
  const transformerCapacityKw = 400.0;
  const loadRatio = simulatedElectricityKw / transformerCapacityKw;
  let blackoutRisk = Math.round(loadRatio * 75);
  if (temperatureC > 38) blackoutRisk += 12; // thermal derating of transformers
  blackoutRisk = Math.max(4, Math.min(99, blackoutRisk));

  // 3. Crop Yield Impact (%)
  // Normal optimal soil moisture is 45-65%. Deviation hurts yield.
  let cropYieldImpact = 0;
  if (simulatedSoilMoisture < 35) {
    cropYieldImpact = -Math.round((35 - simulatedSoilMoisture) * 1.6);
  } else if (simulatedSoilMoisture > 75) {
    cropYieldImpact = -Math.round((simulatedSoilMoisture - 75) * 1.2); // waterlogging
  } else {
    cropYieldImpact = Math.round((simulatedSoilMoisture - 35) * 0.5); // healthy boost
  }
  if (temperatureC > 38) cropYieldImpact -= 8; // heat wave sterility

  // 4. Overall Village Health Score (0 - 100%)
  const waterHealth = simulatedWaterLevel;
  const energyHealth = Math.max(0, 100 - (loadRatio > 1 ? 95 : loadRatio * 85));
  const agriHealth = Math.max(10, Math.min(100, 50 + cropYieldImpact * 2));
  const overallVillageHealth = Math.max(5, Math.min(98, Math.round((waterHealth * 0.4) + (energyHealth * 0.3) + (agriHealth * 0.3))));

  // Risk Classification
  let simulatedRiskLevel: StatusLevel = 'Normal';
  if (overallVillageHealth < 45 || blackoutRisk > 85 || simulatedWaterLevel < 25) {
    simulatedRiskLevel = 'Critical';
  } else if (overallVillageHealth < 70 || blackoutRisk > 65 || simulatedWaterLevel < 45) {
    simulatedRiskLevel = 'Warning';
  }

  // Predicted Outcomes Narrative
  const predictedOutcomes: string[] = [];
  if (simulatedWaterLevel < 30) {
    predictedOutcomes.push(`Reservoir reserves plunge to ${simulatedWaterLevel.toFixed(1)}%, triggering emergency water rationing for domestic zones.`);
  } else if (simulatedWaterLevel > 75) {
    predictedOutcomes.push(`Reservoir storage stabilizes at a safe ${simulatedWaterLevel.toFixed(1)}% with ample buffer for multi-week irrigation.`);
  } else {
    predictedOutcomes.push(`Reservoir operates at moderate ${simulatedWaterLevel.toFixed(1)}% capacity; requires monitored discharge.`);
  }

  if (loadRatio > 0.9) {
    predictedOutcomes.push(`Transformer peak load reaches ${(loadRatio * 100).toFixed(1)}% (${simulatedElectricityKw.toFixed(0)} kW), resulting in a high ${blackoutRisk}% blackout probability.`);
  } else {
    predictedOutcomes.push(`Grid demand remains manageable at ${simulatedElectricityKw.toFixed(0)} kW (${(loadRatio * 100).toFixed(1)}% capacity) with stable frequency.`);
  }

  if (cropYieldImpact < -10) {
    predictedOutcomes.push(`Projected agricultural harvest drop of ${Math.abs(cropYieldImpact)}% due to chronic moisture stress and temperature elevation.`);
  } else if (cropYieldImpact > 0) {
    predictedOutcomes.push(`Positive crop response (+${cropYieldImpact}% yield improvement) supported by optimal root zone moisture.`);
  } else {
    predictedOutcomes.push(`Crop development remains near baseline projection with minimal physiological yield loss.`);
  }

  // Recommended Mitigations
  const recommendedMitigations: string[] = [];
  if (simulatedWaterLevel < 35) {
    recommendedMitigations.push('Prioritize essential community drinking water lines; halt field flooding and switch to targeted nocturnal drip systems.');
  }
  if (loadRatio > 0.85) {
    recommendedMitigations.push('Implement staggered duty-cycling of high-power 7.5 HP agricultural tubewell motors to flatten evening demand peaks.');
  }
  if (temperatureC > 36) {
    recommendedMitigations.push('Apply protective straw mulch across horticultural beds to reduce soil surface evaporation and root heat stress.');
  }
  if (rainfallMm > 40) {
    recommendedMitigations.push('Open secondary check-dam runoff sluices to prevent localized field inundation and root rot.');
  }
  if (recommendedMitigations.length === 0) {
    recommendedMitigations.push('Maintain existing resource allocation protocols; village operates inside resilient sustainable thresholds.');
  }

  return {
    isSimulated: true,
    waterStressIndexPct: waterStress,
    blackoutRiskProbabilityPct: blackoutRisk,
    cropYieldImpactPct: cropYieldImpact,
    overallVillageHealthPct: overallVillageHealth,
    simulatedRiskLevel,
    predictedOutcomes,
    recommendedMitigations,
    resourceProjections: [
      {
        resource: 'Central Water Reservoir',
        baseline: `${baseWaterLevel.toFixed(1)}%`,
        simulated: `${simulatedWaterLevel.toFixed(1)}%`,
        status: simulatedWaterLevel < 30 ? 'Critical' : simulatedWaterLevel < 50 ? 'Warning' : 'Normal',
      },
      {
        resource: 'Grid Distribution Load',
        baseline: `${baseElectricityKw.toFixed(0)} kW`,
        simulated: `${simulatedElectricityKw.toFixed(0)} kW`,
        status: loadRatio > 0.9 ? 'Critical' : loadRatio > 0.75 ? 'Warning' : 'Normal',
      },
      {
        resource: 'Agricultural Soil Moisture',
        baseline: `${baseSoilMoisture.toFixed(1)}%`,
        simulated: `${simulatedSoilMoisture.toFixed(1)}%`,
        status: simulatedSoilMoisture < 30 ? 'Critical' : simulatedSoilMoisture < 40 ? 'Warning' : 'Normal',
      },
      {
        resource: 'Thermal Comfort Index',
        baseline: '34.8 °C',
        simulated: `${temperatureC.toFixed(1)} °C`,
        status: temperatureC > 38 ? 'Critical' : temperatureC > 34 ? 'Warning' : 'Normal',
      },
    ],
  };
}

/**
 * Baseline Linear & Exponential trend extrapolation for time-series telemetry
 */
export function calculateResourceTrend(dataPoints: number[]): {
  slope: number;
  direction: 'Rising' | 'Stable' | 'Declining';
  nextPredictedValue: number;
} {
  if (dataPoints.length < 2) {
    return { slope: 0, direction: 'Stable', nextPredictedValue: dataPoints[0] || 0 };
  }

  const n = dataPoints.length;
  let sumX = 0;
  let sumY = 0;
  let sumXY = 0;
  let sumXX = 0;

  for (let i = 0; i < n; i++) {
    sumX += i;
    sumY += dataPoints[i];
    sumXY += i * dataPoints[i];
    sumXX += i * i;
  }

  const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;
  const nextVal = intercept + slope * n;

  let direction: 'Rising' | 'Stable' | 'Declining' = 'Stable';
  if (slope > 0.2) direction = 'Rising';
  else if (slope < -0.2) direction = 'Declining';

  return {
    slope,
    direction,
    nextPredictedValue: Number(nextVal.toFixed(1)),
  };
}
