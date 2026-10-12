from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database.database import get_db

router = APIRouter(prefix="/api/recommendations", tags=["Recommendations"])

DEMO_RECS = [
    {
        "id": "rec-1",
        "category": "water",
        "priority": "High",
        "title": "Switch to Automated Micro-Irrigation Scheduling",
        "description": "Transition from daytime open-furrow flooding to nocturnal drip irrigation across Paddy Field A and Vegetable Hub.",
        "expectedBenefit": "Saves 35% - 42% water loss from evaporation; protects reservoir reserves by 65,000 liters daily.",
        "resourceTarget": "Central Reservoir & North Paddy Field",
        "steps": [
            "Lock agricultural feeder pumps between 10:00 AM and 05:00 PM.",
            "Configure automated drip controllers for midnight irrigation cycles.",
            "Notify farmers through Gram Panchayat SMS notification broadcast."
        ]
    },
    {
        "id": "rec-2",
        "category": "electricity",
        "priority": "High",
        "title": "Execute Dynamic Agricultural Load Staggering",
        "description": "Implement a two-stage staggered duty cycle for heavy 7.5 HP agricultural submersible tube wells across northern and southern quadrants.",
        "expectedBenefit": "Shaves 65 kW from evening peak load, preventing transformer overheating and avoiding brownouts.",
        "resourceTarget": "Central Substation & Tube Well Cluster #3",
        "steps": [
            "Assign Northern Quadrant pumps to 18:00 - 21:00 window.",
            "Assign Southern Quadrant pumps to 21:30 - 01:30 window.",
            "Utilize stored solar battery reserves to buffer health clinic and streetlights."
        ]
    },
    {
        "id": "rec-3",
        "category": "crop",
        "priority": "Medium",
        "title": "Targeted Potassium Nitrate Foliar Spray on West Terrace",
        "description": "To counteract heat stress and prevent crop yield loss in tomatoes, apply 1.5% KNO3 foliar nutrition.",
        "expectedBenefit": "Enhances crop stomatal conductance and protects approximately 3.5 tons of marketable yield.",
        "resourceTarget": "West Terrace Vegetable Hub",
        "steps": [
            "Verify drone or knapsack sprayer availability at Village Resource Center.",
            "Apply early morning (06:30 - 08:30 AM) before temperature exceeds 28°C."
        ]
    },
    {
        "id": "rec-4",
        "category": "infrastructure",
        "priority": "Medium",
        "title": "Schedule Pre-Monsoon Desilting of Primary Canal Feeder",
        "description": "Remove accumulated river silt at Sluice Gate #2 to restore nominal 120 L/s flow rate before seasonal rains.",
        "expectedBenefit": "Increases gravity replenishment flow efficiency by 28% and prevents upstream localized embankment pooling.",
        "resourceTarget": "Canal Sluice Regulator Gate #2",
        "steps": [
            "Issue work order to rural public works civil maintenance unit.",
            "Temporarily divert inflow through auxiliary bypass channel for 6 hours.",
            "Re-calibrate ultrasonic discharge sensor post-cleaning."
        ]
    }
]

@router.get("")
def get_recommendations():
    return DEMO_RECS
