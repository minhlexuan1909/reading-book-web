from typing import List
from fastapi import FastAPI, HTTPException
from fastapi.params import Depends
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware

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


@app.post("/book", response_model=schemas.BookInfo)
def post_book(book: schemas.BookCreate, db: Session = Depends(get_db)):
    return crud.post_book(db=db, book=book)


@app.get("/book", response_model=List[schemas.BookInfo])
def get_book(db: Session = Depends(get_db)):
    return crud.get_book(db=db)


@app.get("/book/{id}", response_model=schemas.BookInfo)
def get_book_by_id(id: int, db: Session = Depends(get_db)):
    book = crud.get_book_by_id(db=db, id=id)
    if book is None:
        raise HTTPException(status_code=404, detail="Book not found")
    return book


@app.put("/book/{id}", response_model=schemas.BookInfo)
def put_book(book: schemas.BookCreate, id: int, db: Session = Depends(get_db)):
    bookCheck = crud.get_book_by_id(db=db, id=id)
    if bookCheck is None:
        raise HTTPException(status_code=404, detail="Book not found")
    return crud.put_book(db=db, book=book, id=id)


@app.delete("/book/{id}", response_model=schemas.BookInfo)
def delete_book(id: int, db: Session = Depends(get_db)):
    bookCheck = crud.get_book_by_id(db=db, id=id)
    if bookCheck is None:
        raise HTTPException(status_code=404, detail="Book not found")
    return crud.delete_book(db=db, id=id)
