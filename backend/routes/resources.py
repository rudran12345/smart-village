from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
import uuid
from ..database.database import get_db
from ..database.models import VillageResourceModel
from ..models.schemas import VillageResourceCreate

router = APIRouter(prefix="/api/resources", tags=["Resources"])

@router.get("")
def get_all_resources(db: Session = Depends(get_db)):
    resources = db.query(VillageResourceModel).all()
    result = []
    for r in resources:
        result.append({
            "id": r.id,
            "name": r.name,
            "category": r.category,
            "status": r.status,
            "value": r.value,
            "unit": r.unit,
            "nominalRange": {"min": r.min_nominal, "max": r.max_nominal},
            "zone": r.zone,
            "coordinates": {"x": r.coord_x, "y": r.coord_y},
            "lastUpdated": "Just now",
            "description": r.description or ""
        })
    return result

@router.post("")
def create_resource(item: VillageResourceCreate, db: Session = Depends(get_db)):
    res_id = f"res-{uuid.uuid4().hex[:8]}"
    db_res = VillageResourceModel(
        id=res_id,
        name=item.name,
        category=item.category,
        status=item.status,
        value=item.value,
        unit=item.unit,
        min_nominal=item.nominalRange.get("min", 0.0),
        max_nominal=item.nominalRange.get("max", 100.0),
        zone=item.zone,
        coord_x=item.coordinates.get("x", 200),
        coord_y=item.coordinates.get("y", 200),
        description=item.description
    )
    db.add(db_res)
    db.commit()
    db.refresh(db_res)
    return {
        "id": db_res.id,
        "name": db_res.name,
        "category": db_res.category,
        "status": db_res.status,
        "value": db_res.value,
        "unit": db_res.unit,
        "nominalRange": {"min": db_res.min_nominal, "max": db_res.max_nominal},
        "zone": db_res.zone,
        "coordinates": {"x": db_res.coord_x, "y": db_res.coord_y},
        "lastUpdated": "Just created",
        "description": db_res.description
    }
