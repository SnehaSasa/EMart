from fastapi import APIRouter
import time
import random

router = APIRouter()

@router.post("/payment/process")
def process_payment(data: dict):

    time.sleep(2)

    transaction_id = f"TXN{random.randint(10000,99999)}"

    return {
        "status": "success",
        "transaction_id": transaction_id
    }