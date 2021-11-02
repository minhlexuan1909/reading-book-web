import React from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { BookLibrary } from "../../components/BookLibrary";
import { Header } from "../../components/Header";

export const BookTypeRoute = () => {
  let { type } = useParams();
  if (type === "van-hoc") {
    type = "Văn học";
  } else if (type === "tai-lieu") {
    type = "Tài liệu";
  }
  return (
    <div>
      <Header></Header>
      <BookLibrary title={type}></BookLibrary>
    </div>
  );
};
