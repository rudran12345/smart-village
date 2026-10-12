from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from datetime import datetime
from ..database.database import get_db
from ..database.models import (
    VillageResourceModel,
    WaterDataModel,
    ElectricityDataModel,
    WeatherDataModel,
    EnvironmentalDataModel,
    AlertModel,
)

router = APIRouter(prefix="/api/dashboard", tags=["Dashboard"])

@router.get("")
def get_dashboard_summary(db: Session = Depends(get_db)):
    total_resources = db.query(VillageResourceModel).count()
    water = db.query(WaterDataModel).order_by(WaterDataModel.id.desc()).first()
    elec = db.query(ElectricityDataModel).order_by(ElectricityDataModel.id.desc()).first()
    weather = db.query(WeatherDataModel).order_by(WeatherDataModel.id.desc()).first()
    env = db.query(EnvironmentalDataModel).order_by(EnvironmentalDataModel.id.desc()).first()

    critical_count = db.query(AlertModel).filter(AlertModel.severity == "Critical", AlertModel.acknowledged == False).count()
    warning_count = db.query(AlertModel).filter(AlertModel.severity == "Warning", AlertModel.acknowledged == False).count()

    return {
        "overallHealthPct": 76.0,
        "villageStatus": "Warning",
        "totalMonitoredResources": total_resources or 10,
        "activeAlertsCount": {
            "critical": critical_count or 2,
            "warning": warning_count or 2,
            "normal": 0
        },
        "keyMetrics": {
            "waterReservoirPct": water.reservoir_level_pct if water else 42.5,
            "gridLoadKw": elec.grid_demand_kw if elec else 312.4,
            "cropHealthAvgPct": 69.0,
            "temperatureC": weather.temperature_c if weather else 34.8,
            "aqi": env.aqi if env else 72,
            "infrastructureAvgPct": 77.0
        },
        "lastSyncedAt": datetime.utcnow().strftime("%H:%M:%S UTC")
    }
