from pydantic import BaseModel
from typing import Optional

class EmploymentBase(BaseModel):
    job_title: str
    company: str
    start: str
    end: str
    location: str
    description: str

class EmploymentCreate(EmploymentBase):
    pass

class EmploymentUpdate(BaseModel):
    job_title: Optional[str] = None
    company: Optional[str] = None
    start: Optional[str] = None
    end: Optional[str] = None
    location: Optional[str] = None
    description: Optional[str] = None

class EmploymentResp(EmploymentBase):
    id: str
    user_id: str
    class Config:
        orm_mode = True
