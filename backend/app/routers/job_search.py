from fastapi import APIRouter, Depends, status, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.schemas.job_search import JobSearchResp, JobSearchCreate, JobSearchUpdate
from app.auth.auth_handler import get_current_active_user
from app.database import get_db
from app.models import JobSearch, User

router = APIRouter()
tags_metadata = {
    "name": "job_search",
    "description": "Operations for managing job search links",
}

@router.get("/job_search", tags=["job_search"], response_model=List[JobSearchResp])
def fetch_all_job_searches(
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    user_id = current_user.id
    db_job_searches = db.query(JobSearch).filter(JobSearch.user_id == user_id).all()

    return db_job_searches

@router.post("/job_search", tags=["job_search"], response_model=JobSearchResp, status_code=status.HTTP_201_CREATED)
def create_job_search(
    job_search: JobSearchCreate,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    user_id = current_user.id
    db_job_search = JobSearch(
        link=job_search.link,
        name=job_search.name,
        details=job_search.details,
        board_name=job_search.board_name,
        user_id=user_id
    )
    db.add(db_job_search)
    db.commit()
    db.refresh(db_job_search)
    return db_job_search

@router.get("/job_search/{job_search_id}", tags=["job_search"], response_model=JobSearchResp)
def fetch_job_search_by_id(
    job_search_id: str,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    user_id = current_user.id
    db_job_search = db.get(JobSearch, job_search_id)

    if not db_job_search:
        raise HTTPException(status_code=404, detail="Job search not found")

    if db_job_search.user_id != user_id:
        raise HTTPException(status_code=404, detail="Job search not found")

    return db_job_search

@router.put("/job_search/{job_search_id}", tags=["job_search"], response_model=JobSearchResp)
def update_job_search_by_id(
    job_search_id: str,
    job_search: JobSearchUpdate,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    user_id = current_user.id
    db_job_search = db.get(JobSearch, job_search_id)

    if not db_job_search:
        raise HTTPException(status_code=404, detail="Job search not found")

    if db_job_search.user_id != user_id:
        raise HTTPException(status_code=404, detail="Job search not found")

    for field, value in job_search.dict(exclude_unset=True).items():
        if value is not None:
            setattr(db_job_search, field, value)

    db.commit()
    db.refresh(db_job_search)
    return db_job_search

@router.delete("/job_search/{job_search_id}", tags=["job_search"], status_code=status.HTTP_200_OK)
def delete_job_search_by_id(
    job_search_id: str,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    user_id = current_user.id
    db_job_search = db.get(JobSearch, job_search_id)

    if not db_job_search:
        raise HTTPException(status_code=404, detail="Job search not found")
    if db_job_search.user_id != user_id:
        raise HTTPException(status_code=404, detail="Job search not found")

    db.delete(db_job_search)
    db.commit()

    return {"detail": f"Job search with id {job_search_id} deleted."}
