"""
SQLAlchemy ORM Models for Smart Village Resource Monitoring
"""

from datetime import datetime
from sqlalchemy import Column, Integer, String, Float, Boolean, Text, DateTime, Date, JSON
from .database import Base

class VillageResourceModel(Base):
    __tablename__ = "village_resources"

    id = Column(String(64), primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    category = Column(String(64), nullable=False, index=True)
    status = Column(String(32), nullable=False, default="Normal")
    value = Column(Float, nullable=False)
    unit = Column(String(32), nullable=False)
    min_nominal = Column(Float, nullable=False)
    max_nominal = Column(Float, nullable=False)
    zone = Column(String(128), nullable=False)
    coord_x = Column(Integer, nullable=False)
    coord_y = Column(Integer, nullable=False)
    description = Column(Text, nullable=True)
    updated_at = Column(DateTime, default=datetime.utcnow)

class WaterDataModel(Base):
    __tablename__ = "water_data"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    reservoir_level_pct = Column(Float, nullable=False)
    groundwater_depth_m = Column(Float, nullable=False)
    daily_consumption_kld = Column(Float, nullable=False)
    water_quality_tds = Column(Integer, nullable=False)
    supply_status = Column(String(64), nullable=False)
    pumps_operating = Column(Integer, nullable=False)
    total_pumps = Column(Integer, nullable=False)
    pipe_pressure_bar = Column(Float, nullable=False)
    leak_risk = Column(String(32), nullable=False)
    recorded_at = Column(DateTime, default=datetime.utcnow)

class AgricultureDataModel(Base):
    __tablename__ = "agriculture_data"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    field_id = Column(String(64), nullable=False, index=True)
    crop_name = Column(String(128), nullable=False)
    soil_moisture_pct = Column(Float, nullable=False)
    nitrogen_ppm = Column(Float, nullable=False)
    phosphorus_ppm = Column(Float, nullable=False)
    potassium_ppm = Column(Float, nullable=False)
    health_index_ndvi = Column(Float, nullable=False)
    irrigation_status = Column(String(64), nullable=False)
    pest_risk = Column(String(32), nullable=False)
    recorded_at = Column(DateTime, default=datetime.utcnow)

class CropDataModel(Base):
    __tablename__ = "crop_data"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    field_id = Column(String(64), nullable=False, index=True)
    crop_type = Column(String(128), nullable=False)
    growth_stage = Column(String(64), nullable=False)
    area_hectares = Column(Float, nullable=False)
    projected_yield_tons = Column(Float, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow)

class ElectricityDataModel(Base):
    __tablename__ = "electricity_data"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    grid_demand_kw = Column(Float, nullable=False)
    solar_generation_kw = Column(Float, nullable=False)
    battery_storage_pct = Column(Float, nullable=False)
    transformer_load_pct = Column(Float, nullable=False)
    frequency_hz = Column(Float, nullable=False)
    voltage_v = Column(Float, nullable=False)
    blackout_risk = Column(String(32), nullable=False)
    recorded_at = Column(DateTime, default=datetime.utcnow)

class WeatherDataModel(Base):
    __tablename__ = "weather_data"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    temperature_c = Column(Float, nullable=False)
    rainfall_mm = Column(Float, nullable=False)
    humidity_pct = Column(Float, nullable=False)
    wind_speed_kmh = Column(Float, nullable=False)
    uv_index = Column(Integer, nullable=False)
    pressure_hpa = Column(Float, nullable=False)
    condition = Column(String(64), nullable=False)
    forecast_summary = Column(Text, nullable=True)
    recorded_at = Column(DateTime, default=datetime.utcnow)

class EnvironmentalDataModel(Base):
    __tablename__ = "environmental_data"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    aqi = Column(Integer, nullable=False)
    pm25 = Column(Float, nullable=False)
    co2_ppm = Column(Integer, nullable=False)
    ambient_noise_db = Column(Float, nullable=False)
    soil_salinity_dsm = Column(Float, nullable=False)
    recorded_at = Column(DateTime, default=datetime.utcnow)

class InfrastructureDataModel(Base):
    __tablename__ = "infrastructure_data"

    id = Column(String(64), primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    type = Column(String(64), nullable=False)
    health_score_pct = Column(Integer, nullable=False)
    operational_status = Column(String(64), nullable=False)
    risk_level = Column(String(32), nullable=False)
    last_inspected = Column(String(32), nullable=False)
    criticality = Column(String(32), nullable=False)

class HistoricalDataModel(Base):
    __tablename__ = "historical_data"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    timestamp_label = Column(String(32), nullable=False)
    water_level_pct = Column(Float, nullable=False)
    electricity_kw = Column(Float, nullable=False)
    soil_moisture_pct = Column(Float, nullable=False)
    temperature_c = Column(Float, nullable=False)
    rainfall_mm = Column(Float, nullable=False)
    aqi = Column(Integer, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

class PredictionModel(Base):
    __tablename__ = "predictions"

    id = Column(String(64), primary_key=True, index=True)
    category = Column(String(64), nullable=False, index=True)
    resource_name = Column(String(255), nullable=False)
    current_value = Column(String(128), nullable=False)
    predicted_value = Column(String(128), nullable=False)
    prediction_period = Column(String(64), nullable=False)
    risk_level = Column(String(32), nullable=False)
    confidence_score = Column(Integer, nullable=False)
    trend = Column(String(32), nullable=False)
    explanation = Column(Text, nullable=False)
    recommendation = Column(Text, nullable=False)

class RiskModel(Base):
    __tablename__ = "risks"

    id = Column(String(64), primary_key=True, index=True)
    category = Column(String(64), nullable=False, index=True)
    title = Column(String(255), nullable=False)
    severity = Column(String(32), nullable=False)
    reason = Column(Text, nullable=False)
    impact_area = Column(String(255), nullable=False)
    affected_population = Column(Integer, nullable=False)
    remedy_hint = Column(Text, nullable=False)
    detected_at = Column(String(64), nullable=False)

class AlertModel(Base):
    __tablename__ = "alerts"

    id = Column(String(64), primary_key=True, index=True)
    category = Column(String(64), nullable=False, index=True)
    severity = Column(String(32), nullable=False)
    title = Column(String(255), nullable=False)
    message = Column(Text, nullable=False)
    timestamp_label = Column(String(64), nullable=False)
    acknowledged = Column(Boolean, default=False)
    action_required = Column(Text, nullable=False)

class RecommendationModel(Base):
    __tablename__ = "recommendations"

    id = Column(String(64), primary_key=True, index=True)
    category = Column(String(64), nullable=False, index=True)
    priority = Column(String(32), nullable=False)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
    expected_benefit = Column(Text, nullable=False)
    resource_target = Column(String(255), nullable=False)
    steps_json = Column(JSON, nullable=False)
