import time
from tortoise.exceptions import OperationalError
from tortoise import Tortoise
import os

async def init_db():
    retries = 5
    for _ in range(retries):
        try:
            database_url = os.getenv("DATABASE_URL")
            await Tortoise.init(
                db_url=database_url,
                modules={"models": ["app.models"]},
            )
            await Tortoise.generate_schemas()
            print("Database connected and schemas generated.")
            break
        except OperationalError:
            print("Database connection failed. Retrying...")
            time.sleep(5)
