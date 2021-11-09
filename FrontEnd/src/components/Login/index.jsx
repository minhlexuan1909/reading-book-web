import React, { useContext, useRef, useState } from "react";
import { BookContext } from "../../App";
import "./Login.css";
import "../../animations.css";

export const Login = () => {
  const { setToken, setIsLoginSuccessfully, setUserFullname } =
    useContext(BookContext);
  const usernameFeildRef = useRef();
  const passwordFeildRef = useRef();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMessage, setErrMessage] = useState("");

  const usernameOnFocusHandler = (e) => {
    usernameFeildRef.current.style.boxShadow = "0 0 5px 2px orange";
    usernameFeildRef.current.style.caretColor = "orange";
  };
  const usernameOnBlurHandler = (e) => {
    usernameFeildRef.current.style.boxShadow = "0 0 5px 2px rgb(0 0 0 / 20%)";
  };
  const passwordOnFocusHandler = (e) => {
    passwordFeildRef.current.style.boxShadow = "0 0 5px 2px orange";
    passwordFeildRef.current.style.caretColor = "orange";
  };
  const passwordOnBlurHandler = (e) => {
    passwordFeildRef.current.style.boxShadow = "0 0 5px 2px rgb(0 0 0 / 20%)";
  };
  const usernameOnChangeHandler = (e) => {
    setUsername(e.currentTarget.value);
  };
  const passwordOnChangeHandler = (e) => {
    setPassword(e.currentTarget.value);
  };
  const loginBtnOnClickHandler = async () => {
    let resp = await fetch("http://127.0.0.1:8000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username, password: password }),
    });
    resp = await resp.json();
    // resp = await resp.json();
    if (!resp["access_token"]) {
      console.log("object");
      if (resp["detail"] === "Username not found") {
        setErrMessage("Không tìm thấy user");
      } else if (resp["detail"] === "Password is not correct") {
        setErrMessage("Sai mật khẩu");
      }
    } else {
      setToken("token", resp["access_token"]);
      setUserFullname("fullname", resp["fullname"]);
      setIsLoginSuccessfully(true);
    }
  };
  return (
    <>
      <div className="login">
        <div className="login__overlay"></div>
        <div className="login__visible-bg"></div>
        <div className="login__white"></div>
        <div className="login__upper-floor">
          <div className="login__wrapper">
            <div className="login-wrapper__left">
              <div className="login-wrapper__left-overlay">
                <span className="login__welcome-text">
                  Welcome <br /> Back
                </span>
              </div>
            </div>
            <div className="login-wrapper__right">
              <div className="login-right__middle-wrapper">
                <div className="login__title">
                  <div className="login__title-text">Đăng nhập</div>
                </div>
                <div className="login__user-info">
                  <div className="login__username login__feild">
                    <i className="fas fa-user"></i>
                    <div ref={usernameFeildRef} className="login__input">
                      <input
                        type="text"
                        placeholder="Tên tài khoản"
                        value={username || ""}
                        onChange={usernameOnChangeHandler}
                        onFocus={usernameOnFocusHandler}
                        onBlur={usernameOnBlurHandler}
                      />
                    </div>
                  </div>
                  <div className="login__password login__feild">
                    <i className="fas fa-lock"></i>
                    <div ref={passwordFeildRef} className="login__input">
                      <input
                        type="password"
                        placeholder="Mật khẩu"
                        value={password || ""}
                        onChange={passwordOnChangeHandler}
                        onFocus={passwordOnFocusHandler}
                        onBlur={passwordOnBlurHandler}
                      />
                    </div>
                  </div>
                </div>
                <div className="login__loginBtn-wrapper">
                  <div className="login__loginBtn">
                    <div
                      className="loginBtn__text"
                      onClick={loginBtnOnClickHandler}
                    >
                      Đăng nhập
                    </div>
                  </div>
                </div>
                <div className="login__error-message">{errMessage}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
