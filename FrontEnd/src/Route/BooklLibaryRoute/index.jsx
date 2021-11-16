import React, { useState } from "react";

import { BookLibrary } from "../../components/BookLibrary";
import { Header } from "../../components/Header";
import { Search } from "../../components/Search";

export const BookLibraryRoute = () => {
  return (
    <div>
      <Header></Header>
      <div style={{ position: "relative" }}>
        <Search></Search>
        <BookLibrary title={"Thư viện"}></BookLibrary>
      </div>
    </div>
  );
};
