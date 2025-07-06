from fastapi import APIRouter
from app.api.endpoints import auth, settings, briefings

api_router = APIRouter()

# Include endpoint routers
api_router.include_router(auth.router, prefix="/auth", tags=["authentication"])
api_router.include_router(settings.router, prefix="/settings", tags=["settings"])
api_router.include_router(briefings.router, prefix="/briefings", tags=["briefings"])