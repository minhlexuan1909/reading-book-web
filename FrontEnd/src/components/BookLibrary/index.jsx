import "./BookLibrary.css";

import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { useState } from "react/cjs/react.development";

import { BookContext } from "../../App";

export const BookLibrary = ({ title, keySearch }) => {
  const {
    bookList,
    setBookList,
    isAdmin,
    token,
    favourite,
    setFavourite,
    idUser,
  } = useContext(BookContext);
  const history = useHistory();
  const url = useLocation();
  const bodyScroll = require("body-scroll-toggle");
  const [bookShow, setBookShow] = useState([]);
  const checkFavourite = (idBook) => {
    if (favourite === null || favourite.length === 0) return false;
    const found = favourite.some(
      (item) => item.idBook === idBook && item.idUser === idUser
    );
    return found;
  };

  const detailBtnOnClickHandler = (id) => {
    const str = `${url.pathname}/${id}`;
    history.push(str);
    bodyScroll.disable();
    document.body.style.position = "fixed";
    document.body.style.top = `-${window.scrollY}px`;
  };

  const deleteBtnOnClickHandler = async (id) => {
    let resp = await fetch(`http://127.0.0.1:8000/book/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token["token"]}`,
      },
    });
    resp = await resp.json();

    const tmpBookList = bookList.filter((item) => item.id !== id);
    setBookList([...tmpBookList]);
  };

  const favouriteBtnOnClickHandler = async (idBook, e) => {
    const status = e.currentTarget.firstChild.classList[0];
    if (status === "inactive--favourite") {
      let resp = await fetch(`http://127.0.0.1:8000/favourite`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token["token"]}`,
        },
        body: JSON.stringify({ idUser: idUser, idBook: idBook }),
      });
      resp = await resp.json();
      favourite.push({ idUser: idUser, idBook: idBook });
      setFavourite([...favourite]);
    } else {
      let resp = await fetch(`http://127.0.0.1:8000/favourite`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token["token"]}`,
        },
        body: JSON.stringify({ idUser: idUser, idBook: idBook }),
      });
      resp = await resp.json();
      const tmpFavourite = favourite.filter(
        (item) => item.idUser !== idUser || item.idBook !== idBook
      );
      setFavourite([...tmpFavourite]);
    }
  };

  useEffect(() => {
    if (title === "Thư viện") {
      setBookShow(bookList);
    } else if (title === "Văn học" || title === "Tài liệu") {
      const tmpBookList = [...bookList];
      setBookShow(tmpBookList.filter((item) => item.bookType === title));
    }
  }, [bookList]);

  useEffect(() => {
    if (title === "Danh sách yêu thích" && favourite !== null) {
      console.log(favourite);
      const tmpBookList = [...bookList];
      setBookShow(
        tmpBookList.filter((item) =>
          favourite.some((favBook) => favBook.idBook === item.id)
        )
      );
    }
  }, [favourite]);

  useEffect(() => {
    if (keySearch === "") {
      setBookShow([...bookList]);
    } else {
      const tmpBookList = [...bookList];
      setBookShow(
        tmpBookList.filter((item) =>
          item.title.toLowerCase().includes(keySearch)
        )
      );
    }
  }, [keySearch]);
  return (
    <div className="book-lib">
      <div className="book-lib-wrapper">
        <div className="book-lib__most-read-section">
          <div className="book-lib__section-title">{title}</div>
          <div className="book-lib__book-list">
            {bookShow.map((book) => (
              <div className="book-lib__book-card" key={book.id}>
                <div className="book-lib__book-card-wrapper">
                  {isAdmin ? (
                    <div
                      className="book-card__deleteBtn"
                      onClick={() => deleteBtnOnClickHandler(book.id)}
                    >
                      <i className="fas fa-times"></i>
                    </div>
                  ) : (
                    ""
                  )}
                  <div
                    className="book-card__image"
                    style={{
                      backgroundImage: `${
                        book.image !== ""
                          ? `url(${
                              require(`../../img/${book.image}`).default
                            }) `
                          : ""
                      }`,
                    }}
                  ></div>
                  <div className="book-card__lower-wrapper">
                    <div className="book-card__title">{book.title}</div>
                    <div className="book-card__type">{book.type}</div>
                    <div className="book-card__btns">
                      <div
                        onClick={() => detailBtnOnClickHandler(book.id)}
                        className="book-card__detail-btn book-card__btn btn--slide-to-right"
                      >
                        Chi tiết
                      </div>
                      <div
                        className="book-card__favourite-btn book-card__btn"
                        onClick={(e) => favouriteBtnOnClickHandler(book.id, e)}
                      >
                        {checkFavourite(book.id) ? (
                          <i className="active--favourite fas fa-heart "></i>
                        ) : (
                          <i className="inactive--favourite far fa-heart"></i>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
