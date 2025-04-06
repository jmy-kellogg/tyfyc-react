import json
from fastapi import APIRouter, Depends, status, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.schemas.employment import EmploymentResp, EmploymentCreate, EmploymentUpdate
from app.auth.auth_handler import get_current_active_user
from app.database import get_db
from app.models import Employment, User

router = APIRouter()
tags_metadata = {
    "name": "employment",
    "description": "Operations with tracking employment history",
}

@router.get("/employment", tags=["employment"], response_model=List[EmploymentResp])
def fetch_all_employment(current_user: User = Depends(get_current_active_user), db: Session = Depends(get_db)):    
    user_id = current_user.id
    db_employment = db.query(Employment).filter(Employment.user_id == user_id).all()
    
    return db_employment

@router.post("/employment", tags=["employment"], response_model=EmploymentResp)
def create_employment(employment: EmploymentCreate, current_user: User = Depends(get_current_active_user), db: Session = Depends(get_db)):
    user_id = current_user.id
    db_employment = Employment(
      job_title=employment.job_title,
      company=employment.company,
      start=employment.start,
      end=employment.end,
      location=employment.location,
      description=employment.description,
      user_id=user_id
    )
    db.add(db_employment)
    db.commit()
    db.refresh(db_employment)
    
    return db_employment

@router.get("/employment/{employment_id}", tags=["employment"], response_model=EmploymentResp)
def fetch_employment_by_id(employment_id: str, current_user: User = Depends(get_current_active_user), db: Session = Depends(get_db)):
    user_id = current_user.id
    db_employment = db.get(Employment, employment_id)
    
    if(db_employment.user_id != user_id):
        raise HTTPException(status_code=404, detail="Employment not found")
    
    if not db_employment:
        raise HTTPException(status_code=404, detail="Employment not found")
    
    return db_employment

@router.put("/employment/{employment_id}", tags=["employment"], response_model=EmploymentResp)
def update_employment_by_id(employment_id: str, employment: EmploymentUpdate, current_user: User = Depends(get_current_active_user), db: Session = Depends(get_db)):
    user_id = current_user.id
    db_employment = db.get(Employment, employment_id)

    if(db_employment.user_id != user_id):
        raise HTTPException(status_code=404, detail="Employment not found")
    
    for field, value in employment.dict().items():
        if(value):
          setattr(db_employment, field, value)
    
    db.commit()
    db.refresh(db_employment)
    
    return db_employment

@router.delete("/employment/{employment_id}", tags=["employment"], status_code=status.HTTP_200_OK)
def delete_employment_by_id(employment_id: str, current_user: User = Depends(get_current_active_user), db: Session = Depends(get_db)):
    user_id = current_user.id
    db_employment = db.get(Employment, employment_id)
    
    if(db_employment.user_id != user_id):
        raise HTTPException(status_code=404, detail="Employment not found")
    if not db_employment:
        raise HTTPException(status_code=404, detail="Employment not found")
    
    db.delete(db_employment)
    db.commit()

    return {"detail": f"Employment with id {db_employment} deleted."}
