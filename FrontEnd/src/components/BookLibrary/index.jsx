import { Redirect, useHistory } from "react-router-dom";
import React, { useContext, useEffect } from "react";
import { BookContext } from "../../App";
import "./BookLibrary.css";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { useState } from "react/cjs/react.development";

export const BookLibrary = ({ title }) => {
  const { setIsSeeingDetail, bookList, isLoginSuccessfully } =
    useContext(BookContext);
  const history = useHistory();
  const url = useLocation();
  const bodyScroll = require("body-scroll-toggle");
  const detailBtnOnClickHandler = (id) => {
    setIsSeeingDetail(true);
    const str = `${url.pathname}/${id}`;
    history.push(str);
    bodyScroll.disable();
    document.body.style.position = "fixed";
    document.body.style.top = `-${window.scrollY}px`;
  };
  const [bookShow, setBookShow] = useState([]);
  useEffect(() => {
    if (title === "Thư viện") {
      setBookShow(bookList);
    } else if (title === "Top sách") {
      const tmpBookList = [...bookList];
      tmpBookList.sort((item1, item2) => item2.viewCount - item1.viewCount);
      setBookShow(tmpBookList.slice(0, 5));
    } else if (title === "Văn học" || title === "Tài liệu") {
      const tmpBookList = [...bookList];
      setBookShow(tmpBookList.filter((item) => item.bookType === title));
    }
  }, [bookList]);
  return (
    <div className="book-lib">
      <div className="book-lib-wrapper">
        <div className="book-lib__most-read-section">
          <div className="book-lib__section-title">{title}</div>
          <div className="book-lib__book-list">
            {bookShow.map((book) => (
              <div className="book-lib__book-card" key={book.id}>
                <div className="book-lib__book-card-wrapper">
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
                  >
                    {/* <img src={book.image} alt="" /> */}
                  </div>
                  <div className="book-card__lower-wrapper">
                    <div className="book-card__title">{book.title}</div>
                    <div className="book-card__type">{book.type}</div>
                    <div className="book-card__btns">
                      <div
                        // to={`/library/${book.id}`}
                        onClick={() => detailBtnOnClickHandler(book.id)}
                        className="book-card__detail-btn book-card__btn"
                      >
                        Chi tiết
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
