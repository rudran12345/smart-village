from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database.database import get_db
from ..database.models import AlertModel

router = APIRouter(prefix="/api/alerts", tags=["Alerts"])

@router.get("")
def get_alerts(db: Session = Depends(get_db)):
    alerts = db.query(AlertModel).all()
    if not alerts:
        return [
            {
                "id": "alt-1",
                "category": "water",
                "severity": "Critical",
                "title": "Water Reservoir Low Buffer Alert",
                "message": "Reservoir storage reached 42.5%. Estimated 2.8 days of drinking reserve remaining without conservation measures.",
                "timestamp": "14 mins ago",
                "acknowledged": False,
                "actionRequired": "Activate Village Panchayat Water Committee emergency protocol."
            },
            {
                "id": "alt-2",
                "category": "crop",
                "severity": "Critical",
                "title": "West Terrace Crop Distress Detected",
                "message": "Spectral vegetative index in Sector 4 indicates acute soil moisture deficit and potential fungal vulnerability.",
                "timestamp": "32 mins ago",
                "acknowledged": False,
                "actionRequired": "Inspect sector irrigation valves and dispatch extension worker."
            }
        ]
    return [
        {
            "id": a.id,
            "category": a.category,
            "severity": a.severity,
            "title": a.title,
            "message": a.message,
            "timestamp": a.timestamp_label,
            "acknowledged": a.acknowledged,
            "actionRequired": a.action_required
        }
        for a in alerts
    ]
