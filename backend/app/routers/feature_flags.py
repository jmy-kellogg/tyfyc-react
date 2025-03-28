import json
from fastapi import APIRouter, Depends, status, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.schemas.feature_flags import  FeatureFlagResp, FeatureFlagCreate, FeatureFlagUpdate
from app.database import get_db
from app.models import Feature_flag

router = APIRouter()
tags_metadata = {
    "name": "feature_flags",
    "description": "Manages Feature Flags for backend and frontend",
}

@router.get("/feature_flags", tags=["feature_flags"], response_model=List[FeatureFlagResp])
def fetch_all_feature_flags(db: Session = Depends(get_db), skip: int=0, limit: int=100):    
    db_feature_flag = db.query(Feature_flag).offset(skip).limit(limit).all()
    
    return db_feature_flag

@router.post("/feature_flags", tags=["feature_flags"], response_model=FeatureFlagResp)
def create_feature_flag(feature_flag: FeatureFlagCreate, db: Session = Depends(get_db)):
    db_feature_flag = Feature_flag(**feature_flag.dict())
    db.add(db_feature_flag)
    db.commit()
    db.refresh(db_feature_flag)
    
    return db_feature_flag

@router.get("/feature_flags/{name}", tags=["feature_flags"], response_model=FeatureFlagResp)
def fetch_feature_flag_by_name(name: str, db: Session = Depends(get_db)):
    db_feature_flag = db.query(Feature_flag).filter(Feature_flag.name==name).first()
    
    if not db_feature_flag:
        raise HTTPException(status_code=404, detail="Item not found")
    
    return db_feature_flag

@router.put("/feature_flags/{name}", tags=["feature_flags"], response_model=FeatureFlagResp)
def update_feature_flag_name(name: str, feature_flag: FeatureFlagUpdate, db: Session = Depends(get_db)):
    db_feature_flag  = db.query(Feature_flag).filter(Feature_flag.name==name).first()
    
    for field, value in feature_flag.dict().items():
        setattr(db_feature_flag, field, value)
    
    db.commit()
    db.refresh(db_feature_flag)
    
    return db_feature_flag

@router.delete("/feature_flags/{name}", tags=["feature_flags"], status_code=status.HTTP_200_OK)
def delete_feature_flag_by_name(name: str, db: Session = Depends(get_db)):
    db_feature_flag  = db.query(Feature_flag).filter(Feature_flag.name==name).first()
    
    if not db_feature_flag:
        raise HTTPException(status_code=404, detail="Feature Flag not found")
    db.delete(db_feature_flag)
    db.commit()

    return {"detail": f"Feature Flag {name} was deleted."}
