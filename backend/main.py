"""
Cloud-Based AI Digital Twin for Smart Village Resource Monitoring
FastAPI Backend Entry Point
"""

import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from dotenv import load_dotenv

from  database.init_db import init_database
from .routes import (
    dashboard,
    resources,
    water,
    agriculture,
    electricity,
    weather,
    environment,
    infrastructure,
    historical,
    predictions,
    risks,
    alerts,
    recommendations,
    simulation,
)

load_dotenv()

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Ensure database schema is created and seeded
    print("Initializing Smart Village PostgreSQL database...")
    init_database()
    print("Database initialization complete.")
    yield
    # Shutdown logic if needed
    print("Shutting down Smart Village API service.")

app = FastAPI(
    title="Smart Village AI Digital Twin API",
    description="REST API for Smart Village Resource Monitoring: water, agriculture, electricity, weather, infrastructure, and what-if simulation.",
    version="1.0.0",
    lifespan=lifespan
)

# CORS Configuration
origins_env = os.getenv("CORS_ORIGINS", "*")
if origins_env == "*":
    allow_origins = ["*"]
else:
    allow_origins = [orig.strip() for orig in origins_env.split(",") if orig.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allow_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Health Check Endpoint
@app.get("/health", tags=["Health"])
def health_check():
    return {
        "status": "online",
        "system": "Smart Village AI Digital Twin",
        "version": "1.0.0",
        "database": "PostgreSQL connected",
        "timestamp": os.getenv("ENVIRONMENT", "development")
    }

# Register Routers
app.include_router(dashboard.router)
app.include_router(resources.router)
app.include_router(water.router)
app.include_router(agriculture.router)
app.include_router(electricity.router)
app.include_router(weather.router)
app.include_router(environment.router)
app.include_router(infrastructure.router)
app.include_router(historical.router)
app.include_router(predictions.router)
app.include_router(risks.router)
app.include_router(alerts.router)
app.include_router(recommendations.router)
app.include_router(simulation.router)

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run("backend.main:app", host="0.0.0.0", port=port, reload=True)
