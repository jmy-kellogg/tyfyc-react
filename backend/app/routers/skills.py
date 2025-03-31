from fastapi import APIRouter
from fastapi import APIRouter, Depends, status, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.schemas.skills import SkillOptions, SkillOptionsResp, SkillOptionCreate, SkillOptionUpdate, SkillResp, SkillCreate
from app.auth.auth_handler import get_current_active_user
from app.database import get_db
from app.models import SkillsOption, Skill, User

router = APIRouter()

tags_metadata = {
    "name": "skills",
    "description": "Operations with technical skills"
}

@router.get("/skills", tags=["skills"], response_model=List[SkillResp])
def get_skills(current_user: User = Depends(get_current_active_user), db: Session = Depends(get_db),  skip: int=0, limit: int=100):
    user_id = current_user.id
    skills = db.query(Skill).filter(Skill.user_id == user_id).offset(skip).limit(limit).all()

    return skills

@router.post("/skills", tags=["skills"], response_model=SkillResp)
def create_skill_option(skill: SkillCreate, current_user: User = Depends(get_current_active_user), db: Session = Depends(get_db)):
    user_id = current_user.id
    skill_option = db.get(SkillsOption, skill.option_id)
    if not skill_option:
        raise HTTPException(status_code=404, detail="Skill option not found")
    
    db_skill = Skill(
      category=skill.category,
      skill_options_id=skill.skill_options_id,
      user_id=user_id
    )
  
    db.add(db_skill)
    db.commit()
    db.refresh(db_skill)
    
    return db_skill

@router.delete("/skills/{skill_id}", tags=["skills"], status_code=status.HTTP_200_OK)
def delete_by_id(skill_id: str, db: Session = Depends(get_db)):
    db_skill = db.get(SkillOptions, skill_id)
    
    if not db_skill:
        raise HTTPException(status_code=404, detail="Skill not found")
    db.delete(db_skill)
    db.commit()

    return {"detail": f"Skill with id {skill_id} deleted."}


@router.get("/skill_options", tags=["skills"], response_model=List[SkillOptionsResp])
def get_skills_options(db: Session = Depends(get_db), skip: int=0, limit: int=100):    
    skill_options = db.query(SkillOptions).offset(skip).limit(limit).all()
    
    return skill_options

@router.post("/skill_options", tags=["skills"], response_model=SkillOptionsResp)
def create_skill_option(skill_option: SkillOptionCreate, db: Session = Depends(get_db)):
    db_skill_option = SkillsOption(**skill_option.dict())
    db.add(db_skill_option)
    db.commit()
    db.refresh(db_skill_option)
    
    return db_skill_option


@router.get("/skill_options/{skill_option_id}", tags=["skills"], response_model=SkillOptionsResp)
def fetch_skill_option_by_id(skill_option_id: str, db: Session = Depends(get_db)):
    skill_option = db.get(SkillsOption, skill_option_id)
    
    if not skill_option:
        raise HTTPException(status_code=404, detail="Skill option not found")
    
    return skill_option

@router.put("/skill_options/{skill_option_id}", tags=["skills"], response_model=SkillOptionsResp)
def update_application_by_id(application_id: str, skill_option: SkillOptionUpdate, db: Session = Depends(get_db)):
    db_skill_option = db.get(SkillOptions, application_id)
    
    for field, value in skill_option.dict().items():
        setattr(db_skill_option, field, value)
    
    db.commit()
    db.refresh(db_skill_option)
    
    return db_skill_option

@router.delete("/skill_option/{skill_option_id}", tags=["skills"], status_code=status.HTTP_200_OK)
def delete_application_by_id(skill_option_id: str, db: Session = Depends(get_db)):
    db_skill_option = db.get(SkillOptions, skill_option_id)
    
    if not db_skill_option:
        raise HTTPException(status_code=404, detail="Skill Option not found")
    db.delete(db_skill_option)
    db.commit()

    return {"detail": f"Skill Option with id {skill_option_id} deleted."}
