from pydantic import BaseModel

class SummaryBase(BaseModel):
    summary: str
    application_id: str

class SummaryCreate(BaseModel):
    summary: str

class SummaryUpdate(BaseModel):
    summary: str

class ApplicationResp(SummaryBase):
    id: str
    class Config:
        orm_mode = True
