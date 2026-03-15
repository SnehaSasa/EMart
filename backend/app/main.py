from fastapi import FastAPI
from app.database.db import Base, engine
from app.models import user, product, cart, order
from app.api import auth, products, cart, orders
from fastapi.middleware.cors import CORSMiddleware
from app.api import payment

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="EMart API",
    version="1.0"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # allow frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from app.api import products
app.include_router(auth.router)
app.include_router(products.router)
app.include_router(cart.router)
app.include_router(orders.router)
app.include_router(payment.router)


@app.get("/")
def health_check():
    return {"message": "EMart API Running"}