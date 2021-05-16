import { useState, useEffect } from "react";

import Navbar from "./Navbar";
import Footer from "../../user_view/components/Footer";
import Sidebar from "./sidebar/Sidebar";

import "./Hospitalnfo";

import { Helmet } from "react-helmet";

const TITLE = "Update Details";

let UpdateDetails = () => {
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
      fetch("http://localhost:4000/get-medicine-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          hospitalName: hospitalName,
        }),
      })
        .then((result) => result.json())
        .then((result) => {
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
      fetch("http://localhost:4000/get-med-details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          hospitalName: hospitalName,
          medicineName: medName,
        }),
      })
        .then((result) => result.json())
        .then((result) => setMedUpdate(result))
        .catch((err) => console.log(err));
    }
  }, [medName, hospitalName]);

  let formSubmit = (e) => {
    e.preventDefault();

    setFormData({ ...formData, [e.target.name]: e.target.value });

    fetch("http://localhost:4000/update-medicine-data", {
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
      .then((result) => {
        setResultData(result);
      })
      .catch((err) => console.log(err));
  };

  if (!loader2) {
    Object.keys(medicineData).forEach(function (key) {
      optionData.push(<option value={key}>{medicineData[key]}</option>);
    });
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
