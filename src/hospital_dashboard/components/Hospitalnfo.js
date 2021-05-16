import { useState, useEffect } from "react";

import Navbar from "../components/Navbar";
import Footer from "../../user_view/components/Footer";
import Sidebar from "../components/sidebar/Sidebar";

import "./HospitalInfo.css";

import { Helmet } from "react-helmet";

const TITLE = "HospitalInfo";

let HospitalInfo = () => {
  let [states, setStates] = useState();
  let [hospitalName, setHospitalName] = useState();
  let [districts, setDistricts] = useState();
  let [formData, setFormData] = useState({});
  let [loader, setLoader] = useState(true);
  let [resultData, setResultData] = useState();

  let email = sessionStorage.getItem("email");

  useEffect(() => {
    fetch("http://localhost:4000/get-hospital-name", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userEmail: email,
      }),
    })
      .then((result) => result.json())
      .then((result) => {
        setHospitalName(result.hospitalName);
      });
  }, [email]);

  useEffect(() => {
    fetch("http://localhost:4000/get-states")
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

    fetch("http://localhost:4000/update-hospital-data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        hospitalName: hospitalName,
        formData: formData,
      }),
    })
      .then((result) => result.json())
      .then((result) => setResultData(result))
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
                  <option value="Govt">Govt</option>
                  <option value="Private">Private</option>
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
