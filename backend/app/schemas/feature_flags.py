import datetime
from pydantic import BaseModel
from typing import Optional

class FeatureFlagBase(BaseModel):
    name: str
    description: str
    is_active: bool

class FeatureFlagCreate(BaseModel):
    name: str 
    description: str
    is_active: Optional[bool] 

class FeatureFlagUpdate(BaseModel):
    description: Optional[str]
    is_active: Optional[bool] 

class FeatureFlagResp(FeatureFlagBase):
    id: str
    date_created: datetime.datetime
    class Config:
        orm_mode = True
