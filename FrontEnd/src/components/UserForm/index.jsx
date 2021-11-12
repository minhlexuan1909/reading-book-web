import React, { useState, useEffect, useContext, useRef } from "react";
import { BookContext } from "../../App";
import "./UserForm.css";
import "../../animations.css";

export const UserForm = ({ type }) => {
  const { setToken, setIsLoginSuccessfully, setUserFullname } =
    useContext(BookContext);
  const usernameFeildRef = useRef();
  const passwordFeildRef = useRef();
  const fullnameFeildRef = useRef();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [errMessage, setErrMessage] = useState("");

  const usernameOnFocusHandler = (e) => {
    usernameFeildRef.current.style.boxShadow = "0 0 5px 2px orange";
    usernameFeildRef.current.style.caretColor = "orange";
  };
  const usernameOnBlurHandler = () => {
    usernameFeildRef.current.style.boxShadow = "0 0 5px 2px rgb(0 0 0 / 20%)";
  };
  const passwordOnFocusHandler = () => {
    passwordFeildRef.current.style.boxShadow = "0 0 5px 2px orange";
    passwordFeildRef.current.style.caretColor = "orange";
  };
  const passwordOnBlurHandler = () => {
    passwordFeildRef.current.style.boxShadow = "0 0 5px 2px rgb(0 0 0 / 20%)";
  };
  const fullnameOnFocusHandler = () => {
    fullnameFeildRef.current.style.boxShadow = "0 0 5px 2px orange";
    fullnameFeildRef.current.style.caretColor = "orange";
  };
  const fullnameOnBlurHandler = () => {
    fullnameFeildRef.current.style.boxShadow = "0 0 5px 2px rgb(0 0 0 / 20%)";
  };
  const usernameOnChangeHandler = (e) => {
    setUsername(e.currentTarget.value);
  };
  const passwordOnChangeHandler = (e) => {
    setPassword(e.currentTarget.value);
  };
  const fullnameOnChangeHandler = (e) => {
    setFullname(e.currentTarget.value);
  };
  const userFormLoginBtnOnClickHandler = async () => {
    let resp = await fetch("http://127.0.0.1:8000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username, password: password }),
    });
    resp = await resp.json();
    // resp = await resp.json();
    console.log(resp);
    if (!resp["access_token"]) {
      setErrMessage(resp["detail"]);
    } else {
      setToken("token", resp["access_token"]);
      setUserFullname("fullname", resp["fullname"]);
      setIsLoginSuccessfully(true);
    }
  };
  const userFormSignupBtnOnClickHandler = async () => {
    let resp = await fetch("http://127.0.0.1:8000/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
        userRole: "user",
        fullname: fullname,
      }),
    });
    resp = await resp.json();
    if (resp["detail"]) {
      setErrMessage(resp["detail"]);
    } else {
      window.location.href = "/login";
    }
  };
  return (
    <div className="user-form">
      <div className="user-form-right__middle-wrapper">
        <div className="user-form__title">
          <div className="user-form__title-text">
            {type === "login" ? "Đăng nhập" : "Đăng ký"}
          </div>
        </div>
        <div className="user-form__user-info">
          <div className="user-form__username user-form__feild">
            <i className="fas fa-user"></i>
            <div ref={usernameFeildRef} className="user-form__input">
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
          <div className="user-form__password user-form__feild">
            <i className="fas fa-lock"></i>
            <div ref={passwordFeildRef} className="user-form__input">
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
          {type === "signup" ? (
            <div className="user-form__feild">
              <i class="fas fa-user-tie"></i>
              <div ref={fullnameFeildRef} className="user-form__input">
                <input
                  type="text"
                  placeholder="Tên đầy đủ"
                  value={fullname || ""}
                  onChange={fullnameOnChangeHandler}
                  onFocus={fullnameOnFocusHandler}
                  onBlur={fullnameOnBlurHandler}
                />
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className="user-form__user-formBtn-wrapper">
          <a
            className="user-form__actionBtn"
            onClick={() => {
              type === "login"
                ? userFormLoginBtnOnClickHandler()
                : userFormSignupBtnOnClickHandler();
            }}
          >
            <div className="user-formBtn__text">
              {type === "login" ? "Đăng nhập" : "Đăng ký"}
            </div>
          </a>
        </div>
        <div className="user-form__error-message">{errMessage}</div>
      </div>
    </div>
  );
};
