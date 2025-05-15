from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from backend.db import SessionLocal
from backend.models import Meal
import random

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/suggest")
async def suggest_meal(db: Session = Depends(get_db)):
    recent_meals = db.query(Meal).order_by(Meal.created_at.desc()).limit(20).all()
    meal_names = [m.meal for m in recent_meals]

    frequency = {}
    for name in meal_names:
        frequency[name] = frequency.get(name, 0) + 1

    all_options = [
        "Grilled Salmon", "Lentil Soup", "Chicken Salad", "Veggie Stir-Fry",
        "Sushi Bowl", "Falafel Wrap", "Pasta Primavera", "Miso Ramen"
    ]

    filtered = [m for m in all_options if frequency.get(m, 0) < 2]
    chosen = random.choice(filtered or all_options)

    facts = {
        "Grilled Salmon": "Rich in omega-3 fatty acids for heart health.",
        "Lentil Soup": "Lentils are protein-packed and great for digestion.",
        "Chicken Salad": "High in lean protein and easy to prep.",
        "Veggie Stir-Fry": "Colorful veggies provide antioxidants.",
        "Sushi Bowl": "Low fat and full of raw nutrients.",
        "Falafel Wrap": "Chickpeas support gut health.",
        "Pasta Primavera": "Combines comfort with veggies.",
        "Miso Ramen": "Miso boosts your gut microbiome.",
    }

    return { "meal": chosen, "fact": facts.get(chosen, "Eat well.") }
