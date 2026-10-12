"""
Automated Multi-Factor Risk Detection & Classification Service
"""

from typing import Dict, Any, List

class RiskAnalyzer:
    def evaluate_water_risk(self, reservoir_level_pct: float, rainfall_mm: float) -> Dict[str, Any]:
        if reservoir_level_pct < 30.0 and rainfall_mm < 5.0:
            return {
                "severity": "Critical",
                "reason": f"Reservoir level critically depleted to {reservoir_level_pct}%. Immediate rationing required.",
                "action": "Switch domestic water supply to strict 4-hour morning/evening windows."
            }
        elif reservoir_level_pct < 50.0:
            return {
                "severity": "Warning",
                "reason": f"Reservoir level at {reservoir_level_pct}% below recommended 50% buffer.",
                "action": "Restrict agricultural flooding; transition to drip micro-irrigation."
            }
        return {
            "severity": "Normal",
            "reason": "Water levels operating within nominal sustainability thresholds.",
            "action": "Maintain scheduled distribution routine."
        }

    def evaluate_grid_risk(self, transformer_load_pct: float, temperature_c: float) -> Dict[str, Any]:
        if transformer_load_pct > 88.0 or (transformer_load_pct > 80.0 and temperature_c > 38.0):
            return {
                "severity": "Critical",
                "reason": f"Transformer load at {transformer_load_pct}% under {temperature_c}°C ambient heat. High trip risk.",
                "action": "Enforce automated load-shedding for agricultural pumps to save civic grid."
            }
        elif transformer_load_pct > 75.0:
            return {
                "severity": "Warning",
                "reason": f"Transformer load at {transformer_load_pct}% nearing rated thermal envelope.",
                "action": "Stagger tube-well startups by zone."
            }
        return {
            "severity": "Normal",
            "reason": "Grid load and frequency operating in nominal zone.",
            "action": "Standard microgrid operation."
        }

    def evaluate_crop_risk(self, soil_moisture_pct: float, ndvi: float) -> Dict[str, Any]:
        if soil_moisture_pct < 28.0 or ndvi < 0.55:
            return {
                "severity": "Critical",
                "reason": f"Root moisture depleted to {soil_moisture_pct}% (NDVI {ndvi}). Acute foliar stress.",
                "action": "Execute emergency nocturnal irrigation and bio-stimulant foliar spray."
            }
        elif soil_moisture_pct < 38.0:
            return {
                "severity": "Warning",
                "reason": f"Soil moisture at {soil_moisture_pct}% entering deficit range.",
                "action": "Schedule furrow irrigation within next 24 hours."
            }
        return {
            "severity": "Normal",
            "reason": "Crop vegetative vitality healthy and optimal.",
            "action": "Routine crop scouting."
        }

risk_analyzer = RiskAnalyzer()
