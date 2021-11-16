from typing import List
from fastapi import FastAPI, HTTPException
from fastapi.params import Depends
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from security import validate_token, verify_admin, create_access_token
import re
import models, schemas, crud
from database import engine, SessionLocal
from datetime import timedelta

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


ACCESS_TOKEN_EXPIRE_MINUTES = 30


@app.post("/login")
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
                data={
                    "idUser": db_user.id,
                    "username": db_user.username,
                    "userRole": db_user.userRole,
                    "fullname": db_user.fullname,
                },
                expires_delta=access_token_expires,
            )
            return {
                "access_token": access_token,
            }


@app.post("/user", response_model=schemas.UserInfo)
def post_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    if user.username == "" or user.password == "" or user.fullname == "":
        raise HTTPException(status_code=400, detail="Bạn phải điền đầy đủ thông tin")
    db_user = crud.get_user_by_username(db=db, username=user.username)
    if db_user is not None:
        raise HTTPException(status_code=403, detail="Tên tài khoản đã tồn tại")

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

    db_user = crud.get_user_by_fullname(db=db, fullname=user.fullname)
    if db_user is not None and (db_user.fullname == user.fullname):
        raise HTTPException(status_code=403, detail="Bạn đã có tài khoản rồi")

    return crud.post_user(user=user, db=db)


@app.get("/user")
def get_user(db: Session = Depends(get_db)):
    return crud.get_user(db=db)


@app.get("/user/info")
def get_user_info(userInfo=Depends(validate_token)):
    return userInfo


@app.get("/isAdmin", dependencies=[Depends(verify_admin)])
def get_isAdmin():
    return True


# user favourite
@app.get("/favourite")
def get_user_book_pref(db: Session = Depends(get_db)):
    return crud.get_user_book_pref(db=db)


@app.get("/favourite/{id}")
def get_user_favourite(id: int, db: Session = Depends(get_db)):
    return crud.get_user_favourite(db=db, id=id)


@app.post("/favourite")
def post_user_book_pref(
    pref: schemas.UserBookCrossPrefCreate, db: Session = Depends(get_db)
):
    return crud.post_user_book_pref(db=db, pref=pref)


@app.delete("/favourite")
def delete_user_book_pref(
    pref: schemas.UserBookCrossPrefInfoBase, db: Session = Depends(get_db)
):
    return crud.delete_user_book_pref(db=db, pref=pref)
