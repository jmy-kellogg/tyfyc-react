from pydantic import BaseModel
from typing import Optional

class ApplicationBase(BaseModel):
    company: str
    title: str
    status: str
    date_applied: str
    location: str
    salary: str
    posting_link: str
    company_site: str
    posting: str
    summary: str
    notes: str
    resume: str

class ApplicationCreate(BaseModel):
    company: str | None = "" 
    title: str | None = ""
    status: str | None = ""
    date_applied: str | None = ""
    location: str | None = ""
    salary: str | None = ""
    posting_link: str | None = ""
    company_site: str | None = ""
    posting: str | None = ""
    summary: str | None = "" 
    notes: str | None = "" 
    resume: str | None = "" 

class ApplicationUpdate(BaseModel):
    company:  Optional[str]
    title:  Optional[str]
    status:  Optional[str]
    date_applied:  Optional[str]
    location:  Optional[str]
    salary:  Optional[str]
    posting_link:  Optional[str]
    company_site:  Optional[str]
    posting:  Optional[str]
    summary:  Optional[str]
    notes:  Optional[str]
    resume:  Optional[str]

class ApplicationResp(ApplicationBase):
    id: str
    class Config:
        orm_mode = True
