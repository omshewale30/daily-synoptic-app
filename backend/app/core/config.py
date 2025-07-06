import os
from pydantic import BaseSettings

class Settings(BaseSettings):
    """Application settings and configuration."""
    
    # App settings
    APP_NAME: str = "The Daily Synoptic API"
    DEBUG: bool = os.getenv("DEBUG", "false").lower() == "true"
    
    # Security settings
    SECRET_KEY: str = os.getenv("SECRET_KEY", "your-secret-key-here-change-in-production")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30 * 24 * 60  # 30 days
    
    # Frontend URL
    FRONTEND_URL: str = os.getenv("FRONTEND_URL", "http://localhost:3000")
    
    # Database settings (placeholder for future use)
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./daily_synoptic.db")
    
    # External API settings
    OPENAI_API_KEY: str = os.getenv("OPENAI_API_KEY", "")
    GOOGLE_CLIENT_ID: str = os.getenv("GOOGLE_CLIENT_ID", "")
    GOOGLE_CLIENT_SECRET: str = os.getenv("GOOGLE_CLIENT_SECRET", "")
    WEATHER_API_KEY: str = os.getenv("WEATHER_API_KEY", "")
    NEWS_API_KEY: str = os.getenv("NEWS_API_KEY", "")
    
    class Config:
        env_file = ".env"

settings = Settings()