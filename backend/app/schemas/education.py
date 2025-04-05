from pydantic import BaseModel
from typing import Optional

class EducationBase(BaseModel):
    degree: str
    school: str
    grad_year: str

class EducationCreate(EducationBase):
    pass

class EducationUpdate(BaseModel):
    degree: Optional[str] = None
    school: Optional[str] = None
    grad_year: Optional[str] = None
    
class EducationResp(EducationBase):
    id: str
    user_id: str
    class Config:
        orm_mode = True
