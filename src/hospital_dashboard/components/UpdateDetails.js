import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import Navbar from "./Navbar";
import Footer from "../../user_view/components/Footer";
import Sidebar from "./sidebar/Sidebar";

import "./Hospitalnfo";

import { Helmet } from "react-helmet";

const TITLE = "Update Details";

let UpdateDetails = () => {
  let history = useHistory();

  let email = sessionStorage.getItem("email");
  let token = sessionStorage.getItem("token");

  if (!token) {
    history.push("/");
  }

  let [medicineData, setMedicineData] = useState([]);
  let [hospitalName, setHospitalName] = useState();
  let [formData, setFormData] = useState({
    medicineName: "",
    medName: "",
    price: "",
  });
  let [loader, setLoader] = useState(true);
  let [loader2, setLoader2] = useState(true);
  let [resultData, setResultData] = useState();
  let [medUpdate, setMedUpdate] = useState();

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
        setLoader(false);
      })
      .catch((err) => {
        setLoader(false);
        console.log(err);
      });
  }, [email]);

  var optionData = [];

  useEffect(() => {
    if (hospitalName) {
      // fetch("https://chd.koushilmankali.com/get-medicine-data", {
      fetch("https://covidhd.onrender.com/get-medicine-data", {
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
          setMedicineData(result.data);
          setLoader2(false);
        })
        .catch((err) => {
          setLoader2(false);
          console.log(err);
        });
    }
  }, [hospitalName]);

  let intBox = (e) => {
    setFormData((oldState) => {
      return { ...oldState, [e.target.name]: e.target.value };
    });
  };

  let medName = formData?.medicineName;

  useEffect(() => {
    if (medName) {
      // fetch("https://chd.koushilmankali.com/get-med-details", {
      fetch("https://covidhd.onrender.com/get-med-details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          hospitalName: hospitalName,
          medicineName: medName,
        }),
      })
        .then((result) => result.json())
        .then((result) => {
          if (result.result === "failed") {
            history.push("/");
          }
          setMedUpdate(result);
        })
        .catch((err) => console.log(err));
    }
  }, [medName, hospitalName]);

  let formSubmit = (e) => {
    e.preventDefault();

    setFormData({ ...formData, [e.target.name]: e.target.value });

    // fetch("https://chd.koushilmankali.com/update-medicine-data", {
    fetch("https://covidhd.onrender.com/update-medicine-data", {
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

  if (!loader2) {
    if (medicineData) {
      Object.keys(medicineData).forEach(function (key) {
        optionData.push(<option value={key}>{medicineData[key]}</option>);
      });
    }
  }

  useEffect(() => {
    if (medUpdate) {
      Object.keys(medUpdate).map((val) =>
        setFormData({
          ...formData,
          medName: medUpdate[val].name,
          price: medUpdate[val].price,
        })
      );
    }
  }, [medUpdate, formData.medicineName]);

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
          <h1>Update Medicines Details</h1>
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
                <label htmlFor="medicineName" className="inpLabel">
                  Medicines Added:
                </label>
                <select
                  className="selectBox"
                  name="medicineName"
                  id="medicineName"
                  onChange={intBox}
                >
                  <option>Select</option>
                  {loader2
                    ? "loading..."
                    : optionData.map((val) => (
                        <option
                          value={val.props.children.name}
                          key={val.props.children.name}
                        >
                          {val.props.children.name}
                        </option>
                      ))}
                </select>
              </div>

              <div className="inptdiv">
                <label htmlFor="medName" className="inpLabel">
                  Medicine Name:
                </label>
                <input
                  type="text"
                  name="medName"
                  id="medName"
                  className="inptEle"
                  onChange={intBox}
                  value={formData.medName}
                />
              </div>
              <div className="inptdiv">
                <label htmlFor="price" className="inpLabel">
                  Price:
                </label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  className="inptEle"
                  onChange={intBox}
                  value={formData.price}
                />
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

export default UpdateDetails;
