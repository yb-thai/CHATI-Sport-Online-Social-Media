import React from "react";
import { useState } from "react";
import "./login.scss";
import loginImg from "./templogo.png";
import { Link } from "react-router-dom";
import { login } from "../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";

{
  /* Login page form */
}

function Login(props) {
  //Uses hooks to maintain form data as user inputs data
  const [formData, setFormData] = useState({});

  //Function called on input change to change formData
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;
  const sendLogin = (e) => {
    e.preventDefault();
    dispatch(login(formData.username, formData.password));
    console.log("sent!");
    setTimeout(() => {
      props.history.push("/");
      }, 1500);
  };
  return (
    <div className="base-container" ref={props.containerRef}>
      <div className="LoginHeader">Login</div>
      <div className="content">
        <div className="image">
          <img src={loginImg} />
        </div>
        <div className="form">
          <form id="loginForm" onSubmit={sendLogin}>
            <div className="form-group">
              <label htmlFor="username"> Username</label>
              <input
                type="text"
                name="username"
                placeholder="username"
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                placeholder="password"
                onChange={handleChange}
              />
            </div>
          </form>
        </div>
      </div>
      <div className="footer">
        <button type="submit" className="btn" form="loginForm">
          Login
        </button>
      </div>
      <div className="signupFooter">
        <label>
          {" "}
          Don't have an account? <Link to="/register">Sign up</Link>{" "}
        </label>
      </div>
    </div>
  );
}

export default Login;