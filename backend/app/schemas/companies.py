from pydantic import BaseModel

class CompanyResearch(BaseModel):
    name: str
    site: str
    location: str
    size: str
    industry: str
    funding: str
