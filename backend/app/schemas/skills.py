from pydantic import BaseModel
from typing import Optional

class SkillCreate(BaseModel):
    skill_options_id: str
    category:Optional[str] = ""
    rank: Optional[int] = None

class SkillUpdate(BaseModel):
    skill_options_id: str
    category: Optional[str] = ""
    rank: Optional[int] =  None

class SkillPatch(BaseModel):
    skill_options_id: Optional[str] = None
    category: Optional[str] =  None
    rank: Optional[int] =  None

class SkillResp(BaseModel):
    id: str
    name: str
    default_category: str | None
    skill_options_id: str
    category: str
    rank: int | None
    class Config:
        orm_mode = True

class SkillOptionCreate(BaseModel):
    name: str
    default_category: str | None = ""

class SkillOptionUpdate(BaseModel):
    name:  Optional[str] =  None
    default_category:  Optional[str] =  None

class SkillOptionsResp(BaseModel):
    id: str
    name: str
    default_category: str  | None
    class Config:
        orm_mode = True

