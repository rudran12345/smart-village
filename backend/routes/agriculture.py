from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database.database import get_db

router = APIRouter(tags=["Agriculture"])

DEMO_CROPS = [
    {
        "id": "field-1",
        "name": "North Sector Paddy Field A",
        "cropType": "Basmati Rice",
        "areaHectares": 14.5,
        "growthStage": "Flowering",
        "soilMoisturePct": 34.0,
        "nitrogenPpm": 48,
        "phosphorusPpm": 22,
        "potassiumPpm": 180,
        "healthIndexNDVI": 0.62,
        "irrigationStatus": "Under-Irrigated",
        "pestDiseaseRisk": "Warning",
        "projectedYieldTons": 42.0
    },
    {
        "id": "field-2",
        "name": "East Plateau Millet Farm",
        "cropType": "Pearl Millet (Bajra)",
        "areaHectares": 22.0,
        "growthStage": "Vegetative",
        "soilMoisturePct": 46.5,
        "nitrogenPpm": 60,
        "phosphorusPpm": 34,
        "potassiumPpm": 210,
        "healthIndexNDVI": 0.78,
        "irrigationStatus": "Optimal",
        "pestDiseaseRisk": "Normal",
        "projectedYieldTons": 58.5
    },
    {
        "id": "field-3",
        "name": "South Valley Pulse & Legumes",
        "cropType": "Chickpeas (Gram)",
        "areaHectares": 18.2,
        "growthStage": "Maturity",
        "soilMoisturePct": 52.0,
        "nitrogenPpm": 55,
        "phosphorusPpm": 29,
        "potassiumPpm": 195,
        "healthIndexNDVI": 0.81,
        "irrigationStatus": "Optimal",
        "pestDiseaseRisk": "Normal",
        "projectedYieldTons": 31.0
    },
    {
        "id": "field-4",
        "name": "West Terrace Vegetable Hub",
        "cropType": "Tomato & Chili Hybrid",
        "areaHectares": 8.6,
        "growthStage": "Vegetative",
        "soilMoisturePct": 29.8,
        "nitrogenPpm": 42,
        "phosphorusPpm": 18,
        "potassiumPpm": 160,
        "healthIndexNDVI": 0.54,
        "irrigationStatus": "Under-Irrigated",
        "pestDiseaseRisk": "Critical",
        "projectedYieldTons": 19.2
    }
]

@router.get("/api/agriculture")
def get_agriculture_data():
    return DEMO_CROPS

@router.get("/api/crops")
def get_crops_data():
    return DEMO_CROPS
