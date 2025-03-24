from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from schema import ApplicationBase, ApplicationModel
from typing import Annotated, List
from database import get_db
import models

router = APIRouter()

db_dependency = Annotated[Session, Depends(get_db)]

@router.get("/applications", response_model=List[ApplicationModel])
def read_applications(db: db_dependency, skip: int=0, limit: int=100):
    applications = db.query(models.Application).offset(skip).limit(limit).all()
    return applications

@router.post("/applications/", response_model=ApplicationModel)
async def create_application(application: ApplicationBase, db: db_dependency):
    db_application = models.Application(**application.dict())
    db.add(db_application)
    db.commit()
    db.refresh(db_application)
    return db_application
