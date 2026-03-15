from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.services.cart_service import (
    get_cart,
    add_to_cart,
    update_cart_quantity,
    remove_from_cart
)
from app.models.cart import CartItem
from app.database.db import get_db
from app.schemas.cart_schema import AddCartItem, UpdateCartItem
from app.utils.redis_client import delete_cache

router = APIRouter(prefix="/cart", tags=["Cart"])


# Add item to cart
@router.post("/add")
def add_item(item: AddCartItem, db: Session = Depends(get_db)):
    return add_to_cart(item.user_id, item.product_id, item.quantity, db)

@router.get("/{user_id}")
def view_cart(user_id: int, db: Session = Depends(get_db)):
    return get_cart(user_id, db)


@router.patch("/update")
def update_cart(item: UpdateCartItem, db: Session = Depends(get_db)):
    return update_cart_quantity(
        item.user_id,
        item.product_id,
        item.quantity,
        db
    )


@router.delete("/clear/{user_id}")
def clear_cart(user_id: int, db: Session = Depends(get_db)):

    db.query(CartItem).filter(CartItem.user_id == user_id).delete()
    db.commit()

    # 🔴 Clear Redis cache
    delete_cache(f"cart:user:{user_id}")

    return {"message": "Cart cleared"}


@router.delete("/remove")
def remove_item(user_id: int, product_id: int, db: Session = Depends(get_db)):
    return remove_from_cart(user_id, product_id, db)