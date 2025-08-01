from fastapi import APIRouter, Depends, status, HTTPException
from app.schemas.companies import CompanyResearch
from app.openAI.company_research import get_company_name_from_url 

router = APIRouter()
tags_metadata = {
    "name": "companies",
    "description": "Operations for companies information",
}

@router.get("/companies/research/", tags=["companies"], response_model=CompanyResearch)
def research_company(company_site: str): 
    company = get_company_name_from_url(company_site)

    if company.get("error"):
     return {"error": f"Failed to parse JSON for {company_site}"}
    
    company_results = {
      "name": company.get("name", ""),
      "site": company_site,
      "location": company.get("location", ""),
      "size": company.get("size", ""),
      "industry": company.get("industry", ""),
      "funding": company.get("funding", ""),
    }

    return  company_results

