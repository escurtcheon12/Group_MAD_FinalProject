import React, { useEffect, useState } from "react";
import "../../assets/css/register.css";
import "../../assets/css/bootstrap.min.css";
import logo from "../../assets/logo/jababeka_report.png";
import axios from "axios";

const Register = () => {
  const [wrongPass, setWrongPass] = useState("");
  const [formRegister, setFormRegister] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    c_password: "",
  });

  useEffect(() => {}, []);
  // console.log(formRegister);

  const onInputChange = (input, value) => {
    setFormRegister({
      ...formRegister,
      [input]: value.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:4000/api/user/filterRegister", {
        user_name: formRegister.username,
        user_email: formRegister.email,
        user_phone: formRegister.phone,
      })
      .then((res) => {
        console.log(res);
        if (formRegister.password === formRegister.c_password) {
          if (res.data.desc === "none") {
            axios
              .post("http://localhost:4000/api/user/add", {
                user_name: formRegister.username,
                user_email: formRegister.email,
                user_phone: formRegister.phone,
                user_password: formRegister.password,
              })
              .then((res) => {
                console.log(res);
                window.location.href = "http://localhost:3000/login";
              })
              .catch((err) => console.log(err));
          } else {
            setWrongPass("Your username or email or phone is already exist");
          }
        } else {
          setWrongPass("Your password and confirm password is not same");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container_register">
      <div className="square_register">
        <div className="line_logo">
          <img className="img_logo_register  mt-5 mb-2" src={logo} />
          <p className="text_logo mb-4">Jababeka Report</p>
        </div>
        <h2 className="text_login">Register</h2>

        <div className="form_login p-4">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-lg-6">
                <div>
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    placeholder="Your username"
                    value={formRegister.username}
                    onChange={(e) => onInputChange("username", e)}
                  />
                </div>

                <div>
                  <label htmlFor="Email" className="form-label mt-3">
                    Email
                  </label>

                  <input
                    type="email"
                    className="form-control"
                    id="Email"
                    placeholder="Your email"
                    value={formRegister.email}
                    onChange={(e) => onInputChange("email", e)}
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="form-label mt-3">
                    Phone Number
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    id="phone"
                    placeholder="Your phone number"
                    value={formRegister.phone}
                    onChange={(e) => onInputChange("phone", e)}
                  />
                </div>
              </div>

              <div className="col-lg-6">
                <div>
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>

                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Your password"
                    value={formRegister.password}
                    onChange={(e) => onInputChange("password", e)}
                  />
                </div>

                <div>
                  <label htmlFor="c_password" className="form-label mt-3">
                    Confirm Password
                  </label>

                  <input
                    type="password"
                    className="form-control"
                    id="c_password"
                    placeholder="Confirm your password"
                    value={formRegister.c_password}
                    onChange={(e) => onInputChange("c_password", e)}
                  />
                </div>
              </div>
            </div>

            <button className="btn btn-login btn-danger mt-4">Sign Up</button>
          </form>
        </div>

        <p className="text-danger">{wrongPass}</p>

        <p className="pb-1">
          You have account?
          <a href="/login" className="text_signUp">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
