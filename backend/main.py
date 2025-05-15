from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.suggest import router
from backend.db import engine
from backend.models import Base
from fastapi.staticfiles import StaticFiles

app = FastAPI()

Base.metadata.create_all(bind=engine)

# Allow frontend to talk to backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # for dev only, restrict in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)
app.mount("/", StaticFiles(directory="dist", html=True), name="static")

