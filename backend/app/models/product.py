from sqlalchemy import Column, Integer, String, Float, Text
from app.database.db import Base


class Product(Base):

    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String(255))

    category = Column(String(100))

    subcategory = Column(String(100))

    price = Column(Float)

    unit = Column(String(50))

    image = Column(String(255))

    description = Column(Text)

    stock = Column(Integer)