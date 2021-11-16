import React from "react";

import { BookDetail } from "../../components/BookDetail";
import { Header } from "../../components/Header";

export const BookDetailRoute = () => {
  return (
    <div>
      <Header></Header>
      <div style={{ position: "relative" }}>
        <BookDetail></BookDetail>
      </div>
    </div>
  );
};
