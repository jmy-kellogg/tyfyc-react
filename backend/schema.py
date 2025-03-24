from pydantic import BaseModel
from typing import List

class Skill(BaseModel):
    label: str
    value: str

class Skills(BaseModel):
    options: List[Skill]

class ApplicationBase(BaseModel):
    company: str
    title: str
    status: str
    status: str
    date_applied: str
    salary: str
    posting_link: str
    company_site: str
    posting: str

class ApplicationModel(ApplicationBase):
    id: int
    class Config:
        orm_mode = True
