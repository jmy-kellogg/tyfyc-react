from pydantic import BaseModel
from typing import Optional
from enum import Enum

class WorkplaceType(str, Enum):
    REMOTE = "remote"
    HYBRID = "hybrid"
    ONSITE = "onsite"
    UNKNOWN = "unknown"

# Research generated from OpenAI
class CompanyResearch(BaseModel):
    name: str
    site: str
    location: str
    size: str
    industry: str
    funding: str

class CompanyBase(BaseModel):
    site: str
    name: str
    industry: Optional[str] = None
    summary: Optional[str] = None
    size: Optional[str] = None
    location: Optional[str] = None
    funding: Optional[str] = None
    workplace_type: Optional[WorkplaceType] = WorkplaceType.UNKNOWN
    verified: bool = False

class CompanyCreate(CompanyBase):
    pass

class CompanyUpdate(BaseModel):
    site: Optional[str] = None
    name: Optional[str] = None
    industry: Optional[str] = None
    summary: Optional[str] = None
    size: Optional[str] = None
    location: Optional[str] = None
    funding: Optional[str] = None
    workplace_type: Optional[WorkplaceType] = None
    verified: Optional[bool] = None

class CompanyResp(CompanyBase):
    id: str
    user_id: str

    class Config:
        orm_mode = True
