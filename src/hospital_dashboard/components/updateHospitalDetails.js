import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import Navbar from "./Navbar";
import Footer from "../../user_view/components/Footer";
import Sidebar from "./sidebar/Sidebar";

import "./Hospitalnfo";

import { Helmet } from "react-helmet";

const TITLE = "Update Hospital Details";

let UpdateHospitalDetails = () => {
  let history = useHistory();
  let [hospitalName, setHospitalName] = useState();
  let [loader, setLoader] = useState(true);
  let [formData, setFormData] = useState();
  let [resultData, setResultData] = useState();

  let email = sessionStorage.getItem("email");
  let token = sessionStorage.getItem("token");

  if (!token) {
    history.push("/");
  }

  useEffect(() => {
    fetch("https://chd.koushilmankali.com/get-hospital-name", {
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
        setLoader(false);
      })
      .catch((err) => {
        setLoader(false);
        console.log(err);
      });
  }, [email]);

  useEffect(() => {
    if (hospitalName) {
      fetch("https://chd.koushilmankali.com/get-hospital-stock-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          hospitalName: hospitalName,
        }),
      })
        .then((result) => result.json())
        .then((result) => {
          if (result.result === "failed") {
            history.push("/");
          }
          setFormData(result);
          setResultData(result);
        })
        .catch((err) => console.log(err));
    }
  }, [hospitalName]);

  let intBox = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  let formSubmit = (e) => {
    e.preventDefault();

    fetch("https://chd.koushilmankali.com/update-hospital-stock-data", {
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
        console.log(result);
        if (result.result === "valfail") {
          let message = result.errors[1].msg
            ? result.errors[1].msg
            : result.errors[0].msg;
          return setResultData({ result: false, mess: message });
        }
        if (result.result === "failed") {
          history.push("/");
        }
        setResultData(result);
      })
      .catch((err) => {
        console.log(err);
      });
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
          <h1>Update Hospital Details</h1>
          {resultData ? (
            <div className="outerDiv">
              <div className={css}>{resultData?.mess}</div>
            </div>
          ) : null}
          <div className="introBox">
            <form className="hsptForm" onSubmit={formSubmit}>
              <label htmlFor="hospitalName" className="inpLabel">
                HospitalName:
                {!loader ? (hospitalName ? hospitalName : "NO NAME") : null}
              </label>

              <div className="inptdiv">
                <label htmlFor="totalBeds" className="inpLabel">
                  Total Beds:
                </label>
                <input
                  type="text"
                  name="totalBeds"
                  id="totalBeds"
                  className="inptEle"
                  onChange={intBox}
                  value={formData?.totalBeds}
                />
              </div>
              <div className="inptdiv">
                <label htmlFor="avaliableBeds" className="inpLabel">
                  Avaliable Beds:
                </label>
                <input
                  type="number"
                  name="avaliableBeds"
                  id="avaliableBeds"
                  className="inptEle"
                  onChange={intBox}
                  value={formData?.avaliableBeds}
                />
              </div>
              <div className="inptdiv">
                <label htmlFor="occupiedBeds" className="inpLabel">
                  Occupied Beds:
                </label>
                <input
                  type="number"
                  name="occupiedBeds"
                  id="occupiedBeds"
                  className="inptEle"
                  onChange={intBox}
                  value={formData?.occupiedBeds}
                />
              </div>
              <div className="inptdiv">
                <label htmlFor="oxy" className="inpLabel">
                  Oxygen Avaliable (hrs):
                </label>
                <input
                  type="number"
                  name="oxy"
                  id="oxy"
                  className="inptEle"
                  onChange={intBox}
                  value={formData?.oxy}
                />
              </div>

              <div className="inptdiv">
                <label htmlFor="oxygen" className="inpLabel">
                  Oxygen Avaliability:
                </label>
                <select
                  className="selectBox"
                  name="oxygen"
                  id="oxygen"
                  onChange={intBox}
                >
                  <option>Select</option>
                  <option value="Avaliable">Avaliable</option>
                  <option value="Not Avaliable">Not Avaliable</option>
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

export default UpdateHospitalDetails;
