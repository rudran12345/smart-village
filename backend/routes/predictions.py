from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database.database import get_db

router = APIRouter(prefix="/api/predictions", tags=["Predictions"])

PREDICTIONS_DATA = [
    {
        "id": "pred-1",
        "category": "water",
        "resourceName": "Central Village Water Reservoir",
        "currentValue": "42.5% Capacity",
        "predictedValue": "28.0% Capacity in 48h",
        "predictionPeriod": "48 Hours Ahead",
        "riskLevel": "Critical",
        "confidenceScore": 89,
        "trend": "Declining",
        "explanation": "Model detects current evaporation rate of 6.2 mm/day coupled with heavy 185 KLD municipal withdrawal and zero anticipated monsoon inflows.",
        "recommendation": "Initiate Stage 2 water rationing: restrict non-essential agricultural flooding and switch drinking water supply to alternating 4-hour morning/evening windows."
    },
    {
        "id": "pred-2",
        "category": "crop",
        "resourceName": "North Sector Paddy Field A",
        "currentValue": "34% Soil Moisture (NDVI 0.62)",
        "predictedValue": "Yield Loss -18% if unwatered",
        "predictionPeriod": "72 Hours Ahead",
        "riskLevel": "Warning",
        "confidenceScore": 92,
        "trend": "Declining",
        "explanation": "Basmati rice is currently entering panicle initiation. Root zone moisture has dropped 8% below the minimum physiological threshold.",
        "recommendation": "Schedule drip or controlled furrow irrigation surge between 20:00 - 04:00 to avoid high evaporative peak losses."
    },
    {
        "id": "pred-3",
        "category": "electricity",
        "resourceName": "Substation Transformer #1",
        "currentValue": "78.5% Load (312 kW)",
        "predictedValue": "Peak Load 93.8% at 19:30",
        "predictionPeriod": "Next 6 Hours",
        "riskLevel": "Warning",
        "confidenceScore": 86,
        "trend": "Rising",
        "explanation": "Evening domestic lighting overlap with daytime agricultural tube well pumps creates a projected 94 kW demand spike.",
        "recommendation": "Trigger automated demand-response signal to stagger rural pump feeders: Zone A operates at 20:00, Zone B at 22:30."
    },
    {
        "id": "pred-4",
        "category": "weather",
        "resourceName": "Ridge Agro-Met Station",
        "currentValue": "34.8°C / 41% Humidity",
        "predictedValue": "Heat Index 39.2°C tomorrow",
        "predictionPeriod": "24 Hours Ahead",
        "riskLevel": "Warning",
        "confidenceScore": 94,
        "trend": "Rising",
        "explanation": "High pressure ridge sustaining dry westerly winds. Soil moisture depletion rate expected to increase by 22%.",
        "recommendation": "Issue agricultural advisory for mulch preservation and livestock shaded hydration."
    }
]

@router.get("/{resource_type}")
def get_predictions(resource_type: str = "all"):
    if resource_type != "all":
        return [p for p in PREDICTIONS_DATA if p["category"] == resource_type]
    return PREDICTIONS_DATA
