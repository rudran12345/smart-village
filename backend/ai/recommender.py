"""
Decision-Support Recommendation Engine
Generates prioritized, step-by-step dispatch playbooks based on evaluated conditions.
"""

from typing import List, Dict, Any

class RecommenderEngine:
    def get_recommendations_for_state(self, water_level: float, transformer_load: float, crop_ndvi: float) -> List[Dict[str, Any]]:
        recs = []

        if water_level < 45.0:
            recs.append({
                "id": "rec-water-emergency",
                "category": "water",
                "priority": "High",
                "title": "Automate Nighttime Drip Micro-Irrigation",
                "description": "Switch from open-canal flood irrigation to nocturnal drip lines to curb severe evaporation losses.",
                "expectedBenefit": "Conserves up to 65,000 liters daily and protects drinking reserves for an extra 12 days.",
                "resourceTarget": "Central Water Tank & North Paddy Field",
                "steps": [
                    "Isolate daytime feeder valves at Sluice Gate #2.",
                    "Set automated drip timer to run between 21:00 and 03:00.",
                    "Broadcast SMS water notification to village farming cooperative."
                ]
            })

        if transformer_load > 75.0:
            recs.append({
                "id": "rec-grid-stagger",
                "category": "electricity",
                "priority": "High",
                "title": "Stagger Agricultural Tubewell Operations",
                "description": "Divide agricultural heavy submersible pump feeders into rotating operational shifts to prevent transformer overload.",
                "expectedBenefit": "Reduces peak evening surge by 65 kW, preventing brownouts and thermal fuse trips.",
                "resourceTarget": "Central Microgrid Substation & Borewell Cluster #3",
                "steps": [
                    "Schedule Northern zone tubewell pumps from 18:00 to 21:00.",
                    "Schedule Southern zone pumps from 21:30 to 01:00.",
                    "Engage battery storage inverter to support street lighting and clinic power."
                ]
            })

        if crop_ndvi < 0.65:
            recs.append({
                "id": "rec-crop-foliar",
                "category": "crop",
                "priority": "Medium",
                "title": "Apply Foliar Potassium Nitrate Stress Alleviation",
                "description": "Foliar application of 1.5% KNO3 to improve stomatal regulation and reduce crop wilting under daytime heat.",
                "expectedBenefit": "Protects approximately 3.5 tons of marketable vegetable yield against thermal shock.",
                "resourceTarget": "West Terrace Vegetable Hub",
                "steps": [
                    "Procure KNO3 spray from Panchayat agro-center.",
                    "Apply during early morning hours (06:00 - 08:30) before temperatures exceed 28°C.",
                    "Monitor soil tensiometers 24 hours post-application."
                ]
            })

        return recs

recommender_engine = RecommenderEngine()
