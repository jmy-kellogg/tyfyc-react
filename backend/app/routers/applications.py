import json
from fastapi import APIRouter, Depends, status, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.schemas.applications import  ApplicationResp, ApplicationCreate, ApplicationUpdate
from app.auth.auth_handler import get_current_active_user
from app.parser.application import parse_application
from app.database import get_db
from app.models import Application, User

router = APIRouter()
tags_metadata = {
    "name": "applications",
    "description": "Operations with tracking job applications.",
}

@router.get("/applications", tags=["applications"], response_model=List[ApplicationResp])
def fetch_all_applications(current_user: User = Depends(get_current_active_user), db: Session = Depends(get_db), skip: int=0, limit: int=100):    
    user_id = current_user.id
    applications = db.query(Application).filter(Application.user_id == user_id).offset(skip).limit(limit).all()
    
    return applications

@router.post("/applications", tags=["applications"], response_model=ApplicationResp)
def create_application(application: ApplicationCreate, current_user: User = Depends(get_current_active_user), db: Session = Depends(get_db)):
    user_id = current_user.id
    pared_application = parse_application(application.dict())
    pared_application["user_id"] = user_id

    db_application = Application(**pared_application)
    db.add(db_application)
    db.commit()
    db.refresh(db_application)
    
    return db_application

@router.get("/applications/{application_id}", tags=["applications"], response_model=ApplicationResp)
def fetch_application_by_id(application_id: str, current_user: User = Depends(get_current_active_user),  db: Session = Depends(get_db)):
    user_id = current_user.id
    db_application = db.get(Application, application_id)
    
    if not db_application:
        raise HTTPException(status_code=404, detail="Application not found")
    
    if(db_application.user_id != user_id):
        raise HTTPException(status_code=404, detail="Application not found")
    
    return db_application

@router.put("/applications/{application_id}", tags=["applications"], response_model=ApplicationResp)
def update_application_by_id(application_id: str, application: ApplicationUpdate, current_user: User = Depends(get_current_active_user), db: Session = Depends(get_db)):
    user_id = current_user.id 
    db_application = db.get(Application, application_id)
    
    if(db_application.user_id != user_id):
        raise HTTPException(status_code=404, detail="Application not found")

    for field, value in application.dict().items():
        setattr(db_application, field, value)
    
    db.commit()
    db.refresh(db_application)
    
    return db_application

@router.delete("/applications/{application_id}", tags=["applications"], status_code=status.HTTP_200_OK)
def delete_application_by_id(application_id: str, current_user: User = Depends(get_current_active_user), db: Session = Depends(get_db)):
    user_id = current_user.id
    db_application = db.get(Application, application_id)
    
    if not db_application:
        raise HTTPException(status_code=404, detail="Application not found")
    
    if(db_application.user_id != user_id):
        raise HTTPException(status_code=404, detail="Application not found")
    
    db.delete(db_application)
    db.commit()

    return {"detail": f"Application with id {application_id} deleted."}
