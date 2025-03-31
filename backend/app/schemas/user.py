from pydantic import BaseModel

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
 
class UserResponse(BaseModel):
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

class UserInDB(UserResponse):
    id: str
    hashed_password: str
    class Config:
        orm_mode = True
