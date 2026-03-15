from pydantic import BaseModel


class AddCartItem(BaseModel):
    user_id: int
    product_id: int
    quantity: int


class UpdateCartItem(BaseModel):
    user_id: int
    product_id: int
    quantity: int