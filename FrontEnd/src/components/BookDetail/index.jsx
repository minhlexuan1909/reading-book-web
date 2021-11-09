import React, { useContext } from "react";
import {
  useParams,
  useHistory,
} from "react-router-dom/cjs/react-router-dom.min";
import { BookContext } from "../../App";
import "./BookDetail.css";
import "../../animations.css";

export const BookDetail = () => {
  let { id } = useParams();
  const history = useHistory();
  const { setIsSeeingDetail, bookList } = useContext(BookContext);
  console.log(bookList);
  const bodyScroll = require("body-scroll-toggle");
  const closeBtnOnClickHandler = () => {
    setIsSeeingDetail(false);
    bodyScroll.enable();
    history.goBack();
  };
  const [book] = bookList.filter((item) => item.id === parseInt(id));
  return (
    <div className="book-detail">
      <div className="book-detail__overlay"></div>
      <div className="book-detail__outside-zone">
        <div className="book-detail__wrapper">
          <div
            // to="/library"
            className="book-detail__closeBtn"
            onClick={closeBtnOnClickHandler}
          >
            <i className="fas fa-times"></i>
          </div>
          <div className="book-detail__book-image">
            <img src={require(`../../img/${book.image}`).default} alt="" />
          </div>
          <div className="book-detail__over-layer">
            <div className="book-detail__visionable-image"></div>
            <div className="book-detail__float-zone-wrapper">
              <div className="book-detail__float-zone">
                <div className="book-detail__left-side">
                  <div
                    className="book-detail__over-image"
                    style={{
                      backgroundImage: `url(${
                        require(`../../img/${book.image}`).default
                      })`,
                    }}
                  ></div>
                  <a
                    href={`/read/${book.id}`}
                    className="book-detail__readNowBtn"
                  >
                    Đọc Ngay
                  </a>
                </div>
                <div className="book-detail__title-and-desc">
                  <div className="book-detail__title">{book.title}</div>
                  <div className="book-detail__description">
                    <div className="book-detail__type book-detail__desc">
                      <i className="fas fa-bars"></i>
                      <div className="description-text">{book.bookType}</div>
                    </div>
                    <div className="book-detail__author book-detail__desc">
                      <i className="fas fa-user"></i>
                      <div className="description-text">{book.author}</div>
                    </div>
                    <div className="book-detail__text-desc book-detail__desc">
                      <i className="fas fa-book-open"></i>
                      <div className="description-text">
                        {book.descriptions}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="orange-line"></div>
            <div style={{ backgroundColor: "white", height: "100%" }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};
