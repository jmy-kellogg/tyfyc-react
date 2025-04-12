from pydantic import BaseModel
from typing import Optional

class UserBase(BaseModel):
    first_name: str
    last_name: str
    email: str
    username: str 
    job_title: str 
    summary: str 
    city: str
    state: str
    phone: str
    git_hub: str
    linked_in: str 
    resume: str

class UserCreate(BaseModel):
    first_name: str
    last_name: str
    email: str
    username: str
    password: str
    job_title: str | None = "" 
    summary: str | None = "" 
    city: str | None = "" 
    state: str | None = "" 
    phone: str | None = "" 
    git_hub: str | None = "" 
    linked_in: str | None = "" 
    resume: str | None = "" 

class UserUpdate(BaseModel):
    first_name: Optional[str] =  None
    last_name: Optional[str] =  None
    email: Optional[str] =  None
    job_title: Optional[str] =  None
    summary: Optional[str] =  None
    city: Optional[str] =  None
    state: Optional[str] =  None
    phone: Optional[str] =  None
    git_hub: Optional[str] =  None
    linked_in: Optional[str] =  None
    resume: Optional[str] =  None
 
class UserResponse(UserBase):
    id: str
    hashed_password: str

class UserInDB(UserResponse):
    id: str
    hashed_password: str
    class Config:
        orm_mode = True
