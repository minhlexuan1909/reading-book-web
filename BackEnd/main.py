from typing import List
from fastapi import FastAPI, HTTPException
from fastapi.params import Depends
from pydantic.main import BaseModel
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from security import validate_token, verify_admin
from app_utils import create_access_token
import re

import models, schemas, crud
from database import engine, SessionLocal

models.Base.metadata.create_all(bind=engine)

app = FastAPI()
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_db():
    db = None
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()


@app.post(
    "/book", dependencies=[Depends(verify_admin)], response_model=schemas.BookInfo
)
def post_book(book: schemas.BookCreate, db: Session = Depends(get_db)):
    return crud.post_book(db=db, book=book)


@app.get(
    "/book",
    dependencies=[Depends(validate_token)],
    response_model=List[schemas.BookInfo],
)
def get_book(db: Session = Depends(get_db)):
    return crud.get_book(db=db)


@app.get("/book/{id}", response_model=schemas.BookInfo)
def get_book_by_id(id: int, db: Session = Depends(get_db)):
    book = crud.get_book_by_id(db=db, id=id)
    if book is None:
        raise HTTPException(status_code=404, detail="Book not found")
    return book


@app.put(
    "/book/{id}", dependencies=[Depends(verify_admin)], response_model=schemas.BookInfo
)
def put_book(book: schemas.BookCreate, id: int, db: Session = Depends(get_db)):
    bookCheck = crud.get_book_by_id(db=db, id=id)
    if bookCheck is None:
        raise HTTPException(status_code=404, detail="Book not found")
    return crud.put_book(db=db, book=book, id=id)


@app.delete(
    "/book/{id}", dependencies=[Depends(verify_admin)], response_model=schemas.BookInfo
)
def delete_book(id: int, db: Session = Depends(get_db)):
    bookCheck = crud.get_book_by_id(db=db, id=id)
    if bookCheck is None:
        raise HTTPException(status_code=404, detail="Book not found")
    return crud.delete_book(db=db, id=id)


from datetime import datetime, timedelta
from typing import Union, Any
import jwt


class LoginRequest(BaseModel):
    username: str
    password: str


def verify_password(username, password):
    if username == "admin" and password == "admin":
        return True
    return False


# SECURITY_ALGORITHM = "HS256"
# SECRET_KEY = "123456"


# def generate_token(username: Union[str, Any]):
#     expire = datetime.utcnow() + timedelta(
#         # seconds=60 * 60 * 24 * 3  # Expired after 3 days
#         seconds=60
#     )
#     to_encode = {"exp": expire, "username": username}
#     encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=SECURITY_ALGORITHM)
#     return encoded_jwt


# def verify_user(username: str, password: str, db: Session = Depends(get_db)):
#     userListModel = crud.get_user(db=db)
#     userList = [item.__dict__ for item in userListModel]
#     usernameList = [item["username"] for item in userList]
#     if username not in usernameList:
#         raise HTTPException(status_code=404, detail="User not found")
#     else:
#         for account in userList:
#             if username == account["username"]:
#                 if password != account["password"]:
#                     raise HTTPException(status_code=404, detail="Wrong password")
#                 else:
#                     return True


ACCESS_TOKEN_EXPIRE_MINUTES = 30


@app.post("/login")
# def login(request_data: LoginRequest):
# if verify_password(username=request_data.username, password=request_data.password):
#     token = generate_token(request_data.username)
#     return {"token": token}
# else:
#     raise HTTPException(status_code=404, detail="User not found")

# def login(request_data: LoginRequest, db: Session = Depends(get_db)):
#     if verify_user(
#         username=request_data.username, password=request_data.password, db=db
#     ):
#         token = generate_token(request_data.username)
#         return {"token": token}
def login(user: schemas.UserAuthenticate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_username(db=db, username=user.username)
    if db_user is None:
        raise HTTPException(status_code=400, detail="Không tìm thấy tài khoản")
    else:
        isPasswordCorrect = crud.check_username_password(db=db, user=user)
        if not isPasswordCorrect:
            raise HTTPException(status_code=400, detail="Sai mật khẩu")
        else:

            access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)

            access_token = create_access_token(
                # Đẩy quyền user vào data để mã hoá thành token
                data={"username": user.username, "userRole": db_user.userRole},
                expires_delta=access_token_expires,
            )
            return {
                "access_token": access_token,
                "token_type": "Bearer",
                "fullname": db_user.fullname,
            }
    # return {"tmp": db_user}


@app.post("/user", response_model=schemas.UserInfo)
def post_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    password = user.password
    # calculating the length
    if len(password) < 6:
        raise HTTPException(status_code=403, detail="Độ dài mật khẩu quá ngắn")

    # searching for digits
    if re.search(r"\d", password) is None:
        raise HTTPException(status_code=403, detail="Mật khẩu phải chứa số")
    # searching for uppercase
    if re.search(r"[A-Z]", password) is None:
        raise HTTPException(
            status_code=403, detail="Mật khẩu phải chứa ký tự hoa và thường"
        )

    # searching for lowercase
    if re.search(r"[a-z]", password) is None:
        raise HTTPException(
            status_code=403, detail="Mật khẩu phải chứa ký tự hoa và thường"
        )

    # searching for symbols
    if re.search(r"\W", password) is None:
        raise HTTPException(status_code=403, detail="Mật khẩu phải chứa ký tự đặc biệt")

    return crud.post_user(user=user, db=db)


@app.get("/user")
def get_user(db: Session = Depends(get_db)):
    return crud.get_user(db=db)


@app.get("/isAdmin", dependencies=[Depends(verify_admin)])
def get_isAdmin():
    return True
