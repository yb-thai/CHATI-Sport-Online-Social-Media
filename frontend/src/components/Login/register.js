import React from "react";
import { useState } from "react";
import "./login.scss";
import loginImg from "./templogo.png";
import axios from "axios";

{
  /* Register form */
}
function Register(props) {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const register = async (username, password, email) => {
    try {
      if (username.length > 0 && password.length > 0 && email.length > 0) {
        const { data } = await axios.post(
          "http://chatispu.herokuapp.com/api/users/",
          { username: username, password: password, email: email, profile: {} },
          config
        );
      } else {
        alert("Please fill out all fields to register.");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const sendRegister = () => {
    console.log("sendRegister");
    register(formData.username, formData.password, formData.email);
  };

  return (
    <div className="base-container" ref={props.containerRef}>
      <div className="RegisterHeader">Register</div>
      <div className="content">
        <div className="image">
          <img src={loginImg} />
        </div>
        <div className="form">
          <form id="registerForm" onSubmit={sendRegister}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                placeholder="username"
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                placeholder="email"
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
        <button type="submit" className="btn" form="registerForm">
          Register
        </button>
      </div>
    </div>
  );
}

export default Register;
