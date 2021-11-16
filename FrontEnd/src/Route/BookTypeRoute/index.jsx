import React, { useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

import { BookLibrary } from "../../components/BookLibrary";
import { Header } from "../../components/Header";
import { Search } from "../../components/Search";

export const BookTypeRoute = () => {
  const [keySearch, setKeySearch] = useState("");
  let { type } = useParams();
  if (type === "van-hoc") {
    type = "Văn học";
  } else if (type === "tai-lieu") {
    type = "Tài liệu";
  } else if (type === "truyen") {
    type = "Truyện";
  }
  return (
    <div>
      <Header></Header>
      <Search></Search>
      <BookLibrary title={type}></BookLibrary>
    </div>
  );
};
