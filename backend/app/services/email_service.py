from fastapi_mail import FastMail, MessageSchema, ConnectionConfig

conf = ConnectionConfig(
    MAIL_USERNAME="your_email@gmail.com",
    MAIL_PASSWORD="your_app_password",
    MAIL_FROM="your_email@gmail.com",
    MAIL_PORT=587,
    MAIL_SERVER="smtp.gmail.com",
    MAIL_TLS=True,
    MAIL_SSL=False
)

async def send_order_email(email, order_id):

    message = MessageSchema(
        subject="Order Confirmation",
        recipients=[email],
        body=f"""
        Your order {order_id} has been placed successfully.

        Track your order here:
        http://localhost:3000/track/{order_id}
        """,
        subtype="html"
    )

    fm = FastMail(conf)
    await fm.send_message(message)