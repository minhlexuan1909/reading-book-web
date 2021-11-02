import React from "react";
import { BookLibrary } from "../../components/BookLibrary";
import { Header } from "../../components/Header";

export const BookLibraryRoute = () => {
  return (
    <div>
      <Header></Header>
      <div style={{ position: "relative" }}>
        <BookLibrary title={"Top sách"}></BookLibrary>
        <BookLibrary title={"Thư viện"}></BookLibrary>
      </div>
    </div>
  );
};
