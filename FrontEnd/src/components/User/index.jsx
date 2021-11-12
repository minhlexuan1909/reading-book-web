import React from "react";
import "./User.css";
import "../../animations.css";
import { UserForm } from "../UserForm";
import { useLocation } from "react-router-dom";
export const User = () => {
  const { pathname } = useLocation();

  return (
    <div className="user">
      <div className="user__overlay"></div>
      <div className="user__visible-bg"></div>
      <div className="user__white"></div>
      <div className="user__upper-floor">
        <div className="user__wrapper">
          <div className="user-wrapper__left">
            <div className="user-wrapper__left-overlay">
              <span className="user__welcome-text">
                Welcome <br /> Back
              </span>
            </div>
          </div>
          <div className="user-wrapper__right">
            {pathname === "/login" ? (
              <UserForm type={"login"}></UserForm>
            ) : (
              <UserForm type={"signup"}></UserForm>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
