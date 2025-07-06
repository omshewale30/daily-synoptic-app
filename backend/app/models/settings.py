from pydantic import BaseModel
from typing import Optional, List

class UserSettings(BaseModel):
    """User settings model."""
    user_id: str
    
    # Calendar settings
    google_calendar_connected: bool = False
    calendar_integration_enabled: bool = True
    
    # Weather settings
    location: Optional[str] = None
    weather_enabled: bool = True
    
    # News settings
    news_sources: List[str] = []
    news_enabled: bool = True
    
    # Briefing settings
    briefing_time: Optional[str] = "08:00"  # 24-hour format
    briefing_timezone: Optional[str] = "UTC"
    audio_enabled: bool = True
    
    class Config:
        from_attributes = True

class UserSettingsUpdate(BaseModel):
    """User settings update model."""
    location: Optional[str] = None
    weather_enabled: Optional[bool] = None
    news_sources: Optional[List[str]] = None
    news_enabled: Optional[bool] = None
    briefing_time: Optional[str] = None
    briefing_timezone: Optional[str] = None
    audio_enabled: Optional[bool] = None