import json
from fastapi import APIRouter, Depends, status, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.schemas.education import EducationResp, EducationCreate, EducationUpdate
from app.auth.auth_handler import get_current_active_user
from app.database import get_db
from app.models import Education, User

router = APIRouter()
tags_metadata = {
    "name": "education",
    "description": "Operations with tracking education history",
}

@router.get("/education", tags=["education"], response_model=List[EducationResp])
def fetch_all_education(current_user: User = Depends(get_current_active_user), db: Session = Depends(get_db)):    
    user_id = current_user.id
    db_education = db.query(Education).filter(Education.user_id == user_id).all()
    
    return db_education

@router.post("/education", tags=["education"], response_model=EducationResp)
def create_education(education: EducationCreate, current_user: User = Depends(get_current_active_user), db: Session = Depends(get_db)):
    user_id = current_user.id
    db_education = Education(
      degree=education.degree,
      school=education.school,
      grad_year=education.grad_year,
      user_id=user_id
    )
    db.add(db_education)
    db.commit()
    db.refresh(db_education)
    
    return db_education

@router.get("/education/{education_id}", tags=["education"], response_model=EducationResp)
def fetch_education_by_id(education_id: str, current_user: User = Depends(get_current_active_user), db: Session = Depends(get_db)):
    user_id = current_user.id
    db_education = db.get(Education, education_id)
    
    if(db_education.user_id != user_id):
        raise HTTPException(status_code=404, detail="Education not found")
    
    if not db_education:
        raise HTTPException(status_code=404, detail="Education not found")
    
    return db_education

@router.put("/education/{education_id}", tags=["education"], response_model=EducationResp)
def update_education_by_id(education_id: str, education: EducationUpdate, current_user: User = Depends(get_current_active_user), db: Session = Depends(get_db)):
    user_id = current_user.id
    db_education = db.get(Education, education_id)

    if(db_education.user_id != user_id):
        raise HTTPException(status_code=404, detail="Education not found")
    
    for field, value in education.dict().items():
        if(value):
          setattr(db_education, field, value)
    
    db.commit()
    db.refresh(db_education)
    
    return db_education

@router.delete("/education/{education_id}", tags=["education"], status_code=status.HTTP_200_OK)
def delete_education_by_id(education_id: str, current_user: User = Depends(get_current_active_user), db: Session = Depends(get_db)):
    user_id = current_user.id
    db_education = db.get(Education, education_id)
    
    if(db_education.user_id != user_id):
        raise HTTPException(status_code=404, detail="Education not found")
    if not db_education:
        raise HTTPException(status_code=404, detail="Education not found")
    
    db.delete(db_education)
    db.commit()

    return {"detail": f"Education with id {db_education} deleted."}
