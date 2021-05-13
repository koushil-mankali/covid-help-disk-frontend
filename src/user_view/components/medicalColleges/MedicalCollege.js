import { useState, useEffect } from "react";

import Card from "./Card";
import Loader from "../../../UI/Loader";
import Navbar from "../Navbar";
import Footer from "../Footer";

import "./MedicalColleges.css";

let MedicalColleges = (props) => {
  let [statesName, setStateNames] = useState();
  let [stateGetDetails, setstateGetDetails] = useState();
  let [selectedState, setSelectedState] = useState();
  let [loader, setLoader] = useState(true);

  useEffect(() => {
    setLoader(true);
    fetch("https://api.rootnet.in/covid19-in/hospitals/medical-colleges")
      .then((result) => result.json())
      .then((result) => {
        if (result.success) {
          let val = result.data.medicalColleges.map((value) => value.state);
          let stateNames = Array.from(new Set(val));
          setStateNames(stateNames);
        }
        setLoader(false);
      })
      .catch((err) => {
        setLoader(false);
        console.log(err);
      });
  }, []);

  useEffect(() => {
    setLoader(true);
    if (stateGetDetails) {
      fetch("https://api.rootnet.in/covid19-in/hospitals/medical-colleges")
        .then((result) => result.json())
        .then((result) => {
          if (result.success) {
            let data = result.data.medicalColleges.filter(
              (val) => val.state === stateGetDetails
            );
            setSelectedState(data);
            setLoader(false);
          }
        })
        .catch((err) => {
          setLoader(false);
          console.log(err);
        });
    }
  }, [stateGetDetails]);

  let stateSelectionHandler = (e) => {
    setstateGetDetails(e.target.value);
  };

  return (
    <div className="stateData">
      <Navbar />
      {loader ? (
        <Loader />
      ) : (
        <div className="stateSelection">
          <form>
            <div>
              <label htmlFor="selectBox">Select State: </label>
              <select
                name="selectBox"
                id="selectBox"
                className="selectInput"
                onChange={stateSelectionHandler}
              >
                <option>Select</option>
                {statesName.map((value) => (
                  <option value={value}>{value}</option>
                ))}
              </select>
            </div>
          </form>
        </div>
      )}
      <div className="statesTtl">Medical Colleges:</div>
      <div className="statesBdy">
        {selectedState ? (
          loader ? (
            <Loader />
          ) : (
            selectedState?.map((value) => (
              <Card
                name={value.name}
                city={value.city}
                ownership={value.ownership}
                admissionCapacity={value.admissionCapacity}
                hospitalBeds={value.hospitalBeds}
              />
            ))
          )
        ) : null}
      </div>
      <div className="foo too">
        <Footer />
      </div>
    </div>
  );
};

export default MedicalColleges;
