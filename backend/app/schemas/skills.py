from pydantic import BaseModel
from typing import Optional

class SkillBase(BaseModel):
    skill_options_id: str
    category: str
    rank: int | None


class SkillCreate(BaseModel):
    skill_options_id: str
    category: str
    rank: int | None

class SkillResp(SkillBase):
    id: str
    name: str
    default_category: str | None
    class Config:
        orm_mode = True
class SkillOptionsBase(BaseModel):
    name: str
    default_category: str  | None
class SkillOptionCreate(BaseModel):
    name: str
    default_category: str | None = ""

class SkillOptionUpdate(BaseModel):
    name:  Optional[str]
    default_category:  Optional[str]

class SkillOptionsResp(SkillOptionsBase):
    id: str
    class Config:
        orm_mode = True

