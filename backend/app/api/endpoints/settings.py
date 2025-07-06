from fastapi import APIRouter, Depends, HTTPException
from app.core.security import get_current_user
from app.models.settings import UserSettings, UserSettingsUpdate

router = APIRouter()

# In-memory settings storage (replace with database in production)
fake_settings_db = {}

@router.get("/", response_model=UserSettings)
async def get_user_settings(current_user: dict = Depends(get_current_user)):
    """Get user settings."""
    user_id = current_user["id"]
    
    # Return default settings if not found
    if user_id not in fake_settings_db:
        return UserSettings(
            user_id=user_id,
            google_calendar_connected=False,
            calendar_integration_enabled=True,
            location=None,
            weather_enabled=True,
            news_sources=[],
            news_enabled=True,
            briefing_time="08:00",
            briefing_timezone="UTC",
            audio_enabled=True
        )
    
    return fake_settings_db[user_id]

@router.post("/", response_model=UserSettings)
async def update_user_settings(
    settings_update: UserSettingsUpdate,
    current_user: dict = Depends(get_current_user)
):
    """Update user settings."""
    user_id = current_user["id"]
    
    # Get existing settings or create new ones
    if user_id in fake_settings_db:
        current_settings = fake_settings_db[user_id]
    else:
        current_settings = UserSettings(user_id=user_id)
    
    # Update fields that were provided
    update_data = settings_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(current_settings, field, value)
    
    # Save updated settings
    fake_settings_db[user_id] = current_settings
    
    return current_settings

@router.post("/google-calendar/connect")
async def connect_google_calendar(current_user: dict = Depends(get_current_user)):
    """Connect Google Calendar."""
    # TODO: Implement Google Calendar connection
    # This will initiate the OAuth flow for Google Calendar
    return {"message": "Google Calendar connection not implemented yet"}

@router.post("/google-calendar/disconnect")
async def disconnect_google_calendar(current_user: dict = Depends(get_current_user)):
    """Disconnect Google Calendar."""
    # TODO: Implement Google Calendar disconnection
    user_id = current_user["id"]
    if user_id in fake_settings_db:
        fake_settings_db[user_id].google_calendar_connected = False
    return {"message": "Google Calendar disconnected"}