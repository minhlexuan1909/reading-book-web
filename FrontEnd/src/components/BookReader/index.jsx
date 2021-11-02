import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { BookContext } from "../../App";
import "./BookReader.css";

export const BookReader = () => {
  const { id } = useParams();
  const { bookList } = useContext(BookContext);
  console.log(bookList);
  const [book] = bookList.filter((item) => item.id === parseInt(id));
  console.log(book);
  return (
    <div className="book-reader">
      {bookList.length !== 0 ? (
        <div className="book-reader-wrapper">
          <embed src={require(`../../pdf/${book.content}`).default} type="" />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
