import React, { useEffect, useState } from "react";
import "../../assets/css/login.css";
import "../../assets/css/bootstrap.min.css";
import logo from "../../assets/logo/jababeka_report.png";
import axios from "axios";

const Login = () => {
  const [wrongPass, setWrongPass] = useState("");
  const [formLogin, setFormLogin] = useState({ username: "", password: "" });

  useEffect(() => {}, []);
  console.log(formLogin);

  const onInputChange = (input, value) => {
    setFormLogin({
      ...formLogin,
      [input]: value.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formLogin.username !== "" && formLogin.password !== "") {
      axios
        .post("http://localhost:4000/api/user/login", {
          user_name: formLogin.username,
          user_password: formLogin.password,
        })
        .then((res) => {
          if (res.data.loginStatus !== "none") {
            localStorage.setItem("data", JSON.stringify(res.data.data[0]));
            window.location.href = "/";
          } else {
            setWrongPass("Sorry your username or password is wrong");
          }
          console.log(res);
        })
        .catch((err) => console.log(err));
    } else {
      setWrongPass("Sorry your username or password should be fill");
    }
  };

  return (
    <div className="container_login">
      <div className="square_login">
        <div className="line_logo">
          <img className="img_logo_login  mt-5 mb-3" src={logo} />
          <p className="text_logo mb-4">Jababeka Report</p>
        </div>
        <h2 className="text_login">Login</h2>

        <div className="form_login p-4">
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username" className="form-label">
                Username
              </label>

              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Your username"
                value={formLogin.username}
                onChange={(e) => onInputChange("username", e)}
              />
            </div>

            <div>
              <label htmlFor="password" className="form-label mt-3">
                Password
              </label>

              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Your password"
                value={formLogin.password}
                onChange={(e) => onInputChange("password", e)}
              />
            </div>

            <button className="btn btn-login btn-danger mt-4">Log In</button>
          </form>
        </div>

        <p className="text-danger">{wrongPass}</p>

        <p className="pb-4">
          Don’t have an account?
          <a href="/register" className="text_signUp">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
