import uvicorn
import json
from fastapi import FastAPI, HTTPException, Depends
from typing import Annotated
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

from database import SessionLocal, engine
import models

app = FastAPI(debug=True)

origins = [
  "http://localhost:8000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

options = []

with open('skills.json') as  json_data:
  data = json.load(json_data)
  options = data["options"]


class Skill(BaseModel):
    label: str
    value: str

class Skills(BaseModel):
    options: List[Skill]

@app.get("/skills", response_model=Skills)
def get_skills_options():
    return Skills(options=options)


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

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]

models.Base.metadata.create_all(bind=engine)

@app.get("/applications", response_model=List[ApplicationModel])
def read_applications(db: db_dependency, skip: int=0, limit: int=100):
    applications = db.query(models.Application).offset(skip).limit(limit).all()
    return applications


@app.post("/applications/", response_model=ApplicationModel)
async def create_application(application: ApplicationBase, db: db_dependency):
    db_application = models.Application(**application.dict())
    db.add(db_application)
    db.commit()
    db.refresh(db_application)
    return db_application

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8080)
