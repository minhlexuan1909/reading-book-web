import "./App.css";
import { Route } from "react-router-dom";
import {
  BrowserRouter,
  Redirect,
} from "react-router-dom/cjs/react-router-dom.min";
import { HomeRoute } from "./Route/HomeRoute";
import { BookLibraryRoute } from "./Route/BooklLibaryRoute";
import { BookDetailRoute } from "./Route/BookDetailRoute";
import { createContext, useState, useEffect } from "react";
import { BookTypeRoute } from "./Route/BookTypeRoute";
import { BookUploadRoute } from "./Route/BookUploadRoute";
import { BookReaderRoute } from "./Route/BookReaderRoute";
import { User } from "./components/User";
import { useCookies } from "react-cookie";

const BookContext = createContext({});
export { BookContext };

function App() {
  const [isSeeingDetail, setIsSeeingDetail] = useState(false);
  const [bookList, setBookList] = useState([]);
  const [token, setToken] = useCookies(["token"]);
  const [isLoginSuccessfully, setIsLoginSuccessfully] = useState(false);
  const [userFullname, setUserFullname] = useCookies(["fullname"]);
  const [userLastname, setUserLastname] = useState("");
  const [isAdmin, setIsAdmin] = useState(null);

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
          Authorization: `Bearer ${token["token"]}`,
        },
      });
      resp = await resp.json();
      if (resp["detail"]) {
        setIsLoginSuccessfully(false);
      } else {
        setBookList(resp);
        setIsLoginSuccessfully(true);
      }
    }
    fetchAPI();
  }, [token["token"]]);
  useEffect(() => {
    if (userFullname["fullname"]) {
      const tmp = userFullname["fullname"].split(" ");
      setUserLastname(tmp[tmp.length - 1]);
    }
  }, [userFullname["fullname"]]);

  useEffect(() => {
    async function fetchAPI() {
      let resp = await fetch("http://127.0.0.1:8000/isAdmin", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token["token"]}`,
        },
      });
      resp = await resp.json();
      console.log(resp);
      if (!resp.detail) {
        setIsAdmin(true);
      }
    }
    fetchAPI();
  }, [token["token"]]);
  const providerValue = {
    isSeeingDetail,
    setIsSeeingDetail,
    bookList,
    setBookList,
    token,
    setToken,
    isLoginSuccessfully,
    setIsLoginSuccessfully,
    userFullname,
    setUserFullname,
    userLastname,
    setUserLastname,
    isAdmin,
    setIsAdmin,
  };
  return (
    <BookContext.Provider value={providerValue}>
      <BrowserRouter>
        <Route exact path="/" component={HomeRoute} />
        <Route exact path="/library" component={BookLibraryRoute}>
          {!isLoginSuccessfully ? (
            <Redirect to="/login" />
          ) : (
            <BookLibraryRoute />
          )}
        </Route>
        <Route exact path="/library/:id" component={BookDetailRoute} />
        <Route exact path="/type/:type" component={BookTypeRoute} />
        <Route exact path="/type/:type/:id" component={BookDetailRoute} />
        <Route exact path="/upload" component={BookUploadRoute} />
        <Route exact path="/read/:id" component={BookReaderRoute} />
        {/* <Route exact path="/login" component={Login} /> */}
        <Route exact path="/login">
          {isLoginSuccessfully ? <Redirect to="/library" /> : <User />}
        </Route>
        <Route exact path="/signup" component={User} />
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
