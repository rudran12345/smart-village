from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database.database import get_db
from ..database.models import HistoricalDataModel

router = APIRouter(prefix="/api/historical", tags=["Historical Data"])

@router.get("/{resource_type}")
def get_historical_telemetry(resource_type: str = "all", db: Session = Depends(get_db)):
    records = db.query(HistoricalDataModel).order_by(HistoricalDataModel.id.asc()).all()
    if not records:
        return [
            {"timestamp": "06:00", "waterLevelPct": 52.0, "electricityKw": 140, "soilMoisturePct": 42.0, "temperatureC": 24.2, "rainfallMm": 0, "aqi": 54},
            {"timestamp": "08:00", "waterLevelPct": 49.5, "electricityKw": 210, "soilMoisturePct": 40.5, "temperatureC": 27.5, "rainfallMm": 0, "aqi": 61},
            {"timestamp": "10:00", "waterLevelPct": 46.2, "electricityKw": 285, "soilMoisturePct": 38.0, "temperatureC": 31.0, "rainfallMm": 0, "aqi": 68},
            {"timestamp": "12:00", "waterLevelPct": 44.0, "electricityKw": 330, "soilMoisturePct": 35.5, "temperatureC": 34.2, "rainfallMm": 0, "aqi": 75},
            {"timestamp": "14:00", "waterLevelPct": 42.5, "electricityKw": 312, "soilMoisturePct": 34.0, "temperatureC": 34.8, "rainfallMm": 0, "aqi": 72},
            {"timestamp": "16:00 (Est)", "waterLevelPct": 40.8, "electricityKw": 295, "soilMoisturePct": 32.5, "temperatureC": 33.5, "rainfallMm": 0, "aqi": 70},
            {"timestamp": "18:00 (Est)", "waterLevelPct": 39.2, "electricityKw": 345, "soilMoisturePct": 31.8, "temperatureC": 30.1, "rainfallMm": 0, "aqi": 74},
            {"timestamp": "20:00 (Est)", "waterLevelPct": 37.5, "electricityKw": 320, "soilMoisturePct": 31.0, "temperatureC": 27.8, "rainfallMm": 0, "aqi": 69}
        ]
    return [
        {
            "timestamp": r.timestamp_label,
            "waterLevelPct": r.water_level_pct,
            "electricityKw": r.electricity_kw,
            "soilMoisturePct": r.soil_moisture_pct,
            "temperatureC": r.temperature_c,
            "rainfallMm": r.rainfall_mm,
            "aqi": r.aqi
        }
        for r in records
    ]
