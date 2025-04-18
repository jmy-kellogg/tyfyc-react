import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBasic

from app.database import Base, engine

from app.routers import auth, user, feature_flags, applications, skills, employment, education, projects

Base.metadata.create_all(bind=engine)

tags_metadata = [
  auth.tags_metadata,
  user.tags_metadata,
  feature_flags.tags_metadata,
  applications.tags_metadata,
  skills.tags_metadata
]

app = FastAPI(debug=True, openapi_tags=tags_metadata)

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


app.include_router(auth.router)
app.include_router(user.router)
app.include_router(feature_flags.router)
app.include_router(applications.router)
app.include_router(skills.router)
app.include_router(employment.router)
app.include_router(education.router)
app.include_router(projects.router)

security = HTTPBasic()

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8080, reload=True)
