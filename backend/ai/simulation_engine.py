"""
What-If Simulation Mathematical Modeling Service
Simulates multi-variable environmental and resource stress scenarios.
"""

from typing import Dict, Any, List

class SimulationEngine:
    def run_simulation(
        self,
        water_level_delta_pct: float,
        electricity_multiplier: float,
        rainfall_mm: float,
        temperature_c: float,
        soil_moisture_delta_pct: float
    ) -> Dict[str, Any]:
        base_water = 42.5
        base_electricity = 312.4
        base_soil = 34.0
        transformer_capacity = 400.0

        sim_water = max(0.0, min(100.0, base_water + water_level_delta_pct + (rainfall_mm * 0.45)))
        sim_elec = base_electricity * electricity_multiplier
        sim_soil = max(5.0, min(95.0, base_soil + soil_moisture_delta_pct + (rainfall_mm * 0.6) - max(0.0, temperature_c - 30.0) * 0.8))

        # Water Stress Index
        water_stress = 100.0 - sim_water
        if rainfall_mm < 5.0:
            water_stress += 15.0
        if temperature_c > 36.0:
            water_stress += 10.0
        water_stress = max(5.0, min(98.0, round(water_stress, 1)))

        # Blackout Risk
        load_ratio = sim_elec / transformer_capacity
        blackout_risk = round(load_ratio * 75.0, 1)
        if temperature_c > 38.0:
            blackout_risk += 12.0
        blackout_risk = max(4.0, min(99.0, round(blackout_risk, 1)))

        # Crop Yield Impact
        crop_yield_impact = 0.0
        if sim_soil < 35.0:
            crop_yield_impact = -round((35.0 - sim_soil) * 1.6, 1)
        elif sim_soil > 75.0:
            crop_yield_impact = -round((sim_soil - 75.0) * 1.2, 1)
        else:
            crop_yield_impact = round((sim_soil - 35.0) * 0.5, 1)
        if temperature_c > 38.0:
            crop_yield_impact -= 8.0

        # Overall Village Health
        water_health = sim_water
        energy_health = max(0.0, 100.0 - (95.0 if load_ratio > 1.0 else load_ratio * 85.0))
        agri_health = max(10.0, min(100.0, 50.0 + crop_yield_impact * 2.0))
        overall_health = max(5.0, min(98.0, round((water_health * 0.4) + (energy_health * 0.3) + (agri_health * 0.3), 1)))

        if overall_health < 45.0 or blackout_risk > 85.0 or sim_water < 25.0:
            risk_level = "Critical"
        elif overall_health < 70.0 or blackout_risk > 65.0 or sim_water < 45.0:
            risk_level = "Warning"
        else:
            risk_level = "Normal"

        predicted_outcomes = []
        if sim_water < 30.0:
            predicted_outcomes.append(f"Reservoir storage drops to {sim_water:.1f}%, forcing emergency water rationing for domestic sectors.")
        else:
            predicted_outcomes.append(f"Reservoir storage projects to {sim_water:.1f}%, sufficient for routine municipal distribution.")

        if load_ratio > 0.9:
            predicted_outcomes.append(f"Grid demand reaches {sim_elec:.0f} kW ({(load_ratio*100):.1f}% capacity) with high blackout probability.")
        else:
            predicted_outcomes.append(f"Grid demand stabilizes at {sim_elec:.0f} kW with steady substation voltage.")

        if crop_yield_impact < -10.0:
            predicted_outcomes.append(f"Agricultural yield drops by {abs(crop_yield_impact):.1f}% due to persistent moisture and heat stress.")
        else:
            predicted_outcomes.append(f"Crop production maintains steady progress with minimal physiological yield degradation.")

        recommended_mitigations = []
        if sim_water < 35.0:
            recommended_mitigations.append("Halt daytime open-furrow flooding; transition farm lines to nocturnal drip irrigation.")
        if load_ratio > 0.85:
            recommended_mitigations.append("Stagger high-power agricultural pumps into two scheduled shifts (North at 20:00, South at 22:30).")
        if temperature_c > 36.0:
            recommended_mitigations.append("Deploy organic straw mulching across horticultural acreage to conserve soil moisture.")
        if not recommended_mitigations:
            recommended_mitigations.append("Maintain baseline village resource allocation schedules.")

        return {
            "isSimulated": True,
            "waterStressIndexPct": water_stress,
            "blackoutRiskProbabilityPct": blackout_risk,
            "cropYieldImpactPct": crop_yield_impact,
            "overallVillageHealthPct": overall_health,
            "simulatedRiskLevel": risk_level,
            "predictedOutcomes": predicted_outcomes,
            "recommendedMitigations": recommended_mitigations,
            "resourceProjections": [
                {
                    "resource": "Central Water Reservoir",
                    "baseline": f"{base_water:.1f}%",
                    "simulated": f"{sim_water:.1f}%",
                    "status": "Critical" if sim_water < 30 else "Warning" if sim_water < 50 else "Normal"
                },
                {
                    "resource": "Grid Distribution Load",
                    "baseline": f"{base_electricity:.0f} kW",
                    "simulated": f"{sim_elec:.0f} kW",
                    "status": "Critical" if load_ratio > 0.9 else "Warning" if load_ratio > 0.75 else "Normal"
                },
                {
                    "resource": "Agricultural Soil Moisture",
                    "baseline": f"{base_soil:.1f}%",
                    "simulated": f"{sim_soil:.1f}%",
                    "status": "Critical" if sim_soil < 30 else "Warning" if sim_soil < 40 else "Normal"
                },
                {
                    "resource": "Thermal Comfort Index",
                    "baseline": "34.8 °C",
                    "simulated": f"{temperature_c:.1f} °C",
                    "status": "Critical" if temperature_c > 38 else "Warning" if temperature_c > 34 else "Normal"
                }
            ]
        }

simulation_engine = SimulationEngine()
