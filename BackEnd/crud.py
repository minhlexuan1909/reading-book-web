from sqlalchemy.orm import Session
import models, schemas


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
