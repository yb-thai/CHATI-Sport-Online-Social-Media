import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./actions/userActions";
import { Link } from "react-router-dom";
import "./Sidenav.scss";

// Side Navigation menu

const Sidenav = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();

  const sendLogout = () => {
    console.log("sendLogout");
    dispatch(logout());
  };

  return (
    <div className="sidenav">
      <ul className="sidenav-list">
        <li>
          <Link className="sidenav-list__item" to="/Profile">
            Profile
          </Link>
        </li>
        <li>
          <Link className="sidenav-list__item" to="/">
            Event
          </Link>
        </li>
        <li>
          <Link className="sidenav-list__item" to="/status">
            Status
          </Link>
        </li>
        <li>
          <Link className="sidenav-list__item" onClick={sendLogout} to="/Login">
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidenav;
