from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from resources.routes import suggest

app = FastAPI()

# Allow frontend to talk to backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # for dev only, restrict in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(suggest.router)
