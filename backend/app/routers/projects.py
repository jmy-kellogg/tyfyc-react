import json
from fastapi import APIRouter, Depends, status, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.schemas.projects import ProjectResp, ProjectCreate, ProjectUpdate
from app.auth.auth_handler import get_current_active_user
from app.database import get_db
from app.models import Project, User

router = APIRouter()
tags_metadata = {
    "name": "projects",
    "description": "Operations with tracking projects history",
}

@router.get("/projects", tags=["projects"], response_model=List[ProjectResp])
def fetch_all_projects(current_user: User = Depends(get_current_active_user), db: Session = Depends(get_db)):    
    user_id = current_user.id
    db_projects = db.query(Project).filter(Project.user_id == user_id).all()
    
    return db_projects

@router.post("/projects", tags=["projects"], response_model=ProjectResp)
def create_projects(projects: ProjectCreate, current_user: User = Depends(get_current_active_user), db: Session = Depends(get_db)):
    user_id = current_user.id
    db_projects = Project(
      title=projects.title,
      description=projects.description,
      year=projects.year,
      url=projects.url,
      user_id=user_id
    )
    db.add(db_projects)
    db.commit()
    db.refresh(db_projects)
    
    return db_projects

@router.get("/projects/{projects_id}", tags=["projects"], response_model=ProjectResp)
def fetch_projects_by_id(projects_id: str, current_user: User = Depends(get_current_active_user), db: Session = Depends(get_db)):
    user_id = current_user.id
    db_projects = db.get(Project, projects_id)
    
    if(db_projects.user_id != user_id):
        raise HTTPException(status_code=404, detail="Item not found")
    
    if not db_projects:
        raise HTTPException(status_code=404, detail="Item not found")
    
    return db_projects

@router.put("/projects/{projects_id}", tags=["projects"], response_model=ProjectResp)
def update_projects_by_id(projects_id: str, projects: ProjectUpdate, current_user: User = Depends(get_current_active_user), db: Session = Depends(get_db)):
    user_id = current_user.id
    db_projects = db.get(Project, projects_id)

    if(db_projects.user_id != user_id):
        raise HTTPException(status_code=404, detail="Item not found")
    
    for field, value in projects.dict().items():
        if(value):
          setattr(db_projects, field, value)
    
    db.commit()
    db.refresh(db_projects)
    
    return db_projects

@router.delete("/projects/{projects_id}", tags=["projects"], status_code=status.HTTP_200_OK)
def delete_projects_by_id(projects_id: str, current_user: User = Depends(get_current_active_user), db: Session = Depends(get_db)):
    user_id = current_user.id
    db_projects = db.get(Project, projects_id)
    
    if(db_projects.user_id != user_id):
        raise HTTPException(status_code=404, detail="Item not found")
    if not db_projects:
        raise HTTPException(status_code=404, detail="Project not found")
    
    db.delete(db_projects)
    db.commit()

    return {"detail": f"Project with id {db_projects} deleted."}
