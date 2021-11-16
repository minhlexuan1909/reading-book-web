import React, { useState } from "react";

import { BookLibrary } from "../../components/BookLibrary";
import { Header } from "../../components/Header";
import { Search } from "../../components/Search";

export const BookFavouriteRoute = () => {
  const [keySearch, setKeySearch] = useState("");
  return (
    <div>
      <Header></Header>
      <Search keySearch={keySearch} setKeySearch={setKeySearch}></Search>
      <BookLibrary title={"Danh sách yêu thích"}></BookLibrary>
    </div>
  );
};
