import json
from fastapi import APIRouter
from schema import Skills

router = APIRouter()

options = []

with open('skills.json') as  json_data:
  data = json.load(json_data)
  options = data["options"]

@router.get("/skills", response_model=Skills)
def get_skills_options():
    return Skills(options=options)

