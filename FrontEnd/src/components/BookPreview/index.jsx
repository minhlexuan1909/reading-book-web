import React from "react";
import "./BookPreview.css";

export const BookPreview = () => {
  return (
    <div className="book-preview">
      <div className="book-preview__image">
        <img
          src={
            require("../../img/chuyen-con-meo-day-hai-au-bay-tb-2017.jpg")
              .default
          }
          alt=""
        />
      </div>
      <div className="book-preview__text">
        <div className="book-preview__title">Chuyện con mèo dạy hải âu bay</div>
        <div className="book-preview__type">Văn học</div>
        <div className="book-preview__short-description">
          Chuyện Con Mèo Dạy Hải Âu Bay là kiệt tác dành cho thiếu nhi của nhà
          văn Chi Lê nổi tiếng Luis Sepúlveda – tác giả của cuốn Lão già mê đọc
          truyện tình đã bán được 18 triệu bản khắp thế giới. Tác phẩm không chỉ
          là một câu chuyện ấm áp, trong sáng, dễ thương về loài vật mà còn
          chuyển tải thông điệp về trách nhiệm với môi trường, về sự sẻ chia và
          yêu thương cũng như ý nghĩa của những nỗ lực – “Chỉ những kẻ dám mới
          có thể bay”
        </div>
        <div className="book-preview__detail-btn-wrapper">
          <div className="book-preview__detail-btn">Chi tiết</div>
        </div>
      </div>
    </div>
  );
};
