from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.responses import RedirectResponse
from datetime import timedelta
from app.core.config import settings
from app.core.security import verify_password, get_password_hash, create_access_token
from app.models.user import User, UserCreate
from app.models.token import Token
import uuid

router = APIRouter()

# In-memory user storage (replace with database in production)
fake_users_db = {}

@router.post("/signup", response_model=User)
async def signup(user: UserCreate):
    """Register a new user."""
    # Check if user already exists
    if any(u["email"] == user.email for u in fake_users_db.values()):
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )
    
    # Create new user
    user_id = str(uuid.uuid4())
    hashed_password = get_password_hash(user.password)
    
    fake_users_db[user_id] = {
        "id": user_id,
        "email": user.email,
        "full_name": user.full_name,
        "hashed_password": hashed_password,
        "is_active": True
    }
    
    return User(
        id=user_id,
        email=user.email,
        full_name=user.full_name,
        is_active=True
    )

@router.post("/login", response_model=Token)
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    """Login endpoint that returns JWT token."""
    # Find user by email
    user = None
    for u in fake_users_db.values():
        if u["email"] == form_data.username:
            user = u
            break
    
    if not user or not verify_password(form_data.password, user["hashed_password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Create access token
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user["id"], "email": user["email"]},
        expires_delta=access_token_expires
    )
    
    return Token(
        access_token=access_token,
        token_type="bearer",
        expires_in=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
        user={
            "id": user["id"],
            "email": user["email"],
            "full_name": user["full_name"]
        }
    )

@router.get("/google")
async def google_auth():
    """Redirect to Google OAuth consent screen."""
    # TODO: Implement Google OAuth flow
    # This will redirect to Google's OAuth consent screen
    # For now, return a placeholder response
    return {"message": "Google OAuth not implemented yet"}

@router.get("/google/callback")
async def google_callback(code: str = None, state: str = None):
    """Handle Google OAuth callback."""
    # TODO: Implement Google OAuth callback handling
    # This will:
    # 1. Exchange the authorization code for access token
    # 2. Fetch user profile from Google
    # 3. Create or update user in database
    # 4. Return JWT token for our app
    return {"message": "Google OAuth callback not implemented yet"}