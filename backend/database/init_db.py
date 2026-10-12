"""
Database Initialization & Seeding Script
Creates tables and seeds realistic demo data on startup if empty.
"""

from datetime import datetime, date
from sqlalchemy.orm import Session
from .database import engine, Base, SessionLocal
from .models import (
    VillageResourceModel,
    WaterDataModel,
    AgricultureDataModel,
    CropDataModel,
    ElectricityDataModel,
    WeatherDataModel,
    EnvironmentalDataModel,
    InfrastructureDataModel,
    HistoricalDataModel,
    PredictionModel,
    RiskModel,
    AlertModel,
    RecommendationModel,
)

def init_database():
    Base.metadata.create_all(bind=engine)
    db: Session = SessionLocal()

    try:
        # 1. Seed Resources
        if db.query(VillageResourceModel).count() == 0:
            demo_resources = [
                VillageResourceModel(
                    id="res-water-1",
                    name="Central Village Water Tank & Reservoir",
                    category="water",
                    status="Warning",
                    value=42.5,
                    unit="% capacity",
                    min_nominal=50.0,
                    max_nominal=95.0,
                    zone="North Catchment",
                    coord_x=260,
                    coord_y=150,
                    description="Primary village drinking and domestic distribution storage reservoir."
                ),
                VillageResourceModel(
                    id="res-water-2",
                    name="Deep Aquifer Borewell Cluster #3",
                    category="water",
                    status="Warning",
                    value=28.4,
                    unit="m depth",
                    min_nominal=10.0,
                    max_nominal=25.0,
                    zone="North Aquifer",
                    coord_x=380,
                    coord_y=130,
                    description="Deep submersible pump station supplying supplemental farm water."
                ),
                VillageResourceModel(
                    id="res-agri-1",
                    name="North Sector Paddy Field A",
                    category="agriculture",
                    status="Warning",
                    value=34.0,
                    unit="% moisture",
                    min_nominal=45.0,
                    max_nominal=70.0,
                    zone="Agricultural Belt A",
                    coord_x=180,
                    coord_y=290,
                    description="Basmati rice crop in critical flowering phase experiencing moisture stress."
                ),
                VillageResourceModel(
                    id="res-agri-2",
                    name="East Plateau Millet Farm",
                    category="agriculture",
                    status="Normal",
                    value=46.5,
                    unit="% moisture",
                    min_nominal=35.0,
                    max_nominal=60.0,
                    zone="East Plateau",
                    coord_x=620,
                    coord_y=240,
                    description="Drought-hardy millet crop in robust vegetative growth."
                ),
                VillageResourceModel(
                    id="res-crop-1",
                    name="West Terrace Tomato Farm",
                    category="crop",
                    status="Critical",
                    value=0.54,
                    unit="NDVI index",
                    min_nominal=0.70,
                    max_nominal=0.95,
                    zone="West Terrace",
                    coord_x=110,
                    coord_y=440,
                    description="Detected early blight risk and deficit irrigation stress."
                ),
                VillageResourceModel(
                    id="res-elec-1",
                    name="Village Community Solar Substation",
                    category="electricity",
                    status="Warning",
                    value=78.5,
                    unit="% transformer load",
                    min_nominal=20.0,
                    max_nominal=75.0,
                    zone="Central Grid Yard",
                    coord_x=440,
                    coord_y=320,
                    description="Step-down distribution transformer running hot during midday peak hours."
                ),
                VillageResourceModel(
                    id="res-weather-1",
                    name="Automatic Agro-Meteorological Station",
                    category="weather",
                    status="Normal",
                    value=34.8,
                    unit="°C temperature",
                    min_nominal=18.0,
                    max_nominal=35.0,
                    zone="Ridge Top",
                    coord_x=680,
                    coord_y=110,
                    description="Multi-sensor weather telemetry tower capturing humidity, rain, and solar flux."
                ),
                VillageResourceModel(
                    id="res-env-1",
                    name="Village Air & Ambient Sensor Pod",
                    category="environment",
                    status="Normal",
                    value=72.0,
                    unit="AQI index",
                    min_nominal=0.0,
                    max_nominal=100.0,
                    zone="Panchayat Square",
                    coord_x=410,
                    coord_y=460,
                    description="Continuous monitoring of particulate matter, carbon dioxide, and background sound."
                ),
                VillageResourceModel(
                    id="res-infra-1",
                    name="Canal Sluice Regulator Gate #2",
                    category="infrastructure",
                    status="Warning",
                    value=64.0,
                    unit="% health index",
                    min_nominal=75.0,
                    max_nominal=100.0,
                    zone="Canal Junction",
                    coord_x=290,
                    coord_y=220,
                    description="Hydraulic silt accumulation causing valve stickiness."
                ),
                VillageResourceModel(
                    id="res-infra-2",
                    name="Primary Health Clinic Backup Generator",
                    category="infrastructure",
                    status="Normal",
                    value=94.0,
                    unit="% battery readiness",
                    min_nominal=80.0,
                    max_nominal=100.0,
                    zone="Civic Core",
                    coord_x=530,
                    coord_y=400,
                    description="Critical cold-chain vaccine storage refrigeration power unit."
                )
            ]
            db.add_all(demo_resources)

        # 2. Seed Water Data
        if db.query(WaterDataModel).count() == 0:
            db.add(WaterDataModel(
                reservoir_level_pct=42.5,
                groundwater_depth_m=28.4,
                daily_consumption_kld=185.0,
                water_quality_tds=310,
                supply_status="Rationed",
                pumps_operating=3,
                total_pumps=4,
                pipe_pressure_bar=3.2,
                leak_risk="Moderate"
            ))

        # 3. Seed Electricity Data
        if db.query(ElectricityDataModel).count() == 0:
            db.add(ElectricityDataModel(
                grid_demand_kw=312.4,
                solar_generation_kw=185.6,
                battery_storage_pct=68.0,
                transformer_load_pct=78.5,
                frequency_hz=49.92,
                voltage_v=232.0,
                blackout_risk="Warning"
            ))

        # 4. Seed Weather Data
        if db.query(WeatherDataModel).count() == 0:
            db.add(WeatherDataModel(
                temperature_c=34.8,
                rainfall_mm=0.0,
                humidity_pct=41.0,
                wind_speed_kmh=14.5,
                uv_index=8,
                pressure_hpa=1011.2,
                condition="Sunny",
                forecast_summary="Dry weather with high heat index. Minimal precipitation expected over the next 48 hours."
            ))

        # 5. Seed Environmental Data
        if db.query(EnvironmentalDataModel).count() == 0:
            db.add(EnvironmentalDataModel(
                aqi=72,
                pm25=22.4,
                co2_ppm=418,
                ambient_noise_db=46.2,
                soil_salinity_dsm=1.2
            ))

        # 6. Seed Infrastructure Data
        if db.query(InfrastructureDataModel).count() == 0:
            infra_items = [
                InfrastructureDataModel(
                    id="infra-1",
                    name="Main Canal Sluice Gate & Feeder",
                    type="Pumping Station",
                    health_score_pct=64,
                    operational_status="Needs Maintenance",
                    risk_level="Warning",
                    last_inspected="2026-09-18",
                    criticality="High"
                ),
                InfrastructureDataModel(
                    id="infra-2",
                    name="Community Primary Health Clinic",
                    type="Primary Health Clinic",
                    health_score_pct=91,
                    operational_status="Fully Functional",
                    risk_level="Normal",
                    last_inspected="2026-10-02",
                    criticality="High"
                ),
                InfrastructureDataModel(
                    id="infra-3",
                    name="Gram Panchayat Model Secondary School",
                    type="Community School",
                    health_score_pct=88,
                    operational_status="Fully Functional",
                    risk_level="Normal",
                    last_inspected="2026-09-29",
                    criticality="Medium"
                ),
                InfrastructureDataModel(
                    id="infra-4",
                    name="Microgrid Substation & Inverter Yard",
                    type="Solar Substation",
                    health_score_pct=79,
                    operational_status="Fully Functional",
                    risk_level="Normal",
                    last_inspected="2026-10-08",
                    criticality="High"
                ),
                InfrastructureDataModel(
                    id="infra-5",
                    name="Farmer Produce Solar Cold Storage",
                    type="Cold Storage Unit",
                    health_score_pct=84,
                    operational_status="Fully Functional",
                    risk_level="Normal",
                    last_inspected="2026-10-05",
                    criticality="Medium"
                ),
                InfrastructureDataModel(
                    id="infra-6",
                    name="Inter-Village Access Roadway & Culvert",
                    type="Road",
                    health_score_pct=58,
                    operational_status="Needs Maintenance",
                    risk_level="Warning",
                    last_inspected="2026-08-14",
                    criticality="Medium"
                )
            ]
            db.add_all(infra_items)

        # 7. Seed Historical Data
        if db.query(HistoricalDataModel).count() == 0:
            hist_records = [
                HistoricalDataModel(timestamp_label="06:00", water_level_pct=52.0, electricity_kw=140.0, soil_moisture_pct=42.0, temperature_c=24.2, rainfall_mm=0.0, aqi=54),
                HistoricalDataModel(timestamp_label="08:00", water_level_pct=49.5, electricity_kw=210.0, soil_moisture_pct=40.5, temperature_c=27.5, rainfall_mm=0.0, aqi=61),
                HistoricalDataModel(timestamp_label="10:00", water_level_pct=46.2, electricity_kw=285.0, soil_moisture_pct=38.0, temperature_c=31.0, rainfall_mm=0.0, aqi=68),
                HistoricalDataModel(timestamp_label="12:00", water_level_pct=44.0, electricity_kw=330.0, soil_moisture_pct=35.5, temperature_c=34.2, rainfall_mm=0.0, aqi=75),
                HistoricalDataModel(timestamp_label="14:00", water_level_pct=42.5, electricity_kw=312.0, soil_moisture_pct=34.0, temperature_c=34.8, rainfall_mm=0.0, aqi=72),
                HistoricalDataModel(timestamp_label="16:00 (Est)", water_level_pct=40.8, electricity_kw=295.0, soil_moisture_pct=32.5, temperature_c=33.5, rainfall_mm=0.0, aqi=70),
                HistoricalDataModel(timestamp_label="18:00 (Est)", water_level_pct=39.2, electricity_kw=345.0, soil_moisture_pct=31.8, temperature_c=30.1, rainfall_mm=0.0, aqi=74),
                HistoricalDataModel(timestamp_label="20:00 (Est)", water_level_pct=37.5, electricity_kw=320.0, soil_moisture_pct=31.0, temperature_c=27.8, rainfall_mm=0.0, aqi=69)
            ]
            db.add_all(hist_records)

        # 8. Seed Alerts
        if db.query(AlertModel).count() == 0:
            demo_alerts = [
                AlertModel(
                    id="alt-1",
                    category="water",
                    severity="Critical",
                    title="Water Reservoir Low Buffer Alert",
                    message="Reservoir storage reached 42.5%. Estimated 2.8 days of drinking reserve remaining without conservation measures.",
                    timestamp_label="14 mins ago",
                    acknowledged=False,
                    action_required="Activate Village Panchayat Water Committee emergency protocol."
                ),
                AlertModel(
                    id="alt-2",
                    category="crop",
                    severity="Critical",
                    title="West Terrace Crop Distress Detected",
                    message="Spectral vegetative index in Sector 4 indicates acute soil moisture deficit and potential fungal vulnerability.",
                    timestamp_label="32 mins ago",
                    acknowledged=False,
                    action_required="Inspect sector irrigation valves and dispatch extension worker."
                ),
                AlertModel(
                    id="alt-3",
                    category="electricity",
                    severity="Warning",
                    title="Transformer Load Exceeds 75% Threshold",
                    message="Substation load is 78.5% of rated capacity. Approaching thermal trip limit.",
                    timestamp_label="1 hour ago",
                    acknowledged=True,
                    action_required="Shift non-essential cold storage compressor cycles to off-peak."
                ),
                AlertModel(
                    id="alt-4",
                    category="weather",
                    severity="Warning",
                    title="High Thermal Heat Advisory",
                    message="Ambient temperature reached 34.8°C with UV index 8. High evapotranspiration rate.",
                    timestamp_label="2 hours ago",
                    acknowledged=True,
                    action_required="Broadcast advisory to agricultural workers to hydrate and pause field work during 12:00 - 15:00."
                )
            ]
            db.add_all(demo_alerts)

        db.commit()
    except Exception as e:
        db.rollback()
        print(f"Error seeding database: {e}")
    finally:
        db.close()
