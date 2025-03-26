import uvicorn
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine

from app.routers import skills, applications, auth, user

Base.metadata.create_all(bind=engine)

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

app.include_router(auth.router)
app.include_router(user.router)
app.include_router(skills.router)
app.include_router(applications.router)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8080)
