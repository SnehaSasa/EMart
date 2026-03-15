from app.utils.redis_client import get_cache, set_cache, delete_cache
from app.models.cart import CartItem
from app.models.product import Product


print("Cart service loaded#################################")

def get_cart(user_id: int, db):
    
    redis_key = f"cart:user:{user_id}"

    # 1️⃣ Check Redis first
    cached_cart = get_cache(redis_key)

    print("Cached cart:", cached_cart)

    if cached_cart is not None:
        print(f"[REDIS HIT] user {user_id}")
        return cached_cart

    print(f"[REDIS MISS] user {user_id}")

    # 2️⃣ If not in Redis → fetch from DB
    cart_items = db.query(CartItem).filter(CartItem.user_id == user_id).all()

    cart_response = []

    for item in cart_items:
        product = db.query(Product).filter(Product.id == item.product_id).first()

        cart_response.append({
            "product_id": product.id,
            "product_name": product.name,
            "price": product.price,
            "image": product.image,
            "quantity": item.quantity,
            "category": product.category,
            "stock": product.stock
        })

    # 3️⃣ Store result in Redis
    set_cache(redis_key, cart_response)

    print("Cart cached in Redis")

    return cart_response




def add_to_cart(user_id, product_id, quantity, db):

    product = db.query(Product).filter(Product.id == product_id).first()

    if not product:
        raise Exception("Product not found")

    existing = db.query(CartItem).filter(
        CartItem.user_id == user_id,
        CartItem.product_id == product_id
    ).first()

    current_qty = existing.quantity if existing else 0
    new_qty = current_qty + quantity

    if new_qty > product.stock:
        raise Exception("Not enough stock available")

    if existing:
        existing.quantity = new_qty
    else:
        cart_item = CartItem(
            user_id=user_id,
            product_id=product_id,
            quantity=quantity
        )
        db.add(cart_item)

    db.commit()

    delete_cache(f"cart:user:{user_id}")

    return {"message": "Item added to cart"}


def update_cart_quantity(user_id, product_id, quantity, db):

    cart_item = db.query(CartItem).filter(
        CartItem.user_id == user_id,
        CartItem.product_id == product_id
    ).first()

    if not cart_item:
        raise Exception("Item not found")

    product = db.query(Product).filter(Product.id == product_id).first()

    if quantity > product.stock:
        raise Exception("Not enough stock available")

    cart_item.quantity = quantity

    db.commit()

    delete_cache(f"cart:user:{user_id}")

    return {"message": "Cart updated"}


def remove_from_cart(user_id, product_id, db):

    cart_item = db.query(CartItem).filter(
        CartItem.user_id == user_id,
        CartItem.product_id == product_id
    ).first()

    if cart_item:
        db.delete(cart_item)
        db.commit()

    delete_cache(f"cart:user:{user_id}")

    return {"message": "Item removed"}