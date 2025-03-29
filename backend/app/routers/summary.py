import json
from fastapi import APIRouter, Depends, status, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.schemas.summary import  SummaryResp, SummaryCreate, SummaryUpdate
from app.parser.application import parse_application
from app.database import get_db
from app.models import Summary

router = APIRouter()
tags_metadata = {
    "name": "summary",
    "description": "Operations for creating custom summary.",
}

@router.get("/summary", tags=["summary"], response_model=List[SummaryResp])
def fetch_all_summaries(db: Session = Depends(get_db), skip: int=0, limit: int=100):    
    summary = db.query(Summary).offset(skip).limit(limit).all()
    
    return summary

@router.post("/summary", tags=["summary"], response_model=SummaryResp)
def create_summary(summary: SummaryCreate, db: Session = Depends(get_db)):
    db_summary = Summary(**summary.dict())
    db.add(db_summary)
    db.commit()
    db.refresh(db_summary)
    
    return db_summary

@router.get("/summary/{summary_id}", tags=["summary"], response_model=SummaryResp)
def fetch_summary_id(summary_id: str, db: Session = Depends(get_db)):
    summary = db.get(Summary, summary_id)
    
    if not summary:
        raise HTTPException(status_code=404, detail="Item not found")
    
    return summary

@router.put("/summary/{summary_id}", tags=["summary"], response_model=SummaryResp)
def update_application_by_id(summary_id: str, application: SummaryUpdate, db: Session = Depends(get_db)):
    db_summary = db.get(Summary, summary_id)
    
    for field, value in application.dict().items():
        setattr(db_summary, field, value)
    
    db.commit()
    db.refresh(db_summary)
    
    return db_summary

@router.delete("/summary/{summary_id}", tags=["summary"], status_code=status.HTTP_200_OK)
def delete_application_by_id(summary_id: str, db: Session = Depends(get_db)):
    db_summary = db.get(Summary, summary_id)
    
    if not db_summary:
        raise HTTPException(status_code=404, detail="Summary not found")
    db.delete(db_summary)
    db.commit()

    return {"detail": f"Summary with id {summary_id} deleted."}
