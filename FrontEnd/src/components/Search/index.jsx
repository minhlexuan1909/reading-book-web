import "./Search.css";

import React, { useContext, useRef } from "react";

import { BookContext } from "../../App";

export const Search = () => {
  const input = useRef();
  const { keySearch, setKeySearch } = useContext(BookContext);
  const searchBtnOnClickHandler = () => {
    setKeySearch(input.current.value.toLowerCase());
  };
  return (
    <div className="search">
      <div className="search__input">
        <i className="fas fa-search"></i>
        <input ref={input} placeholder="Nhập tên sách" type="text" />
        <span className="bottom-border"></span>
        <span className="effect"></span>
      </div>

      <div className="search__searchBtn" onClick={searchBtnOnClickHandler}>
        <div className="searchBtn__text">Tìm kiếm</div>
      </div>
    </div>
  );
};
