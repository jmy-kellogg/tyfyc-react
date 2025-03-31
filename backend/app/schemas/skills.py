from pydantic import BaseModel
from typing import List, Optional


class SkillBase(BaseModel):
    skill_options_id: str
    category: str

class SkillCreate(BaseModel):
    skill_options_id: str
    category: str | None = ""

class SkillResp(SkillBase):
    id: str
    user_id: str
    class Config:
        orm_mode = True


class SkillOptions(BaseModel):
    name: str
    default_category: str

class SkillOptionCreate(BaseModel):
    name: str
    default_category: str | None = ""

class SkillOptionUpdate(BaseModel):
    name:  Optional[str]
    default_category:  Optional[str]

class SkillOptionsResp(SkillOptions):
    id: str
    class Config:
        orm_mode = True

