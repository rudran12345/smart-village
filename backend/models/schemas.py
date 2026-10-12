"""
Pydantic Schemas for Request/Response Validation
"""

from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field

class VillageResourceBase(BaseModel):
    name: str
    category: str
    status: str = "Normal"
    value: float
    unit: str
    nominalRange: Dict[str, float]
    zone: str
    coordinates: Dict[str, int]
    description: Optional[str] = ""

class VillageResourceCreate(VillageResourceBase):
    pass

class VillageResourceResponse(VillageResourceBase):
    id: str
    lastUpdated: str

    class Config:
        from_attributes = True

class SimulationRequest(BaseModel):
    waterLevelDeltaPct: float = Field(default=0.0, ge=-100.0, le=100.0)
    electricityUsageMultiplier: float = Field(default=1.0, ge=0.1, le=5.0)
    rainfallMm: float = Field(default=0.0, ge=0.0, le=500.0)
    temperatureC: float = Field(default=30.0, ge=-20.0, le=60.0)
    soilMoistureDeltaPct: float = Field(default=0.0, ge=-100.0, le=100.0)

class ResourceProjection(BaseModel):
    resource: str
    baseline: str
    simulated: str
    status: str

class SimulationResponse(BaseModel):
    isSimulated: bool = True
    waterStressIndexPct: float
    blackoutRiskProbabilityPct: float
    cropYieldImpactPct: float
    overallVillageHealthPct: float
    simulatedRiskLevel: str
    predictedOutcomes: List[str]
    recommendedMitigations: List[str]
    resourceProjections: List[ResourceProjection]
