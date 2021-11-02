import "./App.css";
import { Router, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom/cjs/react-router-dom.min";
import { HomeRoute } from "./Route/HomeRoute";
import { BookLibraryRoute } from "./Route/BooklLibaryRoute";
import { BookDetail } from "./components/BookDetail";
import { BookDetailRoute } from "./Route/BookDetailRoute";
import { createContext, useState, useEffect } from "react";
import { BookTypeRoute } from "./Route/BookTypeRoute";
import { BookUpload } from "./components/BookUpload";
import { BookUploadRoute } from "./Route/BookUploadRoute";
import { BookReader } from "./components/BookReader";
import { BookReaderRoute } from "./Route/BookReaderRoute";

const BookContext = createContext({});
export { BookContext };

function App() {
  const [isSeeingDetail, setIsSeeingDetail] = useState(false);
  const [bookList, setBookList] = useState([
    // {
    //   id: 0,
    //   image: require("./img/chuyen-con-meo-day-hai-au-bay-tb-2017.jpg").default,
    //   title: "Chuyện con mèo dạy hải âu bay",
    //   type: "Văn học",
    //   author: "Luis Sepúlveda",
    //   description: `Chuyện Con Mèo Dạy Hải Âu Bay
    //   Cô hải âu Kengah bị nhấn chìm trong váng dầu – thứ chất thải nguy hiểm mà những con người xấu xa bí mật đổ ra đại dương. Với nỗ lực đầy tuyệt vọng, cô bay vào bến cảng Hamburg và rơi xuống ban công của con mèo mun, to đùng, mập ú Zorba. Trong phút cuối cuộc đời, cô sinh ra một quả trứng và con mèo mun hứa với cô sẽ thực hiện ba lời hứa chừng như không tưởng với loài mèo:
    //   Không ăn quả trứng.
    //   Chăm sóc cho tới khi nó nở.
    //   Dạy cho con hải âu bay.
    //   Lời hứa của một con mèo cũng là trách nhiệm của toàn bộ mèo trên bến cảng, bởi vậy bè bạn của Zorba bao gồm ngài mèo Đại Tá đầy uy tín, mèo Secretario nhanh nhảu, mèo Einstein uyên bác, mèo Bốn Biển đầy kinh nghiệm đã chung sức giúp nó hoàn thành trách nhiệm. Tuy nhiên, việc chăm sóc, dạy dỗ một con hải âu đâu phải chuyện đùa, sẽ có hàng trăm rắc rối nảy sinh và cần có những kế hoạch đầy linh hoạt được bàn bạc kỹ càng…
    //   Chuyện Con Mèo Dạy Hải Âu Bay là kiệt tác dành cho thiếu nhi của nhà văn Chi Lê nổi tiếng Luis Sepúlveda – tác giả của cuốn Lão già mê đọc truyện tình đã bán được 18 triệu bản khắp thế giới. Tác phẩm không chỉ là một câu chuyện ấm áp, trong sáng, dễ thương về loài vật mà còn chuyển tải thông điệp về trách nhiệm với môi trường, về sự sẻ chia và yêu thương cũng như ý nghĩa của những nỗ lực – “Chỉ những kẻ dám mới có thể bay”.
    //   Cuốn sách mở đầu cho mùa hè với minh họa dễ thương, hài hước là món quà dành cho mọi trẻ em và người lớn.`,
    //   viewCount: 0,
    // },
    // {
    //   id: 1,
    //   image: require("./img/lai-day-om-cai-nao.jpg").default,
    //   title: "Lại Đây, Ôm Cái Nào!",
    //   type: "Văn học",
    //   author: "Tả Đồng",
    //   description: ``,
    //   viewCount: 1,
    // },
    // {
    //   id: 2,
    //   image: require("./img/khong-gia-dinh-tb-2021-bm.jpg").default,
    //   title: "Không gia đình",
    //   type: "Văn học",
    //   author: "Hector Malot",
    //   description: ``,
    //   viewCount: 2,
    // },
    // {
    //   id: 3,
    //   image: require("./img/tro-choi-cua-thien-than.jpg").default,
    //   title: "Trò chơi của thiên thần",
    //   type: "Văn học",
    //   author: "Carlos Ruiz Zafón",
    //   description: ``,
    //   viewCount: 3,
    // },
    // {
    //   id: 4,
    //   image: require("./img/python-crash-course.jpg").default,
    //   title: "Python crash course",
    //   type: "Tài liệu",
    //   author: "Eric Mathes",
    //   description: ``,
    //   viewCount: 4,
    // },
  ]);
  // useEffect(() => {
  //   fetch("http://127.0.0.1:8000/book", {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((resp) => resp.json())
  //     .then((resp) => setBookList(resp))
  //     .catch((err) => console.log(err));
  // }, []);

  useEffect(() => {
    async function fetchAPI() {
      let resp = await fetch("http://127.0.0.1:8000/book", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      resp = await resp.json();
      setBookList(resp);
    }
    fetchAPI();
    console.log("API Fetched");
  }, []);
  console.log(bookList);
  const [showingBookLib, setShowingBookLib] = useState([]);
  // let showingBookLib = [];
  const providerValue = {
    isSeeingDetail,
    setIsSeeingDetail,
    showingBookLib,
    setShowingBookLib,
    bookList,
  };
  return (
    <BookContext.Provider value={providerValue}>
      <BrowserRouter>
        {console.log("run here")}
        <Route exact path="/" component={HomeRoute} />
        <Route exact path="/library" component={BookLibraryRoute} />
        <Route exact path="/library/:id" component={BookDetailRoute} />
        <Route exact path="/type/:type" component={BookTypeRoute} />
        <Route exact path="/type/:type/:id" component={BookDetailRoute} />
        <Route exact path="/upload" component={BookUploadRoute} />
        <Route exact path="/read/:id" component={BookReaderRoute} />
      </BrowserRouter>
    </BookContext.Provider>

    // <div style={{ position: "relative" }}>
    //   {/* <div className="overlay"></div> */}
    //   {/* <Header></Header> */}
    //   {/* <Home></Home> */}
    //   {/* <Books></Books> */}
    //   {/* <BookLibrary></BookLibrary> */}

    // </div>
  );
}

export default App;
