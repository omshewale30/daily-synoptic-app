from pydantic import BaseModel
from typing import Optional

class Token(BaseModel):
    """JWT token response model."""
    access_token: str
    token_type: str = "bearer"
    expires_in: int
    user: dict

class TokenData(BaseModel):
    """Token data model."""
    email: Optional[str] = None
    user_id: Optional[str] = None