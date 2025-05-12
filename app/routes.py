from fastapi import APIRouter, HTTPException, Depends
from fastapi import HTTPException, status
from app.models import User, FoodEntry
from app.auth import hash_password, verify_password, create_token
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from datetime import date

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

@router.post("/register")
async def register(username: str, password: str):
    if await User.get_or_none(username=username):
        raise HTTPException(400, detail="Username exists")
    user = await User.create(username=username, password_hash=hash_password(password))
    return {"message": "Registered"}

@router.post("/login")
async def login(form: OAuth2PasswordRequestForm = Depends()):
    user = await User.get_or_none(username=form.username)
    if not user or not verify_password(form.password, user.password_hash):
        raise HTTPException(401, detail="Invalid credentials")
    token = create_token({"sub": user.username})
    return {"access_token": token, "token_type": "bearer"}

async def get_current_user(token: str = Depends(oauth2_scheme)):
    from jose import JWTError, jwt
    try:
        payload = jwt.decode(token, os.getenv("JWT_SECRET", "defaultsecret"), algorithms=["HS256"])
        user = await User.get(username=payload["sub"])
        return user
    except JWTError:
        raise HTTPException(401, detail="Invalid token")

@router.post("/food")
async def add_food(meal: str, user=Depends(get_current_user)):
    await FoodEntry.create(user=user, date=date.today(), meal=meal)
    return {"message": "Logged"}

@router.get("/food/{food_id}")
async def get_food_by_id(food_id: int):
    food = await FoodEntry.get(id=food_id).first()
    if food is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Food entry not found"
        )
    return food


@router.get("/dice")
async def roll_dice():
    import random
    suggestions = ["Spaghetti", "Grilled Fish", "Curry", "Sushi", "Soup"]
    return {"suggested_meal": random.choice(suggestions)}
