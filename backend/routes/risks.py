from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database.database import get_db

router = APIRouter(prefix="/api/risks", tags=["Risks"])

DEMO_RISKS = [
    {
        "id": "risk-1",
        "category": "water",
        "title": "Severe Reservoir Depletion Threat",
        "severity": "Critical",
        "reason": "Reservoir storage has fallen below the 45% safe buffer while daily replenishment from feeder canal is restricted due to upstream maintenance.",
        "impactArea": "Zone 1 & Zone 2 Domestic Water Supply",
        "detectedAt": "Today at 11:20 AM",
        "affectedPopulation": 1450,
        "remedyHint": "Prioritize drinking distribution over commercial farm filling."
    },
    {
        "id": "risk-2",
        "category": "crop",
        "title": "Vegetable Crop Moisture & Early Blight Risk",
        "severity": "Critical",
        "reason": "West Terrace Tomato NDVI dropped to 0.54 with soil moisture at 29.8%. Micro-climatic heat stress accelerating foliar necrosis.",
        "impactArea": "West Terrace Horticultural Belt (8.6 Ha)",
        "detectedAt": "Today at 09:45 AM",
        "affectedPopulation": 320,
        "remedyHint": "Deploy localized biopesticide spray and emergency drip moisture cycle."
    },
    {
        "id": "risk-3",
        "category": "electricity",
        "title": "Peak Hour Grid Transformer Overload Risk",
        "severity": "Warning",
        "reason": "Simultaneous agricultural pump startup projected to push transformer coil temperature beyond safe thermal envelope (85°C).",
        "impactArea": "Central Village Feeder Line B",
        "detectedAt": "Today at 12:15 PM",
        "affectedPopulation": 850,
        "remedyHint": "Rotate rural feeder circuits via Panchayat smart relay control."
    },
    {
        "id": "risk-4",
        "category": "infrastructure",
        "title": "Canal Sluice Regulator Silt Obstruction",
        "severity": "Warning",
        "reason": "Hydraulic telemetry sensors indicate a 35% reduction in discharge flow rate due to sediment buildup at the primary intake gate.",
        "impactArea": "Feeder Canal North Segment",
        "detectedAt": "Today at 07:30 AM",
        "affectedPopulation": 1100,
        "remedyHint": "Dispatch maintenance team with mechanical excavator for desilting."
    }
]

@router.get("")
def get_risks():
    return DEMO_RISKS
