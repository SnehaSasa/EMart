from app.models.cart import CartItem
from app.models.product import Product
from app.models.order import Order
from app.utils.redis_client import delete_cache
from datetime import datetime


def checkout(user_id, db):

    # 1️⃣ Get cart items
    cart_items = db.query(CartItem).filter(CartItem.user_id == user_id).all()

    if not cart_items:
        raise Exception("Cart is empty")

    total_price = 0

    # 2️⃣ Validate stock
    for item in cart_items:

        product = db.query(Product).filter(Product.id == item.product_id).first()

        if not product:
            raise Exception("Product not found")

        if item.quantity > product.stock:
            raise Exception(f"Not enough stock for {product.name}")

        total_price += product.price * item.quantity

    # 3️⃣ Reduce inventory
    for item in cart_items:

        product = db.query(Product).filter(Product.id == item.product_id).first()

        product.stock -= item.quantity

    # 4️⃣ Create order
    order = Order(
        user_id=user_id,
        total_price=total_price,
        created_at=datetime.utcnow()
    )

    db.add(order)

    # 5️⃣ Clear cart
    db.query(CartItem).filter(CartItem.user_id == user_id).delete()

    db.commit()

    # 6️⃣ Clear Redis cache
    delete_cache(f"cart:user:{user_id}")

    return {
        "message": "Order placed successfully",
        "order_id": order.id,
        "total_price": total_price
    }