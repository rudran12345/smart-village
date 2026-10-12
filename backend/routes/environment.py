from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database.database import get_db
from ..database.models import EnvironmentalDataModel

router = APIRouter(prefix="/api/environment", tags=["Environment"])

@router.get("")
def get_environmental_telemetry(db: Session = Depends(get_db)):
    env = db.query(EnvironmentalDataModel).order_by(EnvironmentalDataModel.id.desc()).first()
    if not env:
        return {
            "aqi": 72,
            "pm25": 22.4,
            "co2Ppm": 418,
            "ambientNoiseDb": 46.2,
            "soilSalinityDsm": 1.2,
            "airQualityStatus": "Normal"
        }
    return {
        "aqi": env.aqi,
        "pm25": env.pm25,
        "co2Ppm": env.co2_ppm,
        "ambientNoiseDb": env.ambient_noise_db,
        "soilSalinityDsm": env.soil_salinity_dsm,
        "airQualityStatus": "Normal" if env.aqi < 100 else "Warning"
    }
