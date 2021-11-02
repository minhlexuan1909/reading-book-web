import React, { useRef, useState } from "react";
import "./BookUpload.css";

export const BookUpload = () => {
  const uploadFileBtnRef = useRef();
  const uploadImageBtnRef = useRef();
  const [newBook, setNewBook] = useState({
    image: "",
    title: "",
    bookType: "Văn học",
    author: "",
    descriptions: "",
    viewCount: 0,
    content: "",
  });
  const titleOnChangeHandler = (e) => {
    setNewBook({ ...newBook, title: e.target.value });
  };
  const bookTypeOnChangeHandler = (e) => {
    setNewBook({ ...newBook, bookType: e.target.value });
  };
  const authorOnChangeHandler = (e) => {
    setNewBook({ ...newBook, author: e.target.value });
  };
  const descriptionsOnChangeHandler = (e) => {
    setNewBook({ ...newBook, descriptions: e.target.value });
  };
  const handleImageUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      setNewBook({ ...newBook, image: img.name });
    }
  };
  const uploadImageBtnOnClickHandler = () => {
    uploadImageBtnRef.current.click();
  };
  const handleFileUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      let file = e.target.files[0];
      // this.setState({
      //   image: URL.createObjectURL(img),
      // });
      setNewBook({ ...newBook, content: file.name });
    }
  };
  const uploadBookBtnOnClickHanlder = () => {
    uploadFileBtnRef.current.click();
  };
  const addBookBtnOnClickHandler = async () => {
    const resp = await fetch("http://127.0.0.1:8000/book", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBook),
    });
    return await resp.json();
  };
  return (
    <div className="book-upload">
      <div className="book-upload-wrapper">
        <div className="book-upload__title">Thêm sách</div>
        <div className="book-upload__lower-wrapper">
          <div
            className="book-upload__image-upload"
            onClick={uploadImageBtnOnClickHandler}
          >
            <input
              ref={uploadImageBtnRef}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageUpload}
            />
            <div
              className="book-upload__image-upload-wrapper"
              style={{
                backgroundImage: `${
                  newBook.image !== ""
                    ? `url(${require(`../../img/${newBook.image}`).default}) `
                    : ""
                }`,
              }}
            >
              {newBook.image === "" ? (
                <>
                  <i class="fas fa-upload"></i>
                  <div>Tải ảnh lên</div>
                </>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="book-upload__lower-right-wrapper">
            <label htmlFor="">Tiêu đề</label>
            <input
              type="text"
              value={newBook.title}
              onChange={titleOnChangeHandler}
            />
            <label htmlFor="">Thể loại</label>
            <select name="" id="" onChange={bookTypeOnChangeHandler}>
              <option value="Văn học">Văn học</option>
              <option value="Tài liệu">Tài liệu</option>
            </select>
            <label htmlFor="">Tác giả</label>
            <input
              value={newBook.author}
              onChange={authorOnChangeHandler}
              type="text"
            />
            <label htmlFor="">Mô tả</label>
            <textarea
              value={newBook.descriptions}
              onChange={descriptionsOnChangeHandler}
            ></textarea>
            <div
              className="book-upload__uploadBookBtn"
              onClick={uploadBookBtnOnClickHanlder}
            >
              <input
                ref={uploadFileBtnRef}
                type="file"
                accept="application/pdf"
                style={{ display: "none" }}
                onChange={handleFileUpload}
              />
              <i class="fas fa-arrow-circle-up"></i>
              <span>
                {newBook.content !== "" ? newBook.content : "Tải sách lên"}
              </span>
            </div>
            <div className="book-upload__addBookBtn">
              <button onClick={addBookBtnOnClickHandler}>Thêm sách</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
