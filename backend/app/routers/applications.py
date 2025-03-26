import json
from fastapi import APIRouter, Depends, status, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.schema.applications import  ApplicationResp, ApplicationCreate, ApplicationUpdate
from app.database import get_db
from app.models import Application

router = APIRouter()

@router.get("/applications", response_model=List[ApplicationResp])
def fetch_all_applications(db: Session = Depends(get_db), skip: int=0, limit: int=100):    
    applications = db.query(Application).offset(skip).limit(limit).all()
    
    return applications

@router.post("/applications", response_model=ApplicationResp)
def create_application(application: ApplicationCreate, db: Session = Depends(get_db)):
    db_application = Application(**application.dict())
    
    db.add(db_application)
    db.commit()
    db.refresh(db_application)
    
    return db_application

@router.get("/applications/{application_id}", response_model=ApplicationResp)
def fetch_application_by_id(application_id: str, db: Session = Depends(get_db)):
    application = db.get(Application, application_id)
    
    if not application:
        raise HTTPException(status_code=404, detail="Item not found")
    
    return application

@router.put("/applications/{application_id}", response_model=ApplicationResp)
def update_application_by_id(application_id: str, application: ApplicationUpdate, db: Session = Depends(get_db)):
    db_application = db.get(Application, application_id)
    
    for field, value in application.dict().items():
        setattr(db_application, field, value)
    
    db.commit()
    db.refresh(db_application)
    
    return db_application

@router.delete("/applications/{application_id}", status_code=status.HTTP_200_OK)
def delete_application_by_id(application_id: str, db: Session = Depends(get_db)):
    db_application = db.get(Application, application_id)
    
    if not db_application:
        raise HTTPException(status_code=404, detail="Application not found")
    db.delete(db_application)
    db.commit()

    return {"detail": f"Application with id {application_id} deleted."}
