from fastapi import APIRouter, Depends, status, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import select, text
from typing import List

from app.schemas.skills import SkillOptionsResp, SkillOptionCreate, SkillOptionUpdate, SkillResp, SkillCreate, SkillUpdate
from app.auth.auth_handler import get_current_active_user
from app.database import get_db, engine
from app.models import SkillsOption, Skill, User


router = APIRouter()

tags_metadata = {
    "name": "skills",
    "description": "Operations with technical skills"
}

@router.get("/skills", tags=["skills"], response_model=List[SkillResp])
def get_skills(current_user: User = Depends(get_current_active_user), db: Session = Depends(get_db)):
    user_id = current_user.id
    
    stmt = select(
        Skill.id,
        Skill.category,
        Skill.skill_options_id,
        Skill.rank,
        SkillsOption.name,
        SkillsOption.default_category
    ).select_from(Skill).join(
        SkillsOption, 
        Skill.skill_options_id == SkillsOption.id
    ).filter(Skill.user_id == user_id)
    
    results = db.execute(stmt)
    
    skills = [
        {
            "id": item[0],
            "category": item[1],
            "skill_options_id": item[2],
            "rank": item[3],
            "name": item[4],
            "default_category": item[5],
        }
        for item in results
    ]

    return skills

@router.post("/skills", tags=["skills"], response_model=SkillResp)
def create_skill(skill: SkillCreate, current_user: User = Depends(get_current_active_user), db: Session = Depends(get_db)):
    user_id = current_user.id
    skill_option = db.get(SkillsOption, skill.skill_options_id)
    existing_skill = db.query(Skill).filter(Skill.user_id == user_id, Skill.skill_options_id == skill.skill_options_id).first()

    if not skill_option:
        raise HTTPException(status_code=404, detail="Skill option not found")
    
    if existing_skill:
        raise HTTPException(status_code=404, detail="Skill already exist for User")
    
    db_skill = Skill(
      category=skill.category,
      skill_options_id=skill.skill_options_id,
      rank=skill.rank,
      user_id=user_id
    )
    db.add(db_skill)
    db.commit()
    db.refresh(db_skill)

    skill_response = {
        "id": db_skill.id,
        "category": db_skill.category,
        "skill_options_id":  db_skill.skill_options_id,
        "rank": db_skill.rank,
        "name": skill_option.name,
        "default_category": skill_option.default_category
    }
    
    return skill_response

@router.put("/skills/{skill_id}", tags=["skills"], response_model=SkillResp)
def update_skill(skill_id: str, skill: SkillUpdate, current_user: User = Depends(get_current_active_user), db: Session = Depends(get_db)):
    user_id = current_user.id
    db_skill = db.get(Skill, skill_id)
    skill_option = db.get(SkillsOption, skill.skill_options_id)
    
    if not skill_option:
        raise HTTPException(status_code=404, detail="Skill option not found")

    if db_skill:
        if db_skill.user_id != user_id:
            raise HTTPException(status_code=404, detail="Skill not found for user")

        for field, value in skill.dict(exclude_unset=True).items():
            if value is not None:
                setattr(db_skill, field, value)
    else:
        db_skill = Skill(
          category=skill.category,
          skill_options_id=skill.skill_options_id,
          rank=skill.rank,
          user_id=user_id
        )
        db.add(db_skill)
    
    db.commit()
    db.refresh(db_skill)

    skill_response = {
        "id": db_skill.id,
        "category": db_skill.category,
        "skill_options_id":  db_skill.skill_options_id,
        "rank": db_skill.rank,
        "name": skill_option.name,
        "default_category": skill_option.default_category
    }
    
    return skill_response

@router.patch("/skills/{skill_id}", tags=["skills"], response_model=SkillResp)
def update_skill(skill_id: str, skill: SkillUpdate, current_user: User = Depends(get_current_active_user), db: Session = Depends(get_db)):
    user_id = current_user.id
    db_skill = db.get(Skill, skill_id)
    if not db_skill or db_skill.user_id != user_id:
        raise HTTPException(status_code=404, detail="Skill not found")

    skill_option = db.get(SkillsOption, db_skill.skill_options_id)
    if not skill_option:
        raise HTTPException(status_code=404, detail="Skill option not found")

    for field, value in skill.dict(exclude_unset=True).items():
        if value is not None:
            setattr(db_skill, field, value)
    
    db.commit()
    db.refresh(db_skill)

    skill_response = {
        "id": db_skill.id,
        "category": db_skill.category,
        "skill_options_id":  db_skill.skill_options_id,
        "rank": db_skill.rank,
        "name": skill_option.name,
        "default_category": skill_option.default_category
    }
    
    return skill_response

@router.delete("/skills/{skill_id}", tags=["skills"], status_code=status.HTTP_200_OK)
def delete_by_id(skill_id: str, db: Session = Depends(get_db)):
    db_skill = db.get(Skill, skill_id)
    
    if not db_skill:
        raise HTTPException(status_code=404, detail="Skill not found")
    db.delete(db_skill)
    db.commit()

    return {"detail": f"Skill with id {skill_id} deleted."}


@router.get("/skill_options", tags=["skills"], response_model=List[SkillOptionsResp])
def get_skills_options(db: Session = Depends(get_db), skip: int=0, limit: int=1000):    
    skill_options = db.query(SkillsOption).offset(skip).limit(limit).all()
    
    return skill_options

@router.post("/skill_options", tags=["skills"], response_model=SkillOptionsResp)
def create_skill_option(skill_option: SkillOptionCreate, db: Session = Depends(get_db)):
    existing_skill_option = db.query(SkillsOption).filter(SkillsOption.name == skill_option.name).first()
    if existing_skill_option:
        raise HTTPException(status_code=404, detail="Skill Option already exists")
    

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
    db_skill_option = db.get(SkillsOption, application_id)
    
    for field, value in skill_option.dict().items():
        setattr(db_skill_option, field, value)
    
    db.commit()
    db.refresh(db_skill_option)
    
    return db_skill_option

@router.delete("/skill_option/{skill_option_id}", tags=["skills"], status_code=status.HTTP_200_OK)
def delete_application_by_id(skill_option_id: str, db: Session = Depends(get_db)):
    db_skill_option = db.get(SkillsOption, skill_option_id)
    
    if not db_skill_option:
        raise HTTPException(status_code=404, detail="Skill Option not found")
    db.delete(db_skill_option)
    db.commit()

    return {"detail": f"Skill Option with id {skill_option_id} deleted."}
