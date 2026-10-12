from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database.database import get_db
from ..database.models import WaterDataModel

router = APIRouter(prefix="/api/water", tags=["Water"])

@router.get("")
def get_water_telemetry(db: Session = Depends(get_db)):
    water = db.query(WaterDataModel).order_by(WaterDataModel.id.desc()).first()
    if not water:
        return {
            "reservoirLevelPct": 42.5,
            "groundwaterDepthMeters": 28.4,
            "dailyConsumptionKLD": 185.0,
            "waterQualityTDS": 310,
            "supplyStatus": "Rationed",
            "pumpsOperating": 3,
            "totalPumps": 4,
            "pipePressureBar": 3.2,
            "leakRisk": "Moderate"
        }
    return {
        "reservoirLevelPct": water.reservoir_level_pct,
        "groundwaterDepthMeters": water.groundwater_depth_m,
        "dailyConsumptionKLD": water.daily_consumption_kld,
        "waterQualityTDS": water.water_quality_tds,
        "supplyStatus": water.supply_status,
        "pumpsOperating": water.pumps_operating,
        "totalPumps": water.total_pumps,
        "pipePressureBar": water.pipe_pressure_bar,
        "leakRisk": water.leak_risk
    }
