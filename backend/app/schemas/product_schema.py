from pydantic import BaseModel
from typing import Optional


class ProductCreate(BaseModel):

    name: str
    category: Optional[str]
    subcategory: Optional[str]
    price: float
    unit: Optional[str]
    image: Optional[str]
    description: Optional[str]
    stock: int


class ProductResponse(ProductCreate):

    id: int

    class Config:
        from_attributes = True