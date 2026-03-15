
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import List, Optional

from app.database.db import get_db
from app.models.product import Product
from app.schemas.product_schema import ProductCreate, ProductResponse
# from app.utils.redis_client import get_cache, set_cache

router = APIRouter(prefix="/products", tags=["Products"])


@router.get("/", response_model=List[ProductResponse])
def get_all_products(
    page: int = 1,
    limit: int = 20,
    category: Optional[str] = None,
    subcategory: Optional[str] = None,
    sort: Optional[str] = None,
    db: Session = Depends(get_db)
):

    query = db.query(Product)

    # CATEGORY FILTER
    if category:
        query = query.filter(Product.category == category)

    # SUBCATEGORY FILTER
    if subcategory:
        query = query.filter(Product.subcategory == subcategory)

    # SORTING
    if sort == "price_low":
        query = query.order_by(Product.price.asc())

    if sort == "price_high":
        query = query.order_by(Product.price.desc())

    skip = (page - 1) * limit

    products = query.offset(skip).limit(limit).all()

    return products



@router.get("/search", response_model=List[ProductResponse])
def search_products(
    q: str,
    db: Session = Depends(get_db)
):

    products = db.query(Product)\
        .filter(Product.name.ilike(f"%{q}%"))\
        .all()

    return products


@router.get("/categories")
def get_categories(db: Session = Depends(get_db)):

    categories = db.query(Product.category).distinct().all()

    return [c[0] for c in categories]


@router.get("/subcategories")
def get_subcategories(
    category: str,
    db: Session = Depends(get_db)
):

    subs = db.query(Product.subcategory)\
        .filter(Product.category == category)\
        .distinct()\
        .all()

    return [s[0] for s in subs if s[0] is not None]



@router.post("/", response_model=ProductResponse)
def add_product(
    product: ProductCreate,
    db: Session = Depends(get_db)
):

    new_product = Product(**product.dict())

    db.add(new_product)
    db.commit()
    db.refresh(new_product)

    return new_product



@router.put("/{product_id}")
def update_product(
    product_id: int,
    product: ProductCreate,
    db: Session = Depends(get_db)
):

    existing_product = db.query(Product).filter(Product.id == product_id).first()

    if not existing_product:
        return {"error": "Product not found"}

    existing_product.name = product.name
    existing_product.category = product.category
    existing_product.subcategory = product.subcategory
    existing_product.price = product.price
    existing_product.unit = product.unit
    existing_product.image = product.image
    existing_product.description = product.description
    existing_product.stock = product.stock

    db.commit()

    return {"message": "Product updated successfully"}


@router.delete("/{product_id}")
def delete_product(
    product_id: int,
    db: Session = Depends(get_db)
):

    product = db.query(Product).filter(Product.id == product_id).first()

    if not product:
        return {"error": "Product not found"}

    db.delete(product)
    db.commit()

    return {"message": "Product deleted successfully"}