from fastapi import APIRouter, Depends

from app.auth.auth_handler import get_current_active_user
from app.schemas.user import UserResponse
from app.models import User

router = APIRouter()

@router.get("/users/me/", response_model=UserResponse)
async def fetch_user(current_user: User = Depends(get_current_active_user)):
    print(current_user)
    return current_user
