from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.db import get_db
from app.models.order import Order
from app.models.cart import CartItem
from app.models.product import Product
from app.schemas.order_schema import CreateOrder
from app.services.order_service import checkout

router = APIRouter(prefix="/orders", tags=["Orders"])


# @router.post("/checkout")
# def checkout(order: CreateOrder, db: Session = Depends(get_db)):

#     cart_items = db.query(CartItem).filter(
#         CartItem.user_id == order.user_id
#     ).all()

#     if not cart_items:
#         raise HTTPException(status_code=400, detail="Cart is empty")

#     total_price = 0

#     for item in cart_items:
#         product = db.query(Product).filter(Product.id == item.product_id).first()

#         total_price += product.price * item.quantity

#     new_order = Order(
#         user_id=order.user_id,
#         total_price=total_price,
#         status="placed"
#     )

#     db.add(new_order)

#     # clear cart
#     db.query(CartItem).filter(
#         CartItem.user_id == order.user_id
#     ).delete()

#     db.commit()

#     return {
#         "message": "Order placed successfully",
#         "total_price": total_price
#     }



@router.get("/{user_id}")
def order_history(user_id: int, db: Session = Depends(get_db)):

    orders = db.query(Order).filter(Order.user_id == user_id).all()

    return orders



@router.get("/user/{user_id}")
def get_user_orders(user_id: int, db: Session = Depends(get_db)):

    orders = db.query(Order).filter(Order.user_id == user_id).order_by(Order.id.desc()).all()

    result = []

    for order in orders:
        result.append({
            "order_id": order.id,
            "total_price": order.total_price,
            "created_at": order.created_at,
            "status": "Out for Delivery"
        })

    return result



@router.post("/checkout")
def checkout_order(data: dict, db: Session = Depends(get_db)):

    user_id = data.get("user_id")

    if not user_id:
        raise HTTPException(status_code=400, detail="user_id required")

    return checkout(user_id, db)