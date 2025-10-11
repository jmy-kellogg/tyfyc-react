from fastapi import APIRouter, Depends, status, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.schemas.companies import CompanyResearch, CompanyResp, CompanyCreate, CompanyUpdate
from app.openAI.company_research import get_company_name_from_url
from app.auth.auth_handler import get_current_active_user
from app.database import get_db
from app.models import Companies, User

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

@router.get("/companies", tags=["companies"], response_model=List[CompanyResp])
def fetch_all_companies(
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    user_id = current_user.id
    db_companies = db.query(Companies).filter(Companies.user_id == user_id).all()
    return db_companies

@router.post("/companies", tags=["companies"], response_model=CompanyResp, status_code=status.HTTP_201_CREATED)
def create_company(
    company: CompanyCreate,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    user_id = current_user.id
    db_company = Companies(
        site=company.site,
        name=company.name,
        industry=company.industry,
        summary=company.summary,
        size=company.size,
        location=company.location,
        funding=company.funding,
        workplace_type=company.workplace_type,
        verified=company.verified,
        user_id=user_id
    )
    db.add(db_company)
    db.commit()
    db.refresh(db_company)
    return db_company

@router.get("/companies/{company_id}", tags=["companies"], response_model=CompanyResp)
def fetch_company_by_id(
    company_id: str,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    user_id = current_user.id
    db_company = db.get(Companies, company_id)

    if not db_company:
        raise HTTPException(status_code=404, detail="Company not found")

    if db_company.user_id != user_id:
        raise HTTPException(status_code=404, detail="Company not found")

    return db_company

@router.put("/companies/{company_id}", tags=["companies"], response_model=CompanyResp)
def update_company_by_id(
    company_id: str,
    company: CompanyUpdate,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    user_id = current_user.id
    db_company = db.get(Companies, company_id)

    if not db_company:
        raise HTTPException(status_code=404, detail="Company not found")

    if db_company.user_id != user_id:
        raise HTTPException(status_code=404, detail="Company not found")

    for field, value in company.dict(exclude_unset=True).items():
        if value is not None:
            setattr(db_company, field, value)

    db.commit()
    db.refresh(db_company)
    return db_company

@router.delete("/companies/{company_id}", tags=["companies"], status_code=status.HTTP_200_OK)
def delete_company_by_id(
    company_id: str,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    user_id = current_user.id
    db_company = db.get(Companies, company_id)

    if not db_company:
        raise HTTPException(status_code=404, detail="Company not found")

    if db_company.user_id != user_id:
        raise HTTPException(status_code=404, detail="Company not found")

    db.delete(db_company)
    db.commit()

    return {"detail": f"Company with id {company_id} deleted."}
