from pydantic import BaseModel, EmailStr
from typing import Optional

class UserBase(BaseModel):
    """Base user model."""
    email: EmailStr
    full_name: Optional[str] = None
    is_active: bool = True

class UserCreate(UserBase):
    """User creation model."""
    password: str

class UserUpdate(BaseModel):
    """User update model."""
    full_name: Optional[str] = None
    is_active: Optional[bool] = None

class UserInDB(UserBase):
    """User model as stored in database."""
    id: str
    hashed_password: str

class User(UserBase):
    """User model for API responses."""
    id: str

    class Config:
        from_attributes = True