import { useState } from "react";

import { Link } from "react-router-dom";

import Navbar from "../user_view/components/Navbar";
import Footer from "../user_view/components/Footer";
import "./authCss.css";

import { Helmet } from "react-helmet";

const TITLE = "Signup";

let Signup = () => {
  let [formData, setFormData] = useState({});
  let [message, setMessage] = useState({});

  let formChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  let formSubmit = (e) => {
    e.preventDefault();
    console.log("clicked");
    fetch("http://localhost:4000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        hospitalName: formData.hospitalName,
        userName: formData.userName,
        userEmail: formData.userEmail,
        userPassword: formData.userPassword,
        userPhone: formData.userPhone,
      }),
    })
      .then((result) => result.json())
      .then((result) => {
        if (result.result) {
          setMessage({
            result: result.result,
            message: result.message,
          });
          return setFormData({
            hospitalName: "",
            userName: "",
            userEmail: "",
            userPassword: "",
            userPhone: "",
          });
        }
        setMessage({ result: result.result, message: result.message });
        console.log("unable to signup");
      })
      .catch((err) => {
        console.log(err);
        setMessage({ result: "fail", message: err.message });
      });
  };

  let css;

  if (message?.result) {
    css = "messageBoxSuccess";
  } else if (message?.result === false) {
    css = "messageBoxFail";
  } else {
    css = null;
  }

  return (
    <>
      <Helmet>
        <title>{TITLE}</title>
      </Helmet>
      <Navbar />
      <div className="authBox">
        <div className={css}>{message.message}</div>
        <form className="authForm" onSubmit={formSubmit}>
          <h3 className="formHeading">Signup Form</h3>
          <div className="inputDiv">
            <label htmlFor="hospitalName" className="inpLabel">
              Hospital Name:
            </label>
            <input
              type="text"
              name="hospitalName"
              id="hospitalName"
              onChange={formChange}
              className="inputTag"
              value={formData.hospitalName}
            />
          </div>
          <div className="inputDiv">
            <label htmlFor="userName" className="inpLabel">
              Name:
            </label>
            <input
              type="text"
              name="userName"
              id="userName"
              onChange={formChange}
              className="inputTag"
              value={formData.userName}
            />
          </div>
          <div className="inputDiv">
            <label htmlFor="userEmail" className="inpLabel">
              Email:
            </label>
            <input
              type="email"
              name="userEmail"
              id="userEmail"
              onChange={formChange}
              className="inputTag"
              value={formData.userEmail}
            />
          </div>
          <div className="inputDiv">
            <label htmlFor="userPassword" className="inpLabel">
              Password:
            </label>
            <input
              type="password"
              name="userPassword"
              id="userPassword"
              onChange={formChange}
              className="inputTag"
              value={formData.userPassword}
            />
          </div>
          <div className="inputDiv">
            <label htmlFor="userPhone" className="inpLabel">
              Phone No:
            </label>
            <input
              type="tel"
              name="userPhone"
              id="userPhone"
              pattern="[0-9]{10}"
              maxLength="10"
              className="inputTag"
              onChange={formChange}
              value={formData.userPhone}
            />
          </div>
          <div className="btnDiv">
            <input type="submit" value="Signup" className="authBtn" />
          </div>
        </form>
        <div className="altLinkDiv">
          <p>Already have an account ?&nbsp;</p>
          <Link to="/login" className="altLink">
            Login
          </Link>
        </div>
      </div>
      <div className="foo">
        <Footer />
      </div>
    </>
  );
};

export default Signup;
