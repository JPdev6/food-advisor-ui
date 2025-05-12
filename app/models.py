from tortoise.models import Model
from tortoise import fields

class User(Model):
    id = fields.IntField(pk=True)
    username = fields.CharField(50, unique=True)
    password_hash = fields.CharField(128)

class FoodEntry(Model):
    id = fields.IntField(pk=True)
    user = fields.ForeignKeyField("models.User", related_name="food_entries")
    date = fields.DateField()
    meal = fields.CharField(100)
