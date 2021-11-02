import React from "react";
import { BookUpload } from "../../components/BookUpload";
import { Header } from "../../components/Header";

export const BookUploadRoute = () => {
  return (
    <div>
      <Header></Header>
      <BookUpload></BookUpload>
    </div>
  );
};
