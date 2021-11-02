from sqlalchemy import Column, Integer, String, Unicode
from sqlalchemy.sql.elements import True_
from database import Base


class Book(Base):
    __tablename__ = "book"

    id = Column(Integer, primary_key=True, index=True)
    image = Column(Unicode)
    title = Column(Unicode)
    bookType = Column(Unicode)
    author = Column(Unicode)
    descriptions = Column(Unicode)
    viewCount = Column(Integer)
    content = Column(Unicode)
