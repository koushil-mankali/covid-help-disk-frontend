import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

import Navbar from "../user_view/components/Navbar";
import Footer from "../user_view/components/Footer";
import Loader from "../UI/Loader";
import "./authCss.css";

import { Helmet } from "react-helmet";

const TITLE = "Login";

let Login = () => {
  let history = useHistory();

  let [formData, setFormData] = useState({});
  let [message, setMessage] = useState({});
  let [loading, setLoading] = useState(true);

  let isLogin = sessionStorage.getItem("isLogin");
  let token = sessionStorage.getItem("token");

  useEffect(() => {
    if (isLogin && token) {
      fetch("https://chd.koushilmankali.com/islogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "barer " + token,
        },
        body: JSON.stringify({
          token: token,
        }),
      })
        .then((result) => result.json())
        .then((result) => {
          if (result.isCred) {
            return history.push({
              pathname: "/dashboard",
            });
          }
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    } else {
      setLoading(false);
    }
  }, [isLogin, token, history]);

  let formChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  let formSubmit = (e) => {
    e.preventDefault();

    fetch("https://chd.koushilmankali.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userEmail: formData.userEmail,
        userPassword: formData.userPassword,
      }),
    })
      .then((result) => result.json())
      .then((result) => {
        console.log("ress", result);
        if (result.result === "valfail") {
          return setMessage({
            result: false,
            message: result.errors[0].msg,
          });
        }
        if (result.result) {
          sessionStorage.setItem("token", result.token);
          sessionStorage.setItem("isLogin", result.isLogin);
          sessionStorage.setItem("email", result.email);
          return history.push({
            pathname: "/dashboard",
          });
        }
        setMessage({
          result: result.result,
          message: result.message,
        });
      })
      .catch((err) => {
        setMessage({
          result: false,
          message: "Failed Login",
        });
        console.log("err", err);
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
      {loading ? (
        <Loader />
      ) : (
        <>
          <Helmet>
            <title>{TITLE}</title>
          </Helmet>
          <Navbar />
          <div className="authBox">
            <div className={css}>{message.message}</div>
            <form className="authForm" onSubmit={formSubmit}>
              <h3 className="formHeading">Login Form</h3>
              <div className="inputDiv">
                <label htmlFor="userEmail" className="inpLabel">
                  Email:
                </label>
                <input
                  type="email"
                  name="userEmail"
                  id="userEmail"
                  className="inputTag"
                  onChange={formChange}
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
                  className="inputTag"
                  onChange={formChange}
                  value={formData.userPassword}
                />
              </div>
              <input type="submit" value="Login" className="authBtn" />
            </form>
            <div className="altLinkDiv">
              <p>Doesn't have an account ?&nbsp;</p>
              <Link to="/signup" className="altLink">
                Signup
              </Link>
            </div>
          </div>
          <div className="foo">
            <Footer />
          </div>
        </>
      )}
    </>
  );
};

export default Login;
