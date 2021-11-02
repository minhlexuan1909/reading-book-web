from pydantic import BaseModel


class BookInfoBase(BaseModel):
    image: str
    title: str
    bookType: str
    author: str
    descriptions: str
    viewCount: int
    content: str


class BookCreate(BookInfoBase):
    pass


class BookInfo(BookInfoBase):
    id: int

    class Config:
        orm_mode = True
