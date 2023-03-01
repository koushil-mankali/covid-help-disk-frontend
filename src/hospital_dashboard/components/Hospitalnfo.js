import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../../user_view/components/Footer";
import Sidebar from "../components/sidebar/Sidebar";

import "./HospitalInfo.css";

import { Helmet } from "react-helmet";

const TITLE = "HospitalInfo";

let HospitalInfo = () => {
  let history = useHistory();

  let [states, setStates] = useState();
  let [hospitalName, setHospitalName] = useState();
  let [districts, setDistricts] = useState();
  let [formData, setFormData] = useState({});
  let [loader, setLoader] = useState(true);
  let [resultData, setResultData] = useState();

  let email = sessionStorage.getItem("email");
  let token = sessionStorage.getItem("token");

  if (!token) {
    history.push("/");
  }

  useEffect(() => {
    // fetch("https://chd.koushilmankali.com/get-hospital-name", {
    fetch("https://covidhd.onrender.com/get-hospital-name", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        userEmail: email,
      }),
    })
      .then((result) => result.json())
      .then((result) => {
        if (result.result === "failed") {
          history.push("/");
        }
        setHospitalName(result.hospitalName);
      });
  }, [email]);

  useEffect(() => {
    // fetch("https://chd.koushilmankali.com/get-states")
    fetch("https://covidhd.onrender.com/get-states")
      .then((result) => result.json())
      .then((result) => {
        setStates(result);
        return setLoader(false);
      })
      .catch((err) => {
        setLoader(false);
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (formData?.stateBox) {
      let dt = formData.stateBox;
      let districtData = states.map((value) =>
        value.states.filter((val) => val.name === dt)
      );
      districtData.map((val) =>
        val.map((resu) => setDistricts(resu.districts))
      );
    }
  }, [formData?.stateBox, states]);

  let intBox = (e) => {
    setFormData((oldState) => {
      return { ...oldState, [e.target.name]: e.target.value };
    });
  };

  let formSubmit = (e) => {
    e.preventDefault();

    setFormData({ ...formData, [e.target.name]: e.target.value });

    // fetch("https://chd.koushilmankali.com/update-hospital-data", {
    fetch("https://covidhd.onrender.com/update-hospital-data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        hospitalName: hospitalName,
        formData: formData,
      }),
    })
      .then((result) => result.json())
      .then((result) => {
        if (result.result === "valfail") {
          let message = result.errors[0].msg;
          return setResultData({ result: false, mess: message });
        }
        if (result.result === "failed") {
          history.push("/");
        }
        setResultData(result);
      })
      .catch((err) => console.log(err));

    // fetch("https://chd.koushilmankali.com/register-hospital-data", {
    fetch("https://covidhd.onrender.com/register-hospital-data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        hospitalName: hospitalName,
        formData: formData,
      }),
    })
      .then((result) => result.json())
      .then((result) => {
        if (result.result === "valfail") {
          let message = result.errors[0].msg;
          return setResultData({ result: false, mess: message });
        }
        if (result.result === "failed") {
          history.push("/");
        }
        setResultData(result);
      })
      .catch((err) => console.log(err));
  };

  let css;

  if (resultData?.result) {
    css = "messageBoxSuccess";
  } else if (resultData?.result === false) {
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
      <div className="dashBdy">
        <Sidebar />
        <div className="dashInnerBdy">
          <h1>Welcome to HospitalInfo</h1>
          {resultData ? (
            <div className="outerDiv">
              <div className={css}>{resultData?.mess}</div>
            </div>
          ) : null}
          <div className="introBox">
            <form className="hsptForm" onSubmit={formSubmit}>
              <label htmlFor="hospitalName" className="inpLabel">
                HospitalName: {hospitalName ? hospitalName : "NO NAME"}
              </label>
              <div className="inptdiv">
                <label htmlFor="contactBox" className="inpLabel">
                  Contact:
                </label>
                <input
                  type="tel"
                  name="contactBox"
                  id="contactBox"
                  className="inptEle"
                  maxLength="10"
                  onChange={intBox}
                />
              </div>
              <div className="inptdiv">
                <label htmlFor="stateBox" className="inpLabel">
                  State:
                </label>
                <select
                  className="selectBox"
                  name="stateBox"
                  id="stateBox"
                  onChange={intBox}
                >
                  <option>Select</option>
                  {loader ? (
                    <option>Loading...</option>
                  ) : (
                    states?.map((value) =>
                      value.states.map((val) => (
                        <option value={val.name} key={val._id}>
                          {val.name}
                        </option>
                      ))
                    )
                  )}
                </select>
              </div>
              <div className="inptdiv">
                <label htmlFor="districtBox" className="inpLabel">
                  District:
                </label>
                <select
                  className="selectBox"
                  name="districtBox"
                  id="districtBox"
                  onChange={intBox}
                >
                  <option>Select</option>
                  {loader ? (
                    <option>Loading...</option>
                  ) : (
                    districts?.map((value) => (
                      <option value={value} key={value}>
                        {value}
                      </option>
                    ))
                  )}
                </select>
              </div>
              <div className="inptdiv">
                <label htmlFor="addressBox" className="inpLabel">
                  Address:
                </label>
                <input
                  type="text"
                  name="addressBox"
                  id="addressBox"
                  className="inptEle"
                  onChange={intBox}
                />
              </div>
              <div className="inptdiv">
                <label htmlFor="typeBox" className="inpLabel">
                  Type:
                </label>
                <select
                  className="selectBox"
                  name="typeBox"
                  id="typeBox"
                  onChange={intBox}
                >
                  <option>Select</option>
                  <option value="govt">Govt</option>
                  <option value="private">Private</option>
                </select>
              </div>
              <div className="btnDiv">
                <input type="submit" value="Submit" className="submitBtn" />
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HospitalInfo;
