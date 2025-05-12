from tortoise import Tortoise
import os

async def init_db():
    database_url = os.getenv("DATABASE_URL").replace("postgresql://", "postgres://")
    if not database_url:
        raise ValueError("DATABASE_URL not set in environment variables")

    await Tortoise.init(
        db_url=database_url,  # Ensure the URL is passed correctly here
        modules={"models": ["app.models"]},
    )
    await Tortoise.generate_schemas()
