from pydantic import BaseModel
from typing import Optional

class ProjectBase(BaseModel):
    title: str
    description: str
    year: str
    url: str

class ProjectCreate(ProjectBase):
    pass

class ProjectUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    year: Optional[str] = None
    url: Optional[str] = None

class ProjectResp(ProjectBase):
    id: str
    user_id: str
    class Config:
        orm_mode = True
