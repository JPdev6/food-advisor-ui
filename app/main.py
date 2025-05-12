from fastapi import FastAPI
from app.routes import router
from app.db import init_db
import uvicorn

app = FastAPI()
app.include_router(router)

@app.on_event("startup")
async def startup():
    await init_db()

if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
