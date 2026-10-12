from fastapi import APIRouter
from ..models.schemas import SimulationRequest, SimulationResponse
from ..ai.simulation_engine import simulation_engine

router = APIRouter(prefix="/api/simulation", tags=["Simulation"])

@router.post("", response_model=SimulationResponse)
def execute_simulation(params: SimulationRequest):
    result = simulation_engine.run_simulation(
        water_level_delta_pct=params.waterLevelDeltaPct,
        electricity_multiplier=params.electricityUsageMultiplier,
        rainfall_mm=params.rainfallMm,
        temperature_c=params.temperatureC,
        soil_moisture_delta_pct=params.soilMoistureDeltaPct
    )
    return result
