from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database.database import get_db
from ..database.models import ElectricityDataModel

router = APIRouter(prefix="/api/electricity", tags=["Electricity"])

@router.get("")
def get_electricity_telemetry(db: Session = Depends(get_db)):
    elec = db.query(ElectricityDataModel).order_by(ElectricityDataModel.id.desc()).first()
    if not elec:
        return {
            "gridDemandKw": 312.4,
            "solarGenerationKw": 185.6,
            "batteryStoragePct": 68.0,
            "transformerLoadPct": 78.5,
            "frequencyHz": 49.92,
            "voltageV": 232.0,
            "blackoutRisk": "Warning",
            "carbonOffsetKg": 420.5
        }
    return {
        "gridDemandKw": elec.grid_demand_kw,
        "solarGenerationKw": elec.solar_generation_kw,
        "batteryStoragePct": elec.battery_storage_pct,
        "transformerLoadPct": elec.transformer_load_pct,
        "frequencyHz": elec.frequency_hz,
        "voltageV": elec.voltage_v,
        "blackoutRisk": elec.blackout_risk,
        "carbonOffsetKg": 420.5
    }
