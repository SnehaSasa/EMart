from sqlalchemy import Column, Integer, Float, ForeignKey, DateTime, String
from sqlalchemy.sql import func
from app.database.db import Base


class Order(Base):

    __tablename__ = "orders"

    id = Column(Integer, primary_key=True)

    user_id = Column(Integer, ForeignKey("cust_deets.id"))

    total_price = Column(Float)

    status = Column(String(50), default="pending")

    created_at = Column(DateTime(timezone=True), server_default=func.now())