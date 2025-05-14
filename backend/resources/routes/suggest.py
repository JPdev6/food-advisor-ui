from fastapi import APIRouter
from pydantic import BaseModel
from typing import List, Dict
import random

router = APIRouter()

class SuggestRequest(BaseModel):
    history: List[str]
    frequency: Dict[str, int]

@router.post("/suggest")
async def suggest_meal(data: SuggestRequest):
    all_meals = [
        "Grilled Salmon", "Lentil Soup", "Chicken Salad", "Veggie Stir-Fry",
        "Sushi Bowl", "Falafel Wrap", "Pasta Primavera", "Miso Ramen"
    ]

    filtered = [m for m in all_meals if data.frequency.get(m, 0) < 2]
    chosen = random.choice(filtered or all_meals)

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

    return {
        "meal": chosen,
        "fact": facts.get(chosen, "Eat well, live well.")
    }
