from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database.database import get_db
from ..database.models import WeatherDataModel

router = APIRouter(prefix="/api/weather", tags=["Weather"])

@router.get("")
def get_weather_telemetry(db: Session = Depends(get_db)):
    weather = db.query(WeatherDataModel).order_by(WeatherDataModel.id.desc()).first()
    if not weather:
        return {
            "temperatureC": 34.8,
            "rainfallMm": 0.0,
            "humidityPct": 41,
            "windSpeedKmh": 14.5,
            "uvIndex": 8,
            "barometricPressureHpa": 1011.2,
            "condition": "Sunny",
            "forecast24h": {
                "tempMax": 37.2,
                "tempMin": 23.4,
                "rainProbability": 15,
                "summary": "Dry weather with high heat index. Minimal precipitation expected over the next 48 hours."
            }
        }
    return {
        "temperatureC": weather.temperature_c,
        "rainfallMm": weather.rainfall_mm,
        "humidityPct": int(weather.humidity_pct),
        "windSpeedKmh": weather.wind_speed_kmh,
        "uvIndex": weather.uv_index,
        "barometricPressureHpa": weather.pressure_hpa,
        "condition": weather.condition,
        "forecast24h": {
            "tempMax": 37.2,
            "tempMin": 23.4,
            "rainProbability": 15,
            "summary": weather.forecast_summary or "Clear conditions."
        }
    }
