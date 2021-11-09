from sqlalchemy.orm import Session
from sqlalchemy.sql.functions import user
import models, schemas
import bcrypt


def post_book(db: Session, book: schemas.BookCreate):
    db_book = models.Book(
        image=book.image,
        title=book.title,
        bookType=book.bookType,
        author=book.author,
        descriptions=book.descriptions,
        viewCount=book.viewCount,
        content=book.content,
    )
    db.add(db_book)
    db.commit()
    db.refresh(db_book)
    return db_book


def get_book(db: Session):
    return db.query(models.Book).all()


def get_book_by_id(db: Session, id: int):
    return db.query(models.Book).filter(models.Book.id == id).first()


def put_book(db: Session, book: schemas.BookCreate, id: int):
    db_book = get_book_by_id(db=db, id=id)
    db_book.image = book.image
    db_book.title = book.title
    db_book.bookType = book.bookType
    db_book.author = book.author
    db_book.descriptions = book.descriptions
    db_book.viewCount = book.viewCount
    db_book.content = book.content

    db.commit()
    db.refresh(db_book)
    return db_book


def delete_book(db: Session, id: int):
    db.query(models.Book).filter(models.Book.id == id).delete()
    db.commit()


# User
def post_user(db: Session, user: schemas.UserCreate):
    hashed_password = bcrypt.hashpw(user.password.encode(), bcrypt.gensalt())
    db_user = models.User(
        username=user.username,
        password=hashed_password,
        userRole=user.userRole,
        fullname=user.fullname,
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def get_user(db: Session):
    return db.query(models.User).all()


def get_user_by_username(db: Session, username: str):
    return db.query(models.User).filter(models.User.username == username).first()


def check_username_password(db: Session, user: schemas.UserAuthenticate):
    db_user_info = get_user_by_username(db, username=user.username)
    return bcrypt.checkpw(user.password.encode(), db_user_info.password.encode())
    # return {
    #     "user-pw": user.password.encode("utf-8"),
    #     "db-pw": db_user_info.password.encode("utf-8"),
    # }
    # print(type(db_user_info.password))
