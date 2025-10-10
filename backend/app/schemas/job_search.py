from pydantic import BaseModel
from typing import Optional

class JobSearchBase(BaseModel):
    link: str
    name: str
    details: Optional[str] = None
    board_name: Optional[str] = None

class JobSearchCreate(JobSearchBase):
    pass

class JobSearchUpdate(BaseModel):
    link: Optional[str] = None
    name: Optional[str] = None
    details: Optional[str] = None
    board_name: Optional[str] = None

class JobSearchResp(JobSearchBase):
    id: str
    user_id: str

    class Config:
        orm_mode = True
