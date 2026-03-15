from fastapi import APIRouter, Request, Form, Body
from fastapi.templating import Jinja2Templates
from sqlalchemy import insert, select
from .database import engine
from .models import users, cart
from .security import hash_password, verify_password
from starlette.responses import RedirectResponse


router = APIRouter()

templates = Jinja2Templates(directory="templates")


@router.get("/")
def login_page(request: Request):
    return templates.TemplateResponse("register.html", {"request": request})



@router.get("/register")
def register_page(request: Request):
    return templates.TemplateResponse(
        "register.html",
        {"request": request}
    )



@router.post("/register")
def login(request: Request, email: str = Form(...), password: str = Form(...)):

    with engine.connect() as conn:
        query = select(users).where(users.c.email == email)
        result = conn.execute(query).fetchone()

    if not result:
        return templates.TemplateResponse(
            "register.html",
            {"request": request, "message": "User not found"},
        )

    if not verify_password(password, result.password):
        return templates.TemplateResponse(
            "register.html",
            {"request": request, "message": "Wrong password"},
        )

    request.session["user"] = result.email

    # return RedirectResponse("/welcome", status_code=303)
    return templates.TemplateResponse(
    "welcome.html",
    {"request": request, "email": result.email},
)


@router.get("/create")
def create_page(request: Request):
    return templates.TemplateResponse(
        "create.html",
        {"request": request}
    )



@router.post("/create")
def create_user(
    name: str = Form(...),
    email: str = Form(...),
    password: str = Form(...)
):

    hashed_password = hash_password(password)

    with engine.begin() as conn:

        conn.execute(
            insert(users).values(
                name=name,
                email=email,
                password=hashed_password
            )
        )

    return {"message": "Account created"}



@router.get("/logout")
def logout(request: Request):

    request.session.clear()

    return RedirectResponse("/", status_code=303)



@router.get("/fromdb")
def show_users(request: Request):

    with engine.connect() as conn:
        result = conn.execute(select(users)).fetchall()

    return templates.TemplateResponse(
        "fromdb.html",
        {
            "request": request,
            "fromdb": result
        }
    )
