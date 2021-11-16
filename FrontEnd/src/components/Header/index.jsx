import "./Header.css";

import React, { useContext, useEffect, useRef } from "react";

import { BookContext } from "../../App";

export const Header = () => {
  const typeListRef = useRef();
  const userFuncRef = useRef();

  const { setToken, setUserFullname, userLastname, isAdmin, token, setIdUser } =
    useContext(BookContext);

  const typeOnMouseOverHandler = () => {
    typeListRef.current.classList.remove("type-list--disappear");
    typeListRef.current.classList.add("type-list--appear");
  };
  const typeOnMouseLeaveHandler = () => {
    typeListRef.current.classList.add("type-list--disappear");
    typeListRef.current.classList.remove("type-list--appear");
  };
  const userOnMouseOverHandler = () => {
    userFuncRef.current.classList.remove("type-list--disappear");
    userFuncRef.current.classList.add("type-list--appear");
  };
  const userOnMouseLeaveHandler = () => {
    userFuncRef.current.classList.add("type-list--disappear");
    userFuncRef.current.classList.remove("type-list--appear");
  };
  const logoutBtnOnClickHandler = () => {
    setToken("token", "", { path: "/" });
    setUserFullname("");
  };
  useEffect(() => {
    async function fetchAPI() {
      let resp = await fetch("http://127.0.0.1:8000/user/info", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.token}`,
        },
      });
      resp = await resp.json();
      setUserFullname(resp.fullname);
      setIdUser(resp.idUser);
    }
    fetchAPI();
  }, [token.token]);
  return (
    <div className="header">
      <a href="/" className="header__logo">
        <img src={require("../../img/white-logo.png").default} alt="" />
      </a>
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
            <li className="type-list__item">
              <a className="type-list__text" href="/type/truyen">
                Truyện
              </a>
            </li>
          </ul>
        </li>
        <li className="header-nav__item header__btn">
          <a className="header-nav__text" href="/library">
            Thư viện sách
          </a>
        </li>
      </ul>
      <div className="header__user">
        {token["token"] ? (
          <div
            className="header__hello-text header__btn"
            onMouseOver={userOnMouseOverHandler}
            onMouseLeave={userOnMouseLeaveHandler}
          >
            Xin chào, {userLastname}
            <div
              ref={userFuncRef}
              className="header__user-function type-list--disappear"
            >
              {isAdmin ? (
                <a className="type-list__item" href="/upload">
                  <div className="type-list__text">Thêm sách</div>
                </a>
              ) : (
                <></>
              )}
              <div className="type-list__item">
                <a href="/favourite" className="type-list__text">
                  Danh sách yêu thích
                </a>
              </div>
              <div
                className="header__logoutBtn"
                onClick={logoutBtnOnClickHandler}
              >
                <div className="type-list__item">
                  <a className="type-list__text" href="/login">
                    Đăng xuất
                  </a>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="header-user__login-btn header__btn">
              <a className="header-nav__text" href="/login">
                Đăng nhập
              </a>
            </div>
            <div className="header-user__register-btn header__btn">
              <a href="/signup" className="header-nav__text">
                Đăng ký
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
