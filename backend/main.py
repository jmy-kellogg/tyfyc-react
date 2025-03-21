import uvicorn
import json
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List


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

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8080)
