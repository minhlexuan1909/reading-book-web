import React, { useRef } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

export const Header = () => {
  const typeListRef = useRef();
  const typeOnMouseOverHandler = () => {
    typeListRef.current.classList.remove("type-list--disappear");
    typeListRef.current.classList.add("type-list--appear");
  };
  const typeOnMouseLeaveHandler = () => {
    typeListRef.current.classList.add("type-list--disappear");
    typeListRef.current.classList.remove("type-list--appear");
  };
  return (
    <div className="header">
      <div className="header__logo">
        <img src={require("../../img/white-logo.png").default} alt="" />
      </div>
      <ul className="header__nav">
        <li className="header-nav__item header__btn">
          <a className="header-nav__text" href="/">
            Trang chủ
          </a>
        </li>
        <li
          className="header-nav__item header__btn header__type-btn"
          onMouseOver={typeOnMouseOverHandler}
          onMouseLeave={typeOnMouseLeaveHandler}
        >
          <div className="header-nav__text">Thể loại</div>
          <ul
            className="header__type-list type-list--disappear"
            ref={typeListRef}
          >
            <li className="type-list__item">
              <a className="type-list__text" href="/type/van-hoc">
                Văn học
              </a>
            </li>
            <li className="type-list__item">
              <a className="type-list__text" href="/type/tai-lieu">
                Tài liệu
              </a>
            </li>
          </ul>
        </li>
        <li className="header-nav__item header__btn">
          <div className="header-nav__text">Tác giả</div>
        </li>
        <li className="header-nav__item header__btn">
          <a className="header-nav__text" href="/library">
            Thư viện sách
          </a>
        </li>
      </ul>
      <div className="header__user">
        <div className="header-user__login-btn header__btn">
          <div className="header-nav__text">Đăng nhập</div>
        </div>
        <div className="header-user__register-btn header__btn">
          <div className="header-nav__text">Đăng ký</div>
        </div>
      </div>
    </div>
  );
};
