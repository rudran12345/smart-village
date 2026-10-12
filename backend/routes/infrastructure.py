from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database.database import get_db
from ..database.models import InfrastructureDataModel

router = APIRouter(prefix="/api/infrastructure", tags=["Infrastructure"])

@router.get("")
def get_infrastructure_assets(db: Session = Depends(get_db)):
    items = db.query(InfrastructureDataModel).all()
    if not items:
        return [
            {
                "id": "infra-1",
                "name": "Main Canal Sluice Gate & Feeder",
                "type": "Pumping Station",
                "healthScorePct": 64,
                "operationalStatus": "Needs Maintenance",
                "riskLevel": "Warning",
                "lastInspected": "2026-09-18",
                "criticality": "High"
            },
            {
                "id": "infra-2",
                "name": "Community Primary Health Clinic",
                "type": "Primary Health Clinic",
                "healthScorePct": 91,
                "operationalStatus": "Fully Functional",
                "riskLevel": "Normal",
                "lastInspected": "2026-10-02",
                "criticality": "High"
            }
        ]
    return [
        {
            "id": i.id,
            "name": i.name,
            "type": i.type,
            "healthScorePct": i.health_score_pct,
            "operationalStatus": i.operational_status,
            "riskLevel": i.risk_level,
            "lastInspected": i.last_inspected,
            "criticality": i.criticality
        }
        for i in items
    ]
