from sqlalchemy import Column, Integer, String, ForeignKey
from app.database.db import Base

class CartItem(Base):

    __tablename__ = "cart"

    id = Column(Integer, primary_key=True)

    user_id = Column(Integer, nullable=False)

    product_id = Column(Integer, ForeignKey("products.id"), nullable=False)

    quantity = Column(Integer, nullable=False)