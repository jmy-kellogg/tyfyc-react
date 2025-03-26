from pydantic import BaseModel
from typing import List

class Skill(BaseModel):
    label: str
    value: str

class Skills(BaseModel):
    options: List[Skill]
