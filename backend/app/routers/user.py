from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.auth.auth_handler import get_current_active_user
from app.schemas.user import UserResponse, UserUpdate
from app.database import get_db
from app.models import User


router = APIRouter()
tags_metadata = {
    "name": "user",
    "description": "Operations with Users"
}

@router.get("/users/me", tags=["user"], response_model=UserResponse)
async def fetch_user(current_user: User = Depends(get_current_active_user)):
    return current_user

@router.put("/users/me",  tags=["user"], response_model=UserResponse)
async def fetch_user(user: UserUpdate, current_user: User = Depends(get_current_active_user), db: Session = Depends(get_db)):
    print(user)
    for field, value in user.dict().items():
        print(field, value)
        if(value):
            setattr(current_user, field, value)
    
    db.commit()
    db.refresh(current_user)

    return current_user

