import React from "react";
import { useState } from "react/cjs/react.development";

import { BookLibrary } from "../../components/BookLibrary";
import { Header } from "../../components/Header";
import { Search } from "../../components/Search";

export const BookLibraryRoute = () => {
  const [keySearch, setKeySearch] = useState("");
  return (
    <div>
      <Header></Header>
      <div style={{ position: "relative" }}>
        <Search keySearch={keySearch} setKeySearch={setKeySearch}></Search>
        <BookLibrary title={"Thư viện"} keySearch={keySearch}></BookLibrary>
      </div>
    </div>
  );
};
