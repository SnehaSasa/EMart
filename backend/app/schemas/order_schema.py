from pydantic import BaseModel


class CreateOrder(BaseModel):
    user_id: int


class OrderResponse(BaseModel):
    id: int
    user_id: int
    total_price: float
    status: str

    class Config:
        from_attributes = True