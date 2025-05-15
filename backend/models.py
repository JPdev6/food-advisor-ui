from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, func
from sqlalchemy.orm import declarative_base

Base = declarative_base()

class Meal(Base):
    __tablename__ = "meals"

    id = Column(Integer, primary_key=True, index=True)
    user = Column(String, index=True)
    meal = Column(String, index=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
