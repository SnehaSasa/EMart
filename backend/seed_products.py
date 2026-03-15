"""
Seed script to populate all eMart products into the database.
Run once: python -m backend.seed_products
Or: python backend/seed_products.py
"""
import sys
import os

# Add parent directory so we can import from backend
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from app.database.db import SessionLocal, engine, Base
from app.models.product import Product

# Create tables if not exist
Base.metadata.create_all(bind=engine)

db = SessionLocal()

# All products across the eMart store
products = [
    # ========== GROCERIES - Fruits ==========
    {"name": "Apples", "category": "groceries", "subcategory": "fruits", "price": 1.49, "unit": "/ lb", "image": "apples.jpeg", "description": "Fresh red apples", "stock": 100},
    {"name": "Bananas", "category": "groceries", "subcategory": "fruits", "price": 0.59, "unit": "/ lb", "image": "banana.jpeg", "description": "Ripe yellow bananas", "stock": 150},
    {"name": "Blueberries", "category": "groceries", "subcategory": "fruits", "price": 3.99, "unit": "/ pint", "image": "blueberries.jpeg", "description": "Fresh blueberries", "stock": 80},
    {"name": "Cherries", "category": "groceries", "subcategory": "fruits", "price": 4.99, "unit": "/ lb", "image": "cherries.jpeg", "description": "Sweet cherries", "stock": 60},
    {"name": "Grapes", "category": "groceries", "subcategory": "fruits", "price": 2.49, "unit": "/ lb", "image": "grapes.jpeg", "description": "Seedless grapes", "stock": 90},
    {"name": "Mango", "category": "groceries", "subcategory": "fruits", "price": 1.25, "unit": "each", "image": "mango.jpeg", "description": "Tropical mango", "stock": 70},
    {"name": "Orange", "category": "groceries", "subcategory": "fruits", "price": 0.99, "unit": "each", "image": "orange.jpeg", "description": "Juicy oranges", "stock": 120},
    {"name": "Papaya", "category": "groceries", "subcategory": "fruits", "price": 1.50, "unit": "/ lb", "image": "papaya.jpeg", "description": "Ripe papaya", "stock": 50},
    {"name": "Peaches", "category": "groceries", "subcategory": "fruits", "price": 1.99, "unit": "/ lb", "image": "peaches.jpeg", "description": "Sweet peaches", "stock": 65},
    {"name": "Pineapple", "category": "groceries", "subcategory": "fruits", "price": 2.99, "unit": "each", "image": "pineapple.jpeg", "description": "Fresh pineapple", "stock": 40},
    {"name": "Pomegranate", "category": "groceries", "subcategory": "fruits", "price": 2.00, "unit": "each", "image": "pomegranate.jpeg", "description": "Fresh pomegranate", "stock": 55},
    {"name": "Strawberries", "category": "groceries", "subcategory": "fruits", "price": 3.50, "unit": "/ packet", "image": "strawberries.jpeg", "description": "Fresh strawberries", "stock": 75},
    {"name": "Watermelon", "category": "groceries", "subcategory": "fruits", "price": 5.99, "unit": "each", "image": "watermelon.jpeg", "description": "Whole watermelon", "stock": 30},

    # ========== GROCERIES - Vegetables ==========
    {"name": "Bell Peppers", "category": "groceries", "subcategory": "vegetables", "price": 1.20, "unit": "each", "image": "bellpeppers.jpeg", "description": "Colorful bell peppers", "stock": 100},
    {"name": "Broccoli", "category": "groceries", "subcategory": "vegetables", "price": 1.89, "unit": "/ head", "image": "broccoli.jpeg", "description": "Fresh broccoli", "stock": 80},
    {"name": "Cabbage", "category": "groceries", "subcategory": "vegetables", "price": 0.89, "unit": "/ lb", "image": "cabbage.jpeg", "description": "Green cabbage", "stock": 90},
    {"name": "Carrots", "category": "groceries", "subcategory": "vegetables", "price": 1.15, "unit": "/ bunch", "image": "carrots.jpeg", "description": "Fresh carrots", "stock": 110},
    {"name": "Cauliflower", "category": "groceries", "subcategory": "vegetables", "price": 2.49, "unit": "/ head", "image": "cauliflower.jpeg", "description": "Fresh cauliflower", "stock": 70},
    {"name": "Garlic", "category": "groceries", "subcategory": "vegetables", "price": 0.50, "unit": "/ bulb", "image": "garlic.jpeg", "description": "Fresh garlic", "stock": 200},
    {"name": "Lettuce", "category": "groceries", "subcategory": "vegetables", "price": 1.99, "unit": "/ head", "image": "lettuce.jpeg", "description": "Iceberg lettuce", "stock": 85},
    {"name": "Onion", "category": "groceries", "subcategory": "vegetables", "price": 0.99, "unit": "/ lb", "image": "onion.jpeg", "description": "Yellow onion", "stock": 150},
    {"name": "Potato", "category": "groceries", "subcategory": "vegetables", "price": 0.89, "unit": "/ lb", "image": "potato.jpeg", "description": "Russet potato", "stock": 200},
    {"name": "Spinach", "category": "groceries", "subcategory": "vegetables", "price": 2.50, "unit": "/ bunch", "image": "spinach.jpeg", "description": "Fresh spinach", "stock": 75},
    {"name": "Tomato", "category": "groceries", "subcategory": "vegetables", "price": 1.49, "unit": "/ lb", "image": "tomato.jpeg", "description": "Red tomatoes", "stock": 130},
    {"name": "Zucchini", "category": "groceries", "subcategory": "vegetables", "price": 1.29, "unit": "/ lb", "image": "zucchini.jpeg", "description": "Fresh zucchini", "stock": 60},

    # ========== PROVISIONS - Breakfast Cereals & Pasta ==========
    {"name": "Corn Flakes", "category": "provisions", "subcategory": "cereals", "price": 3.49, "unit": "/ box", "image": "cornflakes.jpeg", "description": "Crispy corn flakes", "stock": 100},
    {"name": "Granola", "category": "provisions", "subcategory": "cereals", "price": 4.99, "unit": "/ bag", "image": "granola.jpeg", "description": "Crunchy granola", "stock": 80},
    {"name": "Macaroni", "category": "provisions", "subcategory": "cereals", "price": 1.25, "unit": "/ pack", "image": "macaroni.jpeg", "description": "Elbow macaroni", "stock": 120},
    {"name": "Muesli", "category": "provisions", "subcategory": "cereals", "price": 5.50, "unit": "/ box", "image": "muesli.jpeg", "description": "Healthy muesli", "stock": 70},
    {"name": "Oatmeal", "category": "provisions", "subcategory": "cereals", "price": 2.99, "unit": "/ tub", "image": "oatmeal.jpeg", "description": "Rolled oatmeal", "stock": 90},
    {"name": "Penne", "category": "provisions", "subcategory": "cereals", "price": 1.35, "unit": "/ pack", "image": "penne.jpeg", "description": "Penne pasta", "stock": 110},
    {"name": "Spaghetti", "category": "provisions", "subcategory": "cereals", "price": 1.40, "unit": "/ pack", "image": "spaghetti.jpeg", "description": "Classic spaghetti", "stock": 115},

    # ========== PROVISIONS - Grains & Beans ==========
    {"name": "Barley", "category": "provisions", "subcategory": "grains", "price": 1.89, "unit": "/ lb", "image": "barley.jpeg", "description": "Pearl barley", "stock": 80},
    {"name": "Black Beans", "category": "provisions", "subcategory": "grains", "price": 1.49, "unit": "/ lb", "image": "blackbeans.jpeg", "description": "Dried black beans", "stock": 90},
    {"name": "Brown Rice", "category": "provisions", "subcategory": "grains", "price": 2.10, "unit": "/ lb", "image": "brownrice.jpeg", "description": "Brown rice", "stock": 100},
    {"name": "Bulgur", "category": "provisions", "subcategory": "grains", "price": 2.30, "unit": "/ lb", "image": "bulgur.jpeg", "description": "Bulgur wheat", "stock": 60},
    {"name": "Chickpeas", "category": "provisions", "subcategory": "grains", "price": 1.75, "unit": "/ lb", "image": "chickpeas.jpeg", "description": "Dried chickpeas", "stock": 85},
    {"name": "Kidney Beans", "category": "provisions", "subcategory": "grains", "price": 1.60, "unit": "/ lb", "image": "kidneybeans.jpeg", "description": "Red kidney beans", "stock": 75},
    {"name": "Pinto Beans", "category": "provisions", "subcategory": "grains", "price": 1.50, "unit": "/ lb", "image": "pinto.jpeg", "description": "Pinto beans", "stock": 70},
    {"name": "Rice", "category": "provisions", "subcategory": "grains", "price": 1.99, "unit": "/ lb", "image": "rice.jpeg", "description": "White rice", "stock": 150},
    {"name": "White Beans", "category": "provisions", "subcategory": "grains", "price": 1.65, "unit": "/ lb", "image": "whitebeans.jpeg", "description": "White navy beans", "stock": 65},

    # ========== PROVISIONS - Oils & Fats ==========
    {"name": "Butter", "category": "provisions", "subcategory": "oils", "price": 4.50, "unit": "/ stick", "image": "butter.jpeg", "description": "Unsalted butter", "stock": 100},
    {"name": "Canola Oil", "category": "provisions", "subcategory": "oils", "price": 6.99, "unit": "/ bottle", "image": "canola.jpeg", "description": "Canola cooking oil", "stock": 60},
    {"name": "Coconut Oil", "category": "provisions", "subcategory": "oils", "price": 8.50, "unit": "/ jar", "image": "cocooil.jpeg", "description": "Virgin coconut oil", "stock": 50},
    {"name": "Ghee", "category": "provisions", "subcategory": "oils", "price": 12.00, "unit": "/ jar", "image": "ghee.jpeg", "description": "Clarified butter ghee", "stock": 40},
    {"name": "Margarine", "category": "provisions", "subcategory": "oils", "price": 3.25, "unit": "/ tub", "image": "margarine.jpeg", "description": "Spread margarine", "stock": 80},
    {"name": "Olive Oil", "category": "provisions", "subcategory": "oils", "price": 14.99, "unit": "/ bottle", "image": "olive.jpeg", "description": "Extra virgin olive oil", "stock": 45},
    {"name": "Vegetable Oil", "category": "provisions", "subcategory": "oils", "price": 5.50, "unit": "/ bottle", "image": "vegoil.jpeg", "description": "Vegetable cooking oil", "stock": 70},

    # ========== PROVISIONS - Spices & Sauces ==========
    {"name": "Cinnamon", "category": "provisions", "subcategory": "spices", "price": 3.99, "unit": "/ jar", "image": "cinnamon.jpeg", "description": "Ground cinnamon", "stock": 90},
    {"name": "Cumin", "category": "provisions", "subcategory": "spices", "price": 2.99, "unit": "/ jar", "image": "cumin.jpeg", "description": "Ground cumin", "stock": 85},
    {"name": "Hot Sauce", "category": "provisions", "subcategory": "spices", "price": 2.50, "unit": "/ bottle", "image": "hotsauce.jpeg", "description": "Spicy hot sauce", "stock": 100},
    {"name": "Ketchup", "category": "provisions", "subcategory": "spices", "price": 3.20, "unit": "/ bottle", "image": "ketchup.jpeg", "description": "Tomato ketchup", "stock": 120},
    {"name": "Mayonnaise", "category": "provisions", "subcategory": "spices", "price": 4.10, "unit": "/ jar", "image": "mayo.jpeg", "description": "Creamy mayonnaise", "stock": 75},
    {"name": "Mustard", "category": "provisions", "subcategory": "spices", "price": 2.25, "unit": "/ bottle", "image": "mustard.jpeg", "description": "Yellow mustard", "stock": 95},
    {"name": "Nutmeg", "category": "provisions", "subcategory": "spices", "price": 4.50, "unit": "/ jar", "image": "nutmeg.jpeg", "description": "Whole nutmeg", "stock": 55},
    {"name": "Oregano", "category": "provisions", "subcategory": "spices", "price": 2.75, "unit": "/ jar", "image": "oregano.jpeg", "description": "Dried oregano", "stock": 80},
    {"name": "Paprika", "category": "provisions", "subcategory": "spices", "price": 2.85, "unit": "/ jar", "image": "paprika.jpeg", "description": "Smoked paprika", "stock": 70},
    {"name": "Pepper", "category": "provisions", "subcategory": "spices", "price": 3.10, "unit": "/ jar", "image": "pepper.jpeg", "description": "Black pepper", "stock": 110},
    {"name": "Rosemary", "category": "provisions", "subcategory": "spices", "price": 2.95, "unit": "/ jar", "image": "rosemary.jpeg", "description": "Dried rosemary", "stock": 65},
    {"name": "Salt", "category": "provisions", "subcategory": "spices", "price": 1.50, "unit": "/ box", "image": "salt.jpeg", "description": "Table salt", "stock": 200},
    {"name": "Soy Sauce", "category": "provisions", "subcategory": "spices", "price": 3.50, "unit": "/ bottle", "image": "soysauce.jpeg", "description": "Premium soy sauce", "stock": 90},
    {"name": "Thyme", "category": "provisions", "subcategory": "spices", "price": 2.80, "unit": "/ jar", "image": "thyme.jpeg", "description": "Dried thyme", "stock": 60},
    {"name": "Turmeric", "category": "provisions", "subcategory": "spices", "price": 3.40, "unit": "/ jar", "image": "turmeric.jpeg", "description": "Ground turmeric", "stock": 75},

    # ========== PROVISIONS - Flour & Baking Essentials ==========
    {"name": "Almond Flour", "category": "provisions", "subcategory": "baking", "price": 8.99, "unit": "/ bag", "image": "almondflour.jpeg", "description": "Fine almond flour", "stock": 50},
    {"name": "Baking Soda", "category": "provisions", "subcategory": "baking", "price": 1.25, "unit": "/ box", "image": "bakingsoda.jpeg", "description": "Arm & Hammer style", "stock": 120},
    {"name": "Cocoa Powder", "category": "provisions", "subcategory": "baking", "price": 5.49, "unit": "/ container", "image": "cocoa.jpeg", "description": "Unsweetened cocoa", "stock": 65},
    {"name": "Cornmeal", "category": "provisions", "subcategory": "baking", "price": 2.30, "unit": "/ bag", "image": "cornmeal.jpeg", "description": "Yellow cornmeal", "stock": 80},
    {"name": "All Purpose Flour", "category": "provisions", "subcategory": "baking", "price": 3.50, "unit": "/ bag", "image": "flour.jpeg", "description": "All purpose flour", "stock": 150},
    {"name": "Honey", "category": "provisions", "subcategory": "baking", "price": 6.99, "unit": "/ jar", "image": "honey.jpeg", "description": "Raw organic honey", "stock": 55},
    {"name": "Maple Syrup", "category": "provisions", "subcategory": "baking", "price": 8.50, "unit": "/ bottle", "image": "maplesyrup.jpeg", "description": "Pure maple syrup", "stock": 40},
    {"name": "Sugar", "category": "provisions", "subcategory": "baking", "price": 2.99, "unit": "/ bag", "image": "sugar.jpeg", "description": "White granulated sugar", "stock": 180},
    {"name": "Wheat Flour", "category": "provisions", "subcategory": "baking", "price": 4.20, "unit": "/ bag", "image": "wheatflour.jpeg", "description": "Whole wheat flour", "stock": 100},
    {"name": "Yeast", "category": "provisions", "subcategory": "baking", "price": 2.10, "unit": "/ jar", "image": "yeast.jpeg", "description": "Active dry yeast", "stock": 90},

    # ========== APPAREL - Men's T-shirts ==========
    {"name": "Long Sleeve", "category": "apparel", "subcategory": "mens_tshirts", "price": 24.99, "unit": "each", "image": "longsleeve.jpeg", "description": "Men's long sleeve tee", "stock": 50},
    {"name": "V-Neck Comfort", "category": "apparel", "subcategory": "mens_tshirts", "price": 19.99, "unit": "each", "image": "vneck.jpeg", "description": "Men's v-neck tee", "stock": 60},
    {"name": "Everyday Crewneck", "category": "apparel", "subcategory": "mens_tshirts", "price": 22.50, "unit": "each", "image": "crewneck.jpeg", "description": "Men's crewneck tee", "stock": 55},

    # ========== APPAREL - Men's Shirts ==========
    {"name": "Formal White", "category": "apparel", "subcategory": "mens_shirts", "price": 34.99, "unit": "each", "image": "formal1.jpeg", "description": "Men's formal white shirt", "stock": 40},
    {"name": "Classic Denim", "category": "apparel", "subcategory": "mens_shirts", "price": 45.00, "unit": "each", "image": "denim.jpeg", "description": "Men's denim shirt", "stock": 35},
    {"name": "Linen Summer", "category": "apparel", "subcategory": "mens_shirts", "price": 39.99, "unit": "each", "image": "linen.jpeg", "description": "Men's linen shirt", "stock": 45},

    # ========== APPAREL - Men's Jackets ==========
    {"name": "Premium Leather", "category": "apparel", "subcategory": "mens_jackets", "price": 120.00, "unit": "each", "image": "leather.jpeg", "description": "Men's leather jacket", "stock": 20},
    {"name": "Denim Jacket", "category": "apparel", "subcategory": "mens_jackets", "price": 65.00, "unit": "each", "image": "denimjacket.jpeg", "description": "Men's denim jacket", "stock": 30},
    {"name": "Hooded Winter", "category": "apparel", "subcategory": "mens_jackets", "price": 55.00, "unit": "each", "image": "hooded.jpeg", "description": "Men's hooded jacket", "stock": 35},

    # ========== APPAREL - Men's Jeans ==========
    {"name": "Slim Fit", "category": "apparel", "subcategory": "mens_jeans", "price": 49.99, "unit": "each", "image": "slimfit.jpeg", "description": "Men's slim fit jeans", "stock": 45},
    {"name": "Ripped Look", "category": "apparel", "subcategory": "mens_jeans", "price": 54.99, "unit": "each", "image": "ripped.jpeg", "description": "Men's ripped jeans", "stock": 40},
    {"name": "Baggy Style", "category": "apparel", "subcategory": "mens_jeans", "price": 42.00, "unit": "each", "image": "baggy.jpeg", "description": "Men's baggy jeans", "stock": 50},

    # ========== APPAREL - Men's Shorts ==========
    {"name": "Cargo Shorts", "category": "apparel", "subcategory": "mens_shorts", "price": 29.99, "unit": "each", "image": "cargo.jpeg", "description": "Men's cargo shorts", "stock": 55},
    {"name": "Gym Training", "category": "apparel", "subcategory": "mens_shorts", "price": 24.50, "unit": "each", "image": "gym.jpeg", "description": "Men's gym shorts", "stock": 60},
    {"name": "Running Shorts", "category": "apparel", "subcategory": "mens_shorts", "price": 22.00, "unit": "each", "image": "running.jpeg", "description": "Men's running shorts", "stock": 65},

    # ========== APPAREL - Women's Tops ==========
    {"name": "Active Tank", "category": "apparel", "subcategory": "womens_tops", "price": 15.99, "unit": "each", "image": "tank.jpeg", "description": "Women's active tank top", "stock": 70},
    {"name": "Fashion Crop", "category": "apparel", "subcategory": "womens_tops", "price": 18.50, "unit": "each", "image": "crop.jpeg", "description": "Women's crop top", "stock": 60},
    {"name": "Elegant Blazer", "category": "apparel", "subcategory": "womens_tops", "price": 65.00, "unit": "each", "image": "blazer.jpeg", "description": "Women's blazer top", "stock": 35},

    # ========== APPAREL - Women's Jeans ==========
    {"name": "Ripped Denim", "category": "apparel", "subcategory": "womens_jeans", "price": 45.00, "unit": "each", "image": "rippedjeans.jpeg", "description": "Women's ripped jeans", "stock": 45},
    {"name": "Skinny Fit", "category": "apparel", "subcategory": "womens_jeans", "price": 49.99, "unit": "each", "image": "skinny.jpeg", "description": "Women's skinny jeans", "stock": 50},
    {"name": "Cropped Jeans", "category": "apparel", "subcategory": "womens_jeans", "price": 42.50, "unit": "each", "image": "cropped.jpeg", "description": "Women's cropped jeans", "stock": 40},

    # ========== APPAREL - Women's Dresses ==========
    {"name": "Evening Gown", "category": "apparel", "subcategory": "womens_dresses", "price": 110.00, "unit": "each", "image": "eveninggown.jpeg", "description": "Women's evening gown", "stock": 20},
    {"name": "Summer Sundress", "category": "apparel", "subcategory": "womens_dresses", "price": 34.99, "unit": "each", "image": "sundress.jpeg", "description": "Women's sundress", "stock": 45},
    {"name": "Formal Blazer Dress", "category": "apparel", "subcategory": "womens_dresses", "price": 75.00, "unit": "each", "image": "blazer.jpeg", "description": "Women's blazer dress", "stock": 30},
]

# Check if products already exist, only add new ones
existing_count = db.query(Product).count()
print(f"Existing products in DB: {existing_count}")

added = 0
for p in products:
    # Check if product with same name and image already exists
    exists = db.query(Product).filter(
        Product.name == p["name"],
        Product.image == p["image"]
    ).first()

    if not exists:
        new_product = Product(**p)
        db.add(new_product)
        added += 1

db.commit()
print(f"Added {added} new products. Total now: {db.query(Product).count()}")
db.close()
